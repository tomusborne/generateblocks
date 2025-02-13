=== GenerateBlocks ===
Contributors: edge22
Donate link: https://generatepress.com
Tags: blocks, gutenberg, editor, page builder, posts
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 7.2
Stable tag: 2.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A small collection of lightweight WordPress blocks that can accomplish nearly anything.

== Description ==

Add incredible versatility to your editor without bloating it with tons of one-dimensional blocks. With GenerateBlocks, you can learn a handful of blocks deeply and use them to build anything.

[GenerateBlocks](https://generatepress.com/blocks?utm_source=wp-repo&utm_medium=link&utm_campaign=readme) works hand-in-hand with [GeneratePress](https://generatepress.com/theme?utm_source=wp-repo&utm_medium=link&utm_campaign=generateblocks-readme), but is built to work with any theme.

Looking for more features? Check out [GenerateBlocks Pro](https://generatepress.com/blocks?utm_source=wp-repo&utm_medium=link&utm_campaign=readme).

= Container =

Organize your content into rows and sections. The Container block is the foundation of your content, allowing you to design unique sections for your content.

= Grid =

Create advanced layouts with flexible grids. The Grid block gives you the ability to create any kind of layout you can imagine.

= Text =

Craft text-rich content with advanced typography. Everything from headings to paragraphs - take full control of your text.

= Button =

Drive conversions with beautiful buttons.

= Query =

Build a list of posts from any post type using advanced query parameters. Query post meta and option fields in GenerateBlocks Pro.

= Image =

Add images to your content to make a visual statement.

= Shape =

Add custom SVG shapes to your pages with ease.

= Dynamic Tags =

Use our powerful dynamic tags to display dynamic content inside your blocks.

* Post title
* Post excerpt
* Post permalink
* Post date
* Featured image
* Post meta
* Author meta
* Comment count
* Comments URL
* Author archives URL
* Author avatar URL
* Term list
* Previous posts URL
* Next posts URL
* Media

In GenerateBlocks Pro, you get additional dynamic tags:

* Archive title
* Archive description
* Site option
* Term meta
* User meta
* Current year
* Site title
* Site tagline
* Loop index number
* Loop item

= Performance =

We take performance seriously. Minimal CSS is generated only for the blocks you need, and our HTML structure is as simple as possible while allowing for maximum flexibility.

= Coding standards =

Built to the highest coding standards for security, stability and future compatibility.

= Fully responsive =

Style your blocks for different screen sizes.

* Desktop: @media (min-width:1025px)
* Desktop & Tablet: @media (min-width:768px)
* Tablet: @media (max-width:1024px) and (min-width:768px)
* Tablet & Mobile: @media (max-width:1024px)
* Mobile: @media (max-width:767px)

In GenerateBlocks Pro, you can create as many custom media queries as you need.

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

= 2.0.1 =
* Fix: WordPress.org zip package issue

= 2.0.0 =
* Security: Prevent logged-in contributors from querying private post content
* New: All blocks re-written from scratch for better performance and control
* New: Version 1 blocks still exist where used and function normally
* New: Version 1 blocks can be enabled by default with simple filter
* New: Element block - replaces the Container and Grid blocks
* New: Element blocks comes with Container and Grid variations in the block inserter
* New: Text block - replaces the Headline and Button blocks
* New: Text blocks comes with Headline, Text, and Button variations in the block inserter
* New: Query block - replaces the Query Loop block
* New: Looper block - replaces the Grid block inside of the Query block
* New: Loop Item block - replaces the Post Template (Container) in the Query block
* New: No Results block - add content that displays if no Query results are found
* New: Page Numbers block - add page numbers for pagination in your Query block
* New: Shape block - add any SVG shape to your pages
* New: Media block - replaces the Image block
* New: Local blocks now have the full styles builder found in GB Pro Global Styles
* New: Local blocks can now be designed at any breakpoint or nested rule
* New: Filter block design options in the editor based on whether they have a value
* New: Filter block design options in the editor based on whether they're inheriting a value
* New: Dynamic tags system. Insert dynamic data anywhere in your blocks
* New: Multiple dynamic tags can be inserted into a single block
* New: --gb-container-width CSS variable for getting the global max-width
* Performance: Local blocks now generate their CSS and HTML as you build in the editor
* Performance: Blocks are output as static HTML/CSS on the frontend for better performance

= 1.9.1 =
* Fix: Patterns not loading properly in Chrome
* Fix: Pattern search mixing up active libraries
* Fix: Broken pattern preview in bulk select mode
* Fix: Headline editor margin when set to div
* Tweak: Improve pattern preview loading performance

= 1.9.0 =
* Security: Disallow scripts in custom field values
* Feature: New Pattern Library
* Feature: Add support for new Global Styles in Pro
* Feature: Added opt-in defaults cache filter: `generateblocks_use_block_defaults_cache`
* Feature: Added new `generateblocks_do_inline_styles` filter to force inline styles if needed
* Feature: Add styles indicators to local block controls if Global Styles exist
* Feature: Keep `p` tag when converting core paragraph block to Headline block
* Feature: Use arrow keys to increase or decrease values in unit control
* Fix: Button URL dropdown closing on input
* Fix: Undefined $fontFamily in old Headline version
* Fix: Missing block width alignment in block themes
* Tweak: Remove "one-time" block CSS and include it for specific blocks when needed
* Tweak: Added new `(min-width: 768px)` media query to filterable queries
* Tweak: Replace Twitter icon with X icon
* Tweak: Use core Block Name for block labelling

= 1.8.3 =
* Security: Add user capability check to Query Loop post status

= 1.8.2 =
* Fix: Border colors not showing when old attributes are set.
* Tweak: Add support for the newly created core function "wp_img_tag_add_loading_optimization_attrs"

= 1.8.1 =
* Fix: Icon padding controls order
* Fix: Global styles overwriting local attributes
* Fix: Editor controls spacing using RTL languages

= 1.8.0 =
* Feature: Add flexbox alignment matrix component to Container toolbar
* Feature: Add new Borders panel with width/style/color options for all four sides
* Feature: Add new dimensions components in Spacing panel
* Feature: Mix and match padding/margin units across sides and devices
* Feature: Add more available units to all options that accept them
* Feature: Allow text values (calc(), var(), etc...) in options that accept them
* Feature: New "Add to Container" icon added to the toolbar of all blocks
* Feature: Allow removal of Container block around innerBlocks
* Feature: Display text field to allow user to replace image URL
* Feature: Headline block show text in List View
* Feature: Button block show text in List View
* Feature: Image block show alt/title in List View
* Feature: Add Block Label option to label Container, Query Loop, and Grid blocks in List View
* Feature: Only show one dimension field if synced
* Feature: Add option to disable Google fonts
* Feature: Allow all unit types in UnitControl
* Feature: Add help icon to unit list
* Fix: Attributes merging incorrect values when multiple blocks are selected
* Fix: Color and Background panels are visible/accessible on responsive views
* Fix: Template lock system not applying to inner blocks
* Fix: Button with dynamic content not displaying the aria-label
* Fix: unique id not regenareted correctly on widgets editor
* Fix: React createRoot warning
* Fix: Double-click when selecting Grid template
* Fix: Query loop parameter delete button size
* Fix: Advanced select jumping when near the bottom of the page
* Fix: Triple captions using static image with dynamic link
* Fix: Flex icons based on direction in device previews
* Fix: Container appender icon spacing
* Fix: useDeviceType state was one state behind when triggered from core buttons
* Fix: Use unit in UnitControl if value starts with decimal
* Fix: Remove trailing spaces from UnitControl numeric value
* Tweak: Require at least PHP 7.2
* Tweak: Move block alignment to Layout panel
* Tweak: Remove help text from Grid vertical alignment
* Tweak: Remove the Button Container variation
* Tweak: Clean up UnitControl display across all browsers
* Tweak: Show all Google fonts in font family dropdown
* Tweak: Remove top/bottom margin from Query Loop in the editor
* Tweak: Force lowercase units in UnitControl
* Tweak: Improve UnitControl unit visibility
* Tweak: Show units in 2 rows
* Tweak: Use same unit list for all UnitControl controls
* Dev: Rebuild how block migrations run
* Dev: Migrate spacing attributes to new spacing object attribute
* Dev: Migrate typography attributes to new typography object attribute
* Dev: Migrate icon padding and size attributes to new iconStyles object attribute

Full changelog can be found [here](https://generateblocks.com/category/changelog/).
