<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sequence | (brandname)</title>
    <meta name="description"
        content="(brandname) provides fast, compliant trademark registration services with same-day filing, managed by U.S. licensed attorneys.">

    {{-- favicon --}}
    <link rel="icon" type="image/webp" href="{{ asset('assets/images/fav.webp') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('sequence-assets/purged-main.css') }}" />
    <link rel="stylesheet" href="{{ asset('sequence-assets/main.css') }}" />
    {{-- @viteReactRefresh

    @vite(['resources/js/app.jsx'])

    @inertiaHead --}}

    <style>
        .step4seqnozeropackage:first-child,
        .step4seqnozeropackage:first-of-type,
        .step4seqnozeropackage>.col-md-6:first-child {
            display: none !important;
        }
    </style>


</head>

<body style="background:#f6f6f6">


    {{-- @inertia --}}
    <div id="app" data-page="{{ json_encode($page) }}"></div>
    @vite('resources/js/sequence.jsx')
        <script>
        window.varConfig = @json(config('var'));
    </script>

<script defer src="{{ asset('assets/js/chat.js') }}"></script>
</body>

</html>
