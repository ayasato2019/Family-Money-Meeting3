<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\LoginChildaccountRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class ChildaccountSessionController extends Controller
{
    /**
     * 子供用ログインページ
     */
    public function create(Request $request)
    {
            // team_idの値を取得
    $encryptedTeamId = $request->query('team_id');

    // 複合化してみる
    try {
        $teamId = Crypt::decryptString(urldecode($encryptedTeamId));
    } catch (\Exception $e) {
        // 複合化エラーになったらHTTP 400 (Bad Request) としてエラーメッセージを返す
        return response()->json(['error' => 'Invalid team_id'], 400);
    }
    // 復号化が成功した場合、元の team_id を JSON で返す

    return Inertia::render('Auth/LoginChildAccoount', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'teamId' => $teamId,
        ]);
    }

    /**
     * 子供用ログインロジック
     */

    public function store(LoginChildaccountRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
