document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const dayError = document.getElementById("dayError");
  const monthError = document.getElementById("monthError");
  const yearError = document.getElementById("yearError");
  const ageDiv = document.getElementById("age-div");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (isNaN(day) || day < 1 || day > 31) {
      displayError(dayError, "Must be a valid day.");
      return;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      displayError(monthError, "Must be a valid month.");
      return;
    }

    if (isNaN(year) || year.toString().length !== 4) {
      displayError(yearError, "Must be a valid Year.");
      return;
    }

    const userDOB = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    if (userDOB >= today) {
      displayError(yearError, "Date of birth cannot be in the future.");
      return;
    }

    calculateAge(userDOB, today);
  });

  function calculateAge(dob, currentDate) {
    const ageInMilliseconds = currentDate - dob;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = Math.floor((ageInDays % 365) % 30);

    displayAgeResult(years, months, days);
  }

  function displayAgeResult(years, months, days) {
    // Select the age-div element
    const ageDiv = document.getElementById('age-div');
  
    // Update the content of the age-p elements
    ageDiv.innerHTML = `
      <p class="age-p" id="years"><span>${years}</span> Years</p>
      <p class="age-p" id="months"><span>${months}</span> Months</p>
      <p class="age-p" id="days"><span>${days}</span> Days</p>
    `;
  
    // Create a timeline for the animation
    const timeline = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } });
  
    // Animate each span element inside age-p
    ['years', 'months', 'days'].forEach((elementId, index) => {
      const spanElement = document.getElementById(elementId).querySelector('span');
      timeline.from(spanElement, { opacity: 0, y: 20, delay: index * 0.3 });
    });
  }
    

  function displayError(element, message) {
    element.textContent = message;
    element.style.visibility = "visible";
    // Add the 'error' class to the input element
    const inputElement = element.previousElementSibling;
    if (inputElement) {
      inputElement.classList.add("error");
    }
  }

  function clearErrors() {
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
    dayError.style.visibility = "hidden";
    monthError.style.visibility = "hidden";
    yearError.style.visibility = "hidden";
    // Remove the 'error' class from input elements
    const inputElements = document.querySelectorAll(".input-wrapper input");
    inputElements.forEach((inputElement) => {
      inputElement.classList.remove("error");
    });
  }
  function displayError(element, message) {
    element.textContent = message;
    element.style.visibility = "visible";

    // Add the 'error' class to the label and input elements
    const inputWrapper = element.closest(".input-wrapper");
    if (inputWrapper) {
      inputWrapper.classList.add("error");
      const labelElement = inputWrapper.querySelector("label");

      if (labelElement) {
        labelElement.classList.add("error");
      }
    }
  }

  function clearErrors() {
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
    dayError.style.visibility = "hidden";
    monthError.style.visibility = "hidden";
    yearError.style.visibility = "hidden";

    // Remove the 'error' class from label and input elements
    const errorElements = document.querySelectorAll(".input-wrapper.error");
    errorElements.forEach((errorElement) => {
      errorElement.classList.remove("error");
      const labelElement = errorElement.querySelector("label");
      if (labelElement) {
        labelElement.classList.remove("error");
      }
    });

    

    // Add the 'valid' class to input elements when the input is valid
    // const validElements = document.querySelectorAll(
    //   ".input-wrapper input.valid"
    // );
    // validElements.forEach((validElement) => {
    //   validElement.classList.remove("valid");
    // });
  }
});
