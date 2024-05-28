import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link,router, useForm } from '@inertiajs/react';
import { Edit2, Trash, Eye,User } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import Modal from '@/Components/Modal'; 
import '../../../css/paginacion.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function ProductoEntradaIndex({ auth,productoEntradas,productos,categorias,mensaje }) {
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

    const productoEntradasPerPage = 9;
    const pagesVisited = pageNumero * productoEntradasPerPage;
    const pageCount = Math.ceil(productoEntradas.length / productoEntradasPerPage);

    const changePage = ({ selected }) => {
        setPageNumero(selected);
    };

    const displayedProductoEntradas = productoEntradas.slice(pagesVisited, pagesVisited + productoEntradasPerPage);


    /////////VISTA////
    const [selectedProductoEntrada, setSelectedProductoEntrada] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openModal = (productoEntrada) => {
        setSelectedProductoEntrada(productoEntrada);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    ////VISTA///



              /////////////////////REPORTE ///////////////////
              const obtenerFechaActual = () => {
                const fecha = new Date();
                const year = fecha.getFullYear();
                const month = fecha.getMonth() + 1;
                const day = fecha.getDate();
                return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            };
              const { data, setData, post, processing, errors } = useForm({
                fechaInicio: obtenerFechaActual(),
                fechaFinal: obtenerFechaActual(),
                productoId:'general',
                categoriaId:'general'
            });
        
            const [visibleReporte, setVisibleReporte] = useState(false);
        
            const showMaterialReporte = () => {
                setVisibleReporte(true);
            };
        
            const onHideReporte = () => {
                setVisibleReporte(false);
            };
        
            const handleReporte = () => {
                const fechaInicio = data.fechaInicio;
                const fechaFinal = data.fechaFinal;
                const productoId = data.productoId;
            const categoriaId = data.categoriaId;
                
                window.open( `/reporte/productoEntrada/${fechaInicio}/${fechaFinal}/${productoId == ''?'general':productoId}/${categoriaId == ''?'general':categoriaId}`, '_blank');
                
            };
            /////////////////////REPORTE ///////////////////


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">LISTA DE ENTRADAS DE PRODUCTOS</h2>}
        >
            <div>
                <ToastContainer />
            </div>


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-end">
                                <Link onClick={(e) => { e.preventDefault(); showMaterialReporte(); }} className='px-3 py-1 text-white bg-red-500 rounded-md focus:outline-none mr-4' href={route("categoria.create")}>
                                    <i className='pi pi-cloud-download mr-2'></i>
                                    REPORTE
                                </Link>
                                <Link className='px-3 py-1 text-white bg-blue-500 rounded-md focus:outline-none' href={route("productoEntrada.create")}>
                                    <i className='pi pi-plus-circle mr-2'></i>
                                    NUEVA ENTRADA PRODUCTO
                                </Link>
                            </div>
                            <div className="overflow-x-auto mt-11">
                                {productoEntradas && productoEntradas.length > 0 ? (
                                    <>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Unitario</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {displayedProductoEntradas.map((productoEntrada,index) => (
                                                    <tr key={productoEntrada.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{contador+index}</td>
                                         
                                                        <td className="px-6 py-4 whitespace-nowrap">{productoEntrada.producto_nombre}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{productoEntrada.cantidad}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{productoEntrada.fecha}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{productoEntrada.costoUnitario}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap flex ">
                                                            {
                                                                productoEntrada.editControl&&(
                                                                    <Link href={`/productoEntrada/edit/${productoEntrada.id}`}data-tooltip-id="editCategoria" data-tooltip-content="EDITAR" className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                                        <Edit2 size={17} />
                                                                    </Link>
                                                                )
                                                            }
                                                            <Tooltip id="editCategoria" />
                                                            <button onClick={() => openModal(productoEntrada)} data-tooltip-id="showProductoEntrada" data-tooltip-content="VER" className="text-green-600 hover:text-green-900 mr-2">
                                                                <Eye size={17}/>
                                                            </button>
                                                            <Tooltip id="showProductoEntrada" />
                                                        </td>
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
                                    <div style={{ textAlign: 'center' }}>No hay Producto Entradas</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Modal show={showModal} closeModal={closeModal}>
                        {selectedProductoEntrada && (
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <i className="pi pi-file-check" ></i>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Entrada de Producto
                                        </h3>
                                        <br />
                                        <br />
                                        <div>
                                            <p>{selectedProductoEntrada.producto_nombre} - ({selectedProductoEntrada.codigo})</p>
                                            <p><strong>Categoria:</strong> {selectedProductoEntrada.categoria} </p>
                                            <p><strong>Cantidad:</strong> {selectedProductoEntrada.cantidad}</p>
                                            <p><strong>Costo Unitario:</strong> {selectedProductoEntrada.costoUnitario} Bs</p>
                                            <p><strong>Costo Total:</strong> {selectedProductoEntrada.costoTotal} Bs</p>
                                            <p><strong>Fecha:</strong> {selectedProductoEntrada.fecha}</p>
                                            <p><strong>Gestion:</strong> {selectedProductoEntrada.gestion}</p>
                                            <p><strong>Descripcion:</strong> {selectedProductoEntrada.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            className="bg-red-500 text-white py-2 px-4 mt-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ml-10 mb-10"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </Modal>



                    <Modal show={visibleReporte} closeModal={onHideReporte}>
                        <div class="relative py-3 sm:max-w-xl sm:mx-auto overflow-y-scroll" style={{ height: '700px' }}>
                            <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                            <div class="max-w-md mx-auto">
                                <div class="flex items-center space-x-5">
                                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 class="leading-relaxed">REPORTE DE ENTRADA DE PRODUCTOS</h2>
                                
                                </div>
                                </div>
                                <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="flex flex-col">
                                    <label class="leading-loose">FECHA INICIO</label>
                                        <DatePicker
                                            id="fechaInicio"
                                            selected={data.fechaInicio}
                                            onChange={(date) => {
                                                const year = date.getFullYear();
                                                const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                                                const day = date.getDate();
                                                const formattedDateInicio = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                                setData('fechaInicio', formattedDateInicio);
                                            }}
                                            autocomplete="off"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        />
                                    </div>
                                    
                                </div>
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="flex flex-col">
                                    <label class="leading-loose">FECHA FINAL</label>
                                        <DatePicker
                                            id="fechaFinal"
                                            selected={data.fechaFinal}
                                            onChange={(date) => {
                                                const year = date.getFullYear();
                                                const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                                                const day = date.getDate();
                                                const formattedDateFinal = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                                setData('fechaFinal', formattedDateFinal);
                                            }}
                                            autocomplete="off"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        />
                                    </div>
                                    
                                </div>
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="flex flex-col">
                                    <label class="leading-loose">CATEGORIA</label>
                                        <select
                                            id="productoId"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                            value={data.productoId}
                                            onChange={(e) => setData('productoId', e.target.value)}
                                            required
                                        >
                                            <option value="general">GENERAL</option>
                                            {productos.map((producto) => (
                                                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                

                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="flex flex-col">
                                    <label class="leading-loose">PRODUCTO</label>
                                        <select
                                            id="categoriaId"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                            value={data.categoriaId}
                                            onChange={(e) => setData('categoriaId', e.target.value)}
                                            required
                                        >
                                            <option value="general">GENERAL</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                                            ))}
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