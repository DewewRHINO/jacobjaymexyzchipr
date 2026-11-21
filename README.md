# jacobjayme.xyz

Jacob Jayme’s blog, migrated from Django to [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy). The theme source comes from upstream commit `ae10572`.

## Run locally

With Ruby 3.1–3.x, Bundler, and Node.js installed, run:

```sh
BUNDLE_PATH=vendor/bundle bundle install
npm install --ignore-scripts
npm run build:css
npm run build:js
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --host 127.0.0.1
```

Open <http://localhost:4000/>.

Public articles live in `_posts/`. The About page lives in `_tabs/about.md`, and the research paper link lives in `_data/research.yml`. The original numbered post URLs are defined in each entry’s front matter. The marriage and house entry remains accessible at `/4/` and is omitted from the homepage.

## Edit the escape room tier list

Edit `_data/escape_rooms.yml` locally or use GitHub’s file editor. Replace the empty list (`[]`) under a tier with entries like this:

```yaml
A:
  - name: Room name
    venue: Venue name
    location: City, State
    notes: What made it memorable
```

Move an entry between tiers to change its ranking. Save the file and Jekyll will render the update at `/escape-rooms/`.

## Push to GitHub

Create an empty repository on GitHub, then run the following from this folder. Replace `YOUR-USERNAME/YOUR-REPO` with the repository path.

```sh
git add .
git commit -m "Migrate blog to Chirpy"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

GitHub Actions builds the site on pushes and pull requests. Use Node.js 24 and Ruby 3.4 to match that workflow.
# jacobjaymexyzchipr
