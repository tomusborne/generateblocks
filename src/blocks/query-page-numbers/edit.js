import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses';

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
		onStyleChange,
		editorHtmlAttributes,
		styles,
	} = props;

	const {
		tagName,
		midSize,
	} = attributes;

	const classNames = getBlockClasses(
		'gb-query-page-numbers',
		{
			...attributes,
			styles,
		}
	);

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'nav' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...editorHtmlAttributes,
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
					label: __( 'Numbers', 'generateblocks-pro' ),
					items: [
						{ label: __( 'Page Number', 'generateblocks-pro' ), value: '.page-numbers' },
						{ label: __( 'Current Page Number', 'generateblocks-pro' ), value: '.page-numbers.current' },
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
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
						/>
					) }
				/>
			</InspectorControls>
			<TagName { ...blockProps }>
				{ previewPaginationNumbers( midSize ) }
			</TagName>
		</>
	);
}

const Edit = compose(
	withHtmlAttributes,
	withStyles,
	withUniqueId
)( EditBlock );

export { Edit };
