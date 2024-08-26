import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withUniqueId } from '../../hoc';
import { BlockStyles } from '@edge22/block-styles';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import sanitizeSVG from '../../utils/sanitize-svg/index.js';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		selector,
		onStyleChange,
	} = props;

	const {
		html,
		className,
		uniqueId,
		styles = {},
		htmlAttributes = [],
		globalClasses = [],
	} = attributes;

	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-shape-${ uniqueId }` );
		}

		classes.push( 'gb-shape' );

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	const { style = '', ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...combinedAttributes,
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
							shortcuts={ {} }
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
	withStyles,
	withEmptyObjectFix,
	withUniqueId
)( EditBlock );

export { Edit };
