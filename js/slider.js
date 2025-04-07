document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.news__slider-wrapper');
    const slides = document.querySelectorAll('.news__item');
    const prevButton = document.querySelector('.news__slider-button--prev');
    const nextButton = document.querySelector('.news__slider-button--next');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slidesToShow = 3; // По умолчанию показываем 3 слайда

    // Функция для обновления количества видимых слайдов в зависимости от ширины экрана
    const updateSlidesToShow = () => {
        if (window.innerWidth <= 768) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
    };

    // Функция для обновления слайдера
    const updateSlider = () => {
        const slideWidth = slides[0].offsetWidth + 24; // Ширина слайда + отступ
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);
        sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Управляем видимостью кнопок
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    };

    // Обработчики для кнопок
    prevButton.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    // Обновляем слайдер при изменении размера окна
    window.addEventListener('resize', () => {
        updateSlidesToShow();
        updateSlider();
    });

    // Инициализация
    updateSlidesToShow();
    updateSlider();
});