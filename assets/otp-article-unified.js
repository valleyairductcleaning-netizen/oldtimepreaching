/** Scoped client-side article presentation, leaving original article text untouched. */
(() => {
  const DATA = {
    '/articles/christians-in-pompeii-before-ad-79/': { category:'BIBLICAL ARCHAEOLOGY · EARLY CHRISTIANITY', image:'/articles/christians-in-pompeii-before-ad-79/assets/pompeii-then-and-now.jpg', alt:'Modern Pompeii street beside a clearly labelled imaginative reconstruction of life before AD 79', caption:'Pompeii today and an imaginative reconstruction of the city before AD 79 (right-hand side is AI-generated, not an archaeological photograph).', description:'A walk through the lost Roman city, the world of the Apostle Paul, and inscriptions that may preserve the name of the earliest Christians.' },
    '/articles/i-survived-the-titanic/': { category:'CHRISTIAN ALLEGORY · REPENTANCE · GRACE', image:'/assets/images/article-thumbnails/i-survived-the-titanic.webp', alt:'Illustration of the Titanic sinking as a lifeboat searches for people at sea', caption:'Creative illustration for a fictional Christian allegory, not a historical photograph.' },
    '/articles/lest-we-forget-meaning/': { category:'CHRISTIAN HISTORY · REMEMBRANCE', image:'/assets/images/article-thumbnails/lest-we-forget.webp', alt:'Remembrance Day illustration with soldiers and a red poppy' },
    '/articles/trusting-god-in-hard-times/': { category:'CHRISTIAN LIVING · TRUSTING GOD', image:'/assets/images/article-thumbnails/trusting-god-in-hard-times.webp', alt:'Open Bible near a workshop representing faith through difficult times' },
    '/articles/should-wealthy-christians-give-more/': { category:'CHRISTIAN GIVING · STEWARDSHIP', image:'/assets/images/article-thumbnails/christian-giving.webp', alt:'An open Bible in warm light illustrating Christian generosity' },
    '/articles/why-would-a-holy-god-use-such-filthy-language-ezekiel-23/': { category:'BIBLE STUDY · EZEKIEL 23', image:'/assets/images/article-thumbnails/ezekiel-23-explained.webp', alt:'Symbolic biblical illustration for Ezekiel chapter 23' },
    '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/': { category:'BIBLE STUDY · EZEKIEL 23', image:'/assets/images/article-thumbnails/ezekiel-23-explained.webp', alt:'Symbolic biblical illustration for Ezekiel chapter 23' },
    '/sermons/robbers-of-god/': { category:'HISTORIC SERMON · CHARLES SPURGEON', image:'/assets/images/article-thumbnails/original-sermon.webp', alt:'Antique sermon manuscript with quill and ink' },
    '/sermons/robbers-of-god-christian-generosity/': { category:'HISTORIC SERMON · STEWARDSHIP', image:'/assets/images/article-thumbnails/spurgeon-robbers-of-god.webp', alt:'Historical portrait of preacher Charles Spurgeon' }
  };
  const path = location.pathname.replace(/(?:index\.html)?$/, '').replace(/\/?$/, '/');
  const data = DATA[path];
  if (!data) return;
  const h1 = document.querySelector('main h1') || document.querySelector('h1');
  const article = document.querySelector('main article') || document.querySelector('article') || document.querySelector('main .article-body');
  const main = document.querySelector('main');
  if (!h1 || !main || !article) return;
  const title = h1.textContent.trim();
  const originalSection = h1.closest('section');
  // Do not hide the full article if its H1 is part of article content.
  if (originalSection && !article.contains(originalSection)) originalSection.classList.add('otp-original-hero');
  else h1.style.display='none';

  const originalDescription = document.querySelector('meta[name="description"]')?.content || '';
  const heroDescription = data.description || (() => {
    const p = originalSection?.querySelector('.ta-dek,.tg-dek,.rem-dek,.ez-dek,.article-dek,.hero-subtitle,p:not(.ta-byline):not(.tg-meta):not(.article-meta)');
    const s = p?.textContent?.trim() || originalDescription;
    return s.length>235 ? s.slice(0,232)+'…' : s;
  })();
  const top = document.createElement('section');
  top.className='otp-magazine-hero';
  const crumb = document.createElement('div'); crumb.className='otp-magazine-breadcrumb';
  const home = document.createElement('a'); home.href='/';home.textContent='Home';
  const listing = document.createElement('a');listing.href='/articles/';listing.textContent='Articles';
  crumb.append(home,document.createTextNode(' / '),listing);
  const kicker=document.createElement('p'); kicker.className='otp-magazine-kicker'; kicker.textContent=data.category;
  const headline=document.createElement('h1');headline.textContent=title;
  const dek=document.createElement('p');dek.className='otp-magazine-dek';dek.textContent=heroDescription;
  const meta=document.createElement('p');meta.className='otp-magazine-meta';meta.textContent='Old Time Preaching · Faith · History · Conviction';
  const fig=document.createElement('figure');fig.className='otp-magazine-figure';
  const img=document.createElement('img');img.src=data.image;img.alt=data.alt;img.loading='eager';img.fetchPriority='high';img.width=960;img.height=540;
  fig.append(img);
  if(data.caption){const cap=document.createElement('figcaption');cap.textContent=data.caption;fig.append(cap);}
  const rule=document.createElement('div');rule.className='otp-magazine-rule';rule.setAttribute('aria-hidden','true');
  top.append(crumb,kicker,headline,dek,meta,fig,rule);
  main.parentNode.insertBefore(top,main);
  main.classList.add('otp-article-main');
  article.classList.add('otp-article-primary');
  // Neutralize differing legacy grids surrounding article content (without removing text or media).
  let wrap=article.parentElement;
  while(wrap && wrap!==main && wrap!==document.body){wrap.classList.add('otp-article-wrap');wrap=wrap.parentElement;}
  // Section-level navigation in old themes does not belong in the reading column.
  document.querySelectorAll('main aside,main .ta-side,main .sidebar').forEach(side=>side.classList.add('otp-old-side'));
  // Related articles: links to existing site pages, with the existing matching thumbnails.
  const relatedPaths = {
    '/articles/christians-in-pompeii-before-ad-79/': ['/articles/lest-we-forget-meaning/','/articles/trusting-god-in-hard-times/','/the-whore-meaning-in-the-bible-is-ezekiel-23-20/'],
    '/articles/i-survived-the-titanic/': ['/articles/trusting-god-in-hard-times/','/articles/should-wealthy-christians-give-more/','/sermons/robbers-of-god/'],
    '/articles/lest-we-forget-meaning/': ['/articles/christians-in-pompeii-before-ad-79/','/articles/trusting-god-in-hard-times/','/articles/i-survived-the-titanic/'],
    '/articles/trusting-god-in-hard-times/': ['/articles/i-survived-the-titanic/','/articles/lest-we-forget-meaning/','/articles/should-wealthy-christians-give-more/'],
    '/articles/should-wealthy-christians-give-more/': ['/sermons/robbers-of-god-christian-generosity/','/sermons/robbers-of-god/','/articles/trusting-god-in-hard-times/'],
    '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/': ['/articles/trusting-god-in-hard-times/','/articles/christians-in-pompeii-before-ad-79/','/articles/lest-we-forget-meaning/'],
    '/sermons/robbers-of-god/': ['/sermons/robbers-of-god-christian-generosity/','/articles/should-wealthy-christians-give-more/','/articles/trusting-god-in-hard-times/'],
    '/sermons/robbers-of-god-christian-generosity/': ['/articles/should-wealthy-christians-give-more/','/sermons/robbers-of-god/','/articles/trusting-god-in-hard-times/']
  };
  const recs=(relatedPaths[path]||['/articles/christians-in-pompeii-before-ad-79/','/articles/trusting-god-in-hard-times/']).map(p=>[p,DATA[p]]).filter(([p,d])=>p!==path && !!d);
  if(recs.length){
    const related=document.createElement('section'); related.className='otp-related';
    const rh=document.createElement('h2');rh.textContent='Continue Reading';related.append(rh);
    const grid=document.createElement('div');grid.className='otp-related-grid';
    recs.forEach(([p,d])=>{
      const a=document.createElement('a');a.href=p;a.className='otp-related-card';
      const im=document.createElement('img');im.src=d.image;im.alt=d.alt;im.loading='lazy';im.width=480;im.height=270;
      const str=document.createElement('strong');str.textContent=({
        '/articles/christians-in-pompeii-before-ad-79/':'Buried in Ash: Christians in Pompeii',
        '/articles/i-survived-the-titanic/':'I Survived the Titanic: A Christian Allegory',
        '/articles/lest-we-forget-meaning/':'Lest We Forget: The Biblical Meaning',
        '/articles/trusting-god-in-hard-times/':'How to Trust God in Hard Times',
        '/articles/should-wealthy-christians-give-more/':'Should Wealthy Christians Give More?',
        '/the-whore-meaning-in-the-bible-is-ezekiel-23-20/':'Ezekiel 23 Explained',
        '/sermons/robbers-of-god/':'Robbers of God: Original Sermon',
        '/sermons/robbers-of-god-christian-generosity/':'Are Wealthy Christians Robbing God?'
      })[p] || p.replace(/^.*\//,'');
      a.append(im,str);grid.append(a);
    });related.append(grid);main.parentElement.insertBefore(related, main.nextSibling);
  }
})();
