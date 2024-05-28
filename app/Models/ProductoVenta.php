<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoVenta extends Model
{
    protected $table='producto_venta';
    public $timestamps = true;

    protected $fillable = [

        'cantidad',
        'precioUnitario',
        'totalVenta',
        'producto_id',
        'venta_id'
    ];

}
