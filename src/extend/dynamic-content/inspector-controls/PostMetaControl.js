import usePostRecord from '../hooks/usePostRecord';
import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';

export default function PostMetaControl( props ) {
	const {
		isActive = false,
		postType,
		postId,
		metaFieldName,
		setAttributes,
	} = props;

	const record = usePostRecord( postType, postId );
	let options = [];

	if ( record && record.meta ) {
		options = Object
			.keys( record.meta )
			.map( ( metaKey ) => ( { value: metaKey, label: metaKey } ) );
	}

	// ACF support
	if ( record && record.acf ) {
		options = options.concat(
			Object
				.keys( record.acf )
				.map( ( metaKey ) => ( { value: metaKey, label: metaKey } ) )
		);
	}

	return (
		<>
			{ isActive &&
				<AdvancedSelect
					id={ 'gblocks-select-post-meta-control' }
					label={ __( 'Post meta field', 'generateblocks' ) }
					placeholder={ __( 'Post meta field', 'generateblocks' ) }
					options={ options }
					value={ { value: metaFieldName, label: metaFieldName } }
					isSearchable
					isLoading={ ( ! record && ! record?.meta ) }
					onChange={ ( option ) => {
						setAttributes( { metaFieldName: option.value } );
					} }
				/>
			}
		</>
	);
}
