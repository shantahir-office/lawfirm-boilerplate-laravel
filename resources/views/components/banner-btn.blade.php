@props([
    'text' => 'Get Free Consultation',
    'href' => null,
    'btnClass' => 'btn btn-primary group text-center justify-center',
    'ariaLabel' => null,
    'function' => null,
    'type' => 'link',
    'showArrow' => true,
])

@if ($type === 'button')
    <button type="button" class="{{ $btnClass }}" aria-label="{{ $ariaLabel ?? $text }}"
        @if ($function) onclick="{{ $function }}" @endif>

        @if ($showArrow)
            <img src="{{ asset('assets/images/icons/chat-icon.svg') }}" alt="arrow icon" loading="lazy" width="15"
                height="15" />
        @endif
        {{ $text }}


    </button>
@else
    <a href="{{ $href ?? route('Web_Sequence_1') }}" class="btn {{ $btnClass }}"
        aria-label="{{ $ariaLabel ?? $text }}">

        @if ($showArrow)
            <img src="{{ asset('assets/images/icons/chat-icon.svg') }}" alt="arrow icon" loading="lazy" width="15"
                height="15" />
        @endif
        {{ $text }}


    </a>
@endif
