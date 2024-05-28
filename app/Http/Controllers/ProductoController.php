<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;
use Intervention\Image\Facades\Image;

use App\Models\Producto;
use App\Models\Categoria;

class ProductoController extends Controller
{
    public function index($mensaje=null){
        $productos = Producto::select('producto.*','categoria.categoria')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->orderBy('id')
                                ->get();
 
        $categorias = Categoria::where('estado',true)
                                ->orderBy('id')
                                ->get();

        return Inertia::render('Producto/Index',['productos'=>$productos,'categorias'=>$categorias,'mensaje'=>$mensaje]); 
    }


    public function create(){
        $categorias = Categoria::where('estado',true)
                    ->orderBy('id')
                    ->get();

        return Inertia::render('Producto/Create',['categorias'=>$categorias]); 
    }



    public function store(Request $request){
        try{
       
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:2|max:500',
                'precio' => 'required',
                'estado' => 'required',
                'descripcion' => 'required|min:3|max:500',
                'categoriaId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
          

            $producto =new Producto;
            $producto->nombre = trim(strtoupper($request->nombre));
            $producto->codigo ='ELEC-0'.$producto->id;
            $producto->precio = floatval(str_replace(',', '.',$request->precio));
            $producto->estado =$request->estado;
            $producto->descripcion =trim($request->descripcion);
            $producto->categoria_id =trim($request->categoriaId);
            $producto->save();

            if (isset($request->imagen) && $request->hasfile('imagen')) {          
                $file = $request->file('imagen'); 
                $filename =  "img_producto_".time()."".$producto->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_producto/'.$filename));
                $producto->imagenProducto=$filename;
                $producto->update();
            }
            return redirect()->route('producto.index','Registro realizado con exito.');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }




    public function edit($id){
        $producto = Producto::select('producto.*','categoria.categoria')
                                ->join('categoria','categoria.id','=','producto.categoria_id')
                                ->where('producto.id',$id)
                                ->first();

        $categorias = Categoria::where('estado',true)
                                ->orderBy('id')
                                ->get();

        return Inertia::render('Producto/Edit',['producto'=>$producto,'categorias'=>$categorias]); 
    }






    public function update(Request $request){
        try{
     
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:2|max:500',
                'precio' => 'required',
                'estado' => 'required',
                'descripcion' => 'required|min:3|max:500',
                'categoriaId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            
            $producto =Producto::find($request->id);
            $producto->nombre = trim(strtoupper($request->nombre));
            $producto->precio = floatval(str_replace(',', '.',$request->precio));
            $producto->estado =$request->estado;
            $producto->descripcion =trim($request->descripcion);
            $producto->categoria_id =$request->categoriaId;
            $producto->update();

            if(!empty($request->imagen) && $request->imagen != $producto->imagenProducto){
                $file = $request->file('imagen'); 
                $filename =  "img_producto_".time()."".$producto->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_producto/'.$filename));
                $producto->imagenProducto=$filename;

            }
            if(empty($request->imagen))
                $producto->imagenProducto=null;

            $producto->update();
            return redirect()->route('producto.index','Registro Actualizado con exito.');

        } catch (\Exception $e) {
      
            return response()->json(['error'=>$e]);
        }
    }
}
