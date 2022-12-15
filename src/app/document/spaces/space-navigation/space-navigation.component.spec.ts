import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceNavigationComponent } from './space-navigation.component';

describe('SpaceNavigationComponent', () => {
  let component: SpaceNavigationComponent;
  let fixture: ComponentFixture<SpaceNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
