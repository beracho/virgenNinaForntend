'use strict';

import Dashboard from './dashboard/dashboard.module';
import Micuenta from './micuenta/micuenta.module';
import Login from './login/login.module';
import User from './user/user.module';
import ProboliviaAdm from './probolivia/probolivia.adm.module';
import PromueveAdm from './promueve/promueve.adm.module';
import SelloboliviaAdm from './sellobolivia/sellobolivia.adm.module';
import CertificacionVerificacion from './certificacion.verificacion/certificacion.verificacion.module';

const Admin = angular
    .module('app.admin', [
        Dashboard,
        Login,
        User,
        ProboliviaAdm,
        PromueveAdm,
        SelloboliviaAdm,
        CertificacionVerificacion,
        Micuenta
    ])
    .name;

export default Admin;