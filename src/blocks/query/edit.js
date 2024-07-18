import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { withUniqueId } from '../../hoc';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import RootElement from '../../components/root-element/index.js';
import { TemplateSelector } from '@components/template-selector';
import { templates } from './templates';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
	} = props;

	const {
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
		globalClasses = [],
		tagName,
		showTemplateSelector,
	} = attributes;

	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-query-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const selector = useMemo( () => {
		if ( ! uniqueId ) {
			return '';
		}

		return '.gb-query-' + uniqueId;
	}, [ uniqueId ] );

	function onStyleChange( property, value = '', atRuleValue = '', nestedRuleValue = '' ) {
		addStyle( property, value, atRuleValue, nestedRuleValue );

		const updatedStyles = getStyles();
		setAttributes( { styles: updatedStyles } );
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
			allowedBlocks: [
				'generateblocks/looper',
				'generateblocks/query-no-results',
				'generateblocks/query-page-numbers',
				'generateblocks/element',
			],
		}
	);

	const TagName = tagName || 'div';
	const shortcuts = useMemo( () => {
		const visibleShortcuts = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
			{
				label: __( 'Links', 'generateblocks' ),
				value: 'a',
			},
		];

		return {
			selectorShortcuts,
			visibleShortcuts,
		};
	}, [] );

	if ( showTemplateSelector ) {
		return (
			<TemplateSelector
				clientId={ clientId }
				setAttributes={ setAttributes }
				label={ __( 'Tabs', 'generateblocks-pro' ) }
				instructions={ __( 'Choose a tabs layout to start with.', 'generateblocks-pro' ) }
				templates={ templates }
			/>
		);
	}

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
					selectorShortcuts={ shortcuts.selectorShortcuts }
					visibleSelectors={ shortcuts.visibleShortcuts }
					scope="gb-block-styles-wrapper"
					stylesBuilderScope="gb-styles-builder-wrapper"
				>
					<BlockSettings
						{ ...props }
						onStyleChange={ onStyleChange }
					/>
				</BlockStyles>
			</InspectorControls>
			<RootElement
				name={ name }
				clientId={ clientId }
			>
				<TagName { ...innerBlocksProps } />
			</RootElement>
		</>
	);
}

const Edit = compose(
	withEmptyObjectFix,
	withUniqueId
)( EditBlock );

export { Edit };
