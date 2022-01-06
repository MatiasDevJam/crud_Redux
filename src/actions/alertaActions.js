import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types'

// muestra alerta
export function mostrarAlerta( alerta ) {
    return( dispatch ) => {
        dispatch( crearAlerta( alerta ) )
    }
}

const crearAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

// ocultar alerta
export function ocultarAlertaAction( alerta ) {
    return( dispatch ) => {
        dispatch( ocultarAlerta( alerta ) )
    }
}

const ocultarAlerta = alerta => ({
    type: OCULTAR_ALERTA,
})