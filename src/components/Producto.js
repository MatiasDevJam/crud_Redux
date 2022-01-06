import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions'

export const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useNavigate();

    // confirmar si desea eliminarlo
    const confirmarEliminarProducto = ( id ) => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Estas a punto de eliminar un producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

                // pasarlo al action
                dispatch( borrarProductoAction( id ) );
              
            }
          })
    }

    // función que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar( producto ) )
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <th scope="row">{ nombre }</th>
           
            <td><span className='font-weiight-bold'>$ { precio }</span></td>
            <td className='acciones'>
                <button 
                    type='button'
                    onClick={ () => { redireccionarEdicion() }} 
                    className='btn btn-primary mr-2'>
                    Editar
                </button>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={ () => confirmarEliminarProducto( id ) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
