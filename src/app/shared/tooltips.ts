import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class allgemein {
  wohnflaeche: string =
    '<b>Wohnfläche</b><p>Tragen Sie hier die Wohnfläche Ihrer Immobilie nach <a target="_blank" rel="noopener noreferrer" href="https://www.gesetze-im-internet.de/woflv/">Wohnflächenverordnung - WoFlV <sup>↗</sup></a> ein.</p>';

  anzahlWohneinheiten: string =
    '<b>Anzahl Wohnungen</b><p>Hier wird bestimmt, wie viele Wohneinheiten sich in Ihrer Immobilien befinden. Zu einer Wohnung oder Wohn­einheit gehört ein eigener Zugang, eine Küche oder Koch­nische, Bade­zimmer und Toilette. Die Wohnung muss zur dauer­haften Wohn­nutzung geeignet und bestimmt sein. Eine Einlieger­wohnung zählt als separate Wohnung, wenn sie abge­schlossen ist.</p><p>Bei Sanierung berück­sichtigen wir die Anzahl der Wohnungen nach Sanierung.</p>';

  eigeneKostenkalkulation: string =
    '<b>Eigene Kostenberechnung</b><p>Geben Sie hier Kosten ein, die Sie selbst oder mit Hilfe Ihrer Expert:innen kalkuliert haben. Dabei sollten folgende Kostengruppen nach DIN276 berücksichtigt werden: KG 300 & 400.</p>';

  tilgungszuschuss: string =
    '<b>KfW Zuschuss</b><p>Die Auszahlungsmodalitäten, sehen vor, dass der Tilgungs­zuschuss nach Gebäudefertigstellung und Dokumentation den zurückzuz­ahlenden Kredit­betrag reduziert und somit die Lauf­zeit Ihres Darlehens verkürzt. Der Zuschuss wird entsprechend nicht als Einmalzahlung ausgezahlt, sondern gegen Ihre Kreditsumme gegengerechnet.</p>';

  kfwZinssatz: string =
    '<b>KfW Zinssatz</b><p>Der Zinssatz, der durch die KfW angeboten wird, ist abhängig von der Laufzeit des Darlehens und der Art des Darlehens (Annuitäten oder Endfälliges Darlehen). Alle Zinsraten sind als Sollzins angegeben.</p>';

  bankZinssatz: string =
    '<b>Zinssatz Hausbank (Sollzins)</b><p>Hier bestimmen Sie den Zinssatz, den Sie bei Ihrer Hausbank oder einem anderen Finanzierer erhalten und zu dem Sie die KfW Konditionen vergleichen möchten. Alle Zinsraten sind als Sollzins angegeben.</p>';

  kreditlaufzeit: string =
    '<b>Kreditlaufzeit</b><p>Die Kreditlaufzeit gibt an, wie viele Monate bzw. Jahre es dauert, bis ein Darlehen vollständig zurückgezahlt wird.</p>';

  kfwDarlehen: string =
    '<b>KfW-Darlehen</b><p>Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück. Ein endfälliges Darlehen ist nur bei einer Laufzeit von bis zu 10 Jahren möglich.</p>';

  bankDarlehen: string =
    '<b>Bank-Darlehen</b><p>Bestimmen Sie hier, auf welche Art Ihr Kredit zurück gezahlt werden soll. Bei einem Annuitäten­darlehen zahlen Sie in den ersten Jahren (tilgungs­freie Anlauf­zeit) nur Zinsen – danach gleich hohe monat­liche Annuitäten. Diese stellen den Rückzahlungsbetrag dar, der sich aus Zins und Tilgung zusammen­setzt. Beim endfälligen Darlehen zahlen Sie während der gesamten Lauf­zeit nur die Zinsen und am Ende den kompletten Kredit­betrag in einer Summe zurück.</p>';
}

@Injectable({
  providedIn: 'root',
})
export class sanierung {
  investitionskosten: string =
    '<b>Investitionskosten</b><p>Die Baukosten beziehen sich auf Vollkosten, die im Zusammenhang mit einer energetischen Sanierung stehen und beziehen Sowieso-Kosten und energetische Mehrkosten mit ein. Kosten die während der Baumaßnahme zum Beispiel für eine Badsanierung anfallen, sind nicht berücksichtigt und in diesem Fall nicht förderfähig. Weitere Informationen finden Sie auf der <a target="_blank" rel="noopener noreferrer" href="https://www.gebaeudeforum.de/realisieren/investitionen/wirtschaftlichkeit/">Website des Gebäudeforum klimaneutral. <sup>↗</sup></a></p>';

  energiestandard: string =
    '<b>Stufe Energieeffizienzhaus</b><p>Das <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/Das-Effizienzhaus/">Effizienz­haus <sup>↗</sup></a> ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Die Zahlen­werte 40, 55, 70, 85 geben an, wie viel Primärenergiebedarf ein energie­effizientes Gebäude im Vergleich zu einem Referenz­gebäude (nach Gebäude­energie­gesetz) hat. Es gilt: Je niedriger die Zahl, desto höher ist die Energie­effizienz.</p><br /><p>Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Gebäudehülle und Haustechnik.</p>';

  worstPerformingBuilding: string =
    '<b>Worst Performing Building</b><p>Erfüllt Ihre Immobilie diese Anforderung und erreicht die Effizienzhaus-Stufe 40, 55 oder 70, erhalten Sie 10 % mehr Tilgungszuschuss. Ein "Worst Performing Building" ist ein Gebäude, das hinsichtlich des energetischen Sanierungs­zustands zu den schlechtesten 25% der Gebäude in Deutschland gehört. Ein Wohngebäude definieren wir als Worst Performing Building, wenn das Gebäude laut Energie­ausweis in die Klasse H fällt. Eine Immobilie zählt ebenfalls zu den Worst Performing Buildings, wenn das Gebäude 1957 oder früher gebaut wurde und mindestens 75% der Außen­wand­fläche nicht energetisch saniert sind.</p><br /><p>🔍 <u>Gut zu wissen:</u> Den WPB-Bonus können Sie zusätzlich mit der Erneuerbare-Energien-Klasse (EE-Klasse), der Nachhaltig­keits-Klasse (NH-Klasse) und dem Bonus für die Serielle Sanierung kombinieren.</p><br /><p>⚠️ <u>Bitte beachten Sie:</u> Sollten Sie den Bonus für das Worst Performing Building mit dem Bonus für die Serielle Sanierung kombinieren, dann werden die beiden Boni in Summe auf eine Förderung von 20% begrenzt.</p>';

  serielleSanierung: string =
    '<b>Serielle Sanierung</b><p>Wenn Sie mit einer Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55 erreichen, erhalten Sie 15% Extra-Tilgungszuschuss. Für eine Serielle Sanierung werden vorgefertigte Bauele­mente für Fassa­de und gegebenen­falls Dach verwendet.</p><br /><p>🔍 <u>Gut zu wissen:</u> Den WPB-Bonus können Sie zusätzlich mit der Erneuerbare-Energien-Klasse (EE-Klasse), der Nachhaltig­keits-Klasse (NH-Klasse) und dem Bonus für die Serielle Sanierung kombinieren.</p><br /><p>⚠️ <u>Bitte beachten Sie:</u> Sollten Sie den Bonus für das Worst Performing Building mit dem Bonus für die Serielle Sanierung kombinieren, dann werden die beiden Boni in Summe auf eine Förderung von 20% begrenzt.</p>';

  foerderbonus: string =
    '<b>Erneuerbare-Energien-Klasse</b><p>Mit der Erneuerbare-Energien-Klasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz­haus eine neue Heizungs­anlage auf Basis erneuer­barer Energien einbauen und damit mindestens 65% des Energie­bedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie­bedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden.</p><br /><b>Nachhaltigkeitsklasse</b><p>Mit der Nachhaltigkeitsklasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Ihr Wohn­gebäude Gebäude die Anforderungen des staatlichen "Qualitäts­siegels Nachhaltiges Gebäude" erfüllt. Sie können die EE- und NH-Klasse nicht miteinander kombinieren.</p><br /><p>🔍 <u>Gut zu wissen:</u> Den WPB-Bonus können Sie zusätzlich mit der Erneuerbare-Energien-Klasse (EE-Klasse), der Nachhaltig­keits-Klasse (NH-Klasse) und dem Bonus für die Serielle Sanierung kombinieren.</p>';

  umfaengModernisierung: string =
    '<b>Umfänglichkeit bisher durchgeführter Modernisierung</b><p>Diese Kategorie beschreibt den aktuellen Modernisierungszustand des Gebäudes zum Zeitpunkt vor der Umsetzung von Maßnahmen, die durch die KfW gefördert werden sollen. Dabei steht der Umfang der energetischen Modernisierungen an wesentlichen Bauteilen der Gebäudehülle und der Anlagentechnik in Verbindung mit dessen Ausführungsqualität wie Umfang, Materialien, Komponenten, Ausführungsart, energetischer Standard etc. im Fokus.</p><br /><p>Ein Gebäude wird als <u>nicht/gering modernisiert</u> bezeichnet, wenn seit der Errichtung keine energetischen Modernisierungen bzw. nur an einzelnen Bauteilen der Gebäudehülle und/oder Teilen der Anlagentechnik durchgeführt wurden. <u>Größtenteils modernisiert</u> bedeutet, dass energetische Modernisierungen an einigen/mehreren Bauteilen der Gebäudehülle und Anlagentechnik durchgeführt wurden, während der Zustand <u>umfassend modernisiert</u> eine ganzheitliche energetische Modernisierung bedingt. Die Kategorie <u>Größtenteils modernisiert</u> wird mit erhöhten Kostenkennwerten bewertet, da es gegebenenfalls zusätzlich zu Rückbauarbeiten oder Mehraufwand kommen kann.</p>';
}

@Injectable({
  providedIn: 'root',
})
export class neubau {
  // investitionskosten: string = 'Baukosten + Grundstuecksbezogene Kosten + Baunebenkosten Kein Finanz.';
  investitionskosten: string =
    '<b>Investitionskosten</b><p>Die Höhe des Kreditbetrags hängt von zwei Faktoren ab: Die Energie­effizienz ihrer sanierten oder neu gebauten Immo­bilie und der Höhe ihrer förderfähigen Kosten. In unserer Kalkulation wurden folgende Kostengruppen nach DIN276 berücksichtigt: KG 300 und 400.</p><p>"Förder­fähige Kosten" sind jene Kosten, die für Ihre Förderung anrechen­bar sind. Beispiel: Wenn Sie Ihre bestehende Immo­bilie zum Effizienz­haus sanieren, sind die Kosten für den Einbau eines Öl­brenn­wert­kessels nicht förder­fähig. Details finden Sie in der <a target="_blank" rel="noopener noreferrer" href="https://www.bafa.de/SharedDocs/Downloads/DE/Energie/beg_infoblatt_foerderfaehige_kosten.html">Förderrichtlinie. <sup>↗</sup></a></p>';

  energiestandard: string =
    '<b>Stufe Energieeffizienzhaus</b><p>Das <a target="_blank" rel="noopener noreferrer" href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Das-Effizienzhaus/">Effizienz­haus <sup>↗</sup></a> ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Der Zahlen­wert 40 gibt an, dass das Effizienz­haus nur 40% Primär­energie benötigt, verglichen mit einem Referenz­gebäude (nach Gebäude­energie­gesetz GEG).</p><p>Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Heizung, Lüftung und Dämmung. </p>';

  konstruktion: string =
    '<b>Konstruktion</b><p>Geben Sie hier ein, ob Ihre Immobilien in Holzbauweise oder in konventioneller Bauweise ohne die Nutzung von Nachwachsenden Rohstoffen umgesetzt werden soll. Dieser Aspekt ist ausschlaggebend, da die Anforderungen des "Qualitäts­siegels Nachhaltiges Gebäude" im Bereich der Treibhaus­gas­emissionen zumeist nicht erfüllt werden, wenn in konventioneller Bauweise geplant wird. Die Erfüllung dieser Anforderungen ist in einer Ökobilanz­ierung nachzuweisen und ausschlaggebend für die Qualifikation zur KfW‑Förderung.</p><br /><p>Die Kosten von Holzbauten werden in der Kostens­chätzung gemäß [TAB-Kurzstudie Nr 3 “Urbaner Holzbau”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; Juni 2022; Büro für Technikfolgen-Abschätzung beim Deutschen Bundestag] im Vergleich zu Massivbauten ca. 5 % höher angesetzt.</p>';

  zeritifizierung: string =
    '<b>Zertifizierung klimafreundlicher Neubau</b><p>Eine Zertifizierung zum klimafreundlichen Neubau ist unerlässlich, damit sich Ihr Neubau für eine Förderung durch die KfW qualifiziert. Ein Gebäude gilt als klima­freundlich, wenn es wenig Energie verbraucht und damit als Effizienz­haus 40 einge­stuft wird, wenig Treibhausgase ausstößt und damit die Anforderung an Treibhaus­gas­emissionen des <a target="_blank" rel="noopener noreferrer" href="https://www.qng.info/qng/qng-anforderungen/">Qualitäts­siegels Nachhaltiges Gebäude Plus <sup>↗</sup></a> erfüllt und nicht mit Öl, Gas oder Biomasse beheizt wird.</p><p>Der  maximale Kredit­betrag steigt von 100.000 Euro auf 150.000 Euro je Wohn­einheit, wenn das „Qualitäts­siegels Nachhaltiges Gebäude Plus oder Premium“ zusätzlich durch ein Nachhaltigkeits­zertifikat wie z.B. das der DGNB bestätigt wird.</p>';

  barrierefreies: string =
    '<b>Barrierefreies Gebäude</b><p>Bei Beschreibungen wie "barrierereduziert" oder "seniorengerecht" handelt es sich um unbestimmte Begriffe, denen keine verbindlichen Kriterien zugeordnet sind. Für Wohngebäude wird bei KfW-Förderungen der Aspekt altengerechtes Wohnen betrachtet.</p><p>Die Kategorien "barrierefrei" und "barrierefrei (R)" beziehen sich auf die  <a target="_blank" rel="noopener noreferrer" href="https://www.aktion-barrierefreies-bad.de/glossar/din-18040-2/">DIN Norm (18040-2): Wohnungen <sup>↗</sup></a> und werden laut dieser definiert. Ziel dieser Norm ist die Barrierefreiheit baulicher Anlagen, damit sie für Menschen mit Behinderungen in der allgemein üblichen Weise, ohne besondere Erschwernis und grundsätzlich ohne fremde Hilfe zugänglich und nutzbar sind.</p><p>Barrierefrei bezieht sich auf die Mindestanforderungen, während mit der "R"-Kennzeichnung die über den Mindeststandard hinausgehenden zusätzlichen Anforderungen für Rollstuhlfahrer ausgewiesen werden.</p>';

  dachbegruenung: string =
    '<b>Dachbegrünung</b><p>Extensive Begrünung der gesamten Dachfläche</p>';

  baustellenlogistik: string =
    '<b>Anspruchsvolle Baustellenlogistik</b><p>Unter einer anspruchsvollen Baustellenlogistik sind vorwiegend die Anforderungen von innerstädtischem Bauen zu verstehen. Auf Grund von geringen Aufstellflächen und einer schwierigen Verkehrslage, die logistische und infrastrukturelle Herausforderungen mit sich bringt, ist die Baustellenabwicklung als aufwändig und kostenintensiver zu betrachten.</p>';

  aussenanlagen: string = '';

  grundstKosten: string =
    '<b>Grundstücksbezogene Kosten (KG 100, 200)</b><p>Kosten der KG 100, die sich aus dem Erwerb des zu bebauenden Grundstücks ergeben. Dazu gehören die mit dem Erwerb und dem Eigentum des Grundstücks verbundenen Nebenkosten sowie die Kosten für das Aufheben von Rechten und Belastungen. Die Grundstückskosten bei Projekten des Wohnungsneubaus umfassen in deutschen Großstädten im Mittel bereits 20% der gesamten Investitionskosten. Ein Ende dieser Entwicklung ist gegenwärtig nicht in Sicht. (Arge e.V.). Zudem Kosten der KG 200, die die vorbereitenden Maßnahmen abbilden, damit alle geplanten Baumaßnahme auf dem Grundstück durchführt werden können. Diese Kosten schlägt das Tool den Investitionskosten zu.</p>';

  baunebenkostenOhneFin: string =
    '<b>Baunebenkosten (KG 700)</b><p>Hierbei handelt es sich um die Kostengruppen 700. Das sind Leistungen, die neben den Bauleistungen und Lieferungen für das Bauprojekt erforderlich sind (z. B. Leistungen des Bauherren, Vorbereitung der Objektplanung, Leistungen der Objekt- und Fachplanung, künstlerische Leistungen und allgemeine Baunebenkosten). Diese Kosten schlägt das Tool den Investitionskosten zu.</p>';
}

@Injectable({
  providedIn: 'root',
})
export class einzelmassnahmen {
  // investitionskosten: string = 'Baukosten + Grundstuecksbezogene Kosten + Baunebenkosten Kein Finanz.';
  placeholder: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, doloremque, error quod molestias nobis magni ipsam vero dolorum rerum doloribus assumenda voluptates. Accusantium doloribus quae officia? Accusamus provident praesentium iure deleniti vel, architecto asperiores dolores voluptatem quo doloremque similique temporibus repellat cumque, possimus quam soluta alias nesciunt tempore ducimus fugit. Expedita natus nulla at harum porro odio commodi iure corporis explicabo animi alias voluptas est ducimus aspernatur ut doloremque necessitatibus, facilis ullam tenetur! Repudiandae vitae, nam veritatis enim maxime exercitationem molestias ipsam? Laborum veniam consequuntur illum quia ratione corporis, ex iure ea officia rerum, cum nulla quasi, incidunt quibusdam voluptatibus.';
}
