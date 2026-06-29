const partnership = document.querySelector('.partnership');
if (partnership) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          partnership.classList.add('is-visible');
        } else {
          partnership.classList.remove('is-visible');
        }
      });
    },
    { threshold: 0.5 },
  );
  observer.observe(partnership);

  // The partnership stage is a fixed 1920px-wide coordinate system, but the
  // visible cards only span ~1430px of it (the rest is empty margin). Below
  // 1400px we shrink it proportionally via a CSS scale; scale() needs a
  // unitless ratio that pure CSS can't derive from the viewport, so compute it
  // here. Basing it on the content width (not 1920) keeps the scale near 1 at
  // the 1400 breakpoint so there's no jump from the untouched desktop layout.
  const CONTENT_WIDTH = 1430;
  const SIDE_GAP = 100; // ~50px breathing room each side
  const scalePartnership = () => {
    const w = document.documentElement.clientWidth;
    if (w > 1050 && w <= 1400) {
      const scale = Math.min(1, (w - SIDE_GAP) / CONTENT_WIDTH);
      partnership.style.setProperty('--p-scale', scale);
    } else {
      partnership.style.removeProperty('--p-scale');
    }
  };
  scalePartnership();
  window.addEventListener('resize', scalePartnership);
}

const cubeNumber = document.querySelector('.how-we-work__cube-number');
const steps = Array.from(document.querySelectorAll('.how-we-work__step'));
const nums = document.querySelectorAll('.how-we-work__num');
if (cubeNumber && steps.length) {
  let currentNum = null;
  const updateActiveStep = () => {
    const triggerY = window.innerHeight * 0.4;
    let bestStep = null;
    let bestDist = Infinity;
    steps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const dist = Math.abs(rect.top - triggerY);
      if (dist < bestDist) {
        bestDist = dist;
        bestStep = step;
      }
    });
    if (!bestStep) return;
    const num = bestStep.dataset.step;
    if (num === currentNum) return;
    currentNum = num;
    cubeNumber.textContent = num;
    steps.forEach((s) =>
      s.classList.toggle('is-active', s.dataset.step === num),
    );
    const cur = parseInt(num, 10);
    nums.forEach((n) => {
      const s = parseInt(n.dataset.step, 10);
      n.style.setProperty('--slot', s - cur);
      n.classList.toggle('is-active', s === cur);
      n.classList.toggle('is-prev', s === cur - 1);
      n.classList.toggle('is-next', s === cur + 1);
    });
  };
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveStep();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
  updateActiveStep();
}

// Single source of truth for the footprint block. Tabs, cards and the
// mobile <select> are all rendered from this list, so they always stay in
// the same order. Map pins (.footprint__zone) stay in the HTML because they
// carry spatial data and are matched back to a partner by `id`.
const PARTNERS = [
  {
    id: 'ways2well',
    name: 'Ways2Well',
    logo: './assets/images/logos/ways2well.svg',
    link: true,
    url: 'https://webugol.com/projects/ways2well/',
    text: 'Ways2Well is a leading wellness clinic that provides innovative treatments to improve health and well-being. Specializing in stem cell therapy, hormone replacement therapy, weight loss solutions, and holistic care, W2W combines advanced medical technology with personalized care to help individuals enhance energy, manage chronic conditions, lose weight, and improve overall wellness.',
  },
  {
    id: 'valhalla',
    name: 'Valhalla Vitality',
    logo: './assets/images/logos/valhalla.svg',
    link: true,
    url: 'https://webugol.com/projects/valhalla-vitality/',
    text: 'Valhalla Vitality is a wellness company specializing in personalized health solutions, offering services like hormone replacement therapy, weight loss treatments, and sexual health therapies. Focused on improving vitality, they use innovative treatments tailored to individual needs. Whether addressing hormonal balance or overall wellness, Valhalla Vitality provides holistic care to help clients feel their best.',
  },
  {
    id: 'uberdoc',
    name: 'UberDoc',
    logo: './assets/images/logos/uberdoc.svg',
    link: false,
    text: 'UberDoc is a digital healthcare platform providing priority access to top doctors through in-person and telemedicine appointments at a transparent, affordable price. By removing barriers between patients and physicians, UberDoc makes healthcare simpler, fairer, and rooted in trust. With clear pricing and direct access to specialists, UberDoc ensures faster, better, and more accessible expert care.',
  },
  {
    id: 'partington',
    name: 'Partington',
    logo: './assets/images/logos/partinggton.svg',
    link: true,
    url: 'https://webugol.com/projects/partington-plastic-surgery/',
    text: 'Partington Plastic Surgery, under the esteemed leadership of Dr. Marshall T. Partington, turned to Webugol to amplify their online presence for specific cosmetic and aesthetic services like breast augmentation and labiaplasty. With an established ad presence, the clinic aimed to refine its Google Ads for more targeted and effective outreach.',
  },
  {
    id: 'atlas',
    name: "Atlas Men's Health",
    logo: './assets/images/logos/atlas.svg',
    link: true,
    url: 'https://webugol.com/projects/altas-mens-health/',
    text: "Atlas Men's Health is a premier men's health clinic specializing in male hormone replacement, medical weight loss, testosterone replacement therapy (TRT), and other men's health services. The clinic offers personalized treatment plans to optimize health and wellness, focusing on affordable, quality healthcare.",
  },
  {
    id: 'aditidesai',
    name: 'Aditi Desai',
    logo: './assets/images/logos/aditi.svg',
    link: true,
    url: 'https://webugol.com/projects/aditi-desai/',
    text: "Aditi Desai Clinic is a leading London-based medical facility specializing in sleep-related disorders and dental issues, including Bruxism, Snoring, TMJ, and Sleep Apnea. With a focus on innovation and personalized care, the clinic provides expert treatments that enhance patients' sleep, health, and overall quality of life in a welcoming, professional environment.",
  },
  {
    id: 'aspireloss',
    name: 'ASPIRE Weight Loss',
    logo: './assets/images/logos/aspire.svg',
    link: false,
    text: 'Aspire Weight Loss is a digital healthcare platform dedicated to helping individuals achieve weight loss and wellness goals through personalized, evidence-based strategies and compassionate support. With virtual appointments and ongoing access to the care team, patients receive tailored guidance every step of the way, ensuring lasting results and a healthier, happier you.',
  },
  {
    id: 'aspireelite',
    name: 'Aspire Elite Wellness',
    logo: './assets/images/logos/aspire-elite.svg',
    link: true,
    url: 'https://webugol.com/projects/aspire-elite/',
    text: 'Aspire Elite is a telehealth clinic offering prescription weight loss treatments using GLP-1 medications like Semaglutide and Tirzepatide. Serving patients in Florida, Texas, and New York, Aspire Meds provides convenient, doctor-guided care through a fully online platform — helping clients lose weight safely, effectively, and with expert support.',
  },
  {
    id: 'badsm',
    name: 'BADSM',
    logo: './assets/images/logos/badsm.svg',
    link: false,
    text: 'The British Academy of Dental Sleep Medicine equips dentists to identify the millions affected by sleep disorders, particularly snoring and sleep apnoea, and guide them toward effective recovery. With accredited education, clinical excellence, and patient-centered solutions, the Academy ensures high-quality care in Dental Sleep Medicine.',
  },
  {
    id: 'drtelx',
    name: 'Dr Telx',
    logo: './assets/images/logos/dr-telx.svg',
    link: true,
    url: 'https://webugol.com/projects/dr-telx/',
    text: 'Telx-inc is a telecommunications provider serving businesses across the Greater Toronto Area and Southern Ontario. Specializing in business phone systems, Hosted PBX, and high-speed Internet, Telx-inc helps small and mid-sized companies stay connected through advanced, cost-effective solutions tailored to modern communication needs.',
  },
  {
    id: 'dearborn',
    name: 'Dearborn West Dental',
    logo: './assets/images/logos/dearborn.svg',
    link: false,
    text: 'Dearborn West Dental is a trusted dental practice with over 30 years of experience offering comprehensive care in Dearborn. Their services include general dentistry (exams, cleanings), restorative treatments (implants, crowns), cosmetic procedures, and specialized care such as sedation dentistry, emergency services, and pediatric dentistry.',
  },
  {
    id: 'drugtesting',
    name: 'Drug Testing Supplies',
    logo: './assets/images/logos/drug-testing.svg',
    link: true,
    url: 'https://webugol.com/projects/drug-testing-supplies/',
    text: 'Drug Testing Supplies is a leading provider of saliva-based drug tests for wholesale and retail markets. They offer reliable and accurate testing solutions for industries like workplace drug testing, healthcare, and law enforcement. Committed to quality and customer satisfaction, Drug Testing Supplies delivers top standards in testing products to help businesses maintain safe, drug-free environments.',
  },
  {
    id: 'hairtransplant',
    name: 'Hair Transplant Centre',
    logo: './assets/images/logos/hair-transplant.svg',
    link: false,
    text: "Hair Transplant Centre Toronto specializes in FUE hair transplants, located in downtown Toronto's Financial District within FCP Dermatology at First Canadian Place (FCP). The clinic offers a first-class experience with a focus on professionalism and precision.",
  },
  {
    id: 'hilser',
    name: 'Hillser Clinic',
    logo: './assets/images/logos/hilser-clinic.svg',
    link: false,
    text: 'Hillser Clinic is a leading medical facility specializing in Sleep Medicine, Rhinology, and Facial Aesthetics. The clinic offers personalized care and state-of-the-art services in a professional, calming environment. Hillser Clinic enhances well-being through evidence-based treatments, helping individuals improve sleep, breathing, and facial appearance, with a focus on safety, comfort, and exceptional results.',
  },
  {
    id: 'invigor',
    name: 'Invigor',
    logo: './assets/images/logos/invigor-clinic.svg',
    link: true,
    url: 'https://webugol.com/projects/invigor-medical/',
    text: 'Invigor Medical is an online clinic based in Kennewick, Washington, specializing in health and wellness. It helps individuals achieve optimal health and vitality through personalized, evidence-based treatments. As a telemedicine pioneer, Invigor Medical offers convenient access to healthcare services, allowing patients to consult with licensed providers from home.',
  },
  {
    id: 'ironsail',
    name: 'Ironsail Pharma',
    logo: './assets/images/logos/ironsail.svg',
    link: false,
    text: 'Ironsail Pharma is a digital healthcare platform designed to streamline pharmacy management, reduce costs, and ensure full compliance. Born from a vision to transform the interaction between healthcare providers and pharmacies, it leverages technology and strategic partnerships to create a more efficient, cost-effective solution.',
  },
  {
    id: 'fusionlabs',
    name: 'Fusionlabs',
    logo: './assets/images/logos/fusionlabs.svg',
    link: true,
    url: 'https://webugol.com/projects/fusionlabs/',
    text: 'Fusion Labs is a leading biotechnology and wellness company that offers advanced health solutions. Specializing in hormone therapy, medical-grade skincare treatments, and wellness programs, Fusion Labs combines state-of-the-art technology with expert scientific knowledge to deliver personalized solutions. These services are designed to enhance energy, vitality, and overall well-being, empowering individuals to live healthier lives.',
  },
  {
    id: 'kaduceus',
    name: 'Kaduceus',
    logo: './assets/images/logos/kaduceus.svg',
    link: false,
    text: 'Kaduceus delivers innovative, science-backed pharmaceutical solutions to support effective and sustainable weight management. The platform empowers healthcare providers and patients with personalized treatments designed to improve outcomes and long-term wellness. By combining advanced technology, clinical expertise, and seamless service, Kaduceus elevates patient care and medication management.',
  },
  {
    id: 'vitalitymd',
    name: "Men's Vitality MD",
    logo: './assets/images/logos/men`s-vitality.svg',
    link: true,
    url: 'https://webugol.com/projects/mens-vitality-md/',
    text: "Men’s Vitality MD is a telehealth practice that focuses on the unique health concerns of men as they age. Located in Honolulu, Hawaii, the practice is led by anti-aging and hormone specialist Scott Sanderson, MD. The team offers a wide range of cutting-edge treatments to ensure men look and feel their best.",
  },
  {
    id: 'liferx',
    name: 'LifeRx.MD',
    logo: './assets/images/logos/liferx-md.svg',
    link: true,
    url: 'https://webugol.com/projects/liferx-md/',
    text: 'LifeRx.md is a virtual weight loss clinic helping individuals achieve lasting results through tailored programs and telehealth services. Their offerings include personalized care plans and support with medications like semaglutide, making weight loss more accessible. LifeRx.md empowers clients to reach and sustain their wellness goals from anywhere in the U.S.',
  },
  {
    id: 'lody',
    name: 'Lody Health Klinik',
    logo: './assets/images/logos/lody-health.svg',
    link: true,
    url: 'https://webugol.com/projects/lodyhealth/',
    text: 'Lody Health Klinik is a progressive healthcare clinic based in Vaughan, Ontario, combining traditional and alternative medicine. The clinic specializes in cancer support, pain relief, cardiovascular care, and cosmetic treatments. Their root-cause approach and individualized care plans help patients restore balance and improve quality of life naturally.',
  },
  {
    id: 'peaknow',
    name: 'Peak Now',
    logo: './assets/images/logos/peak-now.svg',
    link: false,
    text: 'Peak Now provides a comprehensive Health and Wellness Platform focused on enhancing well-being. The telemedicine services deliver personalized, accessible healthcare with expert advice, innovative solutions, and virtual care. By integrating licensed providers, diagnostics, and pharmacy services, each patient receives the attention and support needed.',
  },
  {
    id: 'stackmd',
    name: 'StackMD',
    logo: './assets/images/logos/stackmd.svg',
    link: false,
    text: 'StackMD is a digital healthcare platform offering telemedicine services that connect patients with licensed providers for personalized care. Specializing in longevity, hormone optimization (BHRT/TRT), and weight management, it operates as a self-pay service, providing online medical evaluations and prescriptions without insurance.',
  },
  {
    id: 'tenuiss',
    name: 'Tenuiss',
    logo: './assets/images/logos/tenuiss.svg',
    link: true,
    url: 'https://webugol.com/projects/tenuiss/',
    text: 'Tenuiss is a team of U.S.-based weight loss specialists, cardiology experts, and nutritionists focused on improving long-term health outcomes. With over 20 years of combined experience, the clinic offers advanced solutions for weight management, diabetes, hypertension, and sleep apnea—helping patients lead healthier, longer lives.',
  },
];

const footprint = document.querySelector('.footprint');
if (footprint && typeof Swiper !== 'undefined') {
  const zones = footprint.querySelectorAll('.footprint__zone');
  const marker = footprint.querySelector('.footprint__marker');
  const markerLetter =
    marker && marker.querySelector('.footprint__marker-letter');
  const glow = footprint.querySelector('.footprint__glow');
  const tabsEl = footprint.querySelector('.footprint__tabs');
  const cardsEl = footprint.querySelector('.footprint__cards');
  const tabsWrap = footprint.querySelector('.footprint__tabs-wrap');
  const tabsIndicator = footprint.querySelector('.footprint__tabs-indicator');
  const globeImg = footprint.querySelector('.footprint__globe');
  const select = footprint.querySelector('.footprint__select');
  const selectCurrent = footprint.querySelector('.footprint__select-current');
  const selectList = footprint.querySelector('.footprint__select-list');
  const tabsTrack = tabsEl && tabsEl.querySelector('.swiper-wrapper');
  const cardsTrack = cardsEl && cardsEl.querySelector('.swiper-wrapper');

  // Render tabs, cards and select options from PARTNERS (single source).
  PARTNERS.forEach((p, i) => {
    if (tabsTrack) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className =
        'footprint__tab swiper-slide' + (i === 0 ? ' is-active' : '');
      tab.dataset.partner = p.id;
      tab.textContent = p.name;
      tabsTrack.appendChild(tab);
    }
    if (cardsTrack) {
      const card = document.createElement('article');
      card.className = 'footprint__card swiper-slide';
      card.dataset.partner = p.id;

      const body = document.createElement('div');
      body.className = 'footprint__card-body';
      const title = document.createElement('h4');
      title.className = 'footprint__card-title';
      title.textContent = p.name;
      const text = document.createElement('p');
      text.className = 'footprint__card-text';
      text.textContent = p.text;
      body.append(title, text);
      card.appendChild(body);

      if (p.link) {
        const link = document.createElement('a');
        link.className = 'footprint__card-link';
        link.href = p.url || '#';
        link.textContent = 'View Project';
        card.appendChild(link);
      }

      const logo = document.createElement('img');
      logo.className = 'footprint__card-logo';
      logo.src = p.logo;
      logo.alt = '';
      card.appendChild(logo);

      cardsTrack.appendChild(card);
    }
    if (selectList) {
      const li = document.createElement('li');
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'footprint__select-option';
      opt.dataset.partner = p.id;
      opt.textContent = p.name;
      li.appendChild(opt);
      selectList.appendChild(li);
    }
  });

  const tabs = Array.from(footprint.querySelectorAll('.footprint__tab'));
  const cards = Array.from(footprint.querySelectorAll('.footprint__card'));
  const selectOptions = footprint.querySelectorAll('.footprint__select-option');

  // Tabs and cards are rendered in the same order, so the two sliders are
  // index-aligned; we still match by `id` so map pins stay in sync too.
  const navOrder = PARTNERS.map((p) => p.id);
  const cardOrder = navOrder;

  const GLOBES = {
    1: './assets/map/globe-with-point.svg',
    2: './assets/map/globe-with-point-2.svg',
  };
  let currentGlobe = '1';
  let syncing = false;

  function updateIndicator() {
    if (!tabsWrap || !tabsIndicator || !tabsEl) return;
    const active = footprint.querySelector('.footprint__tab.is-active');
    if (!active) {
      tabsIndicator.style.opacity = '0';
      return;
    }
    const wrapRect = tabsWrap.getBoundingClientRect();
    const navRect = tabsEl.getBoundingClientRect();
    const tabRect = active.getBoundingClientRect();
    const l = Math.max(tabRect.left, navRect.left);
    const r = Math.min(tabRect.right, navRect.right);
    if (r <= l) {
      tabsIndicator.style.opacity = '0';
      return;
    }
    tabsIndicator.style.left = l - wrapRect.left + 'px';
    tabsIndicator.style.width = r - l + 'px';
    tabsIndicator.style.opacity = '1';
  }

  const updateArrows = () => {
    const prevBtn = footprint.querySelector('.footprint__tabs-prev');
    const nextBtn = footprint.querySelector('.footprint__tabs-next');
    const active = footprint.querySelector('.footprint__tab.is-active');
    const idx = tabs.indexOf(active);
    if (prevBtn)
      prevBtn.style.visibility = idx <= 0 ? 'hidden' : '';
    if (nextBtn)
      nextBtn.style.visibility = idx >= tabs.length - 1 ? 'hidden' : '';
  };

  // Thumbs slider: the company tabs. The active tab is always centred in the
  // viewport (centeredSlides) and the strip snaps one tab per swipe — dragging
  // it changes the active partner one step at a time, like the cards slider.
  // The underline indicator is re-measured every animation frame while the
  // strip is moving, so it tracks the active tab smoothly during both the
  // centring animation and the drag (Swiper only fires setTranslate once for an
  // animated slide, which isn't enough).
  let indicatorRAF = 0;
  let thumbsReady = false;

  // While the user drags the tab strip, find the slide nearest the centre from
  // the live translate so we can switch the active partner mid-drag (Swiper
  // only emits slideChange once the strip settles).
  const centeredTabIndex = (sw) => {
    const grid = sw.snapGrid;
    if (!grid || !grid.length) return sw.activeIndex;
    const pos = -sw.translate;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < grid.length; i++) {
      const dist = Math.abs(grid[i] - pos);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  };

  const trackIndicator = () => {
    updateIndicator();
    indicatorRAF = requestAnimationFrame(trackIndicator);
  };
  const stopIndicator = () => {
    if (indicatorRAF) cancelAnimationFrame(indicatorRAF);
    indicatorRAF = 0;
    updateIndicator();
  };
  const thumbsSwiper = new Swiper(tabsEl, {
    slidesPerView: 'auto',
    spaceBetween: 40,
    centeredSlides: true,
    centeredSlidesBounds: true,
    simulateTouch: true,
    grabCursor: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    on: {
      slideChange: (sw) => {
        if (syncing || !thumbsReady) return;
        const partner = navOrder[sw.activeIndex];
        if (partner) activatePartner(partner);
      },
      // `sliderMove` fires only while the strip is actually being dragged — a
      // plain tap never triggers it, so this can't fight the tab click handler.
      sliderMove: (sw) => {
        if (!thumbsReady) return;
        const partner = navOrder[centeredTabIndex(sw)];
        if (!partner) return;
        const active = footprint.querySelector('.footprint__tab.is-active');
        if (active && active.dataset.partner === partner) return;
        activatePartner(partner, 'thumbsDrag');
      },
      setTranslate: updateIndicator,
      transitionStart: trackIndicator,
      transitionEnd: stopIndicator,
      resize: updateIndicator,
    },
  });
  thumbsReady = true;

  // Main slider: the description cards.
  const cardsSwiper = new Swiper(cardsEl, {
    slidesPerView: 1,
    spaceBetween: 24,
    autoHeight: true,
    speed: 350,
    observer: true,
    observeParents: true,
    on: {
      slideChange: () => {
        if (syncing) return;
        const partner = cardOrder[cardsSwiper.activeIndex];
        if (partner) activatePartner(partner, 'cards');
      },
    },
  });

  // `source` tells us which slider triggered the change so we don't fight it:
  //   'cards'      — a card swipe; leave the cards slider where the user put it.
  //   'thumbsDrag' — a live drag of the tab strip; leave the strip alone.
  function activatePartner(partner, source) {
    tabs.forEach((el) =>
      el.classList.toggle('is-active', el.dataset.partner === partner),
    );
    cards.forEach((el) =>
      el.classList.toggle('is-active', el.dataset.partner === partner),
    );

    if (source !== 'thumbsDrag') {
      const tabIdx = navOrder.indexOf(partner);
      if (tabIdx >= 0) {
        syncing = true;
        thumbsSwiper.slideTo(tabIdx);
        syncing = false;
      }
    }

    if (source !== 'cards') {
      const cardIdx = cardOrder.indexOf(partner);
      if (cardIdx >= 0) {
        syncing = true;
        cardsSwiper.slideTo(cardIdx);
        syncing = false;
      }
    }

    updateArrows();
    updateIndicator();

    selectOptions.forEach((el) =>
      el.classList.toggle('is-active', el.dataset.partner === partner),
    );
    const activeOpt = footprint.querySelector(
      '.footprint__select-option[data-partner="' + partner + '"]',
    );
    if (selectCurrent && activeOpt)
      selectCurrent.textContent = activeOpt.textContent;

    const zone = footprint.querySelector(
      '.footprint__zone[data-partner="' + partner + '"]',
    );
    const globeId = zone && zone.dataset.globe ? zone.dataset.globe : '1';
    if (globeImg && GLOBES[globeId] && globeId !== currentGlobe) {
      currentGlobe = globeId;
      globeImg.style.opacity = '0';
      setTimeout(() => {
        globeImg.src = GLOBES[globeId];
        globeImg.style.opacity = '1';
      }, 180);
    }
    zones.forEach((z) => {
      z.style.display = (z.dataset.globe || '1') === globeId ? '' : 'none';
    });
    if (zone && marker) {
      marker.style.left = zone.style.left;
      marker.style.top = zone.style.top;
      marker.dataset.partner = partner;
      if (markerLetter) markerLetter.textContent = zone.dataset.letter || '';
    }
    if (zone && glow) {
      glow.classList.remove('is-shown');
      setTimeout(() => {
        glow.style.left = zone.style.left;
        glow.style.top = zone.style.top;
        glow.classList.add('is-shown');
      }, 200);
    }
  }

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => activatePartner(tab.dataset.partner)),
  );
  zones.forEach((zone) =>
    zone.addEventListener('click', () => activatePartner(zone.dataset.partner)),
  );

  const initialTab =
    footprint.querySelector('.footprint__tab.is-active') || tabs[0];
  if (initialTab) activatePartner(initialTab.dataset.partner);

  // The tab labels use a custom heading font that loads asynchronously. Swiper
  // measures the slide widths on init (before the font is ready), so the active
  // tab ends up centred against stale widths and the strip looks pre-scrolled.
  // Recompute and re-align to the active tab once layout has settled.
  const refreshThumbs = () => {
    thumbsSwiper.update();
    const active = footprint.querySelector('.footprint__tab.is-active');
    const idx = tabs.indexOf(active);
    if (idx >= 0) {
      syncing = true;
      thumbsSwiper.slideTo(idx, 0);
      syncing = false;
    }
    updateIndicator();
  };
  window.addEventListener('load', refreshThumbs);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refreshThumbs);
  }

  window.addEventListener('resize', updateIndicator);
  window.addEventListener('load', updateIndicator);

  const step = (dir) => {
    const active = footprint.querySelector('.footprint__tab.is-active');
    const idx = tabs.indexOf(active);
    const target = tabs[idx + dir];
    if (target) activatePartner(target.dataset.partner);
  };
  const prevBtn = footprint.querySelector('.footprint__tabs-prev');
  const nextBtn = footprint.querySelector('.footprint__tabs-next');
  if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => step(1));

  const selectTrigger = footprint.querySelector('.footprint__select-trigger');
  if (selectTrigger && select) {
    selectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      select.classList.toggle('is-open');
      selectTrigger.setAttribute(
        'aria-expanded',
        select.classList.contains('is-open'),
      );
    });
    document.addEventListener('click', (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove('is-open');
        selectTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    selectOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        activatePartner(opt.dataset.partner);
        select.classList.remove('is-open');
        selectTrigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  footprint.querySelectorAll('.footprint__arrow').forEach((btn) => {
    btn.addEventListener('click', () =>
      step(parseInt(btn.dataset.dir, 10) || 1),
    );
  });
}

const engineered = document.querySelector('.engineered');
if (engineered) {
  const steps = engineered.querySelectorAll('.engineered__step');
  const panels = engineered.querySelectorAll('.engineered__panel');
  const images = engineered.querySelectorAll('.engineered__image');
  const total = steps.length;
  let current = 0;
  let timer;

  const setActive = (idx) => {
    current = (idx + total) % total;
    steps.forEach((el, i) => el.classList.toggle('is-active', i === current));
    panels.forEach((el, i) => el.classList.toggle('is-active', i === current));
    images.forEach((el, i) => el.classList.toggle('is-active', i === current));
  };

  const startAuto = () => {
    clearInterval(timer);
    timer = setInterval(() => setActive(current + 1), 5000);
  };

  steps.forEach((el, i) => {
    el.addEventListener('click', () => {
      setActive(i);
      startAuto();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) startAuto();
        else clearInterval(timer);
      });
    },
    { threshold: 0.2 },
  );
  observer.observe(engineered);
}
