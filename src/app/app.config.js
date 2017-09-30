'use strict';

import config from '../../config.json';

const server = config.server;

const Config = angular
    .module('app.config', [])
    .constant('appName', 'probolivia') // prefijo del sistema para el Storage y Sessiones
    .constant('systemName', 'Ventanilla de Registros')

    .constant('timeSessionExpired', config.timeSessionExpired) //Tiempo en minutos para que la sesión se cierre automáticamente si existe i$
    .constant('onbeforeunload', config.onbeforeunload)
    .constant('debug', config.debug)
    .constant('PageNoLogin', ['login', 'crear_cuenta', 'confirmarCuenta', 'verificacion', 'registroArtesano']) // Rutas que no requieren autenticación
    .constant('PageNoRedirectLogin', ['/certificacion/verificar', '/verificacion']) // urls que no se redireccionaran, ni verificara si tiene usuario al iniciar la pagina
    .constant('authUrl', server + '/autenticar/') // URL para autenticacion
    .constant('apiUrl', server + '/api/v1/') // Rest principal del sistema
    .constant('rdxUrl', config.rdxUrl) // URL la actualizacion de cuenta B.U.
    .constant('rdxUrljs', config.rdxUrljs) // Url del script js para crear rdx
    .constant('baseUrl', `${server}/`) // Ruta base
    .name;

export default Config;
