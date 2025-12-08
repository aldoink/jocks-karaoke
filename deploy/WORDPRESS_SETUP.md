# WordPress Setup Guide for IndustryPlants

## Step 1: Environment Variables (Production)

Before deploying, you need to add WordPress database credentials to your `.env` file in the `deploy` directory.

**Create or edit `.env` file** and add these lines:

```bash
# WordPress Database Configuration
WORDPRESS_DB_NAME=industryplants
WORDPRESS_DB_USER=wpuser
WORDPRESS_DB_PASSWORD=<choose-a-secure-password-here>
WORDPRESS_DB_ROOT_PASSWORD=<choose-a-different-secure-password-here>
```

**Important:** 
- Replace `<choose-a-secure-password-here>` with actual strong passwords
- Use different passwords for `WORDPRESS_DB_PASSWORD` and `WORDPRESS_DB_ROOT_PASSWORD`
- Don't use simple passwords like "password123" - use something secure!

**Example:**
```bash
WORDPRESS_DB_NAME=industryplants
WORDPRESS_DB_USER=wpuser
WORDPRESS_DB_PASSWORD=MyS3cur3P@ssw0rd!
WORDPRESS_DB_ROOT_PASSWORD=R00tP@ssw0rd!2024
```

## Step 2: Deploy the Changes

On your server, navigate to the deploy directory and pull the latest changes, then restart:

```bash
cd ~/jocks-karaoke/deploy
docker compose -f docker-compose.yml pull
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml up -d
```

**What this does:**
- `pull` - Downloads the WordPress images
- `down` - Stops the old containers (including the React app)
- `up -d` - Starts the new WordPress containers in the background

**Wait 30-60 seconds** for WordPress and the database to fully start up.

## Step 3: First-Time WordPress Setup

### 3.1 Access Your Site
Open your browser and go to:
```
https://industry-plants.jocks-karaoke.com
```

You should see the WordPress installation screen (it looks like a setup wizard).

### 3.2 Choose Your Language
- Select your language (probably English)
- Click "Continue"

### 3.3 Create Your Admin Account
WordPress will ask you to fill in:
- **Site Title**: "Industry Plants" (or whatever you want)
- **Username**: Choose an admin username (NOT "admin" - use something unique!)
- **Password**: Choose a STRONG password (save this somewhere safe!)
- **Your Email**: Your email address (for password resets)
- **Search Engine Visibility**: Leave unchecked (you want search engines to find you)

**IMPORTANT:** Write down your username and password! You'll need these to log in later.

### 3.4 Click "Install WordPress"
WordPress will set everything up. This takes about 10-30 seconds.

### 3.5 Success!
You'll see a success message. Click "Log In" to go to the admin panel.

## Step 4: Logging Into WordPress Admin

### 4.1 Access the Admin Panel
Go to:
```
https://industry-plants.jocks-karaoke.com/wp-admin
```

### 4.2 Enter Your Credentials
- Username: The one you created in Step 3.3
- Password: The one you created in Step 3.3

### 4.3 You're In!
You'll see the WordPress Dashboard - this is your control center.

## Step 5: Basic WordPress Tasks

### Creating a Page
1. In the left sidebar, click **"Pages"** → **"Add New"**
2. Enter a title (e.g., "Home")
3. Type or paste your content in the editor
4. Click **"Publish"** (top right)

### Changing the Design (Theme)
1. Click **"Appearance"** → **"Themes"** (in left sidebar)
2. Browse available themes
3. Hover over a theme and click **"Install"**
4. Click **"Activate"** to use it

### Uploading Images
1. Click **"Media"** → **"Add New"** (in left sidebar)
2. Drag and drop images or click "Select Files"
3. Once uploaded, you can use them in pages/posts

### Creating a Menu
1. Click **"Appearance"** → **"Menus"**
2. Create a new menu
3. Add pages to it
4. Assign it to a location (usually "Primary Menu")

## Step 6: Recreating Your Old Content

Your old React app had these pages:
- Home
- Events
- Menu
- Socials
- Blog
- Store

**To recreate them:**
1. Create a new Page for each (Pages → Add New)
2. Copy/paste any text content from the old React components
3. Upload images through Media → Add New
4. Add them to your navigation menu

## Troubleshooting

### "Error establishing database connection"
- Wait a bit longer (database might still be starting)
- Check that environment variables are set correctly
- Check logs: `docker compose -f docker-compose.yml logs wordpress-db`

### Can't access the site
- Check if containers are running: `docker compose -f docker-compose.yml ps`
- Check Caddy logs: `docker compose -f docker-compose.yml logs caddy`

### Forgot your admin password
- You can reset it via the database or use WP-CLI (advanced)

## Local Development

For local development, the dev compose file uses hardcoded passwords (safe for local only):
- Database password: `wpdevpass`
- Root password: `wordpress_dev_root`

Access locally at:
- `http://localhost:8083` (plain HTTP)
- `https://industry-plants.jocks-karaoke.com` (if you have hosts file setup)

## Next Steps

1. ✅ Set up environment variables
2. ✅ Deploy the changes
3. ✅ Complete WordPress installation
4. ✅ Log into admin panel
5. ⏭️ Choose a theme
6. ⏭️ Create your pages
7. ⏭️ Set up navigation menu
8. ⏭️ Customize as needed

## Need Help?

- WordPress documentation: https://wordpress.org/support/
- WordPress admin guide: https://wordpress.org/support/article/first-steps-with-wordpress/
