'use strict';

import DemofiService from './demofi.service';
import './demofi.scss';

const Demofi = angular
    .module('app.demofi', [])
    .service('Demofi', DemofiService)
    .config(($httpProvider) => {
        $httpProvider.interceptors.push( () => {
            'ngInject';
            return {
                'request': function(config) {
                    if (config.isDemofi) {
                        config.headers = { 'Accept': 'application/json' };
                        // config.headers = { 'Accept': 'application/json, text/javascript, */*; q=0.01' };
                        if (config.isDemofiSign) {
                            config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                        }
                    }
                    return config;
                },
            };
        });
    })
    .name;

export default Demofi;