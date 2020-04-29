import { Directive, Input, OnInit, OnDestroy, HostListener, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({ selector: '[debounceClick]' })
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 200;
  @Output() debounceClick: EventEmitter<Event> = new EventEmitter();
  subscription: Subscription;
  click: Subject<Event> = new Subject();
  constructor() { }

  ngOnInit() {
    this.subscription = this.click.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(data => {
      this.debounceClick.emit(data);
    });
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.click.next(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
