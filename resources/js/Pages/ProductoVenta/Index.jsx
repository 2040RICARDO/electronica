import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link,router, useForm } from '@inertiajs/react';
import { Edit2, Trash, Eye,User,Check,AlertTriangle,AlertOctagon,CheckCircle,Printer } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import Modal from '@/Components/Modal'; 
import '../../../css/paginacion.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import PrimaryButton from '@/Components/PrimaryButton';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function ProductoVentaIndex({ auth,ventas,productos,categorias,mensaje }) {
    const [pageNumero, setPageNumero] = useState(0);
    const [contador, setContador] = useState(1);

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1;
        const day = fecha.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

        //////////////////////////////FORMULARIO DE BLOQUEO//////////////////
        const { data, setData, post, processing, errors } = useForm({
            ventaId:'',
            productIdS: [],

            fechaInicio: obtenerFechaActual(),
            fechaFinal: obtenerFechaActual(),
            productoId:'general',
            categoriaId:'general',
            estado:4
        });

        const submit = (e) => {
            e.preventDefault();
            post(route('productoVenta.estado'));
            setShowModalBloqueo(false);
        };

        const handleCheckboxChange = (e, productId) => {
            const isChecked = e.target.checked;

            setData(prevData => ({
                ...prevData,
                productIdS: isChecked
                    ? [...prevData.productIdS, productId]
                    : prevData.productIdS.filter(id => id !== productId),
            }));
        };
        //////////////////////////FORMULARIO DE BLOQUEO/////////////



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

    const productoVentasPerPage = 9;
    const pagesVisited = pageNumero * productoVentasPerPage;
    const pageCount = Math.ceil(ventas.length / productoVentasPerPage);

    const changePage = ({ selected }) => {
        setPageNumero(selected);
    };

    const displayedProductoEntradas = ventas.slice(pagesVisited, pagesVisited + productoVentasPerPage);


    /////////VISTA////
    const [selectedProductoVenta, setSelectedProductoVenta] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openModal = (productoVenta) => {
        setSelectedProductoVenta(productoVenta);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    ////VISTA///

    ////////////BLOQUEAR VENTA/////////////
    const [selectedBloqueo, setSelectedBloqueo] = useState(null);
    const [showModalBloqueo, setShowModalBloqueo] = useState(false);
    const openModalBloqueo = (productoVenta) => {
        setSelectedBloqueo(productoVenta);
        setData('ventaId',selectedBloqueo.id)
        setShowModalBloqueo(true);
    };

    const closeModalBloqueo = () => {
        setData(prev =>({
            ...prev,
            productIdS:[],
            ventaId:''
        }))
        setShowModalBloqueo(false);
    };
    ////////////BLOQUEAR VENTA/////////////




        /////////////////////REPORTE ///////////////////
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
            const estado = data.estado;
            
            window.open( `/reporte/productoVenta/${fechaInicio}/${fechaFinal}/${productoId == ''?'general':productoId}/${categoriaId == ''?'general':categoriaId}/${estado}`, '_blank');
            
        };
        /////////////////////REPORTE ///////////////////



        //VALIDAR PEDIDO///
        const ValidarPedido = (e,id) => {
            e.preventDefault();
            Swal.fire({
                title: '¿Estas seguro de validar el pedido?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.get(`/productoVenta/validar_pedido/${id}`);
                }
            });
        };
        //VALIDAR PEDIDO//


        const handleRecibo = (id) => {

            window.open( `/reporte/reciboVenta/${id}`, '_blank');
        };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">LISTA VENTA DE PRODUCTOS</h2>}
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
                                <Link className='px-3 py-1 text-white bg-blue-500 rounded-md focus:outline-none' href={route("productoVenta.create")}>
                                    <i className='pi pi-plus-circle mr-2'></i>
                                    NUEVA VENTA
                                </Link>
                            </div>
                            <div className="overflow-x-auto mt-11">
                                {ventas && ventas.length > 0 ? (
                                    <>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fecha</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Venta</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Venta</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {displayedProductoEntradas.map((venta,index) => (
                                                    <tr key={venta.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{contador+index}</td>
                                         
                                                        <td className="px-6 py-4 whitespace-nowrap">{venta.nombre} {venta.apellidos}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{venta.fecha}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{venta.totalVenta} Bs</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span class={`rounded ${(venta.estadoVenta == 0) ?'bg-red-400':(venta.estadoVenta == 1)?'bg-green-400':'bg-yellow-300'} py-1 px-3 text-xs font-bold`}>
                                                                {(venta.estadoVenta == 0) ?'ANULADO':(venta.estadoVenta == 1)?'VENTA':'PENDIENTE'} 
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap flex ">
                        
                                                           
                                                            <button onClick={() => openModal(venta)} data-tooltip-id="showProductoEntrada" data-tooltip-content="VER" className="text-green-600 hover:text-green-900 mr-2">
                                                                <Eye size={17}/>
                                                            </button>
                                                            <Tooltip id="showProductoEntrada" />



                                                            {
                                                                (venta.estadoVenta == 2) &&(

                                                                    <>
                                                                    <button type='button' onClick={(e) => ValidarPedido(e, venta.id)} data-tooltip-id="validarCat" data-tooltip-content={`VALIDAR VENTA`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                                        <CheckCircle size={17} className='text-yellow-500'/>
                                                                    </button>
                                                                    <Tooltip id="validarCat" />
                                                                    </>
                                                                )
                                                            }


                                                            {
                                                                (venta.estadoVenta == 1 ||venta.estadoVenta == 2) &&(

                                                                    <>
                                                                    <button onClick={() => openModalBloqueo(venta)}  data-tooltip-id="editCategoria" data-tooltip-content={`CANCELAR VENTA`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                                        <AlertTriangle size={17} className='text-red-400'/>
                                                                    </button>
                                                                    <Tooltip id="editCategoria" />
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                venta.estadoVenta == 1&&(
<>
                                                                    <button onClick={(e) => { e.preventDefault(); handleRecibo(venta.id); }}  data-tooltip-id="printVenta" data-tooltip-content={`RECIBO DE VENTA`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                                        <Printer size={17} className='text-blue-400'/>
                                                                    </button>
                                                                    <Tooltip id="printVenta" />
                                                                    </>
                                                                )  
                                                            }
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
                                    <div style={{ textAlign: 'center' }}>No hay Ventas</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Modal show={showModal} closeModal={closeModal}>
                        {selectedProductoVenta && (
                            <div className="overflow-y-scroll" style={{ height: '500px' }}  >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <i className="pi pi-file-check" ></i>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                DATOS DE VENTA
                                            </h3>
                                            <br />
                                            <br />
                                            <div>
                                                {/* <p>{selectedProductoVenta.producto_nombre} - ({selectedProductoVenta.codigo})</p> */}
                                                <p><strong>Fecha Venta:</strong> {selectedProductoVenta.fecha} </p>
                                                <p><strong>Gestion:</strong> {selectedProductoVenta.gestion}</p>
                                                <p><strong>Total Venta:</strong> {selectedProductoVenta.totalVenta} Bs</p>
                                                <p><strong>Descripcion:</strong> {selectedProductoVenta.descripcion}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <i className="pi pi-file-check" ></i>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                DATOS DE CLIENTE
                                            </h3>
                                            <br />
                                            <br />
                                            <div>
                                                <p>{selectedProductoVenta.nombre} - ({selectedProductoVenta.apellidos})</p>
                                                <p><strong>CI:</strong> {selectedProductoVenta.ci} </p>
                                                <p><strong>Celular:</strong> {selectedProductoVenta.celular}</p>
                                                <p><strong>Direccion:</strong> {selectedProductoVenta.direccion} Bs</p>
                                            
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <i className="pi pi-file-check" ></i>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                DATOS DE LOS PRODUCTOS
                                            </h3>
                                            <br />
                                            <br />
                                            <div>
                                                {
                                                    selectedProductoVenta.productos.map(pro => (
                                                        <div>
                                                  
                                                            <p><strong>Producto:</strong> {pro.nombreProducto} </p>
                                                            <p><strong>Categoria:</strong> {pro.categoria}</p>
                                                            <p><strong>Cantidad:</strong> {pro.cantidad}</p> 
                                                            <p><strong>Precio Unitario:</strong> {pro.precioUnitario} Bs</p> 
                                                            <p><strong>Total Venta Producto:</strong> {pro.totalProductoVenta} Bs</p> 
                                                            <br />
                                                            <hr />
                                                            <br />
                                                        </div> 
                                                    ))
                                                }
                                            </div>
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


                    <Modal show={showModalBloqueo} closeModal={closeModalBloqueo}>
                        <form onSubmit={submit} >
                            {selectedBloqueo && (
                                <div className="overflow-y-scroll" style={{ height: '500px' }}  >
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <i className="pi pi-file-check" ></i>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                    BLOQUEAR LA VENTA
                                                    <br />
                                                    <br />
                                                    <div class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert">
                                                        <AlertOctagon size={17} className='mr-3'/>
                                                        <div>
                                                            <span class="font-medium">Importante!</span> Debe seleccionar los productos que se sumaran al stock del producto ,debe tomar en cuanta que esta accion no se puede deshacer.
                                                        </div>
                                                    </div>
                                                </h3>
                                                <br />
                                                <br />
                                                <div>
                                                    <table className="items-center w-full border-collapse text-blueGray-700">
                                                        <thead class="thead-light ">
                                                            <tr>
                                                                <th class="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>

                                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                    Producto
                                                                </th>
                                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                    Cantidad
                                                                </th>
                                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                    Precio
                                                                </th>
                                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                    Precio Total
                                                                </th>
                                                                <th class="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {selectedBloqueo.productos.map(pro => (
                                                            <tr key={pro.id}>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <input type="checkbox" onChange={(e) => handleCheckboxChange(e, pro.productoVentaId)} />
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pro.nombreProducto}</td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pro.cantidad}</td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pro.precioUnitario} Bs</td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{pro.totalProductoVenta} Bs</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>            
                                </div>
                            )}
                            <button
                                type="button"
                                className="bg-red-500 text-white py-2 px-4 mt-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ml-10 mb-10 mr-4"
                                onClick={closeModalBloqueo}
                            >
                                Cerrar
                            </button>
                            <PrimaryButton  className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Confirmar
                            </PrimaryButton>
                        </form>
                    </Modal>


                    <Modal show={visibleReporte} closeModal={onHideReporte}>
                        <div class="relative py-3 sm:max-w-xl sm:mx-auto overflow-y-scroll" style={{ height: '700px' }}>
                            <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                            <div class="max-w-md mx-auto">
                                <div class="flex items-center space-x-5">
                                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 class="leading-relaxed">REPORTE DE VENTA DE PRODUCTOS</h2>
                                
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
                                            <option key="0" value={0}>ANULADO</option>
                                            <option key="1" value={1}>VENTA</option>
                                            <option key="2" value={2}>PENDIENTE</option>
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