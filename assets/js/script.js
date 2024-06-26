const searchFormEl = $("#search-form");
const resultTextEl = $("#result-text");
const resultContentEl = $("#result-content");
//API Key e6KIhBj0XyxJ+z6IyJL41g==X2pCWIBbVTDEJEEX
const appId = "e6KIhBj0XyxJ+z6IyJL41g==X2pCWIBbVTDEJEEX";
 
// GET request to the exercise API
function searchApi(muscle) {
  // The URL for the API request to get the exercise
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
    resultContentEl.text("An error occurred while fetching data.");
  });
}

function displayResults(resultObj) {
  resultContentEl.empty();
  if (resultObj.length === 0) {
    resultContentEl.text("No results found.");
    return;
  }
  
  resultObj.forEach(exercise => {
    const exerciseDiv = $("<div>").addClass("exercise-item");
    exerciseDiv.append($("<h3>").text(exercise.name));
    exerciseDiv.append($("<p>").text(`Type: ${exercise.type}`));
    exerciseDiv.append($("<p>").text(`Muscle: ${exercise.muscle}`));
    exerciseDiv.append($("<p>").text(`Equipment: ${exercise.equipment}`));
    exerciseDiv.append($("<p>").text(`Difficulty: ${exercise.difficulty}`));
    exerciseDiv.append($("<p>").text(`Instructions: ${exercise.instructions}`));

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

$(document).ready(function() {
  searchFormEl.on("submit", handleSearchSubmit);
});