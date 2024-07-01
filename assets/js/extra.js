
// modals.js

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', changeTabs);
    });

    function changeTabs(e) {
        e.preventDefault();
        const target = e.target;
        const parent = target.parentNode;
        const grandparent = parent.parentNode;

        // Remove all current selected tabs
        grandparent.querySelectorAll('[aria-selected="true"]').forEach(t => {
            t.setAttribute('aria-selected', false);
            t.classList.remove('text-orange-600', 'border-orange-600');
        });

        // Set this tab as selected
        target.setAttribute('aria-selected', true);
        target.classList.add('text-orange-600', 'border-orange-600');

        // Hide all tab panels
        tabPanels.forEach(p => p.classList.add('hidden'));

        // Show the selected panel
        const tabPanel = document.querySelector(target.getAttribute('data-tabs-target'));
        tabPanel.classList.remove('hidden');
    }

    // Set initial active tab
    document.getElementById('login-tab').click();

    const calculateBMIBtn = document.getElementById('calculate-bmi-btn');
    const bmiResult = document.getElementById('bmi-result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiResultDisplay = document.getElementById('bmi-result-display');
    const bmiValueDisplay = document.getElementById('bmi-value-display');
    const bmiCategoryDisplay = document.getElementById('bmi-category-display');
    const bmiModal = document.getElementById('bmi-modal');

    calculateBMIBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const age = document.getElementById('bmi-age').value;
        const weight = document.getElementById('bmi-weight').value;
        const height = document.getElementById('bmi-height').value;
        const gender = document.getElementById('bmi-gender').value;

        if (age && weight && height && gender) {
            const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
            let category;
            if (bmi < 18.5) {
                category = "Underweight";
            } else if (bmi >= 18.5 && bmi < 25) {
                category = "Normal weight";
            } else if (bmi >= 25 && bmi < 30) {
                category = "Overweight";
            } else {
                category = "Obese";
            }

            // Update modal result
            bmiValue.textContent = bmi;
            bmiCategory.textContent = `Category: ${category}`;
            bmiResult.classList.remove('hidden');

            // Update display next to button
            bmiValueDisplay.textContent = bmi;
            bmiCategoryDisplay.textContent = category;
            bmiResultDisplay.classList.remove('hidden');

            // Close the modal
            closeModal();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Function to close the modal
    function closeModal() {
        bmiModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden'); // Remove any overflow:hidden from body
        // Remove the modal backdrop if it exists
        const backdrop = document.querySelector('[modal-backdrop]');
        if (backdrop) {
            backdrop.remove();
        }
    }

    // Close modal when clicking outside
    bmiModal.addEventListener('click', function (event) {
        if (event.target === bmiModal) {
            closeModal();
        }
    });

    // Close modal when clicking the close button
    const closeButton = bmiModal.querySelector('[data-modal-hide="bmi-modal"]');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});



// document.addEventListener('DOMContentLoaded', function () {
//     const loginSignupModal = document.getElementById('loginSignupModal');
//     const bmiModal = document.getElementById('bmiModal');
//     const closeModalButtons = document.querySelectorAll('.close');

//     // Open modals
//     document.getElementById('login-btn').addEventListener('click', () => {
//         loginSignupModal.style.display = 'block';
//     });

//     document.getElementById('bmi-btn').addEventListener('click', () => {
//         bmiModal.style.display = 'block';
//     });

//     // Close modals
//     closeModalButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             loginSignupModal.style.display = 'none';
//             bmiModal.style.display = 'none';
//         });
//     });

//     window.addEventListener('click', (event) => {
//         if (event.target == loginSignupModal) {
//             loginSignupModal.style.display = 'none';
//         } else if (event.target == bmiModal) {
//             bmiModal.style.display = 'none';
//         }
//     });

// Signup functionality
document.getElementById('signup-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const gender = document.getElementById('signup-gender').value;

    if (name && username && password && gender) {
        const user = { name, username, password, gender };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Signup successful!');
        loginSignupModal.style.display = 'none';
    } else {
        alert('Please fill in all fields.');
    }
});

// Login functionality
document.getElementById('login-submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
        alert(`Welcome, ${user.name}!`);
        window.location.href = 'exercise.html';
    } else {
        alert('Invalid username or password.');
    }
});

// BMI Calculation functionality
document.getElementById('calculate-bmi-btn').addEventListener('click', () => {
    const age = document.getElementById('bmi-age').value;
    const weight = document.getElementById('bmi-weight').value;
    const height = document.getElementById('bmi-height').value;
    const gender = document.getElementById('bmi-gender').value;

    if (age && weight && height && gender) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        alert(`Your BMI is ${bmi}`);
        bmiModal.style.display = 'none';
    } else {
        alert('Please fill in all fields.');
    }
});
});




document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully Loaded")
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    tabs.forEach(tab => {
        tab.addEventListener('click', changeTabs);
    });
    function changeTabs(e) {
        e.preventDefault();
        const target = e.target;
        const parent = target.parentNode;
        const grandparent = parent.parentNode;
        // Remove all current selected tabs
        grandparent.querySelectorAll('[aria-selected="true"]').forEach(t => {
            t.setAttribute('aria-selected', false);
            t.classList.remove('text-orange-600', 'border-orange-600');
        });
        // Set this tab as selected
        target.setAttribute('aria-selected', true);
        target.classList.add('text-orange-600', 'border-orange-600');
        // Hide all tab panels
        tabPanels.forEach(p => p.classList.add('hidden'));
        // Show the selected panel
        const tabPanel = document.querySelector(target.getAttribute('data-tabs-target'));
        tabPanel.classList.remove('hidden');
    }
    // Set initial active tab
    document.getElementById('login-tab').click();
    const calculateBMIBtn = document.getElementById('calculate-bmi-btn');
    const bmiResult = document.getElementById('bmi-result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiResultDisplay = document.getElementById('bmi-result-display');
    const bmiValueDisplay = document.getElementById('bmi-value-display');
    const bmiCategoryDisplay = document.getElementById('bmi-category-display');
    const bmiModal = document.getElementById('bmi-modal');

    calculateBMIBtn.addEventListener('click', function (e) {
        e.preventDefault();
        calculateBmi();
    });
    //Function to calculate the BMI
    function calculateBmi() {
        const age = document.getElementById('bmi-age').value;
        const weight = document.getElementById('bmi-weight').value;
        const height = document.getElementById('bmi-height').value;
        const gender = document.getElementById('bmi-gender').value;

        if (age && weight && height && gender) {
            const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
            let category;
            if (bmi < 18.5) {
                category = "Underweight";
            } else if (bmi >= 18.5 && bmi < 25) {
                category = "Normal weight";
            } else if (bmi >= 25 && bmi < 30) {
                category = "Overweight";
            } else {
                category = "Obese";
            }

            // Update modal result
            bmiValue.textContent = bmi;
            bmiCategory.textContent = `Category: ${category}`;
            bmiResult.classList.remove('hidden');

            // Update display next to button
            bmiValueDisplay.textContent = bmi;
            bmiCategoryDisplay.textContent = category;
            bmiResultDisplay.classList.remove('hidden');

            // Don't close the modal
            // closeModal();
        } else {
            alert('Please fill in all fields.');
        }
    }
    // Function to close the modal
    function closeModal() {
        bmiModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden'); // Remove any overflow:hidden from body
        // Remove the modal backdrop if it exists
        const backdrop = document.querySelector('[modal-backdrop]');
        if (backdrop) {
            backdrop.remove();
        }
    }
    // Close modal when clicking outside
    bmiModal.addEventListener('click', function (event) {
        if (event.target === bmiModal) {
            closeModal();
        }
    });
    // Close modal when clicking the close button
    const closeButton = bmiModal.querySelector('[data-modal-hide="bmi-modal"]');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    const loginSignupModal = document.getElementById('loginSignupModal');
    // Open modals
    document.getElementById('login-btn').addEventListener('click', () => {
        loginSignupModal.style.display = 'block';
    });
    document.getElementById('bmi-btn').addEventListener('click', () => {
        bmiModal.style.display = 'block';
    });
    // Close modals
    const closeModalButtons = document.querySelectorAll('.close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginSignupModal.style.display = 'none';
            bmiModal.style.display = 'none';
        });
    });
    window.addEventListener('click', (event) => {
        if (event.target == loginSignupModal) {
            loginSignupModal.style.display = 'none';
        } else if (event.target == bmiModal) {
            bmiModal.style.display = 'none';
        }
    });
    // Signup functionality
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');

    if (signupBtn) {
        console.log("Signup button found");
        signupBtn.addEventListener('click', function (e) {
            console.log("Signup button clicked");
            e.preventDefault();

            const name = document.getElementById('signup-name').value;
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;
            const gender = document.getElementById('signup-gender').value;

            if (name && username && password && gender) {
                const user = { name, username, password, gender };
                localStorage.setItem(username, JSON.stringify(user));
                console.log("User data stored:", user);
                alert('Signup successful!');
                // Close the modal
                const modal = document.getElementById('authentication-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    } else {
        console.log("Signup button not found");
    }


    // document.querySelector('#signup button[type="submit"]').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const name = document.getElementById('signup-name').value;
    //     const username = document.getElementById('signup-username').value;
    //     const password = document.getElementById('signup-password').value;
    //     const gender = document.getElementById('signup-gender').value;

    //     if (name && username && password && gender) {
    //         const user = { name, username, password, gender };
    //         localStorage.setItem(username, JSON.stringify(user));
    //         alert('Signup successful!');
    //         // Close the modal
    //         const modal = document.getElementById('authentication-modal');
    //         if (modal) {
    //             modal.classList.add('hidden');
    //         }
    //     } else {
    //         alert('Please fill in all fields.');
    //     }
    // });

    // document.querySelector('#signup button[type="submit"]').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log("signup button clicked");
    //     const name = document.getElementById('signup-name').value;
    //     const username = document.getElementById('signup-username').value;
    //     const password = document.getElementById('signup-password').value;
    //     const gender = document.getElementById('signup-gender').value;
    //     if (name && username && password && gender) {
    //         const user = { name, username, password, gender };
    //         localStorage.setItem(username, JSON.stringify(user));
    //         alert('Signup successful!');
    //         loginSignupModal.style.display = 'none';
    //     } else {
    //         alert('Please fill in all fields.');
    //     }
    // });

    // Login functionality

    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-submit-btn');

    if (loginBtn) {
        console.log("Login button found");
        loginBtn.addEventListener('click', function (e) {
            console.log("Login button clicked");
            e.preventDefault();

            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            const storedUser = localStorage.getItem(username);

            if (storedUser) {
                const user = JSON.parse(storedUser);
                console.log("Stored user data:", user);
                if (user.password === password) {
                    alert(`Welcome, ${user.name}!`);
                    console.log("Redirecting to exercise.html");
                    window.location.href = 'exercise.html';
                } else {
                    alert('Invalid password.');
                }
            } else {
                alert('User not found.');
            }
        });
    } else {
        console.log("Login button not found");
    }


    // document.querySelector('#login button[type="submit"]').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const username = document.getElementById('login-username').value;
    //     const password = document.getElementById('login-password').value;
    //     const storedUser = localStorage.getItem(username);

    //     if (storedUser) {
    //         const user = JSON.parse(storedUser);
    //         if (user.password === password) {
    //             alert(`Welcome, ${user.name}!`);
    //             window.location.href = 'exercise.html';
    //         } else {
    //             alert('Invalid password.');
    //         }
    //     } else {
    //         alert('User not found.');
    //     }
    // });
    // document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const username = document.getElementById('login-username').value;
    //     const password = document.getElementById('login-password').value;
    //     const user = JSON.parse(localStorage.getItem(username));
    //     if (user && user.password === password) {
    //         alert(`Welcome, ${user.name}!`);
    //         window.location.href = 'exercise.html';
    //     } else {
    //         alert('Invalid username or password.');
    //     }
    // });
});





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
        exerciseDiv.append($("<div>").addClass("horizontal-line"));

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

$(document).ready(function () {
    searchFormEl.on("submit", handleSearchSubmit);
});