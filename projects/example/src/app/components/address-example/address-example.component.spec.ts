import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressExampleComponent } from './address-example.component';

describe('AddressExampleComponent', () => {
  let component: AddressExampleComponent;
  let fixture: ComponentFixture<AddressExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
