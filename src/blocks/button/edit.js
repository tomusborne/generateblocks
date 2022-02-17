import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import GoogleFontLink from '../../components/google-font-link';
import { Fragment } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import { compose } from '@wordpress/compose';
import { withButtonLegacyMigration, withUniqueId } from '../../hoc';
import withDynamicContent from '../headline/components/dynamic-content/hoc/withDynamicContent';
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
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

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
			/>

			<ContentRenderer { ...props } />
		</Fragment>
	);
};

export default compose(
	withDynamicContent,
	withUniqueId,
	withButtonLegacyMigration
)( ButtonEdit );
