'use strict';

import Admin from './admin/admin.module';
import Probolivia from './probolivia/probolivia.module';
import Promueve from './promueve/promueve.module';
import Sellobolivia from './sellobolivia/sellobolivia.module';

const Components = angular
    .module('app.components', [
        Admin,
        Probolivia,
        Promueve,
        Sellobolivia
    ])
    .name;

export default Components;
