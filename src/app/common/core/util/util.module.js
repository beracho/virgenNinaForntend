'use strict';

import CrudTable from './crud-table/crud-table.module';
import Material from './material/material.module';
import FormsComponents from './forms/forms.module';
import Help from './help/help.module';

const Components = angular
    .module('app.util', [
        CrudTable,
        Material,
        FormsComponents,
        Help
    ])
    .name;

export default Components;
