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
                anchor.role = "menuitem";
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
