<?php
/**
 * The front page template file
 *
 * @package Industry_Plants_Brutalist
 */

get_header();
?>

<main class="site-content">
    
    <?php get_template_part('template-parts/hero'); ?>
    
    <?php get_template_part('template-parts/ticker'); ?>
    
    <?php get_template_part('template-parts/feature-grid'); ?>
    
    <?php 
    // Display page content if exists
    if (have_posts()) : 
        while (have_posts()) : the_post();
            $content = get_the_content();
            if (!empty($content)) :
    ?>
        <div class="container">
            <div class="content-section">
                <?php the_content(); ?>
            </div>
        </div>
    <?php 
            endif;
        endwhile;
    endif; 
    ?>
    
</main>

<?php
get_footer();
