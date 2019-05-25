import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/admin/Dashboard';
// Auth
import Login from '@/components/admin/auth/Login';
import NewPassword from '@/components/admin/account/newPassword';
import LoginAdmin from '@/components/admin/auth/LoginAdmin';
import AppNotFound from '@/common/layout/pages/AppNotFound';
import AppForbidden from '@/common/layout/pages/AppForbidden';
import AppError from '@/common/layout/pages/AppError';
import Usuario from '@/components/admin/usuario/Usuario';
import Configuracion from '@/components/admin/usuario/Configuracion';
import ConfirmarCuenta from '@/components/admin/account/confirmarCuenta';
import RegistrosPorArea from '@/components/direccion/registrosPorArea';
import EstadisticasPorEstudiante from '@/components/direccion/estadisticasPorEstudiante';
import RegistrosDireccion from '@/components/direccion/registrosDireccion';
import BandejaInscritos from '@/components/inscripciones/BandejaInscritos';
import RegistroInscripcion from '@/components/inscripciones/RegistroInscripcion';
import Cursos from '@/components/inscripciones/Cursos';
import busquedaNiños from '@/components/atencionMedica/busquedaNino';
import DatosEstudiante from '@/components/atencionMedica/datosEstudiante';
import RegistrosArchivados from '@/components/atencionMedica/registrosArchivados';
import RegistroSimple from '@/components/atencionMedica/registroSimple';
import RegistroSemestral from '@/components/atencionMedica/registroSemestral';
import RegistroEvaluacionEducacion from '@/components/atencionMedica/registroEvaluacionEducacion';
import RegistroEvaluacionFisioterapia from '@/components/atencionMedica/registroEvaluacionFisioterapia';
import RegistroEvaluacionFonoaudiologia from '@/components/atencionMedica/registroEvaluacionFonoaudiologia';
import RegistroEvaluacionMedicinaGeneral from '@/components/atencionMedica/registroEvaluacionMedicinaGeneral';
import RegistroEvaluacionNutricion from '@/components/atencionMedica/registroEvaluacionNutricion';
import RegistroEvaluacionOdontologia from '@/components/atencionMedica/registroEvaluacionOdontologia';
import RegistroEvaluacionPsicologia from '@/components/atencionMedica/registroEvaluacionPsicologia';
import RegistroEvaluacionPsicomotricidad from '@/components/atencionMedica/registroEvaluacionPsicomotricidad';
import RegistroEvaluacionPsicopedagogia from '@/components/atencionMedica/registroEvaluacionPsicopedagogia';
import RegistroEvaluacionTerapiaOcupacional from '@/components/atencionMedica/registroEvaluacionTerapiaOcupacional';
import RegistroEvaluacionTrabajoSocial from '@/components/atencionMedica/registroEvaluacionTrabajoSocial';
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
      path: '/newPassword',
      name: 'NewPassword',
      component: NewPassword
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
      path: '/configuracion',
      name: 'Configuracion',
      component: Configuracion
    },
    {
      path: '/confirmarCuenta',
      name: 'ConfirmarCuenta',
      component: ConfirmarCuenta
    },
    {
      path: '/registrosPorArea',
      name: 'RegistrosPorArea',
      component: RegistrosPorArea
    },
    {
      path: '/estadisticasPorEstudiante',
      name: 'EstadisticasPorEstudiante',
      component: EstadisticasPorEstudiante
    },
    {
      path: '/registrosDireccion',
      name: 'RegistrosDireccion',
      component: RegistrosDireccion
    },
    {
      path: '/restaurar',
      name: 'SetPassword',
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
      path: '/registrosArchivados',
      name: 'RegistrosArchivados',
      component: RegistrosArchivados
    },
    {
      path: '/datosEstudiante',
      name: 'DatosEstudiante',
      component: DatosEstudiante
    },
    {
      path: '/registroSimple',
      name: 'RegistroSimple',
      component: RegistroSimple
    },
    {
      path: '/registroSemestral',
      name: 'RegistroSemestral',
      component: RegistroSemestral
    },
    {
      path: '/registroEvaluacionEducacion',
      name: 'RegistroEvaluacionEducacion',
      component: RegistroEvaluacionEducacion
    },
    {
      path: '/registroEvaluacionFisioterapia',
      name: 'RegistroEvaluacionFisioterapia',
      component: RegistroEvaluacionFisioterapia
    },
    {
      path: '/registroEvaluacionFonoaudiologia',
      name: 'RegistroEvaluacionFonoaudiologia',
      component: RegistroEvaluacionFonoaudiologia
    },
    {
      path: '/registroEvaluacionMedicinaGeneral',
      name: 'RegistroEvaluacionMedicinaGeneral',
      component: RegistroEvaluacionMedicinaGeneral
    },
    {
      path: '/registroEvaluacionNutricion',
      name: 'RegistroEvaluacionNutricion',
      component: RegistroEvaluacionNutricion
    },
    {
      path: '/registroEvaluacionOdontologia',
      name: 'RegistroEvaluacionOdontologia',
      component: RegistroEvaluacionOdontologia
    },
    {
      path: '/registroEvaluacionPsicologia',
      name: 'RegistroEvaluacionPsicologia',
      component: RegistroEvaluacionPsicologia
    },
    {
      path: '/registroEvaluacionPsicomotricidad',
      name: 'RegistroEvaluacionPsicomotricidad',
      component: RegistroEvaluacionPsicomotricidad
    },
    {
      path: '/registroEvaluacionPsicopedagogia',
      name: 'RegistroEvaluacionPsicopedagogia',
      component: RegistroEvaluacionPsicopedagogia
    },
    {
      path: '/registroEvaluacionTerapiaOcupacional',
      name: 'RegistroEvaluacionTerapiaOcupacional',
      component: RegistroEvaluacionTerapiaOcupacional
    },
    {
      path: '/registroEvaluacionTrabajoSocial',
      name: 'RegistroEvaluacionTrabajoSocial',
      component: RegistroEvaluacionTrabajoSocial
    },
    {
      path: '/busquedaNino',
      name: 'BusquedaNino',
      component: busquedaNiños
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
