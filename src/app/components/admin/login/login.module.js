'use strict';

import LoginComponent from './login.component';
import LoginAdminComponent from './login.admin.component';
import AuthService from './auth.service';
import './login.css';

const Login = angular
    .module('app.login', [])
    .service('Auth', AuthService)
    .component('appAdminLogin', LoginComponent)
    .component('appAdminLoginAdmin', LoginAdminComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'appAdminLogin'
            })
            .state('loginAdmin', {
                url: '/loginAdmin',
                component: 'appAdminLoginAdmin'
            })
            .state('logout', {
                url: '/logout',
                controller: (Auth) => {
                    Auth.logout();
                }
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Login;