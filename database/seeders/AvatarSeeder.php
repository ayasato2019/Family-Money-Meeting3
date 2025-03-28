<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvatarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('avatars')->insert([
            ['type' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

}
