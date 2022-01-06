import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

// actions de redux
import { creaNuevoProductoAction } from '../actions/productoActions'


// cuando el usuario haga submit
export const NuevoProducto = ({ history }) => {

    // state del componente
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    // utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta)

    // mandar a llamar el action de productoActions
    const agregarProducto = ( producto ) => dispatch( creaNuevoProductoAction ( producto ) )

    const handleSubmit = ( e ) => {
        e.preventDefault()

        // validar formulario
        if( nombre.trim() === '' || precio <= 0) {

            const respuesta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta( respuesta ) )

            return;
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() )

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // redireccionar
        history.push('/');

    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar Nuevo Producto
                        </h2>

                        { alerta ? <p className={ alerta.classes }> {alerta.msg} </p> : null }

                        <form
                            onSubmit={ handleSubmit }
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className='form-control'
                                    name={ nombre }
                                    onChange={e => setNombre( e.target.value )}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input 
                                    type="number" 
                                    className='form-control'
                                    name={ precio }
                                    onChange={e => setPrecio( +(e.target.value) )}
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}
