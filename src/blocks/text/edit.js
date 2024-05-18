import { __ } from '@wordpress/i18n';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { PanelBody, SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { withDynamicTag } from '../../hoc/withDynamicTag';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { HtmlAttributes } from '../../components/html-attributes/index.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		clientId,
		dynamicTagValue,
	} = props;

	const {
		tagName,
		content,
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
	} = attributes;

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const tagNames = getBlockType( 'generateblocks/text' )?.attributes?.content?.selector?.split( ',' );
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );

	const contentValue = useMemo( () => {
		if ( dynamicTagValue ) {
			return dynamicTagValue;
		}

		return content;
	}, [ dynamicTagValue ] );

	const classNames = [];
	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();

	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-text-${ uniqueId }` );
	}

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const selector = useMemo( () => {
		if ( ! uniqueId ) {
			return '';
		}

		return '.gb-text-' + uniqueId;
	}, [ uniqueId ] );

	function onStyleChange( property, value = '', atRuleValue = '', nestedRuleValue = '' ) {
		addStyle( property, value, atRuleValue, nestedRuleValue );

		const updatedStyles = getStyles();
		setAttributes( { styles: updatedStyles } );
	}

	function getStyleValue( property, nestedRuleValue = '' ) {
		if ( ! nestedRuleValue ) {
			return styles?.[ property ] ?? '';
		}

		return styles?.[ nestedRuleValue ]?.[ property ] ?? '';
	}

	useEffect( () => {
		if ( ! selector ) {
			return;
		}

		( async function() {
			const generateCss = await getCss( selector, styles );
			setAttributes( { css: generateCss } );
		}() );
	}, [ JSON.stringify( styles ), selector ] );

	useEffect( () => {
		if ( ! selector ) {
			return;
		}

		updateEditorCSS( selector, css );
	}, [ css, selector ] );

	const customAttributes = htmlAttributes.reduce( ( acc, item ) => {
		acc[ item.key ] = item.value;
		return acc;
	}, {} );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ),
			...customAttributes,
		}
	);

	return (
		<>
			<InspectorControls>
				<BlockStyles
					selector={ selector }
					onStyleChange={ onStyleChange }
					setAttributes={ setAttributes }
					styles={ styles }
					css={ css }
					stores={ { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } }
					defaultAtRules={ defaultAtRules }
				>
					<PanelBody>
						<SelectControl
							label={ __( 'Tag Name' ) }
							value={ tagName }
							options={ tagNameOptions }
							onChange={ ( value ) => setAttributes( { tagName: value } ) }
						/>

						<HtmlAttributes
							items={ htmlAttributes }
							onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
							onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
							onChange={ ( value ) => {
								console.log( value );
								setAttributes( { htmlAttributes: value } );
							} }
						/>
					</PanelBody>
				</BlockStyles>
			</InspectorControls>
			<RichText
				identifier="content"
				tagName={ tagName || 'span' }
				value={ contentValue }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				onMerge={ mergeBlocks }
				onSplit={ ( value, isOriginal ) => {
					let block;

					if ( isOriginal || value ) {
						block = createBlock( 'generateblocks/text', {
							...attributes,
							content: value,
						} );
					} else {
						block = createBlock(
							'generateblocks/text'
						);
					}

					if ( isOriginal ) {
						block.clientId = clientId;
					}

					return block;
				} }
				onReplace={ onReplace }
				onRemove={ () => onReplace( [] ) }
				placeholder={ __( 'Text' ) }
				withoutInteractiveFormatting={ 'a' === tagName || 'button' === tagName }
				{ ...( Platform.isNative && { deleteEnter: true } ) } // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				{ ...blockProps }
			/>
		</>
	);
}

const Edit = compose(
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };
