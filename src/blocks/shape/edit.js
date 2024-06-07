import { useBlockProps, InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { applyFilters } from '@wordpress/hooks';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import sanitizeSVG from '../../utils/sanitize-svg/index.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		html,
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
	} = attributes;

	const classNames = [ 'gb-shape' ];
	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();

	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-shape-${ uniqueId }` );
	}

	const selector = useMemo( () => {
		if ( ! uniqueId ) {
			return '';
		}

		return '.gb-shape-' + uniqueId;
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
				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</InspectorAdvancedControls>
			<span
				{ ...blockProps }
				dangerouslySetInnerHTML={
					{ __html: sanitizeSVG( html ) }

				}
			/>
		</>
	);
}

const Edit = compose(
	withUniqueId
)( EditBlock );

export { Edit };
