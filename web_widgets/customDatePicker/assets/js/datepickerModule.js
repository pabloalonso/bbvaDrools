var datepickerModule = angular.module('datepickerModule', [])

datepickerModule.directive('ngDatepicker', ['$timeout', function($timeout) {
	
    $.datepicker.setDefaults($.datepicker.regional['es'])
	
    return { 
        restrict: 'A',
        require: 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {							
			if(!scope.$eval(attrs.ngReadonly)) {				
				$timeout(function() {
					$("#" + scope.$eval(attrs.ngDatepicker)).datepicker({
						format : 'dd/mm/yyyy',
						todayHighlight : true,  
						onSelect:function (date) {
							ngModelCtrl.$setViewValue(date);
							scope.$apply();
						},
						create: function(event, ui) {
							
						}
					});				
				});
			}
        }
    }
}]);

datepickerModule.directive('ngDatepickerMindate',  ['$timeout', function($timeout) {
    return { 
        restrict: 'A',
        link : function (scope, element, attrs) {				
			if(attrs.ngDatepickerMindate) {
				scope.$watch(attrs.ngDatepickerMindate, function(newValue, oldValue) {                
					$timeout(function() {											
						if(newValue) {											
							if(newValue.indexOf("new Date") != -1) {
								$(element).datepicker("option", "minDate", eval(newValue));											
							} else {
								$(element).datepicker("option", "minDate", newValue);											
							}						
						} 
					}, 0);
				});			
			}
        }
    }
}]);

datepickerModule.directive('ngDatepickerMaxdate', ['$timeout', function($timeout) {
    return { 
        restrict: 'A',
        link : function (scope, element, attrs) {	
			if(attrs.ngDatepickerMaxdate) {
				scope.$watch(attrs.ngDatepickerMaxdate, function(newValue, oldValue) {                
					$timeout(function() {					
						if(newValue.indexOf("new Date") != -1) {
							$(element).datepicker("option", "maxDate", eval(newValue));											
						} else {
							$(element).datepicker("option", "maxDate", newValue);											
						}						
					}, 0);
				});			
			}
        }
    }
}]);