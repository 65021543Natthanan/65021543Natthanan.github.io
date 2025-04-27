document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');
    const navLinksA = document.querySelectorAll('.nav-links li a'); // เลือกเฉพาะลิงก์ <a>
    const sections = document.querySelectorAll('section'); // หรือส่วนอื่นๆ ที่คุณต้องการอ้างอิง



    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        navLinksLi.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Smooth Scrolling (โค้ดเดิมของคุณ)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Link on Scroll
    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // ปรับ offset ตามความสูงของ header (60px) หรือค่าที่คุณต้องการ
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksA.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);


    const carouselTrack = document.querySelector('.activities-carousel .carousel-track');
    const cards = document.querySelectorAll('.activities-carousel .activity-card');
    const prevButton = document.querySelector('.activities-carousel .carousel-controls .prev-button');
    const nextButton = document.querySelector('.activities-carousel .carousel-controls .next-button');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // รวม margin
    const totalWidth = cardWidth * cards.length;
    const centerPosition = (carouselTrack.offsetWidth - cardWidth) / 2;

    // ตั้งค่าเริ่มต้นให้ carousel track มีขนาดใหญ่พอ
    carouselTrack.style.width = `${totalWidth}px`;

    function updateCarousel() {
        const translateX = -currentIndex * cardWidth + centerPosition;
        carouselTrack.style.transform = `translateX(${translateX}px)`;

        cards.forEach((card, i) => {
            const distance = Math.abs(i - currentIndex);
            const scale = 1 - distance * 0.1; // ปรับค่าเพื่อควบคุมขนาด
            const opacity = 0.6 + (1 - distance * 0.2); // ปรับค่าเพื่อควบคุมความสว่าง

            card.classList.remove('active');
            card.style.transform = `scale(${Math.max(0.8, scale)})`; // ไม่ให้เล็กกว่า 0.8
            card.style.opacity = Math.max(0.4, opacity); // ไม่ให้จางกว่า 0.4

            if (distance === 0) {
                card.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // อัปเดต Carousel เมื่อโหลดหน้าเว็บครั้งแรก
    updateCarousel();
    


});

const awardCards = document.querySelectorAll('.awards-card');

    awardCards.forEach(card => {
        const imageSlider = card.querySelector('.award-images .image-slider');
        const slides = card.querySelectorAll('.award-images .slide');
        const prevButton = card.querySelector('.award-images .prev-button');
        const nextButton = card.querySelector('.award-images .next-button');
        const indicatorDots = card.querySelector('.award-images .indicator-dots')
        const dots = card.querySelectorAll('.award-images .dot');

        let currentIndex = 0;
        let slideWidth;

        function updateSlideWidth() {
            slideWidth = slides[0].offsetWidth;
        }

        function goToSlide(index) {
            imageSlider.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
            updateDots();
        }

        function updateDots() {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function createDots() {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = index;
                dot.addEventListener('click', () => goToSlide(index));
                indicatorDots.appendChild(dot);
            });
            // อัปเดต dots หลังจากสร้าง
            const initialDots = card.querySelectorAll('.award-images .dot');
            if (initialDots.length > 0) {
                initialDots[0].classList.add('active');
            }
        }

        // เรียกใช้เมื่อโหลดหน้าเว็บและเมื่อมีการปรับขนาดหน้าจอ
        updateSlideWidth();
        createDots();
        window.addEventListener('resize', updateSlideWidth);

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
    });


    const awardsCarousel = document.querySelector('.awards-carousel');
    const carouselPrevButton = document.querySelector('.carousel-controls .carousel-prev');
    const carouselNextButton = document.querySelector('.carousel-controls .carousel-next');

    if (awardsCarousel && carouselPrevButton && carouselNextButton) {
        carouselPrevButton.addEventListener('click', () => {
            awardsCarousel.scrollBy({ left: -awardsCarousel.offsetWidth, behavior: 'smooth' });
        });

        carouselNextButton.addEventListener('click', () => {
            awardsCarousel.scrollBy({ left: awardsCarousel.offsetWidth, behavior: 'smooth' });
        });
    }





