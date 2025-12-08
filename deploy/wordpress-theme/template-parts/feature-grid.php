<?php
/**
 * Feature Grid Template Part
 *
 * @package Industry_Plants_Brutalist
 */

$features = array(
    array(
        'title'       => 'ROOTS',
        'description' => 'Plant-based food that fuels the underground music scene.',
        'number'      => '01',
    ),
    array(
        'title'       => 'SOUND',
        'description' => 'Interviews with Glasgow\'s loudest and most creative voices.',
        'number'      => '02',
    ),
    array(
        'title'       => 'SCENE',
        'description' => 'Building community one gig at a time.',
        'number'      => '03',
    ),
);
?>

<section class="feature-grid" id="about">
    <div class="container">
        <div class="grid-brutal grid-brutal-3">
            <?php foreach ($features as $feature) : ?>
                <div class="feature-block">
                    <span class="feature-number"><?php echo esc_html($feature['number']); ?></span>
                    <h3 class="feature-title"><?php echo esc_html($feature['title']); ?></h3>
                    <p class="feature-description"><?php echo esc_html($feature['description']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
