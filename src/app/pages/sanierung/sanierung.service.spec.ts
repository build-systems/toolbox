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

  it('should update Bank-Kredit = 450000 when maxKfwKredit is 150000 and gesamtgestehungskosten is 600000', () => {
    const maxKfwKreditMock = 150000;
    const gesamtgestehungskostenMock = 600000;
    const result = service.updateBankKredit(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(450000);
  });

  it('should update Bank-Kredit = 0 when maxKfwKredit is 600000 and gesamtgestehungskosten is 500000', () => {
    const maxKfwKreditMock = 600000;
    const gesamtgestehungskostenMock = 500000;
    const result = service.updateBankKredit(
      maxKfwKreditMock,
      gesamtgestehungskostenMock
    );
    expect(result).toBe(0);
  });

  it('should update Bank-Kredit / m² = 100 € when Bank-Kredit is 100000 and wohnflaeche is 1000 m²', () => {
    const bankKredit = 100000;
    const wohnflaeche = 1000;
    const result = service.updateBankKreditM2(bankKredit, wohnflaeche);
    expect(result).toBe(100);
  });

  it('should update Bank-Kredit / bau = 50000 € when Bank-Kredit is 100000 and anzahlWohnungen is 2', () => {
    const bankKredit = 100000;
    const anzahlWohnungen = 2;
    const result = service.updateBankKreditM2(bankKredit, anzahlWohnungen);
    expect(result).toBe(50000);
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

  it('should update KfW Zuschuss / m² = 300 € when KfW Zuschuss is 30000 and Wohnflaeche is 100', () => {
    const kfwZuschuss = 30000;
    const wohnflaeche = 100;
    const result = service.updateKfwZuschussM2(kfwZuschuss, wohnflaeche);
    expect(result).toBe(300);
  });

  it('should update KfW Zuschuss / bau = 10000 € when KfW Zuschuss is 30000 and Anzahl Wohnungen is 3', () => {
    const kfwZuschuss = 30000;
    const anzahlWohnungen = 3;
    const result = service.updateKfwZuschussProBau(
      kfwZuschuss,
      anzahlWohnungen
    );
    expect(result).toBe(10000);
  });

  it('should update KfW Kredit = 100000€ when Foerdersumme is 160000€ and KfW Zuschuss is 60000€. It is their subtraction.', () => {
    const foerdersumme = 160000;
    const kfwZuschuss = 60000;
    const result = service.updateKfwKredit(foerdersumme, kfwZuschuss);
    expect(result).toBe(100000);
  });

  it('should update KfW Kredit / m² = 300 € when KfW Kredit is 30000 and Wohnflaeche is 100', () => {
    const kfwKredit = 30000;
    const wohnflaeche = 100;
    const result = service.updateKfwKreditM2(kfwKredit, wohnflaeche);
    expect(result).toBe(300);
  });

  it('should update KfW Kredit / bau = 10000 € when KfW Kredit is 30000 and Anzahl Wohnungen is 3', () => {
    const kfwKredit = 30000;
    const anzahlWohnungen = 3;
    const result = service.updateKfwKreditProBau(kfwKredit, anzahlWohnungen);
    expect(result).toBe(10000);
  });

  it('should update Annuitaet KfW = 10000 € if KfW Kredit is 100000 and AF KfW is 0.1', () => {
    const kfwKredit = 100000;
    const afKfw = 0.1;
    const result = service.updateAnnuitaetBank(kfwKredit, afKfw);
    expect(result).toBe(10000);
  });

  it('should update Annuitaet Bank = 10000 € if Bank Kredit is 100000 and AF Bank is 0.1', () => {
    const bankKredit = 100000;
    const afBank = 0.1;
    const result = service.updateAnnuitaetBank(bankKredit, afBank);
    expect(result).toBe(10000);
  });

  it('should update EF KfW = 20000 € if KfW Kredit is 100000 Sollzins KfW is 2 Kreditlaufzeit is 10', () => {
    const kfwKredit = 100000;
    const sollzinsKfw = 2;
    const kreditlaufzeit = 10;
    const result = service.updateEfKfw(kfwKredit, sollzinsKfw, kreditlaufzeit);
    expect(result).toBe(20000);
  });

  it('should update EF Bank = 20000 € if Bank Kredit is 100000 Kalk. Realzins is 2 Kreditlaufzeit is 10', () => {
    const bankKredit = 100000;
    const kalkRealzins = 2;
    const kreditlaufzeit = 10;
    const result = service.updateEfBank(
      bankKredit,
      kalkRealzins,
      kreditlaufzeit
    );
    expect(result).toBe(20000);
  });

  it('should update Finanzierungskosten KfW = 20000 if KfW Darlehen is Annuitäten, Annuitaet-KfW is 10000 kreditlaufzeit is 10, KfW-Kredit is 100000, EF-KfW is 10000', () => {
    const kfWDarlehen: KfWDarlehen = 'Annuitäten';
    const annuitaetKfW = 10000;
    const kreditlaufzeit = 10;
    const kfwKredit = 80000;
    const efKfW = 10000;
    const result = service.updateFinanzierungskostenKfw(
      kfWDarlehen,
      annuitaetKfW,
      kreditlaufzeit,
      kfwKredit,
      efKfW
    );
    expect(result).toBe(20000);
  });

  it('should update Finanzierungskosten KfW = 10000 if KfW Darlehen is Endfälliges, Annuitaet-KfW is 10000 kreditlaufzeit is 10, KfW-Kredit is 100000, EF-KfW is 10000', () => {
    const kfWDarlehen: KfWDarlehen = 'Endfälliges';
    const annuitaetKfW = 10000;
    const kreditlaufzeit = 10;
    const kfwKredit = 80000;
    const efKfW = 10000;
    const result = service.updateFinanzierungskostenKfw(
      kfWDarlehen,
      annuitaetKfW,
      kreditlaufzeit,
      kfwKredit,
      efKfW
    );
    expect(result).toBe(10000);
  });

  it('should update Finanzierungskosten KfW / m² = 300 € when Finanzierungskosten KfW is 30000 and Wohnflaeche is 100', () => {
    const finanzierungskostenKfw = 30000;
    const wohnflaeche = 100;
    const result = service.updateFinanzierungskostenKfwM2(
      finanzierungskostenKfw,
      wohnflaeche
    );
    expect(result).toBe(300);
  });

  it('should update Finanzierungskosten (Finanzmarkt) = 20000 if bank Darlehen is Annuitäten, Annuitaet is 10000 kreditlaufzeit is 10, bank-Kredit is 100000, EF-KfW is 10000', () => {
    const bankDarlehen: KfWDarlehen = 'Annuitäten';
    const annuitaetBank = 10000;
    const kreditlaufzeit = 10;
    const bankKredit = 80000;
    const efBank = 10000;
    const result = service.updateFinanzierungskostenFinanzmarkt(
      bankDarlehen,
      annuitaetBank,
      kreditlaufzeit,
      bankKredit,
      efBank
    );
    expect(result).toBe(20000);
  });

  it('should update Finanzierungskosten (Finanzmarkt) = 10000 if bank Darlehen is Endfälliges, Annuitaet is 8000 kreditlaufzeit is 10, bank-Kredit is 100000, EF-KfW is 10000', () => {
    const bankDarlehen: KfWDarlehen = 'Endfälliges';
    const annuitaetBank = 8000;
    const kreditlaufzeit = 10;
    const bankKredit = 80000;
    const efBank = 10000;
    const result = service.updateFinanzierungskostenFinanzmarkt(
      bankDarlehen,
      annuitaetBank,
      kreditlaufzeit,
      bankKredit,
      efBank
    );
    expect(result).toBe(10000);
  });

  it('should update Finanzierungskosten (Finanzmarkt) / m² = 300 € when Finanzierungskosten (Finanzmarkt) is 30000 and Wohnflaeche is 100', () => {
    const finanzierungskostenBank = 30000;
    const wohnflaeche = 100;
    const result = service.updateFinanzierungskostenFinanzmarktM2(
      finanzierungskostenBank,
      wohnflaeche
    );
    expect(result).toBe(300);
  });

  it('should update Investitionskosten = 600000 € if Wohnflaeche is 200 m² and gestehungskosten is 3000 €/m²', () => {
    const wohnflaeche = 200;
    const gestehungskosten = 3000;
    const result = service.updateInvestitionskosten(wohnflaeche, gestehungskosten);
    expect(result).toBe(600000);
  });

  it('should update Investitionskosten / bau = 300000 € when Investitionskosten is 600000 and Anzahl Wohnungen is 2', () => {
    const investitionskosten = 600000;
    const anzahlWohnungen = 2;
    const result = service.updateInvestitionskostenProBau(
      investitionskosten,
      anzahlWohnungen
    );
    expect(result).toBe(300000);
  });

});
