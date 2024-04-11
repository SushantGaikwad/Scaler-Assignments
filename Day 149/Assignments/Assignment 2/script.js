const button = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar')
const mainContent = document.getElementById('main-content')
let flag = false;

button.addEventListener('click', () => {
    sidebar.classList.toggle('collapse')
    mainContent.classList.toggle('collapsed')
})