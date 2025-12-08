#!/bin/bash
#
# WP-CLI Setup Script for Industry Plants Brutalist Theme
# This script runs INSIDE the WordPress container
#
# Usage: docker exec deploy-wordpress-1 bash /var/www/html/wp-content/themes/industry-plants-brutalist/setup.sh
#

set -e

echo "=== Industry Plants WordPress Setup ==="
echo ""

# Wait for WordPress to be ready
echo "Waiting for WordPress to be ready..."
sleep 5

# Check if wp-cli is available, if not install it
if ! command -v wp &> /dev/null; then
    echo "Installing WP-CLI..."
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    mv wp-cli.phar /usr/local/bin/wp
fi

cd /var/www/html

# Check if WordPress is installed
if ! wp core is-installed --allow-root 2>/dev/null; then
    echo "WordPress core not installed. Running installation..."
    
    # Install WordPress
    wp core install \
        --url="https://industryplants.co.uk" \
        --title="Industry Plants" \
        --admin_user="admin" \
        --admin_password="CHANGE_THIS_PASSWORD" \
        --admin_email="admin@industryplants.co.uk" \
        --skip-email \
        --allow-root
    
    echo "WordPress installed successfully!"
else
    echo "WordPress already installed."
fi

# Activate the theme
echo "Activating Industry Plants Brutalist theme..."
wp theme activate industry-plants-brutalist --allow-root || echo "Theme may already be active"

# Update site title
echo "Setting site title..."
wp option update blogname "Industry Plants" --allow-root
wp option update blogdescription "Plant-based food for the Glasgow music scene" --allow-root

# Set permalink structure
echo "Setting permalink structure..."
wp rewrite structure '/%postname%/' --allow-root
wp rewrite flush --allow-root

# Create Home page if it doesn't exist
echo "Creating Home page..."
HOME_PAGE_ID=$(wp post list --post_type=page --name=home --field=ID --allow-root 2>/dev/null || echo "")

if [ -z "$HOME_PAGE_ID" ]; then
    HOME_PAGE_ID=$(wp post create \
        --post_type=page \
        --post_title="Home" \
        --post_status=publish \
        --post_content="" \
        --porcelain \
        --allow-root)
    echo "Created Home page with ID: $HOME_PAGE_ID"
else
    echo "Home page already exists with ID: $HOME_PAGE_ID"
fi

# Set Home page as front page
echo "Setting Home page as static front page..."
wp option update show_on_front page --allow-root
wp option update page_on_front "$HOME_PAGE_ID" --allow-root

# Create additional pages
echo "Creating additional pages..."

# Events page
EVENTS_PAGE_ID=$(wp post list --post_type=page --name=events --field=ID --allow-root 2>/dev/null || echo "")
if [ -z "$EVENTS_PAGE_ID" ]; then
    wp post create \
        --post_type=page \
        --post_title="Events" \
        --post_status=publish \
        --post_content="<!-- wp:heading --><h2>Upcoming Events</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Check back for upcoming gigs and events.</p><!-- /wp:paragraph -->" \
        --allow-root
    echo "Created Events page"
fi

# Menu page
MENU_PAGE_ID=$(wp post list --post_type=page --name=menu --field=ID --allow-root 2>/dev/null || echo "")
if [ -z "$MENU_PAGE_ID" ]; then
    wp post create \
        --post_type=page \
        --post_title="Menu" \
        --post_status=publish \
        --post_content="<!-- wp:heading --><h2>Our Menu</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Plant-based food for the scene.</p><!-- /wp:paragraph -->" \
        --allow-root
    echo "Created Menu page"
fi

# About page
ABOUT_PAGE_ID=$(wp post list --post_type=page --name=about --field=ID --allow-root 2>/dev/null || echo "")
if [ -z "$ABOUT_PAGE_ID" ]; then
    wp post create \
        --post_type=page \
        --post_title="About" \
        --post_status=publish \
        --post_content="<!-- wp:heading --><h2>About Industry Plants</h2><!-- /wp:heading --><!-- wp:paragraph --><p>We cook plant-based food for bands. We interview them. We nourish the Glasgow music scene from the roots up.</p><!-- /wp:paragraph -->" \
        --allow-root
    echo "Created About page"
fi

# Contact page
CONTACT_PAGE_ID=$(wp post list --post_type=page --name=contact --field=ID --allow-root 2>/dev/null || echo "")
if [ -z "$CONTACT_PAGE_ID" ]; then
    wp post create \
        --post_type=page \
        --post_title="Contact" \
        --post_status=publish \
        --post_content="<!-- wp:heading --><h2>Get In Touch</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Want to collaborate? Get in touch.</p><!-- /wp:paragraph -->" \
        --allow-root
    echo "Created Contact page"
fi

# Create primary navigation menu
echo "Creating navigation menu..."
MENU_EXISTS=$(wp menu list --fields=name --format=csv --allow-root | grep -c "Primary Menu" || echo "0")

if [ "$MENU_EXISTS" = "0" ]; then
    wp menu create "Primary Menu" --allow-root
    
    # Add pages to menu
    wp menu item add-post "Primary Menu" $(wp post list --post_type=page --name=home --field=ID --allow-root) --title="Home" --allow-root 2>/dev/null || true
    wp menu item add-post "Primary Menu" $(wp post list --post_type=page --name=events --field=ID --allow-root) --title="Events" --allow-root 2>/dev/null || true
    wp menu item add-post "Primary Menu" $(wp post list --post_type=page --name=menu --field=ID --allow-root) --title="Menu" --allow-root 2>/dev/null || true
    wp menu item add-post "Primary Menu" $(wp post list --post_type=page --name=about --field=ID --allow-root) --title="About" --allow-root 2>/dev/null || true
    wp menu item add-post "Primary Menu" $(wp post list --post_type=page --name=contact --field=ID --allow-root) --title="Contact" --allow-root 2>/dev/null || true
    
    # Assign menu to location
    wp menu location assign "Primary Menu" primary --allow-root
    
    echo "Primary Menu created and assigned"
else
    echo "Primary Menu already exists"
fi

# Create footer menu
FOOTER_MENU_EXISTS=$(wp menu list --fields=name --format=csv --allow-root | grep -c "Footer Menu" || echo "0")

if [ "$FOOTER_MENU_EXISTS" = "0" ]; then
    wp menu create "Footer Menu" --allow-root
    
    wp menu item add-post "Footer Menu" $(wp post list --post_type=page --name=about --field=ID --allow-root) --title="About" --allow-root 2>/dev/null || true
    wp menu item add-post "Footer Menu" $(wp post list --post_type=page --name=contact --field=ID --allow-root) --title="Contact" --allow-root 2>/dev/null || true
    
    wp menu location assign "Footer Menu" footer --allow-root
    
    echo "Footer Menu created and assigned"
else
    echo "Footer Menu already exists"
fi

# Delete default "Hello World" post and sample page
echo "Cleaning up default content..."
wp post delete 1 --force --allow-root 2>/dev/null || true
wp post delete 2 --force --allow-root 2>/dev/null || true

# Update timezone
wp option update timezone_string "Europe/London" --allow-root

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Your Industry Plants website is ready!"
echo "Visit: https://industryplants.co.uk"
echo "Admin: https://industryplants.co.uk/wp-admin"
echo ""
echo "IMPORTANT: Change the admin password immediately!"
echo ""
