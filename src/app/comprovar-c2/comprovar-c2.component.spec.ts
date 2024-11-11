import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprovarC2Component } from './comprovar-c2.component';

describe('ComprovarC2Component', () => {
  let component: ComprovarC2Component;
  let fixture: ComponentFixture<ComprovarC2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprovarC2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprovarC2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
