'use strict';

import Matricula from './matricula/matricula.promueve.module';
import Tramite from './tramite/tramite.promueve.module';
import Certificacion from './certificacion/certificacion.promueve.module';
import Bandeja from './bandeja/bandeja.promueve.module';
import Solicitud from './solicitud/solicitud.promueve.module';

const Empresario = angular
    .module('app.promueve.empresario', [
        Matricula,
        Tramite,
        Certificacion,
        Bandeja,
        Solicitud
    ])
    .name;

export default Empresario;
