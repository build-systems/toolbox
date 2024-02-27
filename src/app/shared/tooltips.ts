import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class allgemein {
    wohnflaeche: string = 'Tragen Sie hier die Wohnfläche Ihrer Immobilie nach <a target="_blank" rel="noopener noreferrer" href="https://www.gesetze-im-internet.de/woflv/">Wohnflächenverordnung - WoFlV</a> ein.'

  anzahlWohneinheiten: string =
    '<p>Hier wird bestimmt, wie viele Wohneinheiten sich in Ihrer Immobilien befinden. Zu einer Wohnung oder Wohn­einheit gehört ein eigener Zugang, eine Küche oder Koch­nische, Bade­zimmer und Toilette. Die Wohnung muss zur dauer­haften Wohn­nutzung geeignet und bestimmt sein. Eine Einlieger­wohnung zählt als separate Wohnung, wenn sie abge­schlossen ist.</p><p>Bei Sanierung berück­sichtigen wir die Anzahl der Wohnungen nach Sanierung.</p>';

  investitionskosten: string =
    '<p>Die Höhe des Kreditbetrags hängt von zwei Faktoren ab: Die Energie­effizienz ihrer sanierten oder neu gebauten Immo­bilie und der Höhe ihrer förderfähigen Kosten. In unserer Kalkulation wurden folgende Kostengruppen nach DIN276 berücksichtigt: KG 300 und 400.</p><p>"Förder­fähige Kosten" sind jene Kosten, die für Ihre Förderung anrechen­bar sind. Beispiel: Wenn Sie Ihre bestehende Immo­bilie zum Effizienz­haus sanieren, sind die Kosten für den Einbau eines Öl­brenn­wert­kessels nicht förder­fähig. Details finden Sie in der <a target="_blank" rel="noopener noreferrer" href="https://www.bafa.de/SharedDocs/Downloads/DE/Energie/beg_infoblatt_foerderfaehige_kosten.html">Förderrichtlinie.</a></p>';

  eigeneKostenkalkulation: string =
    'Geben Sie hier Kosten ein, die Sie selbst oder mit Hilfe Ihrer Expert:innen kalkuliert haben. Dabei sollten folgende Kostengruppen nach DIN276 berücksichtigt werden: KG 300 & 400.';

  tilgungszuschuss: string =
    'Die Auszahlungsmodalitäten, sehen vor, dass der Tilgungs­zuschuss nach Gebäudefertigstellung und Dokumentation den zurückzuz­ahlenden Kredit­betrag reduziert und somit die Lauf­zeit Ihres Darlehens verkürzt. Der Zuschuss wird entsprechend nicht als Einmalzahlung ausgezahlt, sondern gegen Ihre Kreditsumme gegengerechnet.';

  kfwZinssatz: string =
    'Der Zinssatz, der durch die KfW angeboten wird, ist abhängig von der Laufzeit des Darlehens und der Art des Darlehens (Annuitäten oder Endfälliges Darlehen). Alle Zinsraten sind als Sollzins angegeben.';

  bankZinssatz: string =
    'Hier bestimmen Sie den Zinssatz, den Sie bei Ihrer Hausbank oder einem anderen Finanzierer erhalten und zu dem Sie die KfW Konditionen vergleichen möchten. Alle Zinsraten sind als Sollzins&nbsp;angegeben.';

  kreditlaufzeit: string =
    'Die Kreditlaufzeit gibt an, wie viele Monate bzw. Jahre es dauert, bis ein Darlehen vollständig zurückgezahlt wird.';

  kfwDarlehen: string =
    'Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück. Ein endfälliges Darlehen ist nur bei einer Laufzeit von bis zu 10 Jahren möglich.';

  bankDarlehen: string =
    'Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück.';
}

@Injectable({
  providedIn: 'root',
})
export class sanierung {
  baukosten: string =
    '<p>Die Baukosten beziehen sich auf Vollkosten, die im Zusammenhang mit einer energetischen Sanierung stehen und beziehen Sowieso-Kosten und energetische Mehrkosten mit ein. Kosten die während der Baumaßnahme zum Beispiel für eine Badsanierung anfallen, sind nicht berücksichtigt und in diesem Fall nicht förderfähig. Weitere Informationen <a target="_blank" rel="noopener noreferrer" href="https://www.gebaeudeforum.de/realisieren/investitionen/wirtschaftlichkeit/">hier.</a></p>'

  energiestandard: string =
    '<p>Das <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/Das-Effizienzhaus/">Effizienz­haus</a> ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Die Zahlen­werte 40, 55, 70, 85 geben an, wie viel Primärenergiebedarf ein energie­effizientes Gebäude im Vergleich zu einem Referenz­gebäude (nach Gebäude­energie­gesetz) hat. Es gilt: Je niedriger die Zahl, desto höher ist die Energie­effizienz.</p><br /><p>Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Gebäudehülle und Haustechnik.</p>'

  worstPerformingBuilding: string =
    'Erfüllt Ihre Immobilie diese Anforderung erhalten Sie 10% mehr Tilgungszuschuss. Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs­zustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Ein Wohngebäude definieren wir als Worst Performing Building, wenn das Gebäude laut Energie­ausweis in die Klasse H fällt. Eine Immobilie zählt ebenfalls zu den Worst Performing Buildings, wenn das Gebäude 1957 oder früher gebaut wurde und mindestens 75% der Außen­wand­fläche nicht energetisch saniert sind.';

  serielleSanierung: string =
    'Wenn Sie mit einer Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55 erreichen, erhalten Sie 15% Extra-Tilgungszuschuss. Für eine Serielle Sanierung werden vorgefertigte Bauele­mente für Fassa­de und gegebenen­falls Dach verwendet.';

  foerderbonus: string =
    '<b>Erneuerbare-Energien-Klasse</b><p>Mit der Erneuerbare-Energien-Klasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz­haus eine neue Heizungs­anlage auf Basis erneuer­barer Energien einbauen und damit mindestens 65% des Energie­bedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie­bedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden.</p><br /><b>Nachhaltigkeitsklasse</b><p>Mit der Nachhaltigkeitsklasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Ihr Wohn­gebäude Gebäude die Anforderungen des staatlichen "Qualitäts­siegels Nachhaltiges Gebäude" erfüllt. Sie können die EE- und NH-Klasse nicht miteinander kombinieren.</p>';

    umfaengModernisierung: string = '<p>Diese Kategorie beschreibt den aktuellen Modernisierungszustand des Gebäudes zum Zeitpunkt vor der Umsetzung von Maßnahmen, die durch die KfW gefördert werden sollen. Dabei steht der Umfang der energetischen Modernisierungen an wesentlichen Bauteilen der Gebäudehülle und der Anlagentechnik in Verbindung mit dessen Ausführungsqualität wie Umfang, Materialien, Komponenten, Ausführungsart, energetischer Standard etc. im Fokus.</p><br /><p>Ein Gebäude wird als <em>nicht/gering modernisiert</em> bezeichnet, wenn seit der Errichtung keine energetischen Modernisierungen bzw. nur an einzelnen Bauteilen der Gebäudehülle und/oder Teilen der Anlagentechnik durchgeführt wurden. <em>Größtenteils modernisiert</em> bedeutet, dass energetische Modernisierungen an einigen/mehreren Bauteilen der Gebäudehülle und Anlagentechnik durchgeführt wurden, während der Zustand <em>umfassend modernisiert</em> eine ganzheitliche energetische Modernisierung bedingt. Die Kategorie <em>Größtenteils modernisiert</em> wird mit erhöhten Kostenkennwerten bewertet, da es gegebenenfalls zusätzlich zu Rückbauarbeiten oder Mehraufwand kommen kann.</p>'
}

@Injectable({
  providedIn: 'root',
})
export class neubau {
    // investitionskosten: string = 'Baukosten + Grundstuecksbezogene Kosten + Baunebenkosten Kein Finanz.';
    energiestandard: string = '<p>Das <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Das-Effizienzhaus/">Effizienz­haus</a> ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Der Zahlen­wert 40 gibt an, dass das Effizienz­haus nur 40% Primär­energie benötigt, verglichen mit einem Referenz­gebäude (nach Gebäude­energie­gesetz GEG).</p><p>Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Heizung, Lüftung und Dämmung. </p>';

    konstruktion: string = '<p>Geben Sie hier ein, ob Ihre Immobilien in Holzbauweise oder in konventioneller Bauweise ohne die Nutzung von Nachwachsenden Rohstoffen umgesetzt werden soll. Dieser Aspekt ist ausschlaggebend, da die Anforderungen des "Qualitäts­siegels Nachhaltiges Gebäude" im Bereich der Treibhaus­gas­emissionen zumeist nicht erfüllt werden, wenn in konventioneller Bauweise geplant wird. Die Erfüllung dieser Anforderungen ist in einer Ökobilanzierung nachzuweisen und ausschlaggebend für die Qualifikation zur KfW-Förderung. </p>';

    zeritifizierung: string = '<p>Eine Zertifizierung zum klimafreundlichen Neubau ist unerlässlich, damit sich Ihr Neubau für eine Förderung durch die KfW qualifiziert. Ein Gebäude gilt als klima­freundlich, wenn es wenig Energie verbraucht und damit als Effizienz­haus 40 einge­stuft wird, wenig Treibhausgase ausstößt und damit die Anforderung an Treibhaus­gas­emissionen des <a target="_blank" rel="noopener noreferrer" href="https://www.qng.info/qng/qng-anforderungen/">Qualitäts­siegels Nachhaltiges Gebäude Plus</a> erfüllt und nicht mit Öl, Gas oder Biomasse beheizt wird.</p><p>Der  maximale Kredit­betrag steigt von 100.000 Euro auf 150.000 Euro je Wohn­einheit, wenn das „Qualitäts­siegels Nachhaltiges Gebäude Plus oder Premium“ zusätzlich durch ein Nachhaltigkeits­zertifikat wie z.B. das der DGNB bestätigt wird.</p>';

    barrierefreies: string = '<p>Bei Beschreibungen wie "barrierereduziert" oder "seniorengerecht" handelt es sich um unbestimmte Begriffe, denen keine verbindlichen Kriterien zugeordnet sind. Für Wohngebäude wird bei KfW-Förderungen der Aspekt altengerechtes Wohnen betrachtet.</p><p>Die Kategorien "barrierefrei" und "barrierefrei (R)" beziehen sich auf die  <a target="_blank" rel="noopener noreferrer" href="https://www.aktion-barrierefreies-bad.de/glossar/din-18040-2/">DIN Norm (18040-2): Wohnungen</a> und werden laut dieser definiert. Ziel dieser Norm ist die Barrierefreiheit baulicher Anlagen, damit sie für Menschen mit Behinderungen in der allgemein üblichen Weise, ohne besondere Erschwernis und grundsätzlich ohne fremde Hilfe zugänglich und nutzbar sind.</p><p>Barrierefrei bezieht sich auf die Mindestanforderungen, während mit der "R"-Kennzeichnung die über den Mindeststandard hinausgehenden zusätzlichen Anforderungen für Rollstuhlfahrer ausgewiesen werden.</p>';
    
    dachbegruenung: string = '<p>Extensive Begrünung der gesamten Dachfläche</p>'; 
    
    baustellenlogistik: string = '<p>Unter einer anspruchsvollen Baustellenlogistik sind vorwiegend die Anforderungen von innerstädtischem Bauen zu verstehen. Auf Grund von geringen Aufstellflächen und einer schwierigen Verkehrslage, die logistische und infrastrukturelle Herausforderungen mit sich bringt, ist die Baustellenabwicklung als aufwändig und kostenintensiver zu betrachten.</p>';

    aussenanlagen: string = '';

    grundstKosten: string = '';
    
    baunebenkostenOhneFin: string = '';
}
