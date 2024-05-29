<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Models\Categoria;
use App\Models\Producto;

use App\Models\Setting;
use App\Models\Persona;
use App\Models\Cliente;
use App\Models\Venta;
use App\Models\ProductoVenta;

use Validator;
use Auth;




class WelcomeController extends Controller
{
    public function index()
    {

        $categorias = Categoria::orderBy('id')->get();
        return view('welcome',compact('categorias'));
    
        /* return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categorias'=>$categorias

        ]); */
    }

    public function producto($categoriaId=null){

     
        $categoria =Categoria::where(function($query)use($categoriaId){
            if($categoriaId != null){
          
                $query->where('id',$categoriaId);
            }
        })->first();
     
  
        $productos = Producto::select('producto.*','categoria.categoria')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->where('producto.estado',1)
                                ->where(function($query)use($categoria){
                                    if($categoria != null){
                                        $query->where('producto.categoria_id',$categoria->id);
                                    }
                                })
                                ->orderBy('id')
                                ->get();
 
        $categorias = Categoria::where('estado',true)
                                ->orderBy('id')
                                ->get();

                                
        return Inertia::render('ListaProducto', [
            'productos'=>$productos,
            'categorias'=>$categorias,
            'categoria'=>$categoria
        ]);
    }

    public function producto_lista(){

     
                                
        return Inertia::render('CompraProducto');
    }




    public function producto_finalizar($mensaje=null){
        return Inertia::render('FinalizarPedido',['mensaje'=>$mensaje]);
    }





    public function producto_register(Request $request){
      
         
        try{
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'apellidos' => 'required|min:3|max:500',
                'ci' => 'required|numeric',
                'celular' => 'required|numeric',
                'direccion' => 'required',
            ]);


            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            if(count($request->carrito) == 0 ){
          
                return redirect()->back()->with('mensaje','No hay ventas');
            }
           

            $setting=Setting::find(1);

            $per_exis =null;
            if($request->ci){
                $per_exis=Persona::select('id')->where('ci',trim(strtoupper($request->ci)))->first();
            }

            if($per_exis != null){
                $persona = Persona::find($per_exis->id);
            }else{
                $persona=new Persona;
                $persona->nombre = trim(strtoupper($request->nombre));
                $persona->apellidos = trim(strtoupper( $request->apellidos));
                $persona->ci = trim(strtoupper($request->ci));
                $persona->direccion =  trim(strtoupper($request->direccion));
                $persona->celular = trim(strtoupper($request->celular));
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
            $venta->estadoVenta = 2;
            $venta->venta_online = true;
            $venta->save();

            $total=0;

            foreach($request->carrito as $value){
                $producto = Producto::find($value['id']);
                $producto->stock = $producto->stock -  $value['cantidad'];
                
                $producto->update();
                if($producto->stock < 0 ){
                    $producto->stock =0;
                    $producto->update();
                }


                $productoVenta= new ProductoVenta;
                $productoVenta->cantidad= $value['cantidad'];
                $productoVenta->precioUnitario=$value['precio'];
                $productoVenta->totalVenta= $value['cantidad'] * $value['precio'];
                $productoVenta->producto_id=$value['id'];
                $productoVenta->venta_id=$venta->id;
                $productoVenta->save();
                $total=$total+$productoVenta->totalVenta;
            }

            $venta->totalVenta = $total;
            $venta->update();
            $setting->venta = $setting->venta +1;
            $setting->update();
        
            return redirect()->route('producto.finalizar','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }
}
