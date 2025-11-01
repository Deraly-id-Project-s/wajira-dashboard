<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Product Permissions
        Permission::create(['name' => 'product:list']);
        Permission::create(['name' => 'product:edit']);
        Permission::create(['name' => 'product:create']);
        Permission::create(['name' => 'product:delete']);
        Permission::create(['name' => 'product:export']);
        
        // Galleries Permissions
        Permission::create(['name' => 'gallery:list']);
        Permission::create(['name' => 'gallery:edit']);
        Permission::create(['name' => 'gallery:create']);
        Permission::create(['name' => 'gallery:delete']);

        // Galleries Permissions
        Permission::create(['name' => 'banner:list']);
        Permission::create(['name' => 'banner:edit']);
        Permission::create(['name' => 'banner:create']);
        Permission::create(['name' => 'banner:delete']);

        // Permission Permissions
        Permission::create(['name' => 'permissions:list']);
        Permission::create(['name' => 'permissions:edit']);
        Permission::create(['name' => 'permissions:create']);
        Permission::create(['name' => 'permissions:delete']);
        Permission::create(['name' => 'permissions:export']);

        // User Permissions
        Permission::create(['name' => 'users:list']);
        Permission::create(['name' => 'users:edit']);
        Permission::create(['name' => 'users:create']);
        Permission::create(['name' => 'users:delete']);
        Permission::create(['name' => 'users:export']);
        
        // Administrator Role
        Role::create(['name' => 'administrator'])->givePermissionTo(Permission::all());
    }
}