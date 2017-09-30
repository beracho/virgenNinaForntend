'use strict';

import DdjjComponent from './ddjj.component';
import DdjjdetalleComponent from './ddjjdetalle.component';
import DdjjacreditarComponent from './ddjjacreditar.component';
import './ddjjdetalle.css';

const Ddjj = angular
    .module('app.ddjj', [])
    .component('appDdjjcom', DdjjComponent)
    .component('appDdjjdetallecom', DdjjdetalleComponent)
    .component('appDdjjacreditarcom', DdjjacreditarComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('ddjj', {
                url: '/declaracionesJuradas',
                component: 'appDdjjcom'
            })
            .state('ddjjcompo', {
                url: '/declaracionDetalle',
                component: 'appDdjjdetallecom'
            })
            .state('ddjjcompoa', {
                url: '/declaracionAcreditar',
                component: 'appDdjjacreditarcom'
            });
        $urlRouterProvider.otherwise('/');
        
    })
    .name;

export default Ddjj;