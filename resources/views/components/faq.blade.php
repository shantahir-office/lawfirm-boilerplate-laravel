@props([
    'subtitle' => 'FREQUENTLY ASKED QUESTIONS',

    'title' => 'Answers To Your Legal Questions',

    'faqs' => [
        [
            'question' => 'What areas of law does (brandname) cover?',
            'answer' =>
                'We advise on legal disputes, commercial law, enterprise law, intellectual property rights, labor and employment law, and immigration law, for both individuals and businesses.',
        ],
        [
            'question' => 'How do I book a consultation?',
            'answer' =>
                'You can book through our website, by phone, or by email. Share a brief summary of your matter, and our team will arrange a confidential meeting at a convenient time.',
        ],
        [
            'question' => 'What should I bring to my first consultation?',
            'answer' =>
                'Bring any relevant documents, such as contracts, correspondence, notices, or identification, along with a short timeline of events. This helps us assess your situation accurately from the start.',
        ],
        [
            'question' => 'How much will legal services cost?',
            'answer' =>
                'Fees depend on the complexity and type of matter. After your consultation, we explain our fee structure clearly and in advance, so you know what to expect before we proceed.',
        ],
        [
            'question' => 'Is my information kept confidential?',
            'answer' =>
                'Yes. Everything you share with (brandname) is treated with strict confidentiality and protected by attorney-client privilege, so you can speak openly about your concerns.',
        ],
    ],
])

<div class="container 4xl:max-w-[1314px]!">

    <!-- FAQ Section -->
    <div class="">

        <div class="">

            <span class="subTitle text-left text-black">
                {{ $subtitle }}
            </span>

            <h2 class="section-title  text-black mt-3">
                {{ $title }}
            </h2>

        </div>

        <div class="mt-6 lg:mt-11">

            <div class="flex flex-col gap-2 lg:gap-4" id="accordionFlushExample">

                @foreach ($faqs as $index => $faq)
                    @php
                        $i = $index + 1;
                        $isFirst = $i === 1;
                    @endphp

                    <div class="bg-white">

                        <h2 class="mb-0" id="flush-heading{{ $i }}">

                            <button
                                class="group relative flex w-full items-center border-0 px-5 lg:px-6 pt-6 pb-5 text-left bg-white text-black text-[clamp(14px,2vw,22px)] font-medium"
                                type="button" data-twe-collapse-init
                                {{ $isFirst ? '' : 'data-twe-collapse-collapsed' }}
                                data-twe-target="#flush-collapse{{ $i }}"
                                aria-expanded="{{ $isFirst ? 'true' : 'false' }}"
                                aria-controls="flush-collapse{{ $i }}">

                                <!-- Question Text -->
                                {{ $faq['question'] }}

                                <!-- Arrow Icon -->
                                <span
                                    class="-me-1 ms-auto shrink-0 p-[4px] flex items-center justify-center [&>svg]:size-[clamp(20px,5vw,25px)] [&_path]:stroke-black">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="transition-transform duration-200 ease-in-out rotate-[268deg] group-data-twe-collapse-collapsed:rotate-90">

                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />

                                    </svg>

                                </span>

                            </button>

                        </h2>

                        <!-- Gradient Divider -->
                        {{-- <svg class="mx-auto w-full" width="777" height="1" viewBox="0 0 777 1" fill="none"
                            xmlns="http://www.w3.org/2000/svg">

                            <rect width="776.02" height="0.99" fill="url(#paint0_linear_10982_823)" />

                            <defs>
                                <linearGradient id="paint0_linear_10982_823" x1="0" y1="0.495"
                                    x2="776.02" y2="0.495" gradientUnits="userSpaceOnUse">

                                    <stop stop-color="#D4D4D8" stop-opacity="0" />

                                    <stop offset="0.5" stop-color="#D4D4D8" />

                                    <stop offset="1" stop-color="#D4D4D8" stop-opacity="0" />

                                </linearGradient>
                            </defs>
                        </svg> --}}

                        <!-- Accordion Content -->
                        <div id="flush-collapse{{ $i }}" class="{{ $isFirst ? '' : 'hidden' }} border-0"
                            data-twe-collapse-item {{ $isFirst ? 'data-twe-collapse-show' : '' }}
                            aria-labelledby="flush-heading{{ $i }}"
                            data-twe-parent="#accordionFlushExample">

                            <div class="pb-6 px-6">

                                <p
                                    class="mb-0 text-[clamp(14px,1.2vw,15px)] 4xl:text-[17px] 4xl:leading-[36px] max-w-[710px] text-black">

                                    {{ $faq['answer'] }}

                                </p>

                            </div>

                        </div>

                    </div>
                @endforeach

            </div>

        </div>

    </div>

</div>
