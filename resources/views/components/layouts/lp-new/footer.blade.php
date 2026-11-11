<footer
    class="bg-primary lg:bg-[url(/assets/images/banners/lp-footer.webp)] bg-cover bg-center bg-no-repeat **:font-poppins! py-8 lg:pb-[30px] lg:pt-[90px]">
    <div class="container">
        <div
            class="mb-5 lg:mb-9 flex gap-4 lg:gap-6 2xl:gap-12 4xl:gap-18 items-center  flex-wrap xl:flex-nowrap justify-start">
            <div class="w-full lg:w-4/12 xl:w-2/12">
                <img loading="lazy" src="{{ asset('assets/images/logo/logo.webp') }}" alt="logo white" width="200"
                    height="60" class="object-contain h-auto mb-4 lg:w-full">

            </div>
            <div class="w-full xl:w-10/12 flex justify-start flex-col gap-5 lg:gap-4">
                <div class="flex justify-start md:justify-between flex-col lg:flex-row gap-5 lg:gap-1">
                    <div class="flex items-center gap-3">
                        <img loading="lazy" src="{{ asset('assets/images/icons/call-primary.svg') }}" alt="call icon"
                            width="22" height="22" class="object-contain">
                        <div>
                            {{-- <span class="text-white text-xs block leading-none">Phone Number: </span> --}}
                            <a href="tel:{{ config('var.phone') }}"
                                class=" text-white hover:text-secondary text-[16px] 4xl:text-[18px]  transition-all leading-8"
                                style="word-break: break-word">{{ config('var.phone') }}</a><br>
                        </div>
                    </div>
                    <div class=" flex items-center gap-3 ">
                        <img loading="lazy" src="{{ asset('assets/images/icons/mail.svg') }}" alt="mail icon"
                            width="22" height="22" class="object-contain">
                        <div>
                            {{-- <span class="text-white text-xs block leading-none">Email Address: </span> --}}
                            <a href="mailto:{{ config('var.email') }}"
                                class=" text-white hover:text-secondary text-[16px] 4xl:text-[18px]  transition-all leading-8"
                                style="word-break: break-word">{{ config('var.email') }}</a>
                        </div>
                    </div>
                    <div class=" flex items-center gap-3">
                        <img loading="lazy" src="{{ asset('assets/images/icons/map.svg') }}" alt="address icon"
                            width="22" height="22" class="object-contain">
                        <div>
                            {{-- <span class="text-white text-xs block leading-none">Address: </span> --}}
                            <span
                                class=" text-white hover:text-secondary text-[16px] 4xl:text-[18px]  transition-all  block leading-8">{{ config('var.address') }}</span>
                        </div>
                    </div>
                </div>

                <p class="text-sm m-0 text-white font-poppins"> {{ config('var.website_name') }} delivers dependable
                    legal guidance for individuals and businesses, protecting your
                    rights with integrity, clarity, and personal attention at every stage of your matter.</p>
            </div>
        </div>
        <div class="border-t border-white/10 py-5 4xl:py-10 ">
            <div class="flex md:flex-row flex-col justify-between lg:items-center items-start lg:gap-0 gap-0.5">
                <p
                    class="xl:text-sm text-white lg:text-base text-[12px] text-center lg:text-start text-sm mb-0 font-poppins">
                    Copyright ©
                    2018- {{ date('Y') }} {{ config('var.website_name') }}. All Rights Reserved.</p>
                <ul class="flex flex-row gap-2 items-center justify-center lg:justify-start">
                    <li><a href="{{ route('lp-privacy-policy') }}"
                            class="xl:text-sm text-white lg:text-base text-[13px] text-center lg:text-start text-sm hover:text-white/50 hover:text-black">Privacy
                            Policy</a></li>
                    <li
                        class="xl:text-sm text-white lg:text-base text-[13px] text-center lg:text-start text-sm hover:text-white/50">
                        |</li>
                    <li><a href="{{ route('lp-terms-and-conditions') }}"
                            class="xl:text-sm text-white lg:text-base text-[13px] text-center lg:text-start text-sm hover:text-white/50 hover:text-black">Terms
                            & Conditions</a></li>
                </ul>
            </div>

        </div>

        <div class="pt-8 border-t border-white/10 text-start">
            <span class="font-bold font-poppins text-sm block mb-2 text-white">DISCLAIMER</span>
            <p class="text-white font-light text-sm font-poppins mb-8">
                By continuing to use the {{ config('var.website_name') }} website, you consent to the use of cookies in
                accordance with our
                Cookie Policy, and you agree to our <a href="{{ route('lp-privacy-policy') }}"
                    class="text-white hover:text-secondary">Privacy Policy</a> and <a
                    href="{{ route('lp-terms-and-conditions') }}" class="text-white hover:text-secondary">Terms &
                    Conditions</a>.
            </p>
        </div>


    </div>
</footer>
