import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import GoogleFontLink from '../../components/google-font-link';
import { Fragment, useRef, useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withButtonLegacyMigration, withDeviceType, withUniqueId } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import ButtonContentRenderer from './components/ButtonContentRenderer';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import { useSelect } from '@wordpress/data';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import { applyFilters } from '@wordpress/hooks';
import getDeviceType from '../../utils/get-device-type';
import './components/ConditionalColors';
import withSetAttributes from '../../hoc/withSetAttributes';

const ButtonEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ButtonContentRenderer,
		clientId,
	} = props;

	const {
		anchor,
		ariaLabel,
		typography,
		googleFont,
		googleFontVariants,
		isBlockPreview = false,
		hasButtonContainer,
		blockVersion,
		buttonType,
		variantRole,
		url,
	} = attributes;

	const ref = useRef( null );
	const deviceType = getDeviceType();
	const {
		getBlockParents,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const [ buttonPreviewElement, setButtonPreviewElement ] = useState( 'span' );

	useEffect( () => {
		const parentBlockId = getBlockParents( clientId, true );

		if ( parentBlockId.length > 0 ) {
			const parentBlocks = getBlocksByClientId( parentBlockId );

			if ( parentBlocks.length > 0 && 'generateblocks/button-container' === parentBlocks[ 0 ].name ) {
				setAttributes( { hasButtonContainer: true } );
			} else if ( !! hasButtonContainer ) {
				setAttributes( { hasButtonContainer: false } );
			}
		} else if ( !! hasButtonContainer ) {
			setAttributes( { hasButtonContainer: false } );
		}
	}, [] );

	useEffect( () => {
		if ( 'link' === buttonType ) {
			setButtonPreviewElement( url ? 'a' : 'span' );
		}

		if ( 'button' === buttonType ) {
			setButtonPreviewElement( 'button' );
		}
	}, [ buttonType ] );

	useEffect( () => {
		// Add our default Button styles when inserted.
		if ( wasBlockJustInserted( attributes ) && ! blockVersion && ! variantRole ) {
			setAttributes( generateBlocksStyling.button );
		}
	}, [] );

	return (
		<Fragment>
			<BlockControls
				{ ...props }
				setButtonPreviewElement={ setButtonPreviewElement }
			/>

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls
				anchor={ anchor }
				ariaLabel={ ariaLabel }
				buttonType={ buttonType }
				setAttributes={ setAttributes }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ typography.fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
				isBlockPreview={ isBlockPreview }
			/>

			<ContentRenderer
				{ ...props }
				buttonRef={ ref }
				buttonPreviewElement={ buttonPreviewElement }
			/>
		</Fragment>
	);
};

export default compose(
	withSetAttributes,
	withDeviceType,
	withBlockContext,
	withDynamicContent,
	withUniqueId,
	withButtonLegacyMigration
)( ButtonEdit );
