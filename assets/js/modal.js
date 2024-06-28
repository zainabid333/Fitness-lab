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
            t.classList.remove('text-blue-600', 'border-blue-600');
        });

        // Set this tab as selected
        target.setAttribute('aria-selected', true);
        target.classList.add('text-blue-600', 'border-blue-600');

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
});
