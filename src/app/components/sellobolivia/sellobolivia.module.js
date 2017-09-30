'use strict';

import Bandeja from './bandeja/bandeja.sellobolivia.module';
import Solicitud from './solicitud/solicitud.sellobolivia.module';

const Components = angular
    .module('app.sellobolivia', [
        Bandeja,
        Solicitud
    ])
    .name;

export default Components;
