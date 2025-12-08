#!/bin/bash
#
# Deployment Script for Industry Plants Brutalist Theme
# This script runs from the HOST machine (your local computer or VPS)
#
# Usage: ./wordpress-theme/deploy.sh
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== Industry Plants Theme Deployment ==="
echo ""
echo "Deploy directory: $DEPLOY_DIR"
echo ""

cd "$DEPLOY_DIR"

# Check if docker compose is available
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH"
    exit 1
fi

# Ensure containers are running
echo "Ensuring WordPress container is running..."
docker compose -f docker-compose.yml up -d wordpress
echo "Waiting 10 seconds for WordPress to initialize..."
sleep 10

# Install WP-CLI in the WordPress container
echo "Installing WP-CLI in WordPress container..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
if ! command -v wp &> /dev/null; then
    echo "Installing WP-CLI..."
    curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    mv wp-cli.phar /usr/local/bin/wp
    echo "WP-CLI installed."
else
    echo "WP-CLI already installed."
fi
'

# Check if WordPress is installed
echo "Checking WordPress installation status..."
WP_INSTALLED=$(docker compose -f docker-compose.yml exec -T wordpress wp core is-installed --allow-root 2>&1 && echo "yes" || echo "no")

if [[ "$WP_INSTALLED" != *"yes"* ]]; then
    echo "WordPress not installed. Running installation..."
    
    # Get credentials from environment or use defaults
    WP_URL="${WP_URL:-https://industryplants.co.uk}"
    WP_ADMIN_USER="${WP_ADMIN_USER:-admin}"
    WP_ADMIN_EMAIL="${WP_ADMIN_EMAIL:-admin@industryplants.co.uk}"
    WP_ADMIN_PASS="${WP_ADMIN_PASS:-$(openssl rand -base64 12)}"
    
    docker compose -f docker-compose.yml exec -T wordpress wp core install \
        --url="$WP_URL" \
        --title="Industry Plants" \
        --admin_user="$WP_ADMIN_USER" \
        --admin_password="$WP_ADMIN_PASS" \
        --admin_email="$WP_ADMIN_EMAIL" \
        --skip-email \
        --allow-root
    
    echo ""
    echo "=========================================="
    echo "WordPress installed!"
    echo "Admin User: $WP_ADMIN_USER"
    echo "Admin Password: $WP_ADMIN_PASS"
    echo "=========================================="
    echo ""
    echo "IMPORTANT: Save these credentials!"
    echo ""
else
    echo "WordPress already installed."
fi

# Activate the theme
echo "Activating Industry Plants Brutalist theme..."
docker compose -f docker-compose.yml exec -T wordpress wp theme activate industry-plants-brutalist --allow-root || echo "Theme may not exist yet, continuing..."

# Configure site settings
echo "Configuring site settings..."
docker compose -f docker-compose.yml exec -T wordpress wp option update blogname "Industry Plants" --allow-root
docker compose -f docker-compose.yml exec -T wordpress wp option update blogdescription "Plant-based food for the Glasgow music scene" --allow-root
docker compose -f docker-compose.yml exec -T wordpress wp option update timezone_string "Europe/London" --allow-root
docker compose -f docker-compose.yml exec -T wordpress wp rewrite structure '/%postname%/' --allow-root 2>/dev/null || true
docker compose -f docker-compose.yml exec -T wordpress wp rewrite flush --allow-root 2>/dev/null || true

# Create Home page
echo "Creating Home page..."
HOME_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=home --field=ID --allow-root 2>/dev/null | tr -d '\r' || echo "")

if [ -z "$HOME_ID" ]; then
    HOME_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post create --post_type=page --post_title="Home" --post_status=publish --post_content="" --porcelain --allow-root | tr -d '\r')
    echo "Created Home page with ID: $HOME_ID"
else
    echo "Home page already exists with ID: $HOME_ID"
fi

# Set Home page as front page
docker compose -f docker-compose.yml exec -T wordpress wp option update show_on_front page --allow-root
docker compose -f docker-compose.yml exec -T wordpress wp option update page_on_front "$HOME_ID" --allow-root

# Create additional pages
echo "Creating additional pages..."
for page in "Events" "Menu" "About" "Contact"; do
    slug=$(echo "$page" | tr '[:upper:]' '[:lower:]')
    EXISTS=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name="$slug" --field=ID --allow-root 2>/dev/null | tr -d '\r' || echo "")
    if [ -z "$EXISTS" ]; then
        docker compose -f docker-compose.yml exec -T wordpress wp post create --post_type=page --post_title="$page" --post_status=publish --allow-root
        echo "Created page: $page"
    else
        echo "Page already exists: $page"
    fi
done

# Create navigation menu
echo "Creating navigation menu..."
MENU_EXISTS=$(docker compose -f docker-compose.yml exec -T wordpress wp menu list --fields=name --format=csv --allow-root 2>/dev/null | grep -c "Primary Menu" || echo "0")

if [ "$MENU_EXISTS" = "0" ]; then
    docker compose -f docker-compose.yml exec -T wordpress wp menu create "Primary Menu" --allow-root
    
    # Get page IDs and add to menu
    HOME_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=home --field=ID --allow-root 2>/dev/null | tr -d '\r')
    EVENTS_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=events --field=ID --allow-root 2>/dev/null | tr -d '\r')
    MENU_PAGE_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=menu --field=ID --allow-root 2>/dev/null | tr -d '\r')
    ABOUT_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=about --field=ID --allow-root 2>/dev/null | tr -d '\r')
    CONTACT_ID=$(docker compose -f docker-compose.yml exec -T wordpress wp post list --post_type=page --name=contact --field=ID --allow-root 2>/dev/null | tr -d '\r')
    
    [ -n "$HOME_ID" ] && docker compose -f docker-compose.yml exec -T wordpress wp menu item add-post "Primary Menu" "$HOME_ID" --title="Home" --allow-root 2>/dev/null || true
    [ -n "$EVENTS_ID" ] && docker compose -f docker-compose.yml exec -T wordpress wp menu item add-post "Primary Menu" "$EVENTS_ID" --title="Events" --allow-root 2>/dev/null || true
    [ -n "$MENU_PAGE_ID" ] && docker compose -f docker-compose.yml exec -T wordpress wp menu item add-post "Primary Menu" "$MENU_PAGE_ID" --title="Menu" --allow-root 2>/dev/null || true
    [ -n "$ABOUT_ID" ] && docker compose -f docker-compose.yml exec -T wordpress wp menu item add-post "Primary Menu" "$ABOUT_ID" --title="About" --allow-root 2>/dev/null || true
    [ -n "$CONTACT_ID" ] && docker compose -f docker-compose.yml exec -T wordpress wp menu item add-post "Primary Menu" "$CONTACT_ID" --title="Contact" --allow-root 2>/dev/null || true
    
    docker compose -f docker-compose.yml exec -T wordpress wp menu location assign "Primary Menu" primary --allow-root 2>/dev/null || true
    echo "Primary Menu created"
else
    echo "Primary Menu already exists"
fi

# Clean up default content
echo "Cleaning up default content..."
docker compose -f docker-compose.yml exec -T wordpress wp post delete 1 --force --allow-root 2>/dev/null || true
docker compose -f docker-compose.yml exec -T wordpress wp post delete 2 --force --allow-root 2>/dev/null || true

echo ""
echo "=== Deployment Complete! ==="
echo ""
echo "Your Industry Plants website should now be ready!"
echo ""
echo "Website: https://industryplants.co.uk"
echo "Admin:   https://industryplants.co.uk/wp-admin"
echo ""
