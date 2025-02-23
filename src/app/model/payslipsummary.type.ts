export type PayslipSummary = {
    id: string;
    name : string; 
    surname : string;
    hourlyRate : number;
    normalHoursWorked : number;
    normalAmountPaid : number;
    overtimeHoursWorked : number;
    overtimeAmountPaid : number;
    publicHolidayHoursWorked : number;
    publicHolidayAmountPaid : number;
    grossAmount : number;
    uifContribution : number;
    barganingCouncil : number;
    uniforms  : number;
    tillShortage : number;
    wastages : number;
    otherDeductions : number;
    netAmount : number;
    leaveBF : number;
    leaveAcc : number;
    leaveTaken : number;
    paySlipCycle : string;
    paySlipDate : string; 
    workdays : Array<string>; 
}