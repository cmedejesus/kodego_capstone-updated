const password = document.querySelector('#password');
const confirmInput = document.querySelector('#passwordConfirm');
const confirmMsg = document.querySelector('#confirmMsg');
const submit = document.querySelector('#submit');

function checkPw() {
    if (password.value == confirmInput.value && password.value) {
        submit.disabled = false;
        confirmMsg.textContent = '';
    } else if (!password.value) {
        submit.disabled = true;
    } else {
        submit.disabled = true;
        confirmMsg.textContent = 'Not a match';
    }
}

password.addEventListener('input', checkPw);
confirmInput.addEventListener('input', checkPw);