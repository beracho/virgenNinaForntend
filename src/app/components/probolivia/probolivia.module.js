'use strict';

import Empresario from './empresario/empresario.module';
import Artesano from './artesano/artesano.module';

const Components = angular
    .module('app.probolivia', [
        Empresario,
        Artesano
    ])
    .name;

export default Components;