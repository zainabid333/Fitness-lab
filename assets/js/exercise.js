const searchFormEl = $("#search-form");
const resultTextEl = $("#result-text");
const resultContentEl = $("#result-content");
const logoutBtn = $("#logout-btn");
const appId = "e6KIhBj0XyxJ+z6IyJL41g==X2pCWIBbVTDEJEEX";

function searchApi(muscle) {
    let excQueryUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

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

function displayResults(resultObj) {
    resultContentEl.empty();
    if (resultObj.length === 0) {
        resultContentEl.html("<p class='text-gray-600'>No results found.</p>");
        return;
    }

    resultObj.forEach(exercise => {
        const exerciseDiv = $("<div>").addClass("mb-8 pb-8 border-b border-gray-200 last:border-b-0");
        exerciseDiv.append($("<h3>").addClass("text-xl font-semibold mb-2 text-blue-600").text(exercise.name));
        exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Type:</span> ${exercise.type}`));
        exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Muscle:</span> ${exercise.muscle}`));
        exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Equipment:</span> ${exercise.equipment}`));
        exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Difficulty:</span> ${exercise.difficulty}`));
        exerciseDiv.append($("<p>").addClass("mb-1").html(`<span class="font-semibold">Instructions:</span> ${exercise.instructions}`));

        resultContentEl.append(exerciseDiv);
    });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    console.log("Entering handleSearchSubmit function");

    const searchInputVal = $("#muscle-name").val();

    if (!searchInputVal) {
        alert("Please select a muscle name.");
        return;
    }
    console.log("Search: ", searchInputVal);
    searchApi(searchInputVal);
}

function handleLogout() {
    // Perform any necessary logout actions (e.g., clearing local storage)
    // localStorage.clear();

    // Redirect to index.html
    window.location.href = "index.html";
}

$(document).ready(function () {
    searchFormEl.on("submit", handleSearchSubmit);
    logoutBtn.on("click", handleLogout);
});