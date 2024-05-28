<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProductoEntradaController;
use App\Http\Controllers\ProductoVentaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\WelcomeController;


Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('ver/producto/{categoriaId?}', [WelcomeController::class, 'producto'])->name('producto.ver');
Route::get('lista/producto', [WelcomeController::class, 'producto_lista'])->name('producto.lista');
Route::get('finalizar/producto/{mensaje?}', [WelcomeController::class, 'producto_finalizar'])->name('producto.finalizar');
Route::post('register/producto', [WelcomeController::class, 'producto_register'])->name('producto.register');

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::get('categoria/index/{mensaje?}',[CategoriaController::class, 'index'])->name('categoria.index');
    Route::get('categoria/create',[CategoriaController::class, 'create'])->name('categoria.create');
    Route::post('categoria/store',[CategoriaController::class, 'store'])->name('categoria.store');
    Route::get('categoria/edit/{id}',[CategoriaController::class, 'edit']);
    Route::put('categoria/update',[CategoriaController::class, 'update'])->name('categoria.update');

    Route::get('producto/index/{mensaje?}',[ProductoController::class, 'index'])->name('producto.index');
    Route::get('producto/create',[ProductoController::class, 'create'])->name('producto.create');
    Route::post('producto/store',[ProductoController::class, 'store'])->name('producto.store');
    Route::get('producto/edit/{id}',[ProductoController::class, 'edit']);
    Route::post('producto/update',[ProductoController::class, 'update'])->name('producto.update');

    Route::get('productoEntrada/index/{mensaje?}',[ProductoEntradaController::class, 'index'])->name('productoEntrada.index');
    Route::get('productoEntrada/create',[ProductoEntradaController::class, 'create'])->name('productoEntrada.create');
    Route::post('productoEntrada/store',[ProductoEntradaController::class, 'store'])->name('productoEntrada.store');
    Route::get('productoEntrada/edit/{id}',[ProductoEntradaController::class, 'edit']);
    Route::put('productoEntrada/update',[ProductoEntradaController::class, 'update'])->name('productoEntrada.update');

    Route::get('productoVenta/index/{mensaje?}',[ProductoVentaController::class, 'index'])->name('productoVenta.index');
    Route::get('productoVenta/create',[ProductoVentaController::class, 'create'])->name('productoVenta.create');
    Route::post('productoVenta/store',[ProductoVentaController::class, 'store'])->name('productoVenta.store');
    Route::get('productoVenta/edit/{id}',[ProductoVentaController::class, 'edit']);
    Route::put('productoVenta/update',[ProductoVentaController::class, 'update'])->name('productoVenta.update');
    Route::get('productoVenta/validar_pedido/{id}',[ProductoVentaController::class, 'validar_pedido']);

    Route::post('productoVenta/estado',[ProductoVentaController::class, 'estado'])->name('productoVenta.estado');
    Route::get('cliente/index',[ClienteController::class, 'index'])->name('cliente.index');


    Route::get('reporte/categoria/{estado}', [ReporteController::class, 'categoria']);
    Route::get('reporte/producto/{estado}/{productoId}/{categoriaId}', [ReporteController::class, 'producto']);
    Route::get('reporte/productoEntrada/{fechaFinal}/{fechaInicio}/{productoId}/{categoriaId}', [ReporteController::class, 'productoEntrada']);
    Route::get('reporte/productoVenta/{fechaFinal}/{fechaInicio}/{productoId}/{categoriaId}/{estado}', [ReporteController::class, 'productoVenta']);


    Route::get('reporte/reciboVenta/{id}', [ReporteController::class, 'reciboVenta']);

    Route::get('reporte/cliente', [ReporteController::class, 'cliente']);


});

require __DIR__.'/auth.php';
