<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\ProductoVenta;
use App\Models\Producto;
use App\Models\Persona;
use App\Models\Cliente;
use App\Models\Categoria;
use App\Models\Setting;
use App\Models\Venta;
use Validator;
use Auth;

class ProductoVentaController extends Controller
{
    public function index($mensaje=null){

            $ventas = Venta::select('venta.*','persona.nombre','persona.apellidos','persona.ci','persona.celular','persona.direccion')
                            ->join('cliente','cliente.id','=','venta.cliente_id')
                            ->join('persona','persona.id','=','cliente.persona_id')
                            ->orderBy('venta.id')
                            ->get();

            foreach($ventas as $value){
                $productos=ProductoVenta::select('producto_venta.cantidad' ,'producto_venta.precioUnitario','producto_venta.totalVenta as totalProductoVenta','producto.nombre as nombreProducto','categoria.categoria','producto_venta.id as productoVentaId')
                                    ->join('producto','producto.id','producto_venta.producto_id')
                                    ->join('categoria','categoria.id','producto.categoria_id')
                                    ->join('venta','venta.id','producto_venta.venta_id')
                                    ->where('producto_venta.venta_id',$value->id)
                                    ->get();
                $value->productos= $productos;               
            }
   
            $productos = Producto::select('producto.*','categoria.categoria')
            ->join('categoria','categoria.id','=','producto.categoria_id')
            ->orderBy('id')
            ->get();

            $categorias = Categoria::where('estado',true)
            ->orderBy('id')
            ->get();

       return Inertia::render('ProductoVenta/Index',['ventas'=>$ventas,'mensaje'=>$mensaje,'productos'=>$productos,'categorias'=>$categorias]); 
    }


    public function create(){
        $productos=Producto::where('estado',true)->orderBy('id')->get();
        $personas = Persona::all();
        return Inertia::render('ProductoVenta/Create',['productos'=>$productos,'personas'=>$personas]); 
    }

    


    public function store(Request $request){
        try{
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'apellidos' => 'required|min:3|max:500',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            if(count($request->listaVenta) == 0 ){
          
                return redirect()->back()->with('mensaje','No hay ventas');
            }

            $setting=Setting::find(1);

            if($request->NpersonaId != null){
                $persona=Persona::find($request->NpersonaId);
            }else{
                $persona=new Persona;
            }
            $persona->nombre = $request->nombre;
            $persona->apellidos = $request->apellidos;
            $persona->ci = $request->ci;
            $persona->celular = $request->celular;
            $persona->direccion = $request->direccion;
            if($request->NpersonaId != null){
                $persona->update();
            }else{
                $persona->save();
            }
            $cliente=Cliente::find($persona->id);

            if($cliente == null){
                $cliente=new Cliente;
                $cliente->persona_id=$persona->id;
                $cliente->save();
            }

            $venta=new Venta;
            $venta->fecha = date('Y-m-d');
            $venta->gestion =date('Y');
            $venta->descripcion = $request->descripcion;
            $venta->codigoVenta = 'VL-'.$setting->venta;
            $venta->cliente_id = $cliente->id;
            $venta->estadoVenta = 1;
            $venta->save();

            $total=0;

            foreach($request->listaVenta as $value){
                $producto = Producto::find($value['productoId']);
                $producto->stock = $producto->stock -  $value['Ncantidad'];
                
                $producto->update();
                if($producto->stock < 0 ){
                    $producto->stock =0;
                    $producto->update();
                }

                $productoVenta= new ProductoVenta;
                $productoVenta->cantidad= $value['Ncantidad'];
                $productoVenta->precioUnitario= $value['Nprecio'];
                $productoVenta->totalVenta= $value['Ncantidad'] * $value['Nprecio'];
                $productoVenta->producto_id=$value['productoId'];
                $productoVenta->venta_id=$venta->id;
                $productoVenta->save();
                $total=$total+$productoVenta->totalVenta;

                
            }

            $venta->totalVenta = $total;
            $venta->update();
            $setting->venta = $setting->venta +1;
            $setting->update();
        
            return redirect()->route('productoVenta.index','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }


    public function edit($id){

    }




    public function update(Request $request){
 
    }

    public function estado(Request $request){

       $venta=Venta::find($request->ventaId);
       $venta->estadoVenta = 0 ;
       $venta->update();

        if(count($request->productIdS) != 0){
            $produtoVentas =ProductoVenta::whereIn('id',$request->productIdS)->get();
            foreach ($produtoVentas as  $value) {
                $producto = Producto::find($value->producto_id);
                $producto->stock =  $producto->stock +$value->cantidad;
                $producto->update();
            }
        }


        return redirect()->route('productoVenta.index','Estado modificado con exito!');
    }

    public function validar_pedido($id){
        try{

            $venta = Venta::find($id);
            $venta->estadoVenta = 1;
            $venta->update();

            return redirect()->back()->with('mensaje','Pedido validado con exito!');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }


}
