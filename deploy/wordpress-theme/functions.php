<?php
/**
 * Industry Plants Brutalist Theme Functions
 *
 * @package Industry_Plants_Brutalist
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function industry_plants_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'industry-plants-brutalist'),
        'footer'  => __('Footer Menu', 'industry-plants-brutalist'),
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Add support for full and wide align blocks
    add_theme_support('align-wide');

    // Add support for responsive embedded content
    add_theme_support('responsive-embeds');

    // Add support for block styles
    add_theme_support('wp-block-styles');

    // Add support for editor styles
    add_theme_support('editor-styles');
    add_editor_style('style.css');

    // Define custom color palette for Gutenberg
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Light Concrete', 'industry-plants-brutalist'),
            'slug'  => 'light-concrete',
            'color' => '#F5F5F0',
        ),
        array(
            'name'  => __('Medium Concrete', 'industry-plants-brutalist'),
            'slug'  => 'medium-concrete',
            'color' => '#D0D0C8',
        ),
        array(
            'name'  => __('Dark Concrete', 'industry-plants-brutalist'),
            'slug'  => 'dark-concrete',
            'color' => '#6B6B60',
        ),
        array(
            'name'  => __('Very Dark', 'industry-plants-brutalist'),
            'slug'  => 'very-dark',
            'color' => '#3A3A35',
        ),
        array(
            'name'  => __('Lime Green', 'industry-plants-brutalist'),
            'slug'  => 'lime-green',
            'color' => '#A8D854',
        ),
        array(
            'name'  => __('Medium Green', 'industry-plants-brutalist'),
            'slug'  => 'medium-green',
            'color' => '#7CB342',
        ),
        array(
            'name'  => __('Deep Green', 'industry-plants-brutalist'),
            'slug'  => 'deep-green',
            'color' => '#558B2F',
        ),
        array(
            'name'  => __('Background', 'industry-plants-brutalist'),
            'slug'  => 'background',
            'color' => '#F8F8F3',
        ),
        array(
            'name'  => __('Text', 'industry-plants-brutalist'),
            'slug'  => 'text',
            'color' => '#2C2C28',
        ),
    ));
}
add_action('after_setup_theme', 'industry_plants_setup');

/**
 * Enqueue Scripts and Styles
 */
function industry_plants_scripts() {
    // Google Fonts - Space Mono and Syne
    wp_enqueue_style(
        'industry-plants-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap',
        array(),
        null
    );

    // Theme stylesheet
    wp_enqueue_style(
        'industry-plants-style',
        get_stylesheet_uri(),
        array('industry-plants-fonts'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'industry_plants_scripts');

/**
 * Add Google Fonts to editor
 */
function industry_plants_editor_styles() {
    add_editor_style('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
}
add_action('admin_init', 'industry_plants_editor_styles');

/**
 * Custom excerpt length
 */
function industry_plants_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'industry_plants_excerpt_length');

/**
 * Custom excerpt more
 */
function industry_plants_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'industry_plants_excerpt_more');

/**
 * Register widget areas
 */
function industry_plants_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget Area', 'industry-plants-brutalist'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in footer.', 'industry-plants-brutalist'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'industry_plants_widgets_init');

/**
 * Custom body classes
 */
function industry_plants_body_classes($classes) {
    // Add class for front page
    if (is_front_page()) {
        $classes[] = 'front-page';
    }
    
    return $classes;
}
add_filter('body_class', 'industry_plants_body_classes');

/**
 * Disable Gutenberg widget block editor
 */
add_filter('use_widgets_block_editor', '__return_false');
