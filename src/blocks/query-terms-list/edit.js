import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';

function TermLink() {
	return (
		<>
			<a
				href="/"
				onClick={ ( e ) => e.preventDefault() }
				className="gb-query-terms-list__term"
			>
				{ __( 'Term item', 'generateblocks' ) }
			</a>
		</>
	);
}

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		selector,
		onStyleChange,
		htmlAttributes,
	} = props;

	const {
		className,
		uniqueId,
		styles,
		globalClasses,
		tagName,
		separator,
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
			classes.push( `gb-query-terms-list-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

	const TagName = tagName || 'div';

	const shortcuts = useMemo( () => {
		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		return {
			selectorShortcuts: {
				default: {
					label: __( 'Term Items', 'generateblocks' ),
					items: [
						{ label: __( 'Item', 'generateblocks' ), value: 'a' },
						{ label: __( 'Hovered item', 'generateblocks' ), value: 'a:is(:hover, :focus)' },
					],
				},
			},
			visibleShortcuts: visibleSelectors,
		};
	}, [] );

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
			<TagName { ...blockProps }>
				<TermLink />{ separator ? separator : '' }
				<TermLink />{ separator ? separator : '' }
				<TermLink />
			</TagName>
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
