import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import RootElement from '../../components/root-element/index.js';
import { TemplateSelector } from '@components/template-selector';
import { TEMPLATES } from './templates';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withStyles } from '@hoc/withStyles';
import { BlockAppender, BlockStylesBuilder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		onStyleChange,
		editorHtmlAttributes,
		styles,
		isSelected,
	} = props;

	const {
		tagName,
		showTemplateSelector,
	} = attributes;

	const classNames = getBlockClasses(
		'gb-query',
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
			allowedBlocks: [
				'generateblocks/looper',
				'generateblocks/query-no-results',
				'generateblocks/query-page-numbers',
				'generateblocks/element',
			],
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
		const visibleShortcuts = [
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
				label={ __( 'Query', 'generateblocks' ) }
				instructions={ __( 'Choose a layout to start with.', 'generateblocks' ) }
				templates={ TEMPLATES }
			/>
		);
	}

	return (
		<>
			<InspectorControls>
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
