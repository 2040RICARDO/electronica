<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table='producto';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'codigo',
        'precio',
        'imagenProducto',
        'stock',
        'estado',
        'descripcion',
        'categoria_id',
    ];
}
