import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendbuttonComponent } from './sendbutton.component';

describe('SendbuttonComponent', () => {
  let component: SendbuttonComponent;
  let fixture: ComponentFixture<SendbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
