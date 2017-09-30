'use strict';

// import DdjjPromueve from './ddjj/ddjj.module';
// import DdjjProductoPromueve from './certificacion/certificacion_prom.module';
// import RechazadosPromueve from './rechazados/rechazados.module';
import DdjjDetalleSellobolivia from './ddjjdetalle/ddjjdetalle.module';
import DdjjSellobolivia from './ddjj/ddjj.module';
import solicitudesFirmaSHB from './solicitudesFirma/solicitudesFirma.module';

const Admin = angular
        .module('app.adm.sellobolivia', [
          // DdjjPromueve,
          // DdjjProductoPromueve,
          // RechazadosPromueve,
          DdjjDetalleSellobolivia,
          solicitudesFirmaSHB,
          DdjjSellobolivia
        ])
        .name;

export default Admin;