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
    el.append('<link rel="stylesheet" href="/assets/otp-article-unified.css?v=1">', { html:true });
    el.append('<script defer src="/assets/otp-article-unified.js?v=1"></script>', { html:true });
  }
}
class BodyClass {
  element(el) {
    const prev = el.getAttribute('class') || '';
    el.setAttribute('class', (prev + ' otp-unified-article').trim());
  }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    if (request.method !== 'GET' || !PATHS.has(url.pathname) || !response.headers.get('content-type')?.includes('text/html')) return response;
    return new HTMLRewriter().on('head', new HeadExtras()).on('body', new BodyClass()).transform(response);
  }
};
