<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>{{ $title ?? 'Trademark' }}</title>
<meta name="description" content="{{ $description ?? '' }}">
<meta name="keywords" content="{{ $keywords ?? '' }}">
<link rel="icon" type="images/webp" href="{{ asset('assets/images/logo/favicon.webp') }}">


<link rel="preload" as="image" href="{{ asset('assets/images/lp-new/lp-bg.webp') }}" type="image/webp" media="(min-width:1024px)" fetchpriority="high"/>
<link rel="preload" as="image" href="{{ asset('assets/images/lp-new/hero-image.webp') }}" type="image/webp" fetchpriority="high"/>


{{-- Swiper Slider CDN --}}
<link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
</noscript>

{{-- intelinput CDN --}}
<link rel="preload" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/css/intlTelInput.min.css"
    as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/css/intlTelInput.min.css">
</noscript>

<script>
(function () {
    let fontsLoaded = false;

    function loadFonts() {
        if (fontsLoaded) return;
        fontsLoaded = true;

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;600;700&display=swap';

        document.head.appendChild(fontLink);
    }

    ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'].forEach(event => {
        window.addEventListener(event, loadFonts, {
            once: true,
            passive: true
        });
    });

    setTimeout(loadFonts, 10000);
})();
</script>

@vite('resources/css/app.css')
@vite('resources/css/lp-custom-new.css')
