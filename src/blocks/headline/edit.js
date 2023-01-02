import './markformat';
import { applyFilters } from '@wordpress/hooks';
import BlockControls from './components/BlockControls';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import ComponentCSS from './components/ComponentCSS';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { withDeviceType, withUniqueId } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import HeadlineContentRenderer from './components/HeadlineContentRenderer';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import withHeadlineLegacyMigration from '../../hoc/withHeadlineLegacyMigration';
import getDeviceType from '../../utils/get-device-type';

const onSplit = ( attributes, clientId ) => ( ( value, isOriginal ) => {
	let block;

	if ( isOriginal || value ) {
		block = createBlock( 'generateblocks/headline', {
			...attributes,
			content: value,
		} );
	} else {
		block = createBlock( 'core/paragraph' );
	}

	if ( isOriginal ) {
		block.clientId = clientId;
	}

	return block;
} );

const HeadlineEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		ContentRenderer = HeadlineContentRenderer,
		context,
	} = props;

	const {
		anchor,
		fontFamily,
		googleFont,
		googleFontVariants,
		icon,
		hasIcon,
		element,
		isBlockPreview = false,
	} = attributes;

	const ref = useRef( null );
	const [ computedStyles, setComputedStyles ] = useState( {} );
	const deviceType = getDeviceType();

	useEffect( () => {
		if ( ! hasIcon && icon ) {
			setAttributes( { hasIcon: true } );
		}
	}, [] );

	useEffect( () => {
		const computedHeadlineStyles = getComputedStyle( ref.current );

		setComputedStyles( {
			marginTop: parseInt( computedHeadlineStyles.marginTop ) || '',
			marginBottom: parseInt( computedHeadlineStyles.marginBottom ) || '',
			fontSize: parseInt( computedHeadlineStyles.fontSize ) || '',
		} );
	}, [ element ] );

	return (
		<Fragment>
			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				context={ context }
			/>

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				computedStyles={ computedStyles }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls
				anchor={ anchor }
				setAttributes={ setAttributes }
				attributes={ attributes }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
				isBlockPreview={ isBlockPreview }
			/>

			{ applyFilters( 'generateblocks.editor.beforeHeadlineElement', '', props ) }

			<ContentRenderer { ...props } onSplit={ onSplit } headlineRef={ ref } />
		</Fragment>
	);
};

export default compose(
	withDeviceType,
	withBlockContext,
	withDynamicContent,
	withUniqueId,
	withHeadlineLegacyMigration
)( HeadlineEdit );
