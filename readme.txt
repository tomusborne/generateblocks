=== GenerateBlocks ===
Contributors: edge22
Donate link: https://generateblocks.com
Tags: blocks, gutenberg, container, headline, grid, columns, page builder, wysiwyg, block editor
Requires at least: 5.4
Tested up to: 6.0
Requires PHP: 5.6
Stable tag: 1.4.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A small collection of lightweight WordPress blocks that can accomplish nearly anything.

== Description ==

https://vimeo.com/412896611

Add incredible versatility to your editor without bloating it with tons of one-dimensional Gutenberg blocks. With GenerateBlocks, you can learn a handful of blocks deeply and use them to build anything.

[GenerateBlocks](https://generateblocks.com?utm_source=wp-repo&utm_medium=link&utm_campaign=readme) works hand-in-hand with [GeneratePress](https://generatepress.com?utm_source=wp-repo&utm_medium=link&utm_campaign=generateblocks-readme), but is built to work with any theme.

Looking for more features? Check out [GenerateBlocks Pro](https://generateblocks.com/pro?utm_source=wp-repo&utm_medium=link&utm_campaign=readme).

= Container =

Organize your content into rows and sections. The Container block is the foundation of your content, allowing you to design unique sections for your content.

= Grid =

Create advanced layouts with flexible grids. The Grid block gives you the ability to create any kind of layout you can imagine.

= Headline =

Craft text-rich content with advanced typography. Everything from headings to paragraphs - take full control of your text.

= Buttons =

Drive conversions with beautiful buttons.

= Performance =

We take performance seriously. Minimal CSS is generated only for the blocks you need, and our HTML structure is as simple as possible while allowing for maximum flexibility.

= Coding standards =

Built to the highest coding standards for security, stability and future compatibility.

= Fully responsive =

Every block comes with tablet and mobile controls, giving you total control of your responsive design.

= Documentation =

Check out our [documentation](https://docs.generateblocks.com) for more information on the individual blocks and how to use them.

== Installation ==

There's two ways to install GenerateBlocks.

1. Go to "Plugins > Add New" in your Dashboard and search for: GenerateBlocks
2. Download the .zip from WordPress.org, and upload the folder to the `/wp-content/plugins/` directory via FTP.

In most cases, #1 will work fine and is way easier.

== Frequently Asked Questions ==

= How do I add your blocks to my page? =

* Create a new page or post
* Add a new block, and look for the "GenerateBlocks" category
* Choose your block and start building.
* It's always best to start with a Container block.

= What theme should I use? =

GenerateBlocks was built to work hand-in-hand with [GeneratePress](https://generatepress.com). However, it will work with any theme you choose.

== Changelog ==

= 1.4.4 =
* Fix: Grid layout selector in WP 6.0

= 1.4.3 =
* Fix: Error when opening Headline color pickers in WP 6.0
* Fix: Button URL field not selectable in WP 6.0

= 1.4.2 =
* Fix: Missing responsive editor styles in Firefox

= 1.4.1 =
* Fix: Color picker UI in WP 5.9
* Fix: PHP notice when first saving Dashboard settings
* Tweak: Make Container appender relative positioned in WP 5.9

= 1.4.0 =
* New: Add flex (flex-grow, flex-shrink, flex-basis) options to grid item containers
* New: Add "auto" width option to grid item containers on tablet and mobile
* New: Allow CSS variables in color picker component
* New: Use built-in color transparency in color picker component
* Tweak: Improve design of empty Container blocks
* Tweak: Remove Container padding defaults
* Tweak: Remove grid gap default
* Tweak: Remove gradient defaults
* Tweak: Remove grid item width defaults
* Tweak: Make Button Container stack & fill options device-specific
* Tweak: Stop auto-adding z-index to Container when using pseudo gradients
* Tweak: Only output shorthand CSS values if all fields are set
* Tweak: Add missing tablet "order" property from editor CSS
* Tweak: Improve unique ID generation
* Tweak: Remove GeneratePress full width option from Container block
* Tweak: Replace advanced typography attribute with local storage
* Tweak: Allow for empty Container padding values
* Tweak: Check for FS_CHMOD_FILE constant in external css file
* Tweak: Force inline CSS on single posts
* Tweak: Remove "Select Grid" button from grid item Containers
* Tweak: Allow for no value in grid item width field
* Tweak: Allow zero values for minHeight on devices
* Tweak: Add new block on Enter key in Headline block
* Tweak: Remove relative protocol from Google Fonts requests
* Fix: Responsive border-radius when using pseudo backgrounds
* Fix: Buttons alignment in the editor
* Fix: Container tag name accepting any value
* Fix: Missing align wide/full options when using block themes

= 1.3.5 =
* Fix: Error saving classic widgets in Customizer
* Fix: Console error in widget editor due to core/edit-post
* Tweak: Remove wp-editor dependency from widget editor

= 1.3.4 =
* New: Integrate with the new widget block editor
* Fix: Memory leak when reusable blocks try to render inside themselves
* Tweak: Use new block_categories_all filter in WP 5.8

= 1.3.3 =
* Fix: Constant re-rendering of SVG icons in code editor
* Fix: Broken CSS when empty/non-published re-usable blocks are on the page
* Tweak: Add missing text domains

= 1.3.2 =
* New: Add generateblocks.editor.buttonDisableFormatting filter
* Fix: Error when using em unit on a div headline
* Fix: Icon button spacing in WP 5.7
* Fix: Responsive block borders when no desktop border is set
* Tweak: Prevent Global Styles (Pro) from regenerating unique ID
* Tweak: Integrate Grid block with Global Styles (Pro)
* Tweak: Always inline CSS on AMP pages to avoid needing to fetch
* Tweak: Adjust editor grid class name to prevent Sass build error

= 1.3.1 =
* Tweak: Apply generateblocks.editor.cssAttrs filter to backgrounds

= 1.3.0 =
* New: Add generateblocks.editor.cssAttrs filter
* New: Add generateblocks_headline_selector_tagname filter
* New: Add generateblocks.editor.panelContents filter
* New: Add Add generateblocks.frontend.containerTagName filter
* New: Add generateblocks.editor.headlineDisableFormatting filter
* New: Add generateblocks.editor.beforeHeadlineElement filter
* New: Add generateblocks.editor.urlInputMoreOptions filter
* New: Admin header
* Fix: Fix gradient when no stop value is found
* Fix: Translations in the editor
* Fix: Force inner container z-index when pseudo in use
* Fix: Headline text input when has icon but no text
* Tweak: Merge bg image and gradient controls into one tab
* Tweak: Prepare for Global Styles in Pro
* Tweak: Remove duplicate .gb-container class from CSS
* Tweak: Add script translations file for settings JS
* Tweak: Hide color picker label element if no label
* Tweak: Update domPurify
* Tweak: Import WP packages instead of defining them
* Tweak: Add border-radius to pseudo background image elements
* Tweak: Change Element Tag label to Tag Name
* Tweak: Add placeholder to Headline block
* Tweak: Remove add grid item button from toolbar when selecting layout

= 1.2.0 =
* Markup change: Remove headline-wrapper element from Headlines with icons
* Markup change: Change button-text class to gb-button-text in Button block
* Markup change: Only output inner gb-button-text span if using an icon
* Markup change: Output Button block as span element if no URL exists
* Markup change: Add gb-headline-text span if using an icon in Headline block
* New: Shape dividers in the Container block
* New: Make all blocks fully responsive when using editor responsive previews
* New: Add option to apply gradient as a pseudo element
* New: Add option to choose background image size
* New: Add border radius options to Headline block
* New: frontend.insideContainer filter in editor for Container block
* New: frontend.beforeContainerClose filter in editor for Container block
* New: generateblocks_after_container_open filter in frontend for Container block
* New: generateblocks_inside_container filter in frontend for Container block
* New: generateblocks_before_container_close filter in frontend for Container block
* New: generateblocks_container_tagname filter in frontend for Container block
* New: Add div as Headline block element choice
* New: Add span as Headline block element choice
* New: Add inner z-index option to Container
* New: Aside option as Container tag name
* New: generateblocks_dynamic_css_priority filter
* New: Add support for desktop/tablet-only CSS
* Fix: Stacked button alignment in the editor
* Fix: Broken background image upload when using official AMP plugin
* Fix: Button mobile border-radius
* Fix: Check if grid data is an array before looping
* Fix: Container tablet/mobile font size values
* Fix: Button text not selectable in editor using Firefox
* Tweak: Bump required WP version to 5.4
* Tweak: Make Container block wrapper HTML dynamic
* Tweak: Make Grid block wrapper HTML dynamic
* Tweak: Make Button Container block wrapper HTML dynamic
* Tweak: Move custom classes to core CSS classes field
* Tweak: Move custom ID to core anchor field
* Tweak: Remove deprecated isLarge prop in editor
* Tweak: Better stacked button alignment on frontend
* Tweak: Remove old browser prefixes
* Tweak: Update DOMPurify
* Tweak: Don't strip protocol from dynamic stylesheet URI
* Tweak: Move controls from our Advanced panel into core Advanced panel
* Tweak: Move text alignment options in all blocks to the Block Toolbar
* Tweak: Remove block margin in the editor
* Tweak: Reverse grid gap when using RTL
* Tweak: Add default inherit option to tablet/mobile Headline icon alignment
* Tweak: Change frontend.insideContainer filter to frontend.afterContainerOpen
* Tweak: Update color picker component UI
* Tweak: Make icon sets filterable
* Tweak: Move Container element tag option to Layout panel
* Tweak: Move Container z-index options to Spacing panel
* Tweak: Disable fixed background images on mobile
* Tweak: Rebuild Headline Element toolbar component
* Tweak: Add tag name to Headline CSS selector to improve CSS conflicts
* Tweak: Changed order of generateblocks_block_css_data params
* Tweak: Use device-specific media queries for remove vertical gap option
* Tweak: Change generateblocks.editor.desktopCSS filter to generateblocks.editor.mainCSS
* Tweak: Rebuild settings area using React
* Tweak: Remove placeholder text from Headline block
* Tweak: Move GenerateBlocks admin menu item to top level
* Tweak: Regenerate static CSS files after plugin update
* Tweak: Adjust unit picker default styling
* Tweak: Rebuild background image upload UI

= 1.1.2 =
* Fix: Set background image selector default if undefined
* Fix: Set background image opacity default if undefined
* Tweak: Remove parsed content caching

= 1.1.1 =
* Fix: Undefined index notice when using background images

= 1.1.0 =
* New: Persistent responsive controls across blocks
* New: Filter all HTML attributes
* New: Filter Container tagNames
* New: Add containerAfterElementTag filter
* New: Add option to apply background image as pseudo element
* New: Add support for alignwide/alignfull in Container block
* New: Display color palette by default in Color component
* New: Add option to choose default view in Color component
* New: Add aria-label option for Buttons into advanced panel
* Tweak: Deprecate background image overlay option
* Tweak: Move hexToRGBA to utils
* Tweak: Fix repeated common CSS
* Tweak: Re-design normal/hover state buttons
* Tweak: Filter default background image size
* Tweak: Cache parsed blocks on front-end
* Tweak: Better display of admin notices in Dashboard
* Tweak: Change Container Width label to Contained Width
* Tweak: Add future framework for migrating/updating old options
* Tweak: Don't allow single button to be saved as reusable
* Tweak: Don't allow element tagName to be filtered
* Tweak: Allow all standard richText formats in Headline block
* Tweak: Better iconSize responsive placeholders
* Tweak: Allow decimal values in gradient start/stop
* Tweak: Move block name to the end of editor.desktopCSS filter args
* Tweak: Add buttonColorsHover to editor.controls filter
* Tweak: Change editor.insideContainerWrapper filter to frontend.insideContainer
* Tweak: Pass attributes to frontend.insideContainer instead of props
* Fix: gridId value in nested grids
* Fix: Use inline-block for inline headlines with no icon
* Fix: Missing text domains
* Fix: Display Headline highlight option in Headline block only
* Fix: Headline icon center alignment in IE
* Fix: Headline highlight background color in IE
* Fix: Mobile selector for width in min-height container
* Fix: Add box-sizing to min-height container on tablet/mobile
* Fix: Headline text alignment when using an icon
* Fix: Allow 0 as iconSize value

= 1.0.2 =
* Tweak: Minify/compress all dist files

= 1.0.1 =
* Fix: Add wp_set_script_translations() to translate block editor
* Tweak: Add spacing to update nag in Settings area

= 1.0 =
* Initial release
