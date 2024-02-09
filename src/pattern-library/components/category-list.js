import { Button, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useLibrary } from './library-provider';
import { __ } from '@wordpress/i18n';

export default function CategoryList( { bulkInsertEnabled, selectedPatterns } ) {
	const { categories, activeCategory, setActiveCategory } = useLibrary();

	const getNameById = ( id ) => {
		const item = categories.find( ( element ) => element.id === id );
		return item ? item.name : null;
	};

	return (
		<div className="pattern-category-list">
			{ !! bulkInsertEnabled && selectedPatterns?.length ? (
				<DropdownMenu
					className="pattern-category-dropdown"
					icon={ null }
					label={ __( 'Filter by category', 'generateblocks' ) }
					toggleProps={ {
						children: getNameById( activeCategory ) || __( 'Filter by category', 'generateblocks' ),
						variant: 'secondary',
					} }
				>
					{ ( { onClose } ) => (
						<MenuGroup>
							<MenuItem
								isPressed={ '' === activeCategory }
								onClick={ () => {
									setActiveCategory( '' );
									onClose();
								} }
							>
								{ __( 'All', 'generateblocks' ) }
							</MenuItem>
							{ categories && categories.map( ( category ) => (
								<MenuItem
									key={ category.id }
									isPressed={ category.id === activeCategory }
									onClick={ () => {
										setActiveCategory( category.id );
										onClose();
									} }
								>
									{ category.name }
								</MenuItem>
							) ) }
						</MenuGroup>
					) }
				</DropdownMenu>
			) : (
				<>
					<Button
						id="pattern-category-all"
						isPressed={ '' === activeCategory }
						onClick={ () => setActiveCategory( '' ) }
					>
						{ __( 'All', 'generateblocks' ) }
					</Button>
					{ categories && categories.map( ( category ) => (
						<Button
							id={ `pattern-category-${ category.id }` }
							key={ category.id }
							isPressed={ category.id === activeCategory }
							onClick={ () => setActiveCategory( category.id ) }
						>
							{ category.name }
						</Button>
					) ) }
				</>
			) }
		</div>
	);
}
