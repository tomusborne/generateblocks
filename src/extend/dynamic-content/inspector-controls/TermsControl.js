import SimpleSelect from '../../../components/simple-select';
import { useTaxonomies } from '../../../hooks';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function TermsControl( props ) {
	const {
		isActive,
		postType,
		termTaxonomy,
		termSeparator,
		setAttributes,
		name,
	} = props;

	const taxonomies = useTaxonomies();

	const taxonomiesOptions = useMemo( () => (
		taxonomies
			.filter( ( tax ) => ( tax.types.includes( postType ) ) )
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ taxonomies, postType ] );

	return (
		<>
			{ isActive &&
				<>
					<SimpleSelect
						label={ __( 'Taxonomy', 'generateblocks' ) }
						options={ taxonomiesOptions }
						value={ termTaxonomy }
						onChange={ ( option ) => {
							setAttributes( { termTaxonomy: option.value } );
						} }
					/>

					{ 'generateblocks/button' !== name &&
						<TextControl
							label={ __( 'Term separator', 'generateblocks' ) }
							value={ termSeparator }
							onChange={ ( value ) => setAttributes( { termSeparator: value } ) }
						/>
					}
				</>
			}
		</>
	);
}
