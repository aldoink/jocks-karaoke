<?php
/**
 * The main template file
 *
 * @package Industry_Plants_Brutalist
 */

get_header();
?>

<main class="site-content">
    <div class="container">
        <?php if (have_posts()) : ?>
            
            <div class="content-section">
                <header class="section-header">
                    <h1 class="section-title">Latest Posts</h1>
                    <p class="section-subtitle">/// Updates from the scene</p>
                </header>
                
                <div class="posts-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="post-thumbnail">
                                    <?php the_post_thumbnail('medium_large'); ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="post-content">
                                <h2 class="post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                
                                <div class="post-meta">
                                    <time datetime="<?php echo get_the_date('c'); ?>">
                                        <?php echo get_the_date(); ?>
                                    </time>
                                </div>
                                
                                <div class="post-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                                
                                <a href="<?php the_permalink(); ?>" class="brutal-button">
                                    Read More
                                </a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>
                
                <?php the_posts_pagination(array(
                    'prev_text' => '&laquo; Previous',
                    'next_text' => 'Next &raquo;',
                )); ?>
            </div>
            
        <?php else : ?>
            
            <div class="content-section">
                <header class="section-header">
                    <h1 class="section-title">Nothing Found</h1>
                </header>
                <p>No content has been posted yet.</p>
            </div>
            
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
