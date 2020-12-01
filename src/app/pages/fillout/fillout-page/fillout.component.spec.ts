import { FilloutComponent } from './fillout.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('FilloutComponent', () => {
  let component: FilloutComponent;
  let fixture: ComponentFixture<FilloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilloutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
