OldTimePreaching.com favicon fix, November 17, 2026

WHAT WAS WRONG: The site used /assets/favicon.svg, /bible/favicon.svg, /favicon.ico and /bible/favicon.ico. The Bible ICO was a plain maroon square, while the root ICO contained the book icon. Chrome also cached previous icon URLs.

FIX: All HTML files now point to /assets/otp-book-20261117.svg and /favicon.ico?v=20261117. Both SVG locations are now the identical book icon, and both ICO files now contain the same book artwork. The Cloudflare worker icon links were updated too.

This is a full website ZIP generated from the site you uploaded. The original .git folder was intentionally excluded; keep your own existing .git folder and replace the website files with these. No article wording or Bible text was rewritten. Commit and push the file changes to deploy.
