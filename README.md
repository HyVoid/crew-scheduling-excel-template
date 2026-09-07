# Painting Contractor Capacity Planning Template: 12-Month Crew Scheduling & Staffing Decision System

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)](#)
[![Tool Type](https://img.shields.io/badge/Tool-Capacity%20Planner-orange.svg)](#)

Looking for a reliable **painting contractor capacity planning template**? This lightweight **crew scheduling workbook** turns moving project dates into a 12-month visual dashboard of crew demand, open capacity, and staffing gaps. Built specifically for painting businesses and field service contractors, this **resource management spreadsheet** helps you avoid overloaded weeks, forecast labor shortages, and optimize your workforce—without the overhead of expensive enterprise ERP software.

> No signup. No installation. Free browser access. Excel is available for teams that need an offline working file, permanent records, audit trails, and repeated operational use.
>
> [🌐 Try the Free Live Capacity Planner (No-Install Browser App)](#)
>
> [📥 Download the Reusable Excel Crew Scheduling Template (Persistent Offline File)](#)


## Pain Points Solved: What This Resource Allocation Tool Fixes
*   **Pain Point: Blindly accepting jobs.** *Solution:* See exactly where your 11-person crew is approaching full capacity—week by week across the next 12 months.
*   **Pain Point: Wasted idle time.** *Solution:* Identify which weeks have usable spare capacity, making empty production time visible to sales and dispatching teams.
*   **Pain Point: Unexpected labor shortages.** *Solution:* Spot which weeks are already overloaded *before* another project is committed to the same period.
*   **Pain Point: Vague hiring signals.** *Solution:* Quantify exactly how many painters are missing during an overload, replacing "gut feelings" with data-driven staffing decisions.
*   **Pain Point: Complex schedule conflict resolution.** *Solution:* Pinpoint which specific projects overlap during a capacity conflict, allowing you to evaluate schedule shifts or subcontractor hiring against actual workload.
*   **Pain Point: Reactive workforce management.** *Solution:* Discover where the next capacity problem occurs early, giving management a wider action window for hiring or resource leveling.

## Quick Start Workflow: How to Optimize Your Crew Schedule
Follow this step-by-step tutorial to generate your first capacity forecast.

### 1. Set Your Baseline Operating Parameters
Configure the engine with your standard workforce metrics. Enter the current crew size, normal working days, planning start date, planning horizon (e.g., 12 months), near-capacity threshold, and staffing lead time. 
*Action:* Set an 11-painter crew, a 5-day work week, and a 90% near-capacity warning. You only do this once.

### 2. Input Your Active Job Schedule
Feed your active and planned painting jobs into the **operational input layer**. When a customer's project moves, simply update the dates:
* Job ID & Name
* Start Date & End Date
* Painters Required
* Status & Priority

### 3. Analyze the Automated Capacity Forecast
The planning engine automatically translates your project schedule into weekly crew demand. Review the dashboard for three critical operational signals:
*   **OPEN** — Usable spare capacity exists.
*   **FULL** — The team is hitting maximum workforce utilization.
*   **OVERLOAD** — Scheduled demand exceeds your available crew (staffing shortage detected).

### 4. Refresh, React, and Standardize
Painting schedules rarely remain static due to weather, site conditions, and client delays. As conditions change, update the job dates. The capacity view instantly recalculates without requiring you to rebuild a static Gantt chart.
*Ready to implement this permanently?* Once you've validated your scheduling workflow in the browser, **[📥 Download the Excel Crew Scheduling Template]** to maintain persistent operational records, share audit trails with your team, and establish a repeatable workforce management standard.

## Why I Built This Field Service Manpower Tool
The core operational problem for field service businesses is not the absence of a Gantt chart. 

A painting contractor can easily list that Job A starts Monday, Job B starts two weeks later, and Job C finishes by month-end. The difficult part is knowing whether those moving dates collectively fit the available crew. When a customer delays a job, another runs long, and a third is pulled forward, the individual changes look manageable. The crisis hits when these changes overlap.

A conventional project schedule remains visually plausible even when the underlying **manpower allocation** becomes mathematically impossible. This workbook transforms hidden conflicts into explicit capacity signals. 

Instead of asking, *"Do these projects individually fit?"*, this system answers: *"What happens during the week when all active projects overlap?"* It gives management the exact data needed to move a lower-priority project, accept schedule risk, subcontract painters, or hire full-time staff.

## Workforce Scheduling: Manual Tracking vs. Optimized System
| Common Scheduling Pain Point | Conventional Manual Approach | Optimized System Solution |
| :--- | :--- | :--- |
| **Moving Project Dates** | Manually shifting dates on a static calendar, missing the ripple effect on labor. | Changing project dates automatically recalculates the projected weekly workload. |
| **Hidden Project Overlap** | Evaluating job feasibility independently based on start dates. | Aggregating overlapping crew requirements into a single weekly demand view. |
| **"We Need More People"** | Making reactive hiring decisions based on a recent stressful week. | Identifying the specific future week and exact number of painters missing. |
| **Wasted Empty Crew Periods** | Struggling to visualize idle capacity in a standard task list. | Flagging **OPEN** weeks automatically to pursue suitable fill-in contract work. |
| **Overloaded Timeframes** | Accepting new bids without seeing the impact on existing commitments. | Pre-validating capacity status to see the consequences of additional work *before* scheduling. |
| **Schedule Conflict Resolution** | Knowing jobs overlap, but guessing which one should be delayed. | Aligning timelines with project priorities to safely shift lower-priority work. |

## Who This Is For: Roles & Use Cases
This tool is engineered for small-to-medium painting contractors, field-service operators, and construction teams managing a fixed crew against a fluid pipeline of jobs. It captures targeted operational needs:

*   **Painting Business Owners** using this *capacity tracker* to forecast when they need to hire subcontractors or expand the core team.
*   **Construction Project Managers** relying on this *crew scheduling template* to balance concurrent projects without burning out their field workers.
*   **Field Service Schedulers** requiring a *manpower allocation tool* to quickly find usable gaps for emergency repair jobs.

**Ideal Operating Conditions:**
* The team is small enough that adding/losing 1-2 painters materially changes overall capacity.
* Project dates shift frequently due to external dependencies.
* You need an operational tool, but full Enterprise Resource Planning (ERP) or complex workforce-management software is overkill.

*(Note: This is not intended to replace detailed daily dispatching, payroll, or granular construction estimating software. It focuses strictly on macro-level crew capacity over a 12-month horizon.)*

---

## About

I build lightweight trackers and decision-support tools for situations where there are too many moving parts to hold in your head reliably.

The central question is simple:

> **What information needs to be in one place to make the next decision confidently?**

This project applies that approach to painting-contractor capacity planning. Instead of building a generic dashboard, it focuses on the operating chain from **job dates → crew demand → weekly capacity → overload/open periods → staffing or scheduling action**.

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

The workbook uses a deliberately small architecture: **four functional layers across five worksheets**.

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

The dependency direction is intentionally one-way:

```text
Control Parameters
       ↓
Operational Inputs
       ↓
Calculation Engine
       ↓
Timeline / Dashboard
```

There is no requirement for the user to manually copy calculated values between sheets.

| Sheet              | Role                    | Primary Responsibility                                                                            |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `00_SETUP`         | Control layer           | Maintains crew size, working days, planning horizon, thresholds, lead time, and validation lists. |
| `01_JOBS`          | Input layer             | Stores the active and planned painting jobs in `tbl_Jobs`.                                        |
| `02_RESOURCE_PLAN` | Calculation engine      | Converts job dates into weekly demand, capacity, utilization, gaps, and staffing shortages.       |
| `03_12M_TIMELINE`  | Visual scheduling layer | Displays the 52-week project timeline and highlights capacity conflicts.                          |
| `04_DASHBOARD`     | Decision layer          | Surfaces key capacity indicators, upcoming shortages, open capacity, and management signals.      |

### `00_SETUP` — Control Layer

The setup sheet acts as the single source of truth for assumptions.

Core parameters include:

| Parameter               |    Example | Purpose                                    |
| ----------------------- | ---------: | ------------------------------------------ |
| Crew Size               |         11 | Available core painters                    |
| Working Days            |          5 | Standard working days per painter per week |
| Planning Start          | 2026-09-07 | First Monday in the planning horizon       |
| Horizon                 |  12 months | Rolling planning period                    |
| Near Capacity Threshold |        90% | Warning level                              |
| Staffing Lead Time      |    4 weeks | Advance preparation window                 |
| Minimum Fill Slot       |     1 week | Minimum useful open period                 |
| Currency                |        `$` | Localization                               |
| Unit Label              | `Painters` | Workforce display label                    |

The workbook uses named references such as:

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

Derived controls include:

```text
Setup_EndDate
Setup_TotalWeeks
Setup_WeeklyManDays
```

This prevents downstream calculations from embedding values such as `11`, `90%`, or `12` directly inside formulas.

For example, increasing the team from 11 to 12 painters is intended to be handled through the setup parameter rather than by rewriting capacity formulas throughout the workbook.

### `01_JOBS` — Operational Input Layer

`01_JOBS` is the only normal day-to-day data-entry area.

The job table is implemented as an Excel Table named:

```text
tbl_Jobs
```

Core input fields:

| Field             | Type    | Purpose                                |
| ----------------- | ------- | -------------------------------------- |
| Job ID            | Text    | Unique project identifier              |
| Job Name          | Text    | Project identification                 |
| Start Date        | Date    | Planned mobilization date              |
| End Date          | Date    | Planned completion date                |
| Painters Required | Integer | Crew requirement                       |
| Status            | Enum    | Planned / Active / On Hold / Completed |
| Priority          | Enum    | High / Medium / Low                    |

Calculated fields include:

```text
Calendar Days
Work Days
Total Man-Days
Include in Plan
```

The input/output separation is deliberate.

```text
Manual Input
A:G
    ↓
Automatic Analysis
H:K
```

The `[Auto]` columns should not be manually overwritten.

### `02_RESOURCE_PLAN` — Weekly Capacity Engine

The calculation engine creates a continuous weekly planning sequence.

For a standard 12-month horizon, this produces approximately **52–53 weekly periods**, depending on the exact planning dates.

Each week contains:

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

The core weekly decision structure is:

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

The supplied implementation defines three operational states:

* **OPEN** — utilization is below the warning threshold.
* **FULL** — utilization reaches the warning threshold but does not exceed available capacity.
* **OVERLOAD** — allocated crew exceeds available capacity.

The resulting staffing shortage identifies the number of additional painters required to cover the scheduled workload.

### Three Traps That Catch Even Experienced Painting Contractors

#### Trap 1 — Looking at jobs individually instead of at the overlapping week

**1. Decision made**

Three projects are accepted because each individual project fits inside an 11-person crew.

**2. Faulty assumption**

The schedule is reviewed project by project rather than by concurrent weekly demand.

**3. Effect on recommendation**

The contractor concludes that no additional labor is required.

**4. Why the reasoning is wrong**

Capacity is consumed simultaneously. The relevant constraint is not whether each project fits independently, but whether their crew requirements overlap.

**5. Corrected approach**

Aggregate all active scheduled crew requirements for each week.

**6. Corrected outcome**

A week containing 4 + 5 + 3 painters requires 12 painters against an 11-painter capacity.

The decision becomes explicit:

```text
Demand      = 12 painters
Capacity    = 11 painters
Shortage    = 1 painter
Utilization = 109.1%
Status      = OVERLOAD
```

The contractor can now move a lower-priority job or secure one external painter before the conflict occurs.

<details>
<summary>Formula logic</summary>

Weekly overlap is based on whether the project interval intersects the weekly interval:

```text
Job Start ≤ Week End
AND
Job End ≥ Week Start
```

The weekly allocated crew is then the sum of crew requirements for jobs satisfying that overlap condition.

```text
Allocated Crew
=
SUM(Crew Required × IsActive)
```

</details>

#### Trap 2 — Treating a full week as equivalent to an overloaded week

**1. Decision made**

A manager sees a week at 100% utilization and treats it as already overloaded.

**2. Faulty assumption**

“Full” and “over capacity” are treated as the same operating condition.

**3. Effect on recommendation**

The manager may subcontract too early or reject work that could still fit exactly within the available crew.

**4. Why the reasoning is wrong**

An 11-painter requirement against 11 available painters consumes all capacity, but it does not create a mathematical staffing shortage.

**5. Corrected approach**

Separate warning-level utilization from actual capacity excess.

**6. Corrected outcome**

```text
Demand      = 11
Capacity    = 11
Gap         = 0
Utilization = 100%
Shortage    = 0
Status      = FULL
```

This is a management warning, not automatically a staffing requirement.

The distinction matters because the appropriate action may be to protect the schedule and avoid inserting low-priority work rather than immediately hiring.

<details>
<summary>Formula logic</summary>

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

The shortage remains zero when demand exactly equals capacity.

</details>

#### Trap 3 — Seeing spare capacity without checking when it is actually usable

**1. Decision made**

A sales manager sees several low-load periods and assumes there is room for another project.

**2. Faulty assumption**

Any visible spare capacity is treated as immediately usable capacity.

**3. Effect on recommendation**

A project is promised without considering its required crew size, duration, or the exact weekly placement.

**4. Why the reasoning is wrong**

A two-painter project may fit into one open week but not into a week where existing work already consumes most of the crew.

**5. Corrected approach**

Evaluate available capacity at the weekly level and compare it against the proposed project's required painters and duration.

**6. Corrected outcome**

Instead of asking:

```text
"Do we have spare capacity this month?"
```

the operational question becomes:

```text
"Which specific weeks can absorb this crew requirement?"
```

That distinction turns unused capacity into a scheduling input rather than a vague sales assumption.

<details>
<summary>Formula logic</summary>

The capacity signal is derived from:

```text
Available Capacity
-
Allocated Crew
=
Net Capacity Gap
```

Positive values identify available crew capacity.

Negative values identify shortage.

</details>

### Example Scenario

Assume the crew remains at **11 painters**, with a standard five-day working week.

The current schedule contains:

| Job      | Start  | End    | Painters | Priority |
| -------- | ------ | ------ | -------: | -------- |
| J-26-001 | Sep 7  | Sep 25 |        4 | High     |
| J-26-002 | Sep 14 | Oct 9  |        5 | Medium   |
| J-26-003 | Sep 21 | Sep 25 |        3 | Low      |

The weekly planning engine sees the following pattern:

| Week         | Allocated Crew | Capacity | Utilization | Status   | Shortage |
| ------------ | -------------: | -------: | ----------: | -------- | -------: |
| Sep 7–13     |              4 |       11 |       36.4% | OPEN     |        0 |
| Sep 14–20    |              9 |       11 |       81.8% | OPEN     |        0 |
| Sep 21–27    |             12 |       11 |      109.1% | OVERLOAD |        1 |
| Sep 28–Oct 4 |              5 |       11 |       45.5% | OPEN     |        0 |
| Oct 5–11     |              5 |       11 |       45.5% | OPEN     |        0 |

The important week is **September 21–27**.

The schedule requires 12 painters against an 11-painter core team. The shortage is therefore **one painter**.

The timeline also shows that the overload is caused by three concurrent jobs. Because J-26-003 is marked Low priority, the first corrective action can be to move that repair project into a later OPEN period.

If J-26-003 moves beyond the September 21–27 conflict window, demand falls from 12 to 9 painters:

```text
Original:
4 + 5 + 3 = 12 painters
12 / 11 = 109.1%
OVERLOAD
```

After rescheduling:

```text
4 + 5 = 9 painters
9 / 11 = 81.8%
OPEN
```

The staffing decision therefore changes from **“find one additional painter”** to **“reschedule the low-priority three-painter job”**.

If all three projects are contractually fixed and cannot move, the same analysis supports a different decision: secure **one external painter** for the affected period.

This is the intended use of the model: not simply identifying that a schedule is busy, but connecting the workload to an actionable operational response.

### Formula Reference

<details>
<summary>Setup formulas</summary>

#### Planning end date

```excel
=EDATE(Param_StartDate, Param_HorizonM)-1
```

Purpose:

Calculates the final date of the planning horizon from the planning start date and selected number of months.

#### Total planning weeks

```excel
=ROUNDUP((Setup_EndDate-Param_StartDate+1)/7,0)
```

Purpose:

Determines how many weekly periods are required by the selected planning horizon.

#### Weekly man-day capacity

```excel
=Param_CrewSize*Param_WorkDays
```

Purpose:

Converts the crew headcount and normal working days into a standard weekly man-day capacity.

For an 11-painter crew working five days:

```text
11 × 5 = 55 man-days/week
```

</details>

<details>
<summary>Job-level formulas</summary>

#### Calendar duration

```excel
=[@[计划完工日]]-[@[计划进场日]]+1
```

Purpose:

Calculates the inclusive calendar duration of the job.

#### Standard working days

```excel
=NETWORKDAYS.INTL(
    [@[计划进场日]],
    [@[计划完工日]],
    1
)
```

Purpose:

Calculates working days while excluding the standard weekend pattern.

#### Total estimated man-days

```excel
=[@[所需油漆工数]]*[@[施工工作日]]
```

Purpose:

Converts project crew requirement and working duration into total labor demand.

#### Include-in-plan control

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

Purpose:

Prevents completed, paused, invalid, or completely out-of-horizon jobs from entering the capacity calculation.

</details>

<details>
<summary>Weekly resource formulas</summary>

#### Week start sequence

```excel
=Param_StartDate+7*(SEQUENCE(Setup_TotalWeeks,,0))
```

Purpose:

Creates the continuous weekly planning axis from the configured Monday start date.

#### Week end

```excel
=Plan_WeekStart+6
```

Purpose:

Creates the inclusive Sunday boundary for each planning week.

#### Job/week overlap logic

```text
Job Start Date <= Week End Date
AND
Job End Date >= Week Start Date
```

Purpose:

Identifies jobs whose scheduled interval overlaps the weekly planning interval.

This avoids relying only on the job's start date and therefore captures projects that begin before a week and continue into it.

#### Allocated crew

Conceptually:

```text
Allocated Crew
=
SUM of Painters Required
for all valid jobs overlapping the week
```

#### Capacity gap

```text
Capacity Gap
=
Available Capacity - Allocated Crew
```

Positive values represent unused capacity.

Negative values represent a shortage.

#### Utilization

```text
Utilization
=
Allocated Crew / Available Capacity
```

#### Staffing shortage

```text
Staffing Shortage
=
MAX(0, Allocated Crew - Available Capacity)
```

This converts an overload into a concrete staffing quantity.

</details>

### Validation Rules

| Field                   | Rule                                                    | Error Behavior                                                            |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| Crew Size               | Positive integer within the configured validation range | Invalid value should be rejected by data validation.                      |
| Working Days            | Integer from 1–7                                        | Prevents impossible weekly working-day assumptions.                       |
| Planning Start Date     | Must be a Monday                                        | Prevents weekly timeline offset.                                          |
| Planning Horizon        | Integer from 1–24 months                                | Prevents invalid planning ranges.                                         |
| Near Capacity Threshold | 50%–100%                                                | Prevents meaningless warning thresholds.                                  |
| Staffing Lead Time      | Non-negative planning value                             | Used to distinguish normal preparation from urgent staffing action.       |
| Minimum Fill Slot       | Positive planning value                                 | Prevents insignificant gaps from being treated as useful sales capacity.  |
| Job ID                  | Must identify a unique job                              | Protects project-level traceability.                                      |
| Job Start Date          | Valid date and within/around planning horizon           | Prevents invalid scheduling records.                                      |
| Job End Date            | Must be greater than or equal to Start Date             | Prevents negative or reversed job duration.                               |
| Painters Required       | Positive integer                                        | Prevents zero/negative resource demand.                                   |
| Job Status              | Planned / Active / On Hold / Completed                  | Keeps lifecycle values consistent.                                        |
| Job Priority            | High / Medium / Low                                     | Provides consistent conflict-resolution weighting.                        |
| Include in Plan         | Automatically determined                                | Excludes invalid or irrelevant records from downstream calculations.      |
| Automatic columns       | Must not be manually overwritten                        | Protects structured formulas and downstream calculations.                 |
| Resource plan           | Calculation-only area                                   | Manual edits can break dynamic-array continuity and should be prohibited. |

</details>

## The Business Logic & Methodology

The model is built around a simple operating principle: **capacity decisions should be made against the combined workload of overlapping jobs, not against isolated project estimates**.

The methodology deliberately separates three questions that are often mixed together in small contracting businesses:

* **Rolling capacity planning** — the future schedule is viewed week by week across a 12-month horizon, making upcoming workload pressure visible before it becomes a field problem.
* **Threshold alerting** — capacity is divided into OPEN, FULL, and OVERLOAD states. This distinguishes useful spare capacity from a genuinely constrained period, so a warning does not automatically become a hiring decision.
* **Workload aggregation** — simultaneous projects are considered together rather than individually. This exposes the practical effect of overlapping jobs on the same crew.
* **Gap-based staffing analysis** — an overload is translated into a specific number of missing painters. The decision can then be framed as rescheduling, subcontracting, or permanent hiring rather than a vague judgment that “the team is too busy.”
* **Capacity-window analysis** — periods of low utilization are treated as potential sales capacity. This gives scheduling and sales teams a concrete basis for targeting short-duration or suitable fill-in work.

The commercial value is therefore not the chart itself. The value is the connection between **future commitments, available labor, timing, and action**.

A schedule showing 11 painters required is different from a schedule showing 12 painters required. A month showing 40% average utilization is also not enough to explain whether a particular week is overloaded. The model keeps these distinctions visible so that operational decisions are made at the level where the constraint actually occurs.

## Other Tools in This Series

This project belongs to a broader series of lightweight Excel and browser-based decision-support tools focused on turning operational data into reusable management workflows.

* **Construction Cost & BOQ Tools** — estimate quantities, direct costs, and project-level construction requirements.
* **Project Control Tools** — connect budget, actual cost, progress, changes, billing, collections, and cash flow.
* **Inventory & Reconciliation Tools** — identify stock differences, operational leakage, and financial exposure.
* **Financial Planning Tools** — connect operating assumptions with forecasts, scenarios, and financial outcomes.

The common principle is the same: **put the information required for the next operational decision in one place, without introducing an unnecessary enterprise system.**

## License

This project is released under the **Apache License 2.0**.

See the `LICENSE` file for the complete license text.
