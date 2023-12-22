import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class neubau {
    public fkDivisor = 2;
    public nrLessThan10 = 0.01;
    public nr10To25 = 0.79;
    public nrMoreThan25 = 1.02;
    public sollzinsKfw_Endfälliges = 1.14;
    public kfwKredit_Lower = 100_000;
    public kfwKredit_Higher = 150_000;
    public investitionBonus = 1.05;
    public kellerVorhanden = 192-45;
    public stellplaetzeGarage = 68;
    public stellplaetzeParkpalette = 95;
    public stellplaetzeTiefgarage = 490;
    public redGarageTrue = -68;
    public aufzugsanlageVorhanden = 93;
    public barrierereduziert = 62;
    public barrierefrei = 199;
    public barrierereduziertR = 348;
    public dachbegruenungVorhanden = 55;
    public baustellenlogistikVorhanden = 212;
    public aussenanlagenGering = 62;
    public aussenanlagenMittel = 150;
    public aussenanlagenHoch = 277;
    public energiestandardEH40 = 294 - 138;
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