// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Обработка формы (пока просто оповещение)
const form = document.getElementById('signupForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        form.reset();
    });
}

// Добавим класс для активного пункта меню при скролле (просто для красоты - необязательно)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            const currentId = section.getAttribute('id');
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== КАРУСЕЛЬ ОТЗЫВОВ =====
const reviewsData = [
    {
        rating: 5,
        text: "Очень приятная девушка, перед процедурой успокоила и объяснила как все будет проходить. В кабинете стерильно, все иглы новые.",
        author: "Модели для пирсинга",
        date: "2026"
    },
    {
        rating: 5,
        text: "Делала два прокола — всё прошло максимально комфортно и аккуратно. Мастер очень внимательная, постоянно интересовалась моим самочувствием, всё подробно объясняла и создавала спокойную атмосферу. Чувствуется профессионализм и забота о клиенте. Осталась очень довольна результатом и обязательно обращусь снова. Спасибо за качественную работу!",
        author: "Аноним",
        date: "26 мая 2026"
    },
    {
        rating: 5,
        text: "Лучший мастер по проколам! Спасибо за чуткость и идеальную работу 🎉 Хочу оставить огромную благодарность этому замечательному мастеру! Обратилась к ней для прокола пупка. В кабинете уютно, как дома, при этом очень чисто и ВСЁ стерильно. Работа выполнена ровно, аккуратно, на совесть. Огромное спасибо за профессионализм и красивый результат!",
        author: "Клиент с проколом пупка",
        date: "2026"
    },
    {
        rating: 5,
        text: "Добрый день! Девушка мастер замечательная, вежливая, внимательная, заботливая, всё рассказала до и после, работа выполнена качественно, быстро и хорошо. Спасибо большое.",
        author: "",
        date: "2026"
    }
];

let currentReviewIndex = 0;
const wrapper = document.getElementById('reviewsWrapper');
const dotsContainer = document.getElementById('carouselDots');

// Функция для отображения звёзд
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Функция создания всех отзывов
function renderReviews() {
    wrapper.innerHTML = '';
    reviewsData.forEach((review, index) => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-card-carousel';
        reviewDiv.innerHTML = `
            <div class="review-content">
                <div class="review-rating">${renderStars(review.rating)}</div>
                <div class="review-text">“${review.text}”</div>
                <div class="review-author">${review.author || 'Анонимный клиент'}</div>
                <div class="review-date">${review.date}</div>
            </div>
        `;
        wrapper.appendChild(reviewDiv);
    });
    updateCarousel();
}

// Обновление позиции карусели и активной точки
function updateCarousel() {
    wrapper.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
    
    // Обновляем точки
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentReviewIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Создание точек пагинации
function createDots() {
    dotsContainer.innerHTML = '';
    reviewsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentReviewIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentReviewIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });
}

// Переключение отзывов
function nextReview() {
    if (currentReviewIndex < reviewsData.length - 1) {
        currentReviewIndex++;
        updateCarousel();
    } else {
        currentReviewIndex = 0;
        updateCarousel();
    }
}

function prevReview() {
    if (currentReviewIndex > 0) {
        currentReviewIndex--;
        updateCarousel();
    } else {
        currentReviewIndex = reviewsData.length - 1;
        updateCarousel();
    }
}

// Инициализация карусели
if (document.getElementById('reviewsWrapper')) {
    renderReviews();
    createDots();
    
    document.querySelector('.prev-btn').addEventListener('click', prevReview);
    document.querySelector('.next-btn').addEventListener('click', nextReview);
    
    // Автопрокрутка отзывов каждые 20 секунд
    setInterval(() => {
        nextReview();
    }, 20000);
}

// ===== ПОРТФОЛИО - ГАЛЕРЕЯ РАБОТ =====
// Укажите названия ваших файлов (фото должны лежать в папке images)
const portfolioImages = [
    { src: "images/work1.jpg", alt: "Прокол уха" },
    { src: "images/work2.jpg", alt: "Прокол брови" },
    { src: "images/work3.jpg", alt: "Прокол уха" },
    { src: "images/work4.jpg", alt: "Прокол брови" },
    { src: "images/work5.jpg", alt: "Прокол брови" },
    { src: "images/work6.jpg", alt: "Прокол уха" },
    { src: "images/work7.jpg", alt: "Прокол носа" },
    { src: "images/work8.jpg", alt: "Прокол уха" },
    { src: "images/work9.jpg", alt: "Прокол пупка" }
];

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    portfolioImages.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="this.src='https://placehold.co/400x300/1a1a1a/ff3b6f?text=Фото+скоро'">
            <div class="portfolio-overlay">
                <p>✨ ${item.alt}</p>
            </div>
        `;
        grid.appendChild(portfolioItem);
    });
}

// Запускаем создание галереи
renderPortfolio();