import { TestBed } from '@angular/core/testing';

import { NeubauService } from './neubau.service';
import { neubau } from '../../shared/constants';

describe('NeubauService', () => {
  let service: NeubauService;
  let constants: neubau;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [neubau] });
    service = TestBed.inject(NeubauService);
    constants = TestBed.inject(neubau);
  });

  it('NeubauService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return kellerVorhanden constant = 147', () => {
    expect(constants.kellerVorhanden).toBe(147);
  });

  it('should update Kellergeschoss to the kellerVorhanden constant', () => {
    const kellergeschossIn: Kellergeschoss = 'Vorhanden';
    const result = service.updateKellergeschossOut(kellergeschossIn);
    expect(result).toBe(constants.kellerVorhanden);
  });

  it('should update Kellergeschoss to 0', () => {
    const kellergeschossIn: Kellergeschoss = 'Nicht Vorhanden';
    const result = service.updateKellergeschossOut(kellergeschossIn);
    expect(result).toBe(0);
  });

  it('should return constants for Stellplaetze: Tiefgarage = 490; Garage = 68; Parkpalette = 95', () => {
    expect(constants.stellplaetze.tiefgarage).toBe(490);
    expect(constants.stellplaetze.garage).toBe(68);
    expect(constants.stellplaetze.parkpalette).toBe(95);
  });

  it('should update Stellpletze to Tiefgarage constant', () => {
    const stellplaetzeIn: Stellplaetze = 'Tiefgarage';
    const result = service.updateStellplaetzeOut(stellplaetzeIn);
    expect(result).toBe(constants.stellplaetze.tiefgarage);
  });

  it('should update Stellpletze to Garage constant', () => {
    const stellplaetzeIn: Stellplaetze = 'Garage';
    const result = service.updateStellplaetzeOut(stellplaetzeIn);
    expect(result).toBe(constants.stellplaetze.garage);
  });

  it('should update Stellpletze to Parkpalette constant', () => {
    const stellplaetzeIn: Stellplaetze = 'Parkpalette';
    const result = service.updateStellplaetzeOut(stellplaetzeIn);
    expect(result).toBe(constants.stellplaetze.parkpalette);
  });

  it('should return constant for RedGarage = -68', () => {
    expect(constants.redGarage).toBe(-68);
  });

  it('should update Red Garage to its constant when Kellergeschoss is Vorhanden and Stellplaetze is Tiefgarage', () => {
    const kellergeschossIn: Kellergeschoss = 'Vorhanden';
    const stellplaetzeIn: Stellplaetze = 'Tiefgarage';
    const result = service.updateRedGarageOut(kellergeschossIn, stellplaetzeIn);
    expect(result).toBe(constants.redGarage);
  });

  it('should update Red Garage to 0 when Kellergeschoss is Nicht Vorhanden and Stellplaetze is Garage', () => {
    const kellergeschossIn: Kellergeschoss = 'Nicht Vorhanden';
    const stellplaetzeIn: Stellplaetze = 'Garage';
    const result = service.updateRedGarageOut(kellergeschossIn, stellplaetzeIn);
    expect(result).toBe(0);
  });

  it('should return constant for aufzugsanlageVorhanden = 93', () => {
    expect(constants.aufzugsanlageVorhanden).toBe(93);
  });

  it('should update Aufzugsanlage Vorhanden to its constant when Vorhanden is selected', () => {
    const aufzugsanlageVorhandenIn: Aufzugsanlage = 'Vorhanden';
    const result = service.updateAufzugsanlageOut(aufzugsanlageVorhandenIn);
    expect(result).toBe(constants.aufzugsanlageVorhanden);
  });

  it('should update Aufzugsanlage Vorhanden to 0', () => {
    const aufzugsanlageVorhandenIn: Aufzugsanlage = 'Nicht Vorhanden';
    const result = service.updateAufzugsanlageOut(aufzugsanlageVorhandenIn);
    expect(result).toBe(0);
  });

  it('should return constants for Barrierefreies Bauen: Reduziert = 62; Frei = 199; Frei (R) = 348', () => {
    expect(constants.barriere.reduziert).toBe(62);
    expect(constants.barriere.frei).toBe(199);
    expect(constants.barriere.freiR).toBe(348);
  });

  it('should update Barrierefreiheit to Reduziert constant', () => {
    const barrierefreiheitIn: BarrierefreiesBauen = 'Barrierereduziert';
    const result = service.updateBarrierefreiheitOut(barrierefreiheitIn);
    expect(result).toBe(constants.barriere.reduziert);
  });

  it('should update Barrierefreiheit to Barrierefrei constant', () => {
    const barrierefreiheitIn: BarrierefreiesBauen = 'Barrierefrei';
    const result = service.updateBarrierefreiheitOut(barrierefreiheitIn);
    expect(result).toBe(constants.barriere.frei);
  });

  it('should update Barrierefreiheit to Barrierefrei (R) constant', () => {
    const barrierefreiheitIn: BarrierefreiesBauen = 'Barrierefrei (R)';
    const result = service.updateBarrierefreiheitOut(barrierefreiheitIn);
    expect(result).toBe(constants.barriere.freiR);
  });

  it('should update Barrierefreiheit to zero', () => {
    const barrierefreiheitIn: BarrierefreiesBauen = 'Keine Anforderungen';
    const result = service.updateBarrierefreiheitOut(barrierefreiheitIn);
    expect(result).toBe(0);
  });

  it('should return constant for Dachbegruenung Vorhanden = 55', () => {
    expect(constants.dachbegruenungVorhanden).toBe(55);
  });

  it('should update Dachbegruenung to its constant when Vorhanden is selected', () => {
    const dachbegruenungIn: Dachbegruenung = 'Vorhanden';
    const result = service.updateDachbegruenungOut(dachbegruenungIn);
    expect(result).toBe(constants.dachbegruenungVorhanden);
  });

  it('should update Dachbegruenung to 0', () => {
    const dachbegruenungIn: Dachbegruenung = 'Nicht Vorhanden';
    const result = service.updateDachbegruenungOut(dachbegruenungIn);
    expect(result).toBe(0);
  });

  it('should return constant for Baustellenlogistik Vorhanden = 212', () => {
    expect(constants.baustellenlogistikVorhanden).toBe(212);
  });

  it('should update Baustellenlogistik to its constant when Vorhanden is selected', () => {
    const baustellenlogistikIn: Baustellenlogistik = 'Vorhanden';
    const result = service.updateBaustellenlogistikOut(baustellenlogistikIn);
    expect(result).toBe(constants.baustellenlogistikVorhanden);
  });

  it('should update Baustellenlogistik to 0', () => {
    const baustellenlogistikIn: Baustellenlogistik = 'Nicht Vorhanden';
    const result = service.updateBaustellenlogistikOut(baustellenlogistikIn);
    expect(result).toBe(0);
  });

  // gering: 62,
  // mittel: 150,
  // hoch: 277

  it('should return constants for Aussenanlagen: Gering = 62; Mittel = 150; Hoch = 277', () => {
    expect(constants.aussenanlagen.gering).toBe(62);
    expect(constants.aussenanlagen.mittel).toBe(150);
    expect(constants.aussenanlagen.hoch).toBe(277);
  });

  it('should update Aussenanlagen to Gering constant', () => {
    const aussenanlagenIn: Aussenanlagen = 'Gering';
    const result = service.updateAussenanlagenOut(aussenanlagenIn);
    expect(result).toBe(constants.aussenanlagen.gering);
  });

  it('should update Aussenanlagen to Mittel constant', () => {
    const aussenanlagenIn: Aussenanlagen = 'Mittel';
    const result = service.updateAussenanlagenOut(aussenanlagenIn);
    expect(result).toBe(constants.aussenanlagen.mittel);
  });

  it('should update Aussenanlagen to Hoch constant', () => {
    const aussenanlagenIn: Aussenanlagen = 'Hoch';
    const result = service.updateAussenanlagenOut(aussenanlagenIn);
    expect(result).toBe(constants.aussenanlagen.hoch);
  });

  it('should return constants for Energetischer Standard Price: EH 40 = 156; GEG = 0; EH 70 = 0', () => {
    expect(constants.energetischerStandardPrice.EH40).toBe(156);
    expect(constants.energetischerStandardPrice.GEG).toBe(0);
    expect(constants.energetischerStandardPrice.EH70).toBe(0);
  });

  it('should update Energetischer Standard Price to EH 40 constant', () => {
    const energiestandard: EnergiestandardNeubau = 'EH 40';
    const result = service.updateEnergetischerStandardOut(energiestandard);
    expect(result).toBe(constants.energetischerStandardPrice.EH40);
  });

  it('should update Energetischer Standard Price to GEG constant', () => {
    const energiestandard: EnergiestandardNeubau = 'GEG';
    const result = service.updateEnergetischerStandardOut(energiestandard);
    expect(result).toBe(constants.energetischerStandardPrice.GEG);
  });

  it('should update Energetischer Standard Price to EH 70 constant', () => {
    const energiestandard: EnergiestandardNeubau = 'EH 70';
    const result = service.updateEnergetischerStandardOut(energiestandard);
    expect(result).toBe(constants.energetischerStandardPrice.EH70);
  });

  it('should return constant gestehungskostenBase = 2,436', () => {
    expect(constants.gestehungskostenBase).toBe(2436);
  });

  it('should update Gestehungskosten to 3,645 when user price is disabled (and other options are on)', () => {
    const userPrice = 3000;
    const userPriceDisabled = true;
    const kellergeschossOut = 147;
    const stellplaetzeOut = 490;
    const redGarageOut = -68;
    const aufzugsanlageOut = 93;
    const barrierefreiheitOut = 62;
    const dachbegruenungOut = 55;
    const baustellenlogistikOut = 212;
    const energetischerStandardOut = 156;
    const aussenanlagenOut = 62;
    const grundstuecksbezogeneKosten = 0;
    const baunebenkostenKeinFin = 0;
    const result = service.updateGestehungskosten(
      userPrice,
      userPriceDisabled,
      kellergeschossOut,
      stellplaetzeOut,
      redGarageOut,
      aufzugsanlageOut,
      barrierefreiheitOut,
      dachbegruenungOut,
      baustellenlogistikOut,
      energetischerStandardOut,
      aussenanlagenOut,
      grundstuecksbezogeneKosten,
      baunebenkostenKeinFin
    );
    expect(result).toBe(3645);
  });

  it('should update Gestehungskosten to 3,000 when user price is enabled and User Price is 3,000', () => {
    const userPrice = 3000;
    const userPriceDisabled = false;
    const kellergeschossOut = 147;
    const stellplaetzeOut = 490;
    const redGarageOut = -68;
    const aufzugsanlageOut = 93;
    const barrierefreiheitOut = 62;
    const dachbegruenungOut = 55;
    const baustellenlogistikOut = 212;
    const energetischerStandardOut = 156;
    const aussenanlagenOut = 62;
    const grundstuecksbezogeneKosten = 0;
    const baunebenkostenKeinFin = 0;
    const result = service.updateGestehungskosten(
      userPrice,
      userPriceDisabled,
      kellergeschossOut,
      stellplaetzeOut,
      redGarageOut,
      aufzugsanlageOut,
      barrierefreiheitOut,
      dachbegruenungOut,
      baustellenlogistikOut,
      energetischerStandardOut,
      aussenanlagenOut,
      grundstuecksbezogeneKosten,
      baunebenkostenKeinFin
    );
    expect(result).toBe(3000);
  });

  // public nrKredit = {
  //   lessThan10: 0.01,
  //   between10And25: 0.79,
  //   moreThan25: 1.02,
  // };

  it('should return constants for NR-Kredit: lessThan10: 0.01; between10And25: 0.79; moreThan25: 1.02', () => {
    expect(constants.nrKredit.lessThan10).toBe(0.01);
    expect(constants.nrKredit.between10And25).toBe(0.79);
    expect(constants.nrKredit.moreThan25).toBe(1.02);
  });

  it('should updtade NR-kredit to lessThan10 constant when kreditlaufzeit is 9', () => {
    const kreditlaufzeit = 9;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.lessThan10);
  });

  it('should updtade NR-kredit to lessThan10 constant when kreditlaufzeit is 2', () => {
    const kreditlaufzeit = 2;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.lessThan10);
  });

  it('should updtade NR-kredit to between10And25 constant when kreditlaufzeit is 11', () => {
    const kreditlaufzeit = 11;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.between10And25);
  });

  it('should updtade NR-kredit to between10And25 constant when kreditlaufzeit is 15', () => {
    const kreditlaufzeit = 15;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.between10And25);
  });

  it('should updtade NR-kredit to between10And25 constant when kreditlaufzeit is 20', () => {
    const kreditlaufzeit = 20;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.between10And25);
  });

  it('should updtade NR-kredit to between10And25 constant when kreditlaufzeit is 25', () => {
    const kreditlaufzeit = 25;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.between10And25);
  });

  it('should updtade NR-kredit to moreThan25 constant when kreditlaufzeit is 26', () => {
    const kreditlaufzeit = 26;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.moreThan25);
  });

  it('should updtade NR-kredit to moreThan25 constant when kreditlaufzeit is 30', () => {
    const kreditlaufzeit = 30;
    const result = service.updateNrKredit(kreditlaufzeit);
    expect(result).toBe(constants.nrKredit.moreThan25);
  });

  // sollzinsKfw_Endfälliges = 1.14

  it('should return Sollzins-KfW Endfälliges constant = 1.14', () => {
    expect(constants.sollzinsKfw_Endfälliges).toBe(1.14);
  });

  it('should update Sollzins-KfW to Endfälliges constant when Endfälliges is selected', () => {
    const kfWDarlehen: KfWDarlehen = 'Endfälliges';
    const nrKredit = 2;
    const result = service.updateSollzinsKfw(kfWDarlehen, nrKredit);
    expect(result).toBe(constants.sollzinsKfw_Endfälliges);
  });

  it('should update Sollzins-KfW to NR-Kredit when Annuitäten is selected', () => {
    const kfWDarlehen: KfWDarlehen = 'Annuitäten';
    const nrKredit = 2;
    const result = service.updateSollzinsKfw(kfWDarlehen, nrKredit);
    expect(result).toBe(nrKredit);
  });

  it('should update Sollzins-KfW to 0 when kein is selected', () => {
    const kfWDarlehen: KfWDarlehen = 'kein';
    const nrKredit = 2;
    const result = service.updateSollzinsKfw(kfWDarlehen, nrKredit);
    expect(result).toBe(0);
  });

  it('should update Gesamtgestehungskosten = 3000,000 when Gestehungskosten is 3,000 and Wohnflaeche is 1,000', () => {
    const gestehungskosten = 3000;
    const wohnflaeche = 1000;
    const result = service.updateGesamtgestehungskosten(
      gestehungskosten,
      wohnflaeche
    );
    expect(result).toBe(3000000);
  });

  it('should return KfW-Kredit Limit constants: lower = 100,000; higher= 150,000', () => {
    expect(constants.kfwKreditLimit.lower).toBe(100_000);
    expect(constants.kfwKreditLimit.higher).toBe(150_000);
  });

  it('should update KfW-Kredit = 1,500,000 when Zertifizierung is mit QNG; Energiestandard is EH 40; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'mit QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 40';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(1_500_000);
  });

  it('should update KfW-Kredit = 1,000,000 when Zertifizierung is ohne QNG; Energiestandard is EH 40; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'ohne QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 40';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(1_000_000);
  });

  it('should update KfW-Kredit = 0 when Zertifizierung is mit QNG; Energiestandard is GEG; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'mit QNG';
    const energetischerStandard: EnergiestandardNeubau = 'GEG';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(0);
  });

  it('should update KfW-Kredit = 0 when Zertifizierung is ohne QNG; Energiestandard is GEG; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'ohne QNG';
    const energetischerStandard: EnergiestandardNeubau = 'GEG';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(0);
  });

  it('should update KfW-Kredit = 0 when Zertifizierung is ohne QNG; Energiestandard is EH 70; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'ohne QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 70';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(0);
  });

  it('should update KfW-Kredit = 0 when Zertifizierung is mit QNG; Energiestandard is EH 70; Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'mit QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 70';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(0);
  });

  it('should update KfW-Kredit pro m² = 500 when KfW-Kredit is 500,000; and wohnflaeche is 1,000', () => {
    const kfwKredit: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateKfwKreditM2(kfwKredit, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update KfW-Kredit pro Bau = 500,000 when KfW-Kredit is 5,000,000; and Anzahl Wohnungen is 10', () => {
    const kfwKredit: number = 5_000_000;
    const anzahlWohnungen: number = 10;
    const result = service.updateKfwKreditProBau(kfwKredit, anzahlWohnungen);
    expect(result).toBe(500_000);
  });

  it('should return Restsumme Holzbau constant = 1.05', () => {
    expect(constants.holzbauBonus).toBe(1.05);
  });

  it('should update Bank-Kredit = 4,050,000 when Konstruction is Holzbau; Wohnflaeche is 1,000; Gestehungskosten is 5,000 and KfW-Kredit is 1,200,000', () => {
    const konstruktion: Konstruktion = 'Holzbau';
    const wohnflaeche: number = 1000;
    const gestehungskosten: number = 5000;
    const kfwKredit: number = 1_200_000;
    const result = service.updateBankKredit(
      konstruktion,
      wohnflaeche,
      gestehungskosten,
      kfwKredit
    );
    expect(result).toBe(4_050_000);
  });

  it('should update Bank-Kredit = 3,800,000 when Konstruction is not Holzbau; Wohnflaeche is 1,000; Gestehungskosten is 5,000 and KfW-Kredit is 1,200,000', () => {
    const konstruktion: Konstruktion = 'Konventionell';
    const wohnflaeche: number = 1000;
    const gestehungskosten: number = 5000;
    const kfwKredit: number = 1_200_000;
    const result = service.updateBankKredit(
      konstruktion,
      wohnflaeche,
      gestehungskosten,
      kfwKredit
    );
    expect(result).toBe(3_800_000);
  });

  it('should update Bank-Kredit pro m² = 500 when Bank-Kredit is 500,000; and wohnflaeche is 1,000', () => {
    const bankKredit: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateBankKreditM2(bankKredit, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update Bank-Kredit pro Bau = 500,000 when Bank-Kredit is 5,000,000; and Anzahl Wohnungen is 10', () => {
    const bankKredit: number = 5_000_000;
    const anzahlWohnungen: number = 10;
    const result = service.updateBankKreditProBau(bankKredit, anzahlWohnungen);
    expect(result).toBe(500_000);
  });

  it('should update AF-KfW to approx. 0.10439628 when Sollzins-KfW is 0.79 and kreditlaufzeit is 10', () => {
    const sollzinsKfw: number = 0.79;
    const kreditlaufzeit: number = 10;
    const result = service.updateAfKfW(sollzinsKfw, kreditlaufzeit);
    expect(result).toBeCloseTo(0.10439628);
  });

  it('should update Bank-KfW to approx. 0.12329094 when Kalk.Realzins is 4 and kreditlaufzeit is 10', () => {
    const kalkRealzins: number = 4;
    const kreditlaufzeit: number = 10;
    const result = service.updateAfBank(kalkRealzins, kreditlaufzeit);
    expect(result).toBeCloseTo(0.12329094);
  });

  it('should update Annuitaet-KfW to 10,000 when AF-KfW is 0.1 KfW-Kredit is 100,000', () => {
    const afKfw: number = 0.1;
    const kfwKredit: number = 100_000;
    const result = service.updateAnnuitaetKfw(afKfw, kfwKredit);
    expect(result).toBe(10_000);
  });

  it('should update Annuitaet-Bank to 10,000 when AF-Bank is 0.1 Bank-Kredit is 100,000', () => {
    const afBank: number = 0.1;
    const BankKredit: number = 100_000;
    const result = service.updateAnnuitaetBank(afBank, BankKredit);
    expect(result).toBe(10_000);
  });

  it('should update EF-KfW = 1,000 when KfW-Kredit is 100,000; Sollzins-KfW is 0.1 Kreditlaufzeit is 10', () => {
    const kfwKredit: number = 100_000;
    const sollzinsKfw: number = 0.1;
    const kreditlaufzeit: number = 10;
    const result = service.updateEfKfw(kfwKredit, sollzinsKfw, kreditlaufzeit);
    expect(result).toBe(1000);
  });

  it('should update EF-Bank = 1,000 when Bank-Kredit is 100,000; Kalk.Realzins is 0.1 Kreditlaufzeit is 10', () => {
    const bankKredit: number = 100_000;
    const kalkRealzins: number = 4;
    const kreditlaufzeit: number = 10;
    const result = service.updateEfBank(
      bankKredit,
      kalkRealzins,
      kreditlaufzeit
    );
    expect(result).toBe(40_000);
  });

  it('should update Finanzierungskosten-KfW = 300,000 when kfW-Darlehen is Annuitäten; Annuitaet-KfW is 20000; Kreditlaufzeit is 20; KfW-Kredit is 100000; and EF-KfW is 1,000', () => {
    const kfWDarlehen: KfWDarlehen = 'Annuitäten';
    const annuitaetKfW: number = 20_000;
    const kreditlaufzeit: number = 20;
    const kfwKredit: number = 100_000;
    const efKfW: number = 1000;
    const result = service.updateFinanzierungskostenKfw(
      kfWDarlehen,
      annuitaetKfW,
      kreditlaufzeit,
      kfwKredit,
      efKfW
    );
    expect(result).toBe(300_000);
  });

  it('should update Finanzierungskosten-KfW pro m² = 500 when Finanzierungskosten-KfW is 500,000; and wohnflaeche is 1,000', () => {
    const finanzierungskostenKfW: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateFinanzierungskostenKfwM2(finanzierungskostenKfW, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update Finanzierungskosten-KfW = 40,000 when kfW-Darlehen is Endfälliges and EF-KfW is 40,000', () => {
    const kfWDarlehen: KfWDarlehen = 'Endfälliges';
    const annuitaetKfW: number = 20_000;
    const kreditlaufzeit: number = 20;
    const kfwKredit: number = 100_000;
    const efKfW: number = 40_000;
    const result = service.updateFinanzierungskostenKfw(
      kfWDarlehen,
      annuitaetKfW,
      kreditlaufzeit,
      kfwKredit,
      efKfW
    );
    expect(result).toBe(40_000);
  });

  it('should update Finanzierungskosten-KfW = 0 when kfW-Darlehen is kein', () => {
    const kfWDarlehen: KfWDarlehen = 'kein';
    const annuitaetKfW: number = 20_000;
    const kreditlaufzeit: number = 20;
    const kfwKredit: number = 100_000;
    const efKfW: number = 40_000;
    const result = service.updateFinanzierungskostenKfw(
      kfWDarlehen,
      annuitaetKfW,
      kreditlaufzeit,
      kfwKredit,
      efKfW
    );
    expect(result).toBe(0);
  });

  // Bank
  it('should update Finanzierungskosten-Bank = 300,000 when: Bank-Darlehen is Annuitäten; Annuitaet-Bank is 20,000; Kreditlaufzeit is 20; Bank-Kredit is 100,000; and EF-Bank is 1,000', () => {
    const BankDarlehen: BankDarlehen = 'Annuitäten';
    const annuitaetBank: number = 20_000;
    const kreditlaufzeit: number = 20;
    const BankKredit: number = 100_000;
    const efBank: number = 1000;
    const result = service.updateFinanzierungskostenBank(
      BankDarlehen,
      annuitaetBank,
      kreditlaufzeit,
      BankKredit,
      efBank
    );
    expect(result).toBe(300_000);
  });

  it('should update Finanzierungskosten-Bank = 40,000 when Bank-Darlehen is Endfälliges and EF-Bank is 40,000', () => {
    const bankDarlehen: BankDarlehen = 'Endfälliges';
    const annuitaetBank: number = 20_000;
    const kreditlaufzeit: number = 20;
    const BankKredit: number = 100_000;
    const efBank: number = 40_000;
    const result = service.updateFinanzierungskostenBank(
      bankDarlehen,
      annuitaetBank,
      kreditlaufzeit,
      BankKredit,
      efBank
    );
    expect(result).toBe(40_000);
  });

  it('should update Finanzierungskosten-Bank pro m² = 500 when Finanzierungskosten-Bank is 500,000; and wohnflaeche is 1,000', () => {
    const finanzierungskostenBank: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateFinanzierungskostenBankM2(finanzierungskostenBank, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update investitionkosten = 10,000,000 when wohnflaeche 1,000 and gestehungskosten is 10,000', () => {
    const wohnflaeche: number = 1000;
    const gestehungskosten: number = 10_000;
    const result = service.updateInvestitionskosten(
      wohnflaeche,
      gestehungskosten
    );
    expect(result).toBe(10_000_000);
  });

  it('should update Investitionskosten pro m² = 500 when Investitionskosten is 500,000; and wohnflaeche is 1,000', () => {
    const investitionskosten: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateInvestitionskostenM2(investitionskosten, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update Investitionskosten pro Bau = 500,000 when Investitionskosten is 5,000,000; and Anzahl Wohnungen is 10', () => {
    const investitionskosten: number = 5_000_000;
    const anzahlWohnungen: number = 10;
    const result = service.updateInvestitionskostenProBau(investitionskosten, anzahlWohnungen);
    expect(result).toBe(500_000);
  });

  it('should update GB-Annuitaet = 5,000,000 when KfW-Kredit is 2,000,000; Bank-Kredit is 3_000_000; AF-Bank is 0.1; Kreditlaufzeit is 20', () => {
    const kfwKredit: number = 2_000_000;
    const bankKredit: number = 3_000_000;
    const afBank: number = 0.1;
    const kreditlaufzeit: number = 20;
    const result = service.updateGbAnnuitaet(
      kfwKredit,
      bankKredit,
      afBank,
      kreditlaufzeit
    );
    expect(result).toBe(5_000_000);
  });

  it('should update GB-Endfaelliges = 4,000,000 when Kalk.Realzins is 4; KfW-Kredit is 2,000,000; Bank-Kredit is 3,000,000; and Kreditlaufzeitis 20', () => {
    const kalkRealzins: number = 4;
    const kfwKredit: number = 2_000_000;
    const bankKredit: number = 3_000_000;
    const kreditlaufzeit: number = 20;
    const result = service.updateGbEndfaelliges(
      kalkRealzins,
      kfwKredit,
      bankKredit,
      kreditlaufzeit
    );
    expect(result).toBe(4_000_000);
  });

  it('should update Ohne-KfW = 500,000 when Bank-Darlehen is Annuitäten; and GB-Annuitaet is 500,000', () => {
    const bankDarlehen: BankDarlehen = 'Annuitäten';
    const gbEndfaelliges: number = 3_000_000;
    const gbAnnuitaet: number = 500_000;
    const result = service.updateFinKostenOhneKfw(
      bankDarlehen,
      gbEndfaelliges,
      gbAnnuitaet
    );
    expect(result).toBe(gbAnnuitaet);
  });

  it('should update Finanzierungskosten Ohne-KfW = 3,000,000 when Bank-Darlehen is Endfälliges; and GB-Endfaelliges is 3,000,000', () => {
    const bankDarlehen: BankDarlehen = 'Endfälliges';
    const gbEndfaelliges: number = 3_000_000;
    const gbAnnuitaet: number = 500_000;
    const result = service.updateFinKostenOhneKfw(
      bankDarlehen,
      gbEndfaelliges,
      gbAnnuitaet
    );
    expect(result).toBe(gbEndfaelliges);
  });

  it('should update Finanzierungskosten Ohne-KfW pro m² = 500 when Finanzierungskosten Ohne-KfW is 500,000; and wohnflaeche is 1,000', () => {
    const finKostenOhneKfw: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateFinKostenOhneKfwM2(finKostenOhneKfw, wohnflaeche);
    expect(result).toBe(500);
  });

  it('should update Mit-KfW = 5,000,000 when Finanzierungskosten-KfW is 2,000,000 and Finanzierungskosten-Bank is 3,000,000', () => {
    const finanzierungskostenKfw: number = 2_000_000;
    const finanzierungskostenBank: number = 3_000_000;
    const result = service.updateFinKostenMitKfw(
      finanzierungskostenKfw,
      finanzierungskostenBank
    );
    expect(result).toBe(5_000_000);
  });

  it('should update Finanzierungskosten Mit-KfW pro m² = 500 when Finanzierungskosten Mit-KfW is 500,000; and wohnflaeche is 1,000', () => {
    const finKostenMitKfw: number = 500_000;
    const wohnflaeche: number = 1000;
    const result = service.updateFinKostenMitKfwM2(finKostenMitKfw, wohnflaeche);
    expect(result).toBe(500);
  });
});
