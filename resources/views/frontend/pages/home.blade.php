@extends('components.layouts.web.master')
@section('main-content')
    {{-- Hero Banner --}}
    <section class="hero-banner bg-primary lg:bg-[url(/assets/images/banners/hero-bg.webp)]">
        <div class="container">
            <div class="row items-center justify-between xl:pt-12">
                <div class="w-full lg:w-[60%] text-center lg:text-start">
                    <span class="subTitle mb-5 block">Trusted Counsel. Proven Legal Strategy</span>
                    <h1
                        class="text-secondary-light font-normal font-eb-gramond text-[26px] lg:text-[40px] 4xl:text-[67px] laeding-normal 4xl:leading-[75px] mb-5 4xl:mb-7 uppercase">
                        Clear Legal Excellence,
                        Confident Outcomes!

                    </h1>
                    <p class="xl:max-w-[75%] text-white 4xl:text-[21px]">
                        (brandname) delivers strategic legal solutions across disputes, commercial, enterprise, intellectual
                        property, employment, and immigration law, protecting your interests with clarity, integrity, and
                        results.
                    </p>
                    <div
                        class="flex gap-2 md:flex-row flex-col 4xl:gap-5 lg:gap-5 my-2 md:my-4 items-center justify-start 4xl:my-12">
                        <x-banner-btn text="Get Started" :showArrow="false" />
                        <x-banner-btn btnClass="btn btn-primary group text-center justify-center bg-[#4A3B2F]" type="button"
                            text="Live Chat" function="openChatWidget()" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    {{-- Hero Banner End --}}


  
@endsection
