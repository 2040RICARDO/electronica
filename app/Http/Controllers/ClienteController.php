<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index(){
        $clientes =Cliente::select('cliente.id','persona.nombre','persona.apellidos','persona.ci','persona.celular','persona.direccion')
                            ->join('persona','persona.id','=','cliente.persona_id')
                            ->get();
        return Inertia::render('Cliente/Index',['clientes'=>$clientes]);                    
    }
}
