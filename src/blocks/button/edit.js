import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import GoogleFontLink from '../../components/google-font-link';
import { Fragment, useRef, useState, useEffect } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import { compose } from '@wordpress/compose';
import { withButtonLegacyMigration, withUniqueId } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import ButtonContentRenderer from './components/ButtonContentRenderer';

const ButtonEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
		ContentRenderer = ButtonContentRenderer,
	} = props;

	const {
		anchor,
		ariaLabel,
		fontFamily,
		googleFont,
		googleFontVariants,
		isBlockPreview = false,
	} = attributes;

	const ref = useRef( null );
	const [ computedStyles, setComputedStyles ] = useState( {} );
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	useEffect( () => {
		const computedButtonStyles = getComputedStyle( ref.current );

		setComputedStyles( {
			fontSize: parseInt( computedButtonStyles.fontSize ) || '',
		} );
	}, [] );

	return (
		<Fragment>
			<BlockControls
				clientId={ clientId }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<InspectorControls
				{ ...props }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				state={ { deviceType } }
				blockDefaults={ generateBlocksDefaults.button }
				computedStyles={ computedStyles }
			/>

			<InspectorAdvancedControls
				anchor={ anchor }
				ariaLabel={ ariaLabel }
				setAttributes={ setAttributes }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
				isBlockPreview={ isBlockPreview }
			/>

			<ContentRenderer { ...props } buttonRef={ ref } />
		</Fragment>
	);
};

export default compose(
	withDynamicContent,
	withUniqueId,
	withButtonLegacyMigration
)( ButtonEdit );
