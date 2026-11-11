
@props([
    'subtitle' => 'CLIENT STORIES • TRUSTED OUTCOMES',
    'title' => 'Hear From Clients We’ve Represented',

    'description' =>
        'Our clients trust (brandname) with their most important legal matters. Read experiences of clear communication, dedicated advocacy, and meaningful outcomes.',

    'testimonials' => [
        [
            'title' => 'Hollis Granger',
            'description' =>
                '“(brandname) handled our contract dispute with remarkable professionalism. They explained every option clearly, negotiated firmly, and secured a settlement that fully protected our growing company.”',
            'name' => 'Hollis Granger',
            'designation' => 'Founder & CEO, Logistics Company',
        ],
        [
            'title' => 'Marlowe Finch',
            'description' =>
                '“A competitor copied our trademark. The team acted quickly, filed everything correctly, and stopped the infringement within weeks. I finally feel my brand is safe.”',
            'name' => 'Marlowe Finch',
            'designation' => 'Fashion Brand Owner',
            'image' => 'assets/images/testimonials/user2.webp',
        ],
        [
            'title' => 'Delphine Cartwright',
            'description' =>
                '“After my wrongful termination, I felt lost. They listened patiently, explained my rights plainly, and fought hard for fair compensation. I’m grateful for their care.”',
            'name' => 'Delphine Cartwright',
            'designation' => 'Marketing Manager',
            'image' => 'assets/images/testimonials/user3.webp',
        ],
        [
            'title' => 'Thaddeus Wren',
            'description' =>
                '“Our visa process seemed impossible until (brandname) stepped in. Every document was prepared carefully, deadlines were never missed, and approval arrived ahead of schedule.”',
            'name' => 'Thaddeus Wren',
            'designation' => 'Software Engineer',
            'image' => 'assets/images/testimonials/user3.webp',
        ],
        [
            'title' => 'Rowan Ashcroft',
            'description' =>
                '“Forming our company and drafting shareholder agreements felt overwhelming. Their enterprise lawyers were precise, responsive, and commercially minded, giving us a solid foundation for growth.”',
            'name' => 'Rowan Ashcroft',
            'designation' => 'Startup Co-Founder',
            'image' => 'assets/images/testimonials/user3.webp',
        ],
        [
            'title' => 'Beckett Lorimer',
            'description' =>
                '“Their contract review caught risks our previous advisers missed. Clear, thorough, and always available, they became our trusted partner for every commercial agreement we sign.”',
            'name' => 'Beckett Lorimer',
            'designation' => 'Operations Director',
            'image' => 'assets/images/testimonials/user3.webp',
        ],
    ],
])

<div class="container 4xl:max-w-[1298px]!">
    <div class="lg:text-center text-left">
        <span class="subTitle text-primary block lg:text-center text-left">
            {{ $subtitle }}
        </span>

        <h2 class="section-title mb-5">
            {{ $title }}
        </h2>

        @if ($description)
            <p class="section-desc lg:text-center lg:max-w-[60%] lg:mx-auto ">
                {{ $description }}
            </p>
        @endif
    </div>

    {{-- Swiper Slider --}}
    <div class="swiper testimonialSwiper relative items-stretch">
        <div class="swiper-wrapper py-10">

            @foreach ($testimonials as $testimonial)
                <div class="swiper-slide h-auto!">

                    <div
                        class="card flex h-full cursor-pointer flex-col justify-between gap-3 bg-white px-10 py-5 4xl:py-10
                        shadow-sm
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-2 hover:shadow-[0px_20px_30px_-8px_rgba(28,0,48,0.2)]">

                        <div>
                               <!-- Stars -->
                        <div class="flex gap-1 my-5 2xl:my-10">
                            @for ($i = 0; $i < 5; $i++)
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z"
                                        fill="#C9A550" />
                                </svg>
                            @endfor
                        </div>

                        <!-- Description -->
                        <div class="mt-1 flex flex-col gap-3 4xl:mt-13 lg:mt-10 4xl:gap-1">
                            <p class="mb-0 pb-5 font-eb-gramond text-[16px] 4xl:text-[26px] text-primary 4xl:leading-[40px]">
                                {{ $testimonial['description'] }}
                            </p>
                        </div>

                        </div>
                        <!-- User Details -->
                        <div>
                            <span class="mb-1 block font-eb-gramond text-sm font-semibold text-primary 4xl:text-[21px]">
                                {{ $testimonial['name'] }}
                            </span>

                            <p class="mb-0 font-work-sans text-sm font-semibold">
                                {{ $testimonial['designation'] }}
                            </p>
                        </div>

                    </div>

                </div>
            @endforeach

        </div>
    </div>

    {{-- Navigation --}}
    <div class="flex items-center justify-center gap-3 sm:gap-4 4xl:gap-10 mt-6">

        {{-- Previous Button --}}
        <button type="button" class="flex items-center justify-center cursor-pointer"
            id="swiper-testimonial-button-prev" aria-label="Previous slide">

            <img loading="lazy" src="{{ asset('assets/images/icons/arrow-left.svg') }}" alt="prev icon" width="76"
                height="52" class="w-10 sm:w-15 4xl:w-[76px] h-auto">
        </button>

        {{-- Next Button --}}
        <button type="button" class="flex items-center justify-center cursor-pointer"
            id="swiper-testimonial-button-next" aria-label="Next slide">

            <img loading="lazy" src="{{ asset('assets/images/icons/arrow-right.svg') }}" alt="next icon" width="76"
                height="52" class="w-10 sm:w-15 4xl:w-[76px] h-auto">
        </button>

    </div>
</div>
