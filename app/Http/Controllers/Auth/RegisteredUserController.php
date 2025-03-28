<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'birth_date' => 'date',
            'avatar' => 'required|integer',
            'role' => 'required|integer',
            'is_active' => 'required|integer',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // dd($request->all()); // これが表示されない場合

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'avatar' => $request->avatar,
            'role' => $request->role,
            'is_active' => $request->is_active,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));

        Auth::login($user);
        return redirect(route('dashboard', absolute: false));
    }
}
