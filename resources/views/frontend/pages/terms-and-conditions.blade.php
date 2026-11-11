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
                    <h1
                        class=" {{ request()->is('lp/*') ? 'text-white' : 'text-white' }} text-[clamp(22px,2.9vw,52px)] inline-block font-semibold">
                        Terms & Conditions </h1>
                </div>
            </div>
        </div>
    </section>
    {{-- Hero Banner Section End --}}


    {{-- Terms & Conditions Section Start --}}
    <section class="pt-0">
        <div class="container 4xl:max-w-[1661px]!">
            <div
                class="md:px-5 pt-20 [&>p]:font-poppins [&>p]:text-sm [&>p]:mb-5 [&>p]:4xl:mb-7 [&>p]:4xl:text-lg [&>p]:4xl:leading-[1.8] [&>p]:xl:text-base [&>h3]:font-poppins [&>h3]:4xl:text-[30px] [&>h3]:xl:text-[20px] [&>h3]:text-base [&>h3]:font-bold">
                <h2 class="section-title">Terms &amp; Conditions</h2>
                <p>When you use this website, you agree to the terms and conditions set forth by (brandname) under
                    the company name (brandname) If you do not agree with these terms, stop using the website
                    immediately. </p>
                <p>No part of this Website is intended to constitute a contractual offer capable of acceptance. Your
                    order constitutes a contractual offer and our acceptance of that offer is deemed to occur upon our
                    sending a dispatch email to you indicating that your order has been fulfilled and is on its way to
                    you.</p>
                <h3>Definitions &amp; Interpretation</h3>
                <p>In this Agreement the following terms shall have the following meanings:</p>
                <p><strong>Account</strong> means collectively the personal information, Payment Information and
                    credentials used by Users to access Paid Content and / or any communications System on the Website
                </p>

                <p><strong>Content</strong> means any text, graphics, images, audio, video, software, data compilations
                    and any other form of information</p>
                <p><strong>(brandname)</strong> means (brandname) a company registered in United States
                    whose
                    registered office and trading address and contact details are:</p>
                <p>Phone: <a href="tel:{{ config('var.phone') }}">{{ config('var.phone') }}</a></p>
                <p>Email: <a href="mailto:{{ config('var.email') }}">{{ config('var.email') }}</a></p>
                <p>Address: <a href="javascript:;">{{ config('var.address') }}</a></p>
                <p><strong>Service</strong> means collectively any online facilities, tools, services or information
                    that is made available through the Website either now or in the future</p>
                <p><strong>Services</strong> means the services available to you through this Website, specifically
                    (brandname)</p>
                <p><strong>Payment Information</strong> means any details required for the purchase of Services from
                    this Website. This includes, but is not limited to, credit / debit card numbers, bank account
                    numbers and sort codes</p>
                <p><strong>Purchase Information</strong> means collectively any orders, invoices, receipts or similar
                    that may be in hard copy or electronic form</p>
                <p><strong>Premises</strong> Means our place(s) of business located at {{ config('var.address') }}</p>
                <p><strong>System</strong> means any online communications infrastructure that (brandname) makes
                    available through the Website either now or in the future</p>
                <p><strong>User/Users</strong> means any third party that accesses the Website and</p>
                <p><strong>Website</strong> means the website that you are currently using <a
                        href="https://(brandname)com">www.(brandname)com</a> and any
                    sub-domains of this site unless expressly excluded by their own terms and conditions.</p>
                <h3>Age Restrictions</h3>
                <p>Persons under the age of 18 should use this Website only with the supervision of an Adult. Payment
                    Information must be provided by or with the permission of an Adult.</p>
                <h3>Intellectual Property</h3>
                <p>All Content included on the Website, unless uploaded by Users, including, but not limited to, text,
                    graphics, logos, icons, images, sound clips, video clips, data compilations, page layout, underlying
                    code and software is the property of (brandname), our affiliates or other relevant third
                    parties.
                    By continuing to use the Website acknowledge that such material is protected by applicable United
                    States and International Intellectual Property and other laws.</p>
                <p>You may not reproduce, copy, distribute, store or in any other fashion re-use material from the
                    Website unless otherwise indicated on the Website or unless given express written permission to do
                    so by (brandname)</p>
                <h3>Third Party Intellectual Property</h3>
                <p>Unless otherwise expressly indicated, all Intellectual Property rights including, but not limited to,
                    Copyright and Trademarks, in product images and descriptions belong to the manufacturers or
                    distributors of such products as may be applicable.</p>
                <h3>Links to Other Websites</h3>
                <p>This Website may contain links to other sites. Unless expressly stated, these sites are not under the
                    control of (brandname) or that of our affiliates. We assume no responsibility for the content
                    of
                    such websites and disclaim liability for any and all forms of loss or damage arising out of the use
                    of them. The inclusion of a link to another site on this Website does not imply any endorsement of
                    the sites themselves or of those in control of them.</p>
                <h3>Use Of Communications Facilities</h3>
                <p>When using the enquiry form or any other System on the Website you should do so in accordance with
                    the following rules:</p>
                <p>(a) You must not use obscene or vulgar language</p>
                <p>(b) You must not submit Content that is unlawful or otherwise objectionable. This includes, but is
                    not limited to, Content that is abusive, threatening, harassing, defamatory, ageist, sexist or
                    racist</p>
                <p>(c) It is advised that submissions are made using the English language as we may be unable to respond
                    to enquiries submitted in any other languages</p>
                <p>(d) The means by which you identify yourself must not violate these Terms and Conditions or any
                    applicable laws</p>
                <p>(e) You must not use our System for unauthorised mass-communication such as “spam” or “junk mail”.
                </p>
                <p>(f) You acknowledge that (brandname) reserves the right to monitor any and all communications
                    made
                    to us or using our System.</p>
                <h3>Accounts</h3>
                <p>(a) In order to procure Services on this Website you are required to create an Account which will
                    contain certain personal details and Payment Information which may vary based upon your use of the
                    Website as we may not require payment information until you wish to make a purchase. </p>
                <p>(b) It is recommended that you do not share your Account details, particularly your username and
                    password. (brandname) accepts no liability for any losses or damages incurred as a result of
                    your
                    Account details being shared by you. If you use a shared computer, it is recommended that you do not
                    save your Account details in your internet browser.</p>
                <p>(c) If you have reason to believe that your Account details have been obtained by another without
                    consent, you should contact (brandname) immediately to suspend your Account and cancel any
                    unauthorised orders or payments that may be pending. Please be aware that orders or payments can
                    only be cancelled up until provision of Services has commenced. In the event that an unauthorised
                    provision commences prior to your notifying us of the unauthorised nature of the order or payment,
                    (brandname) accepts no liability or responsibility and you should make contact with the third
                    party service provider detailed in the Purchase Information.</p>

                <h3>Refund Policy</h3>
                <p>(brandname) to meet the trademark needs of our customers in a professional, courteous, and
                    efficient manner. We want every customer to be 100% satisfied, so we will work with any customer who
                    has any
                    questions or concerns about their filings. Our customer service team is made up of dedicated
                    trademark
                    representatives with one goal - to meet each client’s needs in a friendly, caring, and efficient
                    manner. If
                    you do not think we have met this goal, let us know, and we will be happy to make every effort to
                    resolve
                    the issues to your satisfaction. If we don’t, please request a refund of the fees you paid to
                    (brandname) You can send us an email at <a
                        href="mailto:{{ config('var.email') }}">{{ config('var.email') }}</a> or call us toll-free at
                    <a href="tel:{{ config('var.phone') }}">{{ config('var.phone') }}</a>.
                </p>
                <p>If we make an error in your filing, Premises we will do our best to admit it and make the changes needed
                    to
                    fix the
                    correction as soon as we can at no additional cost to you. </p>
                <p>Please note only (brandname) fees are refundable all government fees involved in your filing
                    services
                    are non-refundable. The USPTO may experience delays or deny your application without any fault of
                    the
                    (brandname) These issues are out of our control and will not be the basis for a refund. </p>
                <p>If you decide that you want a refund, all such requests must be submitted within 30 days of purchase.
                    Your
                    refund will be issued in the same form that it was received. For example, if the payment to
                    (brandname), LLC was made by credit card, then the refund will be issued to the same credit
                    card
                    used to make the
                    payment. However, if you choose, you may request to receive a credit for future (brandname),
                    LLC
                    purchases/payments instead of a refund. All orders will expire six months from order date if we are
                    not in
                    active engagement with you at the one-year anniversary from your date of purchase and you will lose
                    any
                    rights to refunds or additional services at that time. If we are unable to file your order for any
                    reason,
                    outside of any error or mistake on our part, we reserve the right to keep a processing fee. Our
                    obligation
                    ceases when we file documents with the appropriate government agencies, and we are not responsible
                    for
                    delays from the agencies where documents are filed. You acknowledge that we are out of pocket time
                    and money
                    for taking your order with the intent to do the work. Abandoned orders will result in liquidated
                    damages
                    equal to the amount paid to us for reimbursement of our commitment to service this order.</p>

                <h3>Termination and cancellation</h3>
                <p>(a) Either (brandname) or you may terminate your Account. If (brandname) terminates your
                    Account, you will be notified by email and an explanation for the termination will be provided.
                    Notwithstanding the foregoing, we reserve the right to terminate without giving reasons.</p>
                <p>(b) If (brandname) terminates your Account, any current or pending orders or payments on your
                    Account will be cancelled and provision of Services will not commence.</p>
                <p>(c) (brandname) reserves the right to cancel orders or payments without stating reasons, for
                    any
                    reason prior to processing payment or commencing Services provision.</p>
                <p>(d) If you are purchasing as a consumer and not as a business, you have the right to cancel your
                    order for the Services within a statutory 7 working day cooling-off period. This period begins when
                    you receive written confirmation of your order from (brandname) If the provision of the
                    Services
                    commences within the cooling-off period, your right to cancel under this provision shall end.</p>
                <p>(e) If orders or payments are cancelled for any reason prior to commencement of Services provision
                    you will be refunded any monies paid in relation to those purchases.</p>
                <p>(f) If you terminate your Account any non-completed orders or payments will be cancelled and you will
                    be refunded any monies paid in relation to those orders.</p>
            </div>
        </div>
    </section>
    {{-- Privacy Policy Section End --}}
@endsection
