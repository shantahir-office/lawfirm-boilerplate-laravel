<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FrontendController extends Controller
{
    public function home()
    {
        return view('frontend.pages.home', [
            'title' => 'Home | ' . config('var.website_name'),
            'description' => '',
            'keywords' => '',
        ]);
    }

    public function about()
    {
        return view('frontend.pages.about', [
            'title' => 'About | ' . config('var.website_name'),
            'description' => '',
            'keywords' => '',
        ]);
    }

    public function contact()
    {
        return view('frontend.pages.contact', [
            'title' => 'Contact | ' . config('var.website_name'),
            'description' => '',
            'keywords' => '',
        ]);
    }

   public function commercialLaw()
{
    return view('frontend.pages.commercial-law', [
        'title' => 'Commercial Law | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}

public function enterpriseLaw()
{
    return view('frontend.pages.enterprise-law', [
        'title' => 'Enterprise Law | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}

public function immigrationLaw()
{
    return view('frontend.pages.immigration-law', [
        'title' => 'Immigration Law | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}

public function intellectualPropertyRights()
{
    return view('frontend.pages.intellectual-property-rights', [
        'title' => 'Intellectual Property Rights | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}

public function laborEmploymentLaw()
{
    return view('frontend.pages.labor-employment-law', [
        'title' => 'Labor & Employment Law | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}

public function legalDisputes()
{
    return view('frontend.pages.legal-disputes', [
        'title' => 'Legal Disputes | ' . config('var.website_name'),
        'description' => '',
        'keywords' => '',
    ]);
}
    public function thankyou()
    {
        return view(
            'frontend.pages.thankyou',
            [
                'title' => 'Thank You | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function thankYou2()
    {
        return view(
            'frontend.pages.thank-you',
            [
                'title' => 'Thank You | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function thankYou3()
    {
        return view(
            'frontend.pages.thankyou3',
            [
                'title' => 'Thank You | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function privacyPolicy()
    {
        return view(
            'frontend.pages.privacy-policy',
            [
                'title' => 'Privacy Policy | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function termsAndConditions()
    {
        return view(
            'frontend.pages.terms-and-conditions',
            [
                'title' => 'Terms and Conditions | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function lpPrivacyPolicy()
    {
        return view(
            'frontend.pages.privacy-policy',
            [
                'title' => 'Privacy Policy | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }

    public function lpTermsAndConditions()
    {
        return view(
            'frontend.pages.terms-and-conditions',
            [
                'title' => 'Terms and Conditions | '.config('var.website_name'),
                'description' => '',
            ]
        );
    }


    public function lpDash1RegisterYourTrademark()
    {
        return view(
            'frontend.pages.lp-1.register-your-trademark',
            [
                'title' => 'Trademark Business Name | (brandname)',
                'description' => 'Trademark Your Business Name, Logo, and Slogan For Just $49!',
                'keywords' => '',
            ]
        );
    }

    public function lpDash4RegisterYourTrademark()
    {
        return view(
            'frontend.pages.lp-4.register-your-trademark',
            [
                'title' => 'Trademark Business Name | (brandname)',
                'description' => 'Trademark Your Business Name, Logo, and Slogan For Just $49!',
                'keywords' => '',
            ]
        );
    }

    // News LP's

    public function lpDash1NewRegisterYourTrademark()
    {
        return view(
            'frontend.pages.lp-1-new.register-your-trademark',
            [
                'title' => 'Trademark Business Name | (brandname)',
                'description' => 'Trademark Your Business Name, Logo, and Slogan For Just $49!',
                'keywords' => '',
            ]
        );
    }

    public function lpDash4NewRegisterYourTrademark()
    {
        return view(
            'frontend.pages.lp-4-new.register-your-trademark',
            [
                'title' => 'Trademark Business Name | (brandname)',
                'description' => 'Trademark Your Business Name, Logo, and Slogan For Just $49!',
                'keywords' => '',
            ]
        );
    }

    public function Web_Sequence_1()
    {
        return Inertia::render('SequenceWeb/Step01');
    }

    // ############## Sequence 1 Routes ###################
    public function defaultlpStep1()
    {
        return Inertia::render('lpdefaultsequence/Step1');
    }

    public function defaultlpStep2()
    {
        return Inertia::render('lpdefaultsequence/Step2');
    }

    public function defaultlpStep3()
    {
        return Inertia::render('lpdefaultsequence/Step3');
    }

    public function defaultlpStep4()
    {
        return Inertia::render('lpdefaultsequence/Step4');
    }

    public function defaultlpStep5()
    {
        return Inertia::render('lpdefaultsequence/Step5');
    }

    public function defaultlpStep6()
    {
        return Inertia::render('lpdefaultsequence/Step6');
    }

    // lp-1 sequence pages
    public function lp1Step1()
    {
        return Inertia::render('lp1Sequence/Step1');
    }

    public function lp1Step2()
    {
        return Inertia::render('lp1Sequence/Step2');
    }

    public function lp1Step3()
    {
        return Inertia::render('lp1Sequence/Step3');
    }

    public function lp1Step4()
    {
        return Inertia::render('lp1Sequence/Step4');
    }

    public function lp1Step5()
    {
        return Inertia::render('lp1Sequence/Step5');
    }

    public function lp1Step6()
    {
        return Inertia::render('lp1Sequence/Step6');
    }

    // lp4 sequence pages
    public function Lp4Step1()
    {
        return Inertia::render('lp4sequence/Step1');
    }

    public function Lp4Step2()
    {
        return Inertia::render('lp4sequence/Step2');
    }

    public function Lp4Step3()
    {
        return Inertia::render('lp4sequence/Step3');
    }

    public function Lp4Step4()
    {
        return Inertia::render('lp4sequence/Step4');
    }

    // lp-4 sequence pages
    public function lp4DashStep1()
    {
        return Inertia::render('lp4DashSequence/Step1');
    }

    public function lp4DashStep2()
    {
        return Inertia::render('lp4DashSequence/Step2');
    }

    public function lp4DashStep3()
    {
        return Inertia::render('lp4DashSequence/Step3');
    }

    public function lp4DashStep4()
    {
        return Inertia::render('lp4DashSequence/Step4');
    }

    public function reactInvoicePayment()
    {
        return view(
            'frontend.pages.invoice.Invoice',
            [
                'title' => 'Invoice | '.config('var.website_name'),
                'description' => '',
                'keywords' => '',
            ]
        );
    }
}
