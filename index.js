function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getInput(promptMessage) {
    let input;
    do {
        input = prompt(promptMessage);
        const number = parseInt(input);
        if (!isNaN(number)) {
            return number; // return the number if it's valid
        } else {
            alert("Invalid input. Please enter an integer.");
        }
    } while (true);
}

async function executeActions() {

    function calculateReportableIncome(grossMiles, grossIncome, daysWorked) {
        const standardCommute = 32; // Miles per day for commuting
        const deductionRate = 0.67; // IRS standard mileage deduction rate

        // Calculate Deductible Miles
        let deductibleMiles = grossMiles - (daysWorked * standardCommute);
        
        // Ensure deductibleMiles is not negative
        if (deductibleMiles < 0) {
            deductibleMiles = 0; // You can't deduct negative miles
        }
        
        const incomeDeduction = deductibleMiles * deductionRate;
        const reportableIncome = grossIncome - incomeDeduction;

        return reportableIncome;
    }

    const grossMiles = await getInput("Please enter Gross Miles (integer):"); // miles driven before commute deduction
    const grossIncome = await getInput("Please enter Gross Income (integer):"); // gross income
    const daysWorked = await getInput("Please enter number of days worked (integer):"); // number of days worked

    const result = calculateReportableIncome(grossMiles, grossIncome, daysWorked);
    alert(`Reportable income = ${result.toFixed(2)}`);
}

executeActions();