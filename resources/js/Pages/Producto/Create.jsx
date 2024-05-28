
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProducto({auth,categorias,flash}){
    
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        precio: 0,
        estado: 1,
        descripcion:'',
        imagen: null,
        categoriaId: categorias.length != 0 ?categorias[0].id:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('producto.store'));
    };


    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors || flash.message != null  ) {
            notify('Ups! Hubo un problema.')
        } 
    }, [flash]);

    const notify = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //////IMAGEN///////7
    const [previewImage, setPreviewImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('imagen', file); 

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const clearPreviewImage = () => {
        setData({ ...data, imagen: null });
        setPreviewImage(null); 
    };
    //////IMAGEN///////7


  return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Categoria</h2>}
        >
            <div>
                <ToastContainer />
            </div>

        <div  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-20 mr-20">

            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">



                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Producto
                            </label>
                            <TextInput
                                id="nombre"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value.toUpperCase())}
                                required
                                autoComplete="nombre"
                            />
                            <InputError className="text-red text-xs italic" message={errors.nombre} />
                        </div>
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Precio
                            </label>
                            <TextInput
                                id="precio"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.precio}
                                onChange={(e) => {
                                    const inputValue = e.target.value.trim(); 
                                    const parsedValue = parseFloat(inputValue.replace(',', '.')); 
                                    if (!isNaN(parsedValue) && parsedValue >= 0) { 
                                        setData("precio", parsedValue.toFixed(2).replace('.', ','));
                                    }
                                }}
                                keyfilter={/^[0-9,]+$/} 
                                required
                                autoComplete="precio"
                            />
                            <InputError className="text-red text-xs italic" message={errors.precio} />
                        </div>
                    </div>

                 

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                ESTADO
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="estado"
                                        value="1"
                                        checked={data.estado === 1}
                                        onChange={(e) => setData('estado', 1)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">HABILITADO</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="estado"
                                        value="0"
                                        checked={data.estado === 0}
                                        onChange={(e) => setData('estado', 0)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">DESHABILITADO</span>
                                </label>
                            </div>
                            <InputError className="text-red text-xs italic" message={errors.estado} />
                        </div>

                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tipoId">
                                CATEGORIA
                            </label>
                            <select
                                id="categoriaId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.categoriaId}
                                onChange={(e) => setData('categoriaId', e.target.value)}
                                required
                            >
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                                ))}
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.categoriaId} />
                        </div>
                    </div>



                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Descripcion
                            </label>
                            <textarea
                                id="descripcion"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 resize-none"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                required
                                autoComplete="descripcion"
                                rows="4" 
                            />
                            <InputError className="text-red text-xs italic" message={errors.descripcion} />


                        </div>
                        <div className="md:w-1/2 px-3 relative">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                htmlFor="imagen"
                            >
                                Imagen Producto
                            </label>
                            <input
                                id="imagen"
                                type="file"
                                className="hidden" 
                                onChange={handleFileChange} 
                                autoComplete="imagen"
                                accept="image/*" 
                            />
              
                            <label
                                htmlFor="imagen"
                                className="block w-full bg-gray-200 text-gray-600 border border-gray-300 rounded py-3 px-4 mb-3 cursor-pointer hover:bg-gray-300"
                            >
                                {previewImage ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                            </label>
                     
                            
                            <InputError className="text-red text-xs italic" message={errors.imagen} />
                        </div>
                        <div className="md:w-1/2 px-3 relative">
                            {previewImage && (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        alt="Vista previa"
                                        className="w-full rounded"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                            
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all duration-300 focus:outline-none"
                                        onClick={clearPreviewImage}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                    
                
                  
            
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Enviar
                        </PrimaryButton>

                        <Link href={route('producto.index')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>
                
                
                    </div> 
                    
                </form>
            </div>
            
        </div>

      
    </AuthenticatedLayout>
  )
}


