
import Modal from '@/Components/Modal';
import { Link, useForm} from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {ShoppingCart,DollarSign, Home} from 'react-feather'


import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';


export default function Welcome({ categorias,productos,categoria}) {


    const [selectedProducto, setSelectedProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [cart, setCart] = useState({
        cantidad:0,
        total:0
    })


    useEffect(() => {
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito);
            calcularTotales(carrito);
        }
    }, []);





    const openModal = (producto) => {
      
        setSelectedProducto(producto);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    
    /////MODAL DETALLE ///////////
    const [selectedProductod, setSelectedProductod] = useState(null);
    const [showModald, setShowModald] = useState(false);
    const openModald = (producto) => {
      
        setSelectedProductod(producto);
        setShowModald(true);
    };

    const closeModald = () => {
        setShowModald(false);
    };
    /////MODAL DETALLE ////////////

    const Carrito =(producto)=>{
        
        let carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito);
            const productoExistente = carrito.find(item => item.id === producto.id);

  
            if (productoExistente) {
                
                if((productoExistente.cantidad + 1) <= productoExistente.stock){
                    notify('Se agrego al carrito.')
                    productoExistente.cantidad += 1;
                }else{
                    notifye('La cantidad Supera el stock disponible');
                }

            } else {
                notify('Se agrego al carrito.')
                let nuevoProducto={
                    id:producto.id,
                    producto:producto.nombre,
                    cantidad:1,
                    precio:producto.precio,
                    img:producto.imagenProducto,
                    stock:producto.stock
                }

                carrito.push(nuevoProducto);
            }
        } else {
            notify('Se agrego al carrito.')
            let nuevoProducto={
                id:producto.id,
                producto:producto.nombre,
                cantidad:1,
                precio:producto.precio,
                img:producto.imagenProducto,
                stock:producto.stock
            }

            carrito = [nuevoProducto];
        }

        const carritoJSON = JSON.stringify(carrito);

        localStorage.setItem('carrito', carritoJSON);
        calcularTotales(carrito);
        openModal(producto);
    }


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

    const Comprar=()=>{


    }
    


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
                <div
                    className="px-5 py-3 lg:block border-2 border-red-700 rounded-lg font-semibold text-red-700 text-xs  transition ease-linear duration-500 mr-4 flex items-center"
                    style={{ flexDirection: 'col' }} 
                    >
                    <ShoppingCart size={17} className="mr-2"/>
                    <span>Carrito: {cart.cantidad} Productos - Total: {cart.total.toFixed(2)} bs</span>
                </div>
            </nav>
        </div> 

    </section>
        <div className="w-full h-px bg-white-200 " />
            
            <div className="flex">
            <div className="w-1/5 p-4 bg-red-500 rounded-md ml-3">
            <h1 className='items-center text-white font-bold text-lg'>CATEGORIAS</h1>
            <div className=" m-10">
                {
                    categorias.map(categoria =>(
                        <Link key={categoria.id} href={route('producto.ver',categoria.id)} className="block font-medium text-white  hover:underline pb-3 text-sm" >
                            {
                                categoria.categoria.length > 20
                                                        ? `${categoria.categoria.slice(0, 20)}...`
                                                        : categoria.categoria
                            }
                        
                        </Link>
                    ))
                }
                <Link href={route('producto.lista')}
                    className="px-5 py-3 lg:block border-2 border-pink-50 rounded-lg font-semibold text-red-700 text-xs  transition ease-linear duration-500 mr-4 flex items-center mt-10"
                    style={{ flexDirection: 'col' }} 
                    >
                    <span className='text-white'>Finalizar Compras</span>
                </Link>
                
            </div>
        </div>
        <div className="w-2/2 p-4">

            <section id="campana" className="bg-white py-10 md:py-16">
                <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

                    <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">{categoria.categoria}</h1>
                    <div className="container max-w-screen-xl mx-auto px-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {
                                productos.map(producto =>(
                                    <article key={producto.id}
                                        className="bg-white   p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
                                        <a target="_self" href="/blog/slug"
                                            className="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a>
                                        <div className="relative mb-4 rounded-2xl">
                                            {
                                                producto.imagenProducto != null ?
                                                (
                                                    <img className="max-h-40 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105" src={`/img_producto/${producto.imagenProducto}`} alt=""/>
                                                ):
                                                (
                                                    <img className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                                    src="assets/imagen/producto.png" alt=""/>
                                                )
                                            }
                                            
                                        

                                            <button className="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                                                 target="_self" rel="noopener noreferrer" onClick={()=>openModald(producto)}>
                                                Ver Producto
                                               
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center w-full pb-4 mb-auto">
                                            <div className="flex items-center">
                                                <div className="flex flex-1">
                                                    <div className="">
                                                        <p className="text-sm font-semibold ">
                                                            {
                                                                producto.stock == 0?('AGOTADO X'):'DISPONIBLE ✔️'
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500">{producto.descripcion.length > 50
                                                            ? `${producto.descripcion.slice(0, 50)}...`
                                                            : producto.descripcion
                                                                } 
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <div className="text-sm flex items-center text-gray-500 ">
                                                    {producto.precio} Bs
                                                    <DollarSign size={15}/>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="font-medium text-xl leading-8">
                                            <a href="/blog/slug"
                                                className="block relative group-hover:text-red-700 transition-colors duration-200 ">
                                                {producto.nombre} 
                                            </a>
                                        </h3>

                                        <main className="grid  place-items-center bg-gray-100">
                                            <button disabled={producto.stock == 0?true:false} className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={()=>Carrito(producto)}>
                                                <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                                <span className="relative text-black group-hover:text-white">Añadir al carrito!</span>
                                            </button>
                                        </main>
                                    </article> 
                                ))
                            }

                        </div>

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

            <Modal show={showModal} closeModal={closeModal}>
                {selectedProducto && (
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-auto w-full max-w-sm pt-6">
                            {
                                selectedProducto.imagenProducto != null?
                                (
                                    <img
                                        src={`/img_producto/${selectedProducto.imagenProducto}`}
                                        class="aspect-video w-full object-cover"
                                        alt=""
                                    />
                                )    
                                :
                                (
                                    <img
                                        src="assets/imagen/producto.png"
                                        class="aspect-video w-full object-cover"
                                        alt=""
                                    />
                                )
                            }

                            <div class="p-4">
                                <p class="mb-1 text-sm text-primary-500">{selectedProducto.codigo}</p>
                                <h3 class="text-xl font-medium text-gray-900">{selectedProducto.nombre}</h3>
                                <p class="mt-1 text-gray-500">{selectedProducto.descripcion}</p>
                                <div class="mt-4 flex gap-2">

                                    <span
                                        class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                    >
                                        {selectedProducto.categoria}
                                    </span>
                                    <span
                                        class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
                                    >
                                    </span>
                                </div>
                            </div>
                           
                            <div className="flex">
                                <div className="w-1/2 pr-2">
                                    <button type='button' className="mt-4 text-sm w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg mb-10 " onClick={closeModal}>
                                        Seguir Comprando
                                    </button>
                                </div>
                                <div className="w-1/2 pl-2">
                                    
                                </div>
                                <Link href={route('producto.lista')} className="text-center mt-4 text-sm w-full text-white bg-green-600 py-2 rounded-xl shadow-lg mb-10 ">
                                    Finalizar Compras
                                </Link>
                            </div>
                        </div>
                    </div> 
                )}
            </Modal>



            <Modal show={showModald} closeModal={closeModal}>
                {selectedProductod && (
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-auto w-full max-w-sm pt-6">
                            {
                                selectedProductod.imagenProducto != null?
                                (
                                    <img
                                        src={`/img_producto/${selectedProductod.imagenProducto}`}
                                        class="aspect-video w-full object-cover"
                                        alt=""
                                    />
                                )    
                                :
                                (
                                    <img
                                        src="assets/imagen/producto.png"
                                        class="aspect-video w-full object-cover"
                                        alt=""
                                    />
                                )
                            }

                            <div class="p-4">
                                <p class="mb-1 text-sm text-primary-500">{selectedProductod.codigo}</p>
                                <h3 class="text-xl font-medium text-gray-900">{selectedProductod.nombre}</h3>
                                <p class="mt-1 text-gray-500">{selectedProductod.descripcion}</p>
                                <div class="mt-4 flex gap-2">

                                    <span
                                        class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                    >
                                        {selectedProductod.categoria}
                                    </span>
                                    <span
                                        class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
                                    >
                                    </span>
                                </div>
                            </div>
                           
                            <button className="mt-4 text-sm w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg mb-10 " onClick={closeModald}>
                                Cerrar
                            </button>
                        </div>
                    </div> 
                )}
            </Modal>
        </>  
    );
}
