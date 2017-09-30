'use strict';

import BancoUnion from './banco-union/banco-union.module';
import Ddjj from './ddjj/ddjj.module';
import RegistroArte from './registro/registro.artesano.module';
import ConfirmarCuenta from './confirmar/confirmar.module';
import Verificacion from './verificacion/verificacion.module';
import Parametros from './parametros/parametros.module';
import Duplicados from './duplicados/duplicados.module';
import Correcciones from './correcciones/correcciones.module';


const Admin = angular
.module('app.adm.probolivia', [
  BancoUnion,
  Ddjj,
  RegistroArte,
  ConfirmarCuenta,
  Verificacion,
  Parametros,
  Duplicados,
  Correcciones
])
.name;

export default Admin;
