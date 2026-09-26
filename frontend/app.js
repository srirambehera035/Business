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
  const formRegister = document.getElementById('formRegister');
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
  setupVoiceToTextButtons();
  setupVoiceSearch();
  initMap();
  setupTabNavigation();
  setupStickyNavActions();

  // Render MSJE & Feasibility Modules
  renderCategoryCards();
  renderSeasonalCalendar();
  renderBankDirectory();
  setupComparisonTool();
  setupAudioSarthi();
  setupWhatsAppSharing();

  // Select initial business & calculate
  selectBusiness(BUSINESSES_DATA[0]);

  // Apply initial translations
  updateLanguageTexts();

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

  // --- FIXED RESILIENT LEAFLET MAP ENGINE ---
  function initMap() {
    const mapContainer = document.getElementById('leafletMap');
    if (!mapContainer) return;

    const hansapalCoords = [20.3155, 85.8722];

    try {
      leafletMap = L.map('leafletMap', {
        center: hansapalCoords,
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false
      });

      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors | Ministry of Social Justice & Empowerment'
      });
      tileLayer.addTo(leafletMap);

      const centerIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div style="background:#0b3b60; color:#fff; width:34px; height:34px; border-radius:50%; border:2px solid #ff9933; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.35); font-size:15px;"><i class="fa-solid fa-scale-balanced"></i></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      L.marker(hansapalCoords, { icon: centerIcon })
        .addTo(leafletMap)
        .bindPopup('<strong>Pilot Benchmark Cluster</strong><br>Hansapal Junction, NH-16 Axis, Khordha (751010)<br>Coordinates: 20.3155° N, 85.8722° E')
        .openPopup();

      L.circle(hansapalCoords, {
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.14,
        radius: 5000,
        weight: 2
      }).addTo(leafletMap).bindPopup('<strong>5 km Immediate Market Catchment</strong><br>Est. Population: 52,000 across Hansapal, Naharkanta & Pandra');

      L.circle(hansapalCoords, {
        color: '#f59e0b',
        fillOpacity: 0.05,
        radius: 10000,
        dashArray: '5, 8',
        weight: 1.5
      }).addTo(leafletMap).bindPopup('<strong>10 km Broader Urban Catchment</strong><br>Regional Reach: 2,10,000');

      if (typeof COMPETITOR_POIS !== 'undefined') {
        COMPETITOR_POIS.forEach(poi => {
          if (poi.lat && poi.lon) {
            L.circleMarker([poi.lat, poi.lon], {
              radius: 5,
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.85,
              weight: 1
            }).addTo(leafletMap).bindPopup(`<strong>${poi.name}</strong><br>Sector: ${poi.type}`);
          }
        });
      }

      setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, 500);

    } catch (err) {
      console.warn("Leaflet Map initialization fallback:", err);
    }
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

    SEASONAL_CALENDAR_DATA.forEach((m, idx) => {
      const card = document.createElement('div');
      card.className = `month-cal-card ${idx === 0 ? 'active' : ''}`;
      card.innerHTML = `
        <div class="m-name">${m.month}</div>
        <span class="badge-cal-pill ${m.status}">${m.demand}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.month-cal-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        noteEl.innerHTML = `<strong>${m.name} Operational Advice:</strong> ${m.notes}`;
      });

      grid.appendChild(card);
    });
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

  // --- FLOATING AUDIO SARTHI AI VOICE ASSISTANT ---
  function setupAudioSarthi() {
    const triggerBtn = document.getElementById('btnTriggerSarthi');
    const dialogCard = document.getElementById('sarthiDialogCard');
    const closeBtn = document.getElementById('btnCloseSarthi');
    const qList = document.getElementById('sarthiQuestionsList');
    const ansBox = document.getElementById('sarthiAnswerBox');
    const ansTxt = document.getElementById('txtSarthiResponseText');
    const replayBtn = document.getElementById('btnReplayAudio');

    if (!triggerBtn || !dialogCard) return;

    triggerBtn.addEventListener('click', () => {
      dialogCard.classList.toggle('open');
      renderAudioSarthiQuestions();
    });

    closeBtn?.addEventListener('click', () => dialogCard.classList.remove('open'));

    replayBtn?.addEventListener('click', () => {
      if (activeAudioResponse) speakAdvisory(activeAudioResponse);
    });
  }

  function renderAudioSarthiQuestions() {
    const qList = document.getElementById('sarthiQuestionsList');
    if (!qList || typeof AUDIO_SARTHI_INTENTS === 'undefined') return;
    qList.innerHTML = '';
    const intents = (AUDIO_SARTHI_INTENTS[currentLang] || AUDIO_SARTHI_INTENTS['en']) || [];

    intents.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'sarthi-q-btn';
      btn.innerHTML = `<i class="fa-solid fa-comment-dots text-orange"></i> ${item.q}`;
      btn.addEventListener('click', () => {
        const ansBox = document.getElementById('sarthiAnswerBox');
        const ansTxt = document.getElementById('txtSarthiResponseText');
        if (ansBox && ansTxt) {
          ansBox.style.display = 'block';
          ansTxt.textContent = item.a;
        }
        activeAudioResponse = item.a;
        speakAdvisory(item.a);
      });
      qList.appendChild(btn);
    });
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

    const trendingPillsContainer = document.getElementById('aiTrendingPills');
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

  // --- SELECT BUSINESS & FULLY UPDATE ALL SECTIONS ---
  function selectBusiness(biz) {
    currentBusiness = biz;
    currentMargin = biz.beneficiary_margin_inr;
    sliderMargin.value = currentMargin;
    dropdownPreferredBiz.value = biz.id;

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

    // Top metrics
    lblMarginValue.textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;
    document.getElementById('valMargin10').textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;
    document.getElementById('valTotalCost').textContent = `₹ ${fin.projectCost.toLocaleString('en-IN')}`;
    document.getElementById('valLoan90').textContent = `₹ ${fin.loanAmount.toLocaleString('en-IN')}`;

    // Scheme Router Banner
    document.getElementById('badgeLogic').textContent = `${fin.logicTag} | ${fin.catInfo.name}`;
    document.getElementById('txtSchemeName').textContent = `${currentBusiness.preferable_scheme || fin.schemeName} (${fin.interestRate}% Interest, ${fin.tenureYears} Years)`;
    document.getElementById('txtSchemeDesc').textContent = 
      `Project cost ₹${fin.projectCost.toLocaleString('en-IN')} routed to ${fin.catInfo.corporation} with a ${fin.moratMonths}-month moratorium holiday and ${fin.catInfo.subvention}.`;

    document.getElementById('txtSubsidyBadge').textContent = fin.catInfo.subsidy_pct;
    document.getElementById('txtApexCorp').textContent = fin.catInfo.corporation;

    document.getElementById('badgeMoratoriumMonths').innerHTML = 
      `<i class="fa-solid fa-clock-rotate-left"></i> Moratorium: ${fin.moratMonths} Months (Quarters 1–${fin.moratQuarters} = ₹0 EMI)`;

    // Repayment Summary
    document.getElementById('valQuarterlyEmi').textContent = `₹ ${Math.round(fin.quarterlyEmi).toLocaleString('en-IN')} / Quarter`;
    document.getElementById('valMonthlyEmi').textContent = `₹ ${Math.round(fin.monthlyEquivalent).toLocaleString('en-IN')} / Month`;
    document.getElementById('valTotalInterest').textContent = `₹ ${Math.round(fin.totalInterest).toLocaleString('en-IN')}`;
    document.getElementById('valTotalRepaid').textContent = `₹ ${Math.round(fin.totalRepaid).toLocaleString('en-IN')}`;

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

    document.getElementById('cfGrossSales').textContent = `₹ ${grossSales.toLocaleString('en-IN')}`;
    document.getElementById('cfRawMaterial').textContent = `₹ ${rawMaterial.toLocaleString('en-IN')}`;
    document.getElementById('cfUtilities').textContent = `₹ ${utilities.toLocaleString('en-IN')}`;
    document.getElementById('cfMonthlyEmi').textContent = `₹ ${monthlyEmi.toLocaleString('en-IN')}`;
    document.getElementById('cfTakeHome').textContent = `₹ ${netTakeHome.toLocaleString('en-IN')} / mo`;

    // Update Eligibility Criteria & Required Documents Checklist
    updateSchemeCriteriaDocs();

    // Update Schedule Table
    const tbody = document.getElementById('tbodySchedule');
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

  // --- MARGIN SLIDER EVENT LISTENER ---
  sliderMargin.addEventListener('input', (e) => {
    currentMargin = parseInt(e.target.value);
    lblMarginValue.textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;
    updateFinancialUI();
  });

  // --- LOCATION SELECTOR LISTENER ---
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

  // --- CITIZEN LOGIN / REGISTRATION MODAL CONTROLLER ---
  btnOpenLogin.addEventListener('click', () => {
    if (currentUser.isLoggedIn) {
      document.querySelector('.tab-btn[data-target="secProfile"]').click();
    } else {
      loginModal.classList.add('active');
    }
  });

  btnCloseLogin.addEventListener('click', () => loginModal.classList.remove('active'));

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    currentUser.name = document.getElementById('regName').value || "Sriram Jena";
    currentUser.mobile = document.getElementById('regMobile').value || "9876543210";
    currentUser.category = document.getElementById('regCategory').value || "sc";
    currentUser.state = document.getElementById('regState').value;
    currentUser.district = document.getElementById('regDistrict').value;
    currentUser.area = document.getElementById('regArea').value;
    currentUser.pin = document.getElementById('regPin').value;
    currentUser.margin = parseInt(document.getElementById('regMargin').value) || 48000;
    
    currentCategory = currentUser.category;
    document.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-cat-id') === currentCategory);
    });

    const selectedStatus = document.querySelector('input[name="bizStatus"]:checked');
    if (selectedStatus) currentUser.status = selectedStatus.value;
    currentUser.isLoggedIn = true;

    loginModal.classList.remove('active');
    triggerVerificationAnimation();
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

      currentMargin = currentUser.margin;
      sliderMargin.value = currentMargin;
      updateFinancialUI();
      updateAuthButtonText();

      document.querySelector('.tab-btn[data-target="secProfile"]').click();
      announceWelcome();
    }, 2200);
  }

  // --- USER PROFILE PAGE CONTROLLER ---
  function updateUserProfileData() {
    const fin = calculateFinances(currentMargin);

    document.getElementById('profDisplayName').textContent = currentUser.name;
    document.getElementById('profMobile').textContent = `+91 ${currentUser.mobile}`;
    document.getElementById('profLocation').textContent = `${currentUser.area}, ${currentUser.district}, ${currentUser.state} (${currentUser.pin})`;
    document.getElementById('profBizStatus').textContent = currentUser.status;
    document.getElementById('profBizName').textContent = currentBusiness.name;
    document.getElementById('profSector').textContent = currentBusiness.category;
    document.getElementById('profMargin').textContent = `₹ ${currentMargin.toLocaleString('en-IN')}`;
    
    document.getElementById('profSchemeStatus').textContent = `${currentBusiness.preferable_scheme ? currentBusiness.preferable_scheme.split('(')[0] : fin.schemeName} (${fin.interestRate}% p.a.)`;
    document.getElementById('profLoanCapacity').textContent = `₹ ${fin.loanAmount.toLocaleString('en-IN')} (90% Loan)`;
    document.getElementById('lblDprRefCode').textContent = `MSJE-${currentUser.state.substring(0,2).toUpperCase()}-${currentUser.pin}-${Math.floor(1000 + Math.random()*9000)}`;

    const catBadge = document.getElementById('profCategoryBadge');
    if (catBadge && fin.catInfo) {
      catBadge.textContent = `${fin.catInfo.name} (${fin.catInfo.corporation.split('(')[0]})`;
    }
  }

  document.getElementById('btnLogout').addEventListener('click', () => {
    currentUser.isLoggedIn = false;
    updateAuthButtonText();
    document.querySelector('.tab-btn[data-target="secModule1"]').click();
  });

  document.getElementById('btnEditProfile').addEventListener('click', () => {
    loginModal.classList.add('active');
  });

  // --- TAB NAVIGATION & STICKY NAVBAR HOOKS ---
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
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
        if (el.children.length === 0) {
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
    try { renderAudioSarthiQuestions(); } catch (err) { console.warn('renderAudioSarthiQuestions:', err); }
    try { updateSchemeCriteriaDocs(); } catch (err) { console.warn('updateSchemeCriteriaDocs:', err); }

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
    if (!txtAuthBtn) return;
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang]) ? TRANSLATIONS[currentLang] : (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS['en'] : {});

    if (currentUser && currentUser.isLoggedIn) {
      txtAuthBtn.textContent = `Citizen: ${currentUser.name.split(' ')[0]}`;
    } else {
      txtAuthBtn.textContent = dict['btnLogin'] || "Login / Register";
    }
  }
  // --- MULTI-LINGUAL BHASHINI SPEECH NARRATOR ---
  function getVoiceLocale(lang) {
    const map = {
      hi: 'hi-IN', or: 'hi-IN', bn: 'bn-IN', 
      te: 'te-IN', ta: 'ta-IN', mr: 'mr-IN', en: 'en-IN'
    };
    return map[lang] || 'en-IN';
  }

  function speakAdvisory(text) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getVoiceLocale(currentLang);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }
  }

  function announceWelcome() {
    const p = (SPEECH_PROMPTS[currentLang] || SPEECH_PROMPTS['en']).welcome;
    const msg = p.replace('{name}', currentUser.name.split(' ')[0]);
    speakAdvisory(msg);
  }

  function announceBusinessSelection(biz) {
    const p = (SPEECH_PROMPTS[currentLang] || SPEECH_PROMPTS['en']).biz_selected;
    const fin = calculateFinances(biz.beneficiary_margin_inr);
    const msg = p
      .replace('{biz}', biz.name.split('&')[0])
      .replace('{margin}', biz.beneficiary_margin_inr)
      .replace('{cost}', fin.projectCost)
      .replace('{loan}', fin.loanAmount);
    speakAdvisory(msg);
  }

  function setupVoiceSearch() {
    const statusTxt = document.getElementById('txtVoiceStatus');

    if (btnVoiceMic) btnVoiceMic.addEventListener('click', () => {
      btnVoiceMic.classList.add('listening');
      statusTxt.textContent = "Listening...";

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = getVoiceLocale(currentLang);
        recognition.start();

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          btnVoiceMic.classList.remove('listening');
          statusTxt.textContent = `Heard: "${transcript}"`;
          
          const matched = BUSINESSES_DATA.find(b => 
            transcript.toLowerCase().includes(b.name.toLowerCase().substring(0, 5)) ||
            transcript.toLowerCase().includes(b.category.toLowerCase().substring(0, 5))
          );
          if (matched) selectBusiness(matched);
        };

        recognition.onerror = () => {
          btnVoiceMic.classList.remove('listening');
          statusTxt.textContent = "Bhashini Voice Input";
        };
      } else {
        setTimeout(() => {
          btnVoiceMic.classList.remove('listening');
          statusTxt.textContent = "Voice input ready";
        }, 1200);
      }
    });
  }

  // --- CENTER VIDEO DEMO PLAYER WALKTHROUGH ---
  let videoChapter = 1;

  btnPlayDemo?.addEventListener('click', () => {
    const p = SPEECH_PROMPTS[currentLang] || SPEECH_PROMPTS['en'];
    const chKey = `ch${videoChapter}`;
    speakAdvisory(p[chKey] || p['ch1']);
  });

  btnNextChapter?.addEventListener('click', () => {
    videoChapter = (videoChapter % 4) + 1;
    const chTitles = [
      "1. Select State & Village",
      "2. Enter 10% Margin Capital",
      "3. Inspect Feasibility & Threat Radar",
      "4. Download Bank-Ready DPR"
    ];
    document.getElementById('txtVideoOverlayTitle').textContent = `Step ${videoChapter}: ${chTitles[videoChapter - 1]}`;
    const p = SPEECH_PROMPTS[currentLang] || SPEECH_PROMPTS['en'];
    speakAdvisory(p[`ch${videoChapter}`] || p['ch1']);
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

});
