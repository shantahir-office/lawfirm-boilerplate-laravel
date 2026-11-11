<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>{{ $title ?? '' }}</title>
<meta name="description" content="{{ $description ?? '' }}">
<meta name="keywords" content="{{ $keywords ?? '' }}">
{{-- <meta name="robots" content="noindex, nofollow"> --}}
<link rel="icon" type="images/webp" href="{{ asset('assets/images/fav.webp') }}">



{{-- Preload Hero Banner Image --}}
{{-- <link rel="preload" as="image" href="{{ asset('assets/images/banners/hero-bg.webp') }}" type="image/webp"
    fetchpriority="high" imagesizes="100vw"> --}}

<link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style"
    onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
</noscript>


{{-- <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@300..800&family=Work+Sans:wght@300..800&display=swap"
    media="print" onload="this.media='all'">

<noscript>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@300..800&family=Work+Sans:wght@300..800&display=swap">
</noscript> --}}



{{-- intelinput CDN --}}
<link rel="preload" href="https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/css/intlTelInput.min.css"
    as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/css/intlTelInput.min.css">
</noscript>




@vite('resources/css/app.css')
