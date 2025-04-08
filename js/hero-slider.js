document.addEventListener('DOMContentLoaded', () => {
    // Находим элементы
    const slider = document.querySelector('.hero__stats-list');
    const dotsContainer = document.querySelector('.slider__dots');
    const items = document.querySelectorAll('.hero__stats-item');
    let currentIndex = 0;



    // Прокручиваем слайдер к нужному слайду
    function goToSlide(index) {
        if (index >= items.length) {
            index = 0; 
        }
        const slideWidth = items[0].offsetWidth + 48; // Ширина слайда + gap
        slider.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });
        currentIndex = index;
    }



    slider.addEventListener('scroll', () => {
        const slideWidth = items[0].offsetWidth + 48;
        const scrollPosition = slider.scrollLeft;
        currentIndex = Math.round(scrollPosition / slideWidth);
        if (currentIndex >= items.length) {
            currentIndex = items.length - 1;
        }
        updateActiveDot();
    });


});