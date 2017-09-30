'use strict';
import NumeroALetras from './numeroaLetras.service';
import inputChips from './inputChips/inputChips.component';
import selectDate from './selectDate/selectDate.component';
import selectMunicipio from './selectMunicipio/selectMunicipio.component';
import localizacion from './localizacion/localizacion.component';
import documentoIdentidad from './documentoIdentidad/documentoIdentidad.component';
import selectParametro from './selectParametro/selectParametro.component';
import uibSelect from './uib-select/uib-select.component';
import fileUpload from './fileUpload/fileUpload.module';

const MaterialModule = angular
    .module('app.forms', [
      fileUpload
    ])
    .service('numToWord', NumeroALetras)
    .component('inputChips', inputChips)
    .component('selectDate', selectDate)
    .component('selectMunicipio', selectMunicipio)
    .component('localizacion', localizacion)
    .component('documentoIdentidad', documentoIdentidad)
    .component('selectParametro', selectParametro)
    .component('uibSelect', uibSelect)
    .directive('apError', () => {
        return {
            restrict: 'A',
            link: ($scope, $element) => {
              $element.addClass('form-error');
              var $parent = angular.element($element.closest('div.form-group'));
              $scope.$watch(()=>{
                return $element[0].scrollHeight;
              },(newValue)=>{
                // $log.log(newValue);
                $parent.removeClass('has-danger');
                if (newValue) {
                  $parent.addClass('has-danger');
                }
              })
              $scope.$on('$destroy', ()=>{
                $parent.removeClass('has-danger');
              })

            }
        };
    })
    .name;

export default MaterialModule;
