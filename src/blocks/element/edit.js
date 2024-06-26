import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockStyles, withUniqueId, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { useSelect, useDispatch } from '@wordpress/data';
import BlockAppender from './components/BlockAppender.jsx';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { convertInlineStyleStringToObject } from './utils.js';
import RootElement from '../../components/root-element/index.js';
import { useCurrentAtRule } from '../../hooks/useCurrentAtRule.js';
import { BlockSettings } from './components/BlockSettings';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
		name,
	} = props;

	const {
		tagName,
		className,
		styles = {},
		uniqueId,
		css,
		htmlAttributes = {},
		globalClasses = [],
		isBlockPreview = false,
	} = attributes;

	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const currentAtRule = useCurrentAtRule();
	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-element-${ uniqueId }` );
		}

		if ( isBlockPreview ) {
			classes.push( 'gb-block-preview' );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId, isBlockPreview ] );

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

	function getStyleValue( property, atRuleValue = '', nestedRuleValue = '' ) {
		if ( nestedRuleValue ) {
			if ( atRuleValue ) {
				return styles?.[ atRuleValue ]?.[ nestedRuleValue ]?.[ property ] ?? '';
			}

			return styles?.[ nestedRuleValue ]?.[ property ] ?? '';
		} else if ( atRuleValue ) {
			return styles?.[ atRuleValue ]?.[ property ] ?? '';
		}

		return styles?.[ property ] ?? '';
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
			className: classNames.join( ' ' ).trim(),
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
					<BlockSettings
						{ ...props }
						getStyleValue={ getStyleValue }
						onStyleChange={ onStyleChange }
						currentAtRule={ currentAtRule }
					/>
				</BlockStyles>
			</InspectorControls>
			<RootElement
				name={ name }
				clientId={ clientId }
				isBlockPreview={ isBlockPreview }
			>
				<TagName { ...innerBlocksProps } />
			</RootElement>
		</>
	);
}

const Edit = compose(
	withUniqueId
)( EditBlock );

export { Edit };
