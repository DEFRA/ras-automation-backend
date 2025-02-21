export const IMISHeaderConfig = [
  {
    header: 'LIMT - Core',
    key: 'limtCore',
    width: 20,
    color: '0000FF',
    note: `m168257:
Mandatory - SEO 1, SEO 2, SEO 3, SEO 4, SEO 5 or SEO 6. 

Some CPH are split between SEO group therefore refer to CPH list on Guidance Hub at Operations > Compliance >IMIS >Related Docs.

Externals = inspections for external bodies e.g. APHA/HallMark.
Flex Area = virtual group for out of area inspections

If no CPH is available calculate on basis of address.`,
    required: true
  },
  {
    header: 'CPH - Core',
    key: 'CPHCore',
    width: 20,
    color: '0000FF',
    note: `m168257:
Mandatory to have CPH or SBI or FRN.

If none are available enter No CPH/FRN/SBI into CPH column

Could be:
- project ID/Ref for SEI
- file ref/ID for weeds.`,
    required: true
  },
  {
    header: 'SBI - Core',
    key: 'SBICore',
    width: 20,
    required: true,
    color: '0000FF',
    note: `m168257:
Mandatory to have CPH or SBI or FRN.

If there is a SBI but no CPH copy SBI into CPH (col B)

If none are available enter No CPH/FRN/SBI into CPH column.
`
  },
  {
    header: 'FRN - Core',
    key: 'FRNCore',
    width: 20,
    required: true,
    color: '0000FF',
    note: `m168257:
Mandatory to have CPH or SBI or FRN.

If there is a FRN but no CPH copy FRN into CPH (col B)

If none are available enter No CPH/FRN/SBI into CPH column`
  },
  {
    header: 'Scheme - Core',
    key: 'schemeCore',
    width: 20,
    required: true,
    color: '0000FF',
    note: `m168257:
Mandatory and must reflect abbreiviated scheme as per Annex 1: Scheme Name and Codes. See Notes tab for link to document on Hub.

Dont enter year on end.

For ES use higher scheme e.g. ELS with HLS = HLS and all OELS are classed as ELS or HLS.`
  },
  {
    header: 'Scheme Year - Core',
    key: 'schemeYearCore',
    width: 20,
    color: '0000FF',
    required: true,
    note: `m168257:
Mandatory and in format of yyyy. 

CIIXC are a year ahead`
  },
  {
    header: 'Selection method - Core',
    key: 'selectionMethodCore',
    width: 20,
    required: true,
    color: '0000FF',
    note: `m168257:
Must be either ad-hoc, audit, CIIXC Additional, random, risk, random/risk, risk/random, targeted, RSP or RSA. 

RSP/RSA are for RS only. From 2016, only RSP is used.

Some RD could be Random/Risk or Risk/Random - depending on selection/cluster/measure.

All wages & weeds = targeted`
  },
  {
    header: 'Date notified of inspection - Core',
    key: 'inspectionDate',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
All inspections

Date the ICDT Master List team received selection - format of dd/mm/yyyy`
  },
  {
    header: 'Date received in LIMT pre inspection - Core',
    key: 'preInspectionDate',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
Date received in ICDT - format = dd/mm/yyyy. 

Blank for all schemes except SAG = date request received.`
  },
  {
    header: 'Customer Name - Core',
    key: 'customerNameCore',
    width: 20,
    color: '0000FF',
    note: `m168257: max 50 characters`,
    required: true
  },
  {
    header: 'Address - Core',
    key: 'addressCore1',
    width: 20,
    color: '0000FF',
    maxLength: 30,
    note: `m168257:
Address must be split into the 4 cells (Col K-N)

1 for each line of address 

Max 30 characters.`
  },
  {
    header: 'Address - Core',
    key: 'addressCore2',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `Houlston, Bridget J (RPA):
Address must be split into the 4 cells (Col K-N)

1 for each line of address 

Max 30 characters.`
  },
  {
    header: 'Address - Core',
    key: 'addressCore3',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `Houlston, Bridget J (RPA):
Address must be split into the 4 cells (Col K-N)

1 for each line of address 

Max 30 characters.`
  },
  {
    header: 'Address - Core',
    key: 'addressCore4',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `Houlston, Bridget J (RPA):
Address must be split into the 4 cells (Col K-N)

1 for each line of address 

Max 30 characters.`
  },
  {
    header: 'Postcode - Core',
    key: 'postCodeCore',
    width: 20,
    color: '0000FF',
    required: true
  },
  {
    header: 'Phone no - Core',
    key: 'phoneNoCore',
    width: 20,
    color: '0000FF',
    required: true
  },
  {
    header: 'Mobile - Core',
    key: 'mobileCore',
    width: 20,
    color: '0000FF',
    required: true
  },
  {
    header: 'Grid ref - Core',
    key: 'gridRefCore',
    width: 20,
    color: '0000FF',
    note: `m168257:
can leave blank if not available. Used for LPIS to record area and RS to record the zone/region.`
  },
  {
    header: 'Customer Name  (If Diff) - Core',
    key: 'customerNameCore1',
    width: 20,
    color: '0000FF',
    note: `m168257:
Details if diff are to be used if contact name/address is different from the main one. 

Max 50 characters`
  },
  {
    header: 'Address (If diff) - Core',
    key: 'addressDiffCore2',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `m168257:
details if diff are to be used if address is different from the main one.

Split address into 4 cols (T-W)

Max 30 characters.`
  },
  {
    header: 'Address (If diff) - Core',
    key: 'addressDiffCore3',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `m168257:
details if diff are to be used if address is different from the main one.

Split address into 4 cols (T-W)

Max 30 characters.`
  },
  {
    header: 'Address (If diff) - Core',
    key: 'addressDiffCore4',
    width: 20,
    maxLength: 30,
    color: '0000FF',
    note: `m168257:
details if diff are to be used if address is different from the main one.

Split address into 4 cols (T-W)

Max 30 characters.`
  },
  {
    header: 'Address (If diff) - Core',
    key: 'addressDiffCore',
    maxLength: 30,
    width: 20,
    color: '0000FF',
    note: `m168257:
details if diff are to be used if address is different from the main one.

Split address into 4 cols (T-W)

Max 30 characters.`
  },
  {
    header: 'Postcode - Core (If diff)',
    key: 'postCodeDiffCore',
    maxLength: 20,
    width: 20,
    color: '0000FF'
  },
  {
    header: 'Phone no - Core (if diff)',
    key: 'phoneCodeDiffCore',
    maxLength: 20,
    width: 20,
    color: '0000FF'
  },
  {
    header: 'Number of animals to be inspected/records checked - Core',
    key: 'animalsInspected',
    width: 30,
    color: '40E0D0',
    note: `m168257:
All livestock inspections e.g. CII and SAG.

For SAG use col CV until AI received then use Col CW`
  },
  {
    header: 'SPS/RDP area to be inspected - Core',
    key: 'SPSRDPInspected',
    width: 30,
    color: '40E0D0',
    note: `m168257:
All land based inspections. Can be left blank for misc schemes e.g. SEI, Wages and Weeds.

2 decimal places

Number of parcels for LCD.`
  },
  {
    header: 'Deadline date - Core',
    key: 'deadlineDateCore',
    width: 20,
    color: 'FFFF00',
    note: `


Data Mapping IMIS Selections



EN

File

Comments

Catch up

Editing

Share
: this file is shared

There is nothing to undo.

There is nothing to redo.


Paste



12































Conditional Formatting

Format As Table

Cell Styles

Insert


Delete


Format




Sort &
Filter

Find &
Select

Sensitivity

Add-ins
B11
TEXT

m168257:
Date to be returned to Ops (stage 2) as agreed by Compliance.

Some dates may need amending if subject to other inspections e.g. Plant Sampling or Optimum Timings. Refer to respective scheme guide for further information.

Ad-hoc/targeted inspections may have tighter turnarounds - refer to guidance for more information.

Format of dd/mm/yyyy.
`,
    required: true
  },
  {
    header: 'Latest start by date (RDP only) - Core',
    key: 'latestStartDateRDP',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
RD Only

Format of dd/mm/yyyy`
  },
  {
    header: 'Earliest start by date (RDP only) - Core',
    key: 'earliestStartDateRDP',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
RD only

Format of dd/mm/yyyy`
  },
  {
    header: 'Finish On Farm date - Core',
    key: 'finishFarmDate',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
Date to be finished on farm (stage 1) - as agreed by Compliance. 

Format of dd/mm/yyyy`
  },
  {
    header: 'Agreement ref - Core',
    key: 'agreementRefCore',
    width: 20,
    color: '0000FF',
    note: `Houlston, Bridget J (RPA):
RD, CGS and SEI only.

Use Data Fix template to update any CS dummy numbers.

Parcel Numbers for LPIS.`,
    required: true
  },
  {
    header: 'RITA task no - Core',
    key: 'RITATaskCore',
    width: 20,
    color: '0000FF',
    note: `m168257:
From 2016, leave blank as Workbench replaced RITA.`
  },
  {
    header: 'High value - Core',
    key: 'highValueCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Mandatory. Claim values over £50k.

Format = Y or N.

If no value enter N`
  },
  {
    header: 'CSP - Core',
    key: 'cspCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Used to identify workarounds e.g. complaints/appeals or death/probate.

Format = Y or N`
  },
  {
    header: 'CSP reason - Core',
    key: 'cspReasonCore',
    width: 20,
    color: '0000FF',
    note: `m168257:
Detail of CSP, however the look up code must be entered rather than the wording. Current options used are:
- Complaints/Appeals = C&A
- CWRS partial = CWRS Partial
- Death/probate = D&P
- Over declared = OD
- On Hold Potential Deselection = PD.`
  },
  {
    header: 'Overpayment - Core',
    key: 'overPaymentCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Populate as Y if overpaid`
  },
  {
    header: 'Penalty - Core',
    key: 'penaltyCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Populate with Y if had a penalty`
  },
  {
    header: 'Repeat inspection - Core',
    key: 'repeatInspectionCore',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'DEFRA threat register - Core',
    key: 'defraThreatRegisterCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Usually populated by ICDT post upload

Enter Y if on DeFRA risk register`
  },
  {
    header: 'SPS claimant - Core',
    key: 'SPSClaimantCore',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Mandatory - Is the customer an BPS claimant? Important for CII/SAG.

Format = Y or N

If not known set to Y.`,
    required: true
  },
  {
    header: 'Claim value - Dossier',
    key: 'claimValueDossier',
    width: 20,
    color: '40E0D0',
    note: `m168257:
2 decimal places`,
    required: true
  },
  {
    header: 'Date EA info requested - Dossier',
    key: 'EADateInfoDossier',
    width: 20,
    color: 'FFFF00',
    note: `Houlston, Bridget J (RPA):
XC Only - Date the ICDT team requested Enironment Agency (EA) Information.

Format of dd/mm/yyyy.`
  },
  {
    header: 'RS QC inspection - Dossier',
    key: 'RSQCInspectionDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'Date EA info received - Dossier',
    key: 'DateEAReceivedDossier',
    width: 20,
    color: 'FFFF00',
    note: `Houlston, Bridget J (RPA):
XC Only - Date the ICDT team requested Enironment Agency (EA) Information.

Format of dd/mm/yyyy.`
  },
  {
    header: 'Selected for standalone XC - Dossier',
    key: 'standaloneXCDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'Soil protection report - Dossier',
    key: 'soilProtectionReportDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'TB inspection due date? - Dossier',
    key: 'TBInspectionDueDateDossier',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
format of dd/mm/yyyy - leave blank if not applicable`
  },
  {
    header: 'Dairy farmer - Dossier',
    key: 'dairyFarmerDossier',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Y or N - leave blank if not known`
  },
  {
    header: 'Also selected for EA or AH - Dossier',
    key: 'selectedEAAHDossier',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Format of Y or N. Can be left blank as information within Inspection Pack`
  },
  {
    header: 'UTP piggyback - Dossier',
    key: 'UTPPiggybackDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'Recommended date - Dossier',
    key: 'recommendedDateDossier',
    width: 20,
    color: '0000FF',
    maxLength: 20,
    note: `m168257:
free text for when inspection should take place - max 20 characters.

From 2019, use Col DO for ES/CS Optimum Timings.`
  },
  {
    header: 'Pig keeper - Dossier',
    key: 'pigKeeperDossier',
    width: 20,
    color: 'FFA500',
    note: `m168257:
format of Y or N - Data often comes later and someone needs to check main and subsidary CPH for those with pigs via AMLS`
  },
  {
    header: 'XC report WFA - Dossier',
    key: 'XCReportWFADossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'TB inspection last completed? - Dossier',
    key: 'TBInspectionCompletedDossier',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
format of dd/mm/yyyy - leave blank if not applicable`
  },
  {
    header: 'Selected For MQ inspection - Dossier',
    key: 'selectedMQInspectionDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'Protein crops - Dossier',
    key: 'proteinCropDossier',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'English cross border - Dossier',
    key: 'englishCrossBorderDossier',
    width: 20,
    maxLength: 20,
    color: '0000FF',
    note: `m168257:
All Cross Borders

Enter region of X-border e.g. N Ireland, Scotland or Wales.

If no region enter Y 

Max 20 characters`
  },
  {
    header: 'Number of Subsidiary Holdings - Dossier',
    key: 'SubsidiaryHoldingsDossier',
    width: 20,
    color: '40E0D0',
    note: `m168257:
Enter whole number no decimal places. Used by LPIS to record ordinal number`
  },
  {
    header: 'Vendor number - RDP',
    key: 'vendorNumberRDP',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Risk - RDP',
    key: 'riskRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
Leave blank -duplicate of selection method - use Col G`
  },
  {
    header: 'NE region - RDP',
    key: 'NERegionRDP',
    width: 20,
    maxLength: 10,
    color: '0000FF',
    note: `m168257:
Must reflect Delivery Body office to return CRF or Catchment area for CGS

Max 10 characters e.g. York & Hum`
  },
  {
    header: 'Number of agreements - RDP',
    key: 'NoOfAgreementsRDP',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Agreement amended - RDP',
    key: 'agreementAmendedRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter Y or N`
  },
  {
    header: 'Total fields - RDP',
    key: 'totalFieldsRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
number - no decimals`
  },
  {
    header: 'Agreement start - RDP',
    key: 'agreementStartRDP',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
date in format of dd/mm/yyyy`
  },
  {
    header: 'Agreement end - RDP',
    key: 'agreementEndRDP',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
number - no decimals`
  },
  {
    header: 'Previous inspection result - RDP',
    key: 'previousInspectionResultRDP',
    width: 20,
    maxLength: 20,
    color: '0000FF',
    note: `m168257:
max 20 characters e.g. Unsat minor.

Previous 4 years.`
  },
  {
    header: 'Agreement years - RDP',
    key: 'agreementYearsRDP',
    width: 20,
    color: '0000FF',
    note: `m168257:
number - no decimal places, round year up/down`
  },
  {
    header: 'Rotational options - RDP',
    key: 'rotationalOptionsRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter Y or N `
  },
  {
    header: 'Common land - RDP',
    key: 'commonLandRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter = Y or N. `
  },
  {
    header: 'Article 13 - RDP',
    key: 'article13RDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter Y or N`
  },
  {
    header: 'GFP - RDP',
    key: 'GFPRDP',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'Capital works - RDP',
    key: 'capitalWorksRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter - Y or N`
  },
  {
    header: 'Population - RDP',
    key: 'populationRDP',
    width: 20,
    maxLength: 2,
    color: '40E0D0',
    note: `m168257:
max 2 characters

A = Agreements under 5yrs
B = agreements over 5yrs`
  },
  {
    header: 'Start on farm date - RDP',
    key: 'startFarmDateRDP',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
date format dd/mm/yyyy - should be same date as in col AC`
  },
  {
    header: 'Total ELS points - RDP',
    key: 'totalELSPointsRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
numeric field - no decimal places`
  },
  {
    header: 'ELS Points threshold - RDP',
    key: 'ELSPointsThresholdRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
numeric field - no decimal places`
  },
  {
    header: 'Total OELS points - RDP',
    key: 'totalOELSPointsRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
numeric field - no decimal places`
  },
  {
    header: 'Points threshold - RDP',
    key: 'pointsThresholdRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
numeric field - no decimal places`
  },
  {
    header: 'Within 3% of ELS points - RDP',
    key: 'ELSPointsRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter Y or N`
  },
  {
    header: 'ESA target region - RDP',
    key: 'ESATargetRegionRDP',
    width: 20,
    color: '0000FF'
  },
  {
    header: 'ESA IV - RDP',
    key: 'ESAIVRDP',
    width: 20,
    color: 'FFA500'
  },
  {
    header: '1:5000 GFP/SPS maps required? - RDP',
    key: 'mapsRDP',
    width: 20,
    color: 'FFA500'
  },
  {
    header: 'SPS Claim form required? - RDP',
    key: 'spsClaimFormRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Enter Y or N`
  },
  {
    header: 'XCOM - RDP',
    key: 'XCOMRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Enter Y or N`
  },
  {
    header: 'Conservation plan - RDP',
    key: 'conservationPlanRDP',
    width: 20,
    color: 'FFA500',
    note: `m168257:
Enter Y or N`
  },
  {
    header: 'End Year - RDP',
    key: 'endYearRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
Format = yyyy`
  },
  {
    header: 'Lifetime Value - RDP',
    key: 'lifetimeValueRDP',
    width: 20,
    color: '40E0D0',
    note: `m168257:
No decimal places. Round up/down.`,
    required: true
  },
  {
    header: 'Selection basis - RDP',
    key: 'selectionBasisRDP',
    width: 25,
    color: '0000FF',
    note: `m168257:
Enter type of CS, ES or Woodland scheme:

- EWG or EWGEP = FWP, WCG, WIG, WRG or WMG
- FWPS = FWPS
- ES scheme types = Area (A), Capital (C) or Area + Capital (A & C).
- CS = type of inspection and measure for CS. IST will enter abbreviations for Area (A), Capital (C) or Area + Capital (A & C) followed by the measure e.g. A 2/10f, A 1/8f & C1/8, Capital M4.
 
- Woodlands - if in CS extract use the following for:
o Countryside Woodland Improvement Grant = CSWIG
o Countryside Woodland Creation Grant = CSWCG
o Countryside Stewardship Woodland Tree Health = CSWTH.
`,
    required: true
  },
  {
    header: 'Inspection ref - SAG',
    key: 'inspectionRefSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
unique ref allocated by P&P

Must not change once inspection selected.

Leave blank for ad-hocs.`
  },
  {
    header: 'Origin of AI data - SAG',
    key: 'originAIDataSAG',
    width: 20,
    color: '0000FF',
    note: `m168257:
max 20 characters.

3 Options:
- No return No data
- Selected
- Other`
  },
  {
    header: 'Number of sheep ONTO holding - SAG',
    key: 'sheepONTOHoldingSAG',
    width: 20,
    color: '40E0D0',
    note: `Houlston, Bridget J (RPA):
Number between 01 Nov - 31 Oct`
  },
  {
    header: 'Number of goats ONTO holding - SAG',
    key: 'sheepONTOHoldingSAG',
    width: 20,
    color: '40E0D0',
    note: `Houlston, Bridget J (RPA):
Number between 01 Nov - 31 Oct`
  },
  {
    header: 'Form sent to selected CPH - SAG',
    key: 'selectedCPHSAG',
    width: 20,
    color: 'FFA500',
    note: `Houlston, Bridget J (RPA):
Number between 01 Nov - 31 Oct`
  },
  {
    header: 'SPS claimant in previous year - SAG',
    key: 'SPSClaimantSAG',
    width: 20,
    color: 'FFA500',
    note: `m168257:
No longer provided by BCMS, use SPS indicator (col AO)`
  },
  {
    header:
      'Number of common land links requested (see Common land links) - SAG',
    key: 'commonLandLinksSAG',
    width: 20,
    color: '40E0D0',
    note: `Houlston, Bridget J (RPA):
Details usually sent post upload - ICDT complete manually`
  },
  {
    header: 'Total sheep on commons - SAG',
    key: 'sheepCommonsSAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Date of inspection in previous 1 year - SAG',
    key: 'inspectionPreviousYearSAG',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
Date of last inspection - back to 2011.
 
Date format dd/mm/yyyy`
  },
  {
    header: 'Sheep & goat inventory on selected CPH (previous AI data) - SAG',
    key: 'sheepGoatInventoryCPHSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
used to populate column Y (number of animals to be inspected) until up to date AI info has been received.`
  },
  {
    header: 'Sheep on inspection location (latest AI data) - SAG',
    key: 'sheepInspectionLocationSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
leave this field blank until the new AI data has been received (est Feb/Mar). The figure in this column should also be added to latest goats (col DI) and used to update col Y (number to be inspected). Note: these updates can be carried out by  ICDT via data fix`
  },
  {
    header: 'Total sheep on associated holdings - SAG',
    key: 'totalSheepHoldingsSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
this field should be left blank until the up to date AI has been received. Estimated Feb/Mar. Note ICDT can carry out a data fix after main selection has been uploaded`
  },
  {
    header: 'Premises type - SAG',
    key: 'premisesTypeSAG',
    width: 20,
    maxLength: 20,
    color: '0000FF',
    note: `m168257:
max 20 characters e.g. Animal residence.

May be blank for ad-hocs.`
  },
  {
    header: 'Date notified of AI information  - SAG',
    key: 'dateNotifiedAIInfoSAG',
    width: 20,
    color: 'FFFF00',
    note: `m168257:
date format dd/mm/yyyy.

Blank for ad-hocs.

Also used to record Date Change Notfied.`
  },
  {
    header: 'Number of sheep OFF holding - SAG',
    key: 'numberSheepOffHoldingSAG',
    width: 20,
    color: '40E0D0',
    note: `Houlston, Bridget J (RPA):
Between 01 Nov - 31 Oct`
  },
  {
    header: 'Number of goats OFF holding - SAG',
    key: 'goatsOffHoldingSAG',
    width: 20,
    color: '40E0D0',
    note: `Houlston, Bridget J (RPA):
Between 01 Nov - 31 Oct`
  },
  {
    header: 'Number of batch movements - SAG',
    key: 'NoofBatchMovementsSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
total of batch movements  between 01 Nov - 31 Oct.

Enter 1 figure in this 1 cell`
  },
  {
    header: 'Form received from selected CPH - SAG',
    key: 'formReceivedSelectedCPHSAG',
    width: 20,
    color: 'FFA500',
    note: `m168257:
enter Y or N`
  },
  {
    header: 'SPS claim value in previous year - SAG',
    key: 'SPSClainPreviousYearSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
number to 2 decimal places.

Only applies to BPS claimants.`
  },
  {
    header: 'Total goats on commons - SAG',
    key: 'totalGoatsCommonSAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Total commons used - SAG',
    key: 'totalCommonsUsedSAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Sheep inventory on selected CPH (previous AI data) - SAG',
    key: 'sheepInventorySelectedCPHSAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Goats on inspection location (latest AI data) - SAG',
    key: 'goatsInspectionLocationSAG',
    width: 20,
    color: '40E0D0',
    note: `m168257:
    leave this field blank until the new AI data has been received (est Feb/Mar). The figure in this column should also be added to latest goats (col DI) and used to update col Y (number to be inspected). Note: these updates can be carried out by ICDT via data fix`
  },
  {
    header: 'Total goats on associated holdings - SAG',
    key: 'totalGoatsAssociatedHoldingsSAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Number of lines/CPHs on selected AI - SAG',
    key: 'noOfLinesSelectedAISAG',
    width: 20,
    color: '40E0D0'
  },
  {
    header: 'Date in Siti Agri - Dossier',
    key: 'dateSitiAgriDossier',
    width: 20,
    color: 'FFFF00',
    note: `Houlston, Bridget J (RPA):
Date in format of dd/mm/yyyy.

Date task is available in SITI Agri.`
  },
  {
    header: 'EA Info Applicable - Dossier',
    key: 'EAInfoAppDossier',
    width: 20,
    color: '0000FF',
    note: `Houlston, Bridget J (RPA):
If EA info applies to inspection enter the Look up code associated with the option as follows:

- EA Permit = EAP
- EA Licence = EAL
- Permit & licence = P&L
- None = NO`
  },
  {
    header: 'Optimum Timing date - RDP',
    key: 'optimumTimingDateRDP',
    width: 20,
    color: '0000FF',
    maxLength: 100,
    note: `Houlston, Bridget J (RPA):
Max characters = 100

RD only for recording optimum inspection times. The months of the year should be displayed by letters (JFMAMJJASOND) and a cross if the month is not applicable.

For example, the optimum times of May, June, October and November they would be displayed as xxxxMJxxxONx. `
  },
  {
    header: 'LIMT notes',
    key: 'LIMTNotes',
    width: 20,
    color: '0000FF'
  }
]

export const headerNotes = {
  'LIMT - Core': 'test'
}

// Define headers for first Tab
export const headersFirstTab = [
  {
    header: 'Input constraints',
    key: 'id',
    width: 200
  }
]

// Define colors for different rows
export const rowColors = [
  { color: 'FFFF00', value: 'Yellow indicates DATE' },
  { color: '0000FF', value: 'Blue indicates TEXT' },
  { color: 'FFA500', value: 'Orange indicates Y or N' },
  { color: '30D5C8', value: 'Turquoise indicates NUMERIC' },
  { color: '9D00FF', value: 'Purple indicates TIME as HH or HH:MM' },
  { color: 'FFFFFF', value: '' },
  { color: 'FFFFFF', value: '' },
  {
    color: 'FFFFFF',
    value:
      '1. Do not insert columns or re-name headings within the Inspections tab.'
  },
  {
    color: 'FFFFFF',
    value:
      '2. Do not re-name or delete the tabs at the bottom of this document as it will make the upload fail.'
  },
  {
    color: 'FFFFFF',
    value:
      '3. Refer to the cell notes behind the top row for guidance relating to formatting and data entry.'
  },
  {
    color: 'FFFFFF',
    value:
      '4. Use columns DO onwards to record other information, however this will not be loaded into IMIS unless workarounds are used to recycle redundant fields. Liaise with Design if this information is required.'
  },
  {
    color: 'FFFFFF',
    value: '5. CPH or SBI or FRN and Names & addresses must be provided.'
  },
  {
    color: 'FFFFFF',
    value:
      '6. Row 2 has been used to indicate the scheme type, however these comments must be removed prior to upload.'
  },
  {
    color: 'FFFFFF',
    value:
      '7. Cells can be hidden if they do not relate to specific schemes, however they must be unhidden before emailing to the ICDT Inspectorate Master List Team.'
  },
  {
    color: 'FFFFFF',
    value:
      '8. Headings may refer to SPS, however these may still required for BPS.'
  },
  {
    color: 'FFFFFF',
    value:
      '9. Refer to Annex One: Scheme Names and Codes to populate Column E. This can be found on the Guidance Hub at Operations > Compliance & Guidance > IMIS > Workbooks.'
  },

  {
    color: 'FFFFFF',
    value:
      '10. Refer to CPH areas covered by SEO Groups which can be found on the Guidance Hub at Operations > Compliance & Guidance > IMIS > Related docs'
  },
  {
    color: 'FFFFFF',
    value:
      '11. Once complete email the template to the ICDT Inspectorate Master List shared mailbox at SM - RPA - ISU Inspectorate Master Lists via'
  },
  {
    color: 'FFFFFF',
    value: 'LIMTInspectorate.MasterLists@rpa.gov.uk',
    hyperlink: 'http://www.google.com'
  }
]
