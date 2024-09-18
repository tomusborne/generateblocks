import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import sanitizeSVG from '../../utils/sanitize-svg/index.js';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses.js';
import { useBlockClassAttributes } from '@hooks/useBlockClassAttributes.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		selector,
		onStyleChange,
		htmlAttributes,
	} = props;

	const {
		html,
	} = attributes;

	const classNameAttributes = useBlockClassAttributes( attributes );
	const classNames = getBlockClasses( 'gb-shape', classNameAttributes, true );

	const shortcuts = useMemo( () => {
		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		visibleSelectors.push(
			{
				label: 'SVG Element',
				value: 'svg',
			}
		);

		return {
			selectorShortcuts: {},
			visibleShortcuts: visibleSelectors,
		};
	}, [] );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

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
							selector={ selector }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
						/>
					) }
				/>
			</InspectorControls>
			<RootElement
				name={ name }
				clientId={ clientId }
			>
				<span
					{ ...blockProps }
					dangerouslySetInnerHTML={
						{ __html: sanitizeSVG( html ) }

					}
				/>
			</RootElement>
		</>
	);
}

const Edit = compose(
	withHtmlAttributes,
	withStyles,
	withEmptyObjectFix,
	withUniqueId
)( EditBlock );

export { Edit };
