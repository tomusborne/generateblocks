import { mount } from 'enzyme';
import withUniqueId from '../withUniqueId';

const TestComponent = ( props ) => ( <p>{ props.attributes.uniqueId }</p> );
const setAttributesMock = jest.fn();

describe( 'withUniqueId HOC', () => {
	it( 'should trigger setAttributes with correct uniqueId', () => {
		const props = {
			clientId: '94a1170d-3665-4333-9dc1-db3a1cdd93f0',
			attributes: {
				uniqueId: '',
			},
			setAttributes: setAttributesMock,
		};

		const EnhancedComponent = withUniqueId( TestComponent );
		mount( <EnhancedComponent { ...props } /> );

		expect( setAttributesMock.mock.calls[ 0 ][ 0 ] ).toEqual( { uniqueId: 'a1170d36' } );
	} );

	it( 'should trigger setAttributes if clientId changed', () => {
		const props = {
			clientId: 'a194b167-3665-43bs-9dc1-db3a1cdd93f0',
			attributes: {
				uniqueId: 'a1170d36',
			},
			setAttributes: setAttributesMock,
		};

		const EnhancedComponent = withUniqueId( TestComponent );
		mount( <EnhancedComponent { ...props } /> );

		expect( setAttributesMock.mock.calls[ 1 ][ 0 ] ).toEqual( { uniqueId: '94b16736' } );
	} );
} );
