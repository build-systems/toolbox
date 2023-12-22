// Projekt
type Energiestandard = "EH 40" | "EH 55" | "EH 70" | "EH 85" | "EH 100" | "EH 115";
type EnergiestandardOptions = {
    id: string;
    value: Energiestandard;
};
type Zertifizierung = "Keine Zertifizierung" | "QNG";
type ZertifizierungOptions ={
    id: string;
    value: Zertifizierung;
}
// Sanierung
type ZustandBestand = "Unsaniert" | "Teilsaniert" | "Umfassend saniert";
type ZustandBestandOptions = {
    id: string;
    value: ZustandBestand;
};
// Neubau
type Konstruktion = "Konventionell" | "Holzbau";
type KonstruktionOptions = {
    id: string;
    value: Konstruktion;
}
type Kellergeschoss = "Vorhanden" | "Nicht Vorhanden";
type KellergeschossOptions = {
    id: string;
    value: Kellergeschoss;
};
type Stellplaetze = "Garage" | "Parkpalette" | "Tiefgarage";
type StellplaetzeOptions = {
    id: string;
    value: Stellplaetze;
};
type Aufzugsanlage = "Vorhanden" | "Nicht Vorhanden";
type AufzugsanlageOptions = {
    id: string;
    value: Aufzugsanlage;
};
type BarrierefreiesBauen = "Keine Anforderungen" | "Barrierereduziert" | "Barrierefrei" | "Barrierefrei (R)";
type BarrierefreiesBauenOptions = {
    id: string;
    value: BarrierefreiesBauen;
};
type Dachbegruenung = "Vorhanden" | "Nicht Vorhanden";
type DachbegruenungOptions = {
    id: string;
    value: Dachbegruenung;
};
// Anspruchsvolle Baustellenlogistik
type Baustellenlogistik = "Vorhanden" | "Nicht Vorhanden";
type BaustellenlogistikOptions = {
    id: string;
    value: Baustellenlogistik;
};
type Aussenanlagen = "Gering" | "Mittel" | "Hoch";
type AussenanlagenOptions = {
    id: string;
    value: Aussenanlagen;
};
// Darlehen
type KfWDarlehen = "Annuitäten" | "Endfälliges" | "kein";
type KfWDarlehenOptions = {
    id: string;
    value: KfWDarlehen;
};
type BankDarlehen = "Annuitäten" | "Endfälliges";
type BankDarlehenOptions = {
    id: string;
    value: BankDarlehen;
};