OldTimePreaching.com — Ezekiel 23 Original URL Fix

This update corrects the Ezekiel 23 article's URL to:
https://oldtimepreaching.com/the-whore-meaning-in-the-bible-is-ezekiel-23-20/

Unzip the CONTENTS directly into the website root folder (where index.html and sitemap.xml live),
merging folders and replacing matching files. Then commit and push to GitHub / Cloudflare Pages.

Changes:
- the-whore-meaning-in-the-bible-is-ezekiel-23-20/index.html is the actual article, with embedded YouTube video and existing styles
- articles/ezekiel-23-20-meaning/index.html sends old links to the original permalink (HTML fallback)
- _redirects includes server-side 301 mappings for former article paths when the platform permits
- index.html homepage links, feed and search index updated
- articles/index.html thumbnail link updated
- sitemap.xml changed only the one article permalink, preserves the other 19 URLs
- Images supplied from the previous package are included

NOTE: Cloudflare Pages' static asset matching can take precedence over _redirects for URLs
that still have deployed index.html files. The old page includes a working client redirect
with noindex/canonical fallback. For a true HTTP 301 at /articles/ezekiel-23-20-meaning/,
remove the old HTML file from your deployed repository (not needed for visitors to reach
the new page using this package).

This ZIP is not a whole-site replacement; it includes only update files.
