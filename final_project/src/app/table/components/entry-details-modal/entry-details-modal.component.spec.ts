import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDetailsModalComponent } from './entry-details-modal.component';

describe('EntryDetailsModalComponent', () => {
  let component: EntryDetailsModalComponent;
  let fixture: ComponentFixture<EntryDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
