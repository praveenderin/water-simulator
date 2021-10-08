import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterflowGridComponent } from './waterflow-grid.component';

describe('WaterflowGridComponent', () => {
  let component: WaterflowGridComponent;
  let fixture: ComponentFixture<WaterflowGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterflowGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterflowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
