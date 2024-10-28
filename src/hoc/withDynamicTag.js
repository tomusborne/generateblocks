import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			attributes,
		} = props;

		const {
			content,
			htmlAttributes,
			tagName,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const [ contentMode, setContentMode ] = useState( 'edit' );
		const getContentValue = () => {
			if ( 'img' === tagName ) {
				return htmlAttributes?.src;
			}

			if ( content?.originalHTML ) {
				return content.originalHTML;
			}

			return content?.text ?? content;
		};
		const contentValue = getContentValue();

		useEffect( () => {
			if ( ! contentValue || ! contentValue.includes( '{' ) ) {
				setDynamicTagValue( false );
				return;
			}

			if ( 'edit' === contentMode && 'img' !== tagName ) {
				setDynamicTagValue( false );
				return;
			}

			// Define an async function to fetch data
			const fetchData = async() => {
				try {
					const response = await apiFetch( {
						path: '/generateblocks/v1/dynamic-tag-replacements',
						method: 'POST',
						data: {
							content: contentValue,
							context,
						},
					} );

					setDynamicTagValue( response );
				} catch ( error ) {
					console.error( 'Error fetching data:', error ); // eslint-disable-line no-console
					setDynamicTagValue( null ); // Handle error case
				}
			};

			fetchData(); // Call the async function
		}, [ contentValue, contentMode ] );

		return (
			<WrappedComponent
				{ ...props }
				dynamicTagValue={ dynamicTagValue }
				contentMode={ contentMode }
				setContentMode={ setContentMode }
			/>
		);
	} );
}
