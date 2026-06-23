const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const demoForm = document.querySelector('.demo-form');
const formMessage = document.querySelector('.form-message');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

demoForm.addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = 'Thank you! Your demo request has been received.';
  demoForm.reset();
});
