import { useBlockProps, InspectorControls, InspectorAdvancedControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { withUniqueId } from '../../hoc';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import RootElement from '../../components/root-element/index.js';
import { OpenPanel } from '@components/open-panel';
import { QueryInspectorControls } from './components/QueryInspectorControls';
import { TemplateSelector } from '@components/template-selector';
import { templates } from './templates';

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
				>
					<OpenPanel
						title={ __( 'Query Parameters', 'generateblocks' ) }
					>
						<QueryInspectorControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</OpenPanel>
					<OpenPanel
						title={ __( 'Settings', 'generateblocks' ) }
					>
						<HtmlAttributes
							items={ htmlAttributes }
							onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
							onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
							onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
						/>
					</OpenPanel>
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
	withUniqueId
)( EditBlock );

export { Edit };
