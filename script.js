// Function to open the popup with a delay
function openPopup(event) {
    event.preventDefault(); // Prevent default link behavior
    const popup = document.getElementById('popupForm');

    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
            popup.classList.add('show');
        }, 300); // Delay before showing popup
    } else {
        console.error('Popup element not found');
    }
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popupForm');

    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Match this time with the CSS transition duration
    } else {
        console.error('Popup element not found');
    }
}

// Event listener for closing the popup when clicking outside
window.onclick = function(event) {
    if (event.target === document.getElementById('popupForm')) {
        closePopup();
    }
};

// Testimonials
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.style.display = 'block';
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Initial display
showTestimonial(currentTestimonial);

// Swipe functionality for testimonials
const testimonialWrapper = document.querySelector('.testimonial-wrapper');
let startX = 0;
let isSwiping = false;

testimonialWrapper.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isSwiping = true;
});

testimonialWrapper.addEventListener('touchmove', (event) => {
    if (!isSwiping) return;

    const moveX = event.touches[0].clientX;
    const diffX = startX - moveX;

    if (Math.abs(diffX) > 50) { // Swipe threshold
        if (diffX > 0) {
            nextTestimonial();
        } else {
            prevTestimonial();
        }
        isSwiping = false;
    }
});

testimonialWrapper.addEventListener('touchend', () => {
    isSwiping = false;
});

// Video autoplay/pause on scroll
document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector(".responsive-video");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);
});
