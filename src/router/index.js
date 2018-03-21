import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/admin/Dashboard';
// Auth
import Login from '@/components/admin/auth/Login';
import LoginAdmin from '@/components/admin/auth/LoginAdmin';
import AppNotFound from '@/common/layout/pages/AppNotFound';
import AppForbidden from '@/common/layout/pages/AppForbidden';
import AppError from '@/common/layout/pages/AppError';
import Usuario from '@/components/admin/usuario/Usuario';
import ConfirmarCuenta from '@/components/admin/account/confirmarCuenta';
import BandejaInscritos from '@/components/inscripciones/BandejaInscritos';
import RegistroInscripcion from '@/components/inscripciones/RegistroInscripcion';
import Cursos from '@/components/inscripciones/Cursos';
import Account from '@/components/admin/account/Account';

import Entidad from '@/components/admin/entidad/Entidad';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loginAdmin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/usuarios',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/confirmarCuenta',
      name: 'ConfirmarCuenta',
      component: ConfirmarCuenta
    },
    {
      path: '/bandejaInscritos',
      name: 'BandejaInscritos',
      component: BandejaInscritos
    },
    {
      path: '/cursos',
      name: 'Cursos',
      component: Cursos
    },
    {
      path: '/registroInscripcion',
      name: 'RegistroInscripcion',
      component: RegistroInscripcion
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/entidades',
      name: 'Entidad',
      component: Entidad
    },
    {
      path: '/404',
      component: AppNotFound
    },
    {
      path: '/403',
      component: AppForbidden
    },
    {
      path: '/500',
      component: AppError
    },
    {
      path: '*',
      component: AppNotFound
    }
  ]
});
