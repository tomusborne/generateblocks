import { mount } from 'enzyme';
import withUniqueId, { generateUniqueId, getUniqueIdFromBlocks, hasDuplicates } from '../withUniqueId';
import getEditorBlocks from '../../utils/get-editor-blocks';

const TestComponent = ( props ) => ( <p>{ props.attributes.uniqueId }</p> );
const setAttributesMock = jest.fn();
jest.mock( '../../utils/get-editor-blocks' );

describe( 'withUniqueId HOC', () => {
	beforeAll( () => {
		getEditorBlocks.mockReturnValue( [
			{
				name: 'notGB/block',
				clientId: '71442354-877f-4b1b-ac8a-8a8569c42cde',
				attributes: {
					uniqueId: '44235487',
				},
				setAttributes: setAttributesMock,
				innerBlocks: [],
			},
			{
				name: 'generateblocks/block',
				clientId: 'b778e621-2186-4464-a301-8c0603c77e87',
				attributes: {
					uniqueId: '78e62121',
				},
				setAttributes: setAttributesMock,
				innerBlocks: [],
			},
			{
				name: 'generateblocks/block',
				clientId: '71442354-877f-4b1b-ac8a-8a8569c42cde',
				attributes: {
					uniqueId: '44235487',
				},
				setAttributes: setAttributesMock,
				innerBlocks: [
					{
						name: 'generateblocks/block',
						clientId: 'e440631f-af99-48e5-a3aa-073be4fbcff8',
						attributes: {
							uniqueId: '40631faf',
						},
						setAttributes: setAttributesMock,
						innerBlocks: [
							{
								name: 'generateblocks/block',
								clientId: 'd9930069-7118-463c-9720-3359c922c58c',
								attributes: {
									uniqueId: '93006971',
								},
								setAttributes: setAttributesMock,
								innerBlocks: [],
							},
							{
								name: 'generateblocks/block',
								clientId: 'd9930069-7118-463c-9720-3359c922c58c',
								attributes: {
									uniqueId: '93006971',
								},
								setAttributes: setAttributesMock,
								innerBlocks: [],
							},
						],
					},
				],
			},
		] );
	} );

	describe( 'generateUniqueId', () => {
		it( 'should generate the uniqueId', () => {
			expect( generateUniqueId( '71442354-877f-4b1b-ac8a-8a8569c42cde' ) ).toEqual( '44235487' );
			expect( generateUniqueId( 'b778e621-2186-4464-a301-8c0603c77e87' ) ).toEqual( '78e62121' );
			expect( generateUniqueId( '71442354-877f-4b1b-ac8a-8a8569c42cde' ) ).toEqual( '44235487' );
			expect( generateUniqueId( 'd9930069-7118-463c-9720-3359c922c58c' ) ).toEqual( '93006971' );
		} );
	} );

	describe( 'getUniqueIdFromBlocks', () => {
		it( 'should return all uniqueIds', () => {
			expect( getUniqueIdFromBlocks( getEditorBlocks() ) ).toEqual( [
				'78e62121',
				'44235487',
				'40631faf',
				'93006971',
				'93006971',
			] );
		} );
	} );

	describe( 'hasDuplicates', () => {
		it( 'should validate if array has duplicates', () => {
			expect( hasDuplicates( [ 'a', 'b', 'c', 'd', 'c' ], 'c' ) ).toBeTruthy();
			expect( hasDuplicates( [ 'a', 'b', 'c', 'ab' ], 'ab' ) ).toBeFalsy();
			expect( hasDuplicates( [ 'a', 'b', 'c' ], 'ab' ) ).toBeFalsy();

			const uniqueIds = [ '78e62121', '44235487', '40631faf', '93006971', '93006971' ];

			expect( hasDuplicates( uniqueIds, '93006971' ) ).toBeTruthy();
		} );
	} );

	it( 'should not trigger setAttributes if theres no duplicates', () => {
		const props = {
			clientId: 'a194b167-3665-43bs-9dc1-db3a1cdd93f0',
			attributes: {
				uniqueId: '94b16736',
			},
			setAttributes: setAttributesMock,
		};

		const EnhancedComponent = withUniqueId( TestComponent );
		mount( <EnhancedComponent { ...props } /> );

		expect( setAttributesMock.mock.calls.length ).toBe( 0 );
	} );

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

	it( 'should trigger setAttributes if uniqueId is duplicated', () => {
		const props = {
			clientId: 'a204bfy7-6165-43bs-9dc1-db3a1cdd93f0',
			attributes: {
				uniqueId: '93006971',
			},
			setAttributes: setAttributesMock,
		};

		const EnhancedComponent = withUniqueId( TestComponent );
		mount( <EnhancedComponent { ...props } /> );
		expect( setAttributesMock.mock.calls[ 1 ][ 0 ] ).toEqual( { uniqueId: '04bfy761' } );
	} );
} );
