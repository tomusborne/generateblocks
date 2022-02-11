import usePostRecord from '../hooks/usePostRecord';
import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';

export default function AuthorMetaControl( props ) {
	const {
		isActive = false,
		postType,
		postId,
		metaFieldName,
		setAttributes,
	} = props;

	const record = usePostRecord( postType, postId );
	let options = [];

	if ( record && record.author && record.author.meta ) {
		options = Object
			.keys( record.author.meta )
			.map( ( metaKey ) => ( { value: metaKey, label: metaKey } ) );
	}

	// ACF support
	if ( record && record.author && record.author.acf ) {
		options = options.concat(
			Object
				.keys( record.author.acf )
				.map( ( metaKey ) => ( { value: metaKey, label: metaKey } ) )
		);
	}

	return (
		<>
			{ isActive &&
			<AdvancedSelect
				id={ 'gblocks-select-author-meta-control' }
				label={ __( 'Author meta field', 'generateblocks' ) }
				placeholder={ __( 'Author meta field', 'generateblocks' ) }
				options={ options }
				value={ { value: metaFieldName, label: metaFieldName } }
				isSearchable
				isLoading={ ( !record && ! record.author && ! record.author.meta ) }
				onChange={ ( option ) => {
					setAttributes( { metaFieldName: option.value } );
				} }
			/>
			}
		</>
	);
}
