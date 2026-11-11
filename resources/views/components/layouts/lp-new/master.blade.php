<!DOCTYPE html>
<html lang="en">

<head>
    <x-gtag-1 />

    @include('components.layouts.lp-new.head')
    @stack('styles')

    <x-gtag-2 />

</head>

<body class="mobileBg !bg-[#FFFBF5] lp-standard">
    <x-gtag-3 />

    @include('components.layouts.lp-new.header')
    <main>

        @yield('main-content')

    </main>
    @hasSection('custom-footer')
        @yield('custom-footer')
    @else
        @include('components.layouts.lp-new.footer')
    @endif
    @include('components.layouts.lp-new.scripts')
    @stack('scripts')
</body>

</html>
