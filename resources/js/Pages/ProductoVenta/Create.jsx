
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProductoEntrada({auth,productos,personas,flash}){
    
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellidos: '',
        ci: '',
        direccion: '',
        celular: '',
        descripcion:'',
        listaVenta: [],
        productoId: productos.length != 0 ?productos[0].id:'',
        NpersonaId:null,

        NlistaIdProducto:[],

        Nproducto:productos.length != 0 ?productos[0].nombre:'',
        NcantidadLimite:productos.length != 0 ?productos[0].stock:0,
        Ncantidad:0,
        Nprecio:productos.length != 0 ?productos[0].precio:0,
        NprecioTotal:0

    });

    const submit = (e) => {
        e.preventDefault();
        post(route('productoVenta.store'));
    };


    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors || flash.mensaje != null  ) {
            notify('Ups! Hubo un problema.')
        } 
    }, [flash]);


    const notify = (mensaje) => toast.error(mensaje, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    //////////////SUMAR CANTIDAD/////////7
    const incrementCantidad = () => {
        if( data.Ncantidad < data.NcantidadLimite ){
            setData(prevData => ({
                ...prevData,
                Ncantidad: prevData.Ncantidad + 1,
                //NprecioTotal: (prevData.Ncantidad + 1) * prevData.Nprecio
            }));
        }
        
    };
    const decrementCantidad = () => {
        if (data.Ncantidad > 0) {
            setData(prevData => ({
                ...prevData,
                Ncantidad: prevData.Ncantidad - 1,
                //NprecioTotal: (prevData.Ncantidad - 1) * prevData.Nprecio
            }));
        }
    };
    //////////////SUMAR CANTIDAD//////////

    //////////////AÑADIR A LA LISTA //////////
    const Anadir =()=>{
        if(data.productoId == '' || data.Nproducto == '' || data.Ncantidad == 0){
            return
        }
        
        const newItem = {
            productoId: data.productoId,
            Nproducto: data.Nproducto,
            Ncantidad: data.Ncantidad,
            Nprecio: data.Nprecio,
        };

        const total = data.Ncantidad * data.Nprecio;
  

        setData(prevData => ({
            ...prevData,
            listaVenta: [...prevData.listaVenta, newItem],
            NlistaIdProducto:[...prevData.NlistaIdProducto,prevData.productoId],
            NprecioTotal:prevData.NprecioTotal +total
        }));

        setData(prevData => ({
            ...prevData,
            productoId: '',
            Nproducto: '',
            Ncantidad: 0,
            Nprecio: 0,
        }));

    }
    const quitarItem = (index) => {
        const productIdToRemove = data.listaVenta[index].productoId;
        const totalQuitar = (data.listaVenta[index].Ncantidad * data.listaVenta[index].Nprecio);

        setData(prevData => ({
            ...prevData,
            listaVenta: prevData.listaVenta.filter((_, i) => i !== index),
            NlistaIdProducto: prevData.NlistaIdProducto.filter((id) => id !== productIdToRemove),
            NprecioTotal:prevData.NprecioTotal -totalQuitar
        }));
    };
    ///////////////AÑADIR A LA LISTA///////////




    ///////////////////LLENAR CAMPO CI AUTOMATICO ///////////////////////
    const handleCIChange = async (e) => {
        const ci = e.target.value.toUpperCase();
        setData(prevData => ({
            ...prevData,
            ci:ci
        }));
        console.log(ci);
        //setData('ci', ci);

        if (ci.length >= 6) {
            const persona = personas.find((persona) => persona.ci === ci);
            if (persona) {
                setData(prevData => ({
                    ...prevData,
                    NpersonaId:persona.id,
                    nombre:persona.nombre,
                    apellidos:persona.apellidos,
                    direccion:persona.direccion,
                    celular:persona.celular
                }));
      
            } else {
                setData(prevData => ({
                    ...prevData,
                    NpersonaId:null,
                    nombre:'',
                    apellidos:'',
                    direccion:'',
                    celular:''
                }));
            }
        } else {
            setData(prevData => ({
                
                ...prevData,
                NpersonaId:null,
                nombre:'',
                apellidos:'',
                direccion:'',
                celular:''
            }));
        }
    }
    //////////////////LLENAR CAMPO CI AUTOMATICO//////////////////////////////
    
  return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Venta</h2>}
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
                                CI
                            </label>
                            <TextInput
                                id="ci"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.ci}
                                onChange={(e) => handleCIChange(e)} 
                               /*  onChange={(e) => setData('ci', e.target.value.toUpperCase() )} */
                                autoComplete="ci"
                            />
                            <InputError className="text-red text-xs italic" message={errors.ci} />
                        </div>
                        <div className="md:w-full px-3">
                            
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                Nombre
                            </label>
                            <TextInput
                                id="nombre"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value.toUpperCase() )}
                                required
                                autoComplete="nombre"
                            />
                            <InputError className="text-red text-xs italic" message={errors.nombre} />
                        </div>
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                Apellidos
                            </label>
                            <TextInput
                                id="apellidos"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.apellidos}
                                onChange={(e) => setData('apellidos', e.target.value.toUpperCase() )}
                                required
                                autoComplete="apellidos"
                            />
                            <InputError className="text-red text-xs italic" message={errors.apellidos} />
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                celular
                            </label>
                            <TextInput
                                    id="celular"
                                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                    value={data.celular}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); 
                                        setData('celular', value);
                                    }}
                                    autoComplete="celular"
                                />
                            <InputError className="text-red text-xs italic" message={errors.celular} />
                        </div>
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                direccion
                            </label>
                            <TextInput
                                id="direccion"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.direccion}
                                onChange={(e) => setData('direccion', e.target.value.toUpperCase())}
                                autoComplete="direccion"
                            />
                            <InputError className="text-red text-xs italic" message={errors.direccion} />
                        </div>
                    </div>


                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Descripcion
                            </label>
                            <textarea
                                id="descripcion"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 resize-none"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                autoComplete="descripcion"
                                rows="4" 
                            />
                            <InputError className="text-red text-xs italic" message={errors.descripcion} />
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tipoId">
                                Producto
                            </label>
                            <select
                                id="productoId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.productoId}
                                onChange={(e) => {
                                    if (e.target.value === '') {
                                        setData((prevData) => ({
                                            ...prevData,
                                            productoId: '',
                                            Nproducto: '',
                                            NcantidadLimite: 0,
                                            Ncantidad: 0,
                                            Nprecio: 0,
                                        }));
                                        return
                                    }
                                    const selectedProductId = e.target.value;
                                    console.log(selectedProductId);
                                    const selectedProduct = productos.find((producto) => producto.id == selectedProductId);
                                    if (selectedProduct) {
                                        setData((prevData) => ({
                                            ...prevData,
                                            productoId: selectedProduct.id,
                                            Nproducto: selectedProduct.nombre,
                                            NcantidadLimite: selectedProduct.stock,
                                            Ncantidad: 0,
                                            Nprecio: selectedProduct.precio,
                                        }));
                                    } else {
                                        console.error(`No se encontró ningún producto con ID: ${selectedProductId}`);
                                    }
                                }}
                                
                            >
                                <option value="">SELECCIONE PRODUCTO</option>
                                {productos
                                    .filter((producto) => !data.NlistaIdProducto.includes(producto.id))
                                    .map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.nombre}
                                        </option>
                                    ))}
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.productoId} />
                        </div>
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name" >
                                DETALLE DE COMPRA
                            </label>
                            <div className="-mx-3 md:flex mb-8">
                                <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                                    <TextInput
                                        id="Nproducto"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                        value={data.Nproducto}
                                        onChange={(e) => setData('Nproducto', e.target.value.toUpperCase())}
                                        autoComplete="Nproducto"
                                        disabled
                                    />
                                </div>
                                <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                                    <div className="">
                                        <input
                                            type="number"
                                            id="Ncantidad"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                            value={data.Ncantidad}
                                            min="1"
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            autoComplete="Ncantidad"
                                            disabled
                                        />
                                        <div className="btn-group mt-2">
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l" type='button' onClick={decrementCantidad} >-</button>
                                            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"  type='button' onClick={incrementCantidad}>+</button>
                                            <p> Precio : {data.Nprecio} Bs</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"  type='button' onClick={Anadir}>AÑADIR</button>
                                </div>
                            </div>
                        </div>

                       
                    </div>
                    {
                        data.listaVenta.length != 0 && (
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3 overflow-y-scroll" style={{ height: '300px' }}    >
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name" >
                                    LISTA DE VENTAS
                                    </label>
                                    <table className="items-center w-full border-collapse text-blueGray-700">
                                        <thead class="thead-light ">
                                            <tr>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Producto
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Cantidad
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Precio
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.listaVenta.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.Nproducto}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.Ncantidad}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.Nprecio} Bs</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => quitarItem(index)}
                                                        >
                                                            Quitar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>----------------</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>Total : {data.NprecioTotal} Bs</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        )
                    }
                    
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Enviar
                        </PrimaryButton>

                        <Link href={route('productoVenta.index')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>
            
                    </div> 
                    
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}


