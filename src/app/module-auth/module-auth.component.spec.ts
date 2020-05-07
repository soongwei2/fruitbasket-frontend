import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAuthComponent } from './module-auth.component';

describe('ModuleAuthComponent', () => {
  let component: ModuleAuthComponent;
  let fixture: ComponentFixture<ModuleAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
