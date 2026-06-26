const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const demoForm = document.querySelector('.demo-form');
const formMessage = document.querySelector('.form-message');
const contactDetails = {
  // Replace these placeholders with the school's real contact details.
  displayName: 'School OS',
  whatsappNumber: '+233539835051',
  phoneNumber: '+233539835051',
  tiktokHandle: 'schoolos',
};

const digitsOnly = value => value.replace(/\D/g, '');

function buildVCard(details) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${details.displayName}`,
    `ORG:${details.displayName}`,
    `TEL;TYPE=CELL:${details.phoneNumber}`,
    `URL:https://wa.me/${digitsOnly(details.whatsappNumber)}`,
    `URL:https://www.tiktok.com/@${details.tiktokHandle}`,
    'END:VCARD',
  ].join('\n');
}

function setupContactLinks() {
  const contactLinks = {
    whatsapp: `https://wa.me/${digitsOnly(contactDetails.whatsappNumber)}`,
    phone: `tel:${contactDetails.phoneNumber}`,
    tiktok: `https://www.tiktok.com/@${contactDetails.tiktokHandle}`,
    save: `data:text/vcard;charset=utf-8,${encodeURIComponent(buildVCard(contactDetails))}`,
  };

  const contactText = {
    whatsapp: contactDetails.whatsappNumber,
    phone: contactDetails.phoneNumber,
    tiktok: `@${contactDetails.tiktokHandle}`,
  };

  document.querySelectorAll('[data-contact-link]').forEach(link => {
    link.href = contactLinks[link.dataset.contactLink] || '#';
  });

  document.querySelectorAll('[data-contact-text]').forEach(node => {
    node.textContent = contactText[node.dataset.contactText] || node.textContent;
  });
}

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

setupContactLinks();
