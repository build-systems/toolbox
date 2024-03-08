import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatengrundlageComponent } from './datengrundlage.component';

describe('DatengrundlageComponent', () => {
  let component: DatengrundlageComponent;
  let fixture: ComponentFixture<DatengrundlageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatengrundlageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatengrundlageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
