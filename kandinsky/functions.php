<?php

/**
 * Kandinsky functions and definitions
 */

if (!defined('WPINC')) {
	die();
}

define('KND_DOC_URL', 'https://kndwp.org/docs/');
define('KND_OFFICIAL_WEBSITE_URL', 'https://kndwp.org/');
define('KND_OFFICIAL_SUPPORT_URL', 'https://kndwp.org/bug/');
define('KND_CHANGELOG_URL', 'https://kndwp.org/changelog/');
define('KND_SOURCES_PAGE_URL', 'https://github.com/Teplitsa/kandinsky/');
define('KND_SOURCES_ISSUES_PAGE_URL', 'https://github.com/Teplitsa/kandinsky/issues/');
define('TST_OFFICIAL_WEBSITE_URL', 'https://te-st.org/');
define('TST_PASEKA_OFFICIAL_WEBSITE_URL', 'https://paseka.te-st.org/');
define('KND_SUPPORT_EMAIL', 'support@te-st.org');
define('KND_SUPPORT_URL', 'https://pd.te-st.org/forms/contacts/');
define('KND_SUPPORT_TELEGRAM', 'https://t.me/joinchat/AAAAAENN3prSrvAs7KwWrg');
define('KND_SETUP_WIZARD_URL', admin_url('themes.php?page=knd-setup-wizard'));
define('KND_DISTR_ARCHIVE_URL', 'https://kndwp.org/kandinsky.zip');
define('KND_UPDATE_INFO_URL', 'https://kndwp.org/kandinsky.json');

if (!isset($content_width)) {
	$content_width = 800; /* pixels */
}

/**
 * Load text domain
 */
function knd_load_theme_textdomain()
{
	load_theme_textdomain('knd', get_template_directory() . '/lang');
	do_action('knd_load_textdomain');
}

/**
 * Get Theme Version
 */
function knd_theme_version()
{
	$theme = wp_get_theme();
	$parent = $theme->parent();

	if ($parent) {
		$version = $parent->get('Version');
		return $version;
	}

	$version = $theme->get('Version');

	return $version;
}

/**
 * Theme Setup
 */
function knd_setup()
{

	// Inits.
	knd_load_theme_textdomain();

	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support('title-tag');

	/**
	 * Register Nav Menus locations.
	 */
	register_nav_menus(
		array(
			'primary' => esc_html__('Primary menu', 'knd'),
		)
	);

	/**
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
			'navigation-widgets',
		)
	);

	// Add support custom logo.
	add_theme_support('custom-logo');

	// Add support for responsive embeds.
	add_theme_support('responsive-embeds');

	// Add support for full and wide align images.
	add_theme_support('align-wide');

	//add_theme_support( 'wp-block-styles' );

	// Editor style.
	add_editor_style(array('assets/css/editor.css'));
}
add_action('after_setup_theme', 'knd_setup', 9); // Theme wizard initialize at 10, this init should occur befure it.

/* Fix translate customizer */
if (is_customize_preview()) {
	knd_load_theme_textdomain();
}

/**
 * Add page support excrpt
 */
function knd_add_page_support_excerpt()
{
	add_post_type_support('page', 'excerpt');
}
add_action('init', 'knd_add_page_support_excerpt');

/**
 * Includes
 */

// WP libs to operate with files and media.
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

get_template_part('/core/extras'); // default WP behavior customization.

// enqueue CSS and JS and compose inline CSS to set vars from settings.

/**
 * Theme Init.
 */
require get_template_directory() . '/inc/init.php';

/**
 * Assets.
 */
require get_template_directory() . '/core/assets.php';

/**
 * Template functions
 */
require_once get_theme_file_path('/core/template-functions.php');

/**
 * Independent pages parts layout
 */
require_once get_theme_file_path('/core/template-tags.php');

/**
 * Nav Menu
 */
require_once get_theme_file_path('/core/nav-menu.php');

/**
 * Customizer
 */
require_once get_theme_file_path('/core/customizer/customizer.php');

/**
 * Typography and Colors
 */
require_once get_theme_file_path('/core/typography.php');

/**
 * Post type person
 */
require_once get_template_directory() . '/core/person.php';

/**
 * Plugins
 */
require_once get_theme_file_path('/core/plugins.php');

get_template_part('/core/media'); // customize media behavior and add images sizes.

get_template_part('/core/cards'); // layout of cards, list items etc.

get_template_part('/core/shortcodes'); // shortcodes core.

// import data utils.
get_template_part('/core/class-mediamnt'); // tools for work with files.

get_template_part('/core/class-import'); // import files into site media lib.
get_template_part('/core/import'); // import files into site media lib.

/**
 * Customizer
 */
require_once get_theme_file_path('/inc/backward-compatibility.php');

// Include modules.
foreach (glob(get_template_directory() . '/modules/*') as $module_file) {
	if (is_dir($module_file)) {
		$php_filename = basename($module_file) . '.php';
		$php_file     = $module_file . '/' . $php_filename;
	} else {
		$php_file = $module_file;
	}

	if (is_file($php_file) && preg_match('/.*\.php$/', $php_file)) {
		require $php_file;
	}
}

if (is_admin() || current_user_can('manage_options')) {
	/**
	 * Theme Update checker
	 */
	require get_template_directory() . '/core/theme-update/theme-update-checker.php';
	get_template_part('/core/admin');
	get_template_part('/vendor/class-tgm-plugin-activation');
}

if ((is_admin() && !empty($_GET['page']) && $_GET['page'] == 'knd-setup-wizard') || wp_doing_ajax()) {
	get_template_part('/vendor/envato_setup/envato_setup'); // Run the wizard after all modules included.
}

// Service lines (to localize):.
esc_html__('Kandinsky', 'knd');
esc_html__('Teplitsa', 'knd');
esc_html__('The beautiful design and useful features for nonprofit website', 'knd');

/**
 * Comments
 */

function knd_comment_form_default_fields($fields)
{
	if (isset($fields['url'])) {
		unset($fields['url']);
	}
	return $fields;
}
add_filter('comment_form_default_fields', 'knd_comment_form_default_fields');

/**
 * Editor
 */
require_once get_template_directory() . '/core/editor/editor.php';

function ally()
{
?>
	<script>
		document.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll('.ally a').forEach(anchor => {
				anchor.type = "button";
				anchor['ariaLabel'] = 'Открыть меню настроек доступности'
				anchor['aria-expanded'] = "false";
				anchor['aria-controls'] = "ally-settings";
				anchor['aria-haspopup'] = "menu";
			});
		})
	</script>
<?php
}
add_action('wp_head', 'ally');


/**
 * Enquee ally script
 */

function ally_assets()
{
	wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri() . '/assets/js/ally.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'ally_assets');


/**
 * Add ally classes to HTML
 */

function read_cookies($lang)
{
	$ally_classes = array();
	$theme = isset($_COOKIE['ally-theme']) ? $_COOKIE['ally-theme'] : '';
	if ($theme) {
		$ally_classes['theme'] = 'ally-theme-' . $theme;
	}
	$font_size = isset($_COOKIE['ally-fz']) ? $_COOKIE['ally-fz'] : '';
	if ($font_size) {
		$ally_classes['font_size'] = 'ally-fz-' . $font_size;
	}
	$letter_spacing = isset($_COOKIE['ally-ls']) ? $_COOKIE['ally-ls'] : '';
	if ($letter_spacing) {
		$ally_classes['letter_spacing'] = 'ally-ls-' . $letter_spacing;
	}
	$line_height = isset($_COOKIE['ally-lh']) ? $_COOKIE['ally-lh'] : '';
	if ($line_height) {
		$ally_classes['line_height'] = 'ally-lh-' . $line_height;
	}
	$font_family = isset($_COOKIE['ally-ff']) ? $_COOKIE['ally-ff'] : '';
	if ($font_family) {
		$ally_classes['font_family'] = 'ally-ff-' . $font_family;
	}
	$image = isset($_COOKIE['ally-img']) ? $_COOKIE['ally-img'] : '';
	if ($image) {
		$ally_classes['image'] = 'ally-img-' . $image;
	}
	$speech = isset($_COOKIE['ally-speech']) ? $_COOKIE['ally-speech'] : '';
	if ($speech) {
		$ally_classes['speech'] = 'ally-speech-' . $speech;
	}

	return $lang . ' class="' . implode(' ', $ally_classes) . '"';
}
add_filter('language_attributes', 'read_cookies');
