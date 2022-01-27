import { useDispatch, useSelect } from '@wordpress/data';
import { getColumnsFromLayout } from '../../grid/components/LayoutSelector';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { BlockContextProvider, BlockPreview, InnerBlocks } from '@wordpress/block-editor';
import useQueryLoopData from '../hooks/useQueryLoopData';
import { createBlock } from '@wordpress/blocks';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const getDefaultInnerBlock = ( uniqueId ) => {
	const attributes = getColumnsFromLayout( '100', uniqueId )[ 0 ];
	const containerInnerBlocks = [
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
		} ),
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
			element: 'p',
			contentType: 'post-date-published',
		} ),
	];

	return createBlock(
		'generateblocks/container',
		Object.assign( {}, attributes, { isQueryLoop: true } ),
		containerInnerBlocks
	);
};

function removeEmpty( obj ) {
	return Object.fromEntries( Object.entries( obj ).filter( ( [ idx, value ] ) => {
		return Array.isArray( value ) ? !! value.length : !! value;
	} ) );
}

function getTaxQueryParam( taxQuery, isExclude = false ) {
	const paramKey = isExclude ? `${taxQuery.rest}_exclude` : taxQuery.rest;
	return { [ paramKey ]: taxQuery.terms };
}

function normalizeTaxQuery( taxQueryValue, isExclude = false ) {
	return taxQueryValue.reduce( ( normalized, taxQuery ) => {
		return Object.assign( {}, normalized, getTaxQueryParam( taxQuery, isExclude ) );
	}, {} );
}

function normalizeRepeatableArgs( query ) {
	let normalizedQuery = Object.assign( {}, query );

	if ( Array.isArray( query[ 'tax_query' ] ) ) {
		const normalizedTaxQuery = normalizeTaxQuery( query[ 'tax_query' ] );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQuery,
			{ ['tax_query']: undefined }
		);
	}

	if ( Array.isArray( query[ 'tax_query_exclude' ] ) ) {
		const normalizedTaxQueryExclude = normalizeTaxQuery( query[ 'tax_query_exclude' ], true );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQueryExclude,
			{ ['tax_query_exclude']: undefined }
		);
	}

	return normalizedQuery;
}

export default ( props ) => {
	const { clientId, uniqueId, attributes } = props;
	const [ activeContext, setActiveContext ] = useState();
	const [ templateLock, setTemplateLock ] = useState( false );
	const { query } = attributes;

	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const { data, hasData, isResolvingData, hasResolvedData } = useQueryLoopData( [
		'postType',
		query.post_type || 'post',
		normalizeRepeatableArgs( removeEmpty( query ) ),
	] );

	useEffect( () => {
		if ( hasData && ! innerBlocks.length ) {
			insertBlocks( getDefaultInnerBlock( uniqueId ), 0, clientId, false );
			setTemplateLock( 'all' );
		}
	}, [ hasData, innerBlocks ] );

	const dataContexts = useMemo(
		() =>
			hasData && data.map( ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) ),
		[ data, hasData ]
	);

	if ( isResolvingData ) {
		return (<Spinner />);
	}

	if ( hasResolvedData && ! hasData ) {
		return (<h5>{ __( 'No results found.', 'generateblocks' ) }</h5>);
	}

	return (
		dataContexts &&
		dataContexts.map( ( postContext ) => (
			<BlockContextProvider
				key={ postContext.postId }
				value={ postContext }
			>
				{ postContext === ( activeContext || dataContexts[ 0 ] )
					? <InnerBlocks { ...props } templateLock={ templateLock } />
					: <div className={ 'block-editor-inner-blocks' }>
						<BlockPreview
							blocks={ innerBlocks }
							__experimentalLive
							__experimentalOnClick={ () => setActiveContext( postContext ) }
						/>
					</div>
				}
			</BlockContextProvider>
		) ) );
};
