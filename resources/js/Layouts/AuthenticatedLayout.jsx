import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import "primeicons/primeicons.css";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div
            id="view"
            className="h-full w-screen flex flex-row"
            x-data="{ sidenav: true }"
            >

            <button
            click="sidenav = true"
            className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
            >
                <i className="pi pi-bars mr-3"></i>
            </button>
            <div
            id="sidebar"
            className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
            x-show="sidenav"
            /* click.away="sidenav = false" */
            >
                <div className="space-y-6 md:space-y-10 mt-10">
                    <h1 className="font-bold text-4xl text-center md:hidden">
                    D<span className="text-teal-600">.</span>
                    </h1>
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                    Electronica<span className="text-teal-600"></span>
                    </h1>
                    <div id="profile" className="space-y-3">
                    <img
                        src="/assets/imagen/avatar.png"
                        alt="Avatar user"
                        className="w-10 md:w-16 rounded-full mx-auto"
                    />
                    <div>
                        <h2
                        className="font-medium text-xs md:text-sm text-center text-teal-500"
                        >
                            <Link href={route('profile.edit')}>
                                {user.name}
                            </Link>
                        
                        </h2>
                        <p className="text-xs text-gray-500 text-center">Administrator</p>
                    </div>
                    </div>

                    <div id="menu" className="flex flex-col space-y-2">
                        <Link
                            href={route('dashboard')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-building-columns mr-3" ></i>
                            <span className="">Principal</span>
                        </Link>
                        <Link
                            href={route('categoria.index')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-clipboard mr-3" ></i>
                            <span className="">Categorias</span>
                        </Link>
                        <Link
                            href={route('producto.index')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-microchip mr-3" ></i>
                            <span className="">Productos</span>
                        </Link>
                        
                        <Link
                            href={route('productoEntrada.index')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-file-check mr-3" ></i>
                            <span className="">Entrada de Producto</span>
                        </Link>
                        <Link
                            href={route('productoVenta.index')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-cart-plus mr-3" ></i>
                            <span className="">Venta de Producto</span>
                        </Link>
                        <Link
                            href={route('cliente.index')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-users mr-3" ></i>
                            <span className="">Clientes</span>
                        </Link>

                        <br />
                        <hr />


                        

                        <a
                            href={route('logout')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                        >
                            <i className="pi pi-sign-out mr-3" ></i>
                            <span className="">Salir</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="right w-full flex gap-2 flex-col">
                <div className="p-4">
                    <h1 className="text-xl font-semibold text-slate-500 page-title mt-10 mb-6">{header}</h1>
                    <div className="md:col-span-2 lg:col-span-1" >
                        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                            <main>{children}</main>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
