import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { ToolbarButton } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { withDynamicTag } from '../../hoc/withDynamicTag';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { LinkBlockToolbar } from '../../components/link-block-toolbar/LinkBlockToolbar.jsx';
import { DynamicTagBlockToolbar } from '../../dynamic-tags/components/DynamicTagBlockToolbar.jsx';
import getIcon from '../../utils/get-icon/index.js';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { Icon } from './components/Icon.jsx';
import RootElement from '../../components/root-element/index.js';
import { useCurrentAtRule } from '../../hooks/useCurrentAtRule.js';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		dynamicTagValue,
		isSelected,
		name,
		clientId,
	} = props;

	const {
		tagName,
		content,
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
		icon,
		iconLocation,
		globalClasses = [],
	} = attributes;

	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const currentAtRule = useCurrentAtRule();

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const contentValue = useMemo( () => {
		if ( dynamicTagValue ) {
			// Create a temp element so we can get the text-only value.
			// This allows us to replace the text inside links for example.
			const tempElement = document.createElement( 'div' );
			tempElement.innerHTML = content;
			const textContent = tempElement.textContent;

			return content.replace( textContent, dynamicTagValue );
		}

		return content;
	}, [ dynamicTagValue, content ] );

	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-text-${ uniqueId }` );
		}

		if ( ! icon ) {
			classes.push( 'gb-text' );
		}

		return classes;
	}, [ className, styles, icon, uniqueId, globalClasses ] );

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

	const { style = '', href, ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...combinedAttributes,
		}
	);

	const TagNameWithIcon = tagName || 'span';
	const richTextProps = {
		identifier: content,
		value: contentValue,
		onChange: ( value ) => setAttributes( { content: value } ),
		onMerge: mergeBlocks,
		onReplace,
		onRemove: () => onReplace( [] ),
		placeholder: !! icon && ! isSelected ? '' : __( 'Text', 'generateblocks' ),
		withoutInteractiveFormatting: 'a' === tagName || 'button' === tagName,
		...( Platform.isNative && { deleteEnter: true } ), // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
	};
	const shortcuts = useMemo( () => {
		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		if ( 'a' === tagName || 'button' === tagName ) {
			visibleSelectors.push(
				{
					label: __( 'Hover', 'generateblocks' ),
					value: ':is(:hover, :focus)',
				}
			);

			delete selectorShortcuts.links;
		}

		if ( icon ) {
			visibleSelectors.push(
				{
					label: __( 'Icon', 'generateblocks' ),
					value: '.gb-shape svg',
				},
			);

			selectorShortcuts.default.items.push(
				{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
				{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
			);

			selectorShortcuts.icons = {
				label: __( 'Icon', 'generateblocks' ),
				items: [
					{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
					{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
				],
			};
		}

		return {
			selectorShortcuts,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName, icon ] );

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
					selectorShortcuts={ shortcuts.selectorShortcuts }
					visibleSelectors={ shortcuts.visibleShortcuts }
					scope="gb-block-styles-wrapper"
					stylesBuilderScope="gb-styles-builder-wrapper"
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
			>
				<>
					{ !! icon && (
						<TagNameWithIcon { ...blockProps }>
							{ 'before' === iconLocation && ( <Icon icon={ icon } /> ) }
							<RichText
								{ ...richTextProps }
								tagName="span"
							/>
							{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
						</TagNameWithIcon>
					) }

					{ ! icon && (
						<RichText
							{ ...richTextProps }
							{ ...blockProps }
							tagName={ tagName || 'span' }
						/>
					) }
				</>
			</RootElement>
		</>
	);
}

const Edit = compose(
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };