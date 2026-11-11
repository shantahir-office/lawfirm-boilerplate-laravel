<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/webp" href="{{ asset('assets/images/fav.webp') }}">
    <title>Invoice Payment | {{ config('var.website_name') }}</title>
</head>

<body style="margin:0px; padding:0px; overflow:hidden; overflow-y:auto;">

    <script src="https://flycdn.org/assets/scripts/invoice/snippet.js?key={{ env('VITE_TOKEN') }}" async></script>

</body>

</html>
