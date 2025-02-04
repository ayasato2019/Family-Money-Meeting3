<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\LoginChildaccountRequest;
use Illuminate\Http\RedirectResponse;

class ChildaccountSessionController extends Controller
{
    /**
     * 子供用ログインページ
     */
    public function create(): Response
    {
        return Inertia::render('Auth/LoginChildAccoount', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * 子供用ログインロジック
     */

    public function store(LoginChildaccountRequest $request): RedirectResponse
    {
        dd($request);
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
