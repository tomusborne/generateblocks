=== GenerateBlocks ===
Contributors: edge22
Donate link: https://generateblocks.com
Tags: blocks, gutenberg, container, headline, grid, columns, page builder, wysiwyg, block editor
Requires at least: 5.2
Tested up to: 5.4
Requires PHP: 5.6
Stable tag: 1.1.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A small collection of lightweight WordPress blocks that can accomplish nearly anything.

== Description ==

https://vimeo.com/412896611

Add incredible versatility to your editor without bloating it with tons of one-dimensional Gutenberg blocks. With GenerateBlocks, you can learn a handful of blocks deeply and use them to build anything.

[GenerateBlocks](https://generateblocks.com?utm_source=wp-repo&utm_medium=link&utm_campaign=readme) works hand-in-hand with [GeneratePress](https://generatepress.com?utm_source=wp-repo&utm_medium=link&utm_campaign=generateblocks-readme), but is built to work with any theme.

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
