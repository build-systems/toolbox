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

  it('should return constants for Stellplaetze: Tiefgarage = 490, Garage = 68, Parkpalette = 95', () => {
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

  it('should return constants for Barrierefreies Bauen: Reduziert = 62, Frei = 199, Frei (R) = 348', () => {
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

  it('should return constants for Aussenanlagen: Gering = 62, Mittel = 150, Hoch = 277', () => {
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

  it('should return constants for Energetischer Standard Price: EH 40 = 156, GEG = 0, EH 70 = 0', () => {
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

  it('should return constant gestehungskostenBase = 2436', () => {
    expect(constants.gestehungskostenBase).toBe(2436);
  });

  it('should update Gestehungskosten to 3645 user price disabled', () => {
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

  it('should update Gestehungskosten to 3000 user price enabled', () => {
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

  it('should return constants for NR-Kredit: lessThan10: 0.01, between10And25: 0.79, moreThan25: 1.02', () => {
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

  it('should update Gesamtgestehungskosten = 3000000 when Gestehungskosten is 3000 and Wohnflaeche is 1000', () => {
    const gestehungskosten = 3000;
    const wohnflaeche = 1000;
    const result = service.updateGesamtgestehungskosten(
      gestehungskosten,
      wohnflaeche
    );
    expect(result).toBe(3000000);
  });

  it('should return KfW-Kredit Limit constants: lower = 100000, higher= 150000', () => {
    expect(constants.kfwKreditLimit.lower).toBe(100000);
    expect(constants.kfwKreditLimit.higher).toBe(150000);
  });

  it('should update KfW-Kredit = 1500000 when Zertifizierung is mit QNG, Energiestandard is EH 40, Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'mit QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 40';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(1500000);
  });

  it('should update KfW-Kredit = 1000000 when Zertifizierung is ohne QNG, Energiestandard is EH 40, Anzahl Wohnungen is 10', () => {
    const zertifizierung: ZertifizierungNeubau = 'ohne QNG';
    const energetischerStandard: EnergiestandardNeubau = 'EH 40';
    const anzahlWohnungen = 10;
    const result = service.updateKfwKredit(
      zertifizierung,
      energetischerStandard,
      anzahlWohnungen
    );
    expect(result).toBe(1000000);
  });

  it('should update KfW-Kredit = 0 when Zertifizierung is mit QNG, Energiestandard is GEG, Anzahl Wohnungen is 10', () => {
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

  it('should update KfW-Kredit = 0 when Zertifizierung is ohne QNG, Energiestandard is GEG, Anzahl Wohnungen is 10', () => {
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

  it('should update KfW-Kredit = 0 when Zertifizierung is ohne QNG, Energiestandard is EH 70, Anzahl Wohnungen is 10', () => {
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

  it('should update KfW-Kredit = 0 when Zertifizierung is mit QNG, Energiestandard is EH 70, Anzahl Wohnungen is 10', () => {
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

  it('should return Restsumme Holzbau constant = 1.05', () => {
    expect(constants.holzbauBonus).toBe(1.05);
  });

  it('should update Bank-Kredit = 4050000 when Konstruction is Holzbau, Wohnflaeche is 1000, Gestehungskosten is 5000 and KfW-Kredit is 1200000', () => {
    const konstruktion: Konstruktion = 'Holzbau';
    const wohnflaeche: number = 1000;
    const gestehungskosten: number = 5000;
    const kfwKredit: number = 1200000;
    const result = service.updateBankKredit(
      konstruktion,
      wohnflaeche,
      gestehungskosten,
      kfwKredit
    );
    expect(result).toBe(4050000);
  });

  it('should update Bank-Kredit = 3800000 when Konstruction is not Holzbau, Wohnflaeche is 1000, Gestehungskosten is 5000 and KfW-Kredit is 1200000', () => {
    const konstruktion: Konstruktion = 'Konventionell';
    const wohnflaeche: number = 1000;
    const gestehungskosten: number = 5000;
    const kfwKredit: number = 1200000;
    const result = service.updateBankKredit(
      konstruktion,
      wohnflaeche,
      gestehungskosten,
      kfwKredit
    );
    expect(result).toBe(3800000);
  });

  // updateAfKfW
});
