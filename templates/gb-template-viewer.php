<?php
/**
 * The GB template viewer file.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<?php wp_head(); ?>
	</head>
	<body style="overflow-y: hidden;">
		<?php do_action( 'wp_footer' ); // phpcs:ignore -- Need to use core action. ?>
	</body>
</html>
