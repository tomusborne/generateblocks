import { useDeviceType } from '../../hooks';
import classnames from 'classnames';
import './markformat';
import { applyFilters } from '@wordpress/hooks';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import Element from '../../components/element';
import RootElement from '../../components/root-element';
import IconWrapper from '../../components/icon-wrapper';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import ComponentCSS from './components/ComponentCSS';
import { createBlock } from '@wordpress/blocks';

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

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		onReplace,
		clientId,
		name,
	} = props;

	const {
		uniqueId,
		anchor,
		content,
		element,
		fontFamily,
		googleFont,
		googleFontVariants,
		icon,
		hasIcon,
		removeText,
		ariaLabel,
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	useEffect( () => {
		if ( ! hasIcon && icon ) {
			setAttributes( { hasIcon: true } );
		}
	}, [] );

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! hasIcon,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/headline',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	const richTextFormats = applyFilters(
		'generateblocks.editor.headlineDisableFormatting',
		false,
		props
	) ? [] : null;

	return (
		<Fragment>
			<BlockControls attributes={ attributes } setAttributes={ setAttributes } deviceType={ deviceType } />

			<InspectorControls
				uniqueId={ uniqueId }
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				blockState={ { deviceType } }
			/>
			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
			/>

			{ applyFilters( 'generateblocks.editor.beforeHeadlineElement', '', props ) }

			<RootElement name={ name } clientId={ clientId }>
				<Element tagName={ element } htmlAttrs={ blockProps }>
					<IconWrapper
						hasIcon={ hasIcon }
						icon={ icon }
						hideChildren={ removeText }
						showWrapper={ ! removeText && hasIcon }
						wrapperClassname={ 'gb-headline-text' }
						ariaLabel={ ( !! removeText && !! ariaLabel ? ariaLabel : undefined ) }
					>
						<RichText
							tagName="span"
							value={ content }
							onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
							onSplit={ onSplit( attributes, clientId ) }
							onReplace={ onReplace }
							placeholder={ __( 'Headline', 'generateblocks' ) }
							allowedFormats={ richTextFormats }
						/>
					</IconWrapper>
				</Element>
			</RootElement>
		</Fragment>
	);
};
