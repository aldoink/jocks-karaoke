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

# Check if WordPress container is running
echo "Checking if WordPress container is running..."
if ! docker compose -f docker-compose.yml ps wordpress 2>/dev/null | grep -q "running"; then
    echo "WordPress container not running. Starting services..."
    docker compose -f docker-compose.yml up -d
    echo "Waiting for services to start..."
    sleep 30
else
    echo "WordPress container is running."
fi

# Wait for WordPress to be fully ready
echo "Waiting for WordPress to be ready..."
sleep 10

# Install WP-CLI in the WordPress container if not present
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
' || echo "Note: WP-CLI installation may have failed, continuing anyway..."

# Check if WordPress is installed, if not run core install
echo "Checking WordPress installation..."
WP_INSTALLED=$(docker compose -f docker-compose.yml exec -T wordpress wp core is-installed --allow-root 2>/dev/null && echo "yes" || echo "no")

if [ "$WP_INSTALLED" = "no" ]; then
    echo "WordPress not installed. Running installation..."
    
    # Get the WordPress URL from environment or default
    WP_URL="${WP_URL:-https://industryplants.co.uk}"
    WP_ADMIN_USER="${WP_ADMIN_USER:-admin}"
    WP_ADMIN_EMAIL="${WP_ADMIN_EMAIL:-admin@industryplants.co.uk}"
    
    # Generate a random password if not set
    WP_ADMIN_PASS="${WP_ADMIN_PASS:-$(openssl rand -base64 16)}"
    
    docker compose -f docker-compose.yml exec -T wordpress wp core install \
        --url="$WP_URL" \
        --title="Industry Plants" \
        --admin_user="$WP_ADMIN_USER" \
        --admin_password="$WP_ADMIN_PASS" \
        --admin_email="$WP_ADMIN_EMAIL" \
        --skip-email \
        --allow-root
    
    echo ""
    echo "WordPress installed!"
    echo "Admin User: $WP_ADMIN_USER"
    echo "Admin Password: $WP_ADMIN_PASS"
    echo ""
    echo "IMPORTANT: Save these credentials!"
    echo ""
else
    echo "WordPress already installed."
fi

# Activate the theme
echo "Activating Industry Plants Brutalist theme..."
docker compose -f docker-compose.yml exec -T wordpress wp theme activate industry-plants-brutalist --allow-root 2>/dev/null || echo "Theme activation may have failed - check if theme exists"

# Configure site settings
echo "Configuring site settings..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
    wp option update blogname "Industry Plants" --allow-root
    wp option update blogdescription "Plant-based food for the Glasgow music scene" --allow-root
    wp option update timezone_string "Europe/London" --allow-root
    wp rewrite structure "/%postname%/" --allow-root 2>/dev/null || true
    wp rewrite flush --allow-root 2>/dev/null || true
' 2>/dev/null || echo "Some settings may have failed to update"

# Create Home page
echo "Creating Home page..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
    HOME_ID=$(wp post list --post_type=page --name=home --field=ID --allow-root 2>/dev/null || echo "")
    if [ -z "$HOME_ID" ]; then
        HOME_ID=$(wp post create --post_type=page --post_title="Home" --post_status=publish --post_content="" --porcelain --allow-root)
        echo "Created Home page with ID: $HOME_ID"
    else
        echo "Home page already exists with ID: $HOME_ID"
    fi
    wp option update show_on_front page --allow-root
    wp option update page_on_front "$HOME_ID" --allow-root
' 2>/dev/null || echo "Home page creation may have failed"

# Create additional pages
echo "Creating additional pages..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
    for page in "Events" "Menu" "About" "Contact"; do
        slug=$(echo "$page" | tr "[:upper:]" "[:lower:]")
        EXISTS=$(wp post list --post_type=page --name="$slug" --field=ID --allow-root 2>/dev/null || echo "")
        if [ -z "$EXISTS" ]; then
            wp post create --post_type=page --post_title="$page" --post_status=publish --allow-root
            echo "Created page: $page"
        else
            echo "Page already exists: $page"
        fi
    done
' 2>/dev/null || echo "Some pages may have failed to create"

# Create navigation menu
echo "Creating navigation menu..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
    MENU_EXISTS=$(wp menu list --fields=name --format=csv --allow-root 2>/dev/null | grep -c "Primary Menu" || echo "0")
    if [ "$MENU_EXISTS" = "0" ]; then
        wp menu create "Primary Menu" --allow-root
        
        HOME_ID=$(wp post list --post_type=page --name=home --field=ID --allow-root 2>/dev/null)
        EVENTS_ID=$(wp post list --post_type=page --name=events --field=ID --allow-root 2>/dev/null)
        MENU_ID=$(wp post list --post_type=page --name=menu --field=ID --allow-root 2>/dev/null)
        ABOUT_ID=$(wp post list --post_type=page --name=about --field=ID --allow-root 2>/dev/null)
        CONTACT_ID=$(wp post list --post_type=page --name=contact --field=ID --allow-root 2>/dev/null)
        
        [ -n "$HOME_ID" ] && wp menu item add-post "Primary Menu" "$HOME_ID" --title="Home" --allow-root 2>/dev/null
        [ -n "$EVENTS_ID" ] && wp menu item add-post "Primary Menu" "$EVENTS_ID" --title="Events" --allow-root 2>/dev/null
        [ -n "$MENU_ID" ] && wp menu item add-post "Primary Menu" "$MENU_ID" --title="Menu" --allow-root 2>/dev/null
        [ -n "$ABOUT_ID" ] && wp menu item add-post "Primary Menu" "$ABOUT_ID" --title="About" --allow-root 2>/dev/null
        [ -n "$CONTACT_ID" ] && wp menu item add-post "Primary Menu" "$CONTACT_ID" --title="Contact" --allow-root 2>/dev/null
        
        wp menu location assign "Primary Menu" primary --allow-root 2>/dev/null
        echo "Primary Menu created"
    else
        echo "Primary Menu already exists"
    fi
' 2>/dev/null || echo "Menu creation may have failed"

# Clean up default content
echo "Cleaning up default content..."
docker compose -f docker-compose.yml exec -T wordpress bash -c '
    wp post delete 1 --force --allow-root 2>/dev/null || true
    wp post delete 2 --force --allow-root 2>/dev/null || true
' 2>/dev/null || true

echo ""
echo "=== Deployment Complete! ==="
echo ""
echo "Your Industry Plants website should now be ready!"
echo ""
echo "Website: https://industryplants.co.uk"
echo "Admin:   https://industryplants.co.uk/wp-admin"
echo ""
echo "If this is a fresh install, check above for the admin credentials."
echo ""
