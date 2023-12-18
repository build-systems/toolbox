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
    public kfwKredit_Heigher = 150_000;
    public investitionBonus = 1.05;
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