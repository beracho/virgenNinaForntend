'use strict';

const runBlock = function ($rootScope, onbeforeunload, $transitions, statePrevs, formlyConfig, $anchorScroll, rdxUrljs) {
    'ngInject';

    //Fullscreen event and hack mozilla
    function exitFullScreen () {
        angular.element(document.body).removeClass('fullscreen');
    }

    angular.element(window.document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            exitFullScreen();
        }
    });

    document.addEventListener("mozfullscreenchange", function () {
        if (!document.mozFullScreen) {
            exitFullScreen();
        }
    }, false);

    if (onbeforeunload) {
        window.onbeforeunload = function() {
            return '¿Está seguro de abandonar la página?.';
        };
    }
    // $log.log('runCommon');
    // $log.log(statePrevs);  
    for (var name in statePrevs) {
      var prevs = statePrevs[name];
      statePrevs[name] = {};
      prevs.forEach( namePrev => {
        statePrevs[name][namePrev] = !0;
      })
    }

    $transitions.onStart({}, transition => {
      if (transition.from().name!='' && statePrevs[transition.to().name] && !statePrevs[transition.to().name][transition.from().name]) {
        // $log.log('abort')
        transition.abort();
      }
    });

    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

    $anchorScroll.yOffset = 60;

    // inject rdx-banco-union
    var scriptTag = angular.element(document.createElement('script'));
    scriptTag.attr('charset', 'utf-8');
    scriptTag.attr('src', rdxUrljs);
    angular.element(document.body).append(scriptTag);
    // console.log(scriptTag);
    // console.log(rdx('214141235125','asdfasdf'));   
};

export default runBlock;
