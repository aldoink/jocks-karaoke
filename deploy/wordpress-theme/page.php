<?php
/**
 * The template for displaying all pages
 *
 * @package Industry_Plants_Brutalist
 */

get_header();
?>

<main class="site-content">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            
            <article id="page-<?php the_ID(); ?>" <?php post_class('content-section'); ?>>
                <header class="section-header">
                    <h1 class="section-title"><?php the_title(); ?></h1>
                </header>
                
                <div class="page-content">
                    <?php the_content(); ?>
                </div>
            </article>
            
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
