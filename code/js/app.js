// Variables
const email = document.getElementById('email');
const subject = document.getElementById('asunto');
const message = document.getElementById('mensaje');
const sendBtn = document.getElementById('enviar');
const form = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// Event Listenners
document.addEventListener('DOMContentLoaded', loadDOM);
email.addEventListener('blur', validateField); // Click en el elemento y luego salir del mismo
subject.addEventListener('blur', validateField);
message.addEventListener('blur', validateField);
form.addEventListener('submit', sendEmail);
resetBtn.addEventListener('click', resetForm);

// Functions
function loadDOM() {
  sendBtn.disabled = true;
  email.classList.add('error');
  subject.classList.add('error');
  message.classList.add('error');
}

function validateField() {
  validateLength(this); // Podemos utilizar this en lugar de e.target
  
  if (this.type === 'email') {
    validateEmail(this);
  }
  
  const errors = document.querySelectorAll('.error');
  if (errors.length === 0) {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
  console.log(errors);
}

function validateLength(field) {
  if (field.value.length > 0) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error');
  }
}

function validateEmail(email) {
  if (email.value.indexOf('@') !== -1) {
    email.style.borderBottomColor = 'green';
    email.classList.remove('error');
  } else {
    email.style.borderBottomColor = 'red';
    email.classList.add('error');
  } // IndexOf returns -1 if doesn't find the element
}

function sendEmail(e) {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';

  const sendConfirmation = document.createElement('img');
  e.preventDefault();
  sendConfirmation.src = 'img/mail.gif';
  sendConfirmation.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none';
    document.getElementById('loaders').appendChild(sendConfirmation);
    setTimeout(() => {
      sendConfirmation.style.display = 'none';
      form.reset();
    }, 5000);
  }, 3000);
}

function resetForm(e) {
  e.preventDefault();
  form.reset();
}