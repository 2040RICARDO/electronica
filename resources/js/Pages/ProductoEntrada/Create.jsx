
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProductoEntrada({auth,productos,flash}){
    
    const { data, setData, post, processing, errors } = useForm({
        cantidad: '',
        descripcion:'',
        costoUnitario: 0,
        productoId: productos.length != 0 ?productos[0].id:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('productoEntrada.store'));
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Entrada de Producto</h2>}
        >
            <div>
                <ToastContainer />
            </div>

        <div  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-20 mr-20">

            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                        


                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                CANTIDAD
                            </label>
                            <TextInput
                                    id="cantidad"
                                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                    value={data.cantidad}
                                    onChange={(e) => {
                                        const inputValue_cantidad = e.target.value.trim(); 
                                        if (inputValue_cantidad === '' || (parseInt(inputValue_cantidad) >= 0 && !isNaN(parseInt(inputValue_cantidad)))) {
                                            setData("cantidad", inputValue_cantidad === '' ? '' : parseInt(inputValue_cantidad));
                                        }
                                    }} 
                                    required
                                    autoComplete="cantidad"
                                />
                            <InputError className="text-red text-xs italic" message={errors.cantidad} />


                        </div>
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                COSTO UNITARIO
                            </label>
                            <TextInput
                                    id="costoUnitario"
                                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                    value={data.costoUnitario}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.trim(); 
                                        const parsedValue = parseFloat(inputValue.replace(',', '.')); 
        
                                        if (!isNaN(parsedValue) && parsedValue >= 0) { 
                                            setData("costoUnitario", parsedValue.toFixed(2).replace('.', ','));
                                        }
                                    }}
                                    required
                                    keyfilter={/^[0-9,]+$/} 
                                    autoComplete="costoUnitario"
                                />
                            <InputError className="text-red text-xs italic" message={errors.costoUnitario} />

                        </div>
                    </div>



                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
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

                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tipoId">
                                Producto
                            </label>
                            <select
                                id="productoId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.productoId}
                                onChange={(e) => setData('productoId', e.target.value)}
                                required
                            >
                                {productos.map((producto) => (
                                    <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                ))}
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.productoId} />
                        </div>
                    </div>
                  
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Enviar
                        </PrimaryButton>

                        <Link href={route('productoEntrada.index')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>
            
                    </div> 
                    
                </form>
            </div>
            
        </div>

      
    </AuthenticatedLayout>
  )
}


