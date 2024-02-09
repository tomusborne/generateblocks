import { Button, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useLibrary } from './library-provider';
import { __, sprintf } from '@wordpress/i18n';
import { check, chevronDown } from '@wordpress/icons';

export default function CategoryList( { bulkInsertEnabled } ) {
	const { categories, activeCategory, setActiveCategory } = useLibrary();

	const getNameById = ( id ) => {
		const item = categories.find( ( element ) => element.id === id );
		return item ? item.name : null;
	};

	return (
		<div className="pattern-category-list" style={ { background: !! bulkInsertEnabled ? 'none' : '' } }>
			{ !! bulkInsertEnabled ? (
				<DropdownMenu
					className="pattern-category-dropdown"
					icon={ chevronDown }
					toggleProps={ {
						variant: 'secondary',
						children: sprintf(
							/* translators: %s: category name */
							__( 'Category: %s', 'generateblocks' ),
							getNameById( activeCategory ) || __( 'All', 'generateblocks' )
						),
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
									icon={ category.id === activeCategory ? check : null }
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
