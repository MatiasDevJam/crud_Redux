import {AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


// crear nuevos productos
export function creaNuevoProductoAction( producto ) {
    return async ( dispatch ) => {
        dispatch( agregarProducto() );

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto)

            // si todo sale bien, actualizamos el state  
            dispatch( agregarProductoExito( producto ) );

            // alerta con SweetAlert
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )

        } catch ( error ){
            console.log( error )

            dispatch( agregarProductoError( true ) )

            // alerta de error 
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// si el produto se guarda en la base de datos
const agregarProductoExito = ( producto ) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hay un error 
const agregarProductoError = ( estado ) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// Función que descargar los productos de la base de datos
export function obtenerProductosAction() {
    return async( dispatch ) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa( respuesta.data ) )
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// selecciona y elimina el producto
export function borrarProductoAction( id ) {
    return async( dispatch ) => {
        dispatch( obtenerProductoEliminar( id ) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() )

            // si se elimina, mostrar alerta
            Swal.fire(
                '¡Eliminadi!',
                'El producto se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = ( id ) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO,
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
});

// colocar producto en edición
export function obtenerProductoEditar( producto ) {
    return( dispatch ) => {
        dispatch( obtenerProductoEditarAction( producto ) )
    }
}

const obtenerProductoEditarAction = ( producto ) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function editarProductoAction( producto ) {
    return async( dispatch ) => {
        dispatch( editarProducto( ) )

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito( producto ) )
        } catch (error) {
            dispatch( editarProductoError() )
        }
    }
}

const editarProducto = ( producto ) => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = ( producto ) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})