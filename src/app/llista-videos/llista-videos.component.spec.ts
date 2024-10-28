import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistaVideosComponent } from './llista-videos.component';

describe('LlistaVideosComponent', () => {
  let component: LlistaVideosComponent;
  let fixture: ComponentFixture<LlistaVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlistaVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
