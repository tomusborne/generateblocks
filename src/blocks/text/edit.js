import { __ } from '@wordpress/i18n';
import { createBlock, getBlockType } from '@wordpress/blocks';
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
import { useBlockParent } from '../../hooks/useBlockParent.js';
import { getElementType } from '../element/block-types.js';
import { useTagNameCheck } from '../../hooks/useTagNameCheck.js';

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

	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const tagNameCheck = useTagNameCheck();
	const blockParent = useBlockParent();
	const parentElementType = useMemo( () => {
		if ( ! blockParent ) {
			return null;
		}

		return getElementType( blockParent.attributes.tagName );
	}, [ blockParent?.name ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const tagNames = getBlockType( 'generateblocks/text' )?.attributes?.content?.selector?.split( ',' );
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
		disabled: ! tagNameCheck( tag ).isValid,
	} ) );

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

	useEffect( () => {
		if ( 'generateblocks/text' !== blockParent?.name && 'generateblocks/element' !== blockParent?.name ) {
			return;
		}

		const tagNameValidity = tagNameCheck( tagName );

		if ( ! tagNameValidity.isValid ) {
			setAttributes( { tagName: tagNameValidity.validTagName ?? 'span' } );
		}
	}, [ tagName, parentElementType ] );

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
