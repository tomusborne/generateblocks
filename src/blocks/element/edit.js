import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { BlockStyles, withUniqueId } from '@edge22/block-styles';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts.js';
import { withStyles } from '@hoc/withStyles';
import { AlignmentToolbar, BlockStylesBuilder, StylesOnboarder } from '@components/index.js';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses.js';
import { BlockAppender } from '@components';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
		name,
		getStyleValue,
		onStyleChange,
		editorHtmlAttributes,
		styles,
	} = props;

	const {
		tagName,
		align,
	} = attributes;

	const classNames = getBlockClasses(
		'gb-element',
		{
			...attributes,
			styles,
		}
	);

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...editorHtmlAttributes,
		}
	);
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender: () => (
				<BlockAppender
					clientId={ clientId }
					isSelected={ isSelected }
					attributes={ attributes }
				/>
			),
		}
	);
	const TagName = tagName || 'div';
	const shortcuts = useMemo( () => {
		const visibleSelectors = [];
		const blockSelectors = { ...selectorShortcuts };

		if ( 'a' !== tagName ) {
			visibleSelectors.push(
				{
					label: __( 'Links', 'generateblocks' ),
					value: 'a',
				}
			);
		}

		if ( 'a' === tagName || 'button' === tagName ) {
			if ( blockSelectors?.links ) {
				delete blockSelectors.links;
			}

			const defaultItems = blockSelectors?.default?.items || [];

			if ( defaultItems.length > 0 ) {
				blockSelectors.default.items = defaultItems.filter( ( item ) => {
					return 'a' !== item.value && ! item.value.startsWith( 'a:' );
				} );
			}
		}

		return {
			selectorShortcuts: blockSelectors,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName ] );

	return (
		<>
			<InspectorControls>
				<StylesOnboarder />

				<AlignmentToolbar
					withTextAlign
					withBlockWidth
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					align={ align }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>

				<BlockStyles
					settingsTab={ (
						<BlockSettings
							{ ...props }
						/>
					) }
					stylesTab={ (
						<BlockStylesBuilder
							attributes={ attributes }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
							name={ name }
						/>
					) }
				/>
			</InspectorControls>
			<RootElement
				name={ name }
				clientId={ clientId }
				align={ align }
			>
				<TagName { ...innerBlocksProps } />
			</RootElement>
		</>
	);
}

const Edit = compose(
	withHtmlAttributes,
	withStyles,
	withUniqueId
)( EditBlock );

export { Edit };
