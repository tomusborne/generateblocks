import { useBlockProps, useInnerBlocksProps, InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockStyles, withUniqueId, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { useSelect, useDispatch } from '@wordpress/data';
import BlockAppender from './components/BlockAppender.jsx';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { SelectControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { convertInlineStyleStringToObject } from './utils.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
	} = props;

	const {
		tagName,
		className,
		styles = {},
		uniqueId,
		css,
		htmlAttributes = {},
	} = attributes;

	const classNames = [];
	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();

	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-element-${ uniqueId }` );
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

		return '.gb-element-' + uniqueId;
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

	const { style = '', ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ),
			...combinedAttributes,
		}
	);
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender: () => <BlockAppender clientId={ clientId } isSelected={ isSelected } attributes={ attributes } />,
		}
	);
	const TagName = tagName || 'div';
	const tagNames = getBlockType( 'generateblocks/element' )?.attributes?.tagName?.enum;
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );

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
					{
						applyFilters(
							'generateblocks.editor.blockStyles',
							null,
							{
								...props,
								onStyleChange,
								getStyleValue,
							}
						)
					}
				</BlockStyles>
			</InspectorControls>
			<InspectorAdvancedControls>
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
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</InspectorAdvancedControls>
			<TagName { ...innerBlocksProps } />
		</>
	);
}

const Edit = compose(
	withUniqueId
)( EditBlock );

export { Edit };
