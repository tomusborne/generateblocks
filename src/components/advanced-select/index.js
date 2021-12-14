
import Select from 'react-select';

export default ( props ) => {
	const customStyles = {
		indicatorSeparator: () => ( {
			display: 'none',
		} ),

		indicatorsContainer: ( provided ) => ( {
			...provided,
			maxHeight: '30px',
		} ),

		menuPortal: ( base ) => ( {
			...base,
			zIndex: 999999,
		} ),

		control: ( base ) => ( {
			...base,
			marginBottom: '8px',
		} ),
		valueContainer: ( base ) => ( {
			...base,
			padding: '0 6px',
		} ),
		input: ( base ) => ( {
			...base,
			margin: 0,
			padding: 0,
		} )
	};

	const customTheme = ( provided ) => ( {
		borderRadius: 2,
		colors: {
			...provided.colors,
			primary: 'var(--wp-admin-theme-color)',
			neutral20: '#757575',
			neutral30: '#757575',
		},
		spacing: {
			controlHeight: 30,
			baseUnit: 3,
			menuGutter: 3,
		},
	} );


	const defaultProps = {
		className: 'generate-advanced-select',
		classNamePrefix: 'generate-advanced-select',
		isSearchable: false,
		styles: customStyles,
		instanceId: 'input-field',
		maxMenuHeight: 250,
		theme: customTheme,
		menuPortalTarget: document.querySelector( 'body' ),
	};

	const wrapperStyles = Object.assign( {}, {
		marginBottom: '24px',
	}, props?.wrapperStyles );

	const finalProps = Object.assign( {}, defaultProps, props );

	const labelStyles = { marginBottom: '8px', display: 'inline-block' };
	const helpStyles = { fontSize: '12px', fontStyle: 'normal', color: 'rgb(117, 117, 117)' };

	return (
		<div style={ wrapperStyles }>
			{ finalProps.label &&
				<label style={ labelStyles } htmlFor={ finalProps.id }>{ finalProps.label }</label>
			}

			<Select { ...finalProps } />

			{ finalProps.help &&
				<p style={ helpStyles }>{ finalProps.help }</p>
			}
		</div>
	);
};
