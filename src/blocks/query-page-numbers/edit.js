import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockStyles, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { __ } from '@wordpress/i18n';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { BlockSettings } from './components/BlockSettings';

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
		styles,
		css,
		htmlAttributes,
		globalClasses,
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
					scope="gb-block-styles-wrapper"
					stylesBuilderScope="gb-styles-builder-wrapper"
				>
					<BlockSettings
						{ ...props }
						getStyleValue={ getStyleValue }
						onStyleChange={ onStyleChange }
					/>
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
