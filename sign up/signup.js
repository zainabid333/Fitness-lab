    document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const title = container.querySelector('.title');
    const tabs = container.querySelector('.tabs');
    const tab1 = tabs.querySelector('.tab:nth-child(1)');
    const tab2 = tabs.querySelector('.tab:nth-child(2)');
    
    const formGroup1 = createFormGroup('Username', 'text');
    const formGroup2 = createFormGroup('Password', 'password');

    const formGroup3 = createFormGroup('Email', 'email'); // Additional form group for sign up
    const formGroup4 = createFormGroup('Confirm Password', 'password'); // Additional form group for sign up

    const button = document.createElement('button');
    button.textContent = 'Login';

    // Append elements to container
    container.appendChild(title);
    container.appendChild(tabs);
    container.appendChild(formGroup1);
    container.appendChild(formGroup2);
    container.appendChild(button);

    // Toggle active tab and form groups based on click
    tab1.addEventListener('click', () => {
        tab1.classList.add('active');
        tab2.classList.remove('active');
        title.textContent = 'Login Form';
        button.textContent = 'Login';
        clearContainer();
        container.appendChild(title);
        container.appendChild(tabs);
        container.appendChild(formGroup1);
        container.appendChild(formGroup2);
        container.appendChild(button);
    });

    tab2.addEventListener('click', () => {
        tab2.classList.add('active');
        tab1.classList.remove('active');
        title.textContent = 'Sign Up Form';
        button.textContent = 'Sign Up';
        clearContainer();
        container.appendChild(title);
        container.appendChild(tabs);
        container.appendChild(formGroup1);
        container.appendChild(formGroup3); // Add sign up form groups
        container.appendChild(formGroup4);
        container.appendChild(button);
    });

    // Function to clear container content
    function clearContainer() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    // Function to create form group with input
    function createFormGroup(labelText, inputType) {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;

        formGroup.appendChild(label);
        formGroup.appendChild(input);

        return formGroup;
    }
    });
