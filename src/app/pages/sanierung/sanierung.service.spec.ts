import { TestBed } from '@angular/core/testing';

import { SanierungService } from './sanierung.service';
import { sanierung } from '../../shared/constants';

describe('SanierungService', () => {
  let service: SanierungService;
  let constants: sanierung;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [sanierung] });
    service = TestBed.inject(SanierungService);
    constants = TestBed.inject(sanierung);
  });

  it('SanierungService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tilgungszuschuss for EH 85', () => {
    const result = service.updateTilgungszuschuss('EH 85');
    expect(result).toBe(constants.tilgungszuschuss.EH85);
  });

  it('should return tilgungszuschuss for EH 70', () => {
    const result = service.updateTilgungszuschuss('EH 70');
    expect(result).toBe(constants.tilgungszuschuss.EH70);
  });

  it('should return tilgungszuschuss for EH 55', () => {
    const result = service.updateTilgungszuschuss('EH 55');
    expect(result).toBe(constants.tilgungszuschuss.EH55);
  });

  it('should return tilgungszuschuss for EH 40', () => {
    const result = service.updateTilgungszuschuss('EH 40');
    expect(result).toBe(constants.tilgungszuschuss.EH40);
  });

  it('should return eeBonus when eeKlasse is true', () => {
    const result = service.updateEeBonus(true);
    expect(result).toBe(constants.eeBonusPossible);
  });

  it('should return eeBonus when eeKlasse is false', () => {
    const result = service.updateEeBonus(false);
    expect(result).toBe(0);
  });

  it('should return nhBonus when a zertifizierung is selected', () => {
    const result = service.updateNhBonus('QNG');
    expect(result).toBe(constants.nhBonusPossible);
  });

  it('should return no nhBonus when a no zertifizierung is selected', () => {
    const result = service.updateNhBonus('Keine Zertifizierung');
    expect(result).toBe(0);
  });

  it('should return wpbBonus when WPB is selected and EH is 40', () => {
    const result = service.updateWpbBonus(true, 'EH 40');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should return wpbBonus when WPB is selected and EH is 55', () => {
    const result = service.updateWpbBonus(true, 'EH 55');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should return wpbBonus when WPB is selected and EH is 70', () => {
    const result = service.updateWpbBonus(true, 'EH 70');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should return no wpbBonus when WPB is selected and EH is 85', () => {
    const result = service.updateWpbBonus(true, 'EH 85');
    expect(result).toBe(0);
  });

  it('should return no wpbBonus when WPB is not selected and EH is 40', () => {
    const result = service.updateWpbBonus(false, 'EH 40');
    expect(result).toBe(0);
  });

  it('should return no wpbBonus when WPB is not selected and EH is 55', () => {
    const result = service.updateWpbBonus(false, 'EH 55');
    expect(result).toBe(0);
  });

  it('should return no wpbBonus when WPB is not selected and EH is 70', () => {
    const result = service.updateWpbBonus(false, 'EH 70');
    expect(result).toBe(0);
  });

  it('should return no wpbBonus when WPB is not selected and EH is 85', () => {
    const result = service.updateWpbBonus(false, 'EH 85');
    expect(result).toBe(0);
  });

  it('should return serSanBonus when serielleSanierung is selected and EH is 40', () => {
    const result = service.updateSerSanBonus(true, 'EH 40');
    expect(result).toBe(constants.serSanBonusPossible);
  });

  it('should return serSanBonus when serielleSanierung is selected and EH is 55', () => {
    const result = service.updateSerSanBonus(true, 'EH 55');
    expect(result).toBe(constants.serSanBonusPossible);
  });

  it('should return no serSanBonus when serielleSanierung is selected and EH is 70', () => {
    const result = service.updateSerSanBonus(true, 'EH 70');
    expect(result).toBe(0);
  });

  it('should return no serSanBonus when serielleSanierung is selected and EH is 85', () => {
    const result = service.updateSerSanBonus(true, 'EH 85');
    expect(result).toBe(0);
  });

  it('should return no serSanBonus when serielleSanierung is not selected and EH is 40', () => {
    const result = service.updateSerSanBonus(false, 'EH 40');
    expect(result).toBe(0);
  });

  it('should return no serSanBonus when serielleSanierung is not selected and EH is 55', () => {
    const result = service.updateSerSanBonus(false, 'EH 55');
    expect(result).toBe(0);
  });

  it('should return no serSanBonus when serielleSanierung is not selected and EH is 70', () => {
    const result = service.updateSerSanBonus(false, 'EH 70');
    expect(result).toBe(0);
  });

  it('should return no serSanBonus when serielleSanierung is not selected and EH is 85', () => {
    const result = service.updateSerSanBonus(false, 'EH 85');
    expect(result).toBe(0);
  });


});
