import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTitleNameModalComponent } from './get-title-name-modal.component';

describe('GetTitleNameModalComponent', () => {
  let component: GetTitleNameModalComponent;
  let fixture: ComponentFixture<GetTitleNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTitleNameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTitleNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
