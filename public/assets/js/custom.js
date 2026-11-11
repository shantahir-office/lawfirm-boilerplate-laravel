document.addEventListener("DOMContentLoaded", function () {
    // SCROLL SMOOTH SCRIPT START
    (function () {
        let lenis;
        let started = false;

        function loadLenisScript(callback) {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/lenis@1.3.11/dist/lenis.min.js";
            script.onload = callback;
            document.head.appendChild(script);
        }

        function startLenis() {
            if (started) return;
            started = true;

            loadLenisScript(() => {
                lenis = new Lenis({
                    duration: 2.1,
                    wheelMultiplier: 1.2,
                    smoothWheel: true,
                });

                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);
            });
        }

        // First interaction trigger
        ["scroll", "mousemove", "touchstart", "keydown", "click"].forEach(
            (event) => {
                window.addEventListener(event, startLenis, {
                    once: true,
                    passive: true,
                });
            },
        );
    })();
    // SCROLL SMOOTH SCRIPT END
    // ============================================================================//

});
