<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/svg" href="{{ asset('assets/favicon.svg') }}">

        <title inertia>{{ config('app.name', 'Wajira Corps') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
            pageLanguage: 'en', // bahasa default situsmu
            includedLanguages: 'id,en,fr,de,es,ja,ko,zh-CN,ar,ru', // bahasa yang diizinkan
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
            }, 'google_translate_element');
        }
    </script>

    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    <body class="font-sans antialiased">
        @inertia

        <style>
            /* Hapus banner biru di atas halaman */
            .goog-te-banner-frame.skiptranslate {
            display: none !important;
            }
            iframe.goog-te-banner-frame {
            display: none !important;
            }

            /* Pastikan body tidak terdorong ke bawah */
            body {
            top: 0px !important;
            position: static !important;
            }

            /* Sembunyikan toolbar mini Google di pojok bawah */
            .goog-logo-link, .goog-te-gadget span {
            display: none !important;
            }

            .goog-te-gadget {
            font-size: 0 !important;
            }

            /* Sembunyikan frame menu terjemahan */
            iframe.goog-te-menu-frame {
            display: none !important;
            }

            /* Sembunyikan area default bawaan Google */
            .goog-te-gadget-simple {
            border: none !important;
            background: transparent !important;
            }
        </style>
    </body>
</html>
