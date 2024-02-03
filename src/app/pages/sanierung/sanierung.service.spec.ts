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

  it('should update Gesamtgestehungskosten multiplying gestehungskosten and wohnflaeche', () => {
    const result = service.updateGesamtgestehungskosten(200, 3);
    expect(result).toBe(600);
  });

  it('should update Foerdersumme = maxKfwKredit when maxKfwKredit is smaller than gesamtgestehungskosten', () => {
    const maxKfwKreditMock = 150000;
    const gesamtgestehungskostenMock = 200000;
    const result = service.updateFoerdersumme(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(maxKfwKreditMock);
  });

  it('should update Foerdersumme = gesamtgestehungskosten when gesamtgestehungskosten is smaller than maxKfwKredit', () => {
    const maxKfwKreditMock = 150000;
    const gesamtgestehungskostenMock = 100000;
    const result = service.updateFoerdersumme(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(gesamtgestehungskostenMock);
  });

  it('should update Restsumme = (gesamtgestehungskosten - maxKfwKredit) when result > 0', () => {
    const maxKfwKreditMock = 1000;
    const gesamtgestehungskostenMock = 2000;
    const result = service.updateRestsumme(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(1000);
  });

  it('should update Restsumme = 0 when (gesamtgestehungskosten - maxKfwKredit) < 0', () => {
    const maxKfwKreditMock = 2000;
    const gesamtgestehungskostenMock = 1000;
    const result = service.updateRestsumme(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(0);
  });

  it('should update AF KfW = 0 if sollzinsKfw = 0 and kreditlaufzeit = 10', () => {
    const sollzinsKfw = 0;
    const kreditlaufzeit = 10;
    const result = service.updateAfKfW(sollzinsKfw, kreditlaufzeit);
    expect(result).toBe(0);
  });

  it('should update AF KfW = 0 if sollzinsKfw = 2 and kreditlaufzeit = 0', () => {
    const sollzinsKfw = 2;
    const kreditlaufzeit = 0;
    const result = service.updateAfKfW(sollzinsKfw, kreditlaufzeit);
    expect(result).toBe(0);
  });

  it('should update AF KfW = 0.136863 if sollzinsKfw = 2.06 and kreditlaufzeit = 8 (result rounded to 6 digits)', () => {
    const sollzinsKfw = 2.06;
    const kreditlaufzeit = 8;
    const result = service.updateAfKfW(sollzinsKfw, kreditlaufzeit);
    expect(Number(result.toFixed(6))).toBe(0.136863);
  });

  it('should update AF Bank = 0 if kalkRealzins = 0 and kreditlaufzeit = 10', () => {
    const kalkRealzins = 0;
    const kreditlaufzeit = 10;
    const result = service.updateAfBank(kalkRealzins, kreditlaufzeit);
    expect(result).toBe(0);
  });

  it('should update AF Bank = 0 if kalkRealzins = 2 and kreditlaufzeit = 0', () => {
    const kalkRealzins = 2;
    const kreditlaufzeit = 0;
    const result = service.updateAfBank(kalkRealzins, kreditlaufzeit);
    expect(result).toBe(0);
  });

  it('should update AF Bank = 0.148528 if kalkRealzins = 4 and kreditlaufzeit = 8 (result rounded to 6 digits)', () => {
    const kalkRealzins = 4;
    const kreditlaufzeit = 8;
    const result = service.updateAfBank(kalkRealzins, kreditlaufzeit);
    expect(Number(result.toFixed(6))).toBe(0.148528);
  });

  it('should return KfW Zuschuss min multiplier constant = 0.4', () => {
    // ATTENTION: VALUE HARD CODED.
    // If constant change, this test will fail
    expect(constants.kfwZuschussMinMultiplier).toBe(0.4);
  });

  it('should update KfW Zuschuss = 60000€ if Tilgungszuschuss = 20, EE Bonus = 5, NH Bonus = 5, WPB Bonus = 10, SerSan Bonus = 15, Foerdersumme = 150000€', () => {
    const tilgungszuschuss = 20;
    const eeBonus = 5;
    const nhBonus = 5;
    const wpbBonus = 10;
    const serSanBonus = 15;
    const foerdersumme = 150000;
    const result = service.updateKfwZuschuss(
      tilgungszuschuss,
      eeBonus,
      nhBonus,
      wpbBonus,
      serSanBonus,
      foerdersumme
    );
    expect(result).toBe(60000);
  });

  it('should update KfW Zuschuss = 45000€ if Tilgungszuschuss = 20, EE Bonus = 5, NH Bonus = 5, WPB Bonus = 0, SerSan Bonus = 0, Foerdersumme = 150000€', () => {
    const tilgungszuschuss = 20;
    const eeBonus = 5;
    const nhBonus = 5;
    const wpbBonus = 0;
    const serSanBonus = 0;
    const foerdersumme = 150000;
    const result = service.updateKfwZuschuss(
      tilgungszuschuss,
      eeBonus,
      nhBonus,
      wpbBonus,
      serSanBonus,
      foerdersumme
    );
    expect(result).toBe(45000);
  });

  it('should update KfW Zuschuss = 37500€ if Tilgungszuschuss = 20, EE Bonus = 0, NH Bonus = 5, WPB Bonus = 0, SerSan Bonus = 0, Foerdersumme = 150000€', () => {
    const tilgungszuschuss = 20;
    const eeBonus = 0;
    const nhBonus = 5;
    const wpbBonus = 0;
    const serSanBonus = 0;
    const foerdersumme = 150000;
    const result = service.updateKfwZuschuss(
      tilgungszuschuss,
      eeBonus,
      nhBonus,
      wpbBonus,
      serSanBonus,
      foerdersumme
    );
    expect(result).toBe(37500);
  });

  it('should update KfW Zuschuss = 48000€ if Tilgungszuschuss = 20, EE Bonus = 0, NH Bonus = 0, WPB Bonus = 10, SerSan Bonus = 15, Foerdersumme = 120000€', () => {
    const tilgungszuschuss = 20;
    const eeBonus = 0;
    const nhBonus = 0;
    const wpbBonus = 10;
    const serSanBonus = 15;
    const foerdersumme = 120000;
    const result = service.updateKfwZuschuss(
      tilgungszuschuss,
      eeBonus,
      nhBonus,
      wpbBonus,
      serSanBonus,
      foerdersumme
    );
    expect(result).toBe(48000);
  });

  it('should update KfW Zuschuss = 18000€ if Tilgungszuschuss = 15, EE Bonus = 0, NH Bonus = 0, WPB Bonus = 0, SerSan Bonus = 0, Foerdersumme = 120000€', () => {
    const tilgungszuschuss = 15;
    const eeBonus = 0;
    const nhBonus = 0;
    const wpbBonus = 0;
    const serSanBonus = 0;
    const foerdersumme = 120000;
    const result = service.updateKfwZuschuss(
      tilgungszuschuss,
      eeBonus,
      nhBonus,
      wpbBonus,
      serSanBonus,
      foerdersumme
    );
    expect(result).toBe(18000);
  });

  it('should return KfW Kredit = 100000€ when Foerdersumme is 160000€ and KfW Zuschuss is 60000€. It is their subtraction.', () => {
    const foerdersumme = 160000;
    const kfwZuschuss = 60000;
    const result = service.updateKfwKredit(foerdersumme, kfwZuschuss);
    expect(result).toBe(100000);
  });
});
