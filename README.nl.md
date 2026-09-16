[ 🌐 عربي ](README.ar.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Sjabloon voor capaciteitsplanning van schildersbedrijven: beslissingssysteem voor ploegplanning en personeelsbezetting over 12 maanden

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)](#)
[![Tool Type](https://img.shields.io/badge/Tool-Capacity%20Planner-orange.svg)](#)

Zoekt u een betrouwbaar **sjabloon voor capaciteitsplanning van schildersbedrijven**? Deze lichtgewicht **werkmap voor ploegplanning** zet veranderende projectdata om in een visueel dashboard over 12 maanden van ploegvraag, vrije capaciteit en personeelstekorten. Speciaal gebouwd voor schildersbedrijven en buitendienstmedewerkers, helpt dit **spreadsheet voor resourcemanagement** u overbelaste weken te vermijden, personeelstekorten te voorspellen en uw personeelsinzet te optimaliseren—zonder de ballast van dure enterprise-ERP-software.

> Geen aanmelding. Geen installatie. Gratis toegang via de browser. Excel is beschikbaar voor teams die een offline werkbestand, permanente administratie, controlesporen en herhaald operationeel gebruik nodig hebben.
>
> [🌐 Probeer de gratis live capaciteitsplanner (browserapp zonder installatie)](https://hyvoid.github.io/crew-scheduling-excel-template/)
>
> [📥 Download het herbruikbare Excel-sjabloon voor ploegplanning (blijvend offline bestand)](https://theseusworkshop.com/l/kdeki?utm_source=github&utm_medium=GitHub%20README)


## Opgeloste knelpunten: wat deze tool voor resourcetoewijzing verhelpt
| Knelpunt | Oplossing |
| :--- | :--- |
| **Blind opdrachten aannemen** | Zie precies waar uw ploeg van 11 mensen de volledige capaciteit nadert—week na week over de komende 12 maanden. |
| **Verspilde leegloop** | Identificeer welke weken bruikbare vrije capaciteit hebben, waardoor lege productietijd zichtbaar wordt voor verkoop en planning. |
| **Onverwachte personeelstekorten** | Zie welke weken al overbelast zijn *voordat* een volgend project voor dezelfde periode wordt toegezegd. |
| **Vage signalen over aannemen van personeel** | Kwantificeer precies hoeveel schilders er ontbreken tijdens een overbelasting, en vervang "onderbuikgevoel" door datagestuurde beslissingen over personeelsbezetting. |
| **Complexe oplossing van planningsconflicten** | Wijs precies aan welke specifieke projecten overlappen tijdens een capaciteitsconflict, zodat u planningswijzigingen of het inhuren van onderaannemers kunt afwegen tegen de werkelijke werklast. |
| **Reactief personeelsbeheer** | Ontdek vroegtijdig waar het volgende capaciteitsprobleem optreedt, zodat het management een ruimer handelingsvenster heeft voor werving of het egaliseren van de inzet. |

## Snelstartworkflow: hoe u uw ploegplanning optimaliseert
Volg deze stapsgewijze handleiding om uw eerste capaciteitsprognose te maken.

### 1. Stel uw basisparameters in
Configureer de engine met uw standaardcijfers voor personeelsinzet. Voer de huidige ploeggrootte, normale werkdagen, de planningsstartdatum, de planningshorizon (bijv. 12 maanden), de drempel voor nabije volledige capaciteit en de aanlooptijd voor personeel in.
*Actie:* stel een ploeg van 11 schilders in, een werkweek van 5 dagen en een waarschuwing bij 90% van de capaciteit. Dit doet u slechts één keer.

### 2. Voer uw actieve opdrachtschema in
Voer uw actieve en geplande schilderopdrachten in de **operationele invoerlaag** in. Wanneer het project van een klant verschuift, werkt u eenvoudigweg de datums bij:
* Opdracht-ID en naam
* Startdatum en einddatum
* Benodigde schilders
* Status en prioriteit

### 3. Analyseer de geautomatiseerde capaciteitsprognose
De planningsengine zet uw projectschema automatisch om in de wekelijkse ploegvraag. Bekijk het dashboard voor drie kritieke operationele signalen:
*   **OPEN** — er is bruikbare vrije capaciteit.
*   **FULL** — het team bereikt de maximale inzet van het personeel.
*   **OVERLOAD** — de geplande vraag overschrijdt uw beschikbare ploeg (personeelstekort vastgesteld).

### 4. Verversen, reageren en standaardiseren
Schildersschema's blijven zelden statisch door weer, terreinomstandigheden en vertragingen bij de klant. Werk de opdrachtdatums bij wanneer omstandigheden veranderen. De capaciteitsweergave wordt direct herberekend, zonder dat u een statische Gantt-grafiek hoeft opnieuw op te bouwen.
*Klaar om dit permanent in te voeren?* Zodra u uw planningsworkflow in de browser hebt gevalideerd, kunt u **[📥 het Excel-sjabloon voor ploegplanning downloaden](https://theseusworkshop.com/l/kdeki?utm_source=github&utm_medium=GitHub%20README)** om blijvende operationele administratie te onderhouden, controlesporen met uw team te delen en een herhaalbare standaard voor personeelsbeheer vast te leggen.

## Waarom ik deze tool voor personeelsinzet in de buitendienst heb gebouwd
Het kernprobleem bij buitendienstbedrijven is niet het ontbreken van een Gantt-grafiek.

Een schildersbedrijf kan eenvoudig opsommen dat opdracht A maandag begint, opdracht B twee weken later en opdracht C aan het einde van de maand klaar is. Het moeilijke deel is te weten of die verschuivende datums samen binnen de beschikbare ploeg passen. Wanneer een klant een opdracht uitstelt, een andere uitloopt en een derde naar voren wordt gehaald, lijken de individuele wijzigingen beheersbaar. De crisis ontstaat wanneer deze wijzigingen elkaar overlappen.

Een conventioneel projectschema blijft visueel plausibel, zelfs wanneer de onderliggende **toewijzing van personeel** wiskundig onmogelijk wordt. Deze werkmap verandert verborgen conflicten in expliciete capaciteitssignalen.

In plaats van te vragen *"Passen deze projecten individueel?"*, antwoordt dit systeem: *"Wat gebeurt er in de week waarin alle actieve projecten overlappen?"* Het geeft het management de exacte gegevens die nodig zijn om een project met lagere prioriteit te verschuiven, planningsrisico te accepteren, schilders als onderaannemer in te huren of vast personeel aan te nemen.

## Personeelsplanning: handmatige tracking versus geoptimaliseerd systeem
| Veelvoorkomend planningsknelpunt | Conventionele handmatige aanpak | Geoptimaliseerde systeemoplossing |
| :--- | :--- | :--- |
| **Verschuivende projectdatums** | Handmatig datums verschuiven in een statische kalender, waarbij het effect op de personeelsinzet wordt gemist. | Het wijzigen van projectdatums herberekent automatisch de verwachte wekelijkse werklast. |
| **Verborgen overlap van projecten** | De haalbaarheid van opdrachten onafhankelijk beoordelen op basis van startdatums. | Overlappende personeelsbehoeften samenvoegen tot één wekelijkse vraagweergave. |
| **"We hebben meer mensen nodig"** | Reactieve beslissingen over het aannemen van personeel op basis van een recente stressvolle week. | De specifieke toekomstige week en het exacte aantal ontbrekende schilders identificeren. |
| **Verspilde periodes van lege ploegen** | Moeite om lege capaciteit te visualiseren in een standaard takenlijst. | Weken die **OPEN** zijn automatisch markeren om geschikt aanvullend contractwerk te zoeken. |
| **Overbelaste periodes** | Nieuwe offertes accepteren zonder de impact op bestaande verplichtingen te zien. | De capaciteitsstatus vooraf valideren om de gevolgen van extra werk te zien *voordat* wordt gepland. |
| **Oplossen van planningsconflicten** | Weten dat opdrachten overlappen, maar gissen welke moet worden uitgesteld. | Tijdlijnen afstemmen op projectprioriteiten om werk met lagere prioriteit veilig te verschuiven. |

## Voor wie dit bedoeld is: rollen en toepassingen
Deze tool is ontwikkeld voor kleine en middelgrote schildersbedrijven, buitendienstorganisaties en bouwteams die een vaste ploeg aansturen op een voortdurend veranderende reeks opdrachten. Hij speelt in op gerichte operationele behoeften:

*   **Eigenaren van schildersbedrijven** die deze *capaciteitstracker* gebruiken om te voorspellen wanneer ze onderaannemers moeten inhuren of het kernteam moeten uitbreiden.
*   **Projectmanagers in de bouw** die op dit *sjabloon voor ploegplanning* vertrouwen om gelijktijdige projecten in balans te houden zonder hun medewerkers op het werk te overbelasten.
*   **Planners van buitendienstwerk** die een *tool voor personeelstoewijzing* nodig hebben om snel bruikbare gaten te vinden voor spoedreparaties.

**Ideale operationele omstandigheden:**
* Het team is klein genoeg dat het toevoegen of verliezen van 1-2 schilders de totale capaciteit wezenlijk verandert.
* Projectdatums verschuiven vaak door externe afhankelijkheden.
* U hebt een operationele tool nodig, maar volledige enterprise resource planning (ERP) of complexe software voor personeelsbeheer is te zwaar.

*(Opmerking: dit is niet bedoeld om gedetailleerde dagelijkse planning, loonadministratie of fijnmazige software voor bouwkostenraming te vervangen. Het richt zich strikt op capaciteit van ploegen op macroniveau over een horizon van 12 maanden.)*

---

## Over

Ik bouw lichtgewicht trackers en tools voor besluitvormingsondersteuning in situaties waarin te veel bewegende delen zijn om betrouwbaar in uw hoofd te houden.

De centrale vraag is eenvoudig:

> **Welke informatie moet op één plek staan om de volgende beslissing met vertrouwen te kunnen nemen?**

Dit project past die aanpak toe op capaciteitsplanning voor schildersbedrijven. In plaats van een generiek dashboard te bouwen, richt het zich op de operationele keten van **opdrachtdata → ploegvraag → wekelijkse capaciteit → periodes van overbelasting en vrije capaciteit → actie op het gebied van personeel of planning**.

## Technische details

<details>
<summary>Voor technische reviewers, Excel-professionals en medewerkers</summary>

### Architectuur van de werkmap

De werkmap gebruikt een bewust kleine architectuur: **vier functionele lagen over vijf werkbladen**.

```text
00_SETUP
    │
    │ Global parameters
    ▼
01_JOBS
    │
    │ Structured job data
    ▼
02_RESOURCE_PLAN
    │
    ├──────────────► 03_12M_TIMELINE
    │                 Scheduling / Gantt view
    │
    └──────────────► 04_DASHBOARD
                      Management decision view
```

De afhankelijkheidsrichting is bewust eenrichtingsverkeer:

```text
Control Parameters
       ↓
Operational Inputs
       ↓
Calculation Engine
       ↓
Timeline / Dashboard
```

Er is geen noodzaak voor de gebruiker om berekende waarden handmatig tussen bladen te kopiëren.

| Blad              | Rol                    | Primaire verantwoordelijkheid                                                                            |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `00_SETUP`         | Besturingslaag           | Beheert ploeggrootte, werkdagen, planningshorizon, drempels, aanlooptijd en validatielijsten. |
| `01_JOBS`          | Invoerlaag             | Bewaart de actieve en geplande schilderopdrachten in `tbl_Jobs`.                                        |
| `02_RESOURCE_PLAN` | Rekenengine      | Zet opdrachtdata om in wekelijkse vraag, capaciteit, bezettingsgraad, gaten en personeelstekorten.       |
| `03_12M_TIMELINE`  | Visuele planningslaag | Toont de projecttijdlijn van 52 weken en markeert capaciteitsconflicten.                          |
| `04_DASHBOARD`     | Beslissingslaag         | Maakt belangrijke capaciteitsindicatoren, aankomende tekorten, vrije capaciteit en managementsignalen zichtbaar.      |

### `00_SETUP` — besturingslaag

Het installatieblad fungeert als de enige bron van waarheid voor aannames.

Kernparameters zijn onder meer:

| Parameter               |    Voorbeeld | Doel                                    |
| ----------------------- | ---------: | ------------------------------------------ |
| Ploeggrootte               |         11 | Beschikbare kernschilders                    |
| Werkdagen            |          5 | Standaard werkdagen per schilder per week |
| Planningsstart          | 2026-09-07 | Eerste maandag in de planningshorizon       |
| Horizon                 |  12 maanden | Doorlopende planningsperiode                    |
| Drempel nabije capaciteit |        90% | Waarschuwingsniveau                              |
| Aanlooptijd personeel      |    4 weken | Voorbereidingsvenster                 |
| Minimale vulsloot       |     1 week | Minimale bruikbare open periode                 |
| Valuta                |        `$` | Lokalisatie                               |
| Eenheidlabel              | `Painters` | Weergavelabel voor personeel                    |

De werkmap gebruikt benoemde verwijzingen zoals:

```text
Param_CrewSize
Param_WorkDays
Param_StartDate
Param_HorizonM
Param_NearCapRate
Param_LeadTimeWeeks
Param_MinFillSlot
Param_Currency
Param_UnitLabel
```

Afgeleide besturingselementen zijn onder meer:

```text
Setup_EndDate
Setup_TotalWeeks
Setup_WeeklyManDays
```

Dit voorkomt dat berekeningen stroomafwaarts waarden zoals `11`, `90%` of `12` rechtstreeks in formules inbedden.

Het uitbreiden van het team van 11 naar 12 schilders is bijvoorbeeld bedoeld om via de installatieparameter te worden geregeld, in plaats van door capaciteitsformules in de hele werkmap te herschrijven.

### `01_JOBS` — operationele invoerlaag

`01_JOBS` is het enige normale dagelijkse gegevensinvoergebied.

De opdrachttabel is geïmplementeerd als een Excel-tabel met de naam:

```text
tbl_Jobs
```

Kerninvoervelden:

| Veld             | Type    | Doel                                |
| ----------------- | ------- | -------------------------------------- |
| Opdracht-ID            | Tekst    | Unieke projectidentificatie              |
| Opdrachtnaam          | Tekst    | Identificatie van het project                 |
| Startdatum        | Datum    | Geplande datum van mobilisatie              |
| Einddatum          | Datum    | Geplande opleverdatum                |
| Benodigde schilders | Geheel getal | Behoefte aan ploegleden                       |
| Status            | Enum    | Planned / Active / On Hold / Completed |
| Prioriteit          | Enum    | High / Medium / Low                    |

Berekende velden zijn onder meer:

```text
Calendar Days
Work Days
Total Man-Days
Include in Plan
```

De scheiding tussen invoer en uitvoer is bewust.

```text
Manual Input
A:G
    ↓
Automatic Analysis
H:K
```

De kolommen `[Auto]` mogen niet handmatig worden overschreven.

### `02_RESOURCE_PLAN` — wekelijkse capaciteitsengine

De rekenengine creëert een doorlopende wekelijkse planningsreeks.

Voor een standaardhorizon van 12 maanden levert dit ongeveer **52–53 weekperiodes** op, afhankelijk van de exacte planningsdatums.

Elke week bevat:

```text
Week Index
Week Start
Week End
Month
Active Jobs
Allocated Crew
Available Capacity
Net Capacity Gap
Utilization
Capacity Status
Staffing Shortage
```

De kernstructuur van de wekelijkse beslissing is:

```text
                  Allocated Crew
                         │
                         ▼
                ┌─────────────────┐
                │ Capacity Compare│
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
        OPEN            FULL         OVERLOAD
```

De meegeleverde implementatie definieert drie operationele statussen:

* **OPEN** — de bezettingsgraad ligt onder de waarschuwingsdrempel.
* **FULL** — de bezettingsgraad bereikt de waarschuwingsdrempel maar overschrijdt de beschikbare capaciteit niet.
* **OVERLOAD** — de toegewezen ploeg overschrijdt de beschikbare capaciteit.

Het resulterende personeelstekort geeft het aantal extra schilders aan dat nodig is om de geplande werklast te dekken.

### Drie valkuilen die zelfs ervaren schildersbedrijven treffen

#### Valkuil 1 — Naar opdrachten afzonderlijk kijken in plaats van naar de overlappende week

**1. Genomen beslissing**

Drie projecten worden aangenomen omdat elk afzonderlijk project binnen een ploeg van 11 mensen past.

**2. Foutieve aanname**

Het schema wordt project voor project beoordeeld in plaats van op gelijktijdige wekelijkse vraag.

**3. Effect op de aanbeveling**

Het bedrijf concludeert dat er geen extra personeel nodig is.

**4. Waarom de redenering onjuist is**

Capaciteit wordt gelijktijdig verbruikt. De relevante beperking is niet of elk project afzonderlijk past, maar of hun personeelsbehoeften overlappen.

**5. Gecorrigeerde aanpak**

Aggregeer alle actief geplande personeelsbehoeften per week.

**6. Gecorrigeerd resultaat**

Een week met 4 + 5 + 3 schilders vereist 12 schilders tegen een capaciteit van 11 schilders.

De beslissing wordt expliciet:

```text
Demand      = 12 painters
Capacity    = 11 painters
Shortage    = 1 painter
Utilization = 109.1%
Status      = OVERLOAD
```

Het bedrijf kan nu een opdracht met lagere prioriteit verschuiven of één externe schilder aantrekken voordat het conflict optreedt.

<details>
<summary>Formulelogica</summary>

Wekelijkse overlap is gebaseerd op de vraag of het projectinterval het weekinterval snijdt:

```text
Job Start ≤ Week End
AND
Job End ≥ Week Start
```

De wekelijks toegewezen ploeg is vervolgens de som van de personeelsbehoeften van opdrachten die aan die overlapvoorwaarde voldoen.

```text
Allocated Crew
=
SUM(Crew Required × IsActive)
```

</details>

#### Valkuil 2 — Een volle week behandelen als gelijk aan een overbelaste week

**1. Genomen beslissing**

Een manager ziet een week met 100% bezettingsgraad en behandelt die als al overbelast.

**2. Foutieve aanname**

"Vol" en "over capaciteit" worden als dezelfde operationele toestand behandeld.

**3. Effect op de aanbeveling**

De manager kan te vroeg onderaannemers inschakelen of werk weigeren dat nog precies binnen de beschikbare ploeg zou passen.

**4. Waarom de redenering onjuist is**

Een behoefte van 11 schilders tegen 11 beschikbare schilders verbruikt alle capaciteit, maar creëert geen wiskundig personeelstekort.

**5. Gecorrigeerde aanpak**

Scheid een bezettingsgraad op waarschuwingsniveau van een werkelijke overschrijding van de capaciteit.

**6. Gecorrigeerd resultaat**

```text
Demand      = 11
Capacity    = 11
Gap         = 0
Utilization = 100%
Shortage    = 0
Status      = FULL
```

Dit is een waarschuwing voor het management, niet automatisch een behoefte aan personeel.

Het onderscheid is belangrijk omdat de juiste actie kan zijn om het schema te beschermen en te voorkomen dat werk met lage prioriteit wordt ingevoegd, in plaats van onmiddellijk personeel aan te nemen.

<details>
<summary>Formulelogica</summary>

```text
Net Capacity Gap
=
Available Capacity - Allocated Crew

Utilization
=
Allocated Crew / Available Capacity

Staffing Shortage
=
MAX(0, Allocated Crew - Available Capacity)
```

Het tekort blijft nul wanneer de vraag precies gelijk is aan de capaciteit.

</details>

#### Valkuil 3 — Vrije capaciteit zien zonder te controleren wanneer die werkelijk bruikbaar is

**1. Genomen beslissing**

Een verkoopmanager ziet verschillende periodes met een lage belasting en gaat ervan uit dat er ruimte is voor nog een project.

**2. Foutieve aanname**

Elke zichtbare vrije capaciteit wordt behandeld als onmiddellijk bruikbare capaciteit.

**3. Effect op de aanbeveling**

Een project wordt toegezegd zonder rekening te houden met de benodigde ploeggrootte, duur of de exacte wekelijkse plaatsing.

**4. Waarom de redenering onjuist is**

Een project met twee schilders past misschien wel in een open week, maar niet in een week waarin bestaand werk al het grootste deel van de ploeg verbruikt.

**5. Gecorrigeerde aanpak**

Beoordeel de beschikbare capaciteit op weekniveau en vergelijk die met het aantal benodigde schilders en de duur van het voorgestelde project.

**6. Gecorrigeerd resultaat**

In plaats van de vraag:

```text
"Do we have spare capacity this month?"
```

wordt de operationele vraag:

```text
"Which specific weeks can absorb this crew requirement?"
```

Dat onderscheid verandert onbenutte capaciteit in een planningsinvoer in plaats van een vage verkoopaanname.

<details>
<summary>Formulelogica</summary>

Het capaciteitssignaal wordt afgeleid uit:

```text
Available Capacity
-
Allocated Crew
=
Net Capacity Gap
```

Positieve waarden duiden op beschikbare personeelscapaciteit.

Negatieve waarden duiden op een tekort.

</details>

### Voorbeeldscenario

Stel dat de ploeg **11 schilders** blijft, met een standaard werkweek van vijf dagen.

Het huidige schema bevat:

| Opdracht      | Start  | Eind    | Schilders | Prioriteit |
| -------- | ------ | ------ | -------: | -------- |
| J-26-001 | 7 sep  | 25 sep |        4 | High     |
| J-26-002 | 14 sep | 9 okt  |        5 | Medium   |
| J-26-003 | 21 sep | 25 sep |        3 | Low      |

De wekelijkse planningsengine ziet het volgende patroon:

| Week         | Toegewezen ploeg | Capaciteit | Bezettingsgraad | Status   | Tekort |
| ------------ | -------------: | -------: | ----------: | -------- | -------: |
| 7–13 sep     |              4 |       11 |       36,4% | OPEN     |        0 |
| 14–20 sep    |              9 |       11 |       81,8% | OPEN     |        0 |
| 21–27 sep    |             12 |       11 |      109,1% | OVERLOAD |        1 |
| 28 sep–4 okt |              5 |       11 |       45,5% | OPEN     |        0 |
| 5–11 okt     |              5 |       11 |       45,5% | OPEN     |        0 |

De belangrijke week is **21–27 september**.

Het schema vereist 12 schilders tegen een kernteam van 11 schilders. Het tekort is dus **één schilder**.

De tijdlijn toont ook dat de overbelasting wordt veroorzaakt door drie gelijktijdige opdrachten. Omdat J-26-003 als Low priority is gemarkeerd, kan de eerste corrigerende actie zijn om dat reparatieproject naar een latere OPEN periode te verschuiven.

Als J-26-003 buiten het conflictvenster van 21–27 september wordt verplaatst, daalt de vraag van 12 naar 9 schilders:

```text
Original:
4 + 5 + 3 = 12 painters
12 / 11 = 109.1%
OVERLOAD
```

Na herplanning:

```text
4 + 5 = 9 painters
9 / 11 = 81.8%
OPEN
```

De beslissing over personeel verandert daardoor van **"zoek één extra schilder"** naar **"herplan de opdracht met drie schilders en lage prioriteit"**.

Als alle drie projecten contractueel vastliggen en niet kunnen verschuiven, ondersteunt dezelfde analyse een andere beslissing: het aantrekken van **één externe schilder** voor de betreffende periode.

Dit is het beoogde gebruik van het model: niet alleen vaststellen dat een schema druk is, maar de werklast verbinden met een uitvoerbare operationele reactie.

### Formuleverwijzing

<details>
<summary>Installatieformules</summary>

#### Geplande einddatum

```excel
=EDATE(Param_StartDate, Param_HorizonM)-1
```

Doel:

Berekent de laatste datum van de planningshorizon op basis van de planningsstartdatum en het geselecteerde aantal maanden.

#### Totaal aantal planningsweken

```excel
=ROUNDUP((Setup_EndDate-Param_StartDate+1)/7,0)
```

Doel:

Bepaalt hoeveel weekperiodes nodig zijn voor de geselecteerde planningshorizon.

#### Wekelijkse capaciteit in man-dagen

```excel
=Param_CrewSize*Param_WorkDays
```

Doel:

Zet het aantal mensen in de ploeg en de normale werkdagen om in een standaard wekelijkse capaciteit in man-dagen.

Voor een ploeg van 11 schilders die vijf dagen werkt:

```text
11 × 5 = 55 man-days/week
```

</details>

<details>
<summary>Formules op opdrachtniveau</summary>

#### Kalenderduur

```excel
=[@[计划完工日]]-[@[计划进场日]]+1
```

Doel:

Berekent de inclusieve kalenderduur van de opdracht.

#### Standaard werkdagen

```excel
=NETWORKDAYS.INTL(
    [@[计划进场日]],
    [@[计划完工日]],
    1
)
```

Doel:

Berekent werkdagen met uitsluiting van het standaard weekendpatroon.

#### Totaal geraamde man-dagen

```excel
=[@[所需油漆工数]]*[@[施工工作日]]
```

Doel:

Zet de personeelsbehoefte van het project en de werkduur om in de totale arbeidsvraag.

#### Besturing voor opname in de planning

```excel
=IF(
    AND(
        OR(
            [@[施工状态]]="Planned",
            [@[施工状态]]="Active"
        ),
        [@[计划完工日]]>=Param_StartDate,
        [@[计划进场日]]<=Setup_EndDate,
        [@[计划完工日]]>=[@[计划进场日]]
    ),
    "Y",
    "N"
)
```

Doel:

Voorkomt dat afgeronde, gepauzeerde, ongeldige of volledig buiten de horizon vallende opdrachten in de capaciteitsberekening terechtkomen.

</details>

<details>
<summary>Wekelijkse resourceformules</summary>

#### Reeks van weekstartdatums

```excel
=Param_StartDate+7*(SEQUENCE(Setup_TotalWeeks,,0))
```

Doel:

Creëert de doorlopende wekelijkse planningsas vanaf de geconfigureerde maandag als startdatum.

#### Weekeinde

```excel
=Plan_WeekStart+6
```

Doel:

Creëert de inclusieve zondaggrens voor elke planningsweek.

#### Overlaplogica opdracht en week

```text
Job Start Date <= Week End Date
AND
Job End Date >= Week Start Date
```

Doel:

Identificeert opdrachten waarvan het geplande interval het wekelijkse planningsinterval overlapt.

Zo wordt voorkomen dat alleen op de startdatum van de opdracht wordt vertrouwd en worden ook projecten meegenomen die vóór een week beginnen en doorlopen in die week.

#### Toegewezen ploeg

Conceptueel:

```text
Allocated Crew
=
SUM of Painters Required
for all valid jobs overlapping the week
```

#### Capaciteitstekort

```text
Capacity Gap
=
Available Capacity - Allocated Crew
```

Positieve waarden vertegenwoordigen onbenutte capaciteit.

Negatieve waarden vertegenwoordigen een tekort.

#### Bezettingsgraad

```text
Utilization
=
Allocated Crew / Available Capacity
```

#### Personeelstekort

```text
Staffing Shortage
=
MAX(0, Allocated Crew - Available Capacity)
```

Dit zet een overbelasting om in een concrete hoeveelheid personeel.

</details>

### Validatieregels

| Veld                   | Regel                                                    | Foutgedrag                                                            |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| Ploeggrootte               | Positief geheel getal binnen het geconfigureerde validatiebereik | Een ongeldige waarde moet worden geweigerd door gegevensvalidatie.                      |
| Werkdagen            | Geheel getal van 1–7                                        | Voorkomt onmogelijke aannames over werkdagen per week.                       |
| Startdatum planning     | Moet een maandag zijn                                        | Voorkomt verschuiving van de wekelijkse tijdlijn.                                          |
| Planningshorizon        | Geheel getal van 1–24 maanden                                | Voorkomt ongeldige planningsbereiken.                                           |
| Drempel nabije capaciteit | 50%–100%                                                | Voorkomt betekenisloze waarschuwingsdrempels.                                  |
| Aanlooptijd personeel      | Niet-negatieve planningswaarde                            | Wordt gebruikt om normale voorbereiding te onderscheiden van dringende actie op het gebied van personeel.       |
| Minimale vulsloot       | Positieve planningswaarde                                 | Voorkomt dat onbeduidende gaten als bruikbare verkoopcapaciteit worden behandeld.  |
| Opdracht-ID                  | Moet een unieke opdracht identificeren                              | Beschermt herleidbaarheid op projectniveau.                                      |
| Startdatum opdracht          | Geldige datum en binnen of rond de planningshorizon           | Voorkomt ongeldige planningsrecords.                                      |
| Einddatum opdracht          | Moet groter zijn dan of gelijk aan de startdatum                | Voorkomt negatieve of omgekeerde opdrachtduur.                               |
| Benodigde schilders       | Positief geheel getal                                        | Voorkomt vraag naar resources van nul of negatief.                                       |
| Opdrachtstatus              | Planned / Active / On Hold / Completed                  | Houdt waarden van de levenscyclus consistent.                                        |
| Opdrachtprioriteit            | High / Medium / Low                                     | Zorgt voor consistente weging bij het oplossen van conflicten.                                      |
| Opname in planning         | Automatisch bepaald                                | Sluit ongeldige of irrelevante records uit van berekeningen stroomafwaarts.      |
| Automatische kolommen       | Mogen niet handmatig worden overschreven                        | Beschermt gestructureerde formules en berekeningen stroomafwaarts.                 |
| Resourceplan           | Alleen berekeningsgebied                                   | Handmatige bewerkingen kunnen de continuïteit van dynamische arrays verstoren en moeten worden verboden. |

</details>

## De bedrijfslogica en methodologie

Het model is gebouwd rond een eenvoudig operationeel principe: **capaciteitsbeslissingen moeten worden genomen op basis van de gecombineerde werklast van overlappende opdrachten, niet op basis van geïsoleerde projectramingen**.

De methodologie scheidt bewust drie vragen die in kleine aannemersbedrijven vaak door elkaar lopen:

* **Doorlopende capaciteitsplanning** — het toekomstige schema wordt week na week over een horizon van 12 maanden bekeken, waardoor aankomende werkdruk zichtbaar wordt voordat die een probleem op het werk wordt.
* **Drempelwaarschuwingen** — capaciteit wordt verdeeld in de statussen OPEN, FULL en OVERLOAD. Dit onderscheidt bruikbare vrije capaciteit van een werkelijk beperkte periode, zodat een waarschuwing niet automatisch een beslissing over personeel wordt.
* **Aggregatie van werklast** — gelijktijdige projecten worden samen beschouwd in plaats van afzonderlijk. Dit legt het praktische effect van overlappende opdrachten op dezelfde ploeg bloot.
* **Analyse van personeelstekorten op basis van gaten** — een overbelasting wordt vertaald in een specifiek aantal ontbrekende schilders. De beslissing kan dan worden geformuleerd als herplannen, uitbesteden of vast personeel aannemen, in plaats van als het vage oordeel dat "het team te druk is".
* **Analyse van capaciteitsvensters** — periodes met een lage bezettingsgraad worden behandeld als potentiële verkoopcapaciteit. Dit geeft plannings- en verkoopteams een concrete basis om te mikken op kortdurend of passend aanvullend werk.

De commerciële waarde is dus niet de grafiek zelf. De waarde zit in de verbinding tussen **toekomstige verplichtingen, beschikbare arbeid, timing en actie**.

Een schema met 11 benodigde schilders is anders dan een schema met 12 benodigde schilders. Een maand met een gemiddelde bezettingsgraad van 40% is ook niet genoeg om te verklaren of een bepaalde week overbelast is. Het model houdt deze onderscheiden zichtbaar, zodat operationele beslissingen worden genomen op het niveau waar de beperking werkelijk optreedt.

## Andere tools in deze serie

Dit project behoort tot een bredere serie lichtgewicht Excel- en browsergebaseerde tools voor besluitvormingsondersteuning, gericht op het omzetten van operationele gegevens in herbruikbare managementworkflows.

* **Tools voor bouwkosten en BOQ** — hoeveelheden, directe kosten en constructiebehoeften op projectniveau ramen.
* **Tools voor projectbeheersing** — budget, werkelijke kosten, voortgang, wijzigingen, facturering, incasso en cashflow met elkaar verbinden.
* **Tools voor voorraad en afstemming** — voorraadverschillen, operationeel verlies en financiële blootstelling identificeren.
* **Tools voor financiële planning** — operationele aannames verbinden met prognoses, scenario's en financiële uitkomsten.

Het gemeenschappelijke principe is hetzelfde: **zet de informatie die nodig is voor de volgende operationele beslissing op één plek, zonder een onnodig enterprise-systeem in te voeren.**

## Licentie

Dit project is vrijgegeven onder de **Apache License 2.0**.

Zie het bestand `LICENSE` voor de volledige licentietekst.
