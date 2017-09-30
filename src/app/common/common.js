'use strict';

// Importando css de las librerías del sistema
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/angular-loading-bar/build/loading-bar.css';
import '../../../node_modules/angular-toastr/dist/angular-toastr.min.css';
import '../../../node_modules/ui-select/dist/select.min.css';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './core/vendor/ng-table/ng-table.css';
import './styles/sass/index.scss';
import './styles/postcss/index.css';

// Importando dependencias
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import loadingBar from 'angular-loading-bar';
import ngSanitize from 'angular-sanitize';
import ngResource from 'angular-resource';
import ngMessages from 'angular-messages';
import uiSelect from 'ui-select';
import toastr from 'angular-toastr';


// import 'tether'; // Tether (required for Bootstrap 4.x)
import '../../../node_modules/angular-formly/dist/formly';
import '../../../node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap';
import '../../../node_modules/leaflet/dist/leaflet';
import '../../../node_modules/angular-leaflet-directive/dist/angular-leaflet-directive';
import '../../../node_modules/angular-file-upload/dist/angular-file-upload';
import './core/vendor/ng-table/ng-table';

import Config from './common.config';
import Run from './common.run';

import Lang from './lang/lang.module';
import Core from './core/core.module';
import Layout from './layout/layout.module';

const Common = angular
    .module('app.common', [
        loadingBar,
        ngSanitize,
        ngResource,
        ngMessages,
        satellizer,
        'angularFileUpload',
        'formlyBootstrap',
        toastr,
        'ngTable',
        'leaflet-directive',
        uiRouter,
        uiSelect,
        Lang,
        Core,
        Layout
    ])
    .config(Config)
    .run(Run)
    // Controlar state(url) previos para cada state, si no se define en un state trabajara normal
    .constant('statePrevs', {})
    .name;

export default Common;
