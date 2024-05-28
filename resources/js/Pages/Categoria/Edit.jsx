
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditCategoria({auth,categoria,flash}){
    
    const { data, setData, put, processing, errors } = useForm({
        categoria: categoria.categoria,
        descripcion:categoria.descripcion,
        estado:categoria.estado,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("categoria.update",{ id: categoria.id }));
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

  return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Categoria</h2>}
        >
            <div>
                <ToastContainer />
            </div>

        <div  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-20 mr-20">

            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">

                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Categoria
                            </label>
                            <TextInput
                                id="categoria"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.categoria}
                                onChange={(e) => setData('categoria', e.target.value.toUpperCase())}
                                required
                                autoComplete="categoria"
                            />
                            <InputError className="text-red text-xs italic" message={errors.categoria} />
                        </div>

                        <div className="md:w-1/2 px-3">
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
                        </div>
                        
     
                    </div>
                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                estado
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
                    </div>

                    
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            ACTUALIZAR
                        </PrimaryButton>

                        <Link href={route('categoria.index')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>
                
                    </div> 
                </form>
            </div>
            
        </div>

      
    </AuthenticatedLayout>
  )
}


