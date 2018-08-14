var currencyModule = angular.module('currencyModule', [])

currencyModule.directive('ngCurrencyFormat', function($timeout) {    
    return { 
        restrict: 'A',        
        link : function (scope, element, attrs) {			
		
			$(element).number(true, 2, ',', '.');	
			
			$(element).keyup(function() {
				scope.properties.value = $(this).val();
			});
						
        }
    }
});

currencyModule.directive('ngMinNumber', function($timeout) {    
    return { 
        restrict: 'A',        
        link : function (scope, element, attrs) {		
			$(element).keyup(function() {
				var inputValue = parseInt($(element).val());
				var refValue = parseInt(scope.$eval(attrs.ngMinNumber));
				
				$timeout(function() {
					scope.$apply(function() {
						if(inputValue < refValue) {				
							scope.$form[scope.properties.name].$error.min = true;
						} else {
							delete scope.$form[scope.properties.name].$error.min;
						}
					});
				}, 0, false);
			});			
        }
    }
});

currencyModule.directive('ngMaxNumber', function($timeout) {    
    return { 
        restrict: 'A',        
        link : function (scope, element, attrs) {		
			$(element).keyup(function() {
				var inputValue = parseInt($(element).val());
				var refValue = parseInt(scope.$eval(attrs.ngMaxNumber));
				
				$timeout(function() {
					scope.$apply(function() {
						if(inputValue > refValue) {				
							scope.$form[scope.properties.name].$error.max = true;
						} else {
							delete scope.$form[scope.properties.name].$error.max;
						}
					});
				}, 0, false);
			});			
        }
    }
});