import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleChoiceComponent } from './role-choice.component';

describe('RoleChoiceComponent', () => {
  let component: RoleChoiceComponent;
  let fixture: ComponentFixture<RoleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleChoiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
