@extends('components.layouts.lp-new.master')
@section('main-content')
    <section
        class="hero-banner relative flex flex-col justify-center items-center py-[clamp(80px,2vw,100px)] bg-primary lg:bg-[url(/assets/images/banners/thankyou-bg.webp)] bg-cover bg-center bg-no-repeat">
        <div class="container">
            <div class="row items-start justify-center lg:pt-[150px]">
                <div class="w-full lg:w-7/10 text-center ">
                    <h1 class="font-bold font-poppins text-white text-[clamp(25px,2.9vw,55px)] inline-block">
                        THANK YOU FOR YOUR PURCHASE!
                    </h1>
                    <p class="text-white"><strong>Your Trademark Protection Journey Has Officially Begun</strong>
                    </p>
                    <div class="max-w-3xl mx-auto">
                        <p class="text-white">
                            Our senior trademark experts are now reviewing your submission. You will be contacted shortly
                            for any additional information required to proceed with the filing or search process.
                        </p>
                    </div>
                    <div class="text-center mx-auto mb-5">
                        <x-banner-btn href="javascript:void()" text="Live Chat"
                            btnClass="btn btn-primary group text-center justify-center text-white mx-auto bg-secondary text-primary"
                            :showArrow="false" function="openChatWidget()" />
                    </div>
                    <p class="text-white max-w-3xl  mx-auto">
                        If you have any questions or would like to update your details, feel free to reach out to our
                        support team at {{ config('var.email') }} or call us  at
                        {{ config('var.phone') }}.
                    </p>
                </div>
            </div>
        </div>
    </section>
@endsection
