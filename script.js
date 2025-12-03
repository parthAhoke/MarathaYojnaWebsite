// script.js — ENHANCED VERSION with all features

// ========== INITIALIZATION ==========
let favorites = JSON.parse(localStorage.getItem('marathaFavorites')) || [];
let showOnlyFavorites = false;
let currentSort = 'default';

// Dark Mode
function initDarkMode() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('.icon-sun')?.classList.add('hidden');
    document.querySelector('.icon-moon')?.classList.remove('hidden');
  }
}

// schemes array (Maratha-targeted + related central/state schemes)
// You can expand this array later to 50+ items; currently includes many commonly-used schemes.
const schemes = [
  {
    name: "अन्नासाहेब पाटील आर्थिक विकास महामंडळ",
    description: "Maratha समाजातील युवकांसाठी स्वरोजगार/कर्ज/मार्गदर्शन.",
    eligibility: "Maratha समाजातील युवक, 18-35 वर्षे (स्थानिक नियम तपासा)",
    amount: "Varies (loan / subsidy)",
    link: "https://mahaswayamrojgar.maharashtra.gov.in/",
    category: "financial",
    guide: [
      "साइट उघडा आणि 'New User / Register' करा.",
      "Aadhaar व bank details तयार ठेवा.",
      "आवश्यक कागदपत्रे अपलोड करा आणि Submit करा."
    ],
    documents: ["आधार कार्ड","जात प्रमाणपत्र","उत्पन्न प्रमाणपत्र","बँक पासबुक"]
  },
  {
    name: "महाराष्ट्र राज्य पिछडा वर्ग वित्त आणि विकास महामंडळ (MSOBFDC)",
    description: "OBC/इतर मागास वर्गांसाठी कर्ज व अनुदान.",
    eligibility: "OBC / संबंधित समाज (स्थानिक निकष तपासा)",
    amount: "Varies",
    link: "https://msobcfdc.in/",
    category: "financial",
    guide: [
      "साइट उघडा किंवा MahaDBT तपासा.",
      "रजिस्टर करा, अर्ज भरा आणि कागदपत्रे अपलोड करा."
    ],
    documents: ["आधार कार्ड","जात प्रमाणपत्र","उत्पन्न प्रमाणपत्र","बँक पासबुक"]
  },
  {
    name: "SARTHI (Chhatrapati Shahu Maharaj Research, Training & HD Institute)",
    description: "प्रशिक्षण, संशोधन आणि मानव विकासासाठी सहाय्य (Maharashtra).",
    eligibility: "Maratha समाजातील युवक/महिला (प्रोग्रामनुसार खुला असू शकतो)",
    amount: "Training / Scholarship / Support",
    link: "https://www.sarthi-maharashtragov.in/",
    category: "education",
    guide: [
      "SARTHI ची वेबसाईट उघडा.",
      "प्रशिक्षण/शिष्यवृत्ती साठी अर्ज भरा.",
      "आवश्यक कागदपत्रे अपलोड करा आणि Submit करा."
    ],
    documents: ["आधार कार्ड","जात प्रमाणपत्र","उत्पन्न प्रमाणपत्र","बँक पासबुक"]
  },
  {
    name: "राजर्षी शाहू महाराज शिष्यवृत्ती योजना",
    description: "आर्थिकदृष्ट्या मागासलेल्या विद्यार्थ्यांसाठी शिष्यवृत्ती.",
    eligibility: "Maratha विद्यार्थी (आर्थिकदृष्ट्या मागासलेले — तपासा)",
    amount: "Varies",
    link: "https://mahadbt.maharashtra.gov.in/",
    category: "education",
    guide: [
      "MahaDBT पोर्टल उघडा.",
      "रजिस्टर करा / लॉगिन करा.",
      "शिष्यवृत्ती अर्ज भरा व दस्तऐवज अपलोड करा."
    ],
    documents: ["10वी/12वी मार्कशीट","आधार","जात प्रमाणपत्र","बँक तपशील"]
  },
  {
    name: "डॉ. पं. नेहरू शिष्यवृत्ती योजना",
    description: "विद्यार्थ्यांसाठी राहणी व शिक्षणाच्या मदतीची शिष्यवृत्ती.",
    eligibility: "Students (varies)",
    amount: "Varies",
    link: "https://mahadbt.maharashtra.gov.in/",
    category: "education",
    guide: [
      "MahaDBT वर रजिस्टर करा.",
      "अर्ज भरा आणि कागदपत्रे अपलोड करा."
    ],
    documents: ["आधार","बँक तपशील","विद्यार्थ्याचा फोटो","शाळेचे प्रमाणपत्र"]
  },
  {
    name: "स्वाधार योजना",
    description: "निवास/अन्न/शिक्षणासाठी सहाय्य (vulnerable students).",
    eligibility: "लागू वर्ग (Maharashtra DBT details)",
    amount: "Varies",
    link: "https://www.mahadbtmaharashtra.org/swadhar-yojana-form-eligibility-documents-benefits/",
    category: "education",
    guide: [
      "स्वाधार लिंक वाचून अर्ज भरा.",
      "दस्तऐवज अपलोड करा व Submit करा."
    ],
    documents: ["आधार","जात प्रमाणपत्र","उत्पन्न प्रमाणपत्र","शाळेचे प्रमाणपत्र"]
  },
  {
    name: "MHADA घरकुल योजना",
    description: "MHADA मार्फत घरकुल लाटरी / घर योजना (Maharashtra).",
    eligibility: "राज्यातील पात्र नागरिक",
    amount: "Varies (project-specific)",
    link: "https://www.mhada.gov.in/en",
    category: "housing",
    guide: [
      "MHADA पोर्टल उघडा.",
      "प्रोजेक्ट तपासा, रजिस्ट्रेशन/लॉटरी अर्ज भरा."
    ],
    documents: ["आधार","उत्पन्न प्रमाणपत्र","बँक तपशील","घरकुल अर्ज फॉर्म"]
  },
  {
    name: "CMEGP (Chief Minister Employment Generation Programme)",
    description: "उद्योग/उद्योजकता साठी मार्गदर्शन व कर्ज सहाय्य.",
    eligibility: "उद्योजक / Maratha युवक/महिला",
    amount: "Varies (loan / subsidy)",
    link: "https://maha-cmegp.gov.in/onlineapplication",
    category: "financial",
    guide: [
      "CMEGP पोर्टल उघडा आणि नवीन रजिस्ट्रेशन करा.",
      "अर्ज भरा, व्यवसाय योजना जोडा आणि Submit करा."
    ],
    documents: ["आधार","जात प्रमाणपत्र","व्यवसाय योजना","बँक तपशील"]
  },
  {
    name: "प्रधानमंत्री आवास योजना (PMAY)",
    description: "गरीब / मध्यम गटांसाठी घरकुल अनुदान (PMAY-U / PMAY-G).",
    eligibility: "आर्थिकदृष्ट्या पात्र नागरिक",
    amount: "CLSS interest subsidy व अनुदान (Varies)",
    link: "https://pmaymis.gov.in/",
    category: "housing",
    guide: [
      "PMAY साइट उघडा (Citizen Assessment).",
      "रजिस्टर करा आणि अर्ज पद्धत हाताळा."
    ],
    documents: ["आधार","घरकुल कागद","बँक तपशील"]
  },
  {
    name: "प्रधानमंत्री कौशल विकास योजना (PMKVY)",
    description: "मोफत कौशल्य प्रशिक्षण आणि प्रमाणपत्र.",
    eligibility: "सर्व युवक/युवती",
    amount: "Training & Certification",
    link: "https://www.msde.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kaushal-vikas-yojana-4-0-pmkvy-4-0-2021-ITO3ATMtQWa",
    category: "education",
    guide: [
      "PMKVY / Skill India पोर्टल उघडा.",
      "रजिस्टर करा व उपलब्ध कोर्स निवडा."
    ],
    documents: ["आधार","शैक्षणिक प्रमाणपत्र (if required)"]
  },
  {
    name: "प्रधानमंत्री जन-धन योजना (PMJDY)",
    description: "बँकिंग इनक्लूजन — Jan Dhan खात्यांची सुरुवात.",
    eligibility: "सर्व भारतीय नागरिक",
    amount: "Zero balance basic account + benefits",
    link: "https://pmjdy.gov.in",
    category: "financial",
    guide: [
      "PMJDY पोर्टल / नजिकच्या बँकेत जा.",
      "KYC आणि दस्तऐवज दाखवा व खाते उघडा."
    ],
    documents: ["आधार","मोबाईल नंबर","ओळख/पत्ता दस्तऐवज"]
  },
  {
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description: "लहान व मध्यम शेतकऱ्यांसाठी वार्षिक आर्थिक मदत.",
    eligibility: "भूमीसंपन्न शेतकरी परिवार",
    amount: "₹6,000/वर्ष (3 हिशेबात)",
    link: "https://pmkisan.gov.in/",
    category: "agriculture",
    guide: [
      "PMKISAN पोर्टलवर Self-Register करा किंवा जिल्हा कृषी विभागाकडून नोंदणी करा.",
      "आवश्यक कागदपत्रे आणि जमीन माहिती जोडा."
    ],
    documents: ["आधार","बँक विवरण","भूमी कागद"]
  },
  {
    name: "Kisan Credit Card (KCC)",
    description: "शेतीसंदर्भातील working capital कर्ज कार्ड (bank-specific apply).",
    eligibility: "शेतकरी (बँक निकषानुसार)",
    amount: "Varies by bank",
    link: "https://www.rbi.org.in/",
    category: "agriculture",
    guide: [
      "नजीकच्या बँकेच्या कृषि शाखेशी संपर्क करा.",
      "आवश्यक KYC आणि जमीन कागदपत्रे द्या."
    ],
    documents: ["आधार","जमिनीची माहिती","बँक खाते तपशील"]
  },
  {
    name: "मुख्यमंत्री कन्यादान / कन्या विवाह सहाय्य",
    description: "कन्येसाठी विवाह/आर्थिक सहाय्य (state scholarships portal मध्ये तपासा).",
    eligibility: "पात्र कन्या/कुटुंब",
    amount: "Varies",
    link: "https://mahadbt.maharashtra.gov.in/",
    category: "women",
    guide: [
      "MahaDBT वर लॉगिन करा/रजिस्टर करा.",
      "कन्या सहाय्य अर्ज भरा व कागदपत्रे अपलोड करा."
    ],
    documents: ["आधार","जन्म प्रमाणपत्र","उत्पन्न प्रमाणपत्र"]
  },
  {
    name: "इंदिरा गांधी मातृत्व सहाय्य योजना",
    description: "गर्भवती महिलांसाठी आर्थिक सहाय्य (state portal).",
    eligibility: "गर्भवती महिला",
    amount: "₹5,000-₹10,000",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=4021",
    category: "health",
    guide: [
      "सरकारी लिंक उघडा",
      "अर्ज भरा व कागदपत्रे अपलोड करा"
    ],
    documents: ["गर्भवतीचे प्रमाणपत्र", "आधार", "बँक तपशील"]
  }
  // तुम्ही इथे आणखी items add करू शकता (उदा. 50+ साठी मी पुढे भरून देईन)
];

// ========== UI ELEMENTS ==========
const schemesGrid = document.getElementById('schemesGrid');
const filterCategory = document.getElementById('filterCategory');
const searchInput = document.getElementById('searchInput');
const sortBySelect = document.getElementById('sortBy');
const showFavoritesBtn = document.getElementById('showFavoritesBtn');
const backToTopBtn = document.getElementById('backToTop');
const darkModeToggle = document.getElementById('darkModeToggle');
const loadingSpinner = document.getElementById('loadingSpinner');

// ========== FAVORITES MANAGEMENT ==========
function toggleFavorite(schemeName) {
  const index = favorites.indexOf(schemeName);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(schemeName);
  }
  localStorage.setItem('marathaFavorites', JSON.stringify(favorites));
  updateFavoriteCount();
  renderSchemes();
}

function isFavorite(schemeName) {
  return favorites.includes(schemeName);
}

function updateFavoriteCount() {
  const count = document.getElementById('favoriteCount');
  if (count) count.textContent = favorites.length;
}

// ========== DARK MODE ==========
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  
  document.querySelector('.icon-sun')?.classList.toggle('hidden');
  document.querySelector('.icon-moon')?.classList.toggle('hidden');
}

// ========== STATISTICS ==========
function updateStatistics() {
  const totalSchemes = document.getElementById('totalSchemes');
  if (totalSchemes) {
    animateCounter(totalSchemes, schemes.length);
  }
  updateFavoriteCount();
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// ========== SORTING ==========
function sortSchemes(schemesArray) {
  const sorted = [...schemesArray];
  switch(currentSort) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}

// ========== SHARE FUNCTIONALITY ==========
function shareScheme(scheme) {
  const text = `${scheme.name}\n${scheme.description}\n\nअधिक माहिती: ${scheme.link}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
}

// helper: YouTube search link for application video in Marathi
function buildYouTubeSearchURL(schemeName) {
  const q = encodeURIComponent(`${schemeName} अर्ज कसा भरावा`);
  return `https://www.youtube.com/results?search_query=${q}`;
}

// ========== RENDER SCHEMES ==========
function renderSchemes() {
  if (!schemesGrid) return;
  
  // Show loading
  if (loadingSpinner) loadingSpinner.classList.remove('hidden');
  
  setTimeout(() => {
    const term = (searchInput?.value || '').toLowerCase();
    const category = (filterCategory?.value || 'all');
    schemesGrid.innerHTML = '';
    
    let filteredSchemes = schemes.filter(s => {
      const matchesTerm = s.name.toLowerCase().includes(term) || s.description.toLowerCase().includes(term);
      const matchesCategory = (category === "all" || s.category === category);
      const matchesFavorite = !showOnlyFavorites || isFavorite(s.name);
      return matchesTerm && matchesCategory && matchesFavorite;
    });
    
    // Sort schemes
    filteredSchemes = sortSchemes(filteredSchemes);
    
    filteredSchemes.forEach((s, index) => {
      const card = document.createElement('div');
      card.className = 'scheme-card';
      card.style.animationDelay = `${index * 0.05}s`;
      const isFav = isFavorite(s.name);
      
      card.innerHTML = `
        <button class="favorite-btn ${isFav ? 'active' : ''}" data-scheme="${s.name}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <h3>${s.name}</h3>
        <p class="desc">${s.description}</p>
        <p><strong>रक्कम / सहाय्य:</strong> ${s.amount}</p>
        <p><strong>Eligibility:</strong> ${s.eligibility || 'पात्रता पृष्ठावर तपासा'}</p>
        <div class="card-actions">
          <button class="readMoreBtn">Read More</button>
          <a class="applyBtn" href="${s.link}" target="_blank" rel="noopener">Apply</a>
          <button class="share-btn" data-scheme-index="${index}">📤 Share</button>
        </div>
      `;
      schemesGrid.appendChild(card);
      
      // Event listeners
      card.querySelector('.readMoreBtn').addEventListener('click', () => openModal(s));
      card.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(s.name);
      });
      card.querySelector('.share-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        shareScheme(s);
      });
    });
    
    // No results message
    if (filteredSchemes.length === 0) {
      const noResults = document.createElement('div');
      noResults.style.gridColumn = '1 / -1';
      noResults.style.textAlign = 'center';
      noResults.style.padding = '40px';
      noResults.style.color = '#ff6600';
      noResults.innerHTML = `<h3>😔 कोणतीही योजना सापडली नाही</h3><p>कृपया दुसरा शोध प्रयत्न करा</p>`;
      schemesGrid.appendChild(noResults);
    } else {
      // upcoming note
      const note = document.createElement('p');
      note.style.gridColumn = '1 / -1';
      note.style.textAlign = 'center';
      note.style.marginTop = '15px';
      note.style.fontStyle = 'italic';
      note.style.color = '#ff6600';
      note.style.fontWeight = 'bold';
      note.textContent = "🚀 पुढील योजना लवकरच अपडेट होतील…";
      schemesGrid.appendChild(note);
    }
    
    // Hide loading
    if (loadingSpinner) loadingSpinner.classList.add('hidden');
  }, 300);
}

// ========== MODAL ==========
// open modal with better formatted structure and YouTube help
function openModal(scheme) {
  const youtubeURL = buildYouTubeSearchURL(scheme.name);
  const modalContent = document.getElementById('modalContent');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <h2 style="color:#ff6600; margin-bottom:10px;">${scheme.name}</h2>
    <p style="margin-bottom:10px;">${scheme.description}</p>

    <p><strong>रक्कम / सहाय्य:</strong> ${scheme.amount}</p>
    <p><strong>Eligibility:</strong> ${scheme.eligibility || 'पात्रता पृष्ठावर तपासा'}</p>

    <h3 style="margin-top:15px;">Form भरायचा मार्गदर्शक:</h3>
    <ol style="padding-left:20px; margin-bottom:10px;">
      ${scheme.guide.map(step => `<li style="margin-bottom:6px;">${step}</li>`).join('')}
    </ol>

    <h3 style="margin-top:10px;">आवश्यक कागदपत्रे:</h3>
    <ul style="padding-left:20px; margin-bottom:10px;">
      ${(scheme.documents || []).map(doc => `<li style="margin-bottom:4px;">${doc}</li>`).join('')}
    </ul>

    <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
      <a href="${scheme.link}" target="_blank" rel="noopener" style="padding:10px 16px; background:#ff6600; color:white; border-radius:6px; text-decoration:none; font-weight:bold;">
        Apply / Govt Link
      </a>
      <a href="${youtubeURL}" target="_blank" rel="noopener" style="padding:10px 16px; background:#ff8533; color:white; border-radius:6px; text-decoration:none; font-weight:bold;">
        How to Apply (Video)
      </a>
    </div>

    <p style="margin-top:12px; color:#666; font-size:0.95em;">
      नोट: सरकारी पोर्टल्सवर लिंक कधीही बदलू शकतात — लिंक काम करत नसेल तर स्थानिक जिल्हा कार्यालय, CSC किंवा हेल्पलाइनशी संपर्क करा.
    </p>
  `;

  document.getElementById('modalOverlay').classList.remove('hidden');
}

// close modal
document.getElementById('modalClose')?.addEventListener('click', () => {
  document.getElementById('modalOverlay')?.classList.add('hidden');
});

// Close modal on overlay click
document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') {
    document.getElementById('modalOverlay')?.classList.add('hidden');
  }
});

// ========== EVENT LISTENERS ==========
// Search & filter
searchInput?.addEventListener('input', renderSchemes);
filterCategory?.addEventListener('change', renderSchemes);

// Sort
sortBySelect?.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderSchemes();
});

// Show favorites toggle
showFavoritesBtn?.addEventListener('click', () => {
  showOnlyFavorites = !showOnlyFavorites;
  showFavoritesBtn.classList.toggle('active');
  showFavoritesBtn.textContent = showOnlyFavorites ? '📋 Show All' : '❤️ Favorites';
  renderSchemes();
});

// Dark mode toggle
darkModeToggle?.addEventListener('click', toggleDarkMode);

// Back to top button
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== PWA INSTALLATION ==========
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.classList.remove('hidden');
  }
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('PWA installed');
  }
  
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
  // ESC to close modal
  if (e.key === 'Escape') {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
      modalOverlay.classList.add('hidden');
    }
  }
  
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput?.focus();
  }
});

// ========== INITIALIZATION ==========
initDarkMode();
updateStatistics();

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered:', registration))
      .catch(error => console.log('Service Worker registration failed:', error));
  });
}

// initial render
renderSchemes();
