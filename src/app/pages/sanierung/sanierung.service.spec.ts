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

  it('should return Tilgungszuschuss for EH 85 = 5%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.tilgungszuschuss.EH85).toBe(5);
  });

  it('should update Tilgungszuschuss when energiestandard EH 85 is selected', () => {
    const result = service.updateTilgungszuschuss('EH 85');
    expect(result).toBe(constants.tilgungszuschuss.EH85);
  });

  it('should return Tilgungszuschuss for EH 70 = 10%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.tilgungszuschuss.EH70).toBe(10);
  });

  it('should update Tilgungszuschuss when energiestandard EH 70 is selected', () => {
    const result = service.updateTilgungszuschuss('EH 70');
    expect(result).toBe(constants.tilgungszuschuss.EH70);
  });

  it('should return Tilgungszuschuss for EH 55 = 15%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.tilgungszuschuss.EH55).toBe(15);
  });

  it('should update Tilgungszuschuss when energiestandard EH 55 is selected', () => {
    const result = service.updateTilgungszuschuss('EH 55');
    expect(result).toBe(constants.tilgungszuschuss.EH55);
  });

  it('should return Tilgungszuschuss for EH 40 = 20%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.tilgungszuschuss.EH40).toBe(20);
  });

  it('should update Tilgungszuschuss when energiestandard EH 40 is selected', () => {
    const result = service.updateTilgungszuschuss('EH 40');
    expect(result).toBe(constants.tilgungszuschuss.EH40);
  });

  it('should return EE bonus = 5%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.eeBonusPossible).toBe(5);
  });

  it('should update EE bonus when EE-Klasse is checked', () => {
    const result = service.updateEeBonus(true);
    expect(result).toBe(constants.eeBonusPossible);
  });

  it('should update to zero EE bonus when EE-Klasse is unchecked', () => {
    const result = service.updateEeBonus(false);
    expect(result).toBe(0);
  });

  it('should return NH bonus = 5%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.nhBonusPossible).toBe(5);
  });

  it('should update NH bonus when QNG Zertifizierung is selected', () => {
    const result = service.updateNhBonus('QNG');
    expect(result).toBe(constants.nhBonusPossible);
  });

  it('should update to zero NH bonus when Keine Zertifizierung is selected', () => {
    const result = service.updateNhBonus('Keine Zertifizierung');
    expect(result).toBe(0);
  });

  it('should return Worst-Possible-Building bonus = 10%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.wpbBonusPossible).toBe(10);
  });

  it('should update Worst-Possible-Building bonus when it is checked and energiestandard is EH 40', () => {
    const result = service.updateWpbBonus(true, 'EH 40');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should update Worst-Possible-Building bonus when it is checked and energiestandard is EH 55', () => {
    const result = service.updateWpbBonus(true, 'EH 55');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should update Worst-Possible-Building bonus when it is checked and energiestandard is EH 70', () => {
    const result = service.updateWpbBonus(true, 'EH 70');
    expect(result).toBe(constants.wpbBonusPossible);
  });

  it('should update to zero Worst-Possible-Building bonus when it is checked and energiestandard is EH 85', () => {
    const result = service.updateWpbBonus(true, 'EH 85');
    expect(result).toBe(0);
  });

  it('should update to zero Worst-Possible-Building bonus when it is unchecked and energiestandard is EH 40', () => {
    const result = service.updateWpbBonus(false, 'EH 40');
    expect(result).toBe(0);
  });

  it('should update to zero Worst-Possible-Building bonus when it is unchecked and energiestandard is EH 55', () => {
    const result = service.updateWpbBonus(false, 'EH 55');
    expect(result).toBe(0);
  });

  it('should update to zero Worst-Possible-Building bonus when it is unchecked and energiestandard is EH 70', () => {
    const result = service.updateWpbBonus(false, 'EH 70');
    expect(result).toBe(0);
  });

  it('should update to zero Worst-Possible-Building bonus when it is unchecked and energiestandard is EH 85', () => {
    const result = service.updateWpbBonus(false, 'EH 85');
    expect(result).toBe(0);
  });

  it('should return Seriellen Sanierung bonus = 15%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.serSanBonusPossible).toBe(15);
  });

  it('should update Seriellen Sanierung bonus when it is checked and energiestandard is EH 40', () => {
    const result = service.updateSerSanBonus(true, 'EH 40');
    expect(result).toBe(constants.serSanBonusPossible);
  });

  it('should update Seriellen Sanierung bonus when it is checked and energiestandard is EH 55', () => {
    const result = service.updateSerSanBonus(true, 'EH 55');
    expect(result).toBe(constants.serSanBonusPossible);
  });

  it('should update to zero Seriellen Sanierung bonus when it is checked and energiestandard is EH 70', () => {
    const result = service.updateSerSanBonus(true, 'EH 70');
    expect(result).toBe(0);
  });

  it('should update to zero Seriellen Sanierung bonus when it is checked and energiestandard is EH 85', () => {
    const result = service.updateSerSanBonus(true, 'EH 85');
    expect(result).toBe(0);
  });

  it('should update to zero Seriellen Sanierung bonus when it is unchecked and energiestandard is EH 40', () => {
    const result = service.updateSerSanBonus(false, 'EH 40');
    expect(result).toBe(0);
  });

  it('should update to zero Seriellen Sanierung bonus when it is unchecked and energiestandard is EH 55', () => {
    const result = service.updateSerSanBonus(false, 'EH 55');
    expect(result).toBe(0);
  });

  it('should update to zero Seriellen Sanierung bonus when it is unchecked and energiestandard is EH 70', () => {
    const result = service.updateSerSanBonus(false, 'EH 70');
    expect(result).toBe(0);
  });

  it('should update to zero Seriellen Sanierung bonus when it is unchecked and energiestandard is EH 85', () => {
    const result = service.updateSerSanBonus(false, 'EH 85');
    expect(result).toBe(0);
  });

  it('should update Gestehungskosten with user price estimation when the option is on', () => {
    const result = service.updateGestehungskosten(
      false,
      service.userPrice,
      'EH 40',
      'Teilsaniert'
    );
    expect(result).toBe(service.userPrice);
  });

  it('should return Gestehungskosten safety multiplier = 1.3', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.safetyMultiplier).toBe(1.3);
  });

  it('should update Gestehungskosten for EH 40 and Umfassend saniert = 680 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 40',
      'Umfassend saniert'
    );
    expect(result).toBe(680 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 40 and Teilsaniert = 770 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 40',
      'Teilsaniert'
    );
    expect(result).toBe(770 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 40 and Unsaniert = 760 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 40',
      'Unsaniert'
    );
    expect(result).toBe(760 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 55 and Umfassend saniert = 490 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 55',
      'Umfassend saniert'
    );
    expect(result).toBe(490 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 55 and Teilsaniert = 660 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 55',
      'Teilsaniert'
    );
    expect(result).toBe(660 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 55 and Unsaniert = 650 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 55',
      'Unsaniert'
    );
    expect(result).toBe(650 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 70 and Umfassend saniert = 300 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 70',
      'Umfassend saniert'
    );
    expect(result).toBe(300 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 70 and Teilsaniert = 530 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 70',
      'Teilsaniert'
    );
    expect(result).toBe(530 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 70 and Unsaniert = 520 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 70',
      'Unsaniert'
    );
    expect(result).toBe(520 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 85 and Unsaniert saniert = 270 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 85',
      'Umfassend saniert'
    );
    expect(result).toBe(270 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 85 and Teilsaniert = 510 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 85',
      'Teilsaniert'
    );
    expect(result).toBe(510 * constants.safetyMultiplier);
  });

  it('should update Gestehungskosten for EH 85 and Teilsaniert = 500 €/m²', () => {
    // ATTENTION: VALUES HARD CODED.
    // If the chart change values, this test will fail
    const result = service.updateGestehungskosten(
      true,
      service.userPrice,
      'EH 85',
      'Unsaniert'
    );
    expect(result).toBe(500 * constants.safetyMultiplier);
  });

  it('should return NR kredit constant "lessThan10" = 0.99% for kreditlaufzeit smaller than 10 years', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.nrKredit.lessThan10).toBe(0.99);
  });

  it('should update NR Kredit for kreditlaufzeit = 1 year (using lessThan10 constant)', () => {
    const result = service.updateNrKredit(1);
    expect(result).toBe(constants.nrKredit.lessThan10);
  });

  it('should update NR Kredit for kreditlaufzeit = 5 year (using lessThan10 constant)', () => {
    const result = service.updateNrKredit(5);
    expect(result).toBe(constants.nrKredit.lessThan10);
  });

  it('should update NR Kredit for kreditlaufzeit = 9 years (using lessThan10 constant)', () => {
    const result = service.updateNrKredit(9);
    expect(result).toBe(constants.nrKredit.lessThan10);
  });

  it('should return NR kredit constant "between10And20" = 1.78% for kreditlaufzeit between 10 and 20 years', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.nrKredit.between10And20).toBe(1.78);
  });

  it('should update NR Kredit for kreditlaufzeit = 10 years (using between10And20 constant)', () => {
    const result = service.updateNrKredit(10);
    expect(result).toBe(constants.nrKredit.between10And20);
  });

  it('should update NR Kredit for kreditlaufzeit = 15 years (using between10And20 constant)', () => {
    const result = service.updateNrKredit(15);
    expect(result).toBe(constants.nrKredit.between10And20);
  });

  it('should update NR Kredit for kreditlaufzeit = 20 years (using between10And20 constant)', () => {
    const result = service.updateNrKredit(20);
    expect(result).toBe(constants.nrKredit.between10And20);
  });

  it('should return NR kredit constant "moreThan20" = 1.97% for kreditlaufzeit bigger than 20 years', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.nrKredit.moreThan20).toBe(1.97);
  });

  it('should update NR Kredit for kreditlaufzeit = 21 years (using moreThan20 constant)', () => {
    const result = service.updateNrKredit(21);
    expect(result).toBe(constants.nrKredit.moreThan20);
  });

  it('should update NR Kredit for kreditlaufzeit = 30 years (using moreThan20 constant)', () => {
    const result = service.updateNrKredit(30);
    expect(result).toBe(constants.nrKredit.moreThan20);
  });

  it('should return "sollzinsKfw_Endfälliges" constant = 2.06%', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.sollzinsKfw_Endfälliges).toBe(2.06);
  });

  it('should update Sollzins KfW = sollzinsKfw_Endfälliges constant if "Endfälliges" is selected', () => {
    const mockNrKredit = 1;
    const result = service.updateSollzinsKfw('Endfälliges', mockNrKredit);
    expect(result).toBe(constants.sollzinsKfw_Endfälliges);
  });

  it('should update Sollzins KfW = NR Kredit if "Annuitäten" is selected', () => {
    const mockNrKredit = 1;
    const result = service.updateSollzinsKfw('Annuitäten', mockNrKredit);
    expect(result).toBe(mockNrKredit);
  });

  it('should update Sollzins KfW = zero if "kein" is selected', () => {
    const mockNrKredit = 1;
    const result = service.updateSollzinsKfw('kein', mockNrKredit);
    expect(result).toBe(0);
  });

  it('should return lower kfwKreditLimit per unit constant = 120.000€', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.kfwKreditLimit.lower).toBe(120000);
  });

  it('should return higher kfwKreditLimit per unit constant = 150.000€', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.kfwKreditLimit.higher).toBe(150000);
  });

  it('should update Max KfW Kredit = higher kfwKreditLimit if EE-Klasse is checked and there is no Zertifizierung', () => {
    const result = service.updateMaxKfwKredit(true, 'Keine Zertifizierung', 1);
    expect(result).toBe(constants.kfwKreditLimit.higher);
  });
    
  it('should update Max KfW Kredit = higher kfwKreditLimit if EE-Klasse is checked and there is QNG Zertifizierung', () => {
    const result = service.updateMaxKfwKredit(true, 'QNG', 1);
    expect(result).toBe(constants.kfwKreditLimit.higher);
  });

  it('should update Max KfW Kredit = higher kfwKreditLimit if EE-Klasse is unchecked and there is QNG Zertifizierung', () => {
    const result = service.updateMaxKfwKredit(false, 'QNG', 1);
    expect(result).toBe(constants.kfwKreditLimit.higher);
  });

  it('should update Max KfW Kredit = lower kfwKreditLimit if EE-Klasse is unchecked and there is no Zertifizierung', () => {
    const result = service.updateMaxKfwKredit(false, 'Keine Zertifizierung', 1);
    expect(result).toBe(constants.kfwKreditLimit.lower);
  });



});
