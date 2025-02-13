<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHouseholdRequest;
use App\Http\Requests\UpdateHouseholdRequest;
use App\Models\Household;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Team;

class HouseholdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * 家計簿を閲覧させる
     */
    public function create()
    {
        // チームの家計簿を取得
        $team_id = Auth::user()->team_id;
        $household = Household::where('team_id', $team_id)->get();

        return Inertia::render(
            'Household/Household',
            compact(
                'household',
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHouseholdRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Household $household)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Household $household)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHouseholdRequest $request, Household $household)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // IDで家計簿データを取得し、現在のユーザーのチームに紐づくデータのみ対象にする
        $household = Household::where('id', $id)
            ->where('team_id', Auth::user()->team_id) // 他のチームのデータ削除防止
            ->first();

        $household->delete();
        dd($household);
        return redirect()->route('Household/Household',
            compact(
                'household',
            )
        );
    }
}
