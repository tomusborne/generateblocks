import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			isSelected,
			attributes,
		} = props;

		const {
			content,
			htmlAttributes,
			tagName,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const getContentValue = () => {
			if ( 'img' === tagName ) {
				return htmlAttributes?.src;
			}

			return content;
		};
		const contentValue = getContentValue();

		useEffect( () => {
			if ( ! contentValue || ! contentValue.includes( '{' ) ) {
				setDynamicTagValue( false );
				return;
			}

			if ( isSelected && 'img' !== tagName ) {
				setDynamicTagValue( false );
				return;
			}

			// Define an async function to fetch data
			const fetchData = async() => {
				try {
					const response = await apiFetch( {
						path: addQueryArgs(
							'/generateblocks/v1/dynamic-tag?content=',
							{
								content: encodeURIComponent( contentValue ),
								postId: context?.postId,
							},
						),
						method: 'GET',
					} );

					setDynamicTagValue( response );
				} catch ( error ) {
					console.error( 'Error fetching data:', error ); // eslint-disable-line no-console
					setDynamicTagValue( null ); // Handle error case
				}
			};

			fetchData(); // Call the async function
		}, [ contentValue, isSelected ] );

		return ( <WrappedComponent { ...props } dynamicTagValue={ dynamicTagValue } /> );
	} );
}
