var lineaTiempoModule = angular.module('lineaTiempoModule', [])

lineaTiempoModule.directive('ngCenterLabel', ['$timeout', function($timeout) {
	
    return { 
        restrict: 'A',
        link : function (scope, element, attrs) {	
			$timeout(function() {
				var width = parseInt($(element).width());
				$(element).css('margin-left', (((width / 2) -10) * -1) + "px")
			}, 0);			
        }
    }
}]);