import { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  template: ` <ng-template #hostAnchor cdkDrag cdkDragRootElement=".cdk-overlay-pane" [cdkDragDisabled]="cdkDragDisabled"></ng-template>`,
  host: {
    '[class]': '"dialog-container "+cls.join(" ")',
    '[@slideDialog]': 'state',
    '(@slideDialog.start)': 'onAnimationStart($event)',
    '(@slideDialog.done)': 'onAnimationDone($event)'
  },
  animations: [
    trigger('slideDialog', [
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      transition('* => enter', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('enter => void', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ]
})
export class DialogContainerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true })
  hostAnchor: ViewContainerRef;
  cls: string[] = [];

  state = 'enter';

  offsetY = 0;
  dragable = true;
  cdkDragDisabled = false;
  subscription: Subscription;
  routerEventSubcription: Subscription;
  onDialogOpenStart: () => void = () => void 0;
  onDialogOpenDone: () => void = () => void 0;
  onDialogCloseStart: () => void = () => void 0;
  onDialogCloseDone: () => void = () => void 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerEventSubcription = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart && this.router.navigated) {
        this.state = 'void';
      }
    });
  }

  ngAfterViewInit() {
    this.changeDragStatus();
  }

  setClass(cls: string[]): void {
    this.cls = cls || [];
  }

  setDragStatus(dragable?: boolean): void {
    if (typeof dragable === 'undefined') {
      return;
    }
    this.dragable = dragable;
    this.cdkDragDisabled = !dragable;
  }

  onAnimationStart(e: AnimationEvent): void {
    if (e.toState === 'enter') {
      this.offsetY = this.getOffset();
      document.body.classList.add('dialog-open');
      document.body.style.top = `-${this.offsetY}px`;
      this.onDialogOpenStart();
    } else {
      this.onDialogCloseStart();
    }
  }

  onAnimationDone(e: AnimationEvent): void {
    if (e.toState === 'enter') {
      this.onDialogOpenDone();
    } else {
      this.onDialogCloseDone();
      document.body.classList.remove('dialog-open');
      document.body.style.top = null;
      window.scroll(0, this.offsetY);
      this.offsetY = 0;
    }
  }

  getOffset(): number {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  // 焦点在输入文本中，禁止弹窗拖拽
  private changeDragStatus(): void {
    if (!this.dragable) {
      return;
    }
    const dragablePane = document.querySelector('.dialog-container');
    this.subscription = fromEvent(dragablePane, 'mousedown').subscribe((e: MouseEvent) => {
      this.cdkDragDisabled = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routerEventSubcription) {
      this.routerEventSubcription.unsubscribe();
    }
  }
}
