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

  it('should return the user Gestehungskosten when he turns the option on', () => {
    const result = service.updateGestehungskosten(false, service.userPrice, 'EH 40', 'Teilsaniert');
    expect(result).toBe(service.userPrice);
  });

  it('should return Gestehungskosten defined by the table for EH 40 and Umfassend saniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 40', 'Umfassend saniert');
    expect(result).toBe(680 * constants.safetyMultiplier);
  });
  
  it('should return Gestehungskosten defined by the table for EH 40 and Teilsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 40', 'Teilsaniert');
    expect(result).toBe(770 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 40 and Unsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 40', 'Unsaniert');
    expect(result).toBe(760 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 55 and Umfassend saniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 55', 'Umfassend saniert');
    expect(result).toBe(490 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 55 and Teilsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 55', 'Teilsaniert');
    expect(result).toBe(660 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 55 and Unsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 55', 'Unsaniert');
    expect(result).toBe(650 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 70 and Umfassend saniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 70', 'Umfassend saniert');
    expect(result).toBe(300 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 70 and Teilsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 70', 'Teilsaniert');
    expect(result).toBe(530 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 70 and Unsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 70', 'Unsaniert');
    expect(result).toBe(520 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 85 and Unsaniert saniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 85', 'Umfassend saniert');
    expect(result).toBe(270 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 85 and Teilsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 85', 'Teilsaniert');
    expect(result).toBe(510 * constants.safetyMultiplier);
  });

  it('should return Gestehungskosten defined by the table for EH 85 and Teilsaniert', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(true, service.userPrice, 'EH 85', 'Unsaniert');
    expect(result).toBe(500 * constants.safetyMultiplier);
  });


});
