import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import TaxonomySelectControl from '../../../components/taxonomy-select-control';

export default function TermsControl( props ) {
	const {
		isActive,
		postType,
		termTaxonomy,
		termSeparator,
		setAttributes,
		name,
	} = props;

	return (
		<>
			{ isActive &&
				<>
					<TaxonomySelectControl
						postType={ postType }
						taxonomy={ termTaxonomy }
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
