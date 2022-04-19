import useType from './useType';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectObject,
	selectObjectRecord,
	selectRecordsFromRelation,
} from '../store/data/selectors';
import { useEffect, useMemo } from '@wordpress/element';
import { fetchManyRecords, fetchOneRecord } from '../store/data/actions';
import useTaxonomy from './taxonomies/useTaxonomy';

/**
 * Return the a single post type record.
 * If not loaded on the store it will auto-fetch the record.
 *
 * @param postType The post type.
 * @param postId The post id.
 * @param relations
 * @returns {Object|undefined} The record or undefined.
 */
export default function usePostTypeRecord( postType, postId, relations = [] ) {
	const dispatch = useDispatch();

	const taxonomySlug = relations
		.filter( ( rel ) => ( rel.startsWith( 'terms.' ) ) )
		.reduce( ( res, rel ) => ( rel.split( '.' )[ 1 ] ), '' );

	const type = useType( postType );
	const taxonomy = useTaxonomy( taxonomySlug );
	const postRecord = useSelector( selectObjectRecord( type?.rest_base, postId ) ) || undefined;
	const postAuthor = useSelector( selectObjectRecord( 'users', postRecord?.author ) ) || undefined;
	const postComments = useSelector( selectRecordsFromRelation( type?.rest_base, 'comments', postId ) ) || [];
	const postTerms = useSelector( selectRecordsFromRelation( type?.rest_base, taxonomy?.rest_base, postId ) ) || [];

	const postRequestStatus = useSelector( selectObject( type?.rest_base ) )?.status || 'pending';
	const authorRequestStatus = useSelector( selectObject( 'users' ) )?.status;
	const commentsRequestStatus = useSelector( selectObject( 'comments' ) )?.status;
	const termsRequestStatus = useSelector( selectObject( taxonomy?.rest_base ) )?.status;

	useEffect( () => {
		if ( ! postRecord && !! type?.rest_base ) {
			dispatch( fetchOneRecord( { kind: type?.rest_base, id: postId } ) );
		}

		if ( relations.includes( 'author' ) && !! postRecord?.author && ! postAuthor ) {
			dispatch( fetchOneRecord( {
				kind: 'users',
				id: postRecord?.author,
				query: { context: 'edit' },
			} ) );
		}

		if ( relations.includes( 'comments' ) && !! postRecord && !! type?.rest_base && postComments.length === 0 ) {
			dispatch( fetchManyRecords( {
				kind: 'comments',
				query: { post: postRecord?.id, per_page: -1 },
				hasRelation: true,
				relationKind: type?.rest_base,
				relationId: postRecord?.id,
			} ) );
		}

		if ( !! taxonomy && !! postRecord && postTerms.length === 0 ) {
			dispatch( fetchManyRecords( {
				kind: taxonomy?.rest_base,
				query: { post: postRecord?.id },
				hasRelation: true,
				relationKind: type?.rest_base,
				relationId: postRecord?.id,
			} ) );
		}
	}, [
		!! postRecord,
		!! type,
		!! postAuthor,
		JSON.stringify( postComments ),
		JSON.stringify( postTerms ),
		JSON.stringify( relations )
	] );

	const record = useMemo( () => (
		!! postRecord ? Object.assign( {}, postRecord, {
			author: postAuthor,
			comments: postComments,
			terms: postTerms,
		} ) : undefined
	), [
		JSON.stringify( postRecord ),
		JSON.stringify( postAuthor ),
		JSON.stringify( postComments ),
		JSON.stringify( postTerms ),
	] );

	const requestStatusBucket = [ postRequestStatus, authorRequestStatus, commentsRequestStatus, termsRequestStatus ];
	const hasPendingRequest = requestStatusBucket.some( ( status ) => ( 'pending' === status ) );
	const hasRejectedRequest = requestStatusBucket.some( ( status ) => ( 'rejected' === status ) );
	const status = hasPendingRequest ? 'pending' : ( hasRejectedRequest ? 'rejected' : postRequestStatus );

	return { record, status };
}
