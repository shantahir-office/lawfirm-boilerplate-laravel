<footer
    class="web-footer bg-primary lg:bg-[url(/assets/images/banners/footer-bg.webp)] bg-cover bg-center bg-no-repeat 4xl:pt-22 lg:pt-15 pt-10">
    <div class="container 4xl:max-w-[1504px]!">
        <div class="flex 4xl:gap-7 lg:flex-nowrap flex-wrap lg:gap-10 gap-4 pb-10 4xl:pb-15">
            <div
                class="lg:w-[30%] w-full flex  flex-col  lg:items-start items-center lg:text-left text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                {{-- <h2 class="leading-8.5 4xl:text-4xl text-2xl font-bold text-white">LOGO
                    <br />
                    <i>HERE</i>
                </h2> --}}
                <a href="{{ route('home') }}">
                    <img loading="lazy" src="{{ asset('assets/images/logo/logo.webp') }}" alt="logo white" width="196"
                        height="71" class="h-auto">


                </a>
                <p class="text-white font-light text-sm font-work-sans 4xl:leading-[24px] my-5">
                    {{ config('var.website_name') }} delivers dependable legal guidance for individuals and businesses,
                    protecting your
                    rights with integrity, clarity, and personal attention at every stage of your matter.
                </p>

                <div
                    class="flex gap-3  lg:items-start items-center lg:justify-start justify-center text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white mb-4">
                    <img loading="lazy" src="{{ asset('assets/images/icons/map.svg') }}" width="13" height="17"
                        class="h-auto" alt="map-white">

                    <span
                        class=" text-white block font-work-sans font-medium hover:text-secondary lg:text-sm text-xs 4xl:text-[17px]">
                        {{ config('var.address') }}
                    </span>
                </div>
                <div
                    class="flex gap-3  items-center lg:justify-start justify-center text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white mb-4">
                    <img loading="lazy" src="{{ asset('assets/images/icons/mail.svg') }}" width="17" height="22"
                        class="h-auto" alt="map-white">

                    <a href="mailto:{{ config('var.email') }}"
                        class=" text-white block font-work-sans font-medium hover:text-secondary lg:text-sm text-xs 4xl:text-[17px]">
                        {{ config('var.email') }}
                    </a>
                </div>
                <div
                    class="flex gap-3  items-center lg:justify-start justify-center text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white mb-4">
                    <img loading="lazy" src="{{ asset('assets/images/icons/call-primary.svg') }}" width="17"
                        height="22" class="h-auto" alt="map-white">

                    <a href="tel:{{ config('var.phone') }}"
                        class=" text-white block font-work-sans font-medium hover:text-secondary lg:text-sm text-xs 4xl:text-[17px]">
                        {{ config('var.phone') }}
                    </a>
                </div>

            </div>
            <div
                class="lg:w-[70%] w-full lg:h-full  lg:grid-cols-3 4xl:grid-cols-[260px_414px_327px] grid grid-cols-1 lg:gap-0 gap-5 items-start justify-start">
                <div class="lg:h-full 4xl:pt-0 pt-5 flex justify-center">
                    <div class="border-line lg:h-full list">
                        <span
                            class="font-eb-gramond font-normal 4xl:text-[19px] text-base text-white block mb-4 text-center lg:text-start">CORE
                            SERVICES</span>

                        <ul class="flex flex-col 4xl:gap-3 gap-2">
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('commercial-law') }}" class="item">Commercial Law</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('enterprise-law') }}" class="item">Enterprise Law</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('immigration-law') }}" class="item">Immigration Law</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('intellectual-property-rights') }}" class="item">Intellectual
                                    Property Rights</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('labor-employment-law') }}" class="item">Labor & Employment Law</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('legal-disputes') }}" class="item">Legal Disputes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="lg:h-full   4xl:pt-0 pt-5  flex justify-center px-5 xl:px-0">
                    <div class="border-line lg:h-full list">
                        <span
                            class="font-eb-gramond font-normal 4xl:text-[19px] text-base text-white block mb-4 text-center lg:text-start">COMPANY</span>

                        <ul class="flex flex-col 4xl:gap-3 gap-2">
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('about') }}" class="item">About Us</a>
                            </li>

                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('contact') }}" class="item">Contact Us</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('privacy-policy') }}" class="item">Privacy Policy</a>
                            </li>
                            <li
                                class="text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                                <a href="{{ route('termsAndConditions') }}" class="item">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="lg:h-full   4xl:pt-0 pt-5  flex justify-center">
                    <div class="border-line lg:h-full list">
                        <span
                            class="font-eb-gramond font-normal 4xl:text-[19px] text-base text-white block mb-4 text-center lg:text-start">CONNECT
                            WITH US</span>

                        <p
                            class="text-white font-light text-sm font-work-sans 4xl:leading-[24px] my-5 text-center lg:text-start">
                            Follow our official legal channels to keep
                            informed on the latest IP legal updates, USPTO
                            guidelines, and brand protection tips.
                        </p>
                        <div class="flex gap-4 justify-center lg:justify-start">
                            <a href="{{ config('var.facebook') }}" aria-label="facebook" target="_blank">
                                <div
                                    class="size-[54px] flex justify-center items-center hover:scale-105 transition-all duration-300 hover:bg-secondary bg-[#432611] border-secondary border">
                                    <img loading="lazy" src="{{ asset('assets/images/icons/fb.svg') }}" width="9"
                                        height="17" class="h-auto" alt="map-white">
                                </div>
                            </a>
                            <a href="{{ config('var.linkedin') }}" aria-label="linkedin" target="_blank">
                                <div
                                    class="size-[54px] flex justify-center items-center hover:scale-105 transition-all duration-300 hover:bg-secondary bg-[#432611] border-secondary border">
                                    <img loading="lazy" src="{{ asset('assets/images/icons/link.svg') }}"
                                        width="15" height="15" class="h-auto" alt="map-white">
                                </div>
                            </a>
                            <a href="{{ config('var.instagram') }}" aria-label="instagram" target="_blank">
                                <div
                                    class="size-[54px] flex justify-center items-center hover:scale-105 transition-all duration-300 hover:bg-secondary bg-[#432611] border-secondary border">
                                    <img loading="lazy" src="{{ asset('assets/images/icons/insta.svg') }}"
                                        width="15" height="15" class="h-auto" alt="map-white">
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t border-white/10 py-5 4xl:py-10 ">
            <div class="container">
                <div class="flex md:flex-row flex-col justify-between items-center">
                    <p
                        class="xl:text-[18px] text-white lg:text-base text-[12px] text-center lg:text-start text-sm 4xl:text-[17px] mb-0">
                        Copyright ©
                        2018- {{ date('Y') }} {{ config('var.website_name') }}. All Rights Reserved.</p>
                    <ul class="flex flex-row gap-2 items-center justify-center lg:justify-start">
                        <li><a href="{{ route('privacy-policy') }}"
                                class="xl:text-[18px] text-white lg:text-base text-[13px] text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white hover:text-black">Privacy
                                Policy</a></li>
                        <li
                            class="xl:text-[18px] text-white lg:text-base text-[13px] text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white">
                            |</li>
                        <li><a href="{{ route('termsAndConditions') }}"
                                class="xl:text-[18px] text-white lg:text-base text-[13px] text-center lg:text-start text-sm 4xl:text-[17px] hover:text-secondary text-white hover:text-black">Terms
                                & Conditions</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class=" text-center lg:text-start pt-5 pb-8 border-t border-white/10">
            <span class="font-normal font-work-sans text-sm block mb-2 text-white">DISCLAIMER</span>
            <p class="text-white font-light text-sm font-work-sans 4xl:leading-[24px] my-5">
                By continuing to use the {{ config('var.website_name') }} website, you consent to the use of cookies in
                accordance with our
                Cookie Policy, and you agree to our <a href="{{ route('privacy-policy') }}"
                    class="text-white hover:text-secondary">Privacy Policy</a> and <a
                    href="{{ route('termsAndConditions') }}" class="text-white hover:text-secondary">Terms &
                    Conditions</a>.
            </p>
        </div>
    </div>
</footer>
