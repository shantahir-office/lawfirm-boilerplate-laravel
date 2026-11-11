@props([
    'subtitle' => 'Comprehensive Legal Solutions, Delivered',
    'title' => 'Our Complete Legal Services For Every Need',
    'description' =>
        '(brandname) offers focused legal services across six practice areas, helping individuals and businesses resolve disputes, manage risk, protect assets, and move forward with real confidence.',
    'showFooter' => true,

    'services' => [
        [
            'icon' => 'assets/images/icons/icon1.svg',
            'title' => 'Legal Disputes',
            'description' =>
                'We represent clients in negotiations, mediation, arbitration, and litigation, delivering strategic advocacy that protects your interests and secures enforceable outcomes.',
            'route' => 'legal-disputes',
        ],
        [
            'icon' => 'assets/images/icons/icon2.svg',
            'title' => 'Commercial Law',
            'description' =>
                'We draft and review contracts, guide transactions, and manage regulatory requirements, keeping your commercial relationships clear, compliant, and fully protected.',
            'route' => 'commercial-law',
            'featured' => true,
        ],
        [
            'icon' => 'assets/images/icons/icon3.svg',
            'title' => 'Enterprise Law',
            'description' =>
                'From company formation and governance to restructuring and shareholder matters, we provide corporate advice supporting sustainable growth and long-term stability.',
            'route' => 'enterprise-law',
        ],
        [
            'icon' => 'assets/images/icons/icon4.svg',
            'title' => 'Intellectual Property Rights',
            'description' =>
                'We protect trademarks, copyrights, patents, and trade secrets through registration, licensing, and enforcement, keeping your ideas and brand identity secure.',
            'route' => 'intellectual-property-rights',
        ],
        [
            'icon' => 'assets/images/icons/icon5.svg',
            'title' => 'Labor & Employment Law',
            'description' =>
                'We advise employers and employees on contracts, policies, disputes, and compliance, promoting fair, lawful workplaces while protecting everyone’s legal rights.',
            'route' => 'labor-employment-law',
        ],
        [
            'icon' => 'assets/images/icons/icon6.svg',
            'title' => 'Immigration Law',
            'description' =>
                'We support individuals, families, and employers with visas, residency, work permits, and citizenship, providing clear, careful guidance and dependable representation.',
            'route' => 'immigration-law',
        ],
    ],
])

{{-- Services Section Start --}}

<div class="container 4xl:max-w-[1255px]!">

    {{-- Header --}}
    <div class="flex flex-col gap-6 pb-12 text-center lg:flex-row lg:items-start lg:justify-between lg:text-start">

        <div class="lg:max-w-[698px]">

            <span class="block subTitle">
                {{ $subtitle }}
            </span>

            <h2 class="section-title m-0 pt-2">
                {{ $title }}
            </h2>

        </div>

        @if ($description)
            <p class="m-0 text-[13px] lg:max-w-[401px] lg:pt-2">
                {{ $description }}
            </p>
        @endif

    </div>

    {{-- Services Cards Grid --}}
    <div class="grid grid-cols-1 gap-[25px] md:grid-cols-2 lg:grid-cols-3">

        @foreach ($services as $service)
            <div
                class="group flex flex-col justify-between bg-white p-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary xl:p-[42px]">

                <div class="pb-6 text-center lg:text-start">

                    {{-- Icon --}}
                    @if (!empty($service['icon']))
                        <img loading="lazy" src="{{ asset($service['icon']) }}" alt="{{ $service['title'] }}"
                            width="30" height="30"
                            class="mx-auto h-[30px] w-[30px] brightness-0 transition-all duration-300 group-hover:brightness-100 lg:mx-0">
                    @endif

                    {{-- Title --}}
                    <span
                        class="m-0 block pt-4 font-eb-gramond text-xl font-medium leading-[34px] text-primary transition-colors duration-300 group-hover:text-[#F8FAF5] 2xl:text-[25px]">

                        {{ $service['title'] }}

                    </span>

                    {{-- Description --}}
                    <p
                        class="m-0 pt-2 font-work-sans font-normal text-primary transition-colors duration-300 group-hover:text-[#F1F5ED]/90 2xl:text-[15.9px] 2xl:leading-[26px]">

                        {{ $service['description'] }}

                    </p>

                </div>

                {{-- Footer Link --}}
                @if ($showFooter)
                    <x-banner-btn href="{{ route($service['route']) }}" text="Learn More →" :showArrow="false"
                        btnClass="btn btn-primary-simple transition-colors duration-300 group-hover:!text-[#F8FAF5]" />
                @endif

            </div>
        @endforeach

    </div>

</div>

{{-- Services Section End --}}
