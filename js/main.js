'use strict';

/* ── WEB3FORMS KEY ─────────────────────────────────────────────────────────
   Single access key for all forms. Submissions go to your registered email.
   Dashboard: https://web3forms.com                                         */
const WEB3FORMS_KEY = '593cd81a-0de1-4c95-8573-3e3fe05597df';

/* ── MOBILE MENU ── */
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobMenu').classList.toggle('open', menuOpen);
  const b = document.getElementById('burger');
  b.classList.toggle('open', menuOpen);
  b.setAttribute('aria-expanded', String(menuOpen));
}
function closeMenu() {
  menuOpen = false;
  const m = document.getElementById('mobMenu');
  const b = document.getElementById('burger');
  if (m) m.classList.remove('open');
  if (b) { b.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
}

/* ── TOAST ── */
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('on'), 4200);
}
function showBank() {
  toast('GTBank · Account Name: Highflyer Adult Education Centre · Acct: YOUR_ACCOUNT_NUMBER · Thank you! 💛');
}

/* ── SUCCESS MESSAGE ── */
function showSuccess(anchorId, name, isContact) {
  const anchor = document.getElementById(anchorId);
  if (!anchor) return;

  // Remove any existing success box first
  const old = document.getElementById('successBox');
  if (old) old.remove();

  const box = document.createElement('div');
  box.id = 'successBox';
  box.style.cssText = [
    'display:flex', 'align-items:flex-start', 'gap:14px',
    'background:#d1fae5', 'border:2px solid #059669',
    'border-radius:10px', 'padding:18px 20px', 'margin-top:20px',
    'font-family:var(--body)', 'animation:fadeInUp .4s ease'
  ].join(';');

  const icon = document.createElement('span');
  icon.textContent = '✅';
  icon.style.cssText = 'font-size:1.6rem;line-height:1;flex-shrink:0';

  const text = document.createElement('div');
  text.style.cssText = 'color:#065f46;line-height:1.55';

  if (isContact) {
    text.innerHTML = `<strong style="font-size:1.05rem">Message received, ${name}!</strong><br>
      We will be in touch with you soon. If you need to reach us urgently, call or WhatsApp
      <strong>+234 906 842 7526</strong>.`;
  } else {
    text.innerHTML = `<strong style="font-size:1.05rem">Enquiry received, ${name}!</strong><br>
      Thank you for reaching out. A member of our team will contact you within 24 hours.
      If you need to speak to us sooner, call or WhatsApp <strong>+234 906 842 7526</strong>.`;
  }

  box.appendChild(icon);
  box.appendChild(text);
  anchor.insertAdjacentElement('afterend', box);
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-remove after 12 seconds
  setTimeout(() => { if (box.parentNode) box.remove(); }, 12000);
}

/* ── FAQ ── */
function toggleFaq(el) { el.classList.toggle('open'); }

/* ── AUDIO READ-ALOUD ── */
let speaking = false, utt = null;
function toggleAudio() {
  const btn = document.getElementById('audioBtn');
  if (speaking) {
    window.speechSynthesis.cancel();
    speaking = false;
    btn.textContent = '▶ Read Page Aloud';
  } else {
    const text = document.body.innerText.replace(/\s+/g, ' ').substring(0, 4000);
    utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.86; utt.pitch = 1.0; utt.lang = 'en-NG';
    utt.onend = utt.onerror = () => { speaking = false; btn.textContent = '▶ Read Page Aloud'; };
    window.speechSynthesis.speak(utt);
    speaking = true;
    btn.textContent = '⏸ Stop Reading';
  }
}

/* ── HERO SLIDESHOW (index.html only) ── */
let slideIdx = 0, slideTimer;
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsEl = document.getElementById('dots');
  if (!slides.length || !dotsEl) return;
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.onclick = () => goSlide(i);
    dotsEl.appendChild(d);
  });
  startSlider();
}
function goSlide(idx) {
  clearInterval(slideTimer);
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.hero-dot');
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx = idx;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
  slides[slideIdx].style.animation = 'none';
  void slides[slideIdx].offsetHeight;
  slides[slideIdx].style.animation = '';
  startSlider();
}
function startSlider() {
  const slides = document.querySelectorAll('.slide');
  slideTimer = setInterval(() => goSlide((slideIdx + 1) % slides.length), 6000);
}

/* ── COUNTERS ── */
function runCounters() {
  document.querySelectorAll('.counter:not(.done)').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) return;
    el.classList.add('done');
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const step   = Math.ceil(target / (2000 / 16));
    let cur = 0;
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString() + (cur >= target ? suffix : '');
      if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ── SCROLL REVEAL ── */
function checkReveal() {
  const vh = window.innerHeight;
  document.querySelectorAll('.rv:not(.vis),.rv-l:not(.vis),.rv-r:not(.vis)').forEach(el => {
    if (el.getBoundingClientRect().top < vh * 0.93) el.classList.add('vis');
  });
  runCounters();
}
window.addEventListener('scroll',  checkReveal, { passive: true });
window.addEventListener('resize',  checkReveal, { passive: true });

/* ── DONATION AMOUNT PICKER ── */
function pickAmt(el) {
  document.querySelectorAll('.d-amt').forEach(a => a.classList.remove('sel'));
  el.classList.add('sel');
}

/* ── WEB3FORMS HELPER ── */
async function postToWeb3Forms(data) {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ access_key: WEB3FORMS_KEY, ...data })
    });
    const json = await res.json();
    if (!json.success) console.error('[Highflyer] Web3Forms error:', json);
    return json.success;
  } catch (err) {
    console.error('[Highflyer] Web3Forms fetch failed:', err);
    return false;
  }
}

/* ── ENQUIRY FORM (enrol.html) ── */
async function submitEnrol(e) {
  e.preventDefault();
  const fn = document.getElementById('f-fn').value.trim();
  const ln = document.getElementById('f-ln').value.trim();
  const ph = document.getElementById('f-ph').value.trim();
  const pr = document.getElementById('f-pr').value;
  if (!fn) { toast('⚠️ Please enter your first name.'); document.getElementById('f-fn').focus(); return; }
  if (!ph) { toast('⚠️ Please enter your phone number.'); document.getElementById('f-ph').focus(); return; }
  if (!pr) { toast('⚠️ Please select a programme.'); document.getElementById('f-pr').focus(); return; }
  const btn = document.getElementById('enrolSubmitBtn');
  btn.textContent = 'Sending…'; btn.disabled = true;

  const ok = await postToWeb3Forms({
    subject:     `New Enquiry — ${fn} ${ln} | ${pr}`,
    firstName:   fn,
    lastName:    ln,
    phone:       ph,
    ageRange:    document.getElementById('f-age').value,
    gender:      document.getElementById('f-gd').value,
    programme:   pr,
    session:     document.getElementById('f-ss').value,
    centre:      document.getElementById('f-ct').value,
    sponsorship: document.getElementById('f-sp').value,
    notes:       document.getElementById('f-nt').value.trim()
  });

  btn.textContent = '✅ Submit Enquiry — We\'ll Contact You Within 24 Hours';
  btn.disabled = false;
  if (ok) {
    document.getElementById('enrolForm').reset();
    showSuccess('enrolSubmitBtn', fn, false);
  } else {
    toast('⚠️ Could not send. Please call us on +234 906 842 7526.');
  }
}

/* ── CONTACT FORM (contact.html) ── */
async function submitContact(e) {
  e.preventDefault();
  const nm = document.getElementById('c-nm').value.trim();
  const ct = document.getElementById('c-ct').value.trim();
  const sb = document.getElementById('c-sb').value;
  const mg = document.getElementById('c-mg').value.trim();
  if (!nm) { toast('⚠️ Please enter your name.'); document.getElementById('c-nm').focus(); return; }
  if (!ct) { toast('⚠️ Please enter your phone or email.'); document.getElementById('c-ct').focus(); return; }
  if (!mg) { toast('⚠️ Please write your message.'); document.getElementById('c-mg').focus(); return; }
  const btn = document.getElementById('contactSubmitBtn');
  btn.textContent = 'Sending…'; btn.disabled = true;

  const ok = await postToWeb3Forms({
    subject:  `Contact: ${sb || 'General Enquiry'} — ${nm}`,
    replyto:  ct.includes('@') ? ct : '',
    name:     nm,
    contact:  ct,
    topic:    sb,
    message:  mg
  });

  btn.textContent = '📨 Send Message'; btn.disabled = false;
  if (ok) {
    document.getElementById('contactForm').reset();
    showSuccess('contactSubmitBtn', nm, true);
  } else {
    toast('⚠️ Could not send. Please call us on +234 906 842 7526.');
  }
}

/* ── ARTICLE MODAL (news.html) ── */
const ARTICLES = [
  {
    date: 'April 2026',
    title: 'Our 2026 Intake Is Now Open — More Classes Than Ever Before',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    content: `
      <p>We are thrilled to announce that Highflyer Adult Education Centre's 2026 intake is officially open — and this year, we are bigger and better than ever.</p>
      <p>For the first time, we are running <strong>Saturday morning sessions</strong> at our Rumuogholu Centre, specifically designed for learners whose weekday schedules make it impossible to attend Monday–Thursday classes. These sessions run from 9:00 AM to 1:00 PM and cover Foundation and Builder's Class levels.</p>
      <p>We are also opening our <strong>new Eleme Foundation cohort</strong> — bringing our teaching closer to communities in the eastern axis of Port Harcourt who have always had to travel. The Eleme Outreach Centre will begin accepting learners from May 2026.</p>
      <h3>Why now?</h3>
      <p>Since opening in 2022, we have served over 500 adults across Rivers State. But we know that for every person who has come through our doors, there are many more who never heard about us, could not make the class times, or live too far away to attend. This expansion is our answer to that challenge.</p>
      <h3>What is available in 2026?</h3>
      <ul>
        <li>Foundation Class (Beginners): Mon/Wed or Tue/Thu — Morning and Evening sessions</li>
        <li>Builder's Class (Intermediate): Mon/Wed or Saturday — Multiple time options</li>
        <li>Expression Class (Advanced): Tue/Thu — Morning and Evening sessions</li>
        <li>New Saturday cohort: Foundation and Builder's at Rumuogholu Centre</li>
        <li>Eleme Foundation cohort (New): Starting May 2026</li>
      </ul>
      <p>Places fill quickly, especially in the evening sessions which are popular among working adults and market traders. If you or someone you know has been waiting for the right time — this is it.</p>
      <p>To enquire, call or WhatsApp <strong>+234 906 842 7526</strong>, walk into any of our centres, or fill in the enquiry form on this website. No pressure. No judgement. Just a warm welcome.</p>
    `
  },
  {
    date: 'March 2026',
    title: 'How Highflyer Is Reaching the Communities That Need Us Most',
    img: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?w=1200&auto=format&fit=crop&q=80',
    content: `
      <p>Since 2022, Highflyer Adult Education Centre has been teaching adults to read, write, and communicate in a single room behind Town Hall, 26 Rumuogholu Road. But the people who need us most are not always the ones who find us first.</p>
      <p>They are the market trader who walks past our signpost every morning but has never felt brave enough to stop. The church member who mouths the hymns from memory because they cannot read the words. The grandfather who nods along when his grandchildren read their schoolwork aloud — hoping no one notices.</p>
      <p>Reaching those people requires more than a website and a phone number. It requires going to where they already are.</p>
      <h3>Taking the message to the market</h3>
      <p>Our Community Outreach Coordinator, Miss Chioma Eze, visits Rumuola Market and other trading areas across Port Harcourt on a regular basis — not with forms or pressure, but with conversation. She sits with traders, listens, and when the moment is right, mentions what Highflyer offers. Many of our most committed learners first heard about us through a quiet chat at a market stall.</p>
      <p>"The women at the market are some of the hardest-working people I have ever met," says Chioma. "They are running businesses, raising children, supporting whole families. They are not unintelligent — they were simply never given the same chances. When I tell them what our graduates have achieved, something shifts in their eyes. That shift is everything."</p>
      <h3>Partnering with churches and community groups</h3>
      <p>Several of our learners come to us through referrals from local churches and community associations who have partnered with Highflyer to identify members who might benefit. If your church, mosque, women's association, or community group would like to host an outreach talk or refer members to us, we would be glad to come to you.</p>
      <h3>What outreach looks like in practice</h3>
      <ul>
        <li>A 15–20 minute awareness talk at your meeting, service, or event</li>
        <li>Printed enrolment information to share with members in their own time</li>
        <li>A private follow-up call for anyone who expresses interest</li>
        <li>Full confidentiality for anyone who decides to enquire or enrol</li>
      </ul>
      <p>If you know someone who needs us, please share this page with them. That small act could change everything. Call us on <strong>+234 906 842 7526</strong>.</p>
    `
  },
  {
    date: 'December 2025',
    title: 'Graduation Day 2025 — 143 New Graduates and One Unforgettable Evening',
    img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&auto=format&fit=crop&q=80',
    content: `
      <p>On the evening of Saturday, 13th December 2025, the Rumuogholu Community Hall filled beyond its capacity. Families arrived early. Chairs were borrowed from the church next door. By the time the ceremony began, people were standing three deep along the walls.</p>
      <p><strong>One hundred and forty-three adults graduated that evening</strong> — from Foundation Class, Builder's Class, and Expression Class. The youngest was 22. The oldest was 74.</p>
      <p>Watching grown men and women walk to the front of a room to collect a certificate — their first-ever academic achievement — is something that cannot be adequately described in words. Several graduates stopped walking halfway to the stage to collect themselves. One woman sat back down and could not stand for two full minutes because her legs had given way. Nobody rushed her.</p>
      <h3>A word from our Head of Curriculum</h3>
      <p>"I have been to many graduation ceremonies," said Mr. Ifeanyi Okoro, who has worked in adult education for over a decade. "I have never seen anything like what happens at ours. These are adults who have carried something heavy for decades — and tonight, for the first time, they put it down."</p>
      <p>Families came from across Rivers State. One family travelled from Bonny Island, a two-hour boat journey, to watch their grandmother receive her Expression Class certificate. When her name was called, the section of the hall where her family was seated erupted.</p>
      <h3>The speech no one planned</h3>
      <p>The most memorable moment of the evening was unscripted. An elderly man — a Foundation Class graduate who had enrolled at age 71 — walked to the microphone without being asked, and read three sentences he had written himself on a folded piece of paper.</p>
      <p style="background:var(--cream-dk);padding:20px 24px;border-left:5px solid var(--gold);border-radius:8px;font-style:italic;font-size:1.05rem">"My name is Emmanuel. I am 71 years old. I wrote these words myself."</p>
      <p>The hall was silent for three seconds. Then it was not.</p>
      <p>Highflyer's 2026 graduation is already being planned. If you want to be on that stage next December, the time to start is now. Enquire today.</p>
    `
  },
  {
    date: 'November 2025',
    title: 'How to Support the Adult Learner in Your Home: A Guide for Families',
    img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&auto=format&fit=crop&q=80',
    content: `
      <p>If someone in your family is learning to read for the first time as an adult, you already know something important: they have been very brave.</p>
      <p>Walking into a classroom as a grown adult — knowing that this is something most people do as children — takes a kind of courage that is difficult to explain to someone who has not experienced it. Your role as family is not to teach them. It is to make the journey feel safe.</p>
      <h3>What helps most</h3>
      <ul>
        <li><strong>Never test them.</strong> Resist the urge to quiz a learner in front of others. Their progress belongs to them. Let them share it when they are ready.</li>
        <li><strong>Create small reading moments together.</strong> Reading a label, a market sign, a text message — mention it naturally. These moments are worth more than formal homework.</li>
        <li><strong>Celebrate honestly.</strong> When they read something correctly, acknowledge it genuinely with a quiet "well done." Adults know the difference between sincere and performed praise.</li>
        <li><strong>Give them space to struggle.</strong> When a learner is trying to sound out a word, do not jump in with the answer. The struggle is where the learning happens.</li>
        <li><strong>Never compare them to others.</strong> Every adult learner has a different history and a different pace. Comparison helps no one.</li>
      </ul>
      <h3>What damages progress</h3>
      <ul>
        <li><strong>Sharing their enrolment without permission.</strong> Many adult learners are deeply private about being in classes. If they have not told someone, there is a reason.</li>
        <li><strong>Making jokes.</strong> Even affectionate teasing about reading or writing can be deeply wounding.</li>
        <li><strong>Pressuring for speed.</strong> Pressing a learner to "finish quickly" undermines the confidence they are building.</li>
      </ul>
      <p>The adult learner in your home is doing something extraordinary. They are rewriting the story of their own life. If you have questions about how to support them, reach out to us directly at <strong>+234 906 842 7526</strong>. We are here for the whole family.</p>
    `
  }
];

function openArticle(idx) {
  const a = ARTICLES[idx];
  document.getElementById('artModalDate').textContent    = a.date;
  document.getElementById('artModalTitle').textContent   = a.title;
  document.getElementById('artModalImg').src             = a.img;
  document.getElementById('artModalImg').alt             = a.title;
  document.getElementById('artModalContent').innerHTML   = a.content;
  const modal = document.getElementById('artModal');
  modal.classList.add('open');
  modal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
function closeArticle() {
  const modal = document.getElementById('artModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── GAMES (games.html only) ── */
const g1data = [
  {s:'Aaa like Apple',c:'A',w:['B','C','D']},{s:'Buh like Ball',c:'B',w:['D','F','G']},
  {s:'Kuh like Cat',c:'C',w:['A','G','K']},{s:'Duh like Dog',c:'D',w:['B','P','T']},
  {s:'Eh like Egg',c:'E',w:['A','I','O']},{s:'Fuh like Fish',c:'F',w:['P','V','B']},
  {s:'Guh like Goat',c:'G',w:['C','J','Q']},{s:'Huh like House',c:'H',w:['A','K','N']},
  {s:'Ih like Ink',c:'I',w:['E','L','J']},{s:'Muh like Mango',c:'M',w:['N','W','H']},
  {s:'Nuh like Name',c:'N',w:['M','H','R']},{s:'Oh like Orange',c:'O',w:['A','U','Q']},
  {s:'Puh like Pen',c:'P',w:['B','D','Q']},{s:'Ruh like Rain',c:'R',w:['N','P','K']},
  {s:'Suh like Sun',c:'S',w:['C','Z','X']},{s:'Tuh like Tree',c:'T',w:['D','F','L']},
];
let g1sc = 0, g1q = null;
function g1Reset() {
  g1q = g1data[Math.floor(Math.random() * g1data.length)];
  document.getElementById('g1-sound').textContent = '"' + g1q.s + '"';
  document.getElementById('g1-msg').textContent   = 'Pick the correct letter:';
  const opts = shuf([g1q.c, ...g1q.w.slice(0, 3)]);
  const el   = document.getElementById('g1-opts'); el.innerHTML = '';
  opts.forEach(l => {
    const b = document.createElement('button'); b.className = 'opt-btn'; b.textContent = l;
    b.onclick = () => {
      document.querySelectorAll('#g1-opts .opt-btn').forEach(x => x.onclick = null);
      if (l === g1q.c) { b.classList.add('correct'); g1sc++; document.getElementById('g1-score').textContent = g1sc; document.getElementById('g1-msg').textContent = '✅ Correct! Well done!'; }
      else { b.classList.add('wrong'); document.getElementById('g1-msg').textContent = '❌ The answer was: ' + g1q.c; document.querySelectorAll('#g1-opts .opt-btn').forEach(x => { if (x.textContent === g1q.c) x.classList.add('correct'); }); }
      setTimeout(g1Reset, 1700);
    };
    el.appendChild(b);
  });
}

const g2data = [
  {w:'CAT',b:1,c:'A',x:['E','O','I']},{w:'DOG',b:1,c:'O',x:['A','U','I']},
  {w:'PEN',b:1,c:'E',x:['A','I','O']},{w:'SUN',b:2,c:'N',x:['M','T','B']},
  {w:'BUS',b:0,c:'B',x:['P','D','T']},{w:'MAP',b:2,c:'P',x:['B','T','K']},
  {w:'CUP',b:1,c:'U',x:['A','O','E']},{w:'FAN',b:1,c:'A',x:['E','I','O']},
  {w:'HAT',b:0,c:'H',x:['B','D','S']},{w:'JAM',b:2,c:'M',x:['N','B','T']},
  {w:'LEG',b:1,c:'E',x:['A','I','O']},{w:'NET',b:0,c:'N',x:['M','B','T']},
  {w:'POT',b:1,c:'O',x:['A','U','I']},{w:'RAT',b:1,c:'A',x:['E','O','I']},
  {w:'TIN',b:1,c:'I',x:['A','E','U']},
];
let g2sc = 0, g2q = null;
function g2Reset() {
  g2q = g2data[Math.floor(Math.random() * g2data.length)];
  const letters = g2q.w.split('');
  document.getElementById('g2-word').innerHTML = letters.map((ch, i) => i === g2q.b ? '<span class="blank">_</span>' : ch).join('');
  document.getElementById('g2-msg').textContent = 'Pick the missing letter:';
  const opts = shuf([g2q.c, ...g2q.x.slice(0, 3)]);
  const el   = document.getElementById('g2-opts'); el.innerHTML = '';
  opts.forEach(l => {
    const b = document.createElement('button'); b.className = 'opt-btn'; b.textContent = l;
    b.onclick = () => {
      document.querySelectorAll('#g2-opts .opt-btn').forEach(x => x.onclick = null);
      if (l === g2q.c) { b.classList.add('correct'); g2sc++; document.getElementById('g2-score').textContent = g2sc; document.getElementById('g2-msg').textContent = '✅ Yes! The word is ' + g2q.w; document.getElementById('g2-word').textContent = g2q.w.split('').join(' '); }
      else { b.classList.add('wrong'); document.getElementById('g2-msg').textContent = '❌ Answer: ' + g2q.c + ' → ' + g2q.w; document.querySelectorAll('#g2-opts .opt-btn').forEach(x => { if (x.textContent === g2q.c) x.classList.add('correct'); }); }
      setTimeout(g2Reset, 1700);
    };
    el.appendChild(b);
  });
}

const g3data = [
  {p:'🐱',w:'CAT',x:['DOG','RAT','COW']},{p:'🐶',w:'DOG',x:['CAT','PIG','HEN']},
  {p:'☀️',w:'SUN',x:['SKY','STAR','MOON']},{p:'📚',w:'BOOK',x:['PEN','BAG','DESK']},
  {p:'🍎',w:'APPLE',x:['MANGO','BANANA','PEAR']},{p:'🏠',w:'HOUSE',x:['ROOM','GATE','DOOR']},
  {p:'🌊',w:'WATER',x:['RAIN','RIVER','SEA']},{p:'🐟',w:'FISH',x:['FROG','CRAB','BIRD']},
  {p:'🌽',w:'CORN',x:['RICE','BEAN','YAM']},{p:'✋',w:'HAND',x:['FOOT','FACE','ARM']},
  {p:'🔥',w:'FIRE',x:['HEAT','SMOKE','LIGHT']},{p:'🌳',w:'TREE',x:['LEAF','ROOT','STEM']},
  {p:'🌙',w:'MOON',x:['STAR','SUN','NIGHT']},{p:'🐓',w:'CHICKEN',x:['TURKEY','DUCK','GOAT']},
  {p:'🚶',w:'WALK',x:['RUN','JUMP','STAND']},
];
let g3sc = 0, g3q = null;
function g3Reset() {
  g3q = g3data[Math.floor(Math.random() * g3data.length)];
  document.getElementById('g3-pic').textContent  = g3q.p;
  document.getElementById('g3-msg').textContent  = 'Which word matches the picture?';
  const opts = shuf([g3q.w, ...g3q.x.slice(0, 3)]);
  const el   = document.getElementById('g3-opts'); el.innerHTML = '';
  opts.forEach(w => {
    const b = document.createElement('button'); b.className = 'opt-btn'; b.textContent = w;
    b.onclick = () => {
      document.querySelectorAll('#g3-opts .opt-btn').forEach(x => x.onclick = null);
      if (w === g3q.w) { b.classList.add('correct'); g3sc++; document.getElementById('g3-score').textContent = g3sc; document.getElementById('g3-msg').textContent = '✅ Correct! ' + g3q.p + ' = ' + g3q.w; }
      else { b.classList.add('wrong'); document.getElementById('g3-msg').textContent = '❌ It was: ' + g3q.w; document.querySelectorAll('#g3-opts .opt-btn').forEach(x => { if (x.textContent === g3q.w) x.classList.add('correct'); }); }
      setTimeout(g3Reset, 1700);
    };
    el.appendChild(b);
  });
}

function shuf(a) { return [...a].sort(() => Math.random() - .5); }

/* ── ARTICLE MODAL LISTENERS (news.html) ── */
function initArticleModal() {
  const modal = document.getElementById('artModal');
  if (!modal) return;
  modal.addEventListener('click', e => { if (e.target === modal) closeArticle(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeArticle(); });
}

/* ── INIT ── */
window.addEventListener('load', () => {
  checkReveal();
  setTimeout(runCounters, 600);
  if (document.getElementById('dots'))   initSlider();
  if (document.getElementById('g1-opts')) { g1Reset(); g2Reset(); g3Reset(); }
  initArticleModal();
});

/* ── SERVICE WORKER REGISTRATION ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/highflyeraec/sw.js', { scope: '/highflyeraec/' })
      .then(reg => {
        console.log('[Highflyer] Service worker registered. Scope:', reg.scope);
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              toast('🔄 Site updated! Refresh for the latest version.');
            }
          });
        });
      })
      .catch(err => console.warn('[Highflyer] Service worker registration failed:', err));
  });
}

/* ── ONLINE / OFFLINE BANNER ── */
function showConnBanner(online) {
  let banner = document.getElementById('conn-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'conn-banner';
    banner.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:99999',
      'padding:10px 20px', 'text-align:center', 'font-size:.86rem',
      'font-weight:700', 'font-family:var(--body)', 'transition:transform .35s ease',
      'transform:translateY(-100%)'
    ].join(';');
    document.body.prepend(banner);
  }
  if (online) {
    banner.style.background = '#2e7d52';
    banner.style.color = '#fff';
    banner.textContent = '✅ You are back online.';
    banner.style.transform = 'translateY(0)';
    setTimeout(() => { banner.style.transform = 'translateY(-100%)'; }, 3000);
  } else {
    banner.style.background = '#c0392b';
    banner.style.color = '#fff';
    banner.textContent = '📵 You are offline. Some pages may not load.';
    banner.style.transform = 'translateY(0)';
  }
}
window.addEventListener('online',  () => showConnBanner(true));
window.addEventListener('offline', () => showConnBanner(false));
         
