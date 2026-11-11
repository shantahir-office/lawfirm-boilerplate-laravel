@extends('components.layouts.lp-new.master')
@section('main-content')
    {{-- Hero section Start --}}
    <section
        class="hero-banner relative lg:pt-[150px] flex flex-col justify-center items-center py-[clamp(80px,2vw,100px)] bg-primary lg:bg-[url(/assets/images/banners/thankyou-bg.webp)] bg-cover bg-center bg-no-repeat">
        <div class="text-center container  max-w-6xl!">
            <h2 class="font-bold font-poppins text-white text-[clamp(25px,2.9vw,55px)] inline-block">
            We've Received Your Request Successfully!
            </h2>
            <p class="text-white max-w-3xl mx-auto">
               Thank you for showing your interest in {{config('var.website_name')}}. It will be a pleasure for us to serve you. One of your account managers will reach out to you shortly.


            </p>
            <div class="text-center mx-auto mb-5">
                <x-banner-btn href="javascript:void()" text="Live Chat"
                    btnClass="btn btn-primary group text-center justify-center text-white mx-auto bg-secondary text-primary"
                    :showArrow="false" function="openChatWidget()" />
            </div>
            <p class="text-white max-w-3xl mx-auto">
              If you have any questions or would like to update your details, feel free to reach out to our support team at 
                {{ config('var.email') }}.
            </p>
        </div>
    </section>
    {{-- Hero section End --}}
@endsection
