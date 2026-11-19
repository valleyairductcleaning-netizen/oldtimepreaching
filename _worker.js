/** OldTimePreaching.com — scoped article theme for Cloudflare Pages.
 * Only rewrites article and sermon HTML responses; every other route is served unchanged.
 * No existing original pages, Bible URLs, or redirects are modified.
 */
const PATHS = new Set([
  '/articles/i-survived-the-titanic/',
  '/articles/lest-we-forget-meaning/',
  '/articles/trusting-god-in-hard-times/',
  '/articles/should-wealthy-christians-give-more/',
  '/articles/why-would-a-holy-god-use-such-filthy-language-ezekiel-23/',
  '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/',
  '/sermons/robbers-of-god/',
  '/sermons/robbers-of-god-christian-generosity/'
]);
class HeadExtras {
  element(el) {
    el.append('<link rel="icon" type="image/png" href="/assets/otp-official-logo-v3.png">', { html:true });
    el.append('<link rel="stylesheet" href="/assets/otp-article-unified.css?v=1">', { html:true });
    el.append('<script defer src="/assets/otp-article-unified.js?v=1"></script>', { html:true });
  }
}
class FaviconLink {
  element(el) {
    el.setAttribute('href', '/assets/otp-official-logo-v3.png');
  }
}
class BodyClass {
  element(el) {
    const prev = el.getAttribute('class') || '';
    el.setAttribute('class', (prev + ' otp-unified-article').trim());
  }
}
// Legacy URL mappings are also handled here because the site uses
// Cloudflare Pages advanced-mode routing through _worker.js.
const LEGACY_REDIRECTS = new Map([
  ['/articles/ezekiel-23-20-meaning/', '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/'],
  ['/articles/why-would-a-holy-god-use-such-filthy-language-ezekiel-23/', '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/'],
  ['/why-would-a-holy-god-use-such-filthy-language-ezekiel-23/', '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/'],
  ['/bible_chapters/matthew-7/', '/bible/asv/matthew/7/'],
  ['/bible_chapters/1-timothy-1/', '/bible/asv/1-timothy/1/'],
  ['/bible/studies/acts-17/areopagus/', '/bible/studies/acts-17/public-athens/'],
]);
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' || request.method === 'HEAD') {
      const pathname = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
      const redirect = LEGACY_REDIRECTS.get(pathname);
      if (redirect) return Response.redirect(new URL(redirect + url.search, url.origin), 301);
    }
    const response = await env.ASSETS.fetch(request);
    if (request.method !== 'GET' || !PATHS.has(url.pathname) || !response.headers.get('content-type')?.includes('text/html')) return response;
    return new HTMLRewriter().on('head', new HeadExtras()).on('link[rel="icon"]', new FaviconLink()).on('link[rel="shortcut icon"]', new FaviconLink()).on('body', new BodyClass()).transform(response);
  }
};
