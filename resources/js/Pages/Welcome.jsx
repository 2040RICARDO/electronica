import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, Head,useForm,usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import {ArrowRightCircle,ShoppingCart} from 'react-feather'



import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function Welcome({ auth, categorias}) {


    const [selectedCampana, setSelectedCampana] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [tituloModal,setTitleModal]  =useState('');

    const openModal = (campana,tipo) => {
        if(tipo == 'campana'){
            setTitleModal('CAMPAÑA');
        }else if(tipo == 'mascota'){
            setTitleModal('MASCOTA')
        }else if(tipo == 'extravio'){
            setTitleModal('EXTRAVIO')
        }
        setSelectedCampana(campana);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    



    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellidos: '',
        ci: '',
        direccion: '',
        celular: '',
        descripcion: '',
        estado:0,
    
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
        });
    };

   

    const submit = async (e) => {
        e.preventDefault();
        post(route('adopcion_p'));
        Reset()

    };
  
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classNameNameList.add('!hidden');
        document.getElementById('docs-card')?.classNameNameList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classNameNameList.add('!flex-row');
        document.getElementById('background')?.classNameNameList.add('!hidden');
    };

    return (
        <>
        
    <section className="bg-white ">

        <div className="container max-w-screen-xl mx-auto px-4">

            <nav className="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

                <div className="flex items-center justify-between mb-10 lg:mb-0">
                    

                    <button className="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-green-700 border border-green-700 rounded-md" >
                        <i data-feather="menu"></i>
                    </button>
                </div>

                <ul className="lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16" >

                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink className='cursor-pointer' to="informacion" smooth={true} duration={500}>Nosotros</ScrollLink>
                    </li>
                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink className='cursor-pointer' to="campana" smooth={true} duration={500}>Productos</ScrollLink>
                    </li>

                </ul>

                {
                    auth.user? 
                    (
                    <Link
                    href={route('dashboard')}
                    className="px-5 py-3 lg:block border-2 border-red-700 rounded-lg font-semibold text-red-700 text-xs hover:bg-red-700 hover:text-white transition ease-linear duration-500 mr-4"
                    >
                        Principal
                    </Link>

                    ):(
                        <>
                            <Link
                                href={route('login')}
                                className="px-5 py-3 lg:block border-2 border-red-700 rounded-lg font-semibold text-red-700 text-xs hover:bg-red-700 hover:text-white transition ease-linear duration-500 mr-4"
                            >
                                Ingresar
                            </Link>

                            {/* <Link
                                href={route('register')}
                                className="px-5 py-3 lg:block border-2 border-red-700 rounded-lg font-semibold text-red-700 text-xs hover:bg-red-700 hover:text-white transition ease-linear duration-500"
                            >
                                Registro
                            </Link> */}
                        
                        </>

                    )
                }

            

            </nav>

            <div className="flex items-center justify-center xl:justify-start">
                <img src="/assets/imagen/logo.jpg" alt="Home img" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />

            </div>

        </div> 

    </section>


<section className="bg-white py-10 md:py-16" id='informacion'>

    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">



        <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">QUIENES SOMOS</h1>



        <div className="flex flex-col md:flex-row md:items-center justify-center md:space-x-8 lg:space-x-12 mb-10 md:mb-20">

            <div className="bg-gray-100 rounded-lg mb-10 md:mb-0">
     
                <div className="flex items-center gap-5 mx-8">
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                </div>

                <p className="font-normal text-lg lg:text-md text-gray-400 mx-8 my-8">Bienvenido a "Componentes Electrónicos Llallagua", tu tienda especializada en componentes electrónicos de alta calidad. Ofrecemos una amplia variedad de componentes pasivos y activos, herramientas y accesorios para tus proyectos electrónicos. Nuestro equipo experto está listo para ofrecerte asesoramiento y productos de calidad. ¡Visítanos y encuentra todo lo que necesitas en un solo lugar!</p>
            </div>
        </div>

    </div> 

</section>
      


<section id="campana" className="bg-white py-10 md:py-16">

                <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

                    <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">PRODUCTOS<br/> POR CATEGORIA</h1>
                    <div className="container max-w-screen-xl mx-auto px-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {
                                categorias.map(cate =>(
                                    <article
                                        className="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
                                        <Link target="_self" href={route('producto.ver',cate.id)}
                                            className="absolute opacity-0 top-0 right-0 left-0 bottom-0"></Link>
                                        <div className="relative mb-4 rounded-2xl">
                                            <img className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                                src="assets/imagen/producto.png" alt=""/>
                                            <Link className="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                                               href={route('producto.ver',cate.id)} target="_self" rel="noopener noreferrer">
                                                Ver Productos 
                                            </Link>
                                        </div>
                                        <div className="flex justify-between items-center w-full pb-4 mb-auto">
                                            <div className="flex items-center">
                                                <p className="text-sm font-light ">
                                                    {cate.descripcion.length > 50
                                                        ? `${cate.descripcion.slice(0, 50)}...`
                                                        : cate.descripcion
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <h3 className="font-medium text-xl leading-8">
                                            <Link  href={route('producto.ver',cate.id)}
                                                className="block relative group-hover:text-red-700 transition-colors duration-200 ">
                                                {cate.categoria} 
                                            </Link>
                                        </h3>
                                    </article> 
                                ))
                            }
                            
                            
                        </div>


                    </div>
                    

                </div> 

            </section>
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

                            <a href="#" className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">78876546</a>

                            
                        </div>

                    </div>

                </div> 

            </footer>
            

        </>
    );
}
