<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index($mensaje=null){
        $categorias = Categoria::orderBy('id')->get();
        return Inertia::render('Categoria/Index',['categorias'=>$categorias,'mensaje'=>$mensaje]); 
    }

    public function create(){
     
        return Inertia::render('Categoria/Create'); 
    }

    public function store(Request $request){
        try{
       
            $validator = Validator::make($request->all(),[
                'categoria' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $data = [
                'categoria' => trim(strtoupper($request->categoria)),
                'descripcion' => trim($request->descripcion),
                'estado' => $request->estado,
            ];
        
            Categoria::create($data);
            return redirect()->route('categoria.index','Registro realizado con exito.');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }

    }

    public function edit($id){
        $categoria=Categoria::find($id);
        return Inertia::render('Categoria/Edit',['categoria'=>$categoria]); 
    }

    public function update(Request $request){
        try{
          
            $validator = Validator::make($request->all(),[
                'categoria' => 'required|min:3|max:500',
                'descripcion' => 'required|min:3|max:500',
                'estado' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $categoria =Categoria::find($request->id);
            $categoria->categoria= trim(strtoupper($request->categoria));
            $categoria->descripcion =  trim($request->descripcion);
            $categoria->estado = $request->estado;
            $categoria->update();

            return redirect()->route('categoria.index','Registro Actualizado con exito.');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
