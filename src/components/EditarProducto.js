import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editarProductoAction } from '../actions/productoActions'

export const EditarProducto = () => {

    const history = useNavigate();

    const dispatch = useDispatch()

    // nuevo state de producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    })
    // producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);

    // llenar el state automaticamente
    useEffect(() => {
        setProducto( productoeditar )
    }, [ productoeditar ])

    // leer los datos del formulario
    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [ e.target.name ] : e.target.value
        })
    }

    const { nombre, precio } = producto;

    const submitEditarProducto = ( e ) => {
        e.preventDefault();

        dispatch( editarProductoAction(producto) );
        history.push('/');
    }

    return (
        <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Editar Nuevo Producto
                    </h2>

                    <form
                        onSubmit={ submitEditarProducto }
                    >
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input 
                                type="text" 
                                className='form-control'
                                name='nombre'
                                value={ nombre }
                                onChange={ onChangeFormulario }
                            />
                        </div>

                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input 
                                type="number" 
                                className='form-control'
                                name='precio'
                                value={ precio }
                                onChange={ onChangeFormulario }
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        >
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
