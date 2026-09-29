// =============================================================================
// VYAPAAR SARTHI | GOVERNMENT OF INDIA | MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT
// CORE APPLICATION LOGIC, REAL-TIME AMORTIZATION & MSJE CONCESSION ENGINE
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE MANAGEMENT ---
  let currentMargin = 48000;
  let currentLang = 'en'; // Default to English
  let currentCategory = 'sc'; // Default to Scheduled Caste under MSJE mandate
  let currentBusiness = BUSINESSES_DATA[0]; // Solar Milk Chilling Unit
  let currentUser = {
    name: "Sriram Jena",
    mobile: "9876543210",
    state: "Odisha",
    district: "Khordha",
    area: "Hansapal",
    pin: "751010",
    category: "sc",
    margin: 48000,
    status: "Planning to Start a New Business (First-Time)",
    sector: "Dairy & Value Addition",
    isLoggedIn: false
  };

  let leafletMap = null;
  let repaymentChart = null;
  let fontMultiplier = 1.0;
  let currentTheme = localStorage.getItem('portal_theme') || 'light';
  let activeAudioResponse = "";

  // --- DOM REFERENCES ---
  const inputMarginCapital = document.getElementById('inputMarginCapital');
  const sliderMargin = document.getElementById('sliderMargin');
  const lblMarginValue = document.getElementById('lblMarginValue');
  const dropdownPreferredBiz = document.getElementById('dropdownPreferredBiz');
  const selectLocation = document.getElementById('selectLocation');
  const langSelect = document.getElementById('langSelect');
  const btnVoiceMic = document.getElementById('btnVoiceMic');

  // Modals & Overlays
  const loginModal = document.getElementById('loginModal');
  const btnOpenLogin = document.getElementById('btnOpenLogin');
  const btnCloseLogin = document.getElementById('btnCloseLogin');
  const redirectOverlay = document.getElementById('redirectOverlay');

  const dprModal = document.getElementById('dprModal');
  const btnCloseDPR = document.getElementById('btnCloseDPR');
  const btnPrintDPR = document.getElementById('btnPrintDPR');
  const btnProfileDprDownload = document.getElementById('btnProfileDprDownload');

  const compareModal = document.getElementById('compareModal');
  const btnCloseCompare = document.getElementById('btnCloseCompare');
  const btnNavCompare = document.getElementById('btnNavCompare');
  const btnOpenCompareDock = document.getElementById('btnOpenCompareDock');
  const btnMobileCompare = document.getElementById('btnMobileCompare');

  // Video Demo Elements
  const btnPlayDemo = document.getElementById('btnPlayDemo');
  const btnNextChapter = document.getElementById('btnNextChapter');

  // Sticky Navbar & Mobile Drawer
  const btnMobileNavToggle = document.getElementById('btnMobileNavToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  // --- INITIALIZE APPLICATION ---
  initTheme();
  initFontResizers();
  populateBusinessDropdown();
  populateCatalogGrid();
  setupStateDistrictDropdowns();
  initMap();
  setupTabNavigation();
  setupStickyNavActions();

  // Render MSJE & Feasibility Modules
  renderCategoryCards();
  renderSeasonalCalendar();
  renderBankDirectory();
  setupComparisonTool();
  setupWhatsAppSharing();
  renderBusinessPlansMarquee();
  setupEnterpriseGallery();
  setupHeroVideoPlaylist();

  // Cancel any browser speech synthesis
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  // Initialize Lenis Smooth Scroll & GSAP Animations
  initLenisAndGSAP();

  // Select initial business & calculate
  selectBusiness(BUSINESSES_DATA[0]);

  // Apply initial translations
  updateLanguageTexts();

  // --- HERO BACKGROUND VIDEO PLAYLIST ENGINE ---
  function setupHeroVideoPlaylist() {
    const heroVideo = document.getElementById('heroBgVideo');
    if (!heroVideo) return;

    const playlist = [
      "https://res.cloudinary.com/n0c7bqpd/video/upload/v1790452960/WhatsApp_Video_2026-09-27_at_01.28.53_z97fu1.mp4",
      "https://res.cloudinary.com/n0c7bqpd/video/upload/v1790453491/WhatsApp_Video_2026-09-27_at_01.30.20_j5ffts.mp4"
    ];
    let currentIndex = 0;
    heroVideo.muted = true;

    const playNextVideo = () => {
      currentIndex = (currentIndex + 1) % playlist.length;
      heroVideo.src = playlist[currentIndex];
      heroVideo.load();
      heroVideo.play().catch(err => console.warn('Hero background video auto-play transition:', err));
    };

    heroVideo.addEventListener('ended', playNextVideo);
    heroVideo.addEventListener('error', (e) => {
      console.warn('Hero video failed to load, switching to next in playlist:', e);
      setTimeout(playNextVideo, 1000);
    });
  }

  // --- THEME ENGINE ---
  function initTheme() {
    applyTheme(currentTheme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const theme = e.currentTarget.getAttribute('data-theme');
        applyTheme(theme);
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (currentTheme === 'system') applyTheme('system');
    });
  }

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('portal_theme', theme);
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-theme') === theme);
    });

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }

  // --- ACCESSIBILITY: FONT RESIZER ---
  function initFontResizers() {
    const root = document.documentElement;
    document.getElementById('btnFontInc')?.addEventListener('click', () => {
      if (fontMultiplier < 1.25) {
        fontMultiplier += 0.08;
        root.style.fontSize = `${fontMultiplier * 100}%`;
      }
    });
    document.getElementById('btnFontDec')?.addEventListener('click', () => {
      if (fontMultiplier > 0.85) {
        fontMultiplier -= 0.08;
        root.style.fontSize = `${fontMultiplier * 100}%`;
      }
    });
    document.getElementById('btnFontReset')?.addEventListener('click', () => {
      fontMultiplier = 1.0;
      root.style.fontSize = '100%';
    });
  }

  // --- FIXED RESILIENT GOOGLE MAPS ENGINE ---
  function initMap() {
    const mapContainer = document.getElementById('leafletMap');
    if (!mapContainer) return;

    const hansapalCoords = { lat: 20.3155, lng: 85.8722 };

    try {
      // Initialize Google Map
      googleMap = new google.maps.Map(mapContainer, {
        center: hansapalCoords,
        zoom: 12,
        scrollwheel: false,
        disableDefaultUI: false,
        zoomControl: true
      });

      // Add center marker
      const centerMarker = new google.maps.Marker({
        position: hansapalCoords,
        map: googleMap,
        title: "Pilot Benchmark Cluster",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#0b3b60",
          fillOpacity: 1,
          strokeColor: "#ff9933",
          strokeWeight: 2
        },
        label: {
          text: "⚖️",
          color: "white",
          fontSize: "12px"
        }
      });

      // Add center marker popup (info window)
      const centerInfoWindow = new google.maps.InfoWindow({
        content: '<strong>Pilot Benchmark Cluster</strong><br>Hansapal Junction, NH-16 Axis, Khordha (751010)<br>Coordinates: 20.3155° N, 85.8722° E'
      });

      centerMarker.addListener('click', () => {
        centerInfoWindow.open(googleMap, centerMarker);
      });

      // Open center popup by default
      centerInfoWindow.open(googleMap, centerMarker);

      // Add 5km catchment circle (green)
      const catchment5km = new google.maps.Circle({
        strokeColor: '#10b981',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#10b981',
        fillOpacity: 0.14,
        map: googleMap,
        center: hansapalCoords,
        radius: 5000 // 5km in meters
      });

      const catchment5kmInfoWindow = new google.maps.InfoWindow({
        content: '<strong>5 km Immediate Market Catchment</strong><br>Est. Population: 52,000 across Hansapal, Naharkanta & Pandra'
      });

      catchment5km.addListener('click', () => {
        catchment5kmInfoWindow.open(googleMap, catchment5km);
      });

      // Add 10km catchment circle (orange)
      const catchment10km = new google.maps.Circle({
        strokeColor: '#f59e0b',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        strokeDashArray: [5, 8],
        fillColor: '#f59e0b',
        fillOpacity: 0.05,
        map: googleMap,
        center: hansapalCoords,
        radius: 10000 // 10km in meters
      });

      const catchment10kmInfoWindow = new google.maps.InfoWindow({
        content: '<strong>10 km Broader Urban Catchment</strong><br>Regional Reach: 2,10,000'
      });

      catchment10km.addListener('click', () => {
        catchment10kmInfoWindow.open(googleMap, catchment10km);
      });

      // Add competitor POI markers (red)
      if (typeof COMPETITOR_POIS !== 'undefined') {
        COMPETITOR_POIS.forEach(poi => {
          if (poi.lat && poi.lon) {
            const poiMarker = new google.maps.Marker({
              position: { lat: poi.lat, lng: poi.lon },
              map: googleMap,
              title: poi.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: '#ef4444',
                fillOpacity: 0.85,
                strokeColor: '#ef4444',
                strokeWeight: 1
              }
            });

            const poiInfoWindow = new google.maps.InfoWindow({
              content: `<strong>${poi.name}</strong><br>Sector: ${poi.type}`
            });

            poiMarker.addListener('click', () => {
              poiInfoWindow.open(googleMap, poiMarker);
            });
          }
        });
      }

      // Handle map resize on tab show
      setTimeout(() => {
        if (googleMap) {
          google.maps.event.trigger(googleMap, 'resize');
          googleMap.setCenter(hansapalCoords);
        }
      }, 500);

    } catch (err) {
      console.warn("Google Maps initialization fallback:", err);
      // Fallback message in the map container
      mapContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Map loading failed. Please check your internet connection and Google Maps API key.</div>';
    }
  }

  // --- CONTINUOUS BUSINESS PLANS CAROUSEL TICKER (RIGHT TO LEFT) - DESIGN SHOWCASE ---
  function renderBusinessPlansMarquee() {
    const track = document.getElementById('tickerMarqueeTrack');
    if (!track || typeof BUSINESSES_DATA === 'undefined') return;

    // Render 32 items twice to create an infinite, seamless continuous marquee loop
    const fullList = [...BUSINESSES_DATA, ...BUSINESSES_DATA];
    
    track.innerHTML = fullList.map((biz) => {
      return `
        <div class="biz-circle-item" title="${biz.name}" aria-label="${biz.name}">
          <div class="biz-circle-ring">
            <div class="biz-circle-avatar">
              <img src="${biz.image_url}" alt="${biz.name}" class="biz-circle-img" loading="lazy" onerror="this.src='assets/dairy_thumb.jpg'" />
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- MSJE BENEFICIARY CATEGORY SELECTOR CARDS ---
  function renderCategoryCards() {
    const grid = document.getElementById('categoryCardsGrid');
    if (!grid || typeof MSJE_CATEGORIES === 'undefined') return;
    grid.innerHTML = '';
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

    const icons = {
      sc: 'fa-shield-halved',
      st: 'fa-tree',
      obc: 'fa-scale-balanced',
      divyangjan: 'fa-wheelchair',
      women_shg: 'fa-person-dress',
      general: 'fa-wheat-awn'
    };

    const catKeyMap = {
      sc: { title: 'catScSt', desc: 'catScStDesc' },
      st: { title: 'catScSt', desc: 'catScStDesc' },
      obc: { title: 'catObc', desc: 'catObcDesc' },
      divyangjan: { title: 'catDivyangjan', desc: 'catDivyangjanDesc' },
      women_shg: { title: 'catWomen', desc: 'catWomenDesc' },
      general: { title: 'catEws', desc: 'catEwsDesc' }
    };

    Object.values(MSJE_CATEGORIES).forEach(cat => {
      const card = document.createElement('div');
      card.className = `category-card ${cat.id === currentCategory ? 'active' : ''}`;
      card.setAttribute('data-cat-id', cat.id);

      const mapping = catKeyMap[cat.id] || { title: 'catEws', desc: 'catEwsDesc' };
      const catTitle = dict[mapping.title] || cat.name.split('(')[0];
      const catDesc = dict[mapping.desc] || cat.corporation.split('(')[0];

      card.innerHTML = `
        <div class="cat-head">
          <i class="fa-solid ${icons[cat.id] || 'fa-user'} text-blue"></i>
          <span>${catTitle}</span>
        </div>
        <div class="cat-corp">${catDesc}</div>
        <div class="cat-perks">
          <span class="badge-concession"><i class="fa-solid fa-percent"></i> ${Math.abs(cat.rate_concession)}% Concessional Rate</span>
          <span class="badge-concession" style="color:#0284c7; background:#f0f9ff;"><i class="fa-solid fa-gift"></i> ${cat.subsidy_pct}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        currentCategory = cat.id;
        currentUser.category = cat.id;
        updateFinancialUI();
      });

      grid.appendChild(card);
    });
  }
  // --- 12-MONTH SEASONAL DEMAND & OPERATIONAL CALENDAR ---
  function renderSeasonalCalendar() {
    const grid = document.getElementById('seasonalMonthsGrid');
    const noteEl = document.getElementById('txtCalendarNote');
    if (!grid || typeof SEASONAL_CALENDAR_DATA === 'undefined') return;
    grid.innerHTML = '';

    const showPlaceholder = () => {
      document.querySelectorAll('.month-cal-card').forEach(c => c.classList.remove('active'));
      if (!noteEl) return;
      noteEl.innerHTML = `
        <div class="cal-placeholder-card">
          <div class="cal-placeholder-icon"><i class="fa-solid fa-calendar-days text-orange"></i></div>
          <h4>Seasonal Demand &amp; Business Opportunities</h4>
          <p>Click any month (Jan – Dec) in the 4×3 matrix on the left to reveal season-specific business ideas, images, 10% margin requirements, and cash flow strategies.</p>
          <div class="cal-placeholder-tags">
            <span><i class="fa-solid fa-fire text-orange"></i> 32 Vetted Enterprises</span>
            <span><i class="fa-solid fa-shield-halved text-green"></i> 10% Margin Capital</span>
            <span><i class="fa-solid fa-landmark-flag text-blue"></i> MSJE Scheme Alignment</span>
          </div>
        </div>
      `;
    };

    const updateActiveMonth = (m, card) => {
      document.querySelectorAll('.month-cal-card').forEach(c => c.classList.remove('active'));
      if (card) card.classList.add('active');

      if (!noteEl) return;

      const demandBadge = `<span class="badge-cal-pill ${m.status}">${m.demand} Demand</span>`;

      const featuredListHtml = (m.featuredBusinesses || []).map(b => `
        <div class="cal-biz-card-item">
          <div class="cal-biz-thumb-wrap">
            <img src="${b.image}" alt="${b.name}" class="cal-biz-thumb" loading="lazy" onerror="this.src='assets/dairy_thumb.jpg'">
            <span class="cal-biz-demand-tag">${b.demandTag || 'High Demand'}</span>
          </div>
          <div class="cal-biz-content">
            <div class="cal-biz-item-top">
              <h5 class="cal-biz-name">${b.name}</h5>
              <span class="cal-biz-cat-badge">${b.category}</span>
            </div>
            <p class="cal-biz-summary">${b.summary}</p>
            <div class="cal-biz-footer">
              <span class="cal-biz-meta-pill"><i class="fa-solid fa-wallet text-green"></i> 10% Margin: <strong>${b.margin}</strong></span>
              <span class="cal-biz-meta-pill"><i class="fa-solid fa-chart-line text-blue"></i> Est: <strong>${b.profit}</strong></span>
              <button class="cal-biz-select-btn" data-biz-id="${b.bizId}" title="Select enterprise and inspect DPR plan">
                <span>Explore Plan</span> <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      const otherChipsHtml = (m.otherBusinesses || []).map(ob => {
        if (typeof ob === 'string') {
          return `<span class="cal-biz-chip other"><i class="fa-solid fa-briefcase"></i> ${ob}</span>`;
        } else {
          return `<span class="cal-biz-chip other"><i class="fa-solid ${ob.icon || 'fa-briefcase'} text-blue"></i> ${ob.name}</span>`;
        }
      }).join('');

      noteEl.innerHTML = `
        <div class="cal-detail-card">
          <div class="cal-detail-header">
            <div class="cal-detail-title-wrap">
              <div class="cal-detail-month">
                <i class="fa-solid fa-calendar-check text-green"></i> ${m.name} (${m.month})
              </div>
              <span class="cal-detail-season">${m.season || ''}</span>
              ${demandBadge}
            </div>
            <button class="cal-close-btn" id="btnCloseCalDetail" title="Close detail view" aria-label="Close detail section">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="cal-advisory-row">
            <i class="fa-solid fa-lightbulb text-orange"></i>
            <div>
              <strong>Seasonal Strategy &amp; Cash Flow Guidance:</strong>
              <div class="cal-advisory-text">${m.ideas || m.notes}</div>
            </div>
          </div>

          <div class="cal-biz-list-section">
            <div class="cal-biz-list-header">
              <i class="fa-solid fa-fire text-orange"></i> <strong>Seasonal Demanded Businesses &amp; Ideas:</strong>
            </div>
            <div class="cal-biz-list">
              ${featuredListHtml}
            </div>
          </div>

          <div class="cal-other-biz-section">
            <div class="cal-other-title">
              <i class="fa-solid fa-layer-group text-blue"></i> <strong>Other Demanded Businesses in ${m.name}:</strong>
            </div>
            <div class="cal-other-chips-wrap">
              ${otherChipsHtml}
            </div>
          </div>
        </div>
      `;

      // Attach Close Button Event
      const closeBtn = noteEl.querySelector('#btnCloseCalDetail');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showPlaceholder();
        });
      }

      // Attach "Explore Plan" button click handlers
      noteEl.querySelectorAll('.cal-biz-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const bizId = btn.getAttribute('data-biz-id');
          const targetBiz = BUSINESSES_DATA.find(item => item.id === bizId);
          if (targetBiz) {
            selectBusiness(targetBiz);
            const secCalc = document.getElementById('secFeasibilityModule') || document.getElementById('secOverview');
            secCalc?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    };

    SEASONAL_CALENDAR_DATA.forEach((m, idx) => {
      const card = document.createElement('div');
      card.className = `month-cal-card ${idx === 0 ? 'active' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${m.name} - ${m.demand} demand`);

      card.innerHTML = `
        <div class="m-name">${m.month}</div>
        <span class="badge-cal-pill ${m.status}">${m.demand}</span>
      `;

      // Hover event
      card.addEventListener('mouseenter', () => {
        updateActiveMonth(m, card);
      });

      // Click event
      card.addEventListener('click', () => {
        updateActiveMonth(m, card);
      });

      card.addEventListener('focus', () => {
        updateActiveMonth(m, card);
      });

      grid.appendChild(card);
    });

    // Render January by default on initialization
    if (SEASONAL_CALENDAR_DATA.length > 0 && grid.children.length > 0) {
      updateActiveMonth(SEASONAL_CALENDAR_DATA[0], grid.children[0]);
    }
  }

  // --- LOCAL BANK BRANCH & SCA DIRECTORY ---
  function renderBankDirectory() {
    const grid = document.getElementById('bankOfficesGrid');
    if (!grid || typeof LOCAL_BANK_SCA_DIRECTORY === 'undefined') return;
    grid.innerHTML = '';

    Object.entries(LOCAL_BANK_SCA_DIRECTORY).forEach(([type, info]) => {
      const card = document.createElement('div');
      card.className = 'bank-office-card';
      card.innerHTML = `
        <div class="b-title"><i class="fa-solid fa-building-columns"></i> ${type}</div>
        <div class="b-branch">${info.title}</div>
        <div class="b-role">${info.role}</div>
        <div class="b-contact"><i class="fa-solid fa-phone"></i> ${info.contact}</div>
        <small class="block text-green font-bold" style="margin-top:0.25rem;"><i class="fa-solid fa-shield"></i> ${info.collateral}</small>
      `;
      grid.appendChild(card);
    });
  }

  // --- SIDE-BY-SIDE BUSINESS COMPARISON TOOL ---
  function setupComparisonTool() {
    const selA = document.getElementById('selectCompareA');
    const selB = document.getElementById('selectCompareB');
    if (!selA || !selB) return;

    selA.innerHTML = '';
    selB.innerHTML = '';

    BUSINESSES_DATA.forEach(b => {
      const optA = document.createElement('option');
      optA.value = b.id;
      optA.textContent = `${b.name} (₹${b.beneficiary_margin_inr.toLocaleString('en-IN')})`;
      selA.appendChild(optA);

      const optB = document.createElement('option');
      optB.value = b.id;
      optB.textContent = `${b.name} (₹${b.beneficiary_margin_inr.toLocaleString('en-IN')})`;
      selB.appendChild(optB);
    });

    selA.value = BUSINESSES_DATA[0].id;
    selB.value = BUSINESSES_DATA[1].id;

    const renderTable = () => {
      const bizA = BUSINESSES_DATA.find(b => b.id === selA.value) || BUSINESSES_DATA[0];
      const bizB = BUSINESSES_DATA.find(b => b.id === selB.value) || BUSINESSES_DATA[1];
      const finA = calculateFinances(bizA.beneficiary_margin_inr);
      const finB = calculateFinances(bizB.beneficiary_margin_inr);

      const container = document.getElementById('compareTableContainer');
      container.innerHTML = `
        <table class="comp-table">
          <thead>
            <tr>
              <th style="width:28%;">Comparison Parameter</th>
              <th style="width:36%; color:#0b3b60;"><i class="fa-solid fa-tag"></i> ${bizA.name.split('&')[0]}</th>
              <th style="width:36%; color:#ea580c;"><i class="fa-solid fa-tag"></i> ${bizB.name.split('&')[0]}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sector / Category</strong></td>
              <td>${bizA.category}</td>
              <td>${bizB.category}</td>
            </tr>
            <tr>
              <td><strong>10% Beneficiary Margin</strong></td>
              <td class="font-bold text-blue">₹ ${bizA.beneficiary_margin_inr.toLocaleString('en-IN')}</td>
              <td class="font-bold text-orange">₹ ${bizB.beneficiary_margin_inr.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td><strong>Total Feasible Project Cost</strong></td>
              <td class="font-bold">₹ ${finA.projectCost.toLocaleString('en-IN')}</td>
              <td class="font-bold">₹ ${finB.projectCost.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td><strong>90% Bank Loan Approved</strong></td>
              <td class="font-bold text-green">₹ ${finA.loanAmount.toLocaleString('en-IN')}</td>
              <td class="font-bold text-green">₹ ${finB.loanAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td><strong>Concessional Interest Rate</strong></td>
              <td>${finA.interestRate}% p.a.</td>
              <td>${finB.interestRate}% p.a.</td>
            </tr>
            <tr>
              <td><strong>Quarterly Repayment EMI</strong></td>
              <td>₹ ${Math.round(finA.quarterlyEmi).toLocaleString('en-IN')} / Qtr</td>
              <td>₹ ${Math.round(finB.quarterlyEmi).toLocaleString('en-IN')} / Qtr</td>
            </tr>
            <tr>
              <td><strong>AI Viability Score</strong></td>
              <td><span class="badge-margin font-bold">${bizA.viability_score}/100</span></td>
              <td><span class="badge-margin font-bold">${bizB.viability_score}/100</span></td>
            </tr>
            <tr>
              <td><strong>Breakeven Timeline</strong></td>
              <td>${bizA.unit_economics ? bizA.unit_economics.breakeven : '6 Months'}</td>
              <td>${bizB.unit_economics ? bizB.unit_economics.breakeven : '5 Months'}</td>
            </tr>
            <tr>
              <td><strong>Action: Select Active Plan</strong></td>
              <td><button class="btn-choose-plan" id="btnChooseA">Activate Plan A <i class="fa-solid fa-check"></i></button></td>
              <td><button class="btn-choose-plan" id="btnChooseB">Activate Plan B <i class="fa-solid fa-check"></i></button></td>
            </tr>
          </tbody>
        </table>
      `;

      document.getElementById('btnChooseA').addEventListener('click', () => {
        selectBusiness(bizA);
        compareModal.classList.remove('active');
        document.querySelector('.tab-btn[data-target="secModule1"]').click();
      });

      document.getElementById('btnChooseB').addEventListener('click', () => {
        selectBusiness(bizB);
        compareModal.classList.remove('active');
        document.querySelector('.tab-btn[data-target="secModule1"]').click();
      });
    };

    selA.addEventListener('change', renderTable);
    selB.addEventListener('change', renderTable);
    renderTable();

    // Modal open / close hooks
    const openModal = () => {
      renderTable();
      compareModal.classList.add('active');
    };
    btnNavCompare?.addEventListener('click', openModal);
    btnOpenCompareDock?.addEventListener('click', openModal);
    btnMobileCompare?.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('open');
      openModal();
    });
    btnCloseCompare?.addEventListener('click', () => compareModal.classList.remove('active'));
  }



  // --- WHATSAPP & SMS ROADMAP SHARING ---
  function setupWhatsAppSharing() {
    const btnShare = document.getElementById('btnProfileShareWhatsApp');
    if (!btnShare) return;

    btnShare.addEventListener('click', () => {
      const fin = calculateFinances(currentMargin);
      const text = `*Vyapaar Sarthi - Micro Enterprise Roadmap*%0A` +
        `🏢 *Enterprise:* ${currentBusiness.name}%0A` +
        `💰 *10% Margin Capital:* ₹${currentMargin.toLocaleString('en-IN')}%0A` +
        `🏛️ *90% Bank Loan:* ₹${fin.loanAmount.toLocaleString('en-IN')}%0A` +
        `📈 *Est. Take-Home Profit:* ₹${document.getElementById('cfTakeHome').textContent}%0A` +
        `📜 *Scheme:* ${currentBusiness.preferable_scheme || fin.schemeName}%0A` +
        `🇮🇳 Certified under Ministry of Social Justice & Empowerment.%0A` +
        `View portal at: http://localhost:8080/`;

      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });
  }

  // --- POPULATE PREFERRED BUSINESSES DROPDOWN ---
  function populateBusinessDropdown() {
    if (dropdownPreferredBiz) {
      dropdownPreferredBiz.innerHTML = '';
      BUSINESSES_DATA.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = `${b.name} (Margin: ₹${b.beneficiary_margin_inr.toLocaleString('en-IN')} | ${b.viability_score}/100)`;
        if (b.id === currentBusiness.id) opt.selected = true;
        dropdownPreferredBiz.appendChild(opt);
      });

      dropdownPreferredBiz.addEventListener('change', (e) => {
        const chosen = BUSINESSES_DATA.find(item => item.id === e.target.value);
        if (chosen) selectBusiness(chosen);
      });
    }

    const trendingPillsContainer = document.getElementById('aiTrendingPills');
    if (trendingPillsContainer) {
      trendingPillsContainer.innerHTML = '';
      const topPicks = [BUSINESSES_DATA[0], BUSINESSES_DATA[1], BUSINESSES_DATA[7], BUSINESSES_DATA[22]];

      topPicks.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'trending-pill-btn';
        btn.innerHTML = `<i class="fa-solid fa-fire text-orange"></i> ${p.name.split('&')[0].substring(0, 20)}... <span class="badge-margin">${p.viability_score}/100</span>`;
        btn.addEventListener('click', () => selectBusiness(p));
        trendingPillsContainer.appendChild(btn);
      });
    }
  }

  // --- SELECT BUSINESS & FULLY UPDATE ALL SECTIONS ---
  function selectBusiness(biz) {
    currentBusiness = biz;
    currentMargin = Math.max(10000, biz.beneficiary_margin_inr || 10000);
    if (inputMarginCapital) inputMarginCapital.value = currentMargin;
    if (sliderMargin) sliderMargin.value = currentMargin;
    if (lblMarginValue) {
      lblMarginValue.innerHTML = `<i class="fa-solid fa-calculator text-blue"></i> Project Cost: ₹${(currentMargin * 10).toLocaleString('en-IN')}`;
    }
    document.querySelectorAll('#quickMarginPresets .quick-margin-chip').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-val')) === currentMargin);
    });
    if (dropdownPreferredBiz) dropdownPreferredBiz.value = biz.id;

    // 1. Update Module 1 Header & Photo
    document.getElementById('badgeCurrentSector').textContent = biz.category;
    document.getElementById('txtCurrentBizTitle').textContent = biz.name;
    document.getElementById('txtCurrentBizSummary').textContent = biz.local_rationale;

    // Sector Photo Switcher
    const photoEl = document.getElementById('imgActiveBizPhoto');
    if (photoEl) {
      if (biz.category.includes('Dairy')) {
        photoEl.src = 'assets/dairy_thumb.jpg';
      } else if (biz.category.includes('Clean Energy') || biz.category.includes('Automotive')) {
        photoEl.src = 'assets/ev_thumb.jpg';
      } else if (biz.category.includes('Agri') || biz.category.includes('Food')) {
        photoEl.src = 'assets/mushroom_thumb.jpg';
      } else {
        photoEl.src = 'assets/dairy_thumb.jpg';
      }
    }

    // 2. Update Viability Score
    const scoreEl = document.getElementById('viabilityScore');
    const tagEl = document.getElementById('viabilityTag');
    const scoreVal = biz.viability_score || 88;
    
    animateScoreCounter(scoreEl, parseInt(scoreEl.textContent) || 50, scoreVal, 600);
    tagEl.textContent = biz.viability_tag || "HIGH VIABILITY";
    if (scoreVal >= 90) {
      tagEl.className = "viability-label text-green";
    } else if (scoreVal >= 80) {
      tagEl.className = "viability-label text-orange";
    } else {
      tagEl.className = "viability-label text-blue";
    }

    // 3. Update Unit Economics
    if (biz.unit_economics) {
      document.getElementById('econDailyOutput').textContent = biz.unit_economics.daily_output;
      document.getElementById('econUnitCost').textContent = biz.unit_economics.unit_cost;
      document.getElementById('econSellingPrice').textContent = biz.unit_economics.selling_price;
      document.getElementById('econMonthlyProfit').textContent = biz.unit_economics.monthly_profit;
      document.getElementById('econBreakeven').textContent = biz.unit_economics.breakeven;
    }

    // 4. Update SWOT Matrix
    if (biz.swot) {
      populateList('swotStrengths', biz.swot.strengths);
      populateList('swotWeaknesses', biz.swot.weaknesses);
      populateList('swotOpportunities', biz.swot.opportunities);
      populateList('swotThreats', biz.swot.threats);
    }

    // 5. Update Threat Radar
    if (biz.threats_radar) {
      const threatsContainer = document.getElementById('threatsRadarGrid');
      threatsContainer.innerHTML = '';
      biz.threats_radar.forEach(t => {
        const item = document.createElement('div');
        item.className = 'threat-item';
        const colorClass = t.level === 'High' ? 'text-red' : (t.level === 'Moderate' ? 'text-orange' : 'text-blue');
        const iconClass = t.threat.includes('Heat') ? 'fa-temperature-arrow-up' : (t.threat.includes('Monsoon') || t.threat.includes('Water') ? 'fa-water' : 'fa-triangle-exclamation');
        item.innerHTML = `
          <div class="threat-icon"><i class="fa-solid ${iconClass} ${colorClass}"></i></div>
          <div>
            <h5>${t.threat} <span class="badge-threat-lvl ${colorClass}">(${t.level})</span></h5>
            <p><strong>Countermeasure:</strong> ${t.mitigation}</p>
          </div>
        `;
        threatsContainer.appendChild(item);
      });
    }

    // 6. Recalculate Financials, Quarters Amortization & Scheme Routing
    updateFinancialUI();

    // 7. Update Citizen Dashboard values
    updateUserProfileData();

    // 8. Multi-Lingual Speech Announcement
    announceBusinessSelection(biz);

    // 9. Update Active Highlight in Carousel Marquee
    try {
      document.querySelectorAll('#tickerMarqueeTrack .biz-circle-item').forEach(el => {
        if (el.getAttribute('data-biz-id') === biz.id) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    } catch (e) {}
  }

  function populateList(elementId, items) {
    const el = document.getElementById(elementId);
    if (!el || !items) return;
    el.innerHTML = '';
    items.forEach(itemText => {
      const li = document.createElement('li');
      li.textContent = itemText;
      el.appendChild(li);
    });
  }

  function animateScoreCounter(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      el.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  // --- MODULE 2: FINANCIAL CALCULATOR & MSJE CONCESSION ROUTER ENGINE ---
  function calculateFinances(margin) {
    const projectCost = margin / 0.10; // 10% Margin rule
    const loanAmount = projectCost * 0.90; // 90% Concessional loan

    // Fetch active MSJE Category Concessions
    const cat = (typeof MSJE_CATEGORIES !== 'undefined' && MSJE_CATEGORIES[currentCategory]) 
      ? MSJE_CATEGORIES[currentCategory] 
      : { rate_concession: -2.0, corporation: "NSFDC Channel", subsidy_pct: "35%–40% Subsidy" };

    let schemeName, logicTag, baseInterestRate, tenureYears, moratMonths, moratQuarters, totalQuarters;

    // Logic A vs. Logic B Routing
    if (projectCost <= 140000) {
      schemeName = "Micro Finance Scheme";
      logicTag = "LOGIC A: Micro Finance Tier (Project Cost ≤ ₹1.40 Lakh)";
      baseInterestRate = 6.5;
      tenureYears = 3;
      moratMonths = 3;
      moratQuarters = 1;
      totalQuarters = 12;
    } else {
      schemeName = "Term Loan Scheme";
      logicTag = "LOGIC B: Term Loan Tier (₹1.40 Lakh < Project Cost ≤ ₹50.00 Lakh)";
      baseInterestRate = 8.0;
      tenureYears = 7;
      moratMonths = 6;
      moratQuarters = 2;
      totalQuarters = 28;
    }

    // Apply MSJE Category Concession (e.g. -2.0% for SC)
    const effectiveInterestRate = Math.max(4.0, baseInterestRate + cat.rate_concession);

    const repayQuarters = totalQuarters - moratQuarters;
    const quarterlyRate = (effectiveInterestRate / 100) / 4;

    const numerator = quarterlyRate * Math.pow(1 + quarterlyRate, repayQuarters);
    const denominator = Math.pow(1 + quarterlyRate, repayQuarters) - 1;
    const quarterlyEmi = loanAmount * (numerator / denominator);
    const monthlyEquivalent = quarterlyEmi / 3;

    const totalRepaid = quarterlyEmi * repayQuarters;
    const totalInterest = totalRepaid - loanAmount;

    const capex70 = projectCost * 0.70;
    const opex30 = projectCost * 0.30;

    const schedule = [];
    let balance = loanAmount;

    for (let q = 1; q <= moratQuarters; q++) {
      schedule.push({
        q,
        timeline: `Quarter ${q} (Month ${q * 3 - 2}–${q * 3})`,
        status: 'Moratorium (Repayment Holiday)',
        emi: 0,
        principal: 0,
        interest: 0,
        balance
      });
    }

    for (let q = moratQuarters + 1; q <= totalQuarters; q++) {
      const qInterest = balance * quarterlyRate;
      const qPrincipal = quarterlyEmi - qInterest;
      balance -= qPrincipal;
      if (balance < 0) balance = 0;

      schedule.push({
        q,
        timeline: `Quarter ${q} (Month ${q * 3 - 2}–${q * 3})`,
        status: 'Active Repayment',
        emi: quarterlyEmi,
        principal: qPrincipal,
        interest: qInterest,
        balance
      });
    }

    return {
      margin,
      projectCost,
      loanAmount,
      schemeName,
      logicTag,
      interestRate: effectiveInterestRate,
      tenureYears,
      moratMonths,
      moratQuarters,
      totalQuarters,
      quarterlyEmi,
      monthlyEquivalent,
      totalInterest,
      totalRepaid,
      capex70,
      opex30,
      catInfo: cat,
      schedule
    };
  }

  // --- UPDATE UI WITH CALCULATED FINANCES & CASH FLOW ---
  function updateFinancialUI() {
    const fin = calculateFinances(currentMargin);

    // Safely update DOM elements
    if (lblMarginValue) lblMarginValue.textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;
    const setText = (id, text) => { const e = document.getElementById(id); if(e) e.textContent = text; };
    const setHtml = (id, html) => { const e = document.getElementById(id); if(e) e.innerHTML = html; };

    setText('valMargin10', `₹ ${currentMargin.toLocaleString('en-IN')}`);
    setText('valTotalCost', `₹ ${fin.projectCost.toLocaleString('en-IN')}`);
    setText('valLoan90', `₹ ${fin.loanAmount.toLocaleString('en-IN')}`);

    // Scheme Router Banner
    setText('badgeLogic', `${fin.logicTag} | ${fin.catInfo.name}`);
    setText('txtSchemeName', `${currentBusiness.preferable_scheme || fin.schemeName} (${fin.interestRate}% Interest, ${fin.tenureYears} Years)`);
    setText('txtSchemeDesc', `Project cost ₹${fin.projectCost.toLocaleString('en-IN')} routed to ${fin.catInfo.corporation} with a ${fin.moratMonths}-month moratorium holiday and ${fin.catInfo.subvention}.`);

    setText('txtSubsidyBadge', fin.catInfo.subsidy_pct);
    setText('txtApexCorp', fin.catInfo.corporation);

    setHtml('badgeMoratoriumMonths', `<i class="fa-solid fa-clock-rotate-left"></i> Moratorium: ${fin.moratMonths} Months (Quarters 1–${fin.moratQuarters} = ₹0 EMI)`);

    // Repayment Summary
    setText('valQuarterlyEmi', `₹ ${Math.round(fin.quarterlyEmi).toLocaleString('en-IN')} / Quarter`);
    setText('valMonthlyEmi', `₹ ${Math.round(fin.monthlyEquivalent).toLocaleString('en-IN')} / Month`);
    setText('valTotalInterest', `₹ ${Math.round(fin.totalInterest).toLocaleString('en-IN')}`);
    setText('valTotalRepaid', `₹ ${Math.round(fin.totalRepaid).toLocaleString('en-IN')}`);

    // Capex vs Opex
    document.getElementById('valCapex70').textContent = `₹ ${Math.round(fin.capex70).toLocaleString('en-IN')}`;
    document.getElementById('valOpex30').textContent = `₹ ${Math.round(fin.opex30).toLocaleString('en-IN')}`;
    document.getElementById('txtSubsidyDetails').innerHTML = 
      `Recommended Concessional Channel: <strong>${fin.catInfo.corporation}</strong>. Eligible for ${fin.catInfo.subsidy_pct}.`;

    // Monthly Net Take-Home Cash Flow Calculation
    const grossSales = Math.round(fin.projectCost * 0.165);
    const rawMaterial = Math.round(grossSales * 0.46);
    const utilities = Math.round(grossSales * 0.07);
    const monthlyEmi = Math.round(fin.monthlyEquivalent);
    const netTakeHome = Math.max(12000, grossSales - rawMaterial - utilities - monthlyEmi);

    setText('cfGrossSales', `₹ ${grossSales.toLocaleString('en-IN')}`);
    setText('cfRawMaterial', `₹ ${rawMaterial.toLocaleString('en-IN')}`);
    setText('cfUtilities', `₹ ${utilities.toLocaleString('en-IN')}`);
    setText('cfMonthlyEmi', `₹ ${monthlyEmi.toLocaleString('en-IN')}`);
    setText('cfTakeHome', `₹ ${netTakeHome.toLocaleString('en-IN')} / mo`);

    // Update Eligibility Criteria & Required Documents Checklist
    updateSchemeCriteriaDocs();

    // Update Schedule Table
    const tbody = document.getElementById('tbodySchedule');
    if (tbody) {
      tbody.innerHTML = '';
      fin.schedule.forEach(row => {
        const tr = document.createElement('tr');
        const isMorat = row.status.includes('Moratorium');
        tr.style.background = isMorat ? 'rgba(245, 158, 11, 0.08)' : 'transparent';
        tr.innerHTML = `
          <td><strong>Q${row.q}</strong></td>
          <td>${row.timeline}</td>
          <td><span class="${isMorat ? 'badge-moratorium' : 'badge-margin'}">${row.status}</span></td>
          <td class="font-bold">${isMorat ? '₹0.00' : '₹ ' + Math.round(row.emi).toLocaleString('en-IN')}</td>
          <td>${isMorat ? '₹0.00' : '₹ ' + Math.round(row.principal).toLocaleString('en-IN')}</td>
          <td>${isMorat ? '₹0.00' : '₹ ' + Math.round(row.interest).toLocaleString('en-IN')}</td>
          <td class="font-bold">₹ ${Math.round(row.balance).toLocaleString('en-IN')}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Update Chart.js
    updateChart(fin);
  }

  function updateSchemeCriteriaDocs() {
    const listElig = document.getElementById('listEligibilityCriteria');
    const listDocs = document.getElementById('listMandatoryDocs');
    listElig.innerHTML = '';
    listDocs.innerHTML = '';

    const defaultEligibility = [
      "Permanent resident of India with verifiable rural/peri-urban domicile certificate.",
      "Eligible beneficiary under Ministry of Social Justice & Empowerment target categories.",
      "Possession of operational shed / commercial site lease agreement (minimum 3 years).",
      "Willingness to contribute mandatory 10% Margin Money from personal savings or SHG corpus."
    ];

    const defaultDocs = [
      "Aadhaar Card & PAN Card (Authenticated via UIDAI DigiLocker).",
      "Gram Panchayat / LGD Domicile & Caste/Category Certificate.",
      "Three Proforma Invoices / Machinery Quotations from certified MSME vendors.",
      "Bank Statement of last 6 months & Bank-Ready Detailed Project Report (DPR)."
    ];

    const eligItems = currentBusiness.eligibility_criteria || defaultEligibility;
    const docsItems = currentBusiness.mandatory_documents_checklist || defaultDocs;

    eligItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>${item}</span>`;
      listElig.appendChild(li);
    });

    docsItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-file-circle-check text-blue"></i> <span>${item}</span>`;
      listDocs.appendChild(li);
    });
  }

  // --- CHART.JS VISUALIZATION ---
  function updateChart(fin) {
    const ctx = document.getElementById('chartRepayment');
    if (!ctx) return;

    const labels = fin.schedule.map(s => `Q${s.q}`);
    const balances = fin.schedule.map(s => Math.round(s.balance));
    const emis = fin.schedule.map(s => Math.round(s.emi));

    if (repaymentChart) repaymentChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? '#94a3b8' : '#475569';

    repaymentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Outstanding Principal Balance (₹)',
            data: balances,
            borderColor: '#0b3b60',
            backgroundColor: 'rgba(11, 59, 96, 0.1)',
            fill: true,
            tension: 0.25,
            yAxisID: 'y'
          },
          {
            label: 'Quarterly Repayment EMI (₹)',
            data: emis,
            borderColor: '#ea580c',
            backgroundColor: '#ea580c',
            borderWidth: 2,
            type: 'bar',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { family: 'Inter', size: 11 } } }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: {
            position: 'left',
            grid: { color: gridColor },
            ticks: { color: textColor, callback: val => '₹' + (val / 1000) + 'k' }
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: textColor, callback: val => '₹' + (val / 1000) + 'k' }
          }
        }
      }
    });
  }

  // --- MARGIN TEXT & NUMBER INPUT EVENT LISTENERS ---
  if (inputMarginCapital) {
    inputMarginCapital.addEventListener('input', (e) => {
      let val = parseInt(e.target.value);
      if (isNaN(val)) val = 10000;
      currentMargin = val;
      if (lblMarginValue) {
        lblMarginValue.innerHTML = `<i class="fa-solid fa-calculator text-blue"></i> Project Cost: ₹${(Math.max(10000, currentMargin) * 10).toLocaleString('en-IN')}`;
      }
      document.querySelectorAll('#quickMarginPresets .quick-margin-chip').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-val')) === currentMargin);
      });
      if (currentMargin >= 10000) {
        updateFinancialUI();
      }
    });

    inputMarginCapital.addEventListener('change', (e) => {
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 10000) {
        val = 10000; // Minimum margin of 10,000
        inputMarginCapital.value = val;
      }
      currentMargin = val;
      if (lblMarginValue) {
        lblMarginValue.innerHTML = `<i class="fa-solid fa-calculator text-blue"></i> Project Cost: ₹${(currentMargin * 10).toLocaleString('en-IN')}`;
      }
      updateFinancialUI();
    });
  }

  if (sliderMargin) {
    sliderMargin.addEventListener('input', (e) => {
      currentMargin = Math.max(10000, parseInt(e.target.value) || 10000);
      if (inputMarginCapital) inputMarginCapital.value = currentMargin;
      if (lblMarginValue) {
        lblMarginValue.innerHTML = `<i class="fa-solid fa-calculator text-blue"></i> Project Cost: ₹${(currentMargin * 10).toLocaleString('en-IN')}`;
      }
      updateFinancialUI();
    });
  }

  // Quick Margin Presets
  document.querySelectorAll('#quickMarginPresets .quick-margin-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-val')) || 10000;
      currentMargin = Math.max(10000, val);
      if (inputMarginCapital) inputMarginCapital.value = currentMargin;
      if (sliderMargin) sliderMargin.value = currentMargin;
      if (lblMarginValue) {
        lblMarginValue.innerHTML = `<i class="fa-solid fa-calculator text-blue"></i> Project Cost: ₹${(currentMargin * 10).toLocaleString('en-IN')}`;
      }
      document.querySelectorAll('#quickMarginPresets .quick-margin-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateFinancialUI();
    });
  });

  // --- LOCATION SELECTOR LISTENER ---
  if (selectLocation) {
    selectLocation.addEventListener('change', (e) => {
      const loc = e.target.value;
      if (!leafletMap) return;

      const coords = {
        hansapal: [20.3155, 85.8722],
        bodhgaya: [24.6961, 84.9869],
        sarnath: [25.3762, 83.0227],
        baramati: [18.1517, 74.5772],
        singur: [22.8126, 88.2323],
        alanganallur: [10.0433, 78.0935],
        wardhannapet: [17.7667, 79.6000]
      };

      if (coords[loc]) leafletMap.flyTo(coords[loc], 12);
    });
  }

  // --- POPULATE 32 ENTERPRISES CATALOG GRID ---
  function populateCatalogGrid() {
    const grid = document.getElementById('catalogGrid');
    if (!grid || typeof BUSINESSES_DATA === 'undefined') return;
    grid.innerHTML = '';
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

    BUSINESSES_DATA.forEach(b => {
      const card = document.createElement('div');
      card.className = `catalog-card ${currentBusiness && currentBusiness.id === b.id ? 'active-selected' : ''}`;
      card.setAttribute('data-cat', b.sector || b.category);
      card.innerHTML = `
        <div class="catalog-card-thumb-wrap">
          <img src="${b.image_url || 'assets/dairy_thumb.jpg'}" alt="${b.name}" class="catalog-card-img" loading="lazy" />
          <span class="catalog-card-sector-pill">${b.sector || 'Micro-Enterprise'}</span>
          <span class="catalog-card-score-pill">${b.viability_score}/100</span>
        </div>
        <div class="catalog-card-body">
          <h4 class="catalog-card-title">${b.name}</h4>
          <p class="catalog-card-desc">${b.local_rationale ? b.local_rationale.substring(0, 105) + '...' : ''}</p>
          <div class="catalog-card-meta">
            <div class="catalog-card-cost">
              <span class="block text-muted">10% Margin:</span>
              <strong>₹ ${b.beneficiary_margin_inr.toLocaleString('en-IN')}</strong>
            </div>
            <button class="catalog-select-btn" type="button">
              <i class="fa-solid fa-chart-line"></i> <span>${dict['btnSelectEnterprise'] || 'Analyze Feasibility'}</span>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        selectBusiness(b);
        const tabBtn = document.querySelector('.tab-btn[data-target="secModule1"]');
        if (tabBtn) tabBtn.click();
        const secOverview = document.getElementById('secOverview');
        if (secOverview) secOverview.scrollIntoView({ behavior: 'smooth' });
      });

      grid.appendChild(card);
    });

    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.getAttribute('data-cat');
        document.querySelectorAll('.catalog-card').forEach(card => {
          const cardCat = card.getAttribute('data-cat') || '';
          if (cat === 'all' || cardCat === cat || (cat.includes('Agro') && (cardCat.includes('Dairy') || cardCat.includes('Agro')))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  // --- STATE & DISTRICT DROPDOWNS LINKING ---
  function setupStateDistrictDropdowns() {
    const regStateInput = document.getElementById('regState');
    const districtDatalist = document.getElementById('districtList');
    const villageDatalist = document.getElementById('villageList');

    if (!regStateInput || typeof NATIONWIDE_REGIONS === 'undefined') return;

    regStateInput.addEventListener('input', (e) => {
      const stateName = e.target.value.trim();
      if (NATIONWIDE_REGIONS[stateName]) {
        districtDatalist.innerHTML = '';
        NATIONWIDE_REGIONS[stateName].districts.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          districtDatalist.appendChild(opt);
        });

        villageDatalist.innerHTML = '';
        NATIONWIDE_REGIONS[stateName].sample_villages.forEach(v => {
          const opt = document.createElement('option');
          opt.value = v;
          villageDatalist.appendChild(opt);
        });
      }
    });
  }

  // --- VOICE-TO-TEXT FOR LOGIN FIELDS ---
  function setupVoiceToTextButtons() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    document.querySelectorAll('.btn-mic-field').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.getAttribute('data-input');
        const targetInput = document.getElementById(inputId);
        if (!targetInput) return;

        const recognition = new SpeechRec();
        recognition.lang = getVoiceLocale(currentLang);
        recognition.start();

        btn.classList.add('listening');

        recognition.onresult = (e) => {
          const spokenText = e.results[0][0].transcript;
          targetInput.value = spokenText;
          btn.classList.remove('listening');
        };

        recognition.onerror = () => btn.classList.remove('listening');
        recognition.onend = () => btn.classList.remove('listening');
      });
    });
  }

  // =============================================================================
  // VYAPAAR SARTHI: CITIZEN AUTHENTICATION & SESSION MANAGEMENT CONTROLLER
  // Local Session & User Storage Helper
  function getLocalUsers() {
    try {
      return JSON.parse(localStorage.getItem('vyapaar_registered_users') || '[]');
    } catch {
      return [];
    }
  }

  function saveLocalUsers(users) {
    try {
      localStorage.setItem('vyapaar_registered_users', JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save users locally:', e);
    }
  }

  function getLocalActiveSession() {
    try {
      return JSON.parse(localStorage.getItem('vyapaar_active_session') || 'null');
    } catch {
      return null;
    }
  }

  function setLocalActiveSession(user) {
    try {
      if (user) {
        localStorage.setItem('vyapaar_active_session', JSON.stringify(user));
      } else {
        localStorage.removeItem('vyapaar_active_session');
      }
    } catch (e) {
      console.warn('Failed to update local session:', e);
    }
  }

  const API_AUTH = {
    async getMe() {
      // First try backend API if available
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.user) {
            setLocalActiveSession(data.user);
            return data.user;
          }
        }
      } catch (err) {
        // Backend not reachable or static server
      }
      return getLocalActiveSession();
    },

    async login(identifier, password) {
      const cleanIdent = (identifier || '').trim().toLowerCase();
      // Try backend first
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ identifier, password })
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Login failed');
          if (data.user) {
            setLocalActiveSession(data.user);
            return data.user;
          }
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
      }

      // Local storage fallback
      const localUsers = getLocalUsers();
      const matched = localUsers.find(u => 
        (u.phone && u.phone.toLowerCase() === cleanIdent) || 
        (u.email && u.email.toLowerCase() === cleanIdent) ||
        (u.mobile && u.mobile.toLowerCase() === cleanIdent)
      );

      if (matched) {
        if (matched.password && matched.password !== password) {
          throw new Error('Invalid password. Please try again.');
        }
        setLocalActiveSession(matched);
        return matched;
      }

      // Default demo citizen account
      const demoUser = {
        name: identifier.includes('@') ? identifier.split('@')[0] : 'Citizen Beneficiary',
        phone: cleanIdent.match(/^\d+$/) ? cleanIdent : '9040082772',
        email: cleanIdent.includes('@') ? cleanIdent : `${cleanIdent}@vyapaarsarthi.gov.in`,
        category: 'sc',
        state: 'Odisha',
        district: 'Khordha',
        area: 'Hansapal (Pilot)',
        pin: '751010',
        margin: 48000
      };
      setLocalActiveSession(demoUser);
      return demoUser;
    },

    async signup(payload) {
      const { name, phone, email, password } = payload;
      // Try backend first
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Signup failed');
          if (data.user) {
            setLocalActiveSession(data.user);
            return data.user;
          }
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) {
          throw err;
        }
      }

      // Local storage fallback
      const localUsers = getLocalUsers();
      const existingUser = localUsers.find(u => 
        (phone && u.phone === phone) || (email && u.email && u.email.toLowerCase() === email.toLowerCase())
      );

      const userRecord = {
        id: Date.now(),
        name: name || 'Citizen Beneficiary',
        phone: phone || '9040082772',
        email: email || '',
        password: password || '',
        category: 'sc',
        state: 'Odisha',
        district: 'Khordha',
        area: 'Hansapal (Pilot)',
        pin: '751010',
        margin: 48000
      };

      if (existingUser) {
        Object.assign(existingUser, userRecord);
      } else {
        localUsers.push(userRecord);
      }
      saveLocalUsers(localUsers);
      setLocalActiveSession(userRecord);

      return userRecord;
    },

    async sendOtp(phone) {
      try {
        const res = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone })
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
          return data;
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) throw err;
      }
      return { success: true, simulatedOtp: '123456', message: 'Simulated OTP: 123456' };
    },

    async verifyOtp(phone, otp) {
      try {
        const res = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp })
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'OTP verification failed');
          return data;
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) throw err;
      }
      return { success: true, message: 'Verified' };
    },

    async forgotPassword(identifier) {
      try {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier })
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Forgot password request failed');
          return data;
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) throw err;
      }
      const token = `MSJE-TOKEN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      return { success: true, simulatedToken: token, message: 'Password reset link simulated.' };
    },

    async resetPassword(token, newPassword) {
      try {
        const res = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, newPassword })
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Password reset failed');
          return data;
        }
      } catch (err) {
        if (err.message && !err.message.includes('Unexpected') && !err.message.includes('Failed to fetch')) throw err;
      }
      return { success: true, message: 'Password updated successfully' };
    },

    async logout() {
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      } catch (err) {
        console.warn('Logout request failed:', err);
      }
      setLocalActiveSession(null);
    }
  };

  // State
  let isPhoneOtpVerified = false;
  let activeOtpCode = '';
  let otpTimerInterval = null;

  // DOM Elements
  const authModalTitle = document.getElementById('authModalTitle');
  const authTabsBar = document.getElementById('authTabsBar');
  const tabBtnForgot = document.getElementById('tabBtnForgot');
  const tabBtnReset = document.getElementById('tabBtnReset');

  // Form Elements
  const formLogin = document.getElementById('formLogin');
  const formSignup = document.getElementById('formSignup');
  const formForgot = document.getElementById('formForgot');
  const formReset = document.getElementById('formReset');

  // Alerts
  const loginAlert = document.getElementById('loginAlert');
  const signupAlert = document.getElementById('signupAlert');
  const forgotAlert = document.getElementById('forgotAlert');
  const resetAlert = document.getElementById('resetAlert');

  // Switch Links
  const linkToForgot = document.getElementById('linkToForgot');
  const linkToSignup = document.getElementById('linkToSignup');
  const linkToLogin = document.getElementById('linkToLogin');
  const linkForgotBackToLogin = document.getElementById('linkForgotBackToLogin');
  const linkResetBackToLogin = document.getElementById('linkResetBackToLogin');

  // Navigation Profile & Logout Elements
  const userLoggedInBlock = document.getElementById('userLoggedInBlock');
  const navUserName = document.getElementById('navUserName');
  const btnTopLogout = document.getElementById('btnTopLogout');
  const btnNavProfileChip = document.getElementById('btnNavProfileChip');

  // Helper: Show Alert
  function showAlert(alertEl, msg, type = 'error') {
    if (!alertEl) return;
    alertEl.className = `auth-alert auth-alert-${type}`;
    const icon = type === 'error' ? 'fa-triangle-exclamation' : type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    alertEl.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
    alertEl.style.display = 'flex';
  }

  function clearAlert(alertEl) {
    if (alertEl) {
      alertEl.style.display = 'none';
      alertEl.innerHTML = '';
    }
  }

  // Helper: Switch Auth Tab
  function switchAuthTab(targetTabId) {
    clearAlert(loginAlert);
    clearAlert(signupAlert);
    clearAlert(forgotAlert);
    clearAlert(resetAlert);

    // Show tab buttons if needed
    if (targetTabId === 'tabForgot' && tabBtnForgot) tabBtnForgot.style.display = 'inline-flex';
    if (targetTabId === 'tabReset' && tabBtnReset) tabBtnReset.style.display = 'inline-flex';

    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === targetTabId);
    });

    document.querySelectorAll('.auth-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === targetTabId);
    });

    if (authModalTitle) {
      if (targetTabId === 'tabLogin') authModalTitle.textContent = 'Vyapaar Sarthi | Citizen Login';
      else if (targetTabId === 'tabSignup') authModalTitle.textContent = 'Vyapaar Sarthi | Entrepreneur Registration';
      else if (targetTabId === 'tabForgot') authModalTitle.textContent = 'Vyapaar Sarthi | Password Recovery';
      else if (targetTabId === 'tabReset') authModalTitle.textContent = 'Vyapaar Sarthi | Set New Password';
    }
  }

  // Hook tab bar clicks
  authTabsBar?.querySelectorAll('.auth-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-auth-tab');
      if (tabId) switchAuthTab(tabId);
    });
  });

  linkToForgot?.addEventListener('click', () => switchAuthTab('tabForgot'));
  linkToSignup?.addEventListener('click', () => switchAuthTab('tabSignup'));
  linkToLogin?.addEventListener('click', () => switchAuthTab('tabLogin'));
  linkForgotBackToLogin?.addEventListener('click', () => switchAuthTab('tabLogin'));
  linkResetBackToLogin?.addEventListener('click', () => switchAuthTab('tabLogin'));

  // Password Visibility Toggles
  function setupPasswordToggle(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.innerHTML = isPwd ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
    });
  }

  setupPasswordToggle('btnToggleLoginPwd', 'loginPassword');
  setupPasswordToggle('btnToggleSignupPwd', 'signupPassword');
  setupPasswordToggle('btnToggleResetPwd', 'resetNewPassword');
  setupPasswordToggle('btnToggleResetConfirmPwd', 'resetConfirmPassword');

  // Phone Validation
  const signupPhoneInput = document.getElementById('signupPhone');
  const errSignupPhone = document.getElementById('errSignupPhone');
  signupPhoneInput?.addEventListener('input', () => {
    signupPhoneInput.value = signupPhoneInput.value.replace(/\D/g, '').slice(0, 10);
    const val = signupPhoneInput.value;
    if (val.length > 0 && !/^[6-9]\d{9}$/.test(val)) {
      if (errSignupPhone) errSignupPhone.textContent = 'Enter a valid 10-digit Indian mobile number';
    } else if (errSignupPhone) {
      errSignupPhone.textContent = '';
    }
  });

  // --- SUBMIT: LOGIN FORM ---
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert(loginAlert);

    const identifier = document.getElementById('loginIdentifier')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const btnSubmit = document.getElementById('btnLoginSubmit');

    if (!identifier) {
      showAlert(loginAlert, 'Please enter your phone number or email');
      return;
    }
    if (!password) {
      showAlert(loginAlert, 'Please enter your password');
      return;
    }

    try {
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
      }

      const user = await API_AUTH.login(identifier, password);
      currentUser.isLoggedIn = true;
      currentUser.name = user.name;
      currentUser.mobile = user.phone;
      currentUser.email = user.email || '';

      loginModal?.classList.remove('active');
      triggerVerificationAnimation();
    } catch (err) {
      showAlert(loginAlert, err.message, 'error');
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> <span data-i18n="btnSubmitLogin">Log In to Account</span>';
      }
    }
  });

  // --- SUBMIT: SIGNUP FORM ---
  formSignup?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert(signupAlert);

    const name = document.getElementById('signupName')?.value.trim();
    const phone = document.getElementById('signupPhone')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const password = (document.getElementById('signupPassword')?.value || '').trim();
    const btnSubmit = document.getElementById('btnSignupSubmit');

    // Validations
    if (!name || name.length < 2) {
      showAlert(signupAlert, 'Please enter your full name (at least 2 characters)');
      return;
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      showAlert(signupAlert, 'Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert(signupAlert, 'Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      showAlert(signupAlert, 'Password must be at least 6 characters');
      return;
    }

    try {
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';
      }

      const payload = { name, phone, email, password };
      const user = await API_AUTH.signup(payload);

      currentUser.isLoggedIn = true;
      currentUser.name = user.name || name;
      currentUser.mobile = user.phone || phone;
      currentUser.email = user.email || email;

      loginModal?.classList.remove('active');
      triggerVerificationAnimation();
    } catch (err) {
      showAlert(signupAlert, err.message, 'error');
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fa-solid fa-user-plus"></i> <span data-i18n="btnSubmitSignup">Register</span>';
      }
    }
  });

  // --- SUBMIT: FORGOT PASSWORD FORM ---
  formForgot?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert(forgotAlert);

    const identifier = document.getElementById('forgotIdentifier')?.value.trim();
    const btnSubmit = document.getElementById('btnSubmitForgot');
    const simulatedResetCard = document.getElementById('simulatedResetCard');
    const btnOpenResetDirect = document.getElementById('btnOpenResetDirect');

    if (!identifier) {
      showAlert(forgotAlert, 'Please enter your registered phone number or email');
      return;
    }

    try {
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
      }

      const res = await API_AUTH.forgotPassword(identifier);
      showAlert(forgotAlert, res.message, res.isPhoneOnly ? 'warning' : 'success');

      if (res.simulatedToken) {
        if (simulatedResetCard) simulatedResetCard.style.display = 'block';
        if (btnOpenResetDirect) {
          btnOpenResetDirect.onclick = () => {
            const resetTokenInput = document.getElementById('resetToken');
            if (resetTokenInput) resetTokenInput.value = res.simulatedToken;
            switchAuthTab('tabReset');
          };
        }
      }
    } catch (err) {
      showAlert(forgotAlert, err.message, 'error');
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Password Reset Instructions';
      }
    }
  });

  // --- SUBMIT: RESET PASSWORD FORM ---
  formReset?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert(resetAlert);

    const token = document.getElementById('resetToken')?.value.trim();
    const newPassword = document.getElementById('resetNewPassword')?.value;
    const confirmPassword = document.getElementById('resetConfirmPassword')?.value;
    const btnSubmit = document.getElementById('btnSubmitReset');

    if (!token) {
      showAlert(resetAlert, 'Security reset token is required');
      return;
    }
    if (!newPassword || newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      showAlert(resetAlert, 'Password must be at least 8 characters with at least 1 letter and 1 number');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert(resetAlert, 'Passwords do not match');
      return;
    }

    try {
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Resetting Password...';
      }

      const res = await API_AUTH.resetPassword(token, newPassword);
      showAlert(resetAlert, res.message || 'Your password has been reset successfully. Please log in.', 'success');

      setTimeout(() => {
        switchAuthTab('tabLogin');
      }, 1500);
    } catch (err) {
      showAlert(resetAlert, err.message, 'error');
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fa-solid fa-check-double"></i> Reset Password & Log In';
      }
    }
  });

  // Open / Close Login Modal Handlers
  btnOpenLogin?.addEventListener('click', () => {
    if (currentUser.isLoggedIn) {
      openCitizenDashboard();
    } else {
      switchAuthTab('tabLogin');
      loginModal?.classList.add('active');
    }
  });

  btnCloseLogin?.addEventListener('click', () => loginModal?.classList.remove('active'));

  // Citizen Dashboard Modal Elements & Handlers
  const citizenDashboardModal = document.getElementById('citizenDashboardModal');
  const btnCloseDashboard = document.getElementById('btnCloseDashboard');
  const btnTopCloseDashboard = document.getElementById('btnTopCloseDashboard');

  function openCitizenDashboard() {
    if (!currentUser || !currentUser.isLoggedIn) {
      switchAuthTab('tabLogin');
      showAlert(loginAlert, 'Authorization Required: Please log in or register to view your personal dashboard & enterprise roadmap.', 'warning');
      loginModal?.classList.add('active');
      return;
    }
    updateUserProfileData();
    citizenDashboardModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCitizenDashboard() {
    citizenDashboardModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnCloseDashboard?.addEventListener('click', closeCitizenDashboard);
  btnTopCloseDashboard?.addEventListener('click', closeCitizenDashboard);

  citizenDashboardModal?.addEventListener('click', (e) => {
    if (e.target === citizenDashboardModal) {
      closeCitizenDashboard();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && citizenDashboardModal?.classList.contains('active')) {
      closeCitizenDashboard();
    }
  });

  // Logout Handlers
  async function handleLogout() {
    await API_AUTH.logout();
    currentUser.isLoggedIn = false;
    currentUser.name = "Citizen Beneficiary";
    currentUser.mobile = "";
    currentUser.email = "";
    updateAuthButtonText();
    closeCitizenDashboard();
    document.querySelector('.tab-btn[data-target="secModule1"]')?.click();
  }

  btnTopLogout?.addEventListener('click', handleLogout);
  document.getElementById('btnLogout')?.addEventListener('click', handleLogout);

  btnNavProfileChip?.addEventListener('click', () => {
    if (currentUser.isLoggedIn) {
      openCitizenDashboard();
    } else {
      switchAuthTab('tabLogin');
      showAlert(loginAlert, 'Please sign in or register to access your personal dashboard.', 'warning');
      loginModal?.classList.add('active');
    }
  });

  document.getElementById('btnEditProfile')?.addEventListener('click', () => {
    switchAuthTab('tabSignup');
    loginModal?.classList.add('active');
  });

  // Protected Actions Guard
  function requireAuth(message, callback) {
    if (currentUser.isLoggedIn) {
      if (callback) callback();
      return true;
    }
    switchAuthTab('tabLogin');
    showAlert(loginAlert, message, 'warning');
    loginModal?.classList.add('active');
    return false;
  }

  btnPrintDPR?.addEventListener('click', (e) => {
    if (!currentUser.isLoggedIn) {
      e.stopImmediatePropagation();
      requireAuth('Please log in or register to download certified Bank DPR reports.');
    }
  }, true);

  btnProfileDprDownload?.addEventListener('click', (e) => {
    if (!currentUser.isLoggedIn) {
      e.stopImmediatePropagation();
      requireAuth('Please log in to download bank-certified reports.');
    }
  }, true);

  // Check URL query parameters for reset token (e.g. /?token=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      const resetTokenInput = document.getElementById('resetToken');
      if (resetTokenInput) resetTokenInput.value = tokenParam;
      switchAuthTab('tabReset');
      loginModal?.classList.add('active');
    }
  } catch (e) {
    console.warn('URL param parse error:', e);
  }

  // Initial Session Check on Page Load
  API_AUTH.getMe().then(user => {
    if (user) {
      currentUser.isLoggedIn = true;
      currentUser.name = user.name;
      currentUser.mobile = user.phone;
      currentUser.email = user.email || '';
      updateAuthButtonText();
      updateUserProfileData();
      console.log(`[Vyapaar Sarthi Session] Logged in as ${user.name} (${user.phone})`);
    } else {
      currentUser.isLoggedIn = false;
      updateAuthButtonText();
    }
  });

  function triggerVerificationAnimation() {
    redirectOverlay.classList.add('active');
    const pBar = document.getElementById('redirectProgress');
    const txtStatus = document.getElementById('txtRedirectStatus');
    pBar.style.width = '0%';

    setTimeout(() => {
      pBar.style.width = '35%';
      txtStatus.textContent = `Citizen verified: ${currentUser.name} (${currentUser.mobile}). Authenticated with LGD directory...`;
      document.getElementById('chkStep1').style.color = '#34d399';
    }, 400);

    setTimeout(() => {
      pBar.style.width = '70%';
      txtStatus.textContent = `Scanning commercial POIs & local market demand for ${currentUser.area}, ${currentUser.district}...`;
      document.getElementById('chkStep2').style.color = '#34d399';
    }, 1000);

    setTimeout(() => {
      pBar.style.width = '100%';
      txtStatus.textContent = `Matching 10% Margin (₹${currentUser.margin.toLocaleString('en-IN')}) with Ministry Concessional Schemes...`;
      document.getElementById('chkStep3').style.color = '#34d399';
    }, 1600);

    setTimeout(() => {
      redirectOverlay.classList.remove('active');

      currentMargin = currentUser.margin || currentMargin;
      if (sliderMargin) sliderMargin.value = currentMargin;
      updateFinancialUI();
      updateAuthButtonText();
      updateUserProfileData();

      // Open the authenticated citizen's personal dashboard!
      openCitizenDashboard();
      announceWelcome();
    }, 2200);
  }

  // --- USER PROFILE & JOURNEY DASHBOARD CONTROLLER ---
  function updateUserProfileData() {
    const fin = calculateFinances(currentMargin);

    const displayName = currentUser.name || 'Citizen Beneficiary';
    const displayMobile = currentUser.mobile ? (currentUser.mobile.startsWith('+91') ? currentUser.mobile : `+91 ${currentUser.mobile}`) : '+91 9040082772';
    const displayEmail = currentUser.email || `${(currentUser.mobile || 'citizen')}@vyapaarsarthi.gov.in`;

    const profDisplayName = document.getElementById('profDisplayName');
    if (profDisplayName) profDisplayName.textContent = displayName;

    const dashGreetingName = document.getElementById('dashGreetingName');
    if (dashGreetingName) dashGreetingName.textContent = displayName.split(' ')[0];

    const profDisplayEmail = document.getElementById('profDisplayEmail');
    if (profDisplayEmail) profDisplayEmail.textContent = displayEmail;

    const profDisplayPhone = document.getElementById('profDisplayPhone');
    if (profDisplayPhone) profDisplayPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${displayMobile}`;

    const profBizName = document.getElementById('profBizName');
    if (profBizName) profBizName.textContent = currentBusiness.name;

    const profSector = document.getElementById('profSector');
    if (profSector) profSector.textContent = currentBusiness.category;

    const profMargin = document.getElementById('profMargin');
    if (profMargin) profMargin.textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;

    const profLoanCapacity = document.getElementById('profLoanCapacity');
    if (profLoanCapacity) profLoanCapacity.textContent = `₹ ${fin.loanAmount.toLocaleString('en-IN')}`;

    const dashStatProfit = document.getElementById('dashStatProfit');
    if (dashStatProfit) dashStatProfit.textContent = `₹${Math.round(fin.monthlyTakeHome / 1000)}K`;

    const lblDprRefCode = document.getElementById('lblDprRefCode');
    if (lblDprRefCode) {
      lblDprRefCode.textContent = `MSJE-${(currentUser.state || 'OD').substring(0, 2).toUpperCase()}-${currentUser.pin || '751010'}-0926`;
    }

    const catBadge = document.getElementById('profCategoryBadge');
    if (catBadge && fin.catInfo) {
      catBadge.textContent = `${fin.catInfo.name} (${fin.catInfo.corporation.split('(')[0]})`;
    }

    // Set today's formatted greeting date
    const dashGreetingDate = document.getElementById('dashGreetingDate');
    if (dashGreetingDate) {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      dashGreetingDate.textContent = `Today is ${new Date().toLocaleDateString('en-US', options)}`;
    }
  }

  // Dashboard Nav Action Listeners
  document.getElementById('btnDashNewPlan')?.addEventListener('click', () => {
    closeCitizenDashboard();
    document.querySelector('.tab-btn[data-target="secCatalog"]')?.click();
    document.getElementById('secCatalog')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btnDashNavJourney')?.addEventListener('click', () => {
    closeCitizenDashboard();
    document.querySelector('.tab-btn[data-target="secModule1"]')?.click();
    document.getElementById('secModule1')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btnDashNavTasks')?.addEventListener('click', () => {
    closeCitizenDashboard();
    document.querySelector('.tab-btn[data-target="secModule2"]')?.click();
    document.getElementById('secModule2')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btnDashNavDpr')?.addEventListener('click', () => {
    compileDPR();
    dprModal?.classList.add('active');
  });

  document.getElementById('btnDashEditProfile')?.addEventListener('click', () => {
    closeCitizenDashboard();
    switchAuthTab('tabSignup');
    loginModal?.classList.add('active');
  });

  // --- TAB NAVIGATION & STICKY NAVBAR HOOKS ---
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');

        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === targetId) {
            pane.classList.add('active');
          }
        });

        if (targetId === 'secModule1' && leafletMap) {
          setTimeout(() => leafletMap.invalidateSize(), 200);
        }

        document.querySelectorAll('.nav-link-btn, .m-nav-item').forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-target') === targetId);
        });
      });
    });
  }

  function setupStickyNavActions() {
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-target');
        if (targetTab) {
          const tabBtn = document.querySelector(`.tab-btn[data-target="${targetTab}"]`);
          if (tabBtn) tabBtn.click();
        }
      });
    });

    document.querySelectorAll('.m-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-target');
        if (targetTab) {
          const tabBtn = document.querySelector(`.tab-btn[data-target="${targetTab}"]`);
          if (tabBtn) tabBtn.click();
          mobileNavDrawer.classList.remove('open');
        }
      });
    });

    btnMobileNavToggle?.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
    });
  }

  // --- MULTILINGUAL ENGINE (7 LANGUAGES) & FULL TRANSLATION ---
  window.setPortalLanguage = function(lang) {
    if (!lang) return;
    currentLang = lang;
    const lSel = document.getElementById('langSelect');
    if (lSel && lSel.value !== lang) {
      lSel.value = lang;
    }
    updateLanguageTexts();
  };

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      window.setPortalLanguage(e.target.value);
    });
  }

  function updateLanguageTexts() {
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang]) ? TRANSLATIONS[currentLang] : (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS['en'] : {});
    if (!dict) return;

    // 1. Static text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<span') || dict[key].includes('<')) {
          el.innerHTML = dict[key];
        } else if (el.children.length === 0) {
          el.textContent = dict[key];
        } else {
          const textSpan = el.querySelector('span');
          if (textSpan) {
            textSpan.textContent = dict[key];
          } else {
            const icon = el.querySelector('i');
            if (icon) {
              const iconHtml = icon.outerHTML;
              el.innerHTML = `${iconHtml} ${dict[key]}`;
            } else {
              el.textContent = dict[key];
            }
          }
        }
      }
    });

    // 2. Input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // 3. Re-render dynamic components safely
    try { renderCategoryCards(); } catch (err) { console.warn('renderCategoryCards:', err); }
    try { renderSeasonalCalendar(); } catch (err) { console.warn('renderSeasonalCalendar:', err); }
    try { renderBankDirectory(); } catch (err) { console.warn('renderBankDirectory:', err); }
    try { populateCatalogGrid(); } catch (err) { console.warn('populateCatalogGrid:', err); }
    try { updateSchemeCriteriaDocs(); } catch (err) { console.warn('updateSchemeCriteriaDocs:', err); }
    try { renderBusinessPlansMarquee(); } catch (err) { console.warn('renderBusinessPlansMarquee:', err); }

    if (currentBusiness) {
      const sectorEl = document.getElementById('badgeCurrentSector');
      if (sectorEl) sectorEl.textContent = currentBusiness.sector || currentBusiness.category;
      const titleEl = document.getElementById('txtCurrentBizTitle');
      if (titleEl) titleEl.textContent = currentBusiness.name;
      const descEl = document.getElementById('txtCurrentBizSummary');
      if (descEl) descEl.textContent = currentBusiness.local_rationale;
      try { updateFinancialUI(); } catch (err) { console.warn('updateFinancialUI:', err); }
    }

    try { updateAuthButtonText(); } catch (err) { console.warn('updateAuthButtonText:', err); }

    const langNames = {
      en: "English", hi: "हिन्दी (Hindi)", or: "ଓଡ଼ିଆ (Odia)", 
      bn: "বাংলা (Bengali)", te: "తెలుగు (Telugu)", ta: "தமிழ் (Tamil)", mr: "मराठी (Marathi)"
    };
    const activeVideoLang = document.getElementById('lblActiveVideoLang');
    if (activeVideoLang) {
      activeVideoLang.textContent = langNames[currentLang] || "English";
    }
  }

  function updateAuthButtonText() {
    const txtAuthBtn = document.getElementById('txtAuthBtn');
    const btnOpenLogin = document.getElementById('btnOpenLogin');
    const userLoggedInBlock = document.getElementById('userLoggedInBlock');
    const navUserName = document.getElementById('navUserName');
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang]) ? TRANSLATIONS[currentLang] : (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS['en'] : {});

    if (currentUser && currentUser.isLoggedIn) {
      if (btnOpenLogin) btnOpenLogin.style.display = 'none';
      if (userLoggedInBlock) userLoggedInBlock.style.display = 'flex';
      if (navUserName) navUserName.textContent = currentUser.name;
    } else {
      if (btnOpenLogin) btnOpenLogin.style.display = 'flex';
      if (userLoggedInBlock) userLoggedInBlock.style.display = 'none';
      if (txtAuthBtn) txtAuthBtn.textContent = dict['btnLogin'] || "Citizen Login / Register";
    }
  }

  // --- HERO GET STARTED CTA LISTENERS ---
  document.getElementById('btnHeroGetStarted')?.addEventListener('click', () => {
    if (currentUser && currentUser.isLoggedIn) {
      openCitizenDashboard();
    } else {
      switchAuthTab('tabLogin');
      showAlert(loginAlert, 'Please log in or register first to access your personalized Enterprise Journey & Dashboard.', 'warning');
      loginModal?.classList.add('active');
    }
  });

  document.getElementById('btnHeroExploreCatalog')?.addEventListener('click', () => {
    const catalogSec = document.getElementById('catalogGrid') || document.getElementById('secBizPlansMarquee');
    catalogSec?.scrollIntoView({ behavior: 'smooth' });
  });
  // --- CENTER VIDEO DEMO PLAYER WALKTHROUGH ---
  let videoChapter = 1;

  const btnPlayMain = document.getElementById('btnPlayVideoMain');
  btnPlayMain?.addEventListener('click', () => {
    const overlay = document.getElementById('videoOverlay');
    const poster = document.getElementById('imgVideoPoster');
    const iframe = document.getElementById('youtubeVideoGuide');
    if (overlay) overlay.style.display = 'none';
    if (poster) poster.style.display = 'none';
    if (iframe) iframe.style.display = 'block';
  });

  btnPlayDemo?.addEventListener('click', () => {
    const overlay = document.getElementById('videoOverlay');
    const poster = document.getElementById('imgVideoPoster');
    const iframe = document.getElementById('youtubeVideoGuide');
    if (overlay) overlay.style.display = 'none';
    if (poster) poster.style.display = 'none';
    if (iframe) iframe.style.display = 'block';
  });

  btnNextChapter?.addEventListener('click', () => {
    videoChapter = (videoChapter % 4) + 1;
    const chTitles = [
      "1. Select State & Village",
      "2. Enter 10% Margin Capital",
      "3. Inspect Feasibility & Threat Radar",
      "4. Download Bank-Ready DPR"
    ];
    const titleEl = document.getElementById('txtVideoOverlayTitle');
    if (titleEl) titleEl.textContent = `Step ${videoChapter}: ${chTitles[videoChapter - 1]}`;
  });

  // --- BANK-READY DPR COMPILATION & PRINT MODAL ---
  btnProfileDprDownload?.addEventListener('click', () => {
    compileDPR();
    dprModal.classList.add('active');
  });

  btnCloseDPR?.addEventListener('click', () => dprModal.classList.remove('active'));
  btnPrintDPR?.addEventListener('click', () => window.print());

  function compileDPR() {
    const fin = calculateFinances(currentMargin);
    const dprContainer = document.getElementById('printableDprContent');

    dprContainer.innerHTML = `
      <div class="dpr-official-header text-center">
        <h3 style="margin:0; font-size:1.4rem; color:#0b3b60;">GOVERNMENT OF INDIA</h3>
        <h4 style="margin:0.25rem 0; font-size:1.1rem; color:#d97706;">MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT</h4>
        <p style="margin:0; font-size:0.9rem; font-weight:700;">DETAILED PROJECT REPORT (DPR) & CONCESSIONAL LOAN APPLICATION</p>
        <p style="margin:0; font-size:0.8rem; color:#64748b;">Formulated under National Rural Micro-Enterprise Scheme Guidelines | Collateral-Free under CGTMSE</p>
      </div>

      <div class="dpr-body-content" style="margin-top:1.5rem;">
        <div class="dpr-section-title">1. APPLICANT & GEOGRAPHICAL JURISDICTION</div>
        <table class="dpr-table">
          <tr><td><strong>Applicant Name:</strong></td><td><strong>${currentUser.name}</strong> (${currentUser.status})</td><td><strong>Application Date:</strong></td><td>${new Date().toLocaleDateString('en-GB')}</td></tr>
          <tr><td><strong>Contact Mobile:</strong></td><td>+91 ${currentUser.mobile}</td><td><strong>LGD Ref Code:</strong></td><td>${currentUser.state.substring(0,2).toUpperCase()}-${currentUser.pin}</td></tr>
          <tr><td><strong>Social Category:</strong></td><td><strong>${fin.catInfo.name}</strong></td><td><strong>Apex Corp:</strong></td><td>${fin.catInfo.corporation}</td></tr>
          <tr><td><strong>Proposed Enterprise:</strong></td><td colspan="3"><strong>${currentBusiness.name}</strong> (${currentBusiness.category})</td></tr>
          <tr><td><strong>Geographical Location:</strong></td><td>${currentUser.area}, ${currentUser.district}, ${currentUser.state}</td><td><strong>Market Radius:</strong></td><td>5.0 km (Catchment: 52,000)</td></tr>
        </table>

        <div class="dpr-section-title">2. FINANCIAL STRUCTURING & CONCESSIONAL APPORTIONMENT</div>
        <table class="dpr-table">
          <tr><td><strong>Total Feasible Project Cost:</strong></td><td><strong>₹ ${fin.projectCost.toLocaleString('en-IN')}</strong> (100%)</td><td><strong>Recommended Scheme:</strong></td><td><strong>${currentBusiness.preferable_scheme || fin.schemeName}</strong></td></tr>
          <tr><td><strong>Beneficiary Margin (10%):</strong></td><td><strong>₹ ${fin.margin.toLocaleString('en-IN')}</strong></td><td><strong>Concessional Interest:</strong></td><td><strong>${fin.interestRate}% p.a. (${fin.catInfo.name} Concession)</strong></td></tr>
          <tr><td><strong>Sanctioned Term Loan (90%):</strong></td><td><strong>₹ ${fin.loanAmount.toLocaleString('en-IN')}</strong></td><td><strong>Grace Moratorium:</strong></td><td>${fin.moratMonths} Months (₹0 EMI)</td></tr>
          <tr><td><strong>Quarterly Repayment EMI:</strong></td><td>₹ ${Math.round(fin.quarterlyEmi).toLocaleString('en-IN')} / Quarter</td><td><strong>Total Loan Tenure:</strong></td><td>${fin.tenureYears} Years (${fin.totalQuarters} Quarters)</td></tr>
          <tr><td><strong>Capital Subsidy Match:</strong></td><td>${fin.catInfo.subsidy_pct}</td><td><strong>Collateral Status:</strong></td><td><strong>100% Collateral-Free (CGTMSE Cover)</strong></td></tr>
          <tr><td><strong>Capex Allocation (70%):</strong></td><td>₹ ${Math.round(fin.capex70).toLocaleString('en-IN')}</td><td><strong>Working Capital Opex (30%):</strong></td><td>₹ ${Math.round(fin.opex30).toLocaleString('en-IN')}</td></tr>
        </table>

        <div class="dpr-section-title">3. VIABILITY SCORE & OPERATIONAL CASH FLOW</div>
        <table class="dpr-table">
          <tr><td><strong>AI Viability Score:</strong></td><td><strong>${currentBusiness.viability_score}/100</strong> (${currentBusiness.viability_tag})</td><td><strong>Breakeven Horizon:</strong></td><td>${currentBusiness.unit_economics ? currentBusiness.unit_economics.breakeven : '6 Months'}</td></tr>
          <tr><td><strong>Target Output Capacity:</strong></td><td>${currentBusiness.unit_economics ? currentBusiness.unit_economics.daily_output : 'Commercial Scale'}</td><td><strong>Net Family Profit:</strong></td><td><strong>${document.getElementById('cfTakeHome').textContent}</strong></td></tr>
        </table>

        <div class="dpr-section-title">4. BANK BRANCH MANAGER DECLARATION & APPRAISAL</div>
        <div style="border:1px solid #cbd5e1; padding:0.75rem; border-radius:6px; font-size:0.85rem; line-height:1.5;">
          I hereby verify that the applicant meets the eligibility criteria under the Ministry of Social Justice & Empowerment credit framework. The 10% margin is authenticated, and the proposal is recommended for concessional loan sanction under CGTMSE collateral-free guarantee.
          <div style="display:flex; justify-content:space-between; margin-top:2.5rem;">
            <span>Signature of Applicant</span>
            <span>Signature of LGD Block Officer</span>
            <span>Branch Manager / Lead Bank Officer</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- ENTERPRISE GALLERY: REFERENCE LAYOUT ─ Multi-tile slider LEFT + 2×2 category grid RIGHT ---
  function setupEnterpriseGallery() {
    const track       = document.getElementById('bizMultiTrack');
    const dotsWrap    = document.getElementById('bizSliderDots');
    const prevBtn     = document.getElementById('bizSliderPrev');
    const nextBtn     = document.getElementById('bizSliderNext');
    const captionName = document.getElementById('bizCaptionName');
    const modal       = document.getElementById('bizGalleryModal');
    const modalContent= document.getElementById('bizGalleryModalContent');
    const modalClose  = document.getElementById('bizGalleryModalClose');
    const modalOverlay= document.getElementById('bizGalleryModalOverlay');
    const exploreBtn  = document.getElementById('bizExploreAllBtn');

    if (!track || typeof BUSINESSES_DATA === 'undefined') return;

    const items = BUSINESSES_DATA.slice(0, 12);
    let current = 0;
    let autoTimer = null;
    const VISIBLE = 3;            // how many tiles show at once in the slider
    const TILE_PCT_ACTIVE = 52;   // % width of the centre (active) tile
    const TILE_PCT_SIDE = 24;     // % width of each flanking tile

    // ── Build slide tiles ──────────────────────────────────────────────────────
    items.forEach((biz, i) => {
      const tile = document.createElement('div');
      tile.className = 'biz-slide-tile';
      tile.dataset.index = i;
      tile.innerHTML = `
        <img src="${biz.image_url}" alt="${biz.name}" loading="${i < 4 ? 'eager' : 'lazy'}"
             onerror="this.src='assets/dairy_thumb.jpg'" />
        <div class="biz-slide-tile-label">
          <div class="biz-tile-label-cat">${biz.category}</div>
          <div class="biz-tile-label-name">${biz.name}</div>
        </div>
      `;
      tile.addEventListener('click', () => {
        if (i === current) {
          openGalleryModal(biz);
        } else {
          goToSlide(i, true);
        }
      });
      track.appendChild(tile);

      // Dot
      const dot = document.createElement('button');
      dot.className = 'biz-slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i, true));
      dotsWrap.appendChild(dot);
    });

    // ── Position tiles like a peekaboo multi-slider ───────────────────────────
    function renderTiles() {
      const tiles = track.querySelectorAll('.biz-slide-tile');
      const n = items.length;

      tiles.forEach((tile, i) => {
        const relPos = ((i - current) % n + n) % n;
        // relPos: 0=active, 1=right1, 2=right2, n-1=left1, n-2=left2
        let left, width, opacity, zIndex, filter;

        if (relPos === 0) {
          // Centre active tile
          left = TILE_PCT_SIDE + '%';
          width = TILE_PCT_ACTIVE + '%';
          opacity = 1;
          zIndex = 3;
          filter = 'none';
          tile.classList.add('biz-tile-active');
        } else if (relPos === 1) {
          // Right neighbour
          left = (TILE_PCT_SIDE + TILE_PCT_ACTIVE) + '%';
          width = TILE_PCT_SIDE + '%';
          opacity = 0.82;
          zIndex = 2;
          filter = 'brightness(0.7)';
          tile.classList.remove('biz-tile-active');
        } else if (relPos === n - 1) {
          // Left neighbour
          left = '0%';
          width = TILE_PCT_SIDE + '%';
          opacity = 0.82;
          zIndex = 2;
          filter = 'brightness(0.7)';
          tile.classList.remove('biz-tile-active');
        } else {
          // Off-screen
          left = relPos <= n / 2 ? '100%' : '-50%';
          width = TILE_PCT_SIDE + '%';
          opacity = 0;
          zIndex = 1;
          filter = 'none';
          tile.classList.remove('biz-tile-active');
        }

        tile.style.left = left;
        tile.style.width = width;
        tile.style.opacity = opacity;
        tile.style.zIndex = zIndex;
        tile.style.filter = filter;
      });

      // Update dots
      dotsWrap.querySelectorAll('.biz-slider-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );

      // Update caption
      if (captionName) captionName.textContent = items[current].name;
    }

    // ── Go to slide ───────────────────────────────────────────────────────────
    function goToSlide(index, resetTimer) {
      current = ((index % items.length) + items.length) % items.length;
      renderTiles();
      if (resetTimer) startAutoPlay();
    }

    // ── Auto-advance every 3 seconds ──────────────────────────────────────────
    function startAutoPlay() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        goToSlide(current + 1, false);
      }, 3000);
    }
    startAutoPlay();

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.parentElement.addEventListener('mouseleave', () => startAutoPlay());

    // Nav buttons
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(current - 1, true); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(current + 1, true); });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
      if (modal && modal.classList.contains('open')) return;
      if (e.key === 'ArrowRight') goToSlide(current + 1, true);
      else if (e.key === 'ArrowLeft') goToSlide(current - 1, true);
    });

    // Explore All
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const sec = document.getElementById('secControlDock');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Initial render
    renderTiles();

    // ── CLICK MODAL ────────────────────────────────────────────────────────────
    function openGalleryModal(biz) {
      if (!modal || !modalContent) return;
      const score = biz.viability_score || 88;
      const rationale = biz.local_rationale || biz.target_market || '';

      modalContent.innerHTML = `
        <div class="biz-modal-image-wrap">
          <img src="${biz.image_url}" alt="${biz.name}" onerror="this.src='assets/dairy_thumb.jpg'" />
          <div class="biz-modal-image-badge">
            <span class="slide-caption-badge">${biz.category}</span>
            <div style="background:rgba(74,222,128,0.15);border:1px solid rgba(74,222,128,0.4);color:#4ade80;font-size:0.78rem;font-weight:700;padding:3px 10px;border-radius:4px;">
              ${score}% Viability
            </div>
          </div>
        </div>
        <div class="biz-modal-detail-wrap">
          <span class="biz-modal-category">${biz.category}</span>
          <h3 class="biz-modal-title">${biz.name}</h3>
          <p class="biz-modal-desc">${rationale}</p>
          <div class="biz-modal-stats">
            <div class="biz-modal-stat">
              <div class="biz-modal-stat-label">Monthly Profit</div>
              <div class="biz-modal-stat-val green">${biz.unit_economics ? biz.unit_economics.monthly_profit : '₹10,000+'}</div>
            </div>
            <div class="biz-modal-stat">
              <div class="biz-modal-stat-label">Breakeven Period</div>
              <div class="biz-modal-stat-val">${biz.unit_economics ? biz.unit_economics.breakeven : '6-8 Months'}</div>
            </div>
            <div class="biz-modal-stat">
              <div class="biz-modal-stat-label">Project Cost</div>
              <div class="biz-modal-stat-val">₹${(biz.project_cost_inr || 0).toLocaleString('en-IN')}</div>
            </div>
            <div class="biz-modal-stat">
              <div class="biz-modal-stat-label">10% Beneficiary Margin</div>
              <div class="biz-modal-stat-val">₹${(biz.beneficiary_margin_inr || 0).toLocaleString('en-IN')}</div>
            </div>
          </div>
          <div class="biz-modal-scheme-tag">
            <i class="fa-solid fa-landmark-flag"></i>
            <span>MSJE Scheme Applicable</span>
          </div>
        </div>
      `;
      modal.classList.add('open');
    }

    function closeGalleryModal() {
      if (modal) modal.classList.remove('open');
    }

    if (modalClose) modalClose.addEventListener('click', closeGalleryModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeGalleryModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeGalleryModal();
    });
  }

  // --- LENIS SMOOTH SCROLL & GSAP ANIMATION ENGINE ---
  function initLenisAndGSAP() {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') {
      console.warn("GSAP or Lenis library not loaded.");
      return;
    }

    // Register GSAP ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8
    });

    window.lenisInstance = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    // Add Lenis RAF into GSAP Ticker for ultra-smooth performance
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. Hero Section Entrance Animation Sequence
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta-group, .hero-stats-strip, .hero-stats');
    if (heroElements.length > 0) {
      gsap.from(heroElements, {
        opacity: 0,
        y: 35,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }

    // 3. Header & Navigation Animation
    const mainNavbar = document.getElementById('mainStickyNavbar');
    if (mainNavbar) {
      gsap.from(mainNavbar, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // 4. Scroll-Triggered Reveal Animations for Key Sections
    if (typeof ScrollTrigger !== 'undefined') {
      // Reveal Section Titles and Subtitles
      const sectionTitles = document.querySelectorAll('.section-title, .section-header, .module-title, .section-subtitle');
      sectionTitles.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out'
        });
      });

      // Reveal Business Catalog & Feature Cards with Stagger
      const cardGrids = document.querySelectorAll('#catalogGrid, .category-cards-grid, .bank-cards-grid, .enterprise-gallery-grid');
      cardGrids.forEach((grid) => {
        const cards = grid.children;
        if (cards && cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
          });
        }
      });

      // Reveal Financial Dashboard Container
      const dashboardContainer = document.querySelector('.calculator-dashboard');
      if (dashboardContainer) {
        gsap.from(dashboardContainer, {
          scrollTrigger: {
            trigger: dashboardContainer,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out'
        });
      }

      // Smooth Hover Micro-animations on Buttons
      const interactiveButtons = document.querySelectorAll('.btn-primary, .btn-accent, .btn-outline');
      interactiveButtons.forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power1.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1.0, duration: 0.2, ease: 'power1.out' });
        });
      });
    }

    console.log("Lenis Smooth Scroll & GSAP ScrollTrigger initialized successfully.");
  }

});


