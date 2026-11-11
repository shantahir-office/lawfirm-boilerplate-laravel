<header class="lp-header" id="lp-header">
    <div class="tm-container">
        <div class="tm-row">
            <div class="logo-div">
                <img loading="eager" class="lp-logo" id="lp-logo" src="{{ asset('assets/images/lp-new/logo.webp') }}"
                    alt="logo" width="335" height="103">
                {{-- <span class="font-bold text-[30px] text-black">(brandname)</span> --}}
            </div>
            <div class="social-info">
                <div class="social-item">
                    <a href="tel:{{ config('var.phone') }}" aria-label="Call us">
                        <div>
                            <div class="icon-div !bg-secondary">
                                <img loading="lazy" src="{{ asset('assets/images/lp-new/phone.svg') }}" alt="phone"
                                    class="icon" width="20" height="20">
                            </div>
                            <div class="social-div">
                                <small class="">Call Us Now:</small>
                                <span class="">{{ config('var.phone') }}</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="social-item">
                    <a href="mailto:{{ config('var.email') }}" aria-label="Email us">
                        <div>
                            <div class="icon-div !bg-secondary">
                                <img loading="lazy" src="{{ asset('assets/images/lp-new/email.svg') }}" alt="email"
                                    class="icon" width="20" height="20">
                            </div>
                            <div class="social-div">
                                <small class="">Email Address:</small>
                                <span class="">{{ config('var.email') }}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
