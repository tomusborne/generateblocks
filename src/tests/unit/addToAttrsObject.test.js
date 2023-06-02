import { addToAttrsObject } from '../../hoc/migrations/utils';

describe( 'Test adding to attribute object', () => {
	it( 'can add attributes', () => {
		let attrs = {
			previouslyAddedAttribute: 'testing',
		};

		const existingAttrs = {
			typography: {
				fontSize: '10px',
			},
		};

		const newAttrs = {
			newAttributes: {
				lineHeight: '2em',
			},
			oldAttributes: {
				lineHeight: '',
			},
		};

		attrs = addToAttrsObject( {
			attrs,
			attributeName: 'typography',
			existingAttrs: existingAttrs.typography,
			newAttrs: newAttrs.newAttributes,
			oldAttrs: newAttrs.oldAttributes,
		} );

		expect( attrs ).toEqual( {
			previouslyAddedAttribute: 'testing',
			typography: {
				fontSize: '10px',
				lineHeight: '2em',
			},
			lineHeight: '',
		} );
	} );
} );
