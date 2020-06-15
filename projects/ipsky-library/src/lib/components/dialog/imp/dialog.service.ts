import {
  ClassProvider,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import { DialogComponent, DialogConfig, DialogHandler, DialogRef, DialogService, DialogStatus } from '../dialog-api';
import { GlobalPositionStrategy, Overlay, OverlayConfig, PositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

interface DialogContent<P> {
  setParam(p: P): void;
}

class TmpContent<P> implements DialogContent<P> {
  constructor(private evr: EmbeddedViewRef<{ $implicit: P }>, private ctx: { $implicit: P }) {}

  setParam(p: P): void {
    this.ctx.$implicit = p;
  }
}

class ComponentContent<P> implements DialogContent<P> {
  constructor(private cr: ComponentRef<DialogComponent<P>>) {}

  setParam(p: P): void {
    this.cr.instance.setParam(p);
  }
}

class DialogRefImp<P> extends DialogHandler implements DialogRef<P> {
  private status: DialogStatus = DialogStatus.OPENING;
  private statusSubject: BehaviorSubject<DialogStatus> = new BehaviorSubject<DialogStatus>(this.status);
  private msgSubject: ReplaySubject<any> = new ReplaySubject<any>(1);

  private containerRef: ComponentRef<DialogContainerComponent>;
  private content: DialogContent<P>;

  constructor(private overlayRef: OverlayRef) {
    super();
  }

  init(containerRef: ComponentRef<DialogContainerComponent>, content: DialogContent<P>): this {
    this.containerRef = containerRef;
    this.content = content;

    containerRef.instance.onDialogOpenDone = () => {
      this.setDialogStatus(DialogStatus.OPENED);
    };

    containerRef.instance.onDialogCloseDone = () => {
      this.doDestroy();
    };
    return this;
  }

  private doDestroy() {
    this.setDialogStatus(DialogStatus.CLOSED);
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.statusSubject.complete();
    this.msgSubject.complete();
  }

  private setDialogStatus(s: DialogStatus): void {
    this.status = s;
    this.statusSubject.next(s);
  }

  close(): void {
    this.setDialogStatus(DialogStatus.CLOSING);
    this.containerRef.destroy();
  }

  reSetClass(cls: string[]): void {
    cls = cls || [];
    this.containerRef.instance.setClass(cls);
  }

  fixBox(width?: number, height?: number): void {
    this.overlayRef.updateSize(width || height ? { width, height } : null);
    this.overlayRef.updatePosition();
  }

  sendMessage(msg: any): void {
    this.msgSubject.next(msg);
  }

  getStatus(): Observable<DialogStatus> {
    return this.statusSubject;
  }

  onClickOuter(): Observable<MouseEvent> {
    return this.overlayRef.backdropClick();
  }

  getMessage(): Observable<any> {
    return this.msgSubject;
  }

  sendParam(param: P): void {
    this.content.setParam(param);
  }
}

@Injectable()
export class DialogServiceImp implements DialogService {
  private overlay: Overlay;

  constructor(private injector: Injector, private cfr: ComponentFactoryResolver) {
    this.overlay = injector.get(Overlay as Type<Overlay>);
  }

  private positionStrategy(): PositionStrategy {
    return new GlobalPositionStrategy().centerVertically().centerHorizontally();
  }

  createDialog<P>(config: DialogConfig<P>): DialogRef<P> {
    const oc: OverlayConfig = {
      positionStrategy: this.positionStrategy(),
      width: config.width || 807,
      panelClass: config.initClass || [],
      hasBackdrop: true,
      backdropClass: ['dialog-backdrop']
    };

    const overlayRef: OverlayRef = this.overlay.create(oc);
    const containerRef: ComponentRef<DialogContainerComponent> = overlayRef.attach(new ComponentPortal(DialogContainerComponent));
    const vcf: ViewContainerRef = containerRef.instance.hostAnchor;
    let content: DialogContent<P>;
    const dialog = new DialogRefImp(overlayRef);

    if (config.content instanceof TemplateRef) {
      // Same reference
      const context = { $implicit: config.initParam };
      const embeddedViewRef = vcf.createEmbeddedView(config.content, context, 0);
      embeddedViewRef.detectChanges();
      content = new TmpContent(embeddedViewRef, context);
    } else {
      const hostModule = config.hostModule;

      const cfr = hostModule ? hostModule.componentFactoryResolver : this.cfr;
      const componentFactory: ComponentFactory<DialogComponent<P>> = cfr.resolveComponentFactory(config.content);
      const ijc: Injector = Injector.create({
        providers: [{ provide: DialogHandler, useValue: dialog }],
        parent: hostModule ? hostModule.injector : this.injector
      });
      const componentRef = vcf.createComponent(componentFactory, 0, ijc);
      content = new ComponentContent(componentRef);
      content.setParam(config.initParam);
      componentRef.changeDetectorRef.detectChanges();
    }
    containerRef.instance.setClass(config.initClass);
    containerRef.instance.setDragStatus(config.dragable);
    return dialog.init(containerRef, content);
  }
}

export const DIALOG_SERVICE_PROVIDE: ClassProvider = {
  provide: DialogService,
  useClass: DialogServiceImp
};
