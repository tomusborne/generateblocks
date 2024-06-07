import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { SelectControl, ToolbarButton } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { withDynamicTag } from '../../hoc/withDynamicTag';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { LinkBlockToolbar } from '../../components/link-block-toolbar/LinkBlockToolbar.jsx';
import { DynamicTagBlockToolbar } from '../../dynamic-tags/components/DynamicTagBlockToolbar.jsx';
import getIcon from '../../utils/get-icon/index.js';
import { applyFilters } from '@wordpress/hooks';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { TextElement } from './components/TextElement.jsx';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		dynamicTagValue,
		isSelected,
	} = props;

	const {
		tagName,
		content,
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
		icon = '',
		iconLocation,
	} = attributes;

	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const tagNames = [
		'p',
		'span',
		'div',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'a',
		'button',
	];
	const tagNameOptions = tagNames.map( ( tag ) => {
		return {
			label: tag,
			value: tag,
		};
	} ).filter( Boolean );

	const contentValue = useMemo( () => {
		if ( dynamicTagValue ) {
			return dynamicTagValue;
		}

		return content;
	}, [ dynamicTagValue, content ] );

	const classNames = [];

	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-text-${ uniqueId }` );
	}

	if ( ! icon ) {
		classNames.push( 'gb-text' );
	}

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'p' } );
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

	const { style = '', href, ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ),
			...combinedAttributes,
		}
	);

	const componentTagName = ! icon && tagName ? tagName : 'span';
	const componentBlockProps = ! icon ? blockProps : {};

	return (
		<>
			<LinkBlockToolbar
				setAttributes={ setAttributes }
				htmlAttributes={ htmlAttributes }
				tagName={ tagName }
			/>

			<DynamicTagBlockToolbar
				tooltip={ __( 'Insert dynamic tag', 'generateblocks' ) }
				onInsert={ ( value ) => setAttributes( { content: value } ) }
				renderToggle={ ( { isOpen, onToggle, isPressed } ) => (
					<ToolbarButton
						icon={ getIcon( 'database' ) }
						label={ __( 'Dynamic Tags', 'generateblocks' ) }
						onClick={ onToggle }
						aria-expanded={ isOpen }
						isPressed={ isPressed }
					/>
				) }
			/>

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
			<TextElement
				icon={ icon }
				iconLocation={ iconLocation }
				tagName={ tagName }
				blockProps={ blockProps }
			>
				<RichText
					identifier="content"
					tagName={ componentTagName }
					value={ contentValue }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					onMerge={ mergeBlocks }
					onReplace={ onReplace }
					onRemove={ () => onReplace( [] ) }
					placeholder={ icon && ! isSelected ? '' : __( 'Text', 'generateblocks' ) }
					withoutInteractiveFormatting={ 'a' === tagName || 'button' === tagName }
					{ ...( Platform.isNative && { deleteEnter: true } ) } // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
					{ ...componentBlockProps }
				/>
			</TextElement>
		</>
	);
}

const Edit = compose(
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };
