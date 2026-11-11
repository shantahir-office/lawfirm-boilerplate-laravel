{{-- Menu Json Data --}}
@php
    $currentRoute = Route::currentRouteName();
    $menuItems = [
        ['title' => 'Home', 'route' => '/'],
        ['title' => 'About Us', 'route' => 'about'],

        [
            'title' => 'Our Service',
            'route' => 'empty',
            'dropdown' => null,
            'items' => [
                ['title' => 'Legal Disputes', 'route' => 'legal-disputes'],
                ['title' => 'Commercial Law', 'route' => 'commercial-law'],
                ['title' => 'Enterprise Law', 'route' => 'enterprise-law'],
                ['title' => 'Intellectual Property Rights', 'route' => 'intellectual-property-rights'],
                ['title' => 'Labor & Employment Law', 'route' => 'labor-employment-law'],
                ['title' => 'Immigration Law', 'route' => 'immigration-law'],
            ],
        ],
        ['title' => 'Contact', 'route' => 'contact'],
    ];

    foreach ($menuItems as &$m) {
        if (!empty($m['mega'])) {
            $m['dropdown'] = collect($m['mega'])->pluck('items')->flatten(1)->all();
        } elseif (!empty($m['items'])) {
            $m['dropdown'] = $m['items'];
        }
    }
    unset($m);

    if (!function_exists('isActiveRoute')) {
        function isActiveRoute($route, $currentRoute, $dropdown = null)
        {
            if ($currentRoute === $route && $route !== 'empty') {
                return true;
            }
            if ($dropdown) {
                foreach ($dropdown as $d) {
                    if ($currentRoute === $d['route'] && $d['route'] !== 'empty') {
                        return true;
                    }
                }
            }
            return false;
        }
    }
@endphp

{{-- header --}}
<header class="absolute inset-x-0 top-3 xl:top-[7px] 2xl:top-[52px] z-50 ">
    <div class="container">
        <nav class="relative flex p-2 items-center justify-between rounded-[22px] bg-transparent">

            <div class="pl-1">
                {{-- Logo --}}
                <a href="{{ route('/') }}" class="shrink-0">
                    <img loading="eager" src="{{ asset('assets/images/logo/logo.webp') }}" alt="logo" width="149"
                        height="74"
                        class="object-left max-h-12 lg:max-h-[74px] w-[clamp(126px,11vw,250px)] object-contain">
                </a>

            </div>
            {{-- Desktop menu (center) --}}
            <ul
                class="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-[clamp(35px,3.5vw,36px)] font-urban font-semibold text-lg leading-6 text-black">

                @foreach ($menuItems as $item)
                    @php
                        $active = isActiveRoute($item['route'], $currentRoute, $item['dropdown'] ?? null);
                    @endphp

                    {{-- Mega Menu --}}
                    @if (!empty($item['mega']))
                        <li class="relative group">

                            <a href="{{ $item['route'] === 'empty' ? 'javascript:void(0)' : route($item['route']) }}"
                                class="flex items-center gap-2 transition-colors duration-200 text-white hover:text-secondary font-semibold px-2 {{ $active ? 'text-white ' : '' }}">

                                {{ $item['title'] }}

                                <svg class="w-[17px] h-[17px] transition-transform duration-200 group-hover:rotate-180"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round">

                                    <path d="M6 9l6 6 6-6" />

                                </svg>

                            </a>


                            {{-- Mega Panel --}}
                            <div
                                class="absolute z-[1000] left-1/2 -translate-x-1/2 top-full pt-4 invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">

                                <div
                                    class="w-max min-w-[750px] max-w-[90vw] bg-white border-t-4 border-primary shadow-lg rounded-b-2xl">

                                    <div class="grid grid-cols-4 gap-10 p-8">

                                        @foreach ($item['mega'] as $group)
                                            <div class="{{ $loop->first ? 'col-span-2' : 'col-span-1' }}">

                                                <h3 class="text-primary font-bold text-lg 2xl:text-xl! mb-2 2xl:mb-4">
                                                    {{ $group['heading'] }}
                                                </h3>

                                                <ul class="{{ $loop->first ? 'columns-2 gap-x-10' : '' }}">

                                                    @foreach ($group['items'] as $sub)
                                                        <li class="break-inside-avoid">

                                                            <a href="{{ route($sub['route']) }}"
                                                                class="flex items-center gap-3 py-1.5 text-primary font-normal hover:text-secondary hover:translate-x-1 transition-all duration-200 {{ $currentRoute === $sub['route'] ? '!text-primary font-semibold underline' : '' }}">

                                                                <span
                                                                    class="shrink-0 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-primary">
                                                                </span>

                                                                <span class="text-wrap">
                                                                    {{ $sub['title'] }}
                                                                </span>

                                                            </a>

                                                        </li>
                                                    @endforeach

                                                </ul>

                                            </div>
                                        @endforeach

                                    </div>

                                </div>

                            </div>

                        </li>


                        {{-- Normal Dropdown --}}
                    @elseif (!empty($item['dropdown']))
                        <li class="relative group">

                            <a href="{{ $item['route'] === 'empty' ? 'javascript:void(0)' : route($item['route']) }}"
                                class="flex items-center gap-2 transition-colors duration-200 text-white hover:text-secondary font-semibold px-2 {{ $active ? 'text-white ' : '' }}">

                                {{ $item['title'] }}

                                <svg class="w-[17px] h-[17px] transition-transform duration-200 group-hover:rotate-180"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round">

                                    <path d="M6 9l6 6 6-6" />

                                </svg>

                            </a>


                            {{-- Dropdown --}}
                            <div
                                class="absolute z-[1000] left-0 top-full pt-3 invisible opacity-0 scale-95 origin-top-left group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">

                                <div
                                    class="min-w-[260px] w-max max-w-[min(90vw,360px)] overflow-hidden rounded-xl border border-primary border-t-4 border-t-secondary bg-secondary/10 shadow-xl shadow-gray-900/15 backdrop-blur-md">

                                    <div class="p-2">

                                        <ul class="max-h-[350px] overflow-y-auto">

                                            @foreach ($item['dropdown'] as $dropdownItem)
                                                <li>

                                                    <a href="{{ $dropdownItem['route'] === 'empty' ? 'javascript:void(0)' : route($dropdownItem['route']) }}"
                                                        class="group/item flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 {{ $currentRoute === $dropdownItem['route'] ? 'bg-white/10 text-secondary' : 'text-white hover:bg-white/10 hover:text-secondary' }}">

                                                        <span>{{ $dropdownItem['title'] }}</span>

                                                        <svg class="h-4 w-4 shrink-0 text-white/60 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-secondary"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="1.75" stroke-linecap="round"
                                                            stroke-linejoin="round" aria-hidden="true">
                                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                                        </svg>

                                                    </a>

                                                </li>
                                            @endforeach

                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </li>


                        {{-- Simple Menu --}}
                    @else
                        <li>

                            <a href="{{ route($item['route']) }}"
                                class="relative block transition-colors duration-200 font-semibold text-white hover:text-secondary px-2 {{ $active ? 'text-white ' : '' }}">

                                {{ $item['title'] }}

                            </a>

                        </li>
                    @endif
                @endforeach

            </ul>

            {{-- Right side: Live Chat + Hamburger --}}
            <div class="flex items-center gap-3 4xl:gap-5">
                <div class="">
                    <a href="tel:{{ config('var.phone') }}" aria-label="Call us" class="flex items-center gap-3">
                        <div
                            class="size-[35px] bg-transparent  flex items-center justify-center shrink-0 border-white border">
                            <img src="{{ asset('assets/images/icons/call-white.svg') }}" alt="call icon" loading="lazy"
                                width="13" height="13">
                        </div>
                        <span
                            class="text-white hover:text-secondary text-sm 2xl:text-base font-bold font-work-sans hidden md:block">
                            {{ config('var.phone') }}</span>
                    </a>
                </div>
                {{-- <div class="hidden md:block">
                    <x-banner-btn text="Live Consultation" />
                </div> --}}


                <button class="xl:hidden text-secondary" type="button" data-twe-offcanvas-toggle
                    href="#offcanvasExample" role="button" aria-label="Open menu" aria-controls="offcanvasExample">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                        fill="none">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </nav>
    </div>
</header>

{{-- Mobile offcanvas menu --}}
<div class="fixed top-0 left-0 z-[1045] flex h-full w-96 max-w-full -translate-x-full flex-col bg-secondary-light shadow-sm outline-none transition-transform duration-300 ease-in-out data-[twe-offcanvas-show]:translate-x-0 xl:hidden"
    tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" data-twe-offcanvas-init>
    <div class="flex items-center justify-between border-b border-primary/30 p-4">
        <img src="{{ asset('assets/images/logo/logo.webp') }}" alt="logo" width="120" height="60"
            class="h-12 w-auto object-contain" loading="lazy">
        <button type="button" class="text-black hover:text-secondary" data-twe-offcanvas-dismiss
            data-twe-target="#offcanvasExample" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

    <div class="flex-grow overflow-y-auto p-4 font-urban font-semibold">
        <ul class="flex flex-col">
            @foreach ($menuItems as $item)
                @php $active = isActiveRoute($item['route'], $currentRoute, $item['dropdown'] ?? null); @endphp
                <li class="mb-3 border-b border-primary/30 pb-3">
                    @if (isset($item['dropdown']))
                        <details class="group">
                            <summary
                                class="flex cursor-pointer list-none items-center justify-between rounded-xl  text-base transition-colors hover:bg-[#F2F7F6] {{ $active ? 'text-secondary' : 'text-primary' }}">
                                {{ $item['title'] }}
                                <svg class="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </summary>
                            <ul class="mt-2 space-y-1 rounded-xl">
                                @foreach ($item['dropdown'] as $sub)
                                    <li>
                                        <a href="{{ $sub['route'] === 'empty' ? 'javascript:void(0)' : route($sub['route']) }}"
                                            class="block rounded-xl px-3 py-1 text-primary/80 transition-colors hover:text-secondary">
                                            <span class="block text-sm font-semibold">{{ $sub['title'] }}</span>
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </details>
                    @else
                        <a href="{{ route($item['route']) }}"
                            class="block text-base hover:text-secondary {{ $active ? 'text-secondary font-bold' : 'text-primary' }}">
                            {{ $item['title'] }}
                        </a>
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</div>
