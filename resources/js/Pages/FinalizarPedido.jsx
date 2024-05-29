
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { Link, useForm} from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ShoppingCart,DollarSign, Home} from 'react-feather'


import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function FinalizarProducto({mensaje}) {

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellidos: '',
        ci: '',
        direccion: '',
        celular: '',
        descripcion: '',
        estado:0,
        carrito:[]
    
    });
  

    const Reset = () => {
        setData({
            nombre: '',
            apellidos: '',
            ci: '',
            direccion: '',
            celular: '',
            descripcion: '',
            estado: 0,
            carrito:[]
        });
    };

    const submit = async (e) => {
        notify('Pedido realizado con Exito!!.')
        e.preventDefault();
        post(route('producto.register'));

        Reset();
        localStorage.setItem('carrito', JSON.stringify([]));
        let carrito = JSON.parse(localStorage.getItem('carrito'));

        calcularTotales(carrito);
    };



    const [cart, setCart] = useState({
        cantidad:0,
        total:0
    })

    const [carritoList, setCarritoList] = useState([])

  

    useEffect(() => {
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            setData('carrito',JSON.parse(carrito));

            setCarritoList(JSON.parse(carrito))
            carrito = JSON.parse(carrito);
            calcularTotales(carrito);
        }
        
        if(mensaje != null){
            notify(mensaje);
        }
  
    }, []);

  






    const calcularTotales =(carrito)=>{
        let cantidadTotal = 0;
        let precioTotal = 0;

        carrito.forEach(item => {
            cantidadTotal += item.cantidad;
            precioTotal += item.cantidad * item.precio;
        });

        setCart({
            cantidad: cantidadTotal,
            total: precioTotal
        });

    }

    const notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
    const notifye = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });




    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <section className="bg-white ">

                <div className="container max-w-screen-xl mx-auto px-4">

                    <nav className="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

                        <div className="flex items-center justify-between mb-10 lg:mb-0">
                            

                            <a href={route('welcome')} className="w-10 h-10 flex items-center justify-center text-red-700 border border-red-700 rounded-md mr-4">
                                <Home size={15}/>
                            </a>
                        </div>

                        <ul className="lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16" >

                            <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                                <ScrollLink className='cursor-pointer' to="informacion" smooth={true} duration={500}></ScrollLink>
                            </li>
                            <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                                <ScrollLink className='cursor-pointer' to="campana" smooth={true} duration={500}></ScrollLink>
                            </li>
                        </ul>
                        <Link href={route('producto.ver')}
                            className="px-5 py-3 lg:block border-2 border-red-700 rounded-lg font-semibold text-red-700 text-xs  transition ease-linear duration-500 mr-4 flex items-center"
                            style={{ flexDirection: 'col' }} 
                            >
                            <ShoppingCart size={17} className="mr-2"/>
                            <span>Seguir Comprado</span>
                        </Link>
                    </nav>
                </div> 
            </section>





        <div className="w-full h-px bg-white-200 " />
            
            <div className="flex">
                <div className="w-1/5 p-4 bg-gray-200 rounded-md ml-3 text-black">

                    <div className=" m-10">
                        <div class="m-auto h-52  max-w-md bg-white shadow p-2 border-t-4 border-green-600 rounded">
                            <header class="p-2 border-b flex"> 
                                <div class="flex flex-col">
                                    <h4 class="text-xs font-semibold">Total Productos</h4>
                                    

                                    <h1 class="text-lg font-mono text-green-600">{cart.cantidad}</h1>
                                </div>
                            </header>
                            <header class="p-2 border-b flex"> 
                                <div class="flex flex-col">
                                    <h4 class="text-xs font-semibold">Total A Cancelar</h4>
                                    <h1 class="text-lg font-mono text-green-600">{cart.total.toFixed(2)} Bs</h1>
                                </div>
                            </header>
                          
                        </div>
                    </div>
                    {/* {
                        carritoList.length != 0&&(
                            <Link href={route('producto.finalizar')}
                                className="px-5 py-3 lg:block border-2 border-red-500 rounded-lg font-semibold text-red-700 text-xs  transition ease-linear duration-500 mr-4 flex items-center mt-10"
                                style={{ flexDirection: 'col' }} 
                                >
                                <span className='text-red'>Finalizar Compra</span>
                            </Link>
                        )
                    } */}
                    
                
                </div>


                <div className="w-2/3 p-4">

                    <section className="bg-white py-10 md:py-16" id='formulario'>

                        <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

                                <div className="hidden md:block bg-white xl:relative px-6 py-3 rounded-3xl">
                                    <form onSubmit={submit} >
                                        <div className="py-3">
                                            <h3 className="font-semibold text-gray-900 text-3xl">Formulario de Pedido</h3>
                                        </div>
                                        <div className="py-3">
                                            <TextInput
                                                id="nombre"
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.nombre}
                                                onChange={(e) => setData('nombre', e.target.value.toUpperCase() )}
                                                required
                                                placeholder="NOMBRE"
                                                autoComplete="nombre"
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.nombre}/>
                                        </div>

                                        <div className="py-3">
                                            <TextInput
                                                id="apellidos"
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.apellidos}
                                                onChange={(e) => setData('apellidos', e.target.value.toUpperCase() )}
                                                required
                                                placeholder="APELLIDOS"
                                                autoComplete="apellidos"
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.apellidos} />
                                        </div>
                                        <div className="py-3">
                                            <TextInput
                                                id="ci"
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.ci}
                                                onChange={(e) => setData('ci', e.target.value.toUpperCase())}
                                                required
                                                placeholder="CI"
                                                autoComplete="ci"
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.ci} />
                                        </div>
                                        <div className="py-3">
                                            <TextInput
                                                id="celular"
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                value={data.celular}
                                                onChange={(e) => setData('celular', e.target.value.toUpperCase())}
                                                required
                                                placeholder="CELULAR"
                                                autoComplete="celular"
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.celular} />
                                        </div>
                                        <div className="py-3">
                                            <TextInput
                                                id="direccion"
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                                value={data.direccion}
                                                onChange={(e) => setData('direccion', e.target.value.toUpperCase())}
                                                required
                                                placeholder="DIRECCION"
                                                autoComplete="direccion"
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.direccion} />
                                        </div>
                                        <div className="py-3">
                                            <textarea
                                                id="descripcion"
                                                className="appearance-none block bg-grey-lighter text-grey-darker border border-red rounded px-4 py-4 w-96 mb-3 resize-none"
                                                value={data.descripcion}
                                                onChange={(e) => setData('descripcion', e.target.value)}
                                                required
                                                autoComplete="descripcion"
                                                placeholder="DESCRIPCION"
                                                rows="4" 
                                            />
                                            <InputError className="text-red text-xs italic" message={errors.descripcion} />
                                        </div>
                                            {
                                                carritoList.length != 0&&(
                                                    <div className="py-3">
                                                        <button className="w-full py-4 font-semibold text-lg text-white bg-red-700 rounded-xl hover:bg-red-900 transition ease-in-out duration-500">REALIZAR PEDIDO</button>
                                                    </div>

                                                )
                                            }
                                    </form>
                                </div>

                      

                        </div> 

                    </section>
                </div>
            </div>




            <footer className="bg-white py-10 md:py-16">

                <div className="container max-w-screen-xl mx-auto px-4">

                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="text-center lg:text-left mb-10 lg:mb-0">

                            <p className=" text-gray-400 text-xl mb-10 font-bold"> <strong>Componentes Electrónicos  <br/>Llallagua</strong></p>         
                        </div>

                        <div className="text-center lg:text-left mb-10 lg:mb-0">
                            <h4 className="font-semibold text-gray-900 text-2xl mb-6">Redes</h4>

                            <a href="#" target='_blank' className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Facebook</a>

                        </div>

                        <div className="text-center lg:text-left mb-10 lg:mb-0">
                            <h4 className="font-semibold text-gray-900 text-2xl mb-6">Contactos</h4>

                            <a href="#" className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">6666666666</a>

                            
                        </div>

                    </div>

                </div> 

            </footer>


            
        </>  
    );
}
