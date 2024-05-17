import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			isSelected,
			attributes,
			name,
		} = props;

		const {
			content,
			text,
			mediaUrl,
			bgImage,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const getContentValue = () => {
			if ( 'generateblocks/button' === name ) {
				return text;
			} else if ( 'generateblocks/image' === name ) {
				return mediaUrl;
			} else if ( 'generateblocks/container' === name ) {
				return bgImage?.image?.url;
			}

			return content;
		};
		const contentValue = getContentValue();

		useEffect( () => {
			console.log( contentValue );
			if ( ! contentValue || ! contentValue.startsWith( '{' ) || isSelected ) {
				// We don't need to remove the dynamic value for the image block.
				if ( isSelected && ( 'generateblocks/image' === name || 'generateblocks/container' === name ) ) {
					return;
				}

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

					let fetchedValue = response;

					// Append dynamic tag to image URL so we can show the dynamic tag in the editor.
					if ( 'generateblocks/image' === name ) {
						fetchedValue += '?dynamicTag=' + contentValue;
					}

					console.log( context?.postId );

					setDynamicTagValue( fetchedValue );
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
