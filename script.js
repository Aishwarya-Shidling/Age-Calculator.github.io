document.addEventListener('DOMContentLoaded', function () {
    // Populate the months dropdown
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const dobMonthSelect = document.getElementById('dob-month');
    const toMonthSelect = document.getElementById('to-month');
  
    months.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      dobMonthSelect.appendChild(option);
      toMonthSelect.appendChild(option.cloneNode(true));
    });
  
    // Populate the days dropdown
    const populateDays = (selectElement) => {
      selectElement.innerHTML = '';
      for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
      }
    };
  
    const dobDaySelect = document.getElementById('dob-day');
    const toDaySelect = document.getElementById('to-day');
    populateDays(dobDaySelect);
    populateDays(toDaySelect);
  
    // Set default "Till Date" to today's date
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = months[today.getMonth()];
    const currentYear = today.getFullYear();
  
    // Set today's date and month for the "Till Date" fields
    document.getElementById('to-day').value = currentDay;
    document.getElementById('to-month').value = currentMonth;
    document.getElementById('to-year').value = currentYear;
  
    // Listen for Enter keypress to trigger age calculation
    document.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        calculateAge();
      }
    });
  });
  
  function calculateAge() {
    const dobDay = parseInt(document.getElementById("dob-day").value);
    const dobMonth = document.getElementById("dob-month").value;
    const dobYear = parseInt(document.getElementById("dob-year").value);
    const toDay = parseInt(document.getElementById("to-day").value);
    const toMonth = document.getElementById("to-month").value;
    const toYear = parseInt(document.getElementById("to-year").value);
  
    if (dobDay && dobMonth && dobYear && toDay && toMonth && toYear) {
      const months = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
      const birthDate = new Date(dobYear, months.indexOf(dobMonth), dobDay);
      const toDate = new Date(toYear, months.indexOf(toMonth), toDay);
  
      let years = toDate.getFullYear() - birthDate.getFullYear();
      let monthsDiff = toDate.getMonth() - birthDate.getMonth();
      let daysDiff = toDate.getDate() - birthDate.getDate();
  
      // Adjust for negative months or days
      if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += new Date(toDate.getFullYear(), toDate.getMonth(), 0).getDate(); // Days in previous month
      }
  
      if (monthsDiff < 0) {
        years--;
        monthsDiff += 12; // Add 12 months if negative months
      }
  
      // Display the result
      document.getElementById("years").textContent = `${years} Years, `;
      document.getElementById("months").textContent = `${monthsDiff} Months, `;
      document.getElementById("days").textContent = `${daysDiff} Days`;
    } else {
      document.getElementById("years").textContent = "Please enter all fields.";
      document.getElementById("months").textContent = "";
      document.getElementById("days").textContent = "";
    }
  }
  