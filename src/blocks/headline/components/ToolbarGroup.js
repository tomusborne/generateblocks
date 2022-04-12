import HeadingLevelIcon from '../element-icons';
import { __, sprintf } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';

export default ( { setAttributes, element, isCaption } ) => {
	if ( isCaption ) {
		return null;
	}

	return (
		<ToolbarGroup
			isCollapsed={ true }
			icon={ <HeadingLevelIcon level={ element } /> }
			label={ __( 'Change Headline Element', 'generateblocks' ) }
			controls={ [
				{
					isActive: 'h1' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h1' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'1'
					),
					onClick: () => {
						setAttributes( { element: 'h1' } );
					},
				},
				{
					isActive: 'h2' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h2' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'2'
					),
					onClick: () => {
						setAttributes( { element: 'h2' } );
					},
				},
				{
					isActive: 'h3' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h3' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'3'
					),
					onClick: () => {
						setAttributes( { element: 'h3' } );
					},
				},
				{
					isActive: 'h4' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h4' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'4'
					),
					onClick: () => {
						setAttributes( { element: 'h4' } );
					},
				},
				{
					isActive: 'h5' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h5' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'5'
					),
					onClick: () => {
						setAttributes( { element: 'h5' } );
					},
				},
				{
					isActive: 'h6' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'h6' }
						/>
					),
					title: sprintf(
						// translators: %s: heading level e.g: "1", "2", "3"
						__( 'Heading %s', 'generateblocks' ),
						'6'
					),
					onClick: () => {
						setAttributes( { element: 'h6' } );
					},
				},
				{
					isActive: 'p' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'p' }
						/>
					),
					title: __( 'Paragraph', 'generateblocks' ),
					onClick: () => {
						setAttributes( { element: 'p' } );
					},
				},
				{
					isActive: 'div' === element,
					icon: (
						<HeadingLevelIcon
							level={ 'div' }
						/>
					),
					title: __( 'Div', 'generateblocks' ),
					onClick: () => {
						setAttributes( { element: 'div' } );
					},
				},
			] }
		/>
	);
};
