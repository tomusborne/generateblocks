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

	const { record, isLoading } = usePostRecord( postType, postId );
	const value = !! metaFieldName ? { value: metaFieldName, label: metaFieldName } : undefined;

	let options = !! value ? [ value ] : [];

	if ( record && record.meta ) {
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
					id={ 'gblocks-select-post-meta-control' }
					label={ __( 'Post meta field', 'generateblocks' ) }
					help={ __( 'Live preview is only available to meta exposed to the REST API.', 'generateblocks' ) }
					placeholder={ __( 'Choose or add meta key', 'generateblocks' ) }
					options={ options }
					value={ value }
					isSearchable
					isCreatable
					isClearable
					formatCreateLabel={ ( input ) => ( `Add "${ input }"` ) }
					isLoading={ isLoading }
					onChange={ ( option ) => {
						setAttributes( { metaFieldName: option?.value || undefined } );
					} }
				/>
			}
		</>
	);
}
