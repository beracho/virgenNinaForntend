'use strict';

class SidenavController {

    constructor($location, Storage, Util, BreadcrumbFactory, SidenavFactory, systemName, Auth) {
        "ngInject";

        this.$location = $location;
        this.Storage = Storage;
        this.Util = Util;
        this.BreadcrumbFactory = BreadcrumbFactory;
        this.SidenavFactory = SidenavFactory;
        this.Auth = Auth;
        this.systemName = systemName;
    }

    $onInit() {
        let color = ['info', 'success', 'danger', 'warning', 'primary'];

        this.url = this.$location.path().replace('/', '');

        if(this.Auth.isAuthenticated()) {
            this.SidenavFactory.setUser(this.Storage.getUser());
            this.SidenavFactory.setMenu(this.Storage.get('menu'));
            this.SidenavFactory.setVisible(this.Storage.get('visible'));
            this.SidenavFactory.setSidenav(this.Storage.get('sidenav'));
        }
        this.menu = this.SidenavFactory.getMenu();
        this.Storage.set('menu', this.menu);

        this.SidenavFactory.userColor = color[parseInt(Math.random()*color.length)];

        window.setTimeout(() => {
            let el = document.querySelector('#sidenav-menu .sidenav-submenu-item.active');
            if (el) {
                el.parentNode.parentNode.previousElementSibling.dispatchEvent(new window.Event('click'));
            }
        }, 1000);
    }

    send(url, submenu) {
        if (typeof submenu == 'undefined') {
            if (this.Storage.exist('menu')) {
                let page = this.Util.getMenuOption(this.Storage.get('menu'), url);
                this.BreadcrumbFactory.setParent(page[0]);
                this.BreadcrumbFactory.setCurrent(page[1]);
            }
            let el = document.querySelector('#sidenav-menu .sidenav-submenu-item.active');
            if (el) {
                el.classList.remove('active');
            }
            el = document.querySelector(`#sidenav-menu .sidenav-submenu-item[data-url=${url}]`);
            if (el) {
                el.classList.add('active');
            }
            this.$location.path(url);
        }
    }

    getColor() {
        return this.SidenavFactory.userColor;
    }

    getName() {
        let user = this.SidenavFactory.getUser();
        if (user) {
            user = user.usuario || user.username;
            if (user && user.split('@').length > 1) {
                user = user.split('@')[0];
            }            
            return user;
        }
        return "";
    }

    getEmail() {
        return this.SidenavFactory.getUser().email;
    }

    getInitial() {
        var firstName;
        if (this.SidenavFactory.getUser().usuario) {                    
            firstName = this.SidenavFactory.getUser().usuario;
            return firstName.length ? firstName[0].toUpperCase() : '?';
        } else if (this.SidenavFactory.getUser().username) {
            firstName = this.SidenavFactory.getUser().username;
            return firstName.length ? firstName[0].toUpperCase() : '?';
        }
        return '?';
    }

    getMenu() {
        return this.SidenavFactory.getMenu();
    }

    getVisible() {
        return this.SidenavFactory.getVisible();
    }

    getSidenav() {
        return this.SidenavFactory.getSidenav();
    }

    setVisible(visible) {
        this.Storage.set('visible', visible);
        this.SidenavFactory.setVisible(visible);
    }

    setSidenav(sidenav) {
        this.Storage.set('sidenav', sidenav);
        this.SidenavFactory.setSidenav(sidenav);
    }
}

export default SidenavController;