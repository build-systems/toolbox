// I added the optional text variable to be
// able to change how it is displayed without affecting the logic

// Projekt
type Energiestandard = "EH 40" | "EH 55" | "EH 70" | "EH 85" | "EH 100" | "EH 115";
type EnergiestandardOptions = {
    id: string;
    value: Energiestandard;
    text?: string;
};
type Zertifizierung = "Keine Zertifizierung" | "QNG";
type ZertifizierungOptions = {
    id: string;
    value: Zertifizierung;
    text?: string;
}

// Sanierung
type ZustandBestand = "Unsaniert" | "Teilsaniert" | "Umfassend saniert";
type ZustandBestandOptions = {
    id: string;
    value: ZustandBestand;
    text?: string;
};

// Neubau
type Konstruktion = "Konventionell" | "Holzbau";
type KonstruktionOptions = {
    id: string;
    value: Konstruktion;
    text?: string;
}
type Kellergeschoss = "Vorhanden" | "Nicht Vorhanden";
type KellergeschossOptions = {
    id: string;
    value: Kellergeschoss;
    text?: string;
};
type Stellplaetze = "Garage" | "Parkpalette" | "Tiefgarage";
type StellplaetzeOptions = {
    id: string;
    value: Stellplaetze;
    text?: string;
};
type Aufzugsanlage = "Vorhanden" | "Nicht Vorhanden";
type AufzugsanlageOptions = {
    id: string;
    value: Aufzugsanlage;
    text?: string;
};
type BarrierefreiesBauen = "Keine Anforderungen" | "Barrierereduziert" | "Barrierefrei" | "Barrierefrei (R)";
type BarrierefreiesBauenOptions = {
    id: string;
    value: BarrierefreiesBauen;
    text?: string;
};
type Dachbegruenung = "Vorhanden" | "Nicht Vorhanden";
type DachbegruenungOptions = {
    id: string;
    value: Dachbegruenung;
    text?: string;
};
// Anspruchsvolle Baustellenlogistik
type Baustellenlogistik = "Vorhanden" | "Nicht Vorhanden";
type BaustellenlogistikOptions = {
    id: string;
    value: Baustellenlogistik;
    text?: string;
};
type Aussenanlagen = "Gering" | "Mittel" | "Hoch";
type AussenanlagenOptions = {
    id: string;
    value: Aussenanlagen;
    text?: string;
};

// Darlehen
type KfWDarlehen = "Annuitäten" | "Endfälliges" | "kein";
type KfWDarlehenOptions = {
    id: string;
    value: KfWDarlehen;
    text?: string;
};
type BankDarlehen = "Annuitäten" | "Endfälliges";
type BankDarlehenOptions = {
    id: string;
    value: BankDarlehen;
    text?: string;
};