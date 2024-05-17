import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockStyles, withUniqueId, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { ColorPicker } from '@edge22/components';
import { useSelect, useDispatch } from '@wordpress/data';
import BlockAppender from './components/BlockAppender.jsx';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { PanelBody, SelectControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { colorControls } from './design.js';

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

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ),
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
					<PanelBody>
						<SelectControl
							label={ __( 'Tag Name' ) }
							value={ tagName }
							options={ tagNameOptions }
							onChange={ ( value ) => setAttributes( { tagName: value } ) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Design', 'generateblocks' ) }
						initialOpen={ false }
					>
						{ colorControls.map( ( control ) => {
							return (
								<ColorPicker
									key={ control.label }
									label={ control.label }
									value={ getStyleValue( control.value, control.selector ) }
									onChange={ ( value ) => onStyleChange( control.value, value, '', control.selector ) }
								/>
							);
						} ) }
					</PanelBody>
				</BlockStyles>
			</InspectorControls>
			<TagName { ...innerBlocksProps } />
		</>
	);
}

const Edit = compose(
	withUniqueId
)( EditBlock );

export { Edit };
