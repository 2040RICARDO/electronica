
import Modal from '@/Components/Modal';
import { Link} from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ShoppingCart,DollarSign,Home} from 'react-feather'



import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function CompraProducto({}) {



    const [cart, setCart] = useState({
        cantidad:0,
        total:0
    })

    const [carritoList, setCarritoList] = useState([])


    useEffect(() => {
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            setCarritoList(JSON.parse(carrito))
            carrito = JSON.parse(carrito);
            calcularTotales(carrito);
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




    //////////////SUMAR CANTIDAD/////////7
    const incrementCantidad = (cantidad,cart) => {
        
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito);
            const productoExistente = carrito.find(item => item.id === cart.id);

  
            if (productoExistente) {
                if((productoExistente.cantidad + 1) <= productoExistente.stock){

                    productoExistente.cantidad += 1;
                }else{
                    notifye('La cantidad Supera el stock disponible');
                }
            }

            const carritoJSON = JSON.stringify(carrito);
            setCarritoList(carrito);
            localStorage.setItem('carrito', carritoJSON);
            calcularTotales(carrito);
        }

    }






    const decrementCantidad = (cantidad,cart) => {
        if(cantidad < 2){
            notifye('La cantidad no puede ser O.')
            return
        }
    
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito);
            const productoExistente = carrito.find(item => item.id === cart.id);

            if (productoExistente) {
                productoExistente.cantidad -= 1;
            }

            const carritoJSON = JSON.stringify(carrito);
            setCarritoList(carrito);
            localStorage.setItem('carrito', carritoJSON);
            calcularTotales(carrito);
        }
    };


    const EliminarProducto = (cart)=>{
        
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito); 

            const updatedCarrito = carrito.filter(item => item.id !== cart.id);

            setCarritoList(updatedCarrito);
            calcularTotales(updatedCarrito);

            localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
            notifye('Producto Eliminado con exito');
        }
    }
    //////////////SUMAR CANTIDAD//////////
    

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
                    {
                        carritoList.length != 0&&(
                            <Link href={route('producto.finalizar')}
                                className="px-5 py-3 lg:block border-2 border-red-500 rounded-lg font-semibold text-red-700 text-xs  transition ease-linear duration-500 mr-4 flex items-center mt-10"
                                style={{ flexDirection: 'col' }} 
                                >
                                <span className='text-red'>Finalizar Compra</span>
                            </Link>
                        )
                    }
                    
                
                </div>


                <div className="w-2/2 p-4">

                    <section id="campana" className="bg-white py-10 md:py-16">
                        <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

                            <div className="container max-w-screen-xl mx-auto px-4">


                                    {
                                        carritoList.map(cart =>(
                                            <>
                                                <div class="flex font-sans p-3">
                                                    <div class="flex-none w-48 relative">
                                                        {
                                                            cart.img != null?
                                                            (
                                                                <img src={`/img_producto/${cart.img}`}  alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy"   style={{ width: '100%', height: '280px', objectFit: 'cover' }}/>
                                                            )
                                                            :
                                                            (
                                                                <img src="assets/imagen/producto.png" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" /> 
                                                            )
                                                        }

                                                    </div>
                                                    <form class="flex-auto p-6">
                                                    <div class="flex flex-wrap">
                                                        <h1 class="flex-auto text-xl font-semibold text-gray-900">
                                                        {cart.producto}
                                                        </h1>
                                                      
                                                        <div class="w-full flex-none text-sm text-blue-500 font-medium text-black-700 mt-2">
                                                        {cart.precio} Bs
                                                        </div>
                                                    </div>
                                                    <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                                                        <div class="space-x-2 flex text-sm">

                                                            <div className="btn-group mt-2">
                                                                <div className="">
                                                                    <input
                                                                        type="number"
                                                                        id="Ncantidad"
                                                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 text-xs "
                                                                        min="1"
                                                                        value={cart.cantidad}
                                                                        autoComplete="Ncantidad"
                                                                        disabled
                                                                    />
                                                                    <div className="btn-group mt-2">
                                                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l" type='button'  onClick={()=>decrementCantidad(cart.cantidad,cart)}>-</button>

                                                                        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"  type='button' onClick={()=>incrementCantidad(cart.cantidad,cart)}>+</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex space-x-4 mb-6 text-sm font-medium">
                                                        <div class="flex-auto flex space-x-4">
                                                        <button class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900" type="button" onClick={()=>EliminarProducto(cart)}>
                                                            Eliminar
                                                        </button>
                                                        </div>
                                                 
                                                    </div>
                                  
                                                    </form>
                                                </div>
                                            </>
                                            
                                        ))
                                    }

                               
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
