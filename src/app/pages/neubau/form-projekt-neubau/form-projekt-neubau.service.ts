import { Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormProjektNeubauService {
  // User price
  // Wohnfläche centralized form values
  userPrice: userPriceObj = {
    value: 5000,
    min: 100,
    max: 20000,
    step: 10,
    title: 'Kostenberechnung [€/m²] ',
    description: 'Geben Sie hier Kosten ein, die Sie selbst oder mit Hilfe Ihrer Expert:innen kalkuliert haben. Dabei sollten folgende Kostengruppen nach DIN276 berücksichtigt werden: KG 300 & 400.',
    disabled: true,
  };

  // Wohnfläche centralized form values
  wohnflaeche: wohnflaecheObj = {
    min: 20,
    value: 1000,
    max: 10000,
    step: 1,
    title: 'Wohnfläche [m²] ',
    description: 'Tragen Sie hier die Wohnfläche Ihrer Immobilie nach "Wohnflächenverordnung - WoFlV" ein.',
    disabled: false,
  };
  // Wohnflächenverordnung - WoFlV https://www.gesetze-im-internet.de/woflv/

  // Anzahl Wohnungen centralized form values
  anzahlWohnungen: anzahlWohnungenObj = {
    min: 1,
    value: 10,
    max: 100,
    step: 1,
    title: 'Anzahl Wohnungen ',
    description: 'Hier wird bestimmt, wie viele Wohneinheiten sich in Ihrer Immobilien befinden. Zu einer Wohnung oder Wohn­einheit gehört ein eigener Zugang, eine Küche oder Koch­nische, Bade­zimmer und Toilette. Die Wohnung muss zur dauer­haften Wohn­nutzung geeignet und bestimmt sein. Eine Einlieger­wohnung zählt als separate Wohnung, wenn sie abge­schlossen ist. Bei Sanierung berück­sichtigen wir die Anzahl der Wohnungen nach Sanierung.',
    disabled: false,
  };

  // Energiestandard centralized form values
  energiestandard: EnergiestandardNeubauObj = {
    options: [
      { id: 'enstd1', value: 'EH 40', disabled: false },
      { id: 'enstd2', value: 'GEG', disabled: false },
      // { id: 'enstd3', value: 'EH 70', disabled: false },
      // { id: 'enstd4', value: 'EH 100' },
      // { id: 'enstd5', value: 'EH 115' },
    ],
    title: 'Stufe Energieeffizienzhaus ',
    description: 'Das Effizienz­haus ist ein technischer Standard, den die KfW in ihren Förder­produkten nutzt und der entsprechend in der Bundesförderung für effiziente Gebäude (BEG) verankert ist. Der Zahlen­wert 40 gibt an, dass das Effizienz­haus nur 40 % Primär­energie benötigt, verglichen mit einem Referenz­gebäude (nach Gebäude­energie­gesetz GEG). Der Standard eines Effizienz­hauses ergibt sich immer aus der Kombination verschiedener baulicher und technischer Maßnahmen, vor allem aus den Bereichen Heizung, Lüftung und Dämmung.',
  };
  // [Effizienz­haus](https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Das-Effizienzhaus/) 

  // Konstruktion centralized form values
  konstruktion: KonstruktionObj = {
    options: [
      { id: 'konst1', value: 'Holzbau', disabled: false },
      { id: 'konst2', value: 'Konventionell', disabled: false },
    ],
    title: 'Konstruktion ',
    description: 'Geben Sie hier ein, ob Ihre Immobilien in Holzbauweise oder in konventioneller Bauweise ohne die Nutzung von Nachwachsenden Rohstoffen umgesetzt werden soll. Dieser Aspekt ist ausschlaggebend, da die Anforderungen des „Qualitäts­siegels Nachhaltiges Gebäude” im Bereich der Treibhaus­gas­emissionen zumeist nicht erfüllt werden, wenn in konventioneller Bauweise geplant wird. Die Erfüllung dieser Anforderungen ist in einer Ökobilanzierung nachzuweisen und ausschlaggebend für die Qualifikation zur KfW-Förderung.',
  };

  // Zertifizierung centralized form values
  zertifizierung: ZertifizierungNeubauObj = {
    options: [
      {
        id: 'zert1',
        value: 'Keine',
        text: 'Keine Zertifizierung',
        disabled: false,
      },
      {
        id: 'zert2',
        value: 'ohne QNG',
        text: 'ohne QNG Siegel',
        disabled: false,
      },
      {
        id: 'zert3',
        value: 'mit QNG',
        text: 'mit QNG Siegel',
        disabled: false,
      },
    ],
    title: 'Zertifizierung klimafreundlicher Neubau ',
    description: 'Eine Zertifizierung zum klimafreundlichen Neubau ist unerlässlich, damit sich Ihr Neubau für eine Förderung durch die KfW qualifiziert. Ein Gebäude gilt als klima­freundlich, wenn es wenig Energie verbraucht und damit als Effizienz­haus 40 einge­stuft wird, wenig Treibhausgase ausstößt und damit die Anforderung an Treibhaus­gas­emissionen des "Qualitäts­siegels Nachhaltiges Gebäude Plus" erfüllt und nicht mit Öl, Gas oder Biomasse beheizt wird. Der  maximale Kredit­betrag steigt von 100.000 Euro auf 150.000 Euro je Wohn­einheit, wenn das "Qualitäts­siegels Nachhaltiges Gebäude Plus oder Premium" zusätzlich durch ein Nachhaltigkeits­zertifikat wie z.B. das der DGNB bestätigt wird.',
  };
  // „[Qualitäts­siegels Nachhaltiges Gebäude Plus](https://www.qng.info/qng/qng-anforderungen/)“
  // Signal to edit the disable property
  zertifizierungWarningMessage$i = signal('');

  // Details
  // Kellergeschoss
  kellergeschoss: KellergeschossObj = {
    options: [
      { id: 'kelgesc1', value: 'Geplant', disabled: false },
      { id: 'kelgesc2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Kellergeschoss ',
    description: 'Kellergeschoss description',
  };

  stellplaetze: StellplaetzeObj = {
    options: [
      { id: 'stpl1', value: 'Tiefgarage', disabled: false },
      { id: 'stpl2', value: 'Garage', disabled: false },
      { id: 'stpl3', value: 'Parkpalette', disabled: false },
    ],
    title: 'Stellplätze ',
    description: 'Stellplaetze description',
  };

  // Aufzugsanlage
  aufzugsanlage: AufzugsanlageObj = {
    options: [
      { id: 'aufanl1', value: 'Geplant', disabled: false },
      { id: 'aufanl2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Aufzugsanlage ',
    description: 'Aufzugsanlage description',
  };

  // Barrierefreiheit
  barrierefreiheit: BarrierefreiesBauenObj = {
    options: [
      {
        id: 'barfre1',
        value: 'Barrierereduziert',
        text: 'Reduziert',
        disabled: false,
      },
      { id: 'barfre2', value: 'Barrierefrei', text: 'Frei', disabled: false },
      {
        id: 'barfre3',
        value: 'Barrierefrei (R)',
        text: 'Frei (R)',
        disabled: false,
      },
      {
        id: 'barfre4',
        value: 'Keine Anforderungen',
        text: 'Keine',
        disabled: false,
      },
    ],
    title: 'Barrierefreies Gebäude ',
    description: 'Bei Beschreibungen wie "barrierereduziert" oder "seniorengerecht" handelt es sich um unbestimmte Begriffe, denen keine verbindlichen Kriterien zugeordnet sind. Für Wohngebäude wird bei KfW-Förderungen der Aspekt altengerechtes Wohnen betrachtet. Die Kategorien "barrierefrei" und "barrierefrei (R)" beziehen sich auf die "DIN Norm 18040-2: Wohnungen" und werden laut dieser definiert. Ziel dieser Norm ist „die Barrierefreiheit baulicher Anlagen, damit sie für Menschen mit Behinderungen in der allgemein üblichen Weise, ohne besondere Erschwernis und grundsätzlich ohne fremde Hilfe zugänglich und nutzbar sind. Barrierefrei bezieht sich auf die Mindestanforderungen, während mit der "R"-Kennzeichnung die über den Mindeststandard hinausgehenden zusätzlichen Anforderungen für Rollstuhlfahrer ausgewiesen werden.',
  };
  // DIN Norm (18040-2) (https://www.aktion-barrierefreies-bad.de/glossar/din-18040-2/)

  // Dachbegruenung
  dachbegruenung: DachbegruenungObj = {
    options: [
      { id: 'dachbe1', value: 'Geplant', disabled: false },
      { id: 'dachbe2', value: 'Nicht geplant', disabled: false },
    ],
    title: 'Dachbegrünung ',
    description: 'Dachbegruenung description',
  };

  // Baustellenlogistik
  baustellenlogistik: BaustellenlogistikObj = {
    options: [
      { id: 'baulog1', value: 'Vorhanden', disabled: false },
      { id: 'baulog2', value: 'Nicht Vorhanden', disabled: false },
    ],
    title: 'Anspruchsvolle Baustellenlogistik ',
    description: 'Unter einer anspruchsvollen Baustellenlogistik sind vorwiegend die Anforderungen von innerstädtischem Bauen zu verstehen. Auf Grund von geringen Aufstellflächen und einer schwierigen Verkehrslage, die logistische und infrastrukturelle Herausforderungen mit sich bringt, ist die Baustellenabwicklung als aufwändig und kostenintensiver zu betrachten.',
  };

  // Aussenanlagen
  aussenanlagen: AussenanlagenObj = {
    options: [
      { id: 'ausanl1', value: 'Gering', disabled: false },
      { id: 'ausanl2', value: 'Mittel', disabled: false },
      { id: 'ausanl3', value: 'Hoch', disabled: false },
    ],
    title: 'Außenanlagen ',
    description: 'Aussenanlagen description',
  };

  // Grundstücksbezogene Kosten
  grundstKosten: grundstKostenObj = {
    value: 0,
    min: 0,
    max: 1000,
    step: 1,
    title: 'Grundstuecksbezogene Kosten [€/m²] ',
    description: 'Grundstücksbezogene Kosten description',
    disabled: false,
  };

  // Baunebenkosten (excl. Finanzierung)
  baunebenkostenOhneFin: BaunebenkostenOhneFinObj = {
    value: 20,
    min: 0,
    max: 100,
    step: 1,
    title: 'Baunebenkosten ohne Finanzierungskosten [%] ',
    description: 'Baunebenkosten (excl. Finanzierung) description',
    disabled: false,
  };

  // Control for kellergeschoss and stellplätze
  public noKellergeschoss: boolean = false;

  projektFormNeu = this.fb.group({
    userPriceToggle: [!this.userPrice.disabled, Validators.required],
    userPriceRange: [
      this.userPrice.value, // init
      [Validators.min(this.userPrice.min), Validators.max(this.userPrice.max)],
    ],
    userPrice: [
      this.userPrice.value, // init
      {
        Validators: [
          Validators.min(this.userPrice.min),
          Validators.max(this.userPrice.max),
        ],
        updateOn: 'blur',
      },
    ],
    wohnflaecheRange: [
      // The values come from the FormProjektService
      this.wohnflaeche.value,
      [
        Validators.required,
        Validators.min(this.wohnflaeche.min),
        Validators.max(this.wohnflaeche.max),
      ],
    ],
    wohnflaeche: [
      this.wohnflaeche.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.wohnflaeche.min),
          Validators.max(this.wohnflaeche.max),
        ],
        updateOn: 'blur',
      },
    ],
    anzahlWohnungenRange: [
      this.anzahlWohnungen.value,
      [
        Validators.required,
        Validators.min(this.anzahlWohnungen.min),
        Validators.max(this.anzahlWohnungen.max),
      ],
    ],
    anzahlWohnungen: [
      this.anzahlWohnungen.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.anzahlWohnungen.min),
          Validators.max(this.anzahlWohnungen.max),
        ],
        updateOn: 'blur',
      },
    ],
    konstruktion: this.konstruktion.options[0].value,
    energiestandard: this.energiestandard.options[0].value,
    zertifizierung: this.zertifizierung.options[0].value,
    // Details
    kellergeschossIn: this.kellergeschoss.options[0].value,
    stellplaetzeIn: this.stellplaetze.options[0].value,
    aufzugsanlageIn: this.aufzugsanlage.options[0].value,
    barrierefreiheitIn: this.barrierefreiheit.options[0].value,
    dachbegruenungIn: this.dachbegruenung.options[0].value,
    baustellenlogistikIn: this.baustellenlogistik.options[0].value,
    aussenanlagenIn: this.aussenanlagen.options[0].value,
    grundstuecksbezogeneKostenRange: [
      this.grundstKosten.value,
      [
        Validators.required,
        Validators.min(this.grundstKosten.min),
        Validators.max(this.grundstKosten.max),
      ],
    ],
    grundstuecksbezogeneKosten: [
      this.grundstKosten.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.grundstKosten.min),
          Validators.max(this.grundstKosten.max),
        ],
        updateOn: 'blur',
      },
    ],
    baunebenkostenOhneFinRange: [
      this.baunebenkostenOhneFin.value,
      [
        Validators.required,
        Validators.min(this.baunebenkostenOhneFin.min),
        Validators.max(this.baunebenkostenOhneFin.max),
      ],
    ],
    baunebenkostenOhneFin: [
      this.baunebenkostenOhneFin.value,
      {
        Validators: [
          Validators.required,
          Validators.min(this.baunebenkostenOhneFin.min),
          Validators.max(this.baunebenkostenOhneFin.max),
        ],
        updateOn: 'blur',
      },
    ],
  });

  constructor(private fb: FormBuilder) {
    this.projektFormNeu
      .get('userPriceToggle')
      ?.valueChanges.subscribe((value) => {
        this.kellergeschoss.options.forEach((obj) => (obj.disabled = value!));
        this.stellplaetze.options.forEach((obj) => (obj.disabled = value!));
        this.aufzugsanlage.options.forEach((obj) => (obj.disabled = value!));
        this.barrierefreiheit.options.forEach((obj) => (obj.disabled = value!));
        this.dachbegruenung.options.forEach((obj) => (obj.disabled = value!));
        this.baustellenlogistik.options.forEach(
          (obj) => (obj.disabled = value!)
        );
        this.aussenanlagen.options.forEach((obj) => (obj.disabled = value!));
        this.grundstKosten.disabled = value!;
        this.baunebenkostenOhneFin.disabled = value!;
    });

     // User Price
     this.projektFormNeu
     .get('userPriceRange')
     ?.valueChanges.subscribe((value) => {
       // Update number input when range changes
       this.projektFormNeu
         .get('userPrice')
         ?.setValue(value, { emitEvent: false });
     });

   this.projektFormNeu
     .get('userPrice')
     ?.valueChanges.subscribe((value) => {
       // Condition to avoid non-numeric or numbers unrealistically small
       if (value && value >= this.userPrice.min) {
         // Update range input when number changes
         this.projektFormNeu
           .get('userPriceRange')
           ?.setValue(value, { emitEvent: false });
       } else {
         this.projektFormNeu
           .get('userPriceRange')
           ?.setValue(this.userPrice.min, { emitEvent: false });
         this.projektFormNeu
           .get('userPrice')
           ?.setValue(this.userPrice.min, { emitEvent: false });
       }
     });

    // Wohnflaeche
    this.projektFormNeu
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormNeu.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      if (value && value >= this.wohnflaeche.min) {
        this.projektFormNeu
          .get('wohnflaecheRange')
          ?.setValue(value, { emitEvent: false });
      } else {
        // Prevent non-realistic values
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(this.wohnflaeche.min, { emitEvent: false });
        this.projektFormNeu
          .get('wohnflaecheRange')
          ?.setValue(this.wohnflaeche.min, { emitEvent: false });
      }
    });

    // Anzahl WohnungenRange
    this.projektFormNeu
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
      });

    this.projektFormNeu
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.anzahlWohnungen.min) {
          // Update range input when number input changes
          this.projektFormNeu
            .get('anzahlWohnungenRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('anzahlWohnungen')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
          this.projektFormNeu
            .get('anzahlWohnungenRange')
            ?.setValue(this.anzahlWohnungen.min, { emitEvent: false });
        }
      });

    // Energiestandard
    this.projektFormNeu
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        const zertifizierung = this.projektFormNeu.get('zertifizierung');
        const konstruktion = this.projektFormNeu.get('konstruktion');
        if (value != 'EH 40') {
          zertifizierung?.setValue('Keine');
          this.zertifizierung.options[1].disabled = true;
          this.zertifizierung.options[2].disabled = true;
          this.zertifizierungWarningMessage$i.set(
            '* Zertifizierung ist nur mit EH 40 möglich'
          );
        } else if (value === 'EH 40' && konstruktion?.value === 'Holzbau') {
          this.zertifizierung.options[1].disabled = false;
          this.zertifizierung.options[2].disabled = false;
        } else if (
          value === 'EH 40' &&
          konstruktion?.value === 'Konventionell'
        ) {
          this.zertifizierung.options[1].disabled = false;
          this.zertifizierung.options[2].disabled = true;
          this.zertifizierungWarningMessage$i.set(
            '* QNG-Zertifizierung ist nur mit Holzbau möglich'
          );
        }
      });

    // Konstruktion
    this.projektFormNeu.get('konstruktion')?.valueChanges.subscribe((value) => {
      // Relationship with Zertifizierung
      const energiestandard = this.projektFormNeu.get('energiestandard');
      const zertifizierung = this.projektFormNeu.get('zertifizierung');
      if (value === 'Konventionell' && energiestandard?.value === 'EH 40') {
        if (zertifizierung?.value === 'mit QNG') {
          zertifizierung?.setValue('Keine');
        }
        this.zertifizierung.options[1].disabled = false;
        this.zertifizierung.options[2].disabled = true;
        this.zertifizierungWarningMessage$i.set(
          '* QNG-Zertifizierung ist nur mit Holzbau möglich'
        );
      } else if (
        value === 'Konventionell' &&
        energiestandard?.value != 'EH 40'
      ) {
        this.zertifizierung.options[1].disabled = true;
        this.zertifizierung.options[2].disabled = true;
      } else if (value === 'Holzbau' && energiestandard?.value === 'EH 40') {
        this.zertifizierung.options[1].disabled = false;
        this.zertifizierung.options[2].disabled = false;
      }
    });

    // Susbscribe to form changes
    this.projektFormNeu
      .get('kellergeschossIn')
      ?.valueChanges.subscribe((value) => {
        // If 'Nicht Vorhanden' is selected, then Tiefgarage is unsellected
        const stellplaetzeIn = this.projektFormNeu.get('stellplaetzeIn');
        if (value === 'Nicht geplant') {
          stellplaetzeIn?.setValue('Garage');
          this.stellplaetze.options[0].disabled = true;
          this.noKellergeschoss = true;
        } else {
          this.stellplaetze.options[0].disabled = false;
          this.noKellergeschoss = false;
        }
      });

    this.projektFormNeu
      .get('stellplaetzeIn')
      ?.valueChanges.subscribe((value) => {
        // If 'Tiefgarage' is selected, then 'Nicht Vorhanden' is unsellected
        const kellergeschossIn = this.projektFormNeu.get('kellergeschossIn');
        if (
          value === 'Tiefgarage' &&
          kellergeschossIn?.value === 'Nicht geplant'
        ) {
          kellergeschossIn?.setValue('Geplant');
        }
      });

    this.projektFormNeu
      .get('grundstuecksbezogeneKostenRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.projektFormNeu
            .get('grundstuecksbezogeneKosten')
            ?.setValue(value, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('grundstuecksbezogeneKosten')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.grundstKosten.min) {
          this.projektFormNeu
            .get('grundstuecksbezogeneKostenRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('grundstuecksbezogeneKosten')
            ?.setValue(this.grundstKosten.min, { emitEvent: false });
          this.projektFormNeu
            .get('grundstuecksbezogeneKostenRange')
            ?.setValue(this.grundstKosten.min, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('baunebenkostenOhneFinRange')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.projektFormNeu
            .get('baunebenkostenOhneFin')
            ?.setValue(value, { emitEvent: false });
        }
      });

    this.projektFormNeu
      .get('baunebenkostenOhneFin')
      ?.valueChanges.subscribe((value) => {
        if (value && value >= this.baunebenkostenOhneFin.min) {
          this.projektFormNeu
            .get('baunebenkostenOhneFinRange')
            ?.setValue(value, { emitEvent: false });
        } else {
          this.projektFormNeu
            .get('baunebenkostenOhneFin')
            ?.setValue(this.baunebenkostenOhneFin.min, { emitEvent: false });
          this.projektFormNeu
            .get('baunebenkostenOhneFinRange')
            ?.setValue(this.baunebenkostenOhneFin.min, { emitEvent: false });
        }
      });
  }
}
