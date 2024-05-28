<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProductoVenta;
use App\Models\Categoria;
use App\Models\ProductoEntrada;
use App\Models\Producto;
use App\Models\Persona;
use App\Models\Cliente;
use App\Models\Setting;
use App\Models\Venta;
use Barryvdh\DomPDF\Facade\Pdf;

class ReporteController extends Controller
{

    public function categoria($estado){

        $categorias = Categoria::where(function ($query)use($estado){
            if($estado != 4){
                $query->where('estado',$estado);
            }
        })
        ->orderBy('id')
        ->get();

        $pdf = Pdf::loadView('report.categoria',compact('categorias'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }

    public function producto($estado,$productoId,$categoriaId){

        $productos = Producto::select('producto.*','categoria.categoria')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->where(function($query)use($estado,$productoId,$categoriaId){
                                    if($estado != 4){
                                        $query->where('producto.estado',$estado);
                                    }
                                    if($productoId != 'general'){
                                        $query->where('producto.id',$productoId);
                                    }
                                    if($categoriaId != 'general'){
                                        $query->where('categoria.id',$categoriaId);
                                    }
                                })
                                ->orderBy('id')
                                ->get();
        $pdf = Pdf::loadView('report.producto',compact('productos'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();
    }


    public function productoEntrada($fechaInicio,$fechaFinal,$productoId,$categoriaId){
        $productoEntradas = ProductoEntrada::select('producto_entrada.*','producto.nombre as producto_nombre','producto.codigo','producto.editControl','categoria.categoria')
                                ->join('producto','producto.id','=','producto_entrada.producto_id')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->whereBetween('fecha',[$fechaInicio,$fechaFinal])
                                ->where(function($query)use($productoId,$categoriaId){
                                    if($productoId != 'general'){
                                        $query->where('producto.id',$productoId);
                                    }
                                    if($categoriaId != 'general'){
                                        $query->where('categoria.id',$categoriaId);
                                    }
                                })
                                ->orderBy('producto_entrada.id')
                                ->get();
                                
        $pdf = Pdf::loadView('report.productoEntrada',compact('productoEntradas','fechaInicio','fechaFinal'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();                        
    }

    public function productoVenta($fechaInicio,$fechaFinal,$productoId,$categoriaId,$estado){
  
        $ventas = Venta::select('venta.*','persona.nombre','persona.apellidos','persona.ci','persona.celular','persona.direccion')
                            ->join('cliente','cliente.id','=','venta.cliente_id')
                            ->join('persona','persona.id','=','cliente.persona_id')
                            ->where(function($query)use($estado){
                                if($estado != 4){
                                    $query->where('venta.estadoVenta',$estado);
                                }
                            })
                            ->whereBetween('fecha',[$fechaInicio,$fechaFinal])
                            ->orderBy('venta.id')
                            ->get();

        foreach($ventas as $value){
            $productos=ProductoVenta::select('producto_venta.cantidad' ,'producto_venta.precioUnitario','producto_venta.totalVenta as totalProductoVenta','producto.nombre as nombreProducto','categoria.categoria','producto_venta.id as productoVentaId')
                                ->join('producto','producto.id','producto_venta.producto_id')
                                ->join('categoria','categoria.id','producto.categoria_id')
                                ->join('venta','venta.id','producto_venta.venta_id')
                                ->where('producto_venta.venta_id',$value->id)
                                ->where(function($query)use($productoId,$categoriaId){
                                    if($productoId != 'general'){
                                        $query->where('producto.id',$productoId);
                                    }
                                    if($categoriaId != 'general'){
                                        $query->where('categoria.id',$categoriaId);
                                    }
                                })
                                ->get();
            $value->productos= $productos;               
        }

      
        $pdf = Pdf::loadView('report.productoVenta',compact('ventas','fechaInicio','fechaFinal'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();  
    }


    

    public function cliente(){
        $clientes =Cliente::select('cliente.id','persona.nombre','persona.apellidos','persona.ci','persona.celular','persona.direccion')
        ->join('persona','persona.id','=','cliente.persona_id')
        ->get();

        $pdf = Pdf::loadView('report.cliente',compact('clientes'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();  
    }


    public function reciboVenta($id){
        $venta = Venta::select('venta.*','persona.nombre','persona.apellidos','persona.ci','persona.celular','persona.direccion')
                        ->join('cliente','cliente.id','=','venta.cliente_id')
                        ->join('persona','persona.id','=','cliente.persona_id')
                        ->where('venta.id',$id)
                        ->orderBy('venta.id')
                        ->first();

 
        $productos=ProductoVenta::select('producto_venta.cantidad' ,'producto_venta.precioUnitario','producto_venta.totalVenta as totalProductoVenta','producto.nombre as nombreProducto','categoria.categoria','producto_venta.id as productoVentaId')
                        ->join('producto','producto.id','producto_venta.producto_id')
                        ->join('categoria','categoria.id','producto.categoria_id')
                        ->join('venta','venta.id','producto_venta.venta_id')
                        ->where('producto_venta.venta_id',$venta->id)
                        ->get();

        $venta->productos= $productos;

      
        $pdf = Pdf::loadView('report.reciboVenta',compact('venta'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();  
    }
}
