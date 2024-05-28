<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoEntrada extends Model
{
    protected $table='producto_entrada';
    public $timestamps = true;

    protected $fillable = [
        'cantidad',
        'descripcion',
        'fecha',
        'costoUnitario',
        'costoTotal',
        'producto_id',
    ];
}
