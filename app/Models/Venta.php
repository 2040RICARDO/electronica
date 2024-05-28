<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table='venta';
    public $timestamps = true;
    protected $fillable = [
        'fecha',
        'gestion',
        'codigoVenta',
        'totalVenta',
        'descripcion',
        'cliente_id',
        'estadoVenta',
    ];


}
