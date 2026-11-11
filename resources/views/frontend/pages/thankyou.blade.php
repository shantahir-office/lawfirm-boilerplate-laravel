@extends('components.layouts.lp-new.master')
@section('main-content')
    <section
        class="hero-banner relative flex flex-col justify-center items-center py-[clamp(80px,2vw,100px)] bg-primary lg:bg-[url(/assets/images/banners/thankyou-bg.webp)] bg-cover bg-center bg-no-repeat">
        <div class="container">
            <div class="row items-center justify-center  lg:pt-[100px]">
                <div class="w-full lg:w-7/10 text-center ">
                    <h1 class="font-bold font-poppins text-white text-[clamp(25px,2.9vw,55px)] inline-block uppercase">
                        Thank You for Contacting Us!
                    </h1>
                    </p>
                    <div class="max-w-3xl mx-auto">
                        <p class="text-white">
                            We have received your inquiry, and a member of our legal team will respond within 24 hours,
                            Monday through Friday.
                        </p>
                        <p class="text-white">
                            Please keep an eye on your inbox for an email from {{ config('var.email') }}, or watch for a
                            call or message from {{ config('var.phone') }}.
                        </p>
                        <p class="text-white">We Look Forward To Helping Protect Your Rights And Your Future.</p>
                        <div class="text-center mx-auto mb-5">
                            <x-banner-btn href="javascript:void()" text="Live Chat"
                                btnClass="btn btn-primary group text-center text-white justify-center mx-auto bg-secondary text-primary"
                                :showArrow="false" function="openChatWidget()" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
