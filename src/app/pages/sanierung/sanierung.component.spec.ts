import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanierungComponent } from './sanierung.component';

describe('SanierungComponent', () => {
  let component: SanierungComponent;
  let fixture: ComponentFixture<SanierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanierungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Sanierung' title`, () => {
    const fixture = TestBed.createComponent(SanierungComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Sanierung');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SanierungComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sanierung');
  });
});
