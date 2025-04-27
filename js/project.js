document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    const imageSlider = document.querySelector('.image-slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const indicatorDots = document.querySelector('.indicator-dots');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth;

    // ฟังก์ชันสำหรับเลื่อนสไลด์
    function goToSlide(index) {
        imageSlider.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
        updateDots();
    }

    // ฟังก์ชันอัปเดตจุดแสดงตำแหน่ง
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Event listeners สำหรับปุ่มควบคุม
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });
    }

    // Event listeners สำหรับจุดแสดงตำแหน่ง
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        });
    });

});