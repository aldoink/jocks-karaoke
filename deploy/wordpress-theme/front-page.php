<?php
/**
 * The front page template file
 * 
 * This template simply renders the page content from WordPress,
 * allowing full editing via the Gutenberg block editor.
 *
 * @package Industry_Plants_Brutalist
 */

get_header();
?>

<main class="site-content">
    <div class="front-page-content">
        <?php 
        if (have_posts()) : 
            while (have_posts()) : the_post();
                the_content();
            endwhile;
        endif; 
        ?>
    </div>
</main>

<?php
get_footer();
