'use strict';

import Inscripcion from './inscripcion/inscripcion.emp.module';
import Matricula from './matricula/matricula.emp.module';
import Registro from './registro/registro.emp.module';
import Formulario from './formulario/formulario.emp.module';
import Certificado from './certificado/certificado.emp.module';
import Bandeja from './bandeja/bandeja.module';
import Duplicar from './duplicar/duplicar.module';

const Empresario = angular
    .module('app.empresario', [
        Inscripcion,
        Registro,
        Matricula,
        Formulario,
        Certificado,
        Bandeja,
	Duplicar
    ])
    .name;

export default Empresario;
