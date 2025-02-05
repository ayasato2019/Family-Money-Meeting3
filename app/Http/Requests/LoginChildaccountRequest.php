<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class LoginChildaccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'team_id' => ['required', 'integer'],
            'birth_date' => ['required', 'date'],
            'password' => ['required', 'string'],
        ];
    }

        /**
     * 認証処理
     */
    public function authenticate()
    {
        // 1. ユーザーが入力したデータを取得
        $credentials = $this->only('team_id', 'birth_date', 'password');

        // 2. User モデルから team_id と birth_date でユーザーを検索
        $user = User::where('team_id', $credentials['team_id'])
                    ->where('birth_date', $credentials['birth_date'])
                    ->first();

        // 3. ユーザーが見つからない場合、バリデーションエラーを投げる
        if (!$user) {
            throw ValidationException::withMessages([
                'birth_date' => __('認証に失敗しました。'),
            ]);
        }

        // 4. パスワードが一致するかチェック
        if (!Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => __('パスワードが正しくありません。'),
            ]);
        }

        // 5. 認証成功 → ユーザーをログイン
        Auth::login($user);
    }
}
