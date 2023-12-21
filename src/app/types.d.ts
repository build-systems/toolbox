// Projekt
type Energiestandard = "EH 40" | "EH 55" | "EH 70" | "EH 85" | "EH 100" | "EH 115";
type EnergiestandardOptions = {
    id: string;
    value: Energiestandard;
};
type Konstruktion = "Konventionell" | "Holzbau";
type KonstruktionOptions = {
    id: string;
    value: Konstruktion;
}
type Zertifizierung = "Keine Zertifizierung" | "QNG";
type ZertifizierungOptions ={
    id: string;
    value: Zertifizierung;
}
// Sanierung
type ZustandBestand = "Unsaniert" | "Teilsaniert" | "Umfassend saniert";
// Neubau
type Kellergeschoss = "Vorhanden" | "Nicht Vorhanden";
type Stellplaetze = "Garage" | "Parkpalette" | "Tiefgarage";
type Aufzugsanlage = "Vorhanden" | "Nicht Vorhanden";
type BarrierefreiesBauen = "Keine Anforderungen" | "Barrierereduziert" | "Barrierefrei" | "Barrierefrei (R)";
type Dachbegruenung = "Vorhanden" | "Nicht Vorhanden";
type AnspruchsvolleBaustellenlogistik = "Vorhanden" | "Nicht Vorhanden";
type Aussenanlagen = "Gering" | "Mittel" | "Hoch";
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