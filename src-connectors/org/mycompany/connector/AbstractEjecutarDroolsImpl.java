package org.mycompany.connector;

import org.bonitasoft.engine.connector.AbstractConnector;
import org.bonitasoft.engine.connector.ConnectorValidationException;

public abstract class AbstractEjecutarDroolsImpl extends AbstractConnector {

	protected final static String REGLA_INPUT_PARAMETER = "regla";
	protected final static String DATOSENTRADA_INPUT_PARAMETER = "datosEntrada";
	protected final String OUTPUT_OUTPUT_PARAMETER = "output";

	protected final java.lang.String getRegla() {
		return (java.lang.String) getInputParameter(REGLA_INPUT_PARAMETER);
	}

	protected final java.util.Map getDatosEntrada() {
		return (java.util.Map) getInputParameter(DATOSENTRADA_INPUT_PARAMETER);
	}

	protected final void setOutput(java.util.Map output) {
		setOutputParameter(OUTPUT_OUTPUT_PARAMETER, output);
	}

	@Override
	public void validateInputParameters() throws ConnectorValidationException {
		try {
			getRegla();
		} catch (ClassCastException cce) {
			throw new ConnectorValidationException("regla type is invalid");
		}
		try {
			getDatosEntrada();
		} catch (ClassCastException cce) {
			throw new ConnectorValidationException("datosEntrada type is invalid");
		}

	}

}
