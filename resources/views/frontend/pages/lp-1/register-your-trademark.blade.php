@extends('components.layouts.lp-new.master')
@section('main-content')
    {{-- Hero Banner Section Start --}}
    <div class="tm-banner">
        <section class="tm-banner-section">
            <div class="tm-container">
                <div class="tm-row">
                    <div class="col-12 col-xl-7">
                        <div class="heroContent">
                            <span class="shurli !bg-secondary !text-white">Safeguard your brand identity</span>
                            <h1>Trademark your business name, <br> logo, and slogan in just
                                <span>{{ config('var.price') }}</span>
                            </h1>
                            <p class="banner-desc d-none d-md-block" style="font-size: 15px!important;">
                                Preserve your legacy and trademark brand name to keep complete control over your brand
                                assets while<br> defending your intellectual property against imitators, unauthorized use,
                                and infringement.
                            </p>
                            <p class="banner-desc d-block d-md-none" style="font-size: 15px!important;">
                                Safeguard your intellectual property and maintain control over brand assets with our team.
                            </p>
                            <div>
                                <ul>
                                    <li><x-check-lp-icon />
                                        Fully compliant federal trademark filing designed to safeguard your brand identity

                                    </li>
                                    <li><x-check-lp-icon />
                                        Entirely transparent pricing featuring zero hidden logo registration fees
                                    </li>
                                    <li><x-check-lp-icon />
                                        A streamlined, expert-guided registration process managing every step from start to
                                        finish
                                    </li>
                                </ul>
                            </div>
                            <div class="heroBtnRow">
                                <a href="{{ route('lp1Step1') }}" class="btn get-started-btn">Get Started</a>
                                <button type="button" class="btn chat-btn"onclick="openChatWidget()">Live Chat</button>
                            </div>
                            <span class="packages_line">Service plans start at <span>{{ config('var.price') }}</span>, View
                                <a href="#pakgeSec" class="view-all-packages">
                                    All  All Available Options</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="tm-hero-image">
        <div class="tm-container">
            <img fetchpriority="High" src="{{ asset('assets/images/lp-new/hero-image.webp') }}" alt="Hero Image"
                class="" width="942" height="711">
        </div>
    </div>
    </div>
    {{-- Hero Banner Section End --}}


  
@endsection
