import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class neubau {
    public kellerVorhanden = 192-45;
    public stellplaetze = {
        tiefgarage: 490,
        garage: 68,
        parkpalette: 95,
    }
    public redGarage = -68;
    public aufzugsanlageVorhanden = 93;
    public barriere = {
        reduziert: 62,
        frei: 199,
        reduziertR: 348,
    }
    public dachbegruenungVorhanden = 55;
    public baustellenlogistikVorhanden = 212;
    public aussenanlagen = {
        gering: 62,
        mittel: 150,
        hoch: 277,
    }
    public energetischerStandardPrice = {
        EH40: 294 - 138,
        EH55: 0,
        EH70: 0,
        EH85: 0,
    }

    public fkDivisor = 2;
    public nrLessThan10 = 0.01;
    public nr10To25 = 0.79;
    public nrMoreThan25 = 1.02;
    public sollzinsKfw_Endfälliges = 1.14;
    public kfwKredit_Lower = 100_000;
    public kfwKredit_Higher = 150_000;
    public investitionBonus = 1.05;
    public gestehungskostenBase = 2436;
    public restsummeHolzbau = 1.05;
}

@Injectable({
    providedIn: 'root'
})
export class sanierung {
    fkDivisor = 2;
    nrLessThan10 = 0.31;
    nr10To20 = 1.38;
    nrMoreThan20 = 1.63;
    sollzinsKfw_Endfälliges = 1.75;
    maxKfwKredit_Lower = 100_000;
    maxKfwKredit_Higher = 150_000;
    tilgungszuschussEH85 = 5;
    tilgungszuschussEH70 = 10;
    tilgungszuschussEH55 = 15;
    tilgungszuschussEH40 = 20;
    eeBonusPossible = 5;
    nhBonusPossible = 5;
    wpbBonusPossible = 10;
    serSanBonusPossible = 15;
}