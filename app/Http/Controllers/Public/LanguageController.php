<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function setLanguage(Request $request)
    {
        $lang = $request->input('lang');

        $available = ['en', 'id', 'fr', 'ar', 'vi', 'zh', 'hi'];

        if (!in_array($lang, $available)) {
            return response()->json(['error' => 'Language not supported'], 400);
        }

        $request->session()->put('lang', $lang);

        return response()->json(['success' => true, 'lang' => $lang]);
    }
}
