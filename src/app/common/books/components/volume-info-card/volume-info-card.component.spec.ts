import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeInfoCardComponent } from './volume-info-card.component';

describe('VolumeInfoCardComponent', () => {
  let component: VolumeInfoCardComponent;
  let fixture: ComponentFixture<VolumeInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
