@php
    $layout = request()->is('lp/*') ? 'components.layouts.lp-new.master' : 'components.layouts.web.master';
@endphp


@extends($layout)
@section('main-content')
    {{-- Hero Banner Section Start --}}
    <section
        class=" {{ request()->is('lp/*') ? 'bg-primary' : 'bg-primary' }} hero-banner min-h-auto lg:min-h-[40vh] relative flex flex-col justify-center items-center pt-[205px] pb-[105px]">
        <div class="container">
            <div class="row items-center justify-center text-center">
                <div class="w-full xl:w-10/12 4xl:w-7/12">
                    <h1 class=" {{ request()->is('lp/*') ? 'text-white' : 'text-white' }} text-[clamp(22px,2.9vw,52px)] inline-block font-semibold">Privacy Policy </h1>
                </div>
            </div>
        </div>
    </section>
    {{-- Hero Banner Section End --}}


    {{-- Privacy Policy Section Start --}}
    <section class="pt-0">
        <div class="container 4xl:max-w-[1661px]!">
            <div
                class="md:px-5 pt-20 [&>p]:font-poppins [&>p]:text-sm [&>p]:mb-5 [&>p]:4xl:mb-7 [&>p]:4xl:text-lg [&>p]:4xl:leading-[1.8] [&>p]:xl:text-base [&>h3]:font-poppins [&>h3]:4xl:text-[30px] [&>h3]:xl:text-[20px] [&>h3]:text-base [&>h3]:font-bold">
                <h2 class="section-title mb-3">Privacy Policy</h2>
                <p>This Privacy Policy discloses the policies of (brandname) (the “Website”) and its operator
                    (brandname) (collectively “we” or “us”) regarding the collection, use and disclosure of
                    information you submit to us through the use of Website.</p>
                <p>(brandname) is part of an affiliation of companies owned by the same ownership group
                    (collectively, “our Group Companies”). In some cases, we may receive personal information from our
                    Group Companies, and we may share personal information with our Group Companies.</p>
                <h3>User Consent</h3>
                <p>By accessing or otherwise using the Website, you agree to the terms and conditions of this Privacy
                    Policy, which is incorporated into and forms a part of the Website’s Terms of Service. You expressly
                    consent to the processing and use of your information as described herein.</p>
                <h3>Types of Information Collected</h3>
                <p>“Personal information” is data that identifies, relates to, describes, can be used to contact, or
                    could reasonably be linked directly or indirectly to you. For purposes of this Policy, there is no
                    meaningful distinction between the terms “personal information” and “personal data.”</p>
                <h3>Personal Information We Collect Directly From You</h3>
                <p>As you visit or use our Website, we collect the following categories of personal information directly
                    from you:</p>
                <p>“Personal information” is data that identifies, relates to, describes, can be used to contact, or
                    could reasonably be linked directly or indirectly to you. For purposes of this Policy, there is no
                    meaningful distinction between the terms “personal information” and “personal data.”</p>
                <p>Your name</p>
                <p>Contact information (such as email address, postal address, phone number)</p>
                <p>Account information (such as account settings and passwords)</p>
                <p>Company details (such as the company name, officers, members, and associated addresses)
                </p>
                <p>Billing information (such as credit, debit, or other payment card information, as may be required to
                    use certain services on the Website)</p>
                <p>
                    Information required for registration (such as your citizenship status)
                </p>
                <p>Communications you send us (such as customer support and other requests you make through our
                    services)</p>
                <p>Other information you may provide (including other information you provide about yourself or others
                    through our Services or to which you provide us with access via third-party platforms)</p>
                <p>You may choose not to provide some of the personal information described above. Please note, however,
                    that many of our services require some personal information to operate, so if you choose not to
                    provide the personal information necessary to operate and provide you with a particular service or
                    feature of that service, you may not be able to use that service or feature.</p>
                <p>We do not proactively collect sensitive personal information, such as health-related information,
                    political opinions, religious beliefs, or genetic data.</p>
                <h3>Collection of Personal Information</h3>
                <p>We collect Personal Information you voluntarily submit to us through the Website. It is optional for
                    you to utilize this Website. If you elect to utilize certain aspects of this Website, we may ask you
                    to provide us with certain personal information about yourself, such as your first and last name,
                    mailing address (including zip code), company name, email address, telephone number, and date of
                    birth. When you order products or services, we may also ask you to provide us with your credit card
                    number, expiration date and authentication codes or related information. If you do not provide
                    certain mandatory information for a particular activity that requires it, you will not be permitted
                    to engage in that activity.</p>
                <p>We may offer contests, sweepstakes or other contests that will require you to sign up and provide
                    additional Personal Information. In that case, we will collect the information provided along with
                    your involvement in such activity. Additionally, we reserve the right to collect any other
                    information that you voluntarily enter, including Personal Information, into any postings, comments,
                    feedback, or forums on the Website.</p>
                <p>We may, but are in no way obligated to, provide for referral or “tell another” programs that allow
                    you to recommend the site or an article to a friend. If you choose to do so, we will ask for your
                    referral’s name and email address. We will automatically send your friend one or more communications
                    with either the product you have purchased or an invitation for him or her to visit the Website. The
                    communication will allow the referral to unsubscribe from further communications. We will collect
                    this information for the sole purpose of sending an invitation to visit the site, sending their
                    product and tracking the success of any referral program. We will also collect your e-mail address
                    and the full content of your e-mail, including attached files, and other information you provide. We
                    may use and display your full name and email address to your referral. Additionally, we use your
                    email address to contact you about the status of your referral.</p>
                <h3>Cookies and Other Tracking Technologies</h3>
                <p>Cookies are small pieces of data contained in text files, which are stored on your computer or other
                    device when websites are loaded in a browser.</p>
                <p>
                    First Party Cookies. (brandname) utilizes cookies, web beacons, and other technologies to allow
                    Website to "personalize" itself for each user by remembering information about the user's visit to
                    the website. For instance, by using the cookies generated by (brandname) (“First Party Cookies”)
                    your information is retained so you do not have to continually log back into your account each time
                    you move to a different page. First Party Cookies remain associated with you. However, no third
                    party may use the information we collect through our First Party Cookies for their own purposes.
                    Deletion of these cookies may result in limited functionality of the Website and associated
                    services.</p>
                <h3>Storage and Protection of Your Information</h3>
                <p>Your Personal Information may be processed and stored outside of your jurisdiction where laws
                    regarding processing of Personal Information may be less stringent than the laws in your country or
                    state. Your Personal Information will not, however, be used or disclosed for purposes for which you
                    have not given consent or which are not permitted under applicable law.</p>
                <p>Storage of Credit Card Information - When your credit or debit card account information is being
                    transmitted through our Website, it will be protected by security protocols. (brandname) does not
                    itself store your credit card or debit card account information, and we do not have direct control
                    over or responsibility for your credit or debit card account information. We may continue to have
                    access to your credit card information through third party services for easy access in the event you
                    decide to order more services from (brandname) We do not otherwise store your credit card
                    information ourselves.</p>

                <p>Phone: <a href="tel:{{ config('var.phone') }}" aria-label="call {{ config('var.phone') }}" class="hover:text-secondary">{{ config('var.phone') }}</a></p>
                <p>Email: <a href="mailto:{{ config('var.email') }}" aria-label="email {{ config('var.email') }}" class="hover:text-secondary">{{ config('var.email') }}</a></p>
                <p>Address: <span class="hover:text-secondary">{{ config('var.address') }}</span></p>

            </div>
        </div>
    </section>
    {{-- Privacy Policy Section End --}}
@endsection
