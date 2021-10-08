import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCreationComponent } from './grid-creation.component';

describe('GridCreationComponent', () => {
  let component: GridCreationComponent;
  let fixture: ComponentFixture<GridCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
