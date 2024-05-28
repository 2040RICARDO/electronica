<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductoEntrada;
use App\Models\Producto;
use App\Models\Categoria;
use Validator;
use Auth;

class ProductoEntradaController extends Controller
{
    public function index($mensaje=null){

        $productoEntradas = ProductoEntrada::select('producto_entrada.*','producto.nombre as producto_nombre','producto.codigo','producto.editControl','categoria.categoria')
                                ->join('producto','producto.id','=','producto_entrada.producto_id')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->orderBy('producto_entrada.id')
                                ->get();
                    
        $productos = Producto::select('producto.*','categoria.categoria')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->orderBy('id')
                                ->get();
 
        $categorias = Categoria::where('estado',true)
                                ->orderBy('id')
                                ->get();
 
       return Inertia::render('ProductoEntrada/Index',['productoEntradas'=>$productoEntradas,'productos'=>$productos,'categorias'=>$categorias,'mensaje'=>$mensaje]); 
    }


    public function create(){
        $productos=Producto::where('estado',true)->orderBy('id')->get();
        return Inertia::render('ProductoEntrada/Create',['productos'=>$productos]); 
    }

    
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'costoUnitario' => 'required',
                'productoId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
            
            $productoEntrada =new ProductoEntrada;
            $productoEntrada->descripcion = trim($request->descripcion);
            $productoEntrada->cantidad = trim($request->cantidad);
            $productoEntrada->fecha = date('Y-m-d');
            $productoEntrada->gestion = date('Y');
            $productoEntrada->costoUnitario =floatval(str_replace(',', '.', $request->costoUnitario));
            $costo_total= trim($request->cantidad) * $productoEntrada->costoUnitario;
            $productoEntrada->costoTotal=$costo_total;
            $productoEntrada->producto_id = $request->productoId;
            $productoEntrada->save();
            

            $producto = Producto::find($request->productoId);
            $producto->stock =  $producto->stock + $productoEntrada->cantidad;
            $producto->editControl = true;
            $producto->update();

            return redirect()->route('productoEntrada.index','Registro realizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }


    public function edit($id){

        $productos=Producto::orderBy('id')->get();

        $productoEntrada = ProductoEntrada::select('producto_entrada.*','producto.nombre as producto','categoria.categoria')
                                ->join('producto','producto.id','=','producto_entrada.producto_id')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->where('producto_entrada.id',$id)
                                ->first();                    
        return Inertia::render('ProductoEntrada/Edit',['productos'=>$productos,'productoEntrada'=>$productoEntrada]); 
    }


    public function update(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'descripcion' => 'required|min:3|max:500',
                'cantidad' => 'required|numeric',
                'costoUnitario' => 'required',
                'productoId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $productoEntrada = ProductoEntrada::find($request->id);
            $producto=Producto::find($productoEntrada->producto_id);
            $producto->stock= $producto->stock - $productoEntrada->cantidad;
            $producto->update();

            $productoEntrada->descripcion = trim($request->descripcion);
            $productoEntrada->cantidad = trim($request->cantidad);

            $productoEntrada->costoUnitario =floatval(str_replace(',', '.', $request->costoUnitario));
            $costo_total= trim($request->cantidad) * $productoEntrada->costoUnitario;
            $productoEntrada->costoTotal=$costo_total;
            $productoEntrada->producto_id = $request->productoId;
            $productoEntrada->update();


            $producto_a=Producto::find($request->productoId);
            $producto_a->stock =  $producto_a->stock + $productoEntrada->cantidad;
            $producto_a->editControl = true;
            $producto_a->update();

            return redirect()->route('productoEntrada.index','Actualizado con exito!');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
