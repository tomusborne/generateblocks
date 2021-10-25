import './style.scss';
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

	const finalProps = Object.assign( {}, defaultProps, props );

	return (
		<div style={ { marginBottom: '24px' } }>
			{ finalProps.label && <label htmlFor={ finalProps.id }>{ finalProps.label }</label> }
			<Select { ...finalProps } />
		</div>
	);
};
