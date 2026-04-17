The user wants to add songs to the White Pen karaoke venue database.

## Context

"White Pen" (WP) is a karaoke venue. Its songs are stored in the database with a `LOCATION` of `WP-XXXX` (zero-padded 4-digit number, e.g. `WP-0376`). Songs are added exclusively via Flyway SQL migration files — never by editing existing migrations.

The current highest WP location is in the most recently numbered migration file matching `V*__new_songs_WP_*.sql` in `backend/src/main/resources/db/migration/`. The next migration must use the next sequential Flyway version number.

## Your task

1. **Read the user's input** — they will either paste a list of songs, describe them, or provide an image/photo of a handwritten or printed song list. If an image is provided, read it carefully and extract all songs visible.

2. **Find the next available WP number and Flyway version** by reading the most recent `V*__new_songs_WP_*.sql` migration to find the last used WP location number, then increment from there. Also check all migration files to find the highest `V` version number.

3. **Create the new migration file** at:
   `backend/src/main/resources/db/migration/V{N}__new_songs_WP_{firstNum}_{lastNum}.sql`

   Where:
   - `{N}` is the next Flyway version number (integer, no leading zeros)
   - `{firstNum}` and `{lastNum}` are the first and last WP numbers added (zero-padded to 3 digits, e.g. `376_390`)

4. **SQL format** — use this exact single-line style, with single-quoted values:
   ```sql
   INSERT INTO SONGS (LOCATION, ARTIST, TITLE) VALUES ('WP-0376', 'Artist Name', 'Song Title');
   ```
   - Escape any single quote within an artist or title as `''` (two single quotes), e.g. `Stumblin'' In` or `I''m Every Woman`
   - Assign WP numbers sequentially starting from the next available number
   - If the photo shows WP numbers already assigned, use those; otherwise assign them yourself

5. **Confirm with the user** — after creating the file, show the full list of songs you've added so they can verify the transcription was accurate before committing.
