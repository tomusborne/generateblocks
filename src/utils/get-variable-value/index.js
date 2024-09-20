export function getVariableValue( variable ) {
	if ( ! String( variable ).startsWith( 'var(' ) ) {
		return variable;
	}

	const variableName = variable.match( /\(([^)]+)\)/ );

	if ( ! variableName ) {
		return variable;
	}

	const rootElement = document.querySelector( '.editor-styles-wrapper' ) || document.documentElement;
	const variableValue = getComputedStyle( rootElement ).getPropertyValue( variableName[ 1 ] );

	if ( variableValue ) {
		return variableValue;
	}
}
