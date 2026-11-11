<?php

use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Default Routes
Route::get('/', [FrontendController::class, 'home'])->name('/');
Route::get('/home', [FrontendController::class, 'home'])->name('home');
Route::get('/about', [FrontendController::class, 'about'])->name('about');
Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
Route::get('thankyou', [FrontendController::class, 'thankyou'])->name('thankyou');
Route::get('/thank-you', [FrontendController::class, 'thankyou2'])->name('thank.you2');
Route::get('/thank_you', [FrontendController::class, 'thankyou3'])->name('thank.you3');
Route::get('/privacy-policy', [FrontendController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-and-conditions', [FrontendController::class, 'termsAndConditions'])->name('termsAndConditions');
Route::get('/empty', [FrontendController::class, 'empty'])->name('empty');

// Services Routes  
Route::get('/commercial-law', [FrontendController::class, 'commercialLaw'])->name('commercial-law');
Route::get('/enterprise-law', [FrontendController::class, 'enterpriseLaw'])->name('enterprise-law');
Route::get('/immigration-law', [FrontendController::class, 'immigrationLaw'])->name('immigration-law');
Route::get('/intellectual-property-rights', [FrontendController::class, 'intellectualPropertyRights'])->name('intellectual-property-rights');
Route::get('/labor-employment-law', [FrontendController::class, 'laborEmploymentLaw'])->name('labor-employment-law');
Route::get('/legal-disputes', [FrontendController::class, 'legalDisputes'])->name('legal-disputes');



// LP
Route::get('/lp/privacy-policy', [FrontendController::class, 'lpPrivacyPolicy'])->name('lp-privacy-policy');
Route::get('/lp/terms-and-conditions', [FrontendController::class, 'lpTermsAndConditions'])->name('lp-terms-and-conditions');
Route::get('/lp-1/register-your-trademark', [FrontendController::class, 'lpDash1RegisterYourTrademark'])->name('lp-dash-1-register-your-trademark');
Route::get('/lp-4/register-your-trademark', [FrontendController::class, 'lpDash4RegisterYourTrademark'])->name('lp-dash-4-register-your-trademark');

// New LP's
Route::get('/lp-1-new/register-your-trademark', [FrontendController::class, 'lpDash1NewRegisterYourTrademark'])->name('lp-dash-1-new-register-your-trademark');
Route::get('/lp-4-new/register-your-trademark', [FrontendController::class, 'lpDash4NewRegisterYourTrademark'])->name('lp-dash-4-new-register-your-trademark');

// ############## Sequence 1 old Routes ###################
Route::get('lp/sequence/step1', [FrontendController::class, 'defaultlpStep1'])->name('defaultlpStep1');
Route::get('lp/sequence/step2', [FrontendController::class, 'defaultlpStep2'])->name('defaultlpStep2');
Route::get('lp/sequence/step3', [FrontendController::class, 'defaultlpStep3'])->name('defaultlpStep3');
Route::get('lp/sequence/step4', [FrontendController::class, 'defaultlpStep4'])->name('defaultlpStep4');
Route::get('lp/sequence/step5', [FrontendController::class, 'defaultlpStep5'])->name('defaultlpStep5');
Route::get('lp/sequence/step6', [FrontendController::class, 'defaultlpStep6'])->name('defaultlpStep6');



// ############## lp-4 Routes ###################
Route::get('/lp-4/sequence/step1', [FrontendController::class, 'lp4DashStep1'])->name('lp4DashStep1');
Route::get('/lp-4/sequence/step2', [FrontendController::class, 'lp4DashStep2'])->name('lp4DashStep2');
Route::get('/lp-4/sequence/step3', [FrontendController::class, 'lp4DashStep3'])->name('lp4DashStep3');
Route::get('/lp-4/sequence/step4', [FrontendController::class, 'lp4DashStep4'])->name('lp4DashStep4');

// ############## Sequence lp-1 Routes ###################
Route::get('lp-1/sequence/step1', [FrontendController::class, 'lp1Step1'])->name('lp1Step1');
Route::get('lp-1/sequence/step2', [FrontendController::class, 'lp1Step2'])->name('lp1Step2');
Route::get('lp-1/sequence/step3', [FrontendController::class, 'lp1Step3'])->name('lp1Step3');
Route::get('lp-1/sequence/step4', [FrontendController::class, 'lp1Step4'])->name('lp1Step4');
Route::get('lp-1/sequence/step5', [FrontendController::class, 'lp1Step5'])->name('lp1Step5');
Route::get('lp-1/sequence/step6', [FrontendController::class, 'lp1Step6'])->name('lp1Step6');


Route::get('/web/sequence/step1', [FrontendController::class, 'Web_Sequence_1'])->name('Web_Sequence_1');
Route::get('/invoice/payment', [FrontendController::class, 'reactInvoicePayment'])->name('react.invoice.payment');
// Clear Caches Routes
Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    return "Caches cleared successfully!";
});
