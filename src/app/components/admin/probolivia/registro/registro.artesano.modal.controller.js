'use strict';

class CodigoRegArtModalController {
  constructor($uibModalInstance, data, Modal, Auth, DataService, $location, Storage, SidenavFactory, Message) {
    'ngInject';

    this.items = data;
    this.usuario = data.usuario;
    this.correo = data.correo;
    this.$uibModalInstance = $uibModalInstance;
    this.$location = $location;
    this.Modal = Modal;
    this.Auth = Auth;
    this.DataService = DataService;
    this.SidenavFactory = SidenavFactory;
    this.Storage = Storage;
    this.Message = Message;
  }

  $onInit() {
    this.focus = true;
  }

  confirmar() {
    this.DataService.put(`usuarios/${this.items.id_usuario}/confirmar`, {
      email: this.items.correo,
      codigo_activacion: this.codigo_activacion
    }).then(response => {
      if (response) {
//                let menu = response.menu;
//                let user = response.user;
//
//                this.SidenavFactory.setUser(user);
//                this.Storage.setUser(user);
//
//                this.SidenavFactory.setMenu(menu);
//                this.Storage.set('menu', menu);
//
//                this.SidenavFactory.setVisible(true);
//                this.Storage.set('visible', true);
//
//                this.SidenavFactory.setSidenav(true);
//                this.Storage.set('sidenav', true);
//                this.$uibModalInstance.close();
//                this.$location.path('matricula');
//
//                this.Message.success('Su registro se completó satisfactoriamente.');
        this.Auth.signin({
          usuario: this.items.email,
          contrasena: this.items.contrasena,
          path: 'empresa',
          pathLogin: 'login',
          menu: false,
          sidenav: false
        });
      }



    });
  }

  cancel() {
    this.focus = false;
    this.Modal.confirm('¿Realmente quiere cancelar su registro?', () => {
      this.$uibModalInstance.dismiss('cancel');
//            this.Auth.logout();
    }, null, null, 'SI', 'NO');
  }

  reenviarCorreo() {

  }

  editarCorreo() {

  }

}

export default CodigoRegArtModalController;