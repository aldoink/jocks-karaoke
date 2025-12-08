    <footer class="site-footer">
        <div class="container">
            <div class="footer-inner">
                <div class="footer-logo">
                    Industry<span>Plants</span>
                </div>
                
                <?php if (has_nav_menu('footer')) : ?>
                    <nav class="footer-nav">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'footer',
                            'menu_class'     => '',
                            'container'      => false,
                            'depth'          => 1,
                        ));
                        ?>
                    </nav>
                <?php endif; ?>
                
                <div class="footer-credits">
                    <p>&copy; <?php echo date('Y'); ?> Industry Plants. Plant-based food for the Glasgow music scene.</p>
                </div>
            </div>
        </div>
    </footer>
</div><!-- .site-wrapper -->

<?php wp_footer(); ?>
</body>
</html>
