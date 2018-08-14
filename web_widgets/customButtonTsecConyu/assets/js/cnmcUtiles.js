	// Modulo
	
	var cnmcUtilesModule =angular.module('CNMCUtiles', []);
	
	//Factory
	cnmcUtilesModule.factory('grantingTicketFactory', grantingTicketFactory);

	grantingTicketFactory.$inject = ['$http'];
    function grantingTicketFactory($http) {
        var service = {
            obtenerTsec: obtenerTsec            
        };
        
        return service;
 
        function obtenerTsec(request) {        	
        	return $http.post('http://150.250.140.41:7500/TechArchitecture/co/grantingTicket/V02', request);
        }
    }
		
	// Service
	cnmcUtilesModule
        .service('utilesService', utilesService);

    utilesService.$inject = ['$q', 'grantingTicketFactory'];
    function utilesService($q, grantingTicketFactory) {
        var service = this;
        service.$q = $q;
        service.grantingTicketFactory = grantingTicketFactory;
    }

    utilesService.prototype.obtenerTsec = function() {
        var service = this;
        
        var deferred = service.$q.defer();

        var body = {
            authentication: {
                userID: "C783694",
                consumerID: "12000025",
                authenticationType: "00",
                authenticationData: [
                    {
                        idAuthenticationData: "iv_ticketService",
                        authenticationData: [
                            "EKIJYXDP4EisZvsqsmyM7VNrV8j48appxBjAawb5n6hF1e1pqkhuXw"
                        ]
                    }
                ]
            },
            backendUserRequest: {
                userId: "",
                accessCode: "",
                dialogId: ""
              }
        }

        service.grantingTicketFactory.obtenerTsec(body).then(function(result) {
            deferred.resolve({
                data: {
                    tsec: result.headers('tsec')
                }
            });
        }).catch(function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };