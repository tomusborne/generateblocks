import usePostRecord from '../hooks/usePostRecord';
import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';

export default function AuthorMetaControl( props ) {
	const {
		isActive = false,
		postType,
		postId,
		metaFieldName,
		setAttributes,
	} = props;

	const { record, isLoading } = usePostRecord( postType, postId, [ 'author' ] );
	const value = { value: metaFieldName, label: metaFieldName }

	let options = !! metaFieldName ? [ value ] : [];

	if ( record && record.author && record.author.meta ) {
		options = options.concat( Object
			.keys( record.meta )
			.filter( ( metaKey ) => ( metaKey !== metaFieldName ) )
			.map( ( metaKey ) => ( { value: metaKey, label: metaKey } ) )
		);
	}

	return (
		<>
			{ isActive &&
				<AdvancedSelect
					id={ 'gblocks-select-author-meta-control' }
					label={ __( 'Author meta field', 'generateblocks' ) }
					help={ __( 'Live preview is only available to meta exposed to the REST API.', 'generateblocks' ) }
					placeholder={ __( 'Choose or create meta field', 'generateblocks' ) }
					options={ options }
					value={ value }
					isSearchable
					isCreatable
					isLoading={ isLoading }
					onChange={ ( option ) => {
						setAttributes( { metaFieldName: option.value } );
					} }
				/>
			}
		</>
	);
}
