/**
 * Sonar BSB Events App
 * Frontend Application & Interaction Logic
 * Based on Figma Design: Sonar-BSB-EventsApp-v1 (File: i3bqFIafJrUlUqn2NMUwIl)
 */

// ============================================================================
// Events Database (Exact 9 events from Figma frames 2.1, 2.2, 2.3)
// ============================================================================
const EVENTS_DATA = [
  // Frame 2.1: What's on Today
  {
    id: "trema-techno",
    title: "Trema Techno: Subsolo Urbano",
    category: "today",
    dateDay: "15",
    dateMonth: "AUG",
    dateFormatted: "Saturday, August 15, 2026",
    time: "22:00h",
    venue: "Galeria dos Estados, Setor Comercial Sul",
    price: 60.00,
    priceFormatted: "$ 60.00",
    image: "./assets/event-trema.png",
    tagline: "Raw concrete, deep loops.",
    description: "Underneath the iconic concrete columns of Brasília's heart, Trema Techno transforms a raw, historical public transit tunnel into a booming industrial sanctuary. Expect heavy subwoofer arrays, minimalist strobe layouts, and dark, high-bpm energy reflecting the visual geometry of the capital.",
    lineup: [
      { name: "Oblongui", bio: "A staple of Brasília’s underground warehouse scene, known for relentless hypnotic loops and blending deep 90s vinyl techno with hard-edged modern industrial sounds." },
      { name: "Maze One", bio: "An expert in dark-ambient techno whose progression sets are heavily inspired by concrete architecture, shifting seamlessly from ambient textures to pounding 140 BPM kicks." }
    ],
    venueDesc: "Serving as a subterranean pedestrian artery connecting the commercial and banking sectors, this brutalist tunnel is a monument to Brasília's urbanist blueprint. Its raw concrete pillars, low-ceiling acoustics, and gritty industrial atmosphere make it the premier site for large-scale underground warehouse raves in the heart of Plano Piloto.",
    genre: "Techno / Industrial"
  },
  {
    id: "vapor-cybernetic",
    title: "Vapø_R: Cybernetic Cathedral",
    category: "today",
    dateDay: "15",
    dateMonth: "AUG",
    dateFormatted: "Saturday, August 15, 2026",
    time: "23:00h",
    venue: "Birosca do Conic, Setor de Diversões Sul (SDS)",
    price: 80.00,
    priceFormatted: "$ 80.00",
    image: "./assets/event-vapor.png",
    tagline: "Cyber-electro, dark disco and laser arrays.",
    description: "High-octane cyber-electro and dark disco curated for the nocturnal souls of Conic. Immersive laser installations, reactive visuals, and heavy basslines bridging dystopian futures with retrofuturism.",
    lineup: [
      { name: "Vapø_R Collective", bio: "Pioneers of dark-synth and EBM in the central plateau with custom modular synths." },
      { name: "Cyberia", bio: "Resident selector delivering high-energy electroclash and acid basslines." }
    ],
    venueDesc: "Birosca do Conic is Brasília's countercultural epicenter, nested in the vibrant brutalism of Setor de Diversões Sul.",
    genre: "Electro / Synthwave"
  },
  {
    id: "concrete-beats",
    title: "Concrete Beats Festival",
    category: "today",
    dateDay: "15",
    dateMonth: "AUG",
    dateFormatted: "Saturday, August 15, 2026",
    time: "16:00h",
    venue: "Praça das Fontes, Parque da Cidade",
    price: 160.00,
    priceFormatted: "$ 160.00",
    image: "./assets/event-concrete.png",
    tagline: "Open-air electronic festival in the park.",
    description: "The grand outdoor electronic music festival celebrating the legacy of Oscar Niemeyer's modernist capital. Multiple stages with international headliners, food village, and visual art projections on water fountains.",
    lineup: [
      { name: "Aura Sonar", bio: "Melodic techno live act celebrated across South American festivals." },
      { name: "Metropolis Orchestra", bio: "Electronic modular live performance with synchronized string quartet." }
    ],
    venueDesc: "Praça das Fontes offers vast open sky, Burle Marx landscaping, and brutalist geometric tiles inside South America's largest city park.",
    genre: "Melodic House / Deep Tech"
  },

  // Frame 2.2: What's Coming This Month
  {
    id: "externa-monolith",
    title: "Externa Collective: Monolith",
    category: "month",
    dateDay: "19",
    dateMonth: "AUG",
    dateFormatted: "Wednesday, August 19, 2026",
    time: "22:00h",
    venue: "Externa Club, Setor Comercial Sul (SCS)",
    price: 70.00,
    priceFormatted: "$ 70.00",
    image: "./assets/event-externa.png",
    tagline: "Hypnotic basslines and dark minimalism.",
    description: "Externa Collective takes over SCS with a monolithic sound rig designed specifically for sub-bass acoustics and dark hypnotic techno.",
    lineup: [
      { name: "Monolith Sound System", bio: "Custom high-fidelity rig delivering pure low-frequency pressure." },
      { name: "Laura Diaz", bio: "Fast-groove techno selector known for unyielding energy and vinyl precision." }
    ],
    venueDesc: "Externa Club is an intimate subterranean nightclub dedicated to forward-thinking club culture.",
    genre: "Hypnotic Techno"
  },
  {
    id: "traco-echoes",
    title: "Traço: Echoes of Oscar",
    category: "month",
    dateDay: "20",
    dateMonth: "AUG",
    dateFormatted: "Thursday, August 20, 2026",
    time: "23:00h",
    venue: "Subsolo do Teatro Dulcina Conic",
    price: 50.00,
    priceFormatted: "$ 50.00",
    image: "./assets/event-traco.png",
    tagline: "Architectural rave in Dulcina's basement.",
    description: "A celebration of curves, modernist lines, and sound design located inside the subterranean amphitheater of Teatro Dulcina.",
    lineup: [
      { name: "Dulcina Sound Collective", bio: "Underground performers blending theater dramaturgy with experimental techno." },
      { name: "Niemeyer's Ghost", bio: "Dark ambient breakbeat live modular performance." }
    ],
    venueDesc: "Teatro Dulcina was designed by Oscar Niemeyer with brutalist concrete ribs and exceptional underground acoustic resonance.",
    genre: "Breakbeat / Ambient"
  },
  {
    id: "low-club-sunset",
    title: "Low Club: Sunset Horizon",
    category: "month",
    dateDay: "22",
    dateMonth: "AUG",
    dateFormatted: "Saturday, August 22, 2026",
    time: "14:00h",
    venue: "Orla do Lago Paranoá, Setor de Clubes Esportivos Sul",
    price: 120.00,
    priceFormatted: "$ 120.00",
    image: "./assets/event-lowclub.png",
    tagline: "Lakeside deep house & progressive sunset.",
    description: "Warm afternoon sun dipping beneath Ponte JK with deep melodic house grooves vibrating across the clear waters of Lago Paranoá.",
    lineup: [
      { name: "Paranoá Deep", bio: "Melodic house veterans blending aquatic synths with organic percussion." },
      { name: "Marina Live", bio: "Saxophone and synthesizer sunset improvisation." }
    ],
    venueDesc: "The lakeshore of Brasília features world-renowned sunsets, cool evening breezes, and panoramic views of the modern cable-stayed bridge.",
    genre: "Deep House / Progressive"
  },

  // Frame 2.3: Hot and Upcoming Events
  {
    id: "makoomba-ancestral",
    title: "Makoomba: Eletrônico Ancestral",
    category: "upcoming",
    dateDay: "28",
    dateMonth: "NOV",
    dateFormatted: "Saturday, November 28, 2026",
    time: "22:00h",
    venue: "Infinu Comunidade Criativa, W3 Sul",
    price: 60.00,
    priceFormatted: "$ 60.00",
    image: "./assets/event-makoomba.png",
    tagline: "Afro-Brazilian percussion meets driving electronic beats.",
    description: "A spiritual fusion of ancestral polyrhythms, berimbau synthesis, and 4/4 electronic drive in Brasília's iconic creative gallery Infinu.",
    lineup: [
      { name: "Makoomba DJ Set", bio: "Heavy tribal percussion with deep atmospheric techno basslines." },
      { name: "Terreiro Sonoro", bio: "Live percussion performance accompanied by analog drum machines." }
    ],
    venueDesc: "Infinu is a bustling creative community center located along the historic commercial strip of W3 Sul.",
    genre: "Afro-Tech / Tribal"
  },
  {
    id: "hum-rooftop-overdrive",
    title: "Hum Rooftop Sessions: Overdrive",
    category: "upcoming",
    dateDay: "04",
    dateMonth: "DEC",
    dateFormatted: "Friday, December 04, 2026",
    time: "16:00h",
    venue: "HUM Espaço Multiuso, Setor de Indústrias Gráficas (SIG)",
    price: 100.00,
    priceFormatted: "$ 100.00",
    image: "./assets/event-hum.png",
    tagline: "Industrial rooftop party overlooking the graphic sector.",
    description: "Open-air industrial rooftop overlooking SIG printing presses and modernist warehouses. Fast electro, breakbeats, and synthwave sunset.",
    lineup: [
      { name: "Overdrive Boys", bio: "Fast electro and acid techno live duo." },
      { name: "DJ SIG", bio: "Resident crate-digger specializing in Brazilian boogie and electro-funk." }
    ],
    venueDesc: "Setor de Indústrias Gráficas (SIG) houses former printing presses repurposed into rooftop venues and artist studios.",
    genre: "Electro / Acid"
  },
  {
    id: "batrave-last-dance",
    title: "Batrave: The Last Dance",
    category: "upcoming",
    dateDay: "31",
    dateMonth: "DEC",
    dateFormatted: "Thursday, December 31, 2026",
    time: "21:00h",
    venue: "Galpão de Oficinas, Setor Industrial",
    price: 240.00,
    priceFormatted: "$ 240.00",
    image: "./assets/event-batrave.png",
    tagline: "The legendary New Year's underground warehouse rave.",
    description: "Brasília's most anticipated underground New Year rave. 12 continuous hours across 3 warehouses in the Industrial Sector with international guest headliners and a massive laser installation.",
    lineup: [
      { name: "Batrave All-Stars", bio: "6-hour b2b marathon set spanning industrial, trance, and hard-groove." },
      { name: "Techno Resistance", bio: "Berlin-inspired warehouse industrial techno." }
    ],
    venueDesc: "A massive decommissioned train and bus maintenance warehouse with 15-meter ceilings and raw steel beams.",
    genre: "Warehouse Techno"
  }
];

// ============================================================================
// Application State
// ============================================================================
const state = {
  activeTab: "today",       // 'today' | 'month' | 'upcoming'
  activeView: "welcome",    // 'welcome' | 'home' | 'search' | 'favorites' | 'tickets' | 'checkout' | 'confirmation'
  favorites: new Set(["trema-techno", "vapor-cybernetic"]), // Default pre-saved
  tickets: [
    {
      ...EVENTS_DATA[1],    // Vapø_R (matches Figma node 783:10833)
      ticketId: "#WFHT100492",
      purchasedAt: "11:49 15/08/2026",
      paymentMethod: "Mastercard •••• 2304",
      status: "Approved",
      regularQty: 1,
      studentQty: 0
    },
    {
      ...EVENTS_DATA[3],    // Externa Collective (matches Figma node 783:10844)
      ticketId: "#WFHT209148",
      purchasedAt: "19:30 14/08/2026",
      paymentMethod: "Apple Pay •••• 8812",
      status: "Approved",
      regularQty: 1,
      studentQty: 1
    }
  ],
  searchQuery: "",
  searchFilters: {
    name: "",
    date: "",
    location: "",
    todayOnly: false
  },
  userProfile: {
    name: "John Doe",
    email: "johndoe@mail.com",
    avatar: "./assets/profile-picture.png"
  }
};

// Checkout flow dynamic state
let checkoutState = {
  event: EVENTS_DATA[0],
  regularQty: 1,
  studentQty: 0,
  regularPrice: EVENTS_DATA[0].price,
  studentPrice: EVENTS_DATA[0].price * 0.5
};

let lastPurchasedTicket = null;
let currentEventInModal = null;

// DOM References
const appContainer = document.getElementById("appContainer");
const welcomeSection = document.getElementById("welcomeSection");
const siteHeader = document.querySelector(".site-header");
const mainScrollContent = document.getElementById("mainScrollContent");
const bottomNavContainer = document.getElementById("bottomNavContainer");
const eventsContainer = document.getElementById("eventsContainer");
const sectionHeaderBlock = document.getElementById("sectionHeaderBlock");
const sectionTitleEl = document.getElementById("sectionTitle");
const sectionSubtitleEl = document.getElementById("sectionSubtitle");
const eventCountBadge = document.getElementById("eventCountBadge");
const navTabsContainer = document.getElementById("navTabsContainer");
const subHeaderNav = document.getElementById("subHeaderNav");
const backButton = document.getElementById("backButton");
const searchFilterPanel = document.getElementById("searchFilterPanel");
const desktopSearchInput = document.getElementById("desktopSearchInput");
const favBadgeEl = document.getElementById("favBadge");
const ticketBadgeEl = document.getElementById("ticketBadge");

// Sections
const checkoutSection = document.getElementById("checkoutSection");
const paymentSection = document.getElementById("paymentSection");
const confirmationSection = document.getElementById("confirmationSection");

// Modals
const eventModal = document.getElementById("eventModal");
const ticketModal = document.getElementById("ticketModal");
const profileModal = document.getElementById("profileModal");
const addPaymentModal = document.getElementById("addPaymentModal");

// ============================================================================
// App Initialization - Responsive Web Model
// ============================================================================
function initApp() {
  if (appContainer) {
    appContainer.className = "app-container";
  }

  updateBadges();
  setupNavEventListeners();

  // Version 1.0: If arriving from standalone login.html, land directly on home; otherwise start on welcome
  if (sessionStorage.getItem("sonar_redirect_from_login") === "true") {
    sessionStorage.removeItem("sonar_redirect_from_login");
    switchView("home");
  } else {
    // When opening the app, always start with the login screen as the first screen
    switchView("welcome");
  }

  setupKeyboardShortcuts();
}

function setupNavEventListeners() {
  const navItems = [
    { id: "navHomeBtn", view: "home" },
    { id: "navSearchBtn", view: "search" },
    { id: "navFavBtn", view: "favorites" },
    { id: "navTicketBtn", view: "tickets" }
  ];

  navItems.forEach(({ id, view }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        switchView(view);
      });
    }
  });
}

// ============================================================================
// View Navigation (Welcome, Home, Search, Favorites, Tickets, Checkout, Payment, Confirmation)
// ============================================================================
window.switchView = function(viewName) {
  state.activeView = viewName;

  // 1. Handle Welcome Screen View (Figma 1- WelcomeLogin)
  if (viewName === "welcome") {
    if (welcomeSection) {
      welcomeSection.style.display = "flex";
      // Re-trigger Houdini animation & blinking radar dot on view entry
      const hTexts = welcomeSection.querySelectorAll(".houdini-text");
      hTexts.forEach(el => {
        el.style.animation = "none";
        el.offsetHeight; /* trigger reflow */
        el.style.animation = "";
      });
      const hDot = welcomeSection.querySelector(".houdini-blinking-dot");
      if (hDot) {
        hDot.style.animation = "none";
        hDot.offsetHeight; /* trigger reflow */
        hDot.style.animation = "";
      }
    }
    if (siteHeader) siteHeader.style.display = "none";
    if (mainScrollContent) mainScrollContent.style.display = "none";
    if (bottomNavContainer) bottomNavContainer.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // Non-welcome views: ensure main site layout is visible
  if (welcomeSection) welcomeSection.style.display = "none";
  if (siteHeader) siteHeader.style.display = "block";
  if (mainScrollContent) mainScrollContent.style.display = "block";
  if (bottomNavContainer) bottomNavContainer.style.display = "flex";

  // Hide dedicated custom full-page sections
  if (checkoutSection) checkoutSection.style.display = "none";
  if (paymentSection) paymentSection.style.display = "none";
  if (confirmationSection) confirmationSection.style.display = "none";

  // 2. Configure visibility based on view
  if (viewName === "search") {
    if (subHeaderNav) subHeaderNav.style.display = "block";
    if (backButton) backButton.style.display = "flex";
    if (searchFilterPanel) searchFilterPanel.style.display = "block";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
    if (eventsContainer) eventsContainer.style.display = "grid";
    // Version 1.1: On mobile/touch screen sizes, do NOT auto-focus so the virtual touch
    // keyboard only opens when the user explicitly interacts with/taps one of the input text boxes.
    const isMobileOrTouch = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isMobileOrTouch) {
      const searchInput = document.getElementById("searchFormName");
      if (searchInput) searchInput.focus();
    }
  } else if (viewName === "checkout") {
    if (subHeaderNav) subHeaderNav.style.display = "none";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (eventsContainer) eventsContainer.style.display = "none";
    if (paymentSection) paymentSection.style.display = "none";
    if (confirmationSection) confirmationSection.style.display = "none";
    if (checkoutSection) checkoutSection.style.display = "block";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
  } else if (viewName === "payment") {
    if (subHeaderNav) subHeaderNav.style.display = "none";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (eventsContainer) eventsContainer.style.display = "none";
    if (checkoutSection) checkoutSection.style.display = "none";
    if (confirmationSection) confirmationSection.style.display = "none";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "none";
    if (paymentSection) paymentSection.style.display = "block";
  } else if (viewName === "confirmation") {
    if (subHeaderNav) subHeaderNav.style.display = "none";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (eventsContainer) eventsContainer.style.display = "none";
    if (checkoutSection) checkoutSection.style.display = "none";
    if (paymentSection) paymentSection.style.display = "none";
    if (confirmationSection) confirmationSection.style.display = "block";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "none";
  } else if (viewName === "favorites") {
    if (subHeaderNav) subHeaderNav.style.display = "block";
    if (backButton) backButton.style.display = "flex";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
    if (eventsContainer) eventsContainer.style.display = "flex";
  } else if (viewName === "tickets") {
    if (subHeaderNav) subHeaderNav.style.display = "block";
    if (backButton) backButton.style.display = "flex";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
    if (eventsContainer) eventsContainer.style.display = "flex";
  } else {
    // Default: Home
    if (subHeaderNav) subHeaderNav.style.display = "block";
    if (backButton) backButton.style.display = "none";
    if (searchFilterPanel) searchFilterPanel.style.display = "none";
    if (navTabsContainer) navTabsContainer.style.display = "flex";
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
    if (eventsContainer) eventsContainer.style.display = "grid";
  }

  // 3. Update Bottom Nav active indicator (Blue circle + Yellow icon)
  updateBottomNavUI(viewName);

  // Version 1.2: Update Header Shopping Cart button active indicator
  const headerCartBtn = document.getElementById("headerCartBtn");
  if (headerCartBtn) {
    if (viewName === "checkout" || viewName === "payment") {
      headerCartBtn.classList.add("is-active");
    } else {
      headerCartBtn.classList.remove("is-active");
    }
  }

  // 4. Render main view content
  if (viewName !== "checkout" && viewName !== "payment" && viewName !== "confirmation") {
    renderEvents();
  }

  // Scroll mobile frame or page to top
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// ============================================================================
// Bottom Navigation Active Indicator
// Selected state uses elevated blue circle (#3F32D3) and neon yellow icon (#F2F862)
// ============================================================================
function updateBottomNavUI(activeView) {
  const navMap = {
    home: document.getElementById("navHomeBtn"),
    search: document.getElementById("navSearchBtn"),
    favorites: document.getElementById("navFavBtn"),
    tickets: document.getElementById("navTicketBtn")
  };

  // Remove selected state from all dock buttons
  Object.values(navMap).forEach(btn => {
    if (btn) {
      btn.classList.remove("is-selected", "active-nav-glow");
    }
  });

  // Apply selected state to current page
  if (navMap[activeView]) {
    navMap[activeView].classList.add("is-selected");
  }
}

// Tab Selection on Home (Today, This Month, Upcoming)
window.selectTab = function(tabName) {
  state.activeTab = tabName;
  state.activeView = "home";
  if (searchFilterPanel) searchFilterPanel.style.display = "none";
  if (navTabsContainer) navTabsContainer.style.display = "flex";

  const buttons = navTabsContainer.querySelectorAll(".nav-tab-btn");
  buttons.forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  updateBottomNavUI("home");
  renderEvents();
};

// ============================================================================
// Event Rendering Controller
// (Home Grid, Search Deduplicated List, Favorites List, My Tickets & Events)
// ============================================================================
function renderEvents() {
  if (!eventsContainer) return;

  // --------------------------------------------------------------------------
  // 1. "My Tickets and Events" View (Figma node 767:10646)
  // --------------------------------------------------------------------------
  if (state.activeView === "tickets") {
    sectionTitleEl.textContent = "My Tickets and Events";
    sectionSubtitleEl.textContent = "Your confirmed electronic tickets & event entries";
    eventCountBadge.textContent = `${state.tickets.length} ticket${state.tickets.length === 1 ? "" : "s"}`;
    eventsContainer.className = "tickets-list-view";

    if (state.tickets.length === 0) {
      eventsContainer.innerHTML = `
        <div style="width: 100%; background: white; padding: 48px 24px; border-radius: 28px; text-align: center; box-shadow: var(--shadow-card);">
          <div style="font-size: 44px; margin-bottom: 12px;">🎟️</div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--color-secondary); margin-bottom: 8px;">No tickets purchased yet</h3>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Explore tonight's raves and club nights to book your passes.</p>
          <button class="btn-learn-more" style="width: auto; margin: 0 auto; padding: 12px 28px;" onclick="switchView('home')">Browse Events</button>
        </div>
      `;
      return;
    }

    // Render horizontal ticket cards matching Figma 767:10646
    eventsContainer.innerHTML = state.tickets.map(ticket => `
      <article class="ticket-card-horizontal">
        <div class="ticket-card-thumb">
          <img src="${ticket.image}" alt="${ticket.title}" loading="lazy" />
        </div>
        <div class="ticket-card-info">
          <h2 class="ticket-card-title">${ticket.title}</h2>
          <p class="ticket-card-date">${ticket.dateFormatted} &bull; ${ticket.time}</p>
          <p class="ticket-card-venue">${ticket.venue}</p>
          <button class="btn-view-eticket" onclick="showTicketPopupById('${ticket.ticketId}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            View E-Ticket
          </button>
        </div>
      </article>
    `).join("");
    return;
  }

  // --------------------------------------------------------------------------
  // 2. "My Favorites" View (Figma node 393:815)
  // --------------------------------------------------------------------------
  if (state.activeView === "favorites") {
    const list = EVENTS_DATA.filter(evt => state.favorites.has(evt.id));
    sectionTitleEl.textContent = "My Favorites";
    sectionSubtitleEl.textContent = "Your saved underground events and festivals";
    eventCountBadge.textContent = `${list.length} saved`;
    eventsContainer.className = "favorites-list-view";

    if (list.length === 0) {
      eventsContainer.innerHTML = `
        <div style="width: 100%; background: white; padding: 48px 24px; border-radius: 28px; text-align: center; box-shadow: var(--shadow-card);">
          <div style="font-size: 42px; margin-bottom: 12px;">❤️</div>
          <h3 style="font-size: 20px; font-weight: 800; color: var(--color-secondary); margin-bottom: 8px;">No favorites saved yet</h3>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Tap the heart icon on any event card to add it to your personal shortlist.</p>
          <button class="btn-learn-more" style="width: auto; margin: 0 auto; padding: 12px 28px;" onclick="switchView('home')">Browse Events</button>
        </div>
      `;
      return;
    }

    eventsContainer.innerHTML = list.map(evt => `
      <article class="fav-card-horizontal" onclick="openEventModal('${evt.id}')">
        <div class="fav-card-thumb">
          <img src="${evt.image}" alt="${evt.title}" loading="lazy" />
        </div>
        <div class="fav-card-info">
          <h2 class="fav-card-title">${evt.title}</h2>
          <p class="fav-card-date">${evt.dateFormatted} &bull; ${evt.time}</p>
          <p class="fav-card-venue">${evt.venue}</p>
          <span class="fav-card-price">${evt.priceFormatted}</span>
        </div>
        <button class="fav-card-remove-btn" onclick="toggleFavorite(event, '${evt.id}')" title="Remove from favorites">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#ffe4e6"/>
            <path d="M16 25.5l-1.45-1.32C9.4 19.54 6 16.46 6 12.69 6 9.61 8.41 7.2 11.48 7.2c1.74 0 3.41.81 4.52 2.09C17.11 8.01 18.78 7.2 20.52 7.2 23.59 7.2 26 9.61 26 12.69c0 3.77-3.4 6.85-8.55 11.49L16 25.5z" fill="#e11d48"/>
          </svg>
        </button>
      </article>
    `).join("");
    return;
  }

  // --------------------------------------------------------------------------
  // 3. Search View (Deduplicated Results matching Figma 3.2.1 / 3.2.2)
  // --------------------------------------------------------------------------
  eventsContainer.className = "events-grid";
  let list = [];

  if (state.activeView === "search") {
    const qName = state.searchFilters.name.toLowerCase().trim();
    const qDate = state.searchFilters.date.toLowerCase().trim();
    const qLoc = state.searchFilters.location.toLowerCase().trim();
    const onlyToday = state.searchFilters.todayOnly;

    // Filter matching criteria
    list = EVENTS_DATA.filter(evt => {
      if (onlyToday && evt.category !== "today") return false;
      const matchName = !qName || evt.title.toLowerCase().includes(qName) || evt.genre.toLowerCase().includes(qName);
      const matchDate = !qDate || evt.dateDay.includes(qDate) || evt.dateMonth.toLowerCase().includes(qDate) || evt.dateFormatted.toLowerCase().includes(qDate);
      const matchLoc = !qLoc || evt.venue.toLowerCase().includes(qLoc);
      return matchName && matchDate && matchLoc;
    });

    // STRICT DEDUPLICATION: Ensure no duplicate events appear by unique ID and title
    const seenIds = new Set();
    list = list.filter(evt => {
      if (seenIds.has(evt.id)) return false;
      seenIds.add(evt.id);
      return true;
    });

    sectionTitleEl.textContent = "Search Results";
    sectionSubtitleEl.textContent = onlyToday ? "Filtered for events happening tonight" : "Lineup matching your query criteria";
    eventCountBadge.textContent = `${list.length} event${list.length === 1 ? "" : "s"}`;
  }
  // --------------------------------------------------------------------------
  // 4. Desktop Search Input Filtering
  // --------------------------------------------------------------------------
  else if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = EVENTS_DATA.filter(evt =>
      evt.title.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.genre.toLowerCase().includes(q) ||
      evt.dateFormatted.toLowerCase().includes(q)
    );

    // Deduplicate
    const seenIds = new Set();
    list = list.filter(evt => {
      if (seenIds.has(evt.id)) return false;
      seenIds.add(evt.id);
      return true;
    });

    sectionTitleEl.textContent = `Search Results for "${state.searchQuery}"`;
    sectionSubtitleEl.textContent = `Matching titles, venues, and musical genres`;
    eventCountBadge.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
  }
  // --------------------------------------------------------------------------
  // 5. Standard Home Tabs View (Frames 2.1, 2.2, 2.3)
  // --------------------------------------------------------------------------
  else {
    list = EVENTS_DATA.filter(evt => evt.category === state.activeTab);
    if (state.activeTab === "today") {
      sectionTitleEl.textContent = "What’s on Today";
      sectionSubtitleEl.textContent = "Curated underground electronic events for tonight";
    } else if (state.activeTab === "month") {
      sectionTitleEl.textContent = "What’s Coming This Month";
      sectionSubtitleEl.textContent = "Top raves, club nights, and lakeside sessions";
    } else {
      sectionTitleEl.textContent = "Hot and Upcoming Events";
      sectionSubtitleEl.textContent = "Major festivals, ancestral showcases, and New Year warehouse raves";
    }
    eventCountBadge.textContent = `${list.length} events`;
  }

  // Empty State
  if (list.length === 0) {
    eventsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; background: white; padding: 48px 24px; border-radius: 28px; text-align: center; box-shadow: var(--shadow-card);">
        <div style="font-size: 42px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 800; color: var(--color-secondary); margin-bottom: 8px;">No events match your criteria</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Try searching for "Techno", "Conic", "Galeria", or clearing filters.</p>
        <button class="btn-learn-more" style="width: auto; margin: 0 auto; padding: 12px 28px;" onclick="resetSearchFilters()">Reset Search</button>
      </div>
    `;
    return;
  }

  // Render Event Cards Grid (Figma EventCard)
  eventsContainer.innerHTML = list.map(evt => {
    const isFav = state.favorites.has(evt.id);
    return `
      <article class="event-card" data-event-id="${evt.id}">
        <!-- Image Box -->
        <div class="card-image-box" onclick="openEventModal('${evt.id}')" style="cursor: pointer;">
          <img src="${evt.image}" alt="${evt.title}" class="card-image" loading="lazy" />
          
          <!-- Date Badge (Figma Date Pill) -->
          <div class="date-badge">
            <span class="date-day">${evt.dateDay}</span>
            <span class="date-month">${evt.dateMonth}</span>
          </div>

          <!-- Favorite Button (Figma Heart) -->
          <button class="card-fav-btn ${isFav ? 'is-active' : ''}" onclick="toggleFavorite(event, '${evt.id}')" aria-label="Favorite event">
            ${isFav ? `
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#ffe4e6"/>
                <path d="M16 25.5l-1.45-1.32C9.4 19.54 6 16.46 6 12.69 6 9.61 8.41 7.2 11.48 7.2c1.74 0 3.41.81 4.52 2.09C17.11 8.01 18.78 7.2 20.52 7.2 23.59 7.2 26 9.61 26 12.69c0 3.77-3.4 6.85-8.55 11.49L16 25.5z" fill="#e11d48"/>
              </svg>
            ` : `
              <img src="./assets/favorite-button.svg" alt="Favorite" width="32" height="32" />
            `}
          </button>
        </div>

        <!-- Event Title -->
        <h2 class="card-title" onclick="openEventModal('${evt.id}')" style="cursor: pointer;">${evt.title}</h2>

        <!-- Event Venue, Time & Price Row -->
        <div class="card-info-row">
          <div class="card-venue-time">
            <p class="card-time">${evt.time}</p>
            <p class="card-venue">${evt.venue}</p>
          </div>
          <div class="card-price">${evt.priceFormatted}</div>
        </div>

        <!-- Learn More & Purchase Tickets Actions (Uniform Alignment) -->
        <div class="card-actions">
          <button class="btn-learn-more" onclick="openEventModal('${evt.id}')">
            Learn More
          </button>
          <button class="btn-purchase-direct" onclick="startCheckout('${evt.id}')" title="Buy Tickets Directly">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// ============================================================================
// Favorite Toggle
// ============================================================================
window.toggleFavorite = function(e, eventId) {
  if (e) e.stopPropagation();
  const evt = EVENTS_DATA.find(item => item.id === eventId);
  if (!evt) return;

  if (state.favorites.has(eventId)) {
    state.favorites.delete(eventId);
    showToast(`Removed "${evt.title}" from favorites`);
  } else {
    state.favorites.add(eventId);
    showToast(`Added "${evt.title}" to favorites! ❤️`);
  }
  updateBadges();
  renderEvents();
};

// ============================================================================
// Advanced Search Execution & Live Search (Figma 3.1.1 / 3.2.1 / 3.2.2)
// ============================================================================
window.executeLiveSearch = function() {
  const nameEl = document.getElementById("searchFormName");
  const dateEl = document.getElementById("searchFormDate");
  const locEl = document.getElementById("searchFormLocation");
  const todayEl = document.getElementById("toggleTodayOnly");

  state.searchFilters.name = nameEl ? nameEl.value : "";
  state.searchFilters.date = dateEl ? dateEl.value : "";
  state.searchFilters.location = locEl ? locEl.value : "";
  state.searchFilters.todayOnly = todayEl ? todayEl.checked : false;

  renderEvents();
};

window.executeAdvancedSearch = function() {
  executeLiveSearch();
  showToast("Filters applied!");
  const headerBlock = document.getElementById("sectionHeaderBlock");
  if (headerBlock) {
    headerBlock.scrollIntoView({ behavior: "smooth" });
  }
};

window.resetSearchFilters = function() {
  const nameEl = document.getElementById("searchFormName");
  const dateEl = document.getElementById("searchFormDate");
  const locEl = document.getElementById("searchFormLocation");
  const todayEl = document.getElementById("toggleTodayOnly");

  if (nameEl) nameEl.value = "";
  if (dateEl) dateEl.value = "";
  if (locEl) locEl.value = "";
  if (todayEl) todayEl.checked = false;

  state.searchFilters = { name: "", date: "", location: "", todayOnly: false };
  state.searchQuery = "";
  if (desktopSearchInput) desktopSearchInput.value = "";
  switchView("home");
};

// ============================================================================
// Event Details Modal (Figma 4.1- EventDetails1)
// ============================================================================
window.openEventModal = function(eventId) {
  const evt = EVENTS_DATA.find(item => item.id === eventId);
  if (!evt) return;

  currentEventInModal = evt;
  document.getElementById("modalImage").src = evt.image;
  document.getElementById("modalDateTag").textContent = `${evt.dateDay} ${evt.dateMonth}`;
  document.getElementById("modalGenre").textContent = evt.genre;
  document.getElementById("modalTitle").textContent = evt.title;
  document.getElementById("modalTagline").textContent = evt.tagline;
  document.getElementById("modalDateTime").textContent = `${evt.dateFormatted} • ${evt.time}`;
  document.getElementById("modalPriceHeader").textContent = evt.priceFormatted;
  document.getElementById("modalPrice").textContent = evt.priceFormatted;
  document.getElementById("modalVenue").textContent = evt.venue;
  document.getElementById("modalDesc").textContent = evt.description;
  document.getElementById("modalVenueDesc").textContent = evt.venueDesc;

  // Render Lineup
  const lineupContainer = document.getElementById("modalLineupList");
  lineupContainer.innerHTML = evt.lineup.map(artist => `
    <div class="lineup-artist-card">
      <div class="lineup-artist-name">${artist.name}</div>
      <div class="lineup-artist-bio">${artist.bio}</div>
    </div>
  `).join("");

  eventModal.classList.add("open");
};

window.closeEventModal = function() {
  if (eventModal) eventModal.classList.remove("open");
};

// Trigger checkout flow directly from Event Details modal
window.startCheckoutFromModal = function() {
  if (!currentEventInModal) return;
  startCheckout(currentEventInModal.id);
};

// ============================================================================
// Checkout Flow View (Figma 5.1.1- CheckoutFlow1.1 "Shopping Cart")
// ============================================================================
window.openCart = function() {
  if (!checkoutState || !checkoutState.event) {
    startCheckout(EVENTS_DATA[0].id);
  } else {
    updateCheckoutCalculations();
    sectionTitleEl.textContent = "Shopping Cart";
    sectionSubtitleEl.textContent = "Review ticket quantities and proceed to secure checkout";
    eventCountBadge.textContent = "Checkout";
    switchView("checkout");
  }
};

window.startCheckout = function(eventId) {
  const evt = EVENTS_DATA.find(item => item.id === eventId) || currentEventInModal || EVENTS_DATA[0];
  if (!evt) return;

  // Initialize checkout quantities
  checkoutState = {
    event: evt,
    regularQty: 1,
    studentQty: 0,
    regularPrice: evt.price,
    studentPrice: evt.price * 0.5
  };

  // Close details modal if open
  closeEventModal();

  // Populate checkout section elements
  document.getElementById("checkoutEventTitle").textContent = evt.title;
  document.getElementById("checkoutEventDateTime").textContent = `${evt.dateDay}/08/26 - ${evt.time}`;
  document.getElementById("checkoutEventVenue").textContent = evt.venue;
  document.getElementById("checkoutEventImage").src = evt.image;

  document.getElementById("qtyRegular").textContent = checkoutState.regularQty;
  document.getElementById("qtyStudent").textContent = checkoutState.studentQty;
  document.getElementById("pricePerRegular").textContent = `${evt.priceFormatted} each`;
  document.getElementById("pricePerStudent").textContent = `$ ${checkoutState.studentPrice.toFixed(2)} each (50% off)`;

  updateCheckoutCalculations();

  // Header update for Checkout Flow
  sectionTitleEl.textContent = "Shopping Cart";
  sectionSubtitleEl.textContent = "Review ticket quantities and proceed to secure checkout";
  eventCountBadge.textContent = "Checkout";

  // Switch view to checkout
  switchView("checkout");
};

// Ticket quantity increment/decrement (+ / - buttons)
window.updateTicketQty = function(type, delta) {
  if (type === "regular") {
    checkoutState.regularQty = Math.max(0, checkoutState.regularQty + delta);
    document.getElementById("qtyRegular").textContent = checkoutState.regularQty;
  } else if (type === "student") {
    checkoutState.studentQty = Math.max(0, checkoutState.studentQty + delta);
    document.getElementById("qtyStudent").textContent = checkoutState.studentQty;
  }

  updateCheckoutCalculations();
};

function updateCheckoutCalculations() {
  const regSubtotal = checkoutState.regularQty * checkoutState.regularPrice;
  const stuSubtotal = checkoutState.studentQty * checkoutState.studentPrice;
  const total = regSubtotal + stuSubtotal;

  document.getElementById("subtotalRegular").textContent = `$ ${regSubtotal.toFixed(2)}`;
  document.getElementById("subtotalStudent").textContent = `$ ${stuSubtotal.toFixed(2)}`;
  document.getElementById("checkoutTotalPrice").textContent = `$ ${total.toFixed(2)}`;

  const btnPay = document.getElementById("btnContinuePayment");
  if (btnPay) {
    if (checkoutState.regularQty + checkoutState.studentQty === 0) {
      btnPay.style.opacity = "0.5";
      btnPay.textContent = "Select at least 1 ticket";
    } else {
      btnPay.style.opacity = "1";
      btnPay.textContent = "Continue to Payment";
    }
  }

  // Version 1.2: Refresh Header Shopping Cart badge
  updateBadges();
}

// Transition from Shopping Cart to Select Payment (Figma 431:960 5.2.1- CheckoutFlow2.1)
window.processCheckoutPayment = function() {
  const totalTickets = checkoutState.regularQty + checkoutState.studentQty;
  if (totalTickets === 0) {
    showToast("Please add at least 1 ticket to proceed to payment.");
    return;
  }

  // Populate Select Payment Order Summary
  const regSubtotal = checkoutState.regularQty * checkoutState.regularPrice;
  const stuSubtotal = checkoutState.studentQty * checkoutState.studentPrice;
  const total = regSubtotal + stuSubtotal;

  const sumTitle = document.getElementById("summaryEventTitle");
  if (sumTitle && checkoutState.event) sumTitle.textContent = checkoutState.event.title;

  const sumRegQty = document.getElementById("summaryQtyRegular");
  if (sumRegQty) sumRegQty.textContent = checkoutState.regularQty;
  const sumRegVal = document.getElementById("summaryValRegular");
  if (sumRegVal) sumRegVal.textContent = `$ ${regSubtotal.toFixed(2)}`;

  const sumStuQty = document.getElementById("summaryQtyStudent");
  if (sumStuQty) sumStuQty.textContent = checkoutState.studentQty;
  const sumStuVal = document.getElementById("summaryValStudent");
  if (sumStuVal) sumStuVal.textContent = `$ ${stuSubtotal.toFixed(2)}`;

  const sumTotalVal = document.getElementById("summaryValTotal");
  if (sumTotalVal) sumTotalVal.textContent = `$ ${total.toFixed(2)}`;

  // Default selected payment method
  if (!state.selectedPaymentMethod) {
    state.selectedPaymentMethod = "Mastercard 2304";
  }

  // Switch view to Select Payment
  switchView("payment");
};

// Select Payment Mode in List
window.selectPaymentMode = function(element, methodName) {
  const container = document.getElementById("paymentModesContainer");
  if (container) {
    const allModes = container.querySelectorAll(".payment-mode-item");
    allModes.forEach(item => {
      item.classList.remove("is-selected");
    });
  }

  if (element) {
    element.classList.add("is-selected");
  }

  state.selectedPaymentMethod = methodName;
};

// Final Payment Processing & Transition to Confirmation (Figma 5.4- CheckoutFlowConfirmation)
window.processFinalPayment = function() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR');
  const generatedId = "#WFHT" + Math.floor(100000 + Math.random() * 900000);
  const chosenMethod = state.selectedPaymentMethod || "Mastercard 2304";

  const newTicket = {
    ...checkoutState.event,
    ticketId: generatedId,
    purchasedAt: `${timeStr} ${dateStr}`,
    paymentMethod: chosenMethod,
    status: "Approved",
    regularQty: checkoutState.regularQty,
    studentQty: checkoutState.studentQty,
    totalPaid: `$ ${(checkoutState.regularQty * checkoutState.regularPrice + checkoutState.studentQty * checkoutState.studentPrice).toFixed(2)}`
  };

  // Add to active tickets array
  state.tickets.unshift(newTicket);
  lastPurchasedTicket = newTicket;
  
  // Reset cart quantities after payment
  checkoutState.regularQty = 0;
  checkoutState.studentQty = 0;
  updateBadges();

  // Populate confirmation view
  const confId = document.getElementById("confTransactionId");
  if (confId) confId.textContent = newTicket.ticketId;
  const confDate = document.getElementById("confDate");
  if (confDate) confDate.textContent = newTicket.purchasedAt;
  const confPay = document.getElementById("confPaymentMethod");
  if (confPay) confPay.textContent = newTicket.paymentMethod;

  // Switch to confirmation view
  switchView("confirmation");
  showToast(`🎉 Payment confirmed! E-Ticket ${newTicket.ticketId} issued.`);
};

// ============================================================================
// Add Payment Method Pop Up Modal (Figma 625:3126 5.3-CheckoutFlowAddCardPopup)
// ============================================================================
window.openAddPaymentModal = function() {
  const modal = document.getElementById("addPaymentModal");
  if (modal) {
    modal.classList.add("open");
    modal.style.display = "flex";
    const inputNum = document.getElementById("inputCardNumber");
    if (inputNum) inputNum.focus();
  }
};

window.closeAddPaymentModal = function() {
  const modal = document.getElementById("addPaymentModal");
  if (modal) {
    modal.classList.remove("open");
    modal.style.display = "none";
  }
};

window.onCardNumberChange = function(input) {
  let val = input.value.replace(/\D/g, "");
  val = val.substring(0, 16);
  const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
  input.value = formatted;

  const preview = document.getElementById("cardPreviewNumber");
  if (preview) {
    preview.textContent = formatted.length > 0 ? formatted : "**** **** **** 1234";
  }
};

window.onCardNameChange = function(input) {
  const preview = document.getElementById("cardPreviewName");
  if (preview) {
    preview.textContent = input.value.trim().length > 0 ? input.value : "John Doe";
  }
};

window.onCardExpChange = function(input) {
  let val = input.value.replace(/\D/g, "");
  val = val.substring(0, 4);
  if (val.length >= 2) {
    val = val.substring(0, 2) + "/" + val.substring(2);
  }
  input.value = val;

  const preview = document.getElementById("cardPreviewExpiry");
  if (preview) {
    preview.textContent = val.length > 0 ? val : "06/32";
  }
};

window.handleNewPaymentSubmit = function(event) {
  event.preventDefault();

  const numInput = document.getElementById("inputCardNumber");
  const nameInput = document.getElementById("inputCardName");

  const rawNum = numInput ? numInput.value.replace(/\D/g, "") : "1234";
  const last4 = rawNum.slice(-4) || "1234";
  const cardName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Master Card";
  const methodName = `Mastercard ${last4}`;

  // Append new card into payment modes container
  const container = document.getElementById("paymentModesContainer");
  if (container) {
    // Deselect existing
    const allModes = container.querySelectorAll(".payment-mode-item");
    allModes.forEach(item => {
      item.classList.remove("is-selected");
    });

    // Create new payment mode element matching Figma 510:2269
    const newItem = document.createElement("div");
    newItem.className = "payment-mode-item is-selected";
    newItem.onclick = function() { selectPaymentMode(this, methodName); };
    newItem.innerHTML = `
      <div class="payment-mode-logo">
        <img src="./assets/logo-mastercard.svg" alt="Master Card" width="32" height="32" />
      </div>
      <span class="payment-mode-title">${cardName.length > 12 ? cardName.substring(0, 12) + '...' : cardName}</span>
      <span class="payment-mode-details">**** **** **** ${last4}</span>
      <div class="payment-mode-checkbox">
        <div class="checkbox-indicator"></div>
      </div>
    `;
    container.appendChild(newItem);
  }

  state.selectedPaymentMethod = methodName;
  closeAddPaymentModal();

  // Notification matching Figma 629:3140 PaymentAddedPopup
  showToast("✓ Payment Added!");

  // Reset form inputs & preview
  if (event.target) event.target.reset();
  const prevNum = document.getElementById("cardPreviewNumber");
  if (prevNum) prevNum.textContent = "**** **** **** 1234";
  const prevName = document.getElementById("cardPreviewName");
  if (prevName) prevName.textContent = "John Doe";
  const prevExp = document.getElementById("cardPreviewExpiry");
  if (prevExp) prevExp.textContent = "06/32";
};

window.viewNewlyPurchasedTicket = function() {
  if (lastPurchasedTicket) {
    showTicketPopup(lastPurchasedTicket);
  } else if (state.tickets.length > 0) {
    showTicketPopup(state.tickets[0]);
  }
};

// ============================================================================
// E-Ticket Popup Modal (Figma 7.3.2- ETicketPopUp)
// ============================================================================
window.showTicketPopupById = function(ticketId) {
  const ticket = state.tickets.find(t => t.ticketId === ticketId) || state.tickets[0];
  if (ticket) {
    showTicketPopup(ticket);
  }
};

function showTicketPopup(ticket) {
  document.getElementById("ticketEventTitle").textContent = ticket.title;
  document.getElementById("ticketTransactionId").textContent = ticket.ticketId;
  document.getElementById("ticketDateTime").textContent = ticket.purchasedAt;
  document.getElementById("ticketPayment").textContent = ticket.paymentMethod;

  ticketModal.classList.add("open");
}

window.closeTicketModal = function() {
  ticketModal.classList.remove("open");
};

window.openTicketWallet = function() {
  switchView("tickets");
};

// ============================================================================
// Back Navigation Action (Native Frame Back Button)
// ============================================================================
window.handleBackAction = function() {
  if (state.activeView === "checkout") {
    switchView("home");
  } else if (state.activeView === "confirmation") {
    switchView("tickets");
  } else if (state.activeView === "search" || state.activeView === "favorites" || state.activeView === "tickets") {
    switchView("home");
  } else {
    if (state.activeTab !== "today") {
      selectTab("today");
    } else {
      showToast("You are on the Home screen");
    }
  }
};

// ============================================================================
// User Profile Modal & Photo Upload (Figma 7.1- UserProfile)
// ============================================================================
let tempProfileAvatar = null;

window.openProfileModal = function() {
  toggleEditProfileView(false);
  profileModal.classList.add("open");
};

window.closeProfileModal = function() {
  profileModal.classList.remove("open");
};

window.toggleEditProfileView = function(showEdit) {
  const viewMode = document.getElementById("profileViewMode");
  const editMode = document.getElementById("profileEditMode");
  if (!viewMode || !editMode) return;

  if (showEdit) {
    viewMode.style.display = "none";
    editMode.style.display = "flex";
    tempProfileAvatar = state.userProfile.avatar;

    const nameInput = document.getElementById("editProfileNameInput");
    const emailInput = document.getElementById("editProfileEmailInput");
    const previewImg = document.getElementById("editAvatarPreviewImg");
    const urlInput = document.getElementById("editProfilePhotoUrlInput");

    if (nameInput) nameInput.value = state.userProfile.name;
    if (emailInput) emailInput.value = state.userProfile.email;
    if (previewImg) previewImg.src = state.userProfile.avatar;
    if (urlInput) urlInput.value = "";
  } else {
    viewMode.style.display = "flex";
    editMode.style.display = "none";
    tempProfileAvatar = null;
  }
};

window.triggerProfilePicUpload = function() {
  const fileInput = document.getElementById("profileImageFileInput");
  if (fileInput) fileInput.click();
};

window.handleProfilePicSelected = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    tempProfileAvatar = dataUrl;
    const previewImg = document.getElementById("editAvatarPreviewImg");
    if (previewImg) previewImg.src = dataUrl;
    showToast("Photo selected! Click 'Save Changes' to apply.");
  };
  reader.readAsDataURL(file);
};

window.handlePhotoUrlInput = function(e) {
  const url = e.target.value.trim();
  if (url) {
    tempProfileAvatar = url;
    const previewImg = document.getElementById("editAvatarPreviewImg");
    if (previewImg) previewImg.src = url;
  }
};

window.saveProfileChanges = function() {
  const nameInput = document.getElementById("editProfileNameInput");
  const emailInput = document.getElementById("editProfileEmailInput");

  if (nameInput && nameInput.value.trim()) {
    state.userProfile.name = nameInput.value.trim();
  }
  if (emailInput && emailInput.value.trim()) {
    state.userProfile.email = emailInput.value.trim();
  }
  if (tempProfileAvatar) {
    state.userProfile.avatar = tempProfileAvatar;
  }

  // Update DOM elements across page
  const headerAvatarImg = document.querySelector("#profileAvatarBtn img");
  if (headerAvatarImg) headerAvatarImg.src = state.userProfile.avatar;

  const viewAvatarImg = document.getElementById("profileAvatarLargeImg");
  if (viewAvatarImg) viewAvatarImg.src = state.userProfile.avatar;

  const nameEls = document.querySelectorAll(".profile-user-name");
  nameEls.forEach(el => el.textContent = state.userProfile.name);

  const emailEls = document.querySelectorAll(".profile-user-email");
  emailEls.forEach(el => el.textContent = state.userProfile.email);

  toggleEditProfileView(false);
  showToast("Profile & photo updated successfully! ✨");
};

// ============================================================================
// Badges and Toast System
// ============================================================================
function updateBadges() {
  if (favBadgeEl) {
    favBadgeEl.textContent = state.favorites.size;
    favBadgeEl.style.display = state.favorites.size > 0 ? "block" : "none";
  }
  if (ticketBadgeEl) {
    ticketBadgeEl.textContent = state.tickets.length;
    ticketBadgeEl.style.display = state.tickets.length > 0 ? "block" : "none";
  }
  // Version 1.2: Header Shopping Cart Badge
  const headerCartBadge = document.getElementById("headerCartBadge");
  if (headerCartBadge) {
    const cartCount = (typeof checkoutState !== "undefined" && checkoutState && checkoutState.regularQty ? checkoutState.regularQty : 0) +
                      (typeof checkoutState !== "undefined" && checkoutState && checkoutState.studentQty ? checkoutState.studentQty : 0);
    headerCartBadge.textContent = cartCount;
    headerCartBadge.style.display = cartCount > 0 ? "flex" : "none";
  }
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ============================================================================
// Keyboard Shortcuts & Interactions
// ============================================================================
function setupKeyboardShortcuts() {
  // Desktop Search Input
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderEvents();
    });
  }

  // Key shortcut '/' focuses search, 'Escape' closes modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== desktopSearchInput) {
      e.preventDefault();
      if (desktopSearchInput) desktopSearchInput.focus();
    }
    if (e.key === "Escape") {
      closeEventModal();
      closeTicketModal();
      closeProfileModal();
      closeAddPaymentModal();
    }
  });

  // Modal Backdrop Click
  [eventModal, ticketModal, profileModal, addPaymentModal].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
          modal.style.display = "none";
        }
      });
    }
  });
}

// ============================================================================
// Welcome Screen & Session Handlers (1- WelcomeLogin)
// ============================================================================
window.handleWelcomeLogin = function(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById("loginUsername");
  const username = usernameInput ? usernameInput.value.trim() : "John Doe";
  if (username) {
    state.userProfile.name = username;
    const nameEls = document.querySelectorAll(".profile-user-name");
    nameEls.forEach(el => el.textContent = username);
  }
  sessionStorage.setItem("sonar_user_logged_in", "true");
  // Version 1.2: Turn off the "Welcome to SonarBSB" popup after login
  switchView("home");
};

window.continueAsGuest = function() {
  sessionStorage.setItem("sonar_user_logged_in", "guest");
  showToast("Exploring as Guest");
  switchView("home");
};

window.handleLogout = function() {
  sessionStorage.removeItem("sonar_user_logged_in");
  closeProfileModal();
  showToast("Logged out successfully");
  switchView("welcome");
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", initApp);
