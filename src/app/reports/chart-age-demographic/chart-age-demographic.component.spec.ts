import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAgeDemographicComponent } from './chart-age-demographic.component';

describe('ChartAgeDemographicComponent', () => {
  let component: ChartAgeDemographicComponent;
  let fixture: ComponentFixture<ChartAgeDemographicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAgeDemographicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAgeDemographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
