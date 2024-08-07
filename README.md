<h1 align="center">
  <img src="https://github.com/build-systems/toolbox/blob/main/src/assets/black-logo_round.png" width="150px"/><br/>
  BuildSystems | Toolbox
</h1>
<h3 align="center">
    KfW Funding Calculators for Sustainable Houses in Germany
</h3>
<p align="center"><b>BuildSystems</b> is your partner in achieving data-driven, sustainable, and profitable constructions and renovations.<br/>

<p align="center"><a href="https://app.buildsystems.de/"><img src="https://img.shields.io/badge/https://-app.buildsystems.de-white" alt="website"></a> <a href="https://www.linkedin.com/company/build-systems-de"><img src="https://img.shields.io/badge/Follow-BuildSystems-blue?logo=linkedin" alt="LinkedIn Follow"></a>
<p align="center">

# About

What do we do at BuildSystems? We help AEC developers and homeowners build sustainably and affordably.

## Why did we build this toolbox?
Germany is known for pushing green tech, such as solar panels and wind turbines, through public subsidies. But did you know that there are also many subsidies for energy-efficient construction? Although these subsidies are attractive, navigating the bureaucracy can be incredibly challenging.

This app, developed by BuildSystems, makes it easy to simulate a loan from the national bank KfW. It simplifies the process by offering a user-friendly interface, allowing real estate developers and homeowners to understand their financial options quickly and easily.

## Toolbox Features
### 1. Fördermittel Neubau (Funding for new residences)
If the user wants to design a new residence, the first step is to check the feasibility. This calculator checks for available subsidies and loans.
This calculator has two tabs: `Projekt`, which displays the project's form, and `Darlehen`, displaying the loan's form. The numbers and graphs in the dashboard are context-specific. Meaning that each tab has its own set of numbers and graphs. When changing from the Projekt to the Darlehen tab, notice that all the dashboard numbers and graphs also change.
### 2. Fördermittel Komplettsanierung (Funding for complete renovation of residences)
In the case of a full residence renovation, the approach changes. There are specific requirements and metrics that make this a completely different calculator. 
This calculator is similar to the previous one. It also has two tabs: `Projekt`, which displays the project's form, and `Darlehen`, displaying the loan's form. The numbers and graphs in the dashboard are context-specific. Meaning that each tab has its own set of numbers and graphs. When changing from the Projekt to the Darlehen tab, notice that all the dashboard numbers and graphs also change.
### 3. Fördermittel Einzelmaßnahmen (Funding for partial renovations of residences)
If the user prefers to renovate only a small part of a residence, it is possible to get a subsidy from Bafa. The components that affect the energy efficiency of a building the most are shown here both in an interactive SVG and in a list. After the building component is selected, the user has specific options to fine-tune his choices. This part of the toolbox is, in fact, many small calculators. One for each building component.
### 4. Portfolio
This is the area where users can access and delete their saved projects or create new ones.
### 5. Profile
The place where the user can edit their name, email, and photo. Although there's no use for this feature yet.

## Tech Stack
- **GitHub:** For the Git repository.
- **Angular:** A modern JavaScript framework backed by Google that is used for large-scale applications.
- **ng2-charts:** Angular wrapper for the Chart.js library. It is used to create responsive and interactive charts.
- **Cloudflare:** Hosting provider to ensure reliability and scalability, with no initial investment required.
- **Supabase:** a PostgreSQL database, Auth, and Storage with an easy API for Angular (but also other frameworks).

## Frontend Architecture
```mermaid
%%{ init: { 'flowchart': { 'curve': 'basis' } } }%%
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart TB

	R(Routes) --> N & S & PO & PR & SE & E
	
	subgraph S[Sanierung Component]
		SF
		SS
		SOUT
		SSV
	end
	
	subgraph SOUT[Output]
		SD
		SCH
	end
	
	SF(Sanierung Forms)-->SS(Service)
	SS-->SD(Dashboard)
	SS-->SCH(Charts)
	SS-->SSV(Save)
	
	subgraph N[Neubau Component]
		NF
		NS
		NOUT
		NSV
	end
	
	subgraph NOUT[Output]
		ND
		NCH
	end
	
	NF(Neubau Forms)-->NS(Service)
	NS-->ND(Dashboard)
	NS-->NCH(Charts)
	NS-->NSV(Save)

  subgraph E[Einzelmaßnahmen Component]
    EF
    ES
    EOUT
    ESV
  end

  subgraph EOUT[Output]
    ED
    ECH
  end

  EF(Einzelmaßnahmen Forms)-->ES(Service)
  ES-->ED(Dashboard)
  ES-->ECH(Charts)
  ES-->ESV(Save)
	
	subgraph PR[Profile Component]
		CP(Change password)
		DC(Delete Account)
	end
	
	subgraph SE[Settings Component]
		CT(Change Theme)
		CL(Change Language)
	end
	
	NSV-->DB[(Database)]
	SSV-->DB
  ESV-->DB
	
	DB-->SL
	DB-->NL
  DB-->EL
	
	subgraph PO[Portfolio Component]
		NL(Neubau List)
		SL(Sanierung List)
    EL(Einzelmaßnahmen List)
		SLD(Load)
		NLD(Load)
    ELD(Load)
	end

	NL-->NLD
	SL-->SLD
  EL-->ELD

  NLD-->N
  SLD-->S
  ELD-->E
```
### Neubau component diagram
```mermaid
%%{ init: { 'flowchart': { 'curve': 'base' } } }%%
flowchart TB

  subgraph NC[Neubau Component]
    direction TB
    NPF
    NDF
    NPOUT
    NDOUT
    NSV
    NS
  end

  subgraph NPF[Projekt Form]
    direction TB
    NPFC(Projekt Form Component) --> NPFS(Projekt Form Service)
  end

  subgraph NDF[Darlehen Form]
    direction TB
    NDFC(Darlehen Form Component) --> NDFS(Darlehen Form Service)
  end
	NDFS --> NS(Neubau Service)
	
	NPFS --> NS
	NS --> NPD(Projekt Dashboard)
	NS-->NPCHC(Charts Component)
	NPCHC-->NCHG(Gesamtkosten Chart)
	NPCHC-->NCHG2(Gesamtkosten m² Chart)
	NPCHC-->NCHE(Einheitskosten Chart)
	
	subgraph NPCH[Charts]
		direction TB
		NPCHC
		NCHG
		NCHG2
		NCHE
	end
	
	subgraph NPOUT[Output Projekt]
		direction TB
		NPD
		NPCH
	end
	
	NS-->NDD(Darlehen Dashboard)
	NS-->NDCHC(Charts Component)
	NDCHC-->NCHA(Annuitäten Chart)
	NDCHC-->NCHF(Finanzierungskosten Chart)
	NDCHC-->NCHT(Tilgung Chart)
	subgraph NDOUT[Output Darlehen]
		direction TB
		NDD
		NDCH
	end
	
	subgraph NDCH[Charts]
		direction TB
		NDCHC
		NCHA
		NCHF
		NCHT
	end
	
	NS-->NSV(Save Option)

	NPF:::paddingNPF
	NDF:::paddingNDF
	NPCH:::paddingNPCH
	NDCH:::paddingNDCH
	NDOUT:::paddingNDOUT
	classDef paddingNDCH padding-right:34em;
	classDef paddingNPCH padding-right:37em;
	classDef paddingNPF padding-right:9em;
	classDef paddingNDF padding-right:9em;
```


## User Documentation
<details>
  <summary>1. Fördermittel Neubau (Funding for new buildings)</summary>
  
  ### 1.1 Projekt
  This tab has all the project-specific variables, for example, `Wohnfläche [m²]` (construction area). With these values, it is possible to estimate the price of a new building using publicly available data at [Arge e.V.](https://arge-ev.de/arge-ev/publikationen/studien/). If the user already has a defined construction price, it is possible to toggle the `Eigene Kostenberechnung` and input this value in the new field that will appear.
  #### 1.1.1 Wohnfläche [m²]
  Living space of your property according to the [Living Space Ordinance - WoFlV](https://www.gesetze-im-internet.de/woflv/).
  #### 1.1.2  Anzahl Wohnungen
  This is where you determine how many residential units are on your property. An apartment or residential unit has its own entrance, a kitchen or kitchenette, a bathroom, and a toilet. The apartment must be suitable and intended for permanent residential use. A granny flat counts as a separate apartment if it is completed.
  #### 1.1.3 Stufe Energieeffizienzhaus
  The [Effizienz­haus](https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Das-Effizienzhaus/) is a technical standard that the KfW uses in its funding products and is anchored in the Federal Funding for Efficient Buildings (BEG). The numerical value 40 indicates that the efficiency house only requires 40% primary energy compared to a reference building (according to the Building Energy Act GEG).
The standard of an efficient house always results from the combination of various structural and technical measures, especially in the areas of heating, ventilation, and insulation.
  #### 1.1.4 Konstruktion
  Enter here whether your property is to be built using timber construction or conventional construction without the use of renewable raw materials. This aspect is crucial, as the requirements of the "Sustainable Building Quality Seal" in the area of ​​greenhouse gas emissions are usually not met when planning using conventional construction. Compliance with these requirements must be demonstrated in a life cycle assessment and is crucial for qualifying for KfW funding.
The costs of timber buildings are estimated to be around 5% higher than those of conventional buildings [TAB short study No. 3 “Urban timber construction”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; June 2022; Office for Technology Assessment at the German Bundestag].
  #### 1.1.5 Zertifizierung klimafreundlicher Neubau
  Certification as a climate-friendly new building is essential for your new building to qualify for funding from KfW. A building is considered climate-friendly if it consumes little energy and is therefore classified as an Efficiency House 40, emits few greenhouse gases, and therefore meets the greenhouse gas emission requirements of the [Sustainable Building Plus quality seal](https://www.qng.info/qng/qng-anforderungen/), and is not heated with oil, gas, or biomass.
The maximum loan amount increases from 100,000 euros to 150,000 euros per residential unit if the “Sustainable Building Plus or Premium quality seal” is additionally confirmed by a sustainability certificate such as that of the DGNB.
  #### 1.1.6 Eigene Kostenberechnung
  If the user already has the cost of a new construction, he can input it here. This will overwrite the native estimation.
  #### 1.1.7 Kellergeschoss
  Whether the building will have a basement or not.
  #### 1.1.8: Stellplätze
  The kind of parking spaces that are planned for the building.
  #### 1.1.9: Aufzugsanlage
  Whether the building will have an elevator or not.
  #### 1.1.10: Barrierefreies Gebäude
  Descriptions such as "reduced barriers" or "suitable for seniors" are vague terms that are not assigned any binding criteria. For residential buildings, the aspect of housing suitable for the elderly is considered in KfW funding.
The categories "barrier-free" and "barrier-free (R)" refers to the [DIN standard (18040-2): Apartments](https://www.aktion-barrierefreies-bad.de/glossar/din-18040-2/) and are defined according to this. The aim of this standard is to make buildings accessible so that they can be accessed and used by people with disabilities in the usual way, without particular difficulty and basically without outside help.
Barrier-free refers to the minimum requirements, while the "R" label indicates the additional requirements for wheelchair users that go beyond the minimum standard.
  #### 1.1.11: Dachbegrünung
  Extensive greening of the entire roof area.
  #### 1.1.12: Anspruchsvolle Baustellenlogistik
  Demanding construction site logistics primarily refer to the requirements of inner-city construction. Due to limited space and difficult traffic conditions, which bring with them logistical and infrastructural challenges, construction site management is considered to be complex and costly.
  #### 1.1.13: Aufwand Außenanlagen
  Expenses for outdoor facilities.
  #### 1.1.14: Grundstücksbezogene Kosten [€/m²]
  Costs of KG 100, which result from the acquisition of the land to be built on. These include the additional costs associated with the acquisition and ownership of the land, as well as the costs for the removal of rights and encumbrances. The land costs for new housing construction projects in German cities already account for an average of 20% of the total investment costs. There is currently no end in sight to this trend. (Arge e.V.). In addition, costs of KG 200 represent the preparatory measures so that all planned construction measures can be carried out on the land. The tool adds these costs to the investment costs.
  #### 1.1.15: Baunebenkosten [%]
  These are cost groups 700. These are services that are required for the construction project in addition to the construction services and supplies (e.g. services provided by the client, preparation of the object planning, object and specialist planning services, artistic services, and general ancillary construction costs). The tool adds these costs to the investment costs.


  ### 1.2 Darlehen
  This tab has all the loan-specific variables. What happens in construction is that even with subsidies from the government, the real estate developer still relies on bank loans to move forward with the construction because it is not common for them to afford the construction from their own pocket. The national bank KfW not only offers subsidies but also lends a certain amount of money for a lower fee compared to normal banks. After the subsidies and the loan from KfW, it is usually still necessary to cover the rest of the investment with the loan of a normal bank.
  #### 1.2.1 Zinssatz Hausbank (Sollzins)
  Here, you determine the interest rate that you receive from your bank or another financier and the KfW conditions at which you would like to compare. All interest rates are given as nominal interest rates.
  #### 1.2.2 Kreditlaufzeit [a]
  The loan term indicates how many months or years it takes until a loan is fully repaid.
  #### 1.2.3 KfW-Darlehen
  Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay the interest over the entire term and then repay the entire loan amount in one sum at the end. A bullet loan is only possible with a term of up to 10 years.
  #### 1.2.4 Bank-Darlehen
  Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay interest over the entire term and then repay the entire loan amount in one sum at the end.
</details>

<details>
  <summary>2. Fördermittel Komplettsanierung (Renovation of residential buildings)</summary>
  
  ### 2.1 Projekt
  #### 2.1.1 Projekt typ
  Either a house or an apartment
  #### 2.1.2 Wohnfläche [m²]
  Living space of your property according to the [Living Space Ordinance - WoFlV](https://www.gesetze-im-internet.de/woflv/).
  #### 2.1.3 Umfänglichkeit bisher durchgeführter Modernisierung
  This category describes the current modernization status of the building at the time before the implementation of measures to be funded by KfW. The focus is on the extent of the energy modernizations on key components of the building envelope and the system technology in connection with its execution quality, such as scope, materials, components, type of execution, energy standard, etc.
  
  A building is described as not/slightly modernized if no energy modernizations have been carried out since it was built or only on individual components of the building envelope and/or parts of the system technology. Largely modernized means that energy modernizations have been carried out on some/several components of the building envelope and system technology, while the state of comprehensively modernized requires a holistic energy modernization. The category of Largely Modernized is assessed with increased cost indicators, as additional demolition work or additional expenditure may be required.
  #### 2.1.4 Worst Performing Building
  If your property meets this requirement and reaches efficiency house level 40, 55, or 70, you will receive a 10% extra subsidy. A "Worst Performing Building" is a building that is among the worst 25% of buildings in Germany in terms of its energy renovation status. We define a residential building as a Worst Performing Building if the building falls into class H according to the energy certificate. A property also counts as a Worst Performing Building if the building was built in 1957 or earlier and at least 75% of the external wall area has not been renovated to improve energy efficiency.
  
  🔍 Good to know: You can also combine the WPB bonus with the Renewable Energy Class (EE Class), the Sustainability Class (NH Class), and the Bonus for Serial Renovation.
  
  ⚠️ Please note: If you combine the Worst Performing Building bonus with the Serial Renovation bonus, the two bonuses will be limited to a total of 20% funding.
  #### 2.1.5 Eigene Kostenberechnung
  If the user already has the cost of a new construction, he can input it here. This will overwrite the native estimation.
  #### 2.1.6 Stufe Energieeffizienzhaus
  The [Effizienz­haus](https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Energieeffizient-sanieren/Das-Effizienzhaus/) is a technical standard that the KfW uses in its funding products and which is anchored in the Federal Funding for Efficient Buildings (BEG). The numerical values ​​40, 55, 70, and 85 indicate how much primary energy an energy-efficient building requires in comparison to a reference building (according to the Building Energy Act). The following applies: the lower the number, the higher the energy efficiency.
  
  The standard of an efficient house always results from the combination of various structural and technical measures, especially in the areas of the building envelope and building services.
  #### 2.1.7 Förderbonus
  Mit der Erneuerbare-Energien-Klasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Sie im Zuge der Sanierung zum Effizienz­haus eine neue Heizungs­anlage auf Basis erneuer­barer Energien einbauen und damit mindestens 65% des Energie­bedarfs des Gebäudes gedeckt wird. Die höhere Förderung erhalten Sie auch, wenn mindestens 65% des Energie­bedarfs des Hauses zum Teil oder ganz durch unvermeidbare Abwärme erbracht werden.
  
 Nachhaltigkeitsklasse
 Mit der Nachhaltigkeitsklasse steigt der maximale Kredit­betrag von 120.000 Euro auf 150.000 Euro je Wohn­einheit und Sie erhalten 5% mehr Tilgungszuschuss. Diese können Sie in Anspruch nehmen, wenn Ihr Wohn­gebäude Gebäude die Anforderungen des staatlichen "Qualitäts­siegels Nachhaltiges Gebäude" erfüllt. Sie können die EE- und NH-Klasse nicht miteinander kombinieren.
  
  🔍 Gut zu wissen: Den WPB-Bonus können Sie zusätzlich mit der Erneuerbare-Energien-Klasse (EE-Klasse), der Nachhaltig­keits-Klasse (NH-Klasse) und dem Bonus für die Serielle Sanierung kombinieren.
  #### 2.1.8 Serielle Sanierung
  Wenn Sie mit einer Seriellen Sanierung die Effizienzhaus-Stufe 40 oder 55 erreichen, erhalten Sie 15% Extra-Tilgungszuschuss. Für eine Serielle Sanierung werden vorgefertigte Bauele­mente für Fassa­de und gegebenen­falls Dach verwendet.
  
  🔍 Gut zu wissen: Den WPB-Bonus können Sie zusätzlich mit der Erneuerbare-Energien-Klasse (EE-Klasse), der Nachhaltig­keits-Klasse (NH-Klasse) und dem Bonus für die Serielle Sanierung kombinieren.
  
  ⚠️ Bitte beachten Sie: Sollten Sie den Bonus für das Worst Performing Building mit dem Bonus für die Serielle Sanierung kombinieren, dann werden die beiden Boni in Summe auf eine Förderung von 20% begrenzt.
  
  ### 2.2 Darlehen
  #### 2.2.1 Zinssatz Hausbank (Sollzins) [%]
  Here, you determine the interest rate that you receive from your bank or another financier and the KfW conditions at which you would like to compare. All interest rates are given as nominal interest rates.
  #### 2.2.2 Kreditlaufzeit [a]
  The loan term indicates how many years it takes until a loan is fully repaid.
  #### 2.2.3 KfW-Darlehen
  Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay the interest over the entire term and then repay the entire loan amount in one sum at the end. A bullet loan is only possible with a term of up to 10 years.
  #### 2.2.4 Bank-Darlehen
  Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay interest over the entire term and then repay the entire loan amount in one sum at the end.
</details>

<details>
  <summary>3. Fördermittel Einzelmaßnahmen (Funding for partial renovations of residences)</summary>

  ### 3.1. Projekt
  
  #### 3.1.1. Haus typ
  Specify the type of house being renovated or built.
  
  #### 3.1.2. Keller
  Specify whether the building has a basement or not.
  
  #### 3.1.3 Baupreisindex aktuell
  Provides the current construction price index to estimate renovation costs. [DESTATIS Zahlen Fakten](https://www.destatis.de/DE/ZahlenFakten/Indikatoren/Konjunkturindikatoren/Preise/bpr110.html)
  
  #### 3.1.4 Ortsfaktor
  Includes location factors that affect renovation costs based on the specific region. [Sirados Ortsfaktoren](https://www.sirados.de/sirados-ortsfaktoren-gratis-download)
  
  #### 3.1.5 Bauteil
  Choose the building component you want to renovate.
  
  ### 3.2 Außenwand (WDVS)
  An external thermal insulation composite system (ETICS) is a multi-layer insulation system that is attached to the external façade of a building to improve external insulation. This type of insulation is always used when the façade is to be plastered anyway. The components of the ETICS are divided into an adhesive layer on the existing external wall, the insulation panels attached to it, the reinforcement layer, and the final plaster.
  #### 3.2.1 Gedämmte Fläche [m²]
  Specify the insulated area in square meters.
  #### 3.2.2 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.
  
  ### 3.3 Bodenplatte
  Insulating the floor slab is often a challenge, especially when the lowest floor, e.g. a basement, is heated and used. It is no longer possible to insulate from below as you would with a new building. Additional thermal insulation from above on the floor slab is usually difficult to implement, as it reduces the clear heights of the usable rooms.
  #### 3.3.1 Gedämmte Fläche [m²]
  Specify the insulated area of the floor slab in square meters.
  #### 3.3.2 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.
  
  ### 3.4 Dach
  When renovating existing gable roofs, there is the option of installing insulation between the rafters, which can be implemented relatively easily. In order to achieve better U-values, additional insulation is often installed above the rafters. In most cases, additional insulation is installed directly on the outside of a flat roof.
  #### 3.4.1 Dach Typ
  Specify the type of roof being insulated.
  #### 3.4.2 Gedämmte Fläche [m²]
  Specify the insulated area of the roof in square meters.
  #### 3.4.3 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.
  
  ### 3.5 Dachflächenfenster
  #### 3.5.1 Anzahl der Dachflächenfenster
  Specify the number of roof windows.
  
  ### 3.6 Einzelfensterfläche in Durchschnittliche Fenstergröße je Fenster
  With thermal insulation glazing or new, tightly closing windows, heat loss through the frame and the glass surfaces can be reduced enormously.
  #### 3.6.1 Einzelfensterfläche [m²]
  Specify the area of each individual window in square meters.
  #### 3.6.2 Anzahl der Fenster
  Specify the number of windows.
  #### 3.6.3 Fenster Typ
  A thermal insulation glazing can be done with double or triple glazing, progressively reducing heat losses.
  
  ### 3.7 Innenwanddämmung
  For components that cannot be insulated externally, such as basement walls, internal wall insulation can reduce heat losses. Proper execution of internal insulation requires ensuring adequate air and vapor tightness to prevent moisture from the room air from penetrating the building substance. For this reason, internal insulation is only possible in a small thickness (approx. 8 cm), which does not reduce heat losses as well as external insulation. In addition, internal wall insulation is prone to physical impact.
  #### 3.7.1 Gedämmte Fläche [m²]
  Specify the insulated area of the interior walls in square meters.
  #### 3.7.2 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.
  
  ### 3.8 Kellerdecke
  In unheated and unused basement rooms, underside ceiling insulation can be implemented with minimal effort.
  #### 3.8.1 Art der Dämmung
  Specify the type of insulation for the basement ceiling. An upper insulation of the basement ceiling is recommended only if the ground floor's floor structure is being renewed, e.g., when installing underfloor heating. However, it should be noted that this reduces the clear height of the usable space. The costs only represent the cost of the insulation material and no other measures. In a used ground floor, the upper insulation of the basement ceiling is very unlikely without additional measures.
  #### 3.8.2 Gedämmte Fläche [m²]
  Specify the insulated area of the basement ceiling in square meters.
  #### 3.8.3 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.
  
  ### 3.9 Oberste Geschossdecke
  If an attic space is not used and unheated, it is cost-effective to insulate the top floor ceiling from above instead of insulating the roof structure. Under-ceiling insulation is also possible in special cases. Physically, this case would be considered internal insulation, allowing only small insulation thicknesses (approx. 8 cm). However, this reduces the height of the clear room.
  #### 3.9.1 Art der Dämmung
  Specify the type of insulation for the top floor ceiling. Providing non-walkable insulation is technically very simple and cost-effective.
  #### 3.9.2 Gedämmte Fläche [m²]
  Specify the insulated area of the top floor ceiling in square meters.
  #### 3.9.3 Dämmstoffdicke [cm]
  Specify the thickness of the insulation material in centimeters.

  ### 3.10 Neue Steildachgauben
  The costs relate to the addition of a new dormer on the roof.
  #### 3.10.1 Fläche der Gaube [m²]
  Specify the area of the dormer in square meters.
  #### 3.10.2 Anzahl der Gauben
  Specify the number of dormers.
  
  ### 3.11 Türen
  Tightly closing doors with low U-values ​​can reduce heat loss enormously.
  #### 3.11.1 Fläche Haustür [m²]
  Specify the area of the front door in square meters.
  #### 3.11.2 Anzahl der Fenster
  Specify the number of windows in the door.
  
  ### 3.12 Rollladen
  Well-insulated roller shutter boxes with low U-values ​​located in the insulation layer (front-mounted roller shutters) can reduce heat loss enormously.
  #### 3.12.1 Fläche Rollladen [m²]
  Specify the area of the roller shutters in square meters.
  #### 3.12.2 Rollladen Typ
  Roller shutters can be made of plastic or aluminum and can be operated either manually via a belt or controlled electrically.
  
</details>

