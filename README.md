<h1 align="center">
  <img src="https://github.com/build-systems/toolbox/blob/main/src/assets/black-logo_round.png" width="150px"/><br/>
  BuildSystems | Toolbox
</h1>
<h3 align="center">
    KfW Funding Calculators for Sustainable Houses in Germany
</h3>
<p align="center"><b>BuildSystems</b> is your partner in achieving data-driven, sustainable, and profitable constructions and renovations.</p><br/>

<p align="center"><a href="https://app.buildsystems.de/"><img src="https://img.shields.io/badge/https://-app.buildsystems.de-white" alt="website"></a> <a href="https://www.linkedin.com/company/build-systems-de"><img src="https://img.shields.io/badge/Follow-BuildSystems-blue?logo=linkedin" alt="LinkedIn Follow"></a></p>
<p align="center"></p>

# About

What do we do at BuildSystems? We help AEC developers and Homeowners build sustainably and affordably.

## Why did we build this toolbox?
Germany is known for pushing green tech, such as solar panels and wind turbines, through public subsidies. But did you know that there are also many subsidies for energy-efficient construction? Although these subsidies are attractive, navigating the bureaucracy can be incredibly challenging.

This app, developed by BuildSystems, makes it easy to simulate a loan from the national bank KfW. It simplifies the process by offering a user-friendly interface, allowing real estate developers and homeowners to understand their financial options quickly and easily.

## Toolbox Features
### Funding for new residences (Fördermittel Neubau)
If the user wants to design a new residence, the first step is to check the feasibility. This calculator checks for available subsidies and loans.
This calculator has two tabs: `Projekt`, which displays the project's form, and `Darlehen`, displaying the loan's form. The numbers and graphs in the dashboard are context-specific. Meaning that each tab has its own set of numbers and graphs. When changing from the Projekt to the Darlehen tab, notice that all the dashboard numbers and graphs also change.
### Funding for renovation of residences (Fördermittel Komplettsanierung)
In the case of a full residence renovation, the approach changes. There are specific requirements and metrics that make this a completely different calculator. 
This calculator is similar to the previous one. It also has two tabs: `Projekt`, which displays the project's form, and `Darlehen`, displaying the loan's form. The numbers and graphs in the dashboard are context-specific. Meaning that each tab has its own set of numbers and graphs. When changing from the Projekt to the Darlehen tab, notice that all the dashboard numbers and graphs also change.
### Funding for partial renovations of residences (Fördermittel Einzelmaßnahmen)
If the user prefers to renovate only a small part of a residence, it is possible to get a subsidy from Bafa. The components that affect the energy efficiency of a building the most are shown here both in an interactive SVG and in a list. After the building component is selected, the user has specific options to fine-tune his choices. This part of the toolbox is, in fact, many small calculators. One for each building component.

## Documentation
### 1 Funding for new buildings (Fördermittel Neubau)
#### 1.1 Projekt
This tab has all the project-specific variables, for example, `Wohnfläche [m²]` (construction area). With these values, it is possible to estimate the price of a new building using publicly available data at [Arge e.V.](https://arge-ev.de/arge-ev/publikationen/studien/). If the user already has a defined construction price, it is possible to toggle the `Eigene Kostenberechnung` and input this value in the new field that will appear.
Projekt Form documentation
 ##### 1.1.1 Wohnfläche [m²]
 Living space of your property according to the [Living Space Ordinance - WoFlV](https://www.gesetze-im-internet.de/woflv/).
 ##### 1.1.2  Anzahl Wohnungen
This is where you determine how many residential units are on your property. An apartment or residential unit has its own entrance, a kitchen or kitchenette, a bathroom, and a toilet. The apartment must be suitable and intended for permanent residential use. A granny flat counts as a separate apartment if it is completed.
##### 1.1.3 Stufe Energieeffizienzhaus
The [Effizienz­haus](https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Das-Effizienzhaus/) is a technical standard that the KfW uses in its funding products and is anchored in the Federal Funding for Efficient Buildings (BEG). The numerical value 40 indicates that the efficiency house only requires 40% primary energy compared to a reference building (according to the Building Energy Act GEG).
The standard of an efficient house always results from the combination of various structural and technical measures, especially in the areas of heating, ventilation, and insulation.
##### 1.1.4 Konstruktion
Enter here whether your property is to be built using timber construction or conventional construction without the use of renewable raw materials. This aspect is crucial, as the requirements of the "Sustainable Building Quality Seal" in the area of ​​greenhouse gas emissions are usually not met when planning using conventional construction. Compliance with these requirements must be demonstrated in a life cycle assessment and is crucial for qualifying for KfW funding.
The costs of timber buildings are estimated to be around 5% higher than those of conventional buildings [TAB short study No. 3 “Urban timber construction”; S. Kind, C. Bogenstahl, T. Jetzke, S. Richter; June 2022; Office for Technology Assessment at the German Bundestag].
##### 1.1.5 Zertifizierung klimafreundlicher Neubau
Certification as a climate-friendly new building is essential for your new building to qualify for funding from KfW. A building is considered climate-friendly if it consumes little energy and is therefore classified as an Efficiency House 40, emits few greenhouse gases, and therefore meets the greenhouse gas emission requirements of the [Sustainable Building Plus quality seal](https://www.qng.info/qng/qng-anforderungen/), and is not heated with oil, gas, or biomass.
The maximum loan amount increases from 100,000 euros to 150,000 euros per residential unit if the “Sustainable Building Plus or Premium quality seal” is additionally confirmed by a sustainability certificate such as that of the DGNB.
##### 1.1.6 Eigene Kostenberechnung
If the user already has the cost of a new construction, he can input it here. This will overwrite the native estimation.
##### 1.1.7 Kellergeschoss
Whether the building will have a basement or not.
##### 1.1.8: Stellplätze
The kind of parking spaces that are planned for the building.
##### 1.1.9: Aufzugsanlage
Whether the building will have an elevator or not.
##### 1.1.10: Barrierefreies Gebäude
Descriptions such as "reduced barriers" or "suitable for seniors" are vague terms that are not assigned any binding criteria. For residential buildings, the aspect of housing suitable for the elderly is considered in KfW funding.
The categories "barrier-free" and "barrier-free (R)" refers to the [DIN standard (18040-2): Apartments](https://www.aktion-barrierefreies-bad.de/glossar/din-18040-2/) and are defined according to this. The aim of this standard is to make buildings accessible so that they can be accessed and used by people with disabilities in the usual way, without particular difficulty and basically without outside help.
Barrier-free refers to the minimum requirements, while the "R" label indicates the additional requirements for wheelchair users that go beyond the minimum standard.
##### 1.1.11: Dachbegrünung
Extensive greening of the entire roof area.
##### 1.1.12: Anspruchsvolle Baustellenlogistik
Demanding construction site logistics primarily refer to the requirements of inner-city construction. Due to limited space and difficult traffic conditions, which bring with them logistical and infrastructural challenges, construction site management is considered to be complex and costly.
##### 1.1.13: Aufwand Außenanlagen
Expenses for outdoor facilities.
##### 14: Grundstücksbezogene Kosten [€/m²]
Costs of KG 100, which result from the acquisition of the land to be built on. These include the additional costs associated with the acquisition and ownership of the land, as well as the costs for the removal of rights and encumbrances. The land costs for new housing construction projects in German cities already account for an average of 20% of the total investment costs. There is currently no end in sight to this trend. (Arge e.V.). In addition, costs of KG 200 represent the preparatory measures so that all planned construction measures can be carried out on the land. The tool adds these costs to the investment costs.
##### 1.1.15: Baunebenkosten [%]
These are cost groups 700. These are services that are required for the construction project in addition to the construction services and supplies (e.g. services provided by the client, preparation of the object planning, object and specialist planning services, artistic services, and general ancillary construction costs). The tool adds these costs to the investment costs.

#### 1.2 Darlehen
This tab has all the loan-specific variables. What happens in construction is that even with subsidies from the government, the real estate developer still relies on bank loans to move forward with the construction because it is not common for them to afford the construction from their own pocket. The national bank KfW not only offers subsidies but also lends a certain amount of money for a lower fee compared to normal banks. After the subsidies and the loan from KfW, it is usually still necessary to cover the rest of the investment with the loan of a normal bank.
##### 1.2.1 Zinssatz Hausbank (Sollzins)
Here, you determine the interest rate that you receive from your bank or another financier and the KfW conditions at which you would like to compare. All interest rates are given as nominal interest rates.
##### 1.2.2 Kreditlaufzeit [a]
The loan term indicates how many months or years it takes until a loan is fully repaid.
##### 1.2.3 KfW-Darlehen
Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay the interest over the entire term and then repay the entire loan amount in one sum at the end. A bullet loan is only possible with a term of up to 10 years.
##### 1.2.4 Bank-Darlehen
Here, you can decide how you want to repay your loan. With an annuity loan, you only pay interest in the first few years (repayment-free start-up period) - after that, you pay equal monthly annuities. These represent the repayment amount, which is made up of interest and repayment. With a bullet loan, you only pay interest over the entire term and then repay the entire loan amount in one sum at the end.

### 2. Renovation of residential buildings (Fördermittel Komplettsanierung)
Funding calculator to fully renovate houses and apartments to be more energy efficient.
