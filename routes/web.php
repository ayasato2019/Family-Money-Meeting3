<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;

/* LP ゲスト用ページ */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// /*ログイン */
// Route::get('/login', function () {
//     return Inertia::render('Auth.Login', [AuthenticatedSessionController::class, 'create'])->name('login');
// });
// Route::get('/register', function () {
//     return Inertia::render('Auth.Register', [AuthenticatedSessionController::class, 'store'])->name('register');
// });

/*マイページ トップ */
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/* チームのページ メンバー一覧・チーム作成 */
Route::middleware(['auth'])->group(function () {
    Route::get('/teams_registration', [TeamController::class, 'create'])->name('teams-create');
    Route::post('/teams_confirm', [TeamController::class, 'store'])->name('teams-store');
    /* チームのページ メンバー一覧・チーム修正 */
    Route::get('/teams_retouching', [TeamController::class, 'edit'])->name('teams-edit');
    Route::post('/teams_retouching_done', [TeamController::class, 'update'])->name('teams-update');
    /* チームのページ メンバー一覧・チーム修正 */
    // Route::get('/teams_member', [TeamMemberController::class, 'create'])->name('teams-member');
    // Route::post('/teams_member_add', [TeamMemberController::class, 'store'])->name('teams-member-add');
});

/* チームのページ 親カテゴリのみ家計簿ページ */
Route::get('/household_account_book', function () {
    return Inertia::render('HouseholdAccountBook');
})->middleware(['auth', 'verified'])->name('household');

Route::middleware('auth')->group(function () {
    //プロフィール
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // //初期ステータスの登録
    // Route::get('/firststep_registration', [StatusController::class, 'create'])->name('first-create');
    // Route::post('/firststep_confirm', [StatusController::class, 'store'])->name('first-store');
    // //貯金の登録
    // Route::get('/saving-registration', [SavingController::class, 'create'])->name('saving-create');
    // Route::post('/savin-confirm', [SavingController::class, 'store'])->name('saving-confirm');
    // //投資の登録
    // Route::get('/investment-registration', [InvestmentController::class, 'create'])->name('investment-create');
    // Route::post('/investment-confirm', [InvestmentController::class, 'store'])->name('investment-confirm');
    // //必要の登録
    // Route::get('/expenses-registration', [ExpensesController::class, 'create'])->name('expenses-create');
    // Route::post('/expenses-confirm', [ExpensesController::class, 'store'])->name('expenses-confirm');
    // //欲しいの登録
    // Route::get('/extravagance-registration', [ExtravaganceController::class, 'create'])->name('extravagance-create');
    // Route::post('/extravagance-confirm', [ExtravaganceController::class, 'store'])->name('extravagance-confirm');
    // //寄付の登録
    // Route::get('/donation-registration', [DonationController::class, 'create'])->name('donation-create');
    // Route::post('/donation-confirm', [DonationController::class, 'store'])->name('donation-confirm');
    // // ゲームページ
    // Route::get('/game-registration', [GameController::class, 'create'])->name('game-create');
    // Route::post('/game-confirm', [GameController::class, 'store'])->name('game-confirm');
    // //ユーザーページ
    // Route::get('/userpage', [StatusController::class, 'index'])
    //     ->middleware(['auth', 'verified'])->name('Saving_List');
    // //目標の詳細ページ
    // Route::get('/{id}', [SavingController::class, 'show'])->name('saving.show');
    // Route::post('/update', [HistoryController::class, 'store'])->name('update');
});

require __DIR__ . '/auth.php';
