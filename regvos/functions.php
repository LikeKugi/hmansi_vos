<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if (!function_exists('chld_thm_cfg_locale_css')) :
    function chld_thm_cfg_locale_css($uri)
    {
        if (empty($uri) && is_rtl() && file_exists(get_template_directory() . '/rtl.css'))
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter('locale_stylesheet_uri', 'chld_thm_cfg_locale_css');

if (!function_exists('child_theme_configurator_css')) :
    function child_theme_configurator_css()
    {
        wp_enqueue_style('chld_thm_cfg_separate', trailingslashit(get_stylesheet_directory_uri()) . 'ctc-style.css', array('flickity', 'knd-blocks', 'knd-fancybox', 'knd'));
    }
endif;
add_action('wp_enqueue_scripts', 'child_theme_configurator_css', 10);

// END ENQUEUE PARENT ACTION

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


function ally_assets()
{
    wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri() . '/assets/js/ally.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'ally_assets');

/*
ally-theme-light 
ally-fz-normal 
ally-ls-normal 
ally-lh-normal 
ally-ff-sans 
ally-img-hide 
ally-speech-show 
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

    return $lang . 'class="' . implode(' ', $ally_classes) . '"';
}
add_filter('language_attributes', 'read_cookies');
