<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $administrator = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'client.admin@deraly.id',
            'password' => bcrypt('rootme')
        ]);

        $administrator->assignRole('administrator');
    }
}
