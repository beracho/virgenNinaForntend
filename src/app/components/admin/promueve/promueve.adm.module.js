'use strict';

import DdjjPromueve from './ddjj/ddjj.module';
import DdjjProductoPromueve from './certificacion/certificacion_prom.module';
import RechazadosPromueve from './rechazados/rechazados.module';
import ImpresionPromueve from './impresion/impresion_prom.module';
import SolicitudesPromueve from './solicitudes/solicitudes.module';

const Admin = angular
        .module('app.adm.promueve', [
          DdjjPromueve,
          DdjjProductoPromueve,
          RechazadosPromueve,
          ImpresionPromueve,
          SolicitudesPromueve
        ])
        .name;

export default Admin;