@extends('components.layouts.web.master')
@section('main-content')
    {{-- Form Section Start --}}
    <section>
        <div class="container 4xl:max-w-[1508px]! relative z-10">
            <div
                class="grid grid-cols-1 items-start gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 4xl:gap-20.5 lg:grid-cols-[43%_50%] lg:justify-center">
                <div>
                    <div
                        class="py-6 xl:py-8.5 2xl:py-9.5 px-4 border-y border-black flex flex-col gap-4 lg:gap-5.5 4xl:gap-6.5">
                        <div class="flex items-center gap-4.5">
                            <div>
                                <x-svgs.drop />

                            </div>

                            <span class="text-black text-base lg:text-xl">Drop us an email</span>
                        </div>

                        <a href="mailto:{{ config('var.email') }}" aria-label="Email"
                            class="text-black text-sm lg:text-lg 2xl:text-xl 4xl:text-[24px] hover:text-secondary">{{ config('var.email') }}</a>
                    </div>
                    <div
                        class="py-6 xl:py-8.5 2xl:py-9.5 px-4 border-y border-black flex flex-col gap-4 lg:gap-5.5 4xl:gap-6.5">
                        <div class="flex items-center gap-4.5">
                            <div>
                                <x-svgs.location />

                            </div>

                            <span class="text-black text-base lg:text-xl">Visit Our Office</span>
                        </div>

                        <span
                            class="text-black text-sm lg:text-lg 2xl:text-xl 4xl:text-[24px] hover:text-secondary">{{ config('var.address') }}</span>
                    </div>
                    <div
                        class="py-6 xl:py-8.5 2xl:py-9.5 px-4 border-y border-black flex flex-col gap-4 lg:gap-5.5 4xl:gap-6.5">
                        <div class="flex items-center gap-4.5">
                            <div>
                                <x-svgs.call />

                            </div>

                            <span class="text-black text-base lg:text-xl">Call Us</span>
                        </div>

                        <a href="tel:{{ config('var.phone') }}" aria-label="Phone"
                            class="text-black text-sm lg:text-lg 2xl:text-xl 4xl:text-[24px] hover:text-secondary">{{ config('var.phone') }}</a>
                    </div>
                    <div
                        class="py-6 xl:py-8.5 2xl:py-9.5 px-4 border-y border-black flex flex-col gap-4 lg:gap-5.5 4xl:gap-6.5">
                        <div class="flex items-center gap-4.5">
                            <div>
                                <x-svgs.clock />

                            </div>

                            <span class="text-black text-base lg:text-xl">Working Hours</span>
                        </div>

                        <span class="text-black text-sm lg:text-lg 2xl:text-xl 4xl:text-[24px] hover:text-secondary">Mon -
                            Fri: 9:00 AM - 18:00
                            PM</span>
                    </div>
                </div>
                <div>
                    <h2 class="text-black section-title 4xl:mb-8">
                        Get in Touch </h2>
                    <p class="text-black 4xl:mb-8 lg:text-xl 2xl:text-[25px]">Simply complete the form below to schedule
                        your free initial
                        consultation with our expert attorneys, ready to guide you every
                        step of the way.</p>


                    <form class="grid grid-cols-12 gap-5 lg:gap-6 2xl:gap-7 4xl:gap-8 web-contact-form">

                        <input type="text" name="firstname" placeholder="First Name"
                            class="firstname w-full  h-11.25 md:h-15.5 lg:h:[70px] 2xl:h-18.75 4xl:h-20 font-normal border-2 border-black bg-transparent px-5 4xl:px-[25px] text-black placeholder:text-black/80 form-control text-sm lg:text-lg col-span-12 md:col-span-6"
                            required>

                        <input type="text" name="lastname" placeholder="Last Name"
                            class="lastname w-full  h-11.25 md:h-15.5 lg:h:[70px] 2xl:h-18.75 4xl:h-20 font-normal border-2 border-black bg-transparent px-5 4xl:px-[25px] text-black placeholder:text-black/80 form-control text-sm lg:text-lg col-span-12 md:col-span-6"
                            required>

                        <!-- Email + Phone -->
                        <input type="email" name="email" placeholder="Email Address"
                            class="email w-full h-11.25 md:h-15.5 lg:h:[70px] 2xl:h-18.75 4xl:h-20 font-normal border-2 border-black bg-transparent px-5 4xl:px-[25px] text-black placeholder:text-black/80 form-control text-sm lg:text-lg col-span-12 md:col-span-6">

                        <div class="w-full! col-span-12 md:col-span-6">

                            <input type="tel" name="phone" placeholder="Phone Number"
                                class="phone w-full! h-11.25 md:h-15.5 lg:h:[70px] 2xl:h-18.75 4xl:h-20 font-normal border-2 border-black bg-transparent px-5 4xl:px-[25px] text-black placeholder:text-black/80 form-control text-sm lg:text-lg">
                        </div>

                        <!-- Message -->
                        <textarea name="message" rows="5" placeholder="Kindly provide enough information..."
                            class="message w-full font-normal border-2 border-black bg-transparent p-5 pr-14 text-black placeholder:text-black/80 resize-none form-control text-sm lg:text-lg col-span-12"
                            required></textarea>
                        <div class="border border-1 border-danger my-2 bg-white p-1 rounded-2 text-danger mb-3 w-100"
                            style="display:none" id="errormsg">
                        </div>

                        <!-- Button -->
                        <button type="submit"
                            class="btn btn-primary group text-center justify-center col-span-12 4xl:text-[22px] font-work-sans uppercase w-full! contactformsubmit bg-secondary text-white">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    {{-- Form Section End --}}
@endsection
