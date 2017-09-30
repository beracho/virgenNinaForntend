'use strict';

import controller from './inputChips.controller';
import template from './inputChips.html';
import './inputChips.scss';

const inputChipsComponent = {
    bindings: {
        ngModel: '=',
        ngRequired: '<',
        beforeAdd: '&',
        onRemove: '&',
        label: '@',
        ngDisabled: '<',
        ngUppercase: '<',
        ngPlaceholder: '@'
    },
    controller,
    template
};

export default inputChipsComponent;
