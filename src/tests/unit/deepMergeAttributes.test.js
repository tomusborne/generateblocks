import { deepMergeAttributes } from '../../hoc/withSetAttributes';

describe( 'deepMergeAttributes', () => {
	it( 'handles complex object merging', () => {
		const attributes = {
			content: 'Some content',
			blockVersion: '4',
			sizing: {
				paddingTop: '10px',
				paddingBottom: '10px',
				marginTop: '20px',
			},
			borders: {
				borderTopWidth: '2px',
				borderTopStyle: 'solid',
				borderTopColor: 'var(--accent)',
			},
			opacities: [
				{ state: 'normal', target: 'self', opacity: 2 },
			],
			edgeCases: {
				very: {
					deepObj: {
						something: 'here',
					},
					deepArr: [
						{ something: 'here' },
					],
				},
			},
		};

		const result = deepMergeAttributes( attributes, {
			content: 'Some new content',
			sizing: {
				paddingTop: '5px',
				paddingLeft: '10px',
				marginBottom: '20px',
			},
			borders: {
				borderTopWidth: '5px',
			},
			opacities: [
				{ state: 'normal', target: 'self', opacity: 1 },
			],
			edgeCases: {
				very: {
					deepObj: {
						something: 'working',
					},
					deepArr: [
						{ something: 'also working' },
					],
				},
			},
		} );

		expect( result.content ).toBe( 'Some new content' );
		expect( result.blockVersion ).toBeUndefined();

		expect( result.sizing.paddingTop ).toBe( '5px' );
		expect( result.sizing.paddingBottom ).toBe( '10px' );
		expect( result.sizing.paddingLeft ).toBe( '10px' );
		expect( result.sizing.marginTop ).toBe( '20px' );
		expect( result.sizing.marginBottom ).toBe( '20px' );

		expect( result.borders.borderTopWidth ).toBe( '5px' );
		expect( result.borders.borderTopStyle ).toBe( 'solid' );
		expect( result.borders.borderTopColor ).toBe( 'var(--accent)' );

		expect( result.opacities.length ).toBe( 2 );
		expect( result.opacities[ 0 ]?.opacity ).toBe( 2 );
		expect( result.opacities[ 1 ]?.opacity ).toBe( 1 );

		expect( result.edgeCases.very.deepObj.something ).toBe( 'working' );
		expect( result.edgeCases.very.deepArr.length ).toBe( 2 );
		expect( result.edgeCases.very.deepArr[ 0 ]?.something ).toBe( 'here' );
		expect( result.edgeCases.very.deepArr[ 1 ]?.something ).toBe( 'also working' );
	} );
} );
