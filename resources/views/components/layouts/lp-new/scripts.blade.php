@vite('resources/js/app.jsx')
<script defer src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/intlTelInput.min.js"></script>
<script defer src="{{ asset('assets/js/forms.js') }}"></script>
<script  src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script defer src="{{ asset('assets/js/chat.js') }}"></script>
<script defer src="{{ asset('assets/js/custom.js') }}"></script>


<script>
    new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
        autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '#swiper-testimonial-button-next',
        prevEl: '#swiper-testimonial-button-prev',
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});
</script>

{{-- Header Logo Script --}}
<script>
    const handleScroll = () => {
        const lpLogo = document.getElementById('lp-logo');
        const lpHeader = document.getElementById('lp-header');

        if (!lpLogo || !lpHeader) return;

        if (window.innerWidth <= 767 && window.scrollY > 50) {
            lpHeader.classList.add('mobile-sticky-header');
            // lpLogo.setAttribute('src', '/assets/images/lp/logo-white.webp');
        } else {
            lpHeader.classList.remove('mobile-sticky-header');
            // lpLogo.setAttribute('src', '/assets/images/lp/logo.webp');
        }
    };

    const handleResize = () => {
        if (window.innerWidth <= 767) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        } else {
            window.removeEventListener('scroll', handleScroll);
            handleScroll();
        }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
</script>


{{-- Modal Script Start --}}
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("leadFormModal");

        if (!modal) return;

        const overlay = modal.querySelector(".custom-lead-modal-overlay");
        const closeButton = modal.querySelector(".custom-lead-modal-close");

        let lastFocusedElement = null;

        function openLeadModal() {
            lastFocusedElement = document.activeElement;

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");

            setTimeout(() => {
                closeButton?.focus();
            }, 100);
        }

        function closeLeadModal() {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");

            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }

        if (closeButton) {
            closeButton.addEventListener("click", closeLeadModal);
        }

        if (overlay) {
            overlay.addEventListener("click", closeLeadModal);
        }

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeLeadModal();
            }
        });

        // Global functions
        window.openLeadModal = openLeadModal;
        window.closeLeadModal = closeLeadModal;

        // Auto open only on LP-4
        const currentPath = window.location.pathname.replace(/\/$/, "");

        if (currentPath === "/lp-4/register-your-trademark") {
            setTimeout(openLeadModal, 5000);
        }
    });
</script>
{{-- Modal Script End --}}


{{--get started BUTTONS Script -- --}}
<script>
    document.addEventListener("click", function(e) {

        const button = e.target.closest("a");

        if (!button || button.innerText.trim() !== "Get Started") {
            return;
        }

        const currentPath = window.location.pathname.replace(/\/$/, "");

        // LP-1: Redirect to Step 1
        if (currentPath === "/lp-1/register-your-trademark") {

            button.href = "{{ route('lp1Step1') }}";

            // Browser will navigate normally
            return;
        }

        // LP-4: Open Modal
        if (currentPath === "/lp-4/register-your-trademark") {

            e.preventDefault();

            if (typeof window.openLeadModal === "function") {
                window.openLeadModal();
            }

        }

    });
</script>
