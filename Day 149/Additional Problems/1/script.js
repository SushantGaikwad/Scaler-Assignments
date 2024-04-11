const accordion = document.querySelector('.accordion');

accordion.addEventListener('click', function (event) {
  if (event.target.classList.contains('accordion-button')) {
    const content = event.target.nextElementSibling;
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  }
});