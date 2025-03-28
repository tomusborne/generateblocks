import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import sanitizeSVG from '../../utils/sanitize-svg/index.js';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';
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
	} = props;

	const {
		html,
	} = attributes;

	const classNames = getBlockClasses(
		'gb-shape',
		{
			...attributes,
			styles,
		},
		true
	);

	const shortcuts = useMemo( () => {
		const visibleSelectors = [];

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
			...editorHtmlAttributes,
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
	withUniqueId
)( EditBlock );

export { Edit };
