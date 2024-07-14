import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEinzelmassnahmenComponent } from './list-einzelmassnahmen.component';

describe('ListEinzelmassnahmenComponent', () => {
  let component: ListEinzelmassnahmenComponent;
  let fixture: ComponentFixture<ListEinzelmassnahmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEinzelmassnahmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEinzelmassnahmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
