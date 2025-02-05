<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

Route::get('/decrypt-team-id', function (Request $request) {
    try {
        $decryptedTeamId = Crypt::decryptString($request->query('team_id'));
        return response()->json(['team_id' => $decryptedTeamId]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Invalid team_id'], 400);
    }
});
