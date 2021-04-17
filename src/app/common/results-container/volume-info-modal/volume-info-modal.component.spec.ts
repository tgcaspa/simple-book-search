import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeInfoModalComponent } from './volume-info-modal.component';

describe('VolumeInfoModalComponent', () => {
  let component: VolumeInfoModalComponent;
  let fixture: ComponentFixture<VolumeInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
