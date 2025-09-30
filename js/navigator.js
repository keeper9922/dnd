// Функция для создания и добавления навигационной панели
function createNavbar() {
    // HTML структура навигационной панели
    const navbarHTML = `
    <a class="header-button">=</a>
    <header>
    <ul class="navbar-menu">
        <li><a href="index.html" class="nav-link">Главная</a></li>
        <li><a href="races.html" class="nav-link">Расы</a></li>
        <li><a href="char_history.html" class="nav-link">Предыстории</a></li>
        <li><a href="lore.html" class="nav-link">Лор</a></li>
        <li><a href="magic.html" class="nav-link">Магия</a></li>
        <li><a href="gods.html" class="nav-link">Божества</a></li>
        <li><a href="equipment.html" class="nav-link">Снаряжение, предметы, владения</a></li>
        <li><a href="sphere.html" class="nav-link superior">🔮</a></li>
<!--        <li><a href="items.html" class="nav-link">Предметы</a></li>-->
    </ul>
    </header>
    `;

    // Добавляем навигационную панель в начало body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Выделяем активный пункт меню
    setActiveLink();
}

// Функция для переключения мобильного меню
let turned_on = false;
function toggleMenu() {
    console.log(turned_on);
    const header = document.querySelector('header');
    if(!turned_on){
        $(header).fadeIn();
        turned_on = true;
    }else{
        $(header).fadeOut();
        turned_on = false;
    }
}

// Функция для выделения активного пункта меню
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Выполняем создание навигационной панели при загрузке страницы
document.addEventListener('DOMContentLoaded', createNavbar);
jQuery(function ($) {
    $(".header-button").on("click", toggleMenu);
});