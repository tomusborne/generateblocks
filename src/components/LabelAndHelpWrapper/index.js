export default function LabelAndHelpWrapper( { label, htmlFor, help, children } ) {
	const labelStyles = { marginBottom: '8px', display: 'inline-block' };
	const helpStyles = { fontSize: '12px', fontStyle: 'normal', color: 'rgb(117, 117, 117)' };

	return (
		<>
			{ label && <label style={ labelStyles } htmlFor={ htmlFor }>{ label }</label> }
			{ children }
			{ help && <p style={ helpStyles }>{ help }</p> }
		</>
	);
}
