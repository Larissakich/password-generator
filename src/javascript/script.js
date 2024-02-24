// Function to get the selected character types
function getChartTypes() {
    // Retrieve the checked status of each character type checkbox
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    // Initialize an empty array to store selected character types
    const charTypes = [];

    // If uppercase is selected, add uppercase characters to charTypes array
    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    // If lowercase is selected, add lowercase characters to charTypes array
    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    // If number is selected, add numeric characters to charTypes array
    if (number) {
        charTypes.push('0123456789');
    }

    // If specialCharacter is selected, add special characters to charTypes array
    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    // Return the array of selected character types
    return charTypes;
}

// Function to get the desired password size
function getPasswordSize() {
    // Retrieve the value entered in the size input field
    const size = document.querySelector('#size').value;
    
    // Validate the size: must be a number between 4 and 128
    if (isNaN(size) || size < 4 || size > 128) {
        // Display an error message if the size is invalid
        message('Tamanho inválido, digite um número entre 4 e 128!', 'danger');
    }

    // Return the validated size
    return size;
}

// Function to generate a password with specified size and character types
function generatePassword(size, charTypes) {
    let passwordGenerated = '';
    // Concatenate all selected character types into a single string
    const selectedChars = charTypes.join('');

    // Ensure at least one character from each selected character type
    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    // Generate remaining characters randomly from the selected character types
    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    // Shuffle the password string to enhance randomness
    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    // Return the generated password
    return passwordGenerated;
}

// Function to display a message using Toastify library
function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

// Event listener for the "Generate" button
document.querySelector('#generate').addEventListener('click', function () {
    // Get the desired password size
    const size = getPasswordSize();
    // Get the selected character types
    const charTypes = getChartTypes();

    // If size is not valid, return and do not proceed further
    if (!size) {
        return;
    }
    
    // If no character type is selected, display an error message and return
    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    // Generate the password with the specified size and character types
    const passwordGenerated = generatePassword(size, charTypes);

    // Display the generated password
    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

// Event listener for the "Copy" button
document.querySelector('#copy').addEventListener('click', function () {
    // Copy the generated password to the clipboard
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    // Display a success message
    message('Senha copiada com sucesso!', 'success');
});
