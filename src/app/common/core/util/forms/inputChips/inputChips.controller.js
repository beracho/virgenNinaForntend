'use strict';

class InputChipsController {

    constructor($scope, $log, Datetime) {
        'ngInject';
        this.$scope = $scope;
        this.$log = $log;
        this.Datetime = Datetime;
    }

    $onInit () {
      this.ngPlaceholder = this.ngPlaceholder || 'Enter para añadir';
      this.key = { tab: 9, enter: 13,esc: 27, space: 32, left: 37, up: 38, right: 39, down: 40, shift: 16, ctrl: 17, alt: 18, page_up: 33, page_down: 34, home: 36, end: 35, backspace: 8, delete: 46, command: 91};
      // this.$log.log(this);
      this.keyAdd = this.key.enter;
      this.keyTab = this.key.tab;
      this.chips = {};
      if (!this.ngModel) {
        this.ngModel = [];
      }
      else {
        this.ngModel.forEach( it => { this.chips[it] = !0; })
      }
      this.$scope.$watch('$ctrl.ngModel', ()=>{
        this.chips_model = this.ngModel.join('|');
        // this.$log.log('change chips', this.ngModel, this.chips_model)
      }, true)
    }
    onBlurChip(){
      //this.$log.log('blur',ev);
      this.addChip();
    }
    keyChip (ev) {
      // this.$log.log(ev);
      if (ev.keyCode==this.keyAdd) {
        this.addChip();
      }
    }

    addChip () {
      // this.$log.log(ev);
      // var chip = this.chip;asdf

      if (this.chip && !this.chips[this.chip]) {
        this.chips[this.chip] = !0;
        if (this.beforeAdd) {
          this.chip = this.beforeAdd({$chip: this.chip});
        }
        if(this.chip!=null)
          this.ngModel.push(this.chip);
      }
      this.chip='';
    }

    remChip (i) {
      if (!this.ngDisabled) {
        delete this.chips[this.ngModel[i]];
        this.ngModel.splice(i, 1);
        if (this.onRemove) {
          this.onRemove();
        }
      }
    }

    // editChip (ev, i) {
    //   this.chip = this.ngModel[i];
    //   this.$log.log(ev);
    //   var $div = angular.element(angular.element(ev.target).closest('div'));
    //   $div.children()[$div.children().length-1].focus();
    //   this.remChip (i);
    // }

}


export default InputChipsController;
