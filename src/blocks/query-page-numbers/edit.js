import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { SelectControl, RangeControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { OpenPanel } from '@components/open-panel';

const createPaginationItem = ( content, Tag = 'a', extraClass = '' ) => (
	<Tag key={ content } className={ `page-numbers ${ extraClass }` }>
		{ content }
	</Tag>
);

const previewPaginationNumbers = ( midSize ) => {
	const paginationItems = [];

	// First set of pagination items.
	for ( let i = 1; i <= midSize; i++ ) {
		paginationItems.push( createPaginationItem( i ) );
	}

	// Current pagination item.
	paginationItems.push(
		createPaginationItem( midSize + 1, 'span', 'current' )
	);

	// Second set of pagination items.
	for ( let i = 1; i <= midSize; i++ ) {
		paginationItems.push( createPaginationItem( midSize + 1 + i ) );
	}

	// Dots.
	paginationItems.push( createPaginationItem( '...', 'span', 'dots' ) );

	// Last pagination item.
	paginationItems.push( createPaginationItem( ( midSize * 2 ) + 3 ) );

	return <>{ paginationItems }</>;
};

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		className,
		uniqueId,
		styles = {},
		css,
		htmlAttributes = [],
		globalClasses = [],
		tagName,
		midSize,
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
			classes.push( `gb-query-page-numbers-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'nav' } );
		}
	}, [ tagName ] );

	const selector = useMemo( () => {
		if ( ! uniqueId ) {
			return '';
		}

		return '.gb-query-page-numbers-' + uniqueId;
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

	const TagName = tagName || 'div';
	const tagNames = getBlockType( 'generateblocks/query-page-numbers' )?.attributes?.tagName?.enum;
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
					selectorShortcuts={ {
						default: {
							label: __( 'Numbers', 'generateblocks-pro' ),
							items: [
								{ label: __( 'Page Number', 'generateblocks-pro' ), value: '.page-numbers' },
								{ label: __( 'Current Page Number', 'generateblocks-pro' ), value: '.page-numbers.current' },
							],
						},
					} }
				>
					<OpenPanel
						title={ __( 'Settings', 'generateblocks' ) }
					>
						<RangeControl
							type="number"
							label={ __( 'Mid Size', 'generateblocks' ) }
							value={ midSize }
							onChange={ ( value ) => setAttributes( { midSize: value } ) }
							step="1"
							min="0"
							max="10"
						/>

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
					</OpenPanel>
				</BlockStyles>
			</InspectorControls>
			<TagName { ...blockProps }>
				{ previewPaginationNumbers( midSize ) }
			</TagName>
		</>
	);
}

const Edit = compose(
	withUniqueId
)( EditBlock );

export { Edit };
