import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link,router, useForm } from '@inertiajs/react';
import { Edit2, Trash, Eye,User,Download } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import Modal from '@/Components/Modal'; 
import '../../../css/paginacion.css';
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ClienteIndex({ auth, clientes,mensaje }) {
    const [pageNumero, setPageNumero] = useState(0);
    const [contador, setContador] = useState(1);

    useEffect(() => {
        if(mensaje != null){
            notify(mensaje);
        }
    }, []);
    const notify = (mensaje) => toast.success(mensaje, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const clientesPerPage = 9;
    const pagesVisited = pageNumero * clientesPerPage;
    const pageCount = Math.ceil(clientes.length / clientesPerPage);

    const changePage = ({ selected }) => {
        setPageNumero(selected);
    };

    const displayedClientes = clientes.slice(pagesVisited, pagesVisited + clientesPerPage);


      /////////////////////REPORTE ///////////////////

      const { data, setData, post, processing, errors } = useForm({
        estado: 4,
    });

    const [visibleReporte, setVisibleReporte] = useState(false);

    const showMaterialReporte = () => {
        setVisibleReporte(true);
    };

    const onHideReporte = () => {
        setVisibleReporte(false);
    };

    const handleReporte = () => {
        const estado = data.estado;
        window.open( `/reporte/cliente`, '_blank');
    };
    /////////////////////REPORTE ///////////////////
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">LISTA DE CLIENTES</h2>}
        >
            <div>
                <ToastContainer />
            </div>


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-end">
             
                                <Link onClick={(e) => { e.preventDefault(); handleReporte(); }}  className='px-3 py-1 text-white bg-red-500 rounded-md focus:outline-none mr-4' href={route("categoria.create")}>
                                    <i className='pi pi-cloud-download mr-2'></i>
                                    REPORTE
                                </Link>


                            </div>
                            <div className="overflow-x-auto mt-11">
                                {clientes && clientes.length > 0 ? (
                                    <>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direccion</th>
                          
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {displayedClientes.map((cliente,index) => (
                                                    <tr key={cliente.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{contador+index}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.nombre} {cliente.apellidos}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.celular}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.direccion}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="flex justify-center mt-4">
                                            <ReactPaginate
                                                previousLabel={'Anterior'}
                                                nextLabel={'Siguiente'}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>No hay clientes</div>
                                )}
                            </div>
                        </div>
                    </div>
                  

                    <Modal show={visibleReporte} closeModal={onHideReporte}>
        
                        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                            <div class="max-w-md mx-auto">
                                <div class="flex items-center space-x-5">
                                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 class="leading-relaxed">REPORTE CATEGORIA</h2>
                                   
                                </div>
                                </div>
                                <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="flex flex-col">
                                    <label class="leading-loose">ESTADO</label>
                                        <select
                                            id="estado"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                            value={data.estado}
                                            onChange={(e) => setData('estado', e.target.value)}
                                            required
                                        >
                                            <option key="4" value={4}>GENERAL</option>
                                            <option key="1" value={1}>HABILITADO</option>
                                            <option key="0" value={0}>DASHABILITADO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="pt-4 flex items-center space-x-4">
                                    <button onClick={onHideReporte} class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                                        <i className='pi pi-times mr-3'></i> Cerrar
                                    </button>
                                    <button type='button' onClick={(e) => { e.preventDefault(); handleReporte(); }}  class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Reporte</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Modal>

                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}