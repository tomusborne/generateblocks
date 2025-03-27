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

const createPaginationItem = ( content, Tag = 'a', extraClass = '', key = content ) => (
	<Tag key={ key } className={ `page-numbers ${ extraClass }` }>
		{ content }
	</Tag>
);

const previewPaginationNumbers = ( midSize, totalPages, currentPage ) => {
	const paginationItems = [];

	// First set of pagination items (from page 1 to currentPage - midSize).
	const startPage = Math.max( 1, currentPage - midSize );
	const endPage = Math.min( currentPage + midSize, totalPages );

	// Add first page if it's not within the range.
	if ( startPage > 1 ) {
		paginationItems.push( createPaginationItem( 1, 'a', '', 'page-1' ) );
		if ( startPage > 2 ) {
			// Add dots if there's a gap between the first page and the range.
			paginationItems.push( createPaginationItem( '...', 'span', 'dots', 'dots-start' ) );
		}
	}

	// Loop through the pages in the calculated range.
	for ( let i = startPage; i <= endPage; i++ ) {
		if ( i === currentPage ) {
			// Current page
			paginationItems.push( createPaginationItem( i, 'span', 'current', `current-${ i }` ) );
		} else {
			paginationItems.push( createPaginationItem( i, 'a', '', `page-${ i }` ) );
		}
	}

	// Add last page if it's not within the range.
	if ( endPage < totalPages ) {
		if ( endPage < totalPages - 1 ) {
			// Add dots if there's a gap between the last page in the range and totalPages.
			paginationItems.push( createPaginationItem( '...', 'span', 'dots', 'dots-end' ) );
		}
		paginationItems.push( createPaginationItem( totalPages, 'a', '', `last-${ totalPages }` ) );
	}

	return <>{ paginationItems }</>;
};

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		onStyleChange,
		editorHtmlAttributes,
		styles,
		name,
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
		const visibleSelectors = [];

		return {
			selectorShortcuts: {
				default: {
					label: __( 'Numbers', 'generateblocks' ),
					items: [
						{ label: __( 'Page Number', 'generateblocks' ), value: '.page-numbers' },
						{ label: __( 'Hovered Page Number', 'generateblocks' ), value: '.page-numbers:is(:hover, :focus)' },
						{ label: __( 'Current Page Number', 'generateblocks' ), value: '.page-numbers.current' },
						{ label: __( 'Dots', 'generateblocks' ), value: '.page-numbers.dots' },
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
							attributes={ attributes }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
							name={ name }
						/>
					) }
				/>
			</InspectorControls>
			<TagName { ...blockProps }>
				{ previewPaginationNumbers( midSize, 6, 1 ) }
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
