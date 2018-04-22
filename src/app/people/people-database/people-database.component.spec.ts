import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDatabaseComponent } from './people-database.component';

describe('PeopleDatabaseComponent', () => {
  let component: PeopleDatabaseComponent;
  let fixture: ComponentFixture<PeopleDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
