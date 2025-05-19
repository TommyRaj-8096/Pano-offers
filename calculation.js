document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("Break Up");
  const checkBtn = document.querySelector("button.font-bold.bg-white.w-30");

  const options = [
    "BDSE", "BDS", "BSE", "BD", "BE", "BDE", "BDHS", "BDHMCS", "BDHMCSV"
  ];

  const breakdownTable = document.getElementById("Table-Breakdown");

  // Initially hide dropdown, all salary tables and breakdown table
  dropdown.parentElement.style.display = "none";
  if (breakdownTable) breakdownTable.style.display = "none";
  options.forEach(val => {
    const table = document.getElementById(`Table-${val}`);
    if (table) table.style.display = "none";
  });

  function hideAllTables() {
    options.forEach(value => {
      const table = document.getElementById(`Table-${value}`);
      if (table) table.style.display = "none";
    });
  }

 let checkClickedOnce = false;

checkBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  if (!checkClickedOnce) {
    alert("Please review your entries carefully. Click the Check button again to confirm.");
    checkClickedOnce = true;
    return;
  }

  const confirmAction = confirm("Do you confirm the entered data?");
  if (confirmAction) {
    dropdown.parentElement.style.display = "flex"; // Show the dropdown section
    if (breakdownTable) breakdownTable.style.display = "flex";
    checkClickedOnce = false; // Reset for future use
  }
});


  dropdown.addEventListener("change", function () {
    const selected = dropdown.value;
    hideAllTables();

    const selectedTable = document.getElementById(`Table-${selected}`);
    if (selectedTable) {
      selectedTable.style.display = "flex";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  function setupField(monthlyId, annualId) {
    const monthlyInput = document.getElementById(monthlyId);
    const annualInput = document.getElementById(annualId);

    if (monthlyInput && annualInput) {
      monthlyInput.addEventListener("input", () => {
        const monthly = Number(monthlyInput.value);
        const annual = monthly * 12;
        annualInput.value = isNaN(annual) ? "" : annual.toFixed(0);
        updateAllCalculations(tableId);
      });
    }
  }
// BDHMCSV calaulation
  function updateAllCalculations(tableId) {
    const get = (id) => Number(document.getElementById(`${tableId}_${id}`).value) || 0;

    // Monthly
    const grossSalaryMonthly = get("Basic_Monthly") + get("DA_Monthly") + get("HRA_Monthly") +
      get("Medical_Monthly") + get("Conveyance_Monthly") + get("SpecialAllowance_Monthly");
    document.getElementById(`${tableId}_GrossSalary_Monthly`).value = grossSalaryMonthly.toFixed(0);

    // Annual from input values directly, no multiplication
    const grossSalaryAnnual = get("Basic_Annual") + get("DA_Annual") + get("HRA_Annual") +
      get("Medical_Annual") + get("Conveyance_Annual") + get("SpecialAllowance_Annual");
    document.getElementById(`${tableId}_GrossSalary_Annual`).value = grossSalaryAnnual.toFixed(0);

    // Net Take Home
    const netMonthly = grossSalaryMonthly - get("EmployeePF_Monthly");
    document.getElementById(`${tableId}_NetTakeHome_Monthly`).value = netMonthly.toFixed(0);

    const netAnnual = grossSalaryAnnual - get("EmployeePF_Annual");
    document.getElementById(`${tableId}_NetTakeHome_Annual`).value = netAnnual.toFixed(0);

    // CTC Calculation
    const ctcMonthly = grossSalaryMonthly + get("EmployerPF_Monthly") + get("Gratuity_Monthly");
    document.getElementById(`${tableId}_CTC_Monthly`).value = ctcMonthly.toFixed(0);

    const ctcAnnual = grossSalaryAnnual + get("EmployerPF_Annual") + get("Gratuity_Annual");
    document.getElementById(`${tableId}_CTC_Annual`).value = ctcAnnual.toFixed(0);
  }

  const tableId = "BDHMCSV";

  const fields = [
    "Basic", "DA", "HRA", "Medical", "Conveyance", "SpecialAllowance", "Variable_Pay",
    "EmployeePF", "EmployeeESI", "EmployerPF", "EmployerESI", "Bonus", "Gratuity"
  ];

  fields.forEach(field => {
    setupField(`${tableId}_${field}_Monthly`, `${tableId}_${field}_Annual`);
  });

  // Trigger on manual change to annual fields (important for Gross Salary calculation)
  const annualInputs = [
    "Basic_Annual", "DA_Annual", "HRA_Annual", "Medical_Annual",
    "Conveyance_Annual", "SpecialAllowance_Annual", "EmployeePF_Annual",
    "EmployerPF_Annual", "Gratuity_Annual"
  ];

  annualInputs.forEach(id => {
    const el = document.getElementById(`${tableId}_${id}`);
    if (el) {
      el.addEventListener("input", () => updateAllCalculations(tableId));
    }
  });

  // Initial calculation
  updateAllCalculations(tableId);
});
// BDHMCS calulation 
document.addEventListener("DOMContentLoaded", function () {
  function setupField(monthlyId, annualId) {
    const monthlyInput = document.getElementById(monthlyId);
    const annualInput = document.getElementById(annualId);

    if (monthlyInput && annualInput) {
      monthlyInput.addEventListener("input", () => {
        const monthly = Number(monthlyInput.value);
        const annual = monthly * 12;
        annualInput.value = isNaN(annual) ? "" : annual.toFixed(0);
        updateAllCalculations(tableId);
      });
    }
  }

  function updateAllCalculations(tableId) {
    const get = (id) => Number(document.getElementById(`${tableId}_${id}`).value) || 0;

    // Gross Salary Monthly = sum of all components (monthly)
    const grossMonthly = get("Basic_Monthly") + get("DA_Monthly") + get("HRA_Monthly") +
                         get("Medical_Monthly") + get("Conveyance_Monthly") + get("SpecialAllowance_Monthly");
    document.getElementById(`${tableId}_GrossSalary_Monthly`).value = grossMonthly.toFixed(0);

    // Gross Salary Annual = sum of all components (no 12x multiplication)
    const grossAnnual = get("Basic_Annual") + get("DA_Annual") + get("HRA_Annual") +
                        get("Medical_Annual") + get("Conveyance_Annual") + get("SpecialAllowance_Annual");
    document.getElementById(`${tableId}_GrossSalary_Annual`).value = grossAnnual.toFixed(0);

    // Net Take Home = Gross - Employee PF
    const netMonthly = grossMonthly - get("EmployeePF_Monthly");
    const netAnnual = grossAnnual - get("EmployeePF_Annual");
    document.getElementById(`${tableId}_NetTakeHome_Monthly`).value = netMonthly.toFixed(0);
    document.getElementById(`${tableId}_NetTakeHome_Annual`).value = netAnnual.toFixed(0);

    // CTC = Gross + Employer PF + Gratuity
    const ctcMonthly = grossMonthly + get("EmployerPF_Monthly") + get("Gratuity_Monthly");
    const ctcAnnual = grossAnnual + get("EmployerPF_Annual") + get("Gratuity_Annual");
    document.getElementById(`${tableId}_CTC_Monthly`).value = ctcMonthly.toFixed(0);
    document.getElementById(`${tableId}_CTC_Annual`).value = ctcAnnual.toFixed(0);
  }

  const tableId = "BDHMCS";

  const fields = [
    "Basic", "DA", "HRA", "Medical", "Conveyance", "SpecialAllowance",
    "EmployeePF", "EmployerPF", "Gratuity"
  ];

  fields.forEach(field => {
    setupField(`${tableId}_${field}_Monthly`, `${tableId}_${field}_Annual`);
  });

  // Listen to manual edits in annual fields too
  const annualFields = [
    "Basic", "DA", "HRA", "Medical", "Conveyance", "SpecialAllowance",
    "EmployeePF", "EmployerPF", "Gratuity"
  ];

  annualFields.forEach(field => {
    const annualInput = document.getElementById(`${tableId}_${field}_Annual`);
    if (annualInput) {
      annualInput.addEventListener("input", () => updateAllCalculations(tableId));
    }
  });

  updateAllCalculations(tableId); // Initial run
});

//BDHS calculation

document.addEventListener("DOMContentLoaded", function () {
  function setupField(monthlyId, annualId) {
    const monthlyInput = document.getElementById(monthlyId);
    const annualInput = document.getElementById(annualId);

    if (monthlyInput && annualInput) {
      monthlyInput.addEventListener("input", () => {
        const monthly = Number(monthlyInput.value);
        const annual = monthly * 12;
        annualInput.value = isNaN(annual) ? "" : annual.toFixed(0);
        updateAllCalculations(tableId);
      });
    }
  }

  function updateAllCalculations(tableId) {
    const get = (id) => Number(document.getElementById(`${tableId}_${id}`)?.value) || 0;

    // Gross Salary Monthly = sum of Basic, DA, HRA, SpecialAllowance
    const grossMonthly = get("Basic_Monthly") + get("DA_Monthly") + get("HRA_Monthly") +
                         get("SpecialAllowance_Monthly");
    document.getElementById(`${tableId}_GrossSalary_Monthly`).value = grossMonthly.toFixed(0);

    // Gross Salary Annual = sum of respective annuals
    const grossAnnual = get("Basic_Annual") + get("DA_Annual") + get("HRA_Annual") +
                        get("SpecialAllowance_Annual");
    document.getElementById(`${tableId}_GrossSalary_Annual`).value = grossAnnual.toFixed(0);

    // Net Take Home = Gross - Employee PF
    const netMonthly = grossMonthly - get("EmployeePF_Monthly");
    const netAnnual = grossAnnual - get("EmployeePF_Annual");
    document.getElementById(`${tableId}_NetTakeHome_Monthly`).value = netMonthly.toFixed(0);
    document.getElementById(`${tableId}_NetTakeHome_Annual`).value = netAnnual.toFixed(0);

    // CTC = Gross + Employer PF + Gratuity
    const ctcMonthly = grossMonthly + get("EmployerPF_Monthly") + get("Gratuity_Monthly");
    const ctcAnnual = grossAnnual + get("EmployerPF_Annual") + get("Gratuity_Annual");
    document.getElementById(`${tableId}_CTC_Monthly`).value = ctcMonthly.toFixed(0);
    document.getElementById(`${tableId}_CTC_Annual`).value = ctcAnnual.toFixed(0);
  }

  const tableId = "BDHS";

  const fields = [
    "Basic", "DA", "HRA", "SpecialAllowance",
    "EmployeePF", "EmployerPF", "Gratuity"
  ];

  fields.forEach(field => {
    setupField(`${tableId}_${field}_Monthly`, `${tableId}_${field}_Annual`);
  });

  // Allow manual annual edits to also trigger recalculations
  fields.forEach(field => {
    const annualInput = document.getElementById(`${tableId}_${field}_Annual`);
    if (annualInput) {
      annualInput.addEventListener("input", () => updateAllCalculations(tableId));
    }
  });

  updateAllCalculations(tableId); // Initial calculation
});

// BDE calulations

document.addEventListener("DOMContentLoaded", function () {
  function setupField(monthlyId, annualId) {
    const monthlyInput = document.getElementById(monthlyId);
    const annualInput = document.getElementById(annualId);

    if (monthlyInput && annualInput) {
      monthlyInput.addEventListener("input", () => {
        const monthly = Number(monthlyInput.value);
        const annual = monthly * 12;
        annualInput.value = isNaN(annual) ? "" : annual.toFixed(0);
        updateAllCalculations(tableId);
      });
    }
  }

  function updateAllCalculations(tableId) {
    const get = (id) => Number(document.getElementById(`${tableId}_${id}`)?.value) || 0;

    // Gross Salary = Basic + DA (no ESI, Bonus, or PF here)
    const grossMonthly = get("Basic_Monthly") + get("DA_Monthly");
    const grossAnnual = get("Basic_Annual") + get("DA_Annual");

    document.getElementById(`${tableId}_GrossSalary_Monthly`).value = grossMonthly.toFixed(0);
    document.getElementById(`${tableId}_GrossSalary_Annual`).value = grossAnnual.toFixed(0);

    // Net Take Home = Gross - Employee PF - Employee ESI
    const netMonthly = grossMonthly - get("EmployeePF_Monthly") - get("EmployeeESI_Monthly");
    const netAnnual = grossAnnual - get("EmployeePF_Annual") - get("EmployeeESI_Annual");

    document.getElementById(`${tableId}_NetTakeHome_Monthly`).value = netMonthly.toFixed(0);
    document.getElementById(`${tableId}_NetTakeHome_Annual`).value = netAnnual.toFixed(0);

    // CTC = Gross + Employer PF + Employer ESI + Bonus + Gratuity
    const ctcMonthly = grossMonthly + get("EmployerPF_Monthly") + get("EmployerESI_Monthly") + get("Bonus_Monthly") + get("Gratuity_Monthly");
    const ctcAnnual = grossAnnual + get("EmployerPF_Annual") + get("EmployerESI_Annual") + get("Bonus_Annual") + get("Gratuity_Annual");

    document.getElementById(`${tableId}_CTC_Monthly`).value = ctcMonthly.toFixed(0);
    document.getElementById(`${tableId}_CTC_Annual`).value = ctcAnnual.toFixed(0);
  }

  const tableId = "BDE";

  const fields = [
    "Basic", "DA",
    "EmployeePF", "EmployeeESI",
    "EmployerPF", "EmployerESI",
    "Bonus", "Gratuity"
  ];

  fields.forEach(field => {
    setupField(`${tableId}_${field}_Monthly`, `${tableId}_${field}_Annual`);
  });

  // Allow manual changes to annual fields to trigger recalculation
  fields.forEach(field => {
    const annualInput = document.getElementById(`${tableId}_${field}_Annual`);
    if (annualInput) {
      annualInput.addEventListener("input", () => updateAllCalculations(tableId));
    }
  });

  updateAllCalculations(tableId); // Initial run
});

//BE calculation

document.addEventListener("DOMContentLoaded", function () {
  function setupField(monthlyId, annualId) {
    const monthlyInput = document.getElementById(monthlyId);
    const annualInput = document.getElementById(annualId);

    if (monthlyInput && annualInput) {
      monthlyInput.addEventListener("input", () => {
        const monthly = Number(monthlyInput.value);
        const annual = monthly * 12;
        annualInput.value = isNaN(annual) ? "" : annual.toFixed(0);
        updateAllCalculations(tableId);
      });
    }
  }

  function updateAllCalculations(tableId) {
    const get = (id) => Number(document.getElementById(`${tableId}_${id}`).value) || 0;

    const grossMonthly = get("Basic_Monthly");
    document.getElementById(`${tableId}_GrossSalary_Monthly`).value = grossMonthly.toFixed(0);

    const grossAnnual = get("Basic_Annual");
    document.getElementById(`${tableId}_GrossSalary_Annual`).value = grossAnnual.toFixed(0);

    const netMonthly = grossMonthly - get("EmployeePF_Monthly") - get("EmployeeESI_Monthly");
    const netAnnual = grossAnnual - get("EmployeePF_Annual") - get("EmployeeESI_Annual");
    document.getElementById(`${tableId}_NetTakeHome_Monthly`).value = netMonthly.toFixed(0);
    document.getElementById(`${tableId}_NetTakeHome_Annual`).value = netAnnual.toFixed(0);

    const ctcMonthly = grossMonthly + get("EmployerPF_Monthly") + get("EmployerESI_Monthly") + get("Bonus_Monthly") + get("Gratuity_Monthly");
    const ctcAnnual = grossAnnual + get("EmployerPF_Annual") + get("EmployerESI_Annual") + get("Bonus_Annual") + get("Gratuity_Annual");
    document.getElementById(`${tableId}_CTC_Monthly`).value = ctcMonthly.toFixed(0);
    document.getElementById(`${tableId}_CTC_Annual`).value = ctcAnnual.toFixed(0);
  }

  const tableId = "BE"; // or "BDE" or whatever your current table is

  const fields = [
    "Basic", "EmployeePF", "EmployeeESI",
    "EmployerPF", "EmployerESI", "Bonus", "Gratuity"
  ];

  fields.forEach(field => {
    setupField(`${tableId}_${field}_Monthly`, `${tableId}_${field}_Annual`);
  });

  // Listen for manual input in annual fields too
  fields.forEach(field => {
    const annualInput = document.getElementById(`${tableId}_${field}_Annual`);
    if (annualInput) {
      annualInput.addEventListener("input", () => updateAllCalculations(tableId));
    }
  });

  updateAllCalculations(tableId); // Initial calculation
});

//BDSE calculation

document.addEventListener("DOMContentLoaded", function () {
  const tableId = "BDSE";

  function setupMonthlyAnnualSync(field) {
    const monthlyInput = document.getElementById(`${tableId}_${field}_Monthly`);
    const annualInput = document.getElementById(`${tableId}_${field}_Annual`);

    if (monthlyInput && annualInput) {
      // Monthly → Annual
      monthlyInput.addEventListener("input", () => {
        const monthly = parseFloat(monthlyInput.value) || 0;
        annualInput.value = (monthly * 12).toFixed(0);
        updateAllCalculations();
      });

      // Annual → Monthly
      annualInput.addEventListener("input", () => {
        const annual = parseFloat(annualInput.value) || 0;
        monthlyInput.value = (annual / 12).toFixed(0);
        updateAllCalculations();
      });
    }
  }

  function getVal(id) {
    return parseFloat(document.getElementById(`${tableId}_${id}`)?.value) || 0;
  }

  function setVal(id, value) {
    const el = document.getElementById(`${tableId}_${id}`);
    if (el) el.value = value.toFixed(0);
  }

  function updateAllCalculations() {
    // Calculate Gross
    const grossMonthly = getVal("Basic_Monthly") + getVal("DA_Monthly") + getVal("SpecialAllowance_Monthly");
    const grossAnnual = getVal("Basic_Annual") + getVal("DA_Annual") + getVal("SpecialAllowance_Annual");

    setVal("GrossSalary_Monthly", grossMonthly);
    setVal("GrossSalary_Annual", grossAnnual);

    // Calculate Net Take Home
    const netMonthly = grossMonthly - getVal("EmployeePF_Monthly") - getVal("EmployeeESI_Monthly");
    const netAnnual = grossAnnual - getVal("EmployeePF_Annual") - getVal("EmployeeESI_Annual");

    setVal("NetTakeHome_Monthly", netMonthly);
    setVal("NetTakeHome_Annual", netAnnual);

    // Calculate CTC
    const ctcMonthly = grossMonthly + getVal("EmployerPF_Monthly") + getVal("EmployerESI_Monthly") + getVal("Bonus_Monthly") + getVal("Gratuity_Monthly");
    const ctcAnnual = grossAnnual + getVal("EmployerPF_Annual") + getVal("EmployerESI_Annual") + getVal("Bonus_Annual") + getVal("Gratuity_Annual");

    setVal("CTC_Monthly", ctcMonthly);
    setVal("CTC_Annual", ctcAnnual);
  }

  const fields = [
    "Basic", "DA", "SpecialAllowance",
    "EmployeePF", "EmployeeESI",
    "EmployerPF", "EmployerESI",
    "Bonus", "Gratuity"
  ];

  fields.forEach(field => setupMonthlyAnnualSync(field));

  // Run initial calculation
  updateAllCalculations();
});

//BDS calculation

document.addEventListener("DOMContentLoaded", function () {
  const prefix = "BDS";

  function syncFields(field) {
    const monthly = document.getElementById(`${prefix}_${field}_Monthly`);
    const annual = document.getElementById(`${prefix}_${field}_Annual`);

    if (monthly && annual) {
      monthly.addEventListener("input", () => {
        annual.value = (parseFloat(monthly.value) * 12 || 0).toFixed(0);
        calculate();
      });

      annual.addEventListener("input", () => {
        monthly.value = (parseFloat(annual.value) / 12 || 0).toFixed(0);
        calculate();
      });
    }
  }

  function getVal(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val.toFixed(0);
  }

  function calculate() {
    const basic = getVal(`${prefix}_Basic_Monthly`);
    const da = getVal(`${prefix}_DA_Monthly`);
    const sa = getVal(`${prefix}_SpecialAllowance_Monthly`);
    const empPF = getVal(`${prefix}_EmployeePF_Monthly`);
    const emprPF = getVal(`${prefix}_EmployerPF_Monthly`);
    const bonus = getVal(`${prefix}_Bonus_Monthly`);
    const gratuity = getVal(`${prefix}_Gratuity_Monthly`);

    const grossMonthly = basic + da + sa;
    const grossAnnual = grossMonthly * 12;

    const netMonthly = grossMonthly - empPF;
    const netAnnual = netMonthly * 12;

    const ctcMonthly = grossMonthly + emprPF + bonus + gratuity;
    const ctcAnnual = ctcMonthly * 12;

    setVal(`${prefix}_GrossSalary_Monthly`, grossMonthly);
    setVal(`${prefix}_GrossSalary_Annual`, grossAnnual);

    setVal(`${prefix}_NetTakeHome_Monthly`, netMonthly);
    setVal(`${prefix}_NetTakeHome_Annual`, netAnnual);

    setVal(`CTC_Monthly`, ctcMonthly);
    setVal(`CTC_Annual`, ctcAnnual);
  }

  const fields = [
    "Basic", "DA", "SpecialAllowance",
    "EmployeePF", "EmployerPF", "Bonus", "Gratuity"
  ];

  fields.forEach(field => syncFields(field));

  calculate();
});

// BSE Calculation

document.addEventListener("DOMContentLoaded", function () {
  const prefix = "BSE";

  function syncFields(field) {
    const monthly = document.getElementById(`${prefix}_${field}_Monthly`);
    const annual = document.getElementById(`${prefix}_${field}_Annual`);

    if (monthly && annual) {
      monthly.addEventListener("input", () => {
        annual.value = (parseFloat(monthly.value) * 12 || 0).toFixed(0);
        calculate();
      });

      annual.addEventListener("input", () => {
        monthly.value = (parseFloat(annual.value) / 12 || 0).toFixed(0);
        calculate();
      });
    }
  }

  function getVal(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val.toFixed(0);
  }

  function calculate() {
    const basic = getVal(`${prefix}_Basic_Monthly`);
    const sa = getVal(`${prefix}_SpecialAllowance_Monthly`);
    const empPF = getVal(`${prefix}_EmployeePF_Monthly`);
    const empESI = getVal(`${prefix}_EmployeeESI_Monthly`);
    const emprPF = getVal(`${prefix}_EmployerPF_Monthly`);
    const emprESI = getVal(`${prefix}_EmployerESI_Monthly`);
    const bonus = getVal(`${prefix}_Bonus_Monthly`);
    const gratuity = getVal(`${prefix}_Gratuity_Monthly`);

    const grossMonthly = basic + sa;
    const grossAnnual = grossMonthly * 12;

    const netMonthly = grossMonthly - empPF - empESI;
    const netAnnual = netMonthly * 12;

    const ctcMonthly = grossMonthly + emprPF + emprESI + bonus + gratuity;
    const ctcAnnual = ctcMonthly * 12;

    setVal(`${prefix}_GrossSalary_Monthly`, grossMonthly);
    setVal(`${prefix}_GrossSalary_Annual`, grossAnnual);

    setVal(`${prefix}_NetTakeHome_Monthly`, netMonthly);
    setVal(`${prefix}_NetTakeHome_Annual`, netAnnual);

    setVal(`${prefix}_CTC_Monthly`, ctcMonthly);
    setVal(`${prefix}_CTC_Annual`, ctcAnnual);

    setVal(`${prefix}_Bonus_Annual`, bonus * 12);
    setVal(`${prefix}_Gratuity_Annual`, gratuity * 12);
  }

  const fields = [
    "Basic", "SpecialAllowance",
    "EmployeePF", "EmployeeESI",
    "EmployerPF", "EmployerESI",
    "Bonus", "Gratuity"
  ];

  fields.forEach(field => syncFields(field));
  calculate();
});


// BD calculation

document.addEventListener("DOMContentLoaded", function () {
  const prefix = "BD";

  function syncFields(field) {
    const monthly = document.getElementById(`${prefix}_${field}_Monthly`);
    const annual = document.getElementById(`${prefix}_${field}_Annual`);

    if (monthly && annual) {
      monthly.addEventListener("input", () => {
        annual.value = (parseFloat(monthly.value) * 12 || 0).toFixed(0);
        calculate();
      });

      annual.addEventListener("input", () => {
        monthly.value = (parseFloat(annual.value) / 12 || 0).toFixed(0);
        calculate();
      });
    }
  }

  function getVal(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val.toFixed(0);
  }

  function calculate() {
    const basic = getVal(`${prefix}_Basic_Monthly`);
    const da = getVal(`${prefix}_DA_Monthly`);
    const empPF = getVal(`${prefix}_EmployeePF_Monthly`);
    const emprPF = getVal(`${prefix}_EmployerPF_Monthly`);
    const gratuity = getVal(`${prefix}_Gratuity_Monthly`);

    const grossMonthly = basic + da;
    const grossAnnual = grossMonthly * 12;

    const netMonthly = grossMonthly - empPF;
    const netAnnual = netMonthly * 12;

    const ctcMonthly = grossMonthly + emprPF + gratuity;
    const ctcAnnual = ctcMonthly * 12;

    setVal(`${prefix}_GrossSalary_Monthly`, grossMonthly);
    setVal(`${prefix}_GrossSalary_Annual`, grossAnnual);

    setVal(`${prefix}_NetTakeHome_Monthly`, netMonthly);
    setVal(`${prefix}_NetTakeHome_Annual`, netAnnual);

    setVal(`${prefix}_CTC_Monthly`, ctcMonthly);
    setVal(`${prefix}_CTC_Annual`, ctcAnnual);
  }

  const fields = [
    "Basic", "DA",
    "EmployeePF",
    "EmployerPF", "Gratuity"
  ];

  fields.forEach(field => syncFields(field));
  calculate();
});

// Alert and refresh
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form behavior

  const confirmSubmission = confirm("Are you sure you want to submit this data and create the letter?");
  if (confirmSubmission) {
    const form = e.target;

    // Send the form in the background, without waiting for response
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    }).catch((error) => {
      console.error("Submission error:", error);
      // You can optionally handle/report errors here
    });

    // Immediately show confirmation and reload
    alert("Letter has been created");
    location.reload();
  }
});

  
  if (localStorage.getItem("isLoggedIn") !== "true") {
      console.log("User not logged in. Redirecting to login...");
      window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
      console.log("User is logged in.");
    }

    // Logout function
    function logout() {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    }

