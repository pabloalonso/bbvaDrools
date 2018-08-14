/**
 * 
 */
package org.mycompany.connector;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.bonitasoft.engine.connector.ConnectorException;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bbva.drools.dto.BaseAchDTO;
import com.bbva.drools.reglas.validacion.dto.reglas.ReglaNegocioDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
*The connector execution will follow the steps
* 1 - setInputParameters() --> the connector receives input parameters values
* 2 - validateInputParameters() --> the connector can validate input parameters values
* 3 - connect() --> the connector can establish a connection to a remote server (if necessary)
* 4 - executeBusinessLogic() --> execute the connector
* 5 - getOutputParameters() --> output are retrieved from connector
* 6 - disconnect() --> the connector can close connection to remote server (if any)
*/
public class EjecutarDroolsImpl extends AbstractEjecutarDroolsImpl {
	private Logger LOGGER = Logger.getLogger("org.mycompany.connector.EjecutarDroolsImpl");
	private BaseAchDTO baseAchDTO = new BaseAchDTO();
	@Override
	protected void executeBusinessLogic() throws ConnectorException{
		
		
		LOGGER.info("Logging an INFO-level message: Rule for elimination of NITs with discontinuities greater than 90 days");
		
		
		//Obtaining inputPayload from execution0 output (SOI-ACH service)
		//String inputPayload = validacionIngresos.getExecutions()[0].getOutputPayload();		
		//Map readValue = mapper.readValue(inputPayload, Map.class);
		Map<String, Serializable> readValue = getDatosEntrada();		
		//Creating list for the output
		List<Object> output = new ArrayList<>();
		Map<Object, Object> outPayload = new LinkedHashMap<Object, Object>();

		//Execution of rules maxDiasDiscontinuos
		try {
		List<Map<String, Serializable>> infoNits = (List<Map<String, Serializable>>)readValue.get("infoNits");
		if(infoNits != null){			
			for(int i = 0; i < infoNits.size(); i++){				//Execution of rules 0 and 1 for each NIT
				Map<String, Serializable> infoNit = infoNits.get(0);
				
				baseAchDTO.setMaxDiasDiscontinuos((Boolean)infoNit.get("isContinuous"));
				output.add(printRule(0,(String)infoNit.get("nit")));
				output.add(printRule(1,(String)infoNit.get("nit")));
			}
		}
		}catch(Exception e) {
			throw new ConnectorException("Error en el connector ", e);
		}

		//Configuration of output payload for Drools
		outPayload.put("reglas" , output);
		setOutput(outPayload);
		
		//String outPayloadStr = new ObjectMapper().writeValueAsString(outPayload);		
		//validacionIngresos.getExecutions()[1].setOutputPayload(outPayloadStr);
		//return validacionIngresos;
		
		
		
		
		//Get access to the connector input parameters
		//getRegla();
		//getDatosEntrada();
	
		//TODO execute your business logic here 
	
		//WARNING : Set the output of the connector execution. If outputs are not set, connector fails
		//setOutput(output);
	
	 }

	@Override
	public void connect() throws ConnectorException{
		//[Optional] Open a connection to remote server
		
	
	}

	@Override
	public void disconnect() throws ConnectorException{
		//[Optional] Close connection to remote server
	
	}
	
	//Function to get rule, response and message for a particular rule
	private Map printRule(int numberRule, String nit){
		Map<String, Serializable> response = new LinkedHashMap<String, Serializable>();
		try {
			KieServices ks = KieServices.Factory.get();
			KieContainer kContainer = ks.getKieClasspathContainer();
			KieSession kSession = kContainer.newKieSession("ksession-rules");
			baseAchDTO.setReglasNegocioDTO(Collections.emptyList());
			kSession.insert(baseAchDTO);
			kSession.fireAllRules();
			ReglaNegocioDTO rule = baseAchDTO.getReglasNegocioDTO().get(numberRule);
			
			//Map with rule, response and message for rule located in (numberRule)
			
			response.put("nit", nit);
			response.put("regla",rule.getRespuestaObtenida().getRegla());
			response.put("respuesta",rule.getRespuestaObtenida().isRespuesta());
			response.put("mensaje",rule.getRespuestaObtenida().getMensajeRespuesta());
			
		} catch (Exception e) {
			LOGGER.info("Error: " + e.getMessage());
		}
		return response;
	}


}
