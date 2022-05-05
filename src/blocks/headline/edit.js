import { useDeviceType } from '../../hooks';
import './markformat';
import { applyFilters } from '@wordpress/hooks';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import ComponentCSS from './components/ComponentCSS';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import HeadlineContentRenderer from './components/HeadlineContentRenderer';

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
		uniqueId,
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
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

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
				deviceType={ deviceType }
				context={ context }
			/>

			<InspectorControls
				{ ...props }
				uniqueId={ uniqueId }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				blockState={ { deviceType } }
				computedStyles={ computedStyles }
			/>

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

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
	withDynamicContent,
	withUniqueId
)( HeadlineEdit );
