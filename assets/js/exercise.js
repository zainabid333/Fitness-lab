// exercise.js

const searchFormEl = $("#search-form");
const resultContentEl = $("#result-content");
const logoutBtn = $("#logout-btn");
const appId = "e6KIhBj0XyxJ+z6IyJL41g==X2pCWIBbVTDEJEEX";

function searchApi(muscle, difficulty, type) {
    let excQueryUrl = `https://api.api-ninjas.com/v1/exercises?`;

    if (muscle) {
        excQueryUrl += `muscle=${muscle}&`;
    }
    if (difficulty) {
        excQueryUrl += `difficulty=${difficulty}&`;
    }
    if (type) {
        excQueryUrl += `type=${type}&`;
    }

    // Remove trailing '&' if present
    excQueryUrl = excQueryUrl.replace(/&$/, '');

    fetch(excQueryUrl, {
        headers: {
            'X-Api-Key': appId
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Exercise data: ", data);
            displayResults(data);
        })
        .catch((error) => {
            console.error("Error:", error);
            resultContentEl.html("<p class='text-red-600'>An error occurred while fetching data.</p>");
        });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    console.log("Entering handleSearchSubmit function");

    const muscleVal = $("#muscle-name").val();
    const difficultyVal = $("#difficulty").val();
    const typeVal = $("#type").val();

    console.log("Search: ", muscleVal, difficultyVal, typeVal);
    searchApi(muscleVal, difficultyVal, typeVal);
}

function displayResults(resultObj) {
    resultContentEl.empty();
    if (resultObj.length === 0) {
        resultContentEl.html("<p class='text-gray-600'>No results found.</p>");
        return;
    }

    const showMoreBtn = $("<button>").addClass("mt-4 px-4 py-2 bg-orange-500 text-white rounded").text("Show More");
    let displayedCount = 0;

    function displayMore() {
        const toDisplay = resultObj.slice(displayedCount, displayedCount + 5);
        toDisplay.forEach(exercise => {
            const exerciseDiv = $("<div>").addClass("mb-8 pb-8 border-b border-gray-200 last:border-b-0");
            exerciseDiv.append($("<h3>").addClass("text-xl font-semibold mb-2 text-orange-600").text(exercise.name));
            exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Type:</span> ${exercise.type}`));
            exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Muscle:</span> ${exercise.muscle}`));
            exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Equipment:</span> ${exercise.equipment}`));
            exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Difficulty:</span> ${exercise.difficulty}`));
            exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Instructions:</span> ${exercise.instructions}`));

            resultContentEl.append(exerciseDiv);
        });

        displayedCount += toDisplay.length;
        if (displayedCount >= resultObj.length) {
            showMoreBtn.remove();
        }
    }

    displayMore();
    showMoreBtn.on("click", displayMore);
    resultContentEl.append(showMoreBtn);
}
function removeModalBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
    const modalElement = document.getElementById('bmi-modal');
    if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
    }
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = '';
}
function handleLogout() {
    // Perform any necessary logout actions (e.g., clearing local storage)
    // localStorage.clear();

    // Redirect to index.html
    window.location.href = "index.html";
}

function initializeTabs() {
    $('ul.flex > li > a').click(function (e) {
        e.preventDefault();
        $('ul.flex > li > a').removeClass('text-orange-600 bg-gray-100 active');
        $(this).addClass('text-orange-600 bg-gray-100 active');
        $('.tab-content').addClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
    });
}
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}
function closeModal() {
    const modal = document.getElementById('bmi-modal');
    if (typeof flowbite !== 'undefined' && flowbite.Modal) {
        const modalInstance = new flowbite.Modal(modal);
        modalInstance.hide();
    } else {
        // Fallback to jQuery if flowbite is not available
        $(modal).hide();
    }
    removeModalBackdrop();
}
function handleBMISubmit(event) {
    event.preventDefault();

    const loggedUser = checkLoggedUser();
    if (!loggedUser) return;

    const age = parseFloat($("#bmi-age").val());
    const weight = parseFloat($("#bmi-weight").val());
    const height = parseFloat($("#bmi-height").val());
    const gender = $("#bmi-gender").val();

    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender) {
        alert("Please fill all fields with valid values.");
        return;
    }

    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    const bmiData = {
        value: bmi,
        category: category,
        age: age,
        weight: weight,
        height: height,
        gender: gender
    };

    // Store BMI data for the current user
    loggedUser.bmi = bmiData;
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    displayBMIData(bmiData);
    closeModal();
}

function displayBMIData(bmiData) {
    $("#bmi-value").text(bmiData.value);
    $("#bmi-category").text(bmiData.category);
    $("#bmi-result").removeClass("hidden");

    $("#bmi-value-display").text(bmiData.value);
    $("#bmi-category-display").text(bmiData.category);
    $("#bmi-result-display").removeClass("hidden");

    // Populate the form fields with the stored data
    $("#bmi-age").val(bmiData.age);
    $("#bmi-weight").val(bmiData.weight);
    $("#bmi-height").val(bmiData.height);
    $("#bmi-gender").val(bmiData.gender);
}

function loadBMIData() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.bmi) {
        displayBMIData(loggedUser.bmi);
    }
}
function checkLoggedUser() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
        console.log("No logged user found. Redirecting to login page.");
        window.location.href = "index.html"; // Redirect to login page
        return null;
    }
    console.log("Logged user found:", loggedUser);
    return loggedUser;
}


$(document).ready(function () {
    initializeTabs();
    searchFormEl.on("submit", handleSearchSubmit);
    logoutBtn.on("click", handleLogout);
    $("#bmi-form").on("submit", handleBMISubmit);
    const loggedUser = checkLoggedUser();
    if (!loggedUser) {
        return;
    }
    $("#welcome-message").text(`Welcome, ${loggedUser.name}!`);
    $("#open-bmi-modal").on("click", function () {
        const modal = document.getElementById('bmi-modal');
        if (typeof flowbite !== 'undefined' && flowbite.Modal) {
            const modalInstance = new flowbite.Modal(modal);
            modalInstance.show();
        } else {
            $(modal).show();
        }
    });
    loadBMIData();
});