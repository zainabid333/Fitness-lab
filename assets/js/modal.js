function removeModalBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
    document.body.classList.remove('overflow-hidden');
}



document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
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

        grandparent.querySelectorAll('[aria-selected="true"]').forEach(t => {
            t.setAttribute('aria-selected', false);
            t.classList.remove('text-blue-600', 'border-blue-600');
        });

        target.setAttribute('aria-selected', true);
        target.classList.add('text-blue-600', 'border-blue-600');

        tabPanels.forEach(p => p.classList.add('hidden'));
        const tabPanel = document.querySelector(target.getAttribute('data-tabs-target'));
        tabPanel.classList.remove('hidden');
    }

    // Set initial active tab
    document.getElementById('login-tab').click();

    // BMI calculation
    const calculateBMIBtn = document.getElementById('calculate-bmi-btn');
    const bmiResult = document.getElementById('bmi-result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiResultDisplay = document.getElementById('bmi-result-display');
    const bmiValueDisplay = document.getElementById('bmi-value-display');
    const bmiCategoryDisplay = document.getElementById('bmi-category-display');

    calculateBMIBtn.addEventListener('click', function (e) {
        e.preventDefault();
        calculateBmi();
    });

    function calculateBmi() {
        const age = document.getElementById('bmi-age').value;
        const weight = document.getElementById('bmi-weight').value;
        const height = document.getElementById('bmi-height').value;
        const gender = document.getElementById('bmi-gender').value;

        if (age && weight && height && gender) {
            const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
            let category;
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 25) category = "Normal weight";
            else if (bmi < 30) category = "Overweight";
            else category = "Obese";

            bmiValue.textContent = bmi;
            bmiCategory.textContent = `Category: ${category}`;
            bmiResult.classList.remove('hidden');

            bmiValueDisplay.textContent = bmi;
            bmiCategoryDisplay.textContent = category;
            bmiResultDisplay.classList.remove('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    }

    // Signup functionality
    document.getElementById('signup-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const gender = document.getElementById('signup-gender').value;

        if (name && username && password && gender) {
            const user = { name, username, password, gender };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Signup successful!');

            // Close the modal using Flowbite's modal object
            const modal = document.getElementById('authentication-modal');
            const modalInstance = new flowbite.Modal(modal);
            modalInstance.hide();

            // Clear the form fields
            document.getElementById('signup-form').reset();
            removeModalBackdrop();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Login functionality
    document.getElementById('login-submit-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const user = JSON.parse(localStorage.getItem(username));

        if (user && user.password === password) {
            alert(`Welcome, ${user.name}!`);
            removeModalBackdrop();
            window.location.href = 'exercise.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});