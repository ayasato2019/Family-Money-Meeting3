<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
//     /**
//      * A basic test example.
//      */
//     public function test_the_application_returns_a_successful_response(): void
//     {
//         $response = $this->get('/');

//         $response->assertStatus(200);
//     }
public function test_sample1(): void
{
    $response = $this->get('/');

    dump(config('session.lifetime'));   // 現在のセッション時間を出力
    config(['session.lifetime' => 10]); // セッション時間を10分に変更
    dump(config('session.lifetime'));   // 変更後のセッション時間を出力

    $response->assertStatus(200);
}

public function test_sample2(): void
{
    $response = $this->get('/');

    dump(config('session.lifetime'));  // 現在のセッション時間を出力

    $response->assertStatus(200);
}

// protected function setUp(): void
// {
//     parent::setUp();

//     dump('setUp');
// }

// protected function tearDown(): void
// {
//     dump('tearDown');

//     parent::tearDown();
// }

// public function test_sample1(): void
// {
//     $response = $this->get('/');

//     dump('sample1');

//     $response->assertStatus(200);
// }

// public function test_sample2(): void
// {
//     $response = $this->get('/');

//     dump('sample2');

//     $response->assertStatus(200);
// }
}

