/**
 * Sonar BSB Events App
 * Frontend Application & Interaction Logic
 * Based on Figma Design: Sonar-BSB-EventsApp-v1 (File: i3bqFIafJrUlUqn2NMUwIl)
 */

// ============================================================================
// Events Database & Dynamic Calendar Date Builder (Version 1.3.2 — 27 Events)
// Dynamically anchors Today, This Month, and Upcoming (+1/+2 months) to the
// local calendar date when the user opens the app, prioritizing Thu–Sun
// weekend nights (avoiding Mon–Wed) for This Month and Upcoming schedules.
// ============================================================================
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS_SHORT_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_FULL_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PREFERRED_EVENT_WEEKDAYS = new Set([0, 4, 5, 6]); // Sun, Thu, Fri, Sat
const WEEKEND_DAY_ROTATIONS = [
  [6, 5, 0, 4], // Sat -> Fri -> Sun -> Thu
  [5, 6, 4, 0], // Fri -> Sat -> Thu -> Sun
  [0, 6, 5, 4], // Sun -> Sat -> Fri -> Thu
  [4, 5, 6, 0], // Thu -> Fri -> Sat -> Sun
  [6, 0, 5, 4]  // Sat -> Sun -> Fri -> Thu
];

function formatEventDateFields(dateObj) {
  const dayNum = dateObj.getDate();
  const monthIdx = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const dateDay = String(dayNum).padStart(2, "0");
  const dateMonth = MONTHS_SHORT_EN[monthIdx];
  const weekday = WEEKDAYS_EN[dateObj.getDay()];
  const monthFull = MONTHS_FULL_EN[monthIdx];
  const monthNumPadded = String(monthIdx + 1).padStart(2, "0");
  const yearShort = String(year).slice(-2);

  return {
    dateObj: new Date(year, monthIdx, dayNum),
    dateDay,
    dateMonth,
    dateFormatted: `${weekday}, ${monthFull} ${dateDay}, ${year}`,
    dateShort: `${dateDay}/${monthNumPadded}/${yearShort}`,
    dateISO: `${year}-${monthNumPadded}-${dateDay}`
  };
}

function formatPurchaseTimestamp(dateObj, timeHHMM) {
  const d = String(dateObj.getDate()).padStart(2, "0");
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const y = dateObj.getFullYear();
  return `${timeHHMM} ${d}/${m}/${y}`;
}

function collectMonthDaysByWeekdays(year, month, startDay, endDay, allowedWeekdays) {
  const days = [];
  for (let d = startDay; d <= endDay; d++) {
    const dt = new Date(year, month, d);
    if (allowedWeekdays.has(dt.getDay())) {
      days.push(d);
    }
  }
  return days;
}

function pickPreferredWeekdayInWindow(year, month, winStart, winEnd, slotIndex) {
  const candidateDays = collectMonthDaysByWeekdays(year, month, winStart, winEnd, PREFERRED_EVENT_WEEKDAYS);
  if (candidateDays.length === 0) return null;
  const prefOrder = WEEKEND_DAY_ROTATIONS[slotIndex % WEEKEND_DAY_ROTATIONS.length];
  for (const targetDow of prefOrder) {
    const match = candidateDays.find(d => new Date(year, month, d).getDay() === targetDow);
    if (match !== undefined) return match;
  }
  return candidateDays[0];
}

function resolveCurrentMonthDate(baseYear, baseMonth, todayDay, index, totalCount) {
  const lastDayOfMonth = new Date(baseYear, baseMonth + 1, 0).getDate();
  const futureWeekendDays = collectMonthDaysByWeekdays(
    baseYear,
    baseMonth,
    todayDay + 1,
    lastDayOfMonth,
    PREFERRED_EVENT_WEEKDAYS
  );

  let chosenDay;
  if (futureWeekendDays.length >= totalCount) {
    const pickIdx = Math.round((index * (futureWeekendDays.length - 1)) / Math.max(1, totalCount - 1));
    chosenDay = futureWeekendDays[pickIdx];
  } else if (futureWeekendDays.length > 0) {
    const pickIdx = Math.floor((index * futureWeekendDays.length) / totalCount);
    chosenDay = futureWeekendDays[pickIdx];
  } else {
    // Late-month fallback: check today through end of month for Thu–Sun first
    const onwardWeekendDays = collectMonthDaysByWeekdays(
      baseYear,
      baseMonth,
      todayDay,
      lastDayOfMonth,
      PREFERRED_EVENT_WEEKDAYS
    );
    if (onwardWeekendDays.length > 0) {
      chosenDay = onwardWeekendDays[Math.floor((index * onwardWeekendDays.length) / totalCount)];
    } else {
      // Opened on final Mon–Wed of month: stay inside the same month on its latest Thu–Sun weekend
      const monthWeekendDays = collectMonthDaysByWeekdays(
        baseYear,
        baseMonth,
        1,
        lastDayOfMonth,
        PREFERRED_EVENT_WEEKDAYS
      );
      const lateWeekendPool = monthWeekendDays.slice(-Math.min(4, monthWeekendDays.length));
      chosenDay = lateWeekendPool[Math.floor((index * lateWeekendPool.length) / totalCount)] || lastDayOfMonth;
    }
  }

  return new Date(baseYear, baseMonth, chosenDay);
}

function resolveUpcomingMonthDate(baseYear, baseMonth, monthOffset, slotIndex, slotTotal) {
  // monthOffset = 1 or 2 (strictly next 2 calendar months; Date handles Dec -> Jan rollover)
  const firstOfTarget = new Date(baseYear, baseMonth + monthOffset, 1);
  const targetYear = firstOfTarget.getFullYear();
  const targetMonth = firstOfTarget.getMonth();
  const daysInTarget = new Date(targetYear, targetMonth + 1, 0).getDate();
  const safeTotal = Math.max(1, slotTotal || 1);
  const safeIdx = Math.max(0, Math.min(safeTotal - 1, slotIndex || 0));

  const winStart = Math.floor((safeIdx * daysInTarget) / safeTotal) + 1;
  const winEnd = Math.max(winStart, Math.floor(((safeIdx + 1) * daysInTarget) / safeTotal));
  const picked = pickPreferredWeekdayInWindow(targetYear, targetMonth, winStart, winEnd, safeIdx);
  if (picked !== null) {
    return new Date(targetYear, targetMonth, picked);
  }

  const allWeekends = collectMonthDaysByWeekdays(targetYear, targetMonth, 1, daysInTarget, PREFERRED_EVENT_WEEKDAYS);
  const fallbackDay = allWeekends[Math.round((safeIdx * (allWeekends.length - 1)) / Math.max(1, safeTotal - 1))] || 1;
  return new Date(targetYear, targetMonth, fallbackDay);
}

const RAW_EVENTS_CATALOG = [
  // Category: Today (9 events — 3 original + 6 added in v1.3)
  {
    id: "trema-techno",
    title: "Trema Techno: Subsolo Urbano",
    category: "today",
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
  {
    id: "subterranea-acid-chamber",
    title: "Subterrânea: Acid Chamber",
    category: "today",
    time: "23:30h",
    venue: "Beco da Cultura, Setor Comercial Sul (SCS)",
    price: 55.00,
    priceFormatted: "$ 55.00",
    image: "./assets/event-subterranea.png",
    tagline: "Raw TB-303 squelches beneath SCS brutalist arches.",
    description: "Resonant 303 basslines and unrelenting acid grooves echo through the concrete passageways of Beco da Cultura. An intimate late-night bunker experience illuminated solely by slicing emerald lasers and haze.",
    lineup: [
      { name: "Vortex 303", bio: "Live hardware acid performer wielding modified Roland basslines and analog overdrive pedals." },
      { name: "Nina Kraut", bio: "Brasília-based selector blending classic Chicago acid, fast rave percussion, and warehouse hypnosis." }
    ],
    venueDesc: "Tucked beneath the concrete walkways of Setor Comercial Sul, Beco da Cultura hosts tight-knit DIY electronic collectives away from mainstream clubs.",
    genre: "Acid Techno / Rave"
  },
  {
    id: "esplanada-bass-orbit",
    title: "Esplanada Bass: Orbit 061",
    category: "today",
    time: "21:00h",
    venue: "Cúpula Externa, Museu Nacional da República",
    price: 65.00,
    priceFormatted: "$ 65.00",
    image: "./assets/event-esplanada.png",
    tagline: "Broken beats and sub-heavy bass under Niemeyer's dome.",
    description: "An open-air bass-music transmission taking over the monumental white hemisphere and sweeping ramp of Museu Nacional. Expect UK garage, heavyweight breakbeat, and cyan architectural projection mapping.",
    lineup: [
      { name: "Gravitas", bio: "Sound designer and breakbeat producer crafting deep sub-pressure textures tailored for open-air rigs." },
      { name: "Sônica DF", bio: "Pioneering duo fusing baile syncopation, two-step garage, and futuristic grime instrumentation." }
    ],
    venueDesc: "At the edge of Eixo Monumental, the sculptural white dome of Museu Nacional provides an unforgettable 360-degree acoustic amphitheater after dusk.",
    genre: "UK Garage / Breakbeat"
  },
  {
    id: "conic-frequency-404",
    title: "Conic: Frequency 404",
    category: "today",
    time: "23:59h",
    venue: "Galeria Subsolo Conic, Setor de Diversões Sul (SDS)",
    price: 45.00,
    priceFormatted: "$ 45.00",
    image: "./assets/event-conic404.png",
    tagline: "Midnight glitch electronics inside Conic's brutalist labyrinth.",
    description: "When the upper shutters roll down, Conic's lower arcade awakens. Minimal electro, stripped-back percussive rhythms, and razor-sharp magenta laser grids frame a purist dancefloor until sunrise.",
    lineup: [
      { name: "Kinetika", bio: "Precision minimal DJ known for hypnotic four-deck layering and crystalline vinyl cuts." },
      { name: "DJ Ruído", bio: "Veteran Conic resident bridging mechanical dark electro and experimental post-club electronics." }
    ],
    venueDesc: "Beneath the raw coffered concrete ceilings of Setor de Diversões Sul, Galeria Conic remains the beating heart of Brasília's counterculture.",
    genre: "Minimal / Dark Electro"
  },
  {
    id: "eixao-sonoro-sunset",
    title: "Eixão Sonoro: Dusk Session",
    category: "today",
    time: "17:30h",
    venue: "Passarela do Eixão Sul, Altura 208 Sul",
    price: 40.00,
    priceFormatted: "$ 40.00",
    image: "./assets/event-eixao.png",
    tagline: "Open-air asphalt grooves as Brasília's sky turns amber.",
    description: "Celebrating Brasília's car-free boulevard heritage with warm dusty house, lush nu-disco chords, and funky cosmic grooves right as the Cerrado sun drops behind the Esplanada skyline.",
    lineup: [
      { name: "Solar Wave", bio: "Sun-drenched house collective bringing rotary mixers and rare Brazilian boogie cuts to outdoor streets." },
      { name: "Pedro Alves", bio: "Local crate-digger weaving Balearic rhythms, disco edits, and uplifting piano house." }
    ],
    venueDesc: "Set on the wide modernist pedestrian overpass of Eixo Rodoviário Sul, offering uninterrupted horizon views across the Pilot Plan.",
    genre: "House / Nu-Disco"
  },
  {
    id: "ponto-zero-warehouse",
    title: "Ponto Zero: Brutalist Pulse",
    category: "today",
    time: "22:30h",
    venue: "Quadra 2 Bloco C, Setor Bancário Sul (SBS)",
    price: 75.00,
    priceFormatted: "$ 75.00",
    image: "./assets/event-pontozero.png",
    tagline: "High-pressure four-on-the-floor inside a granite banking vault.",
    description: "Transforming the austere granite corridors of SBS into a crimson-lit techno monolith. Relentless 138 BPM hardgroove, mirrored floor reflections, and stark white strobes command total focus.",
    lineup: [
      { name: "Monobloco B", bio: "Hardgroove duo delivering high-velocity Latin percussion inside sleek industrial techno frameworks." },
      { name: "Caio Marte", bio: "High-energy closing specialist sculpted in Berlin and Brasília warehouse marathon nights." }
    ],
    venueDesc: "After business hours, Setor Bancário Sul becomes a silent canyon of dark stone facades and dramatic modernist geometry.",
    genre: "Hardgroove / Peak-Time Techno"
  },
  {
    id: "cerrado-mist-dub",
    title: "Cerrado Mist: Sound System",
    category: "today",
    time: "19:00h",
    venue: "Arena Aberta Funarte, Eixo Monumental",
    price: 50.00,
    priceFormatted: "$ 50.00",
    image: "./assets/event-cerradomist.png",
    tagline: "Hand-built wooden speaker stacks echoing warm dub chords at twilight.",
    description: "Full analog preamp warmth meets sculptural Cerrado night air. Towering custom wooden scoop bins flood Funarte's courtyard with meditative dub techno, roots steppers, and sub-bass resonance.",
    lineup: [
      { name: "Dub Planalto", bio: "Custom sound-system builders and dub engineers pushing tactile analog delay chains live." },
      { name: "Lara Zed", bio: "Deep-bass selector exploring atmospheric dub techno, halftone steppers, and warm vinyl textures." }
    ],
    venueDesc: "Funarte's open concrete arena connects modernist colonnades with twisted native Cerrado trees along Eixo Monumental.",
    genre: "Dub Techno / Deep Bass"
  },

  // Category: This Month (9 events — 3 original + 6 added in v1.3)
  {
    id: "externa-monolith",
    title: "Externa Collective: Monolith",
    category: "month",
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
  {
    id: "ponte-jk-nocturne",
    title: "Ponte JK: Waterline",
    category: "month",
    time: "20:00h",
    venue: "Orla da Ponte JK, Setor de Clubes Sul",
    price: 110.00,
    priceFormatted: "$ 110.00",
    image: "./assets/event-ponte-jk.png",
    tagline: "Hypnotic arpeggios shimmering beneath Brasília's steel arches.",
    description: "Hosted on an extended timber pier directly facing the illuminated parabolic arches of Ponte JK. Sapphire lights shimmer across Lago Paranoá as driving melodic progressive sets build under the stars.",
    lineup: [
      { name: "Maré Alta", bio: "Progressive house duo celebrated for sweeping synth build-ups and spatial lakeside soundscapes." },
      { name: "Lucas Vello", bio: "Brasília melodic techno resident crafting warm sunset-to-midnight transitions." }
    ],
    venueDesc: "Set beside the southern pier of Ponte Juscelino Kubitschek, pairing cool lake breezes with uninterrupted reflections of the bridge's steel arcs.",
    genre: "Melodic House / Progressive"
  },
  {
    id: "mirante-digital-horizon",
    title: "Mirante Digital: Transmission",
    category: "month",
    time: "18:00h",
    venue: "Torre de TV Digital, Lago Norte",
    price: 95.00,
    priceFormatted: "$ 95.00",
    image: "./assets/event-mirante-digital.png",
    tagline: "360-degree Cerrado panorama synced to warm analog modular sets.",
    description: "Gather at the concrete base of Oscar Niemeyer's final Brasília landmark, Flor do Cerrado, for a high-altitude sunset session combining organic textures, warm analog pads, and coral dusk vistas.",
    lineup: [
      { name: "Flor do Cerrado", bio: "Organic downtempo & electronica live act incorporating acoustic plucked strings and analog synths." },
      { name: "Kronos", bio: "Atmospheric electronica selector moving effortlessly from warm breaks to celestial deep techno." }
    ],
    venueDesc: "Perched on the highest ridge of Colorado/Lago Norte, Torre de TV Digital commands panoramic views over Brasília's endless plateau horizon.",
    genre: "Organic House / Electronica"
  },
  {
    id: "sia-garage-protocol",
    title: "SIA Garage: Protocol 909",
    category: "month",
    time: "23:00h",
    venue: "Galpão Trecho 3, Setor de Indústrias (SIA)",
    price: 70.00,
    priceFormatted: "$ 70.00",
    image: "./assets/event-sia-garage.png",
    tagline: "Chrome hardware drums and relentless 909 claps in an industrial bay.",
    description: "No VIP tables, no phones on the floor—just pure Detroit techno, crisp TR-909 percussion, and cold icy-cyan beams slicing through wet industrial concrete in Trecho 3.",
    lineup: [
      { name: "TR-Nine", bio: "Hardware techno live act built around vintage drum machines, raw distortion, and live sequencing." },
      { name: "Duda K", bio: "Fast electro and jacking Detroit-inspired DJ tearing up Brasília's underground warehouse circuit." }
    ],
    venueDesc: "A converted heavy-machinery maintenance garage in Setor de Indústrias e Abastecimento featuring tall roll-up bays and raw steel trusses.",
    genre: "Detroit Techno / Electro"
  },
  {
    id: "ermida-twilight-ritual",
    title: "Ermida: Twilight Echo",
    category: "month",
    time: "15:30h",
    venue: "Anfiteatro Ermida Dom Bosco, Lago Sul",
    price: 85.00,
    priceFormatted: "$ 85.00",
    image: "./assets/event-ermida-twilight.png",
    tagline: "Sacred hillside sunset looking straight across the lake to Plano Piloto.",
    description: "As the golden Cerrado light illuminates the stone tiers of Ermida Dom Bosco, soulful afro-house rhythms and warm organic percussions carry dancers smoothly from sunlit afternoon into starry twilight.",
    lineup: [
      { name: "Alvorada", bio: "Afro-house collective blending Brazilian percussive grooves with lush modern club arrangement." },
      { name: "Thiago Neri", bio: "Open-air sunset specialist renowned for warm basslines and deep soulful vocal cuts." }
    ],
    venueDesc: "Resting along the southeastern shore of Lago Paranoá, Ermida Dom Bosco frames the monumental Plano Piloto skyline dead-center on the sunset horizon.",
    genre: "Afro House / Downtempo"
  },
  {
    id: "subsolo-concha-prism",
    title: "Concha Prism: Wave Mechanics",
    category: "month",
    time: "21:30h",
    venue: "Concha Acústica de Brasília, Setor de Clubes Norte (SHTN)",
    price: 65.00,
    priceFormatted: "$ 65.00",
    image: "./assets/event-concha-prism.png",
    tagline: "Prismatic projection mapping across iconic curved concrete shells.",
    description: "Precision audiovisual engineering meets modernist heritage. Custom real-time laser wireframes hug the vaulted parabolic shell of Concha Acústica while cutting-edge IDM and hypnotic synth-techno resonate across the bay.",
    lineup: [
      { name: "Prisma Lab", bio: "Audio-visual duo synchronizing modular FM synthesis with real-time spatial projection mapping." },
      { name: "Bruno Sol", bio: "Braindance and modern synth-techno DJ celebrated for kinetic, genre-bending nocturnal journeys." }
    ],
    venueDesc: "Designed by Oscar Niemeyer along the northern shore of Lago Paranoá, Concha Acústica's vaulted concrete shell delivers natural amphitheater clarity.",
    genre: "IDM / Synth-Techno"
  },
  {
    id: "renato-russo-synthlab",
    title: "508 SynthLab: Modular Night",
    category: "month",
    time: "22:00h",
    venue: "Espaço Cultural Renato Russo, 508 Sul",
    price: 55.00,
    priceFormatted: "$ 55.00",
    image: "./assets/event-synthlab.png",
    tagline: "Live Eurorack patch cables and analog bass sequences all night long.",
    description: "An intimate deep-listening and high-impact dance showcase centered around patch-cable analog synthesizers, glowing voltage racks, and driving hot-pink darkwave electronics inside 508 Sul.",
    lineup: [
      { name: "Circuito DF", bio: "Electronic collective performing 100% improvised live sets on bespoke portable Eurorack walls." },
      { name: "Helena Vox", bio: "Darkwave vocalist and synthwave producer weaving icy arpeggios with haunting reverberated hooks." }
    ],
    venueDesc: "One of Asa Sul's most storied cultural complexes, Espaço 508 Sul unites raw concrete architecture with black-box performance spaces.",
    genre: "Modular Synth / Darkwave"
  },

  // Category: Upcoming — Next 2 Months (9 events — 3 original + 6 added in v1.3)
  {
    id: "makoomba-ancestral",
    title: "Makoomba: Eletrônico Ancestral",
    category: "upcoming",
    upcomingSlot: { monthOffset: 1, preferredDay: 5 },
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
    upcomingSlot: { monthOffset: 1, preferredDay: 11 },
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
    id: "planalto-solar-gathering",
    title: "Planalto Solar: Open Air",
    category: "upcoming",
    upcomingSlot: { monthOffset: 1, preferredDay: 17 },
    time: "15:00h",
    venue: "Parque Olhos d’Água, Asa Norte",
    price: 150.00,
    priceFormatted: "$ 150.00",
    image: "./assets/event-planalto-solar.png",
    tagline: "Sunlight filtering through Cerrado trees to sweeping daytime synth anthems.",
    description: "An open-air botanical day festival shaded by tensile architectural sails and native Cerrado trees. Uplifting progressive house, indie dance, and golden-hour brass-infused electronica.",
    lineup: [
      { name: "Eclipse BSB", bio: "Progressive house live duo blending warm euphoric synth chords with driving daytime rhythms." },
      { name: "Ravi", bio: "Versatile indie-dance selector curated across Brasília's sunniest daytime gatherings." }
    ],
    venueDesc: "Nested among spring-fed trails in Asa Norte, Parque Olhos d’Água pairs lush Cerrado shade with open park clearings.",
    genre: "Progressive House / Indie Dance"
  },
  {
    id: "mane-ring-kinetic",
    title: "Anel Monumental: Kinetic X",
    category: "upcoming",
    upcomingSlot: { monthOffset: 1, preferredDay: 23 },
    time: "22:00h",
    venue: "Galeria Interna Arena BRB, Eixo Monumental",
    price: 180.00,
    priceFormatted: "$ 180.00",
    image: "./assets/event-anel-kinetic.png",
    tagline: "Colossal stadium concrete columns pulsing with 360-degree kinetic trusses.",
    description: "Monumental scale inside Brasília's architectural colonnade. Suspended motorized light trusses, sweeping searchlight arrays, and heavyweight big-room techno & hypnotic trance fill the grand concrete ring.",
    lineup: [
      { name: "Reaktor 61", bio: "High-impact techno duo built for massive sound systems and towering stadium acoustics." },
      { name: "Yuri Kane", bio: "Euphoric modern trance and techno architect known for soaring midnight climaxes." }
    ],
    venueDesc: "Surrounded by 288 towering concrete pillars along Eixo Monumental, Arena BRB's outer colonnade forms a cathedral of modern engineering.",
    genre: "Big Room Techno / Trance"
  },
  {
    id: "batrave-last-dance",
    title: "Batrave: The Last Dance",
    category: "upcoming",
    upcomingSlot: { monthOffset: 1, preferredDay: 31 },
    time: "21:00h",
    venue: "Galpão de Oficinas, Setor Industrial",
    price: 240.00,
    priceFormatted: "$ 240.00",
    image: "./assets/event-batrave.png",
    tagline: "The legendary grand finale underground warehouse rave.",
    description: "Brasília's most anticipated underground mega-rave. 12 continuous hours across 3 warehouses in the Industrial Sector with international guest headliners and a massive laser installation.",
    lineup: [
      { name: "Batrave All-Stars", bio: "6-hour b2b marathon set spanning industrial, trance, and hard-groove." },
      { name: "Techno Resistance", bio: "Berlin-inspired warehouse industrial techno." }
    ],
    venueDesc: "A massive decommissioned train and bus maintenance warehouse with 15-meter ceilings and raw steel beams.",
    genre: "Warehouse Techno"
  },
  {
    id: "botanico-organic-nocturne",
    title: "Botânico: Canopy Nights",
    category: "upcoming",
    upcomingSlot: { monthOffset: 2, preferredDay: 4 },
    time: "19:00h",
    venue: "Alameda dos Ipês, Jardim Botânico DF",
    price: 130.00,
    priceFormatted: "$ 130.00",
    image: "./assets/event-botanico.png",
    tagline: "Bioluminescent visuals woven through native Cerrado canopy trails.",
    description: "When night settles over Jardim Botânico, emerald and turquoise laser webs weave subtly through twisted Cerrado boughs for an unforgettable organic downtempo and afro-tech sanctuary.",
    lineup: [
      { name: "Flora Eletrônica", bio: "Audio-botanical project sampling natural Cerrado field recordings over warm organic house beats." },
      { name: "Samira", bio: "Acclaimed deep tribal and afro-tech DJ celebrated for hypnotic, storytelling six-hour sets." }
    ],
    venueDesc: "Set across tranquil clearings inside Brasília's native Jardim Botânico reserve just south of Lago Sul.",
    genre: "Organic Downtempo / Afro-Tech"
  },
  {
    id: "sof-sul-heavy-machinery",
    title: "SOF Sul: Heavy Machinery",
    category: "upcoming",
    upcomingSlot: { monthOffset: 2, preferredDay: 10 },
    time: "23:30h",
    venue: "Hangar 14, SOF Sul (Guará)",
    price: 90.00,
    priceFormatted: "$ 90.00",
    image: "./assets/event-sofsul.png",
    tagline: "Clanging steel acoustics, strobe fog banks, and relentless industrial force.",
    description: "Purist industrial techno and body music inside a cavernous corrugated steel hangar in SOF Sul. Crimson streaks, blinding white strobe flashes, and zero compromise until noon.",
    lineup: [
      { name: "Ferro", bio: "Metallurgic industrial techno producer renowned for distorted modular snare cascades." },
      { name: "Zé Phono", bio: "Relentless EBM and schranz-inflected vinyl selector from Brasília's deep south corridor." }
    ],
    venueDesc: "Hangar 14 is an oversized steel industrial depot in Setor de Oficinas Sul prized for immense acoustics and stark lighting contrast.",
    genre: "Industrial Techno / EBM"
  },
  {
    id: "prainha-lago-norte-dawn",
    title: "Prainha Norte: First Light",
    category: "upcoming",
    upcomingSlot: { monthOffset: 2, preferredDay: 17 },
    time: "05:00h",
    venue: "Prainha do Lago Norte, Península Norte",
    price: 140.00,
    priceFormatted: "$ 140.00",
    image: "./assets/event-prainha.png",
    tagline: "Early-morning waterfront marathon from first pink light to midday.",
    description: "An intimate sunrise ritual on the sandy peninsula tip of Lago Norte. Greet the pastel rose-gold dawn over glassy lake waters with featherweight microhouse, dubby minimal, and sparkling morning percussion.",
    lineup: [
      { name: "Horizonte 61", bio: "Sunrise minimal specialists known for delicate rolling basslines and effortless dawn pacing." },
      { name: "Clara Mendes", bio: "Microhouse vinyl selector crafting breezy, percussive daytime sets by the water." }
    ],
    venueDesc: "At the tip of Península Norte, Prainha offers open sandy beaches and unbroken eastern views across Lago Paranoá.",
    genre: "Sunrise Minimal / Microhouse"
  },
  {
    id: "catetinho-analog-freq",
    title: "Km Zero: Analog Fest",
    category: "upcoming",
    upcomingSlot: { monthOffset: 2, preferredDay: 24 },
    time: "16:00h",
    venue: "Clareira Histórica, Park Way / Catetinho",
    price: 195.00,
    priceFormatted: "$ 195.00",
    image: "./assets/event-kmzero.png",
    tagline: "Multi-stage open-air wood-and-concrete sound sanctuary south of the pilot plan.",
    description: "Celebrating Brasília's founding pioneer spirit with an all-analog outdoor festival. A geometric timber A-frame mainstage lights up the twilight woodland clearing with warm psy-tech and melodic techno.",
    lineup: [
      { name: "Pulso Central", bio: "Hybrid live trio combining analog tape echoes, bass synths, and driving psy-tech grooves." },
      { name: "Bianca Lima", bio: "Headline melodic techno DJ acclaimed for emotional festival closings across the Central Plateau." }
    ],
    venueDesc: "Set beside native gallery forest trails in Park Way near the historic Catetinho wooden landmark.",
    genre: "Psy-Tech / Melodic Techno"
  }
];

function buildEventsData(referenceDate = new Date()) {
  const baseYear = referenceDate.getFullYear();
  const baseMonth = referenceDate.getMonth();
  const todayDay = referenceDate.getDate();

  const monthEventsTotal = RAW_EVENTS_CATALOG.filter(e => e.category === "month").length;
  const upcomingTotalsByOffset = {};
  RAW_EVENTS_CATALOG.forEach(e => {
    if (e.category === "upcoming") {
      const offset = (e.upcomingSlot && e.upcomingSlot.monthOffset) || 1;
      upcomingTotalsByOffset[offset] = (upcomingTotalsByOffset[offset] || 0) + 1;
    }
  });

  let monthCursor = 0;
  const upcomingCursors = {};

  return RAW_EVENTS_CATALOG.map(raw => {
    let targetDate;
    if (raw.category === "today") {
      targetDate = new Date(baseYear, baseMonth, todayDay);
    } else if (raw.category === "month") {
      targetDate = resolveCurrentMonthDate(baseYear, baseMonth, todayDay, monthCursor, monthEventsTotal);
      monthCursor += 1;
    } else {
      const offset = (raw.upcomingSlot && raw.upcomingSlot.monthOffset) || 1;
      const slotIdx = upcomingCursors[offset] || 0;
      upcomingCursors[offset] = slotIdx + 1;
      targetDate = resolveUpcomingMonthDate(baseYear, baseMonth, offset, slotIdx, upcomingTotalsByOffset[offset]);
    }

    const formatted = formatEventDateFields(targetDate);
    return {
      ...raw,
      ...formatted
    };
  });
}

const APP_OPEN_DATE = new Date();
const EVENTS_DATA = buildEventsData(APP_OPEN_DATE);

function createDefaultTickets(referenceDate, events) {
  const vaporEvt = events.find(e => e.id === "vapor-cybernetic") || events[1] || events[0];
  const externaEvt = events.find(e => e.id === "externa-monolith") || events[3] || events[0];
  const todayDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const yesterdayDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() - 1);

  return [
    {
      ...vaporEvt,
      ticketId: "#WFHT100492",
      purchasedAt: formatPurchaseTimestamp(todayDate, "11:49"),
      paymentMethod: "Mastercard •••• 2304",
      status: "Approved",
      regularQty: 1,
      studentQty: 0
    },
    {
      ...externaEvt,
      ticketId: "#WFHT209148",
      purchasedAt: formatPurchaseTimestamp(yesterdayDate, "19:30"),
      paymentMethod: "Apple Pay •••• 8812",
      status: "Approved",
      regularQty: 1,
      studentQty: 1
    }
  ];
}

// ============================================================================
// Application State
// ============================================================================
const state = {
  activeTab: "today",       // 'today' | 'month' | 'upcoming'
  activeView: "welcome",    // 'welcome' | 'home' | 'search' | 'favorites' | 'tickets' | 'checkout' | 'confirmation'
  favorites: new Set(["trema-techno", "vapor-cybernetic"]), // Default pre-saved
  tickets: createDefaultTickets(APP_OPEN_DATE, EVENTS_DATA),
  searchQuery: "",
  searchSubmitted: false,
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

// Checkout flow dynamic state (Version 1.2.3: Initialized empty on app startup)
let checkoutState = {
  event: null,
  regularQty: 0,
  studentQty: 0,
  regularPrice: 0,
  studentPrice: 0
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
const desktopSearchBar = document.getElementById("desktopSearchBar");
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

  // Configure native system calendar picker trigger on Search -> Event Date
  const searchFormDate = document.getElementById("searchFormDate");
  if (searchFormDate) {
    searchFormDate.addEventListener("click", () => {
      if (typeof searchFormDate.showPicker === "function") {
        try {
          searchFormDate.showPicker();
        } catch (_) {
          // Fallback to native calendar indicator click when showPicker() is restricted
        }
      }
    });
  }
  syncSearchDateClearButton();

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
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = state.searchSubmitted ? "flex" : "none";
    if (eventsContainer) eventsContainer.style.display = state.searchSubmitted ? "grid" : "none";
    // Version 1.1: On mobile/touch screen sizes, do NOT auto-focus so the virtual touch
    // keyboard only opens when the user explicitly interacts with/taps one of the input text boxes.
    const isMobileOrTouch = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isMobileOrTouch) {
      const searchInput = document.getElementById("searchFormName");
      if (searchInput) searchInput.focus();
    } else if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
  } else if (viewName === "checkout") {
    if (subHeaderNav) subHeaderNav.style.display = "block";
    if (backButton) backButton.style.display = "flex";
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
    if (!state.searchSubmitted) {
      if (sectionHeaderBlock) sectionHeaderBlock.style.display = "none";
      if (eventCountBadge) eventCountBadge.textContent = "0 events";
      eventsContainer.innerHTML = "";
      eventsContainer.style.display = "none";
      return;
    }
    if (sectionHeaderBlock) sectionHeaderBlock.style.display = "flex";
    eventsContainer.style.display = "grid";

    const qName = state.searchFilters.name.toLowerCase().trim();
    const qDate = state.searchFilters.date.toLowerCase().trim();
    const qLoc = state.searchFilters.location.toLowerCase().trim();
    const onlyToday = state.searchFilters.todayOnly;

    // Filter matching criteria
    list = EVENTS_DATA.filter(evt => {
      if (onlyToday && evt.category !== "today") return false;
      const matchName = !qName ||
        evt.title.toLowerCase().includes(qName) ||
        evt.genre.toLowerCase().includes(qName) ||
        evt.lineup.some(artist => artist.name.toLowerCase().includes(qName));
      const isIsoDateQuery = /^\d{4}-\d{2}-\d{2}$/.test(qDate);
      const matchDate = !qDate ||
        (isIsoDateQuery && evt.dateISO === qDate) ||
        (!isIsoDateQuery && (
          ((qDate === "today" || qDate === "tonight") && evt.category === "today") ||
          ((qDate === "this month" || qDate === "month") && evt.category === "month") ||
          (qDate === "upcoming" && evt.category === "upcoming") ||
          evt.dateDay.includes(qDate) ||
          evt.dateMonth.toLowerCase().includes(qDate) ||
          evt.dateFormatted.toLowerCase().includes(qDate) ||
          evt.dateShort.includes(qDate)
        ));
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
      evt.dateFormatted.toLowerCase().includes(q) ||
      evt.dateMonth.toLowerCase().includes(q) ||
      evt.dateShort.includes(q) ||
      evt.lineup.some(artist => artist.name.toLowerCase().includes(q))
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
      sectionSubtitleEl.textContent = "Major festivals, ancestral showcases, and warehouse raves over the next two months";
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
          <button class="btn-purchase-direct" onclick="startCheckout('${evt.id}')" title="Add to Cart" aria-label="Add to Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5V19M5 12H19"/></svg>
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
function syncSearchDateClearButton() {
  const dateEl = document.getElementById("searchFormDate");
  const clearBtn = document.getElementById("clearSearchDateBtn");
  if (clearBtn && dateEl) {
    clearBtn.style.display = dateEl.value ? "flex" : "none";
  }
}

window.clearSearchDate = function() {
  const nameEl = document.getElementById("searchFormName");
  const dateEl = document.getElementById("searchFormDate");
  const locEl = document.getElementById("searchFormLocation");
  if (dateEl) {
    dateEl.value = "";
  }
  state.searchFilters.date = "";
  syncSearchDateClearButton();

  const qName = nameEl ? nameEl.value.trim() : "";
  const qLoc = locEl ? locEl.value.trim() : "";
  if (!qName && !qLoc && state.searchSubmitted) {
    state.searchSubmitted = false;
    renderEvents();
  }
};

window.executeLiveSearch = function() {
  const nameEl = document.getElementById("searchFormName");
  const dateEl = document.getElementById("searchFormDate");
  const locEl = document.getElementById("searchFormLocation");

  syncSearchDateClearButton();

  const qName = nameEl ? nameEl.value.trim() : "";
  const qDate = dateEl ? dateEl.value.trim() : "";
  const qLoc = locEl ? locEl.value.trim() : "";
  if (!qName && !qDate && !qLoc && state.searchSubmitted) {
    state.searchSubmitted = false;
    renderEvents();
  }
};

window.executeAdvancedSearch = function() {
  const nameEl = document.getElementById("searchFormName");
  const dateEl = document.getElementById("searchFormDate");
  const locEl = document.getElementById("searchFormLocation");
  const todayEl = document.getElementById("toggleTodayOnly");

  const qName = nameEl ? nameEl.value.trim() : "";
  const qDate = dateEl ? dateEl.value.trim() : "";
  const qLoc = locEl ? locEl.value.trim() : "";
  const tOnly = todayEl ? todayEl.checked : false;
  const hasTextBoxInput = Boolean(qName || qDate || qLoc);

  syncSearchDateClearButton();

  if (!hasTextBoxInput) {
    state.searchSubmitted = false;
    renderEvents();
    showToast("Please enter an event name, date, or location to search.");
    return;
  }

  state.searchFilters.name = qName;
  state.searchFilters.date = qDate;
  state.searchFilters.location = qLoc;
  state.searchFilters.todayOnly = tOnly;
  state.searchSubmitted = true;

  renderEvents();
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
  state.searchSubmitted = false;
  state.searchQuery = "";
  if (desktopSearchInput) desktopSearchInput.value = "";
  if (typeof window.closeTopSearchBar === "function") {
    window.closeTopSearchBar(true);
  }
  syncSearchDateClearButton();

  if (state.activeView === "search") {
    renderEvents();
  } else {
    switchView("home");
  }
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

  if (eventModal) {
    eventModal.style.removeProperty("display");
    eventModal.classList.add("open");
  }
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
// Version 1.2.3: Supports Empty Cart View on startup or reset & Populated Cart
// ============================================================================
window.openCart = function() {
  const totalTickets = (checkoutState && checkoutState.event) 
    ? (checkoutState.regularQty + checkoutState.studentQty) 
    : 0;

  if (totalTickets === 0 || !checkoutState || !checkoutState.event) {
    showEmptyCartView();
  } else {
    showPopulatedCartView();
  }
};

window.showEmptyCartView = function() {
  const emptyCartCard = document.getElementById("emptyCartCard");
  const checkoutCard = document.getElementById("checkoutCard");
  if (emptyCartCard) emptyCartCard.style.display = "flex";
  if (checkoutCard) checkoutCard.style.display = "none";

  if (sectionTitleEl) sectionTitleEl.textContent = "Shopping Cart";
  if (sectionSubtitleEl) sectionSubtitleEl.textContent = "Your cart is currently empty";
  if (eventCountBadge) eventCountBadge.textContent = "0 Items";

  switchView("checkout");
};

window.showPopulatedCartView = function() {
  const emptyCartCard = document.getElementById("emptyCartCard");
  const checkoutCard = document.getElementById("checkoutCard");
  if (emptyCartCard) emptyCartCard.style.display = "none";
  if (checkoutCard) checkoutCard.style.display = "flex";

  const totalTickets = (checkoutState && checkoutState.event) 
    ? (checkoutState.regularQty + checkoutState.studentQty) 
    : 0;

  updateCheckoutCalculations();

  if (sectionTitleEl) sectionTitleEl.textContent = "Shopping Cart";
  if (sectionSubtitleEl) sectionSubtitleEl.textContent = "Review ticket quantities and proceed to secure checkout";
  if (eventCountBadge) eventCountBadge.textContent = `${totalTickets} ${totalTickets === 1 ? 'Ticket' : 'Tickets'}`;

  switchView("checkout");
};

window.startCheckout = function(eventId) {
  const evt = EVENTS_DATA.find(item => item.id === eventId) || currentEventInModal || EVENTS_DATA[0];
  if (!evt) return;

  // Initialize checkout quantities with 1 regular ticket
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
  const titleEl = document.getElementById("checkoutEventTitle");
  const dtEl = document.getElementById("checkoutEventDateTime");
  const venueEl = document.getElementById("checkoutEventVenue");
  const imgEl = document.getElementById("checkoutEventImage");
  const qtyRegEl = document.getElementById("qtyRegular");
  const qtyStuEl = document.getElementById("qtyStudent");
  const priceRegEl = document.getElementById("pricePerRegular");
  const priceStuEl = document.getElementById("pricePerStudent");

  if (titleEl) titleEl.textContent = evt.title;
  if (dtEl) dtEl.textContent = `${evt.dateShort} - ${evt.time}`;
  if (venueEl) venueEl.textContent = evt.venue;
  if (imgEl) imgEl.src = evt.image;

  if (qtyRegEl) qtyRegEl.textContent = checkoutState.regularQty;
  if (qtyStuEl) qtyStuEl.textContent = checkoutState.studentQty;
  if (priceRegEl) priceRegEl.textContent = `${evt.priceFormatted} each`;
  if (priceStuEl) priceStuEl.textContent = `$ ${checkoutState.studentPrice.toFixed(2)} each (50% off)`;

  showPopulatedCartView();
};

// Ticket quantity increment/decrement (+ / - buttons)
window.updateTicketQty = function(type, delta) {
  if (!checkoutState || !checkoutState.event) return;

  if (type === "regular") {
    checkoutState.regularQty = Math.max(0, checkoutState.regularQty + delta);
    const regEl = document.getElementById("qtyRegular");
    if (regEl) regEl.textContent = checkoutState.regularQty;
  } else if (type === "student") {
    checkoutState.studentQty = Math.max(0, checkoutState.studentQty + delta);
    const stuEl = document.getElementById("qtyStudent");
    if (stuEl) stuEl.textContent = checkoutState.studentQty;
  }

  const totalTickets = checkoutState.regularQty + checkoutState.studentQty;
  if (totalTickets === 0) {
    showEmptyCartView();
  } else {
    updateCheckoutCalculations();
  }
};

function updateCheckoutCalculations() {
  if (!checkoutState || !checkoutState.event) return;

  const regSubtotal = checkoutState.regularQty * checkoutState.regularPrice;
  const stuSubtotal = checkoutState.studentQty * checkoutState.studentPrice;
  const total = regSubtotal + stuSubtotal;

  const regEl = document.getElementById("subtotalRegular");
  const stuEl = document.getElementById("subtotalStudent");
  const totEl = document.getElementById("checkoutTotalPrice");
  if (regEl) regEl.textContent = `$ ${regSubtotal.toFixed(2)}`;
  if (stuEl) stuEl.textContent = `$ ${stuSubtotal.toFixed(2)}`;
  if (totEl) totEl.textContent = `$ ${total.toFixed(2)}`;

  const totalTickets = checkoutState.regularQty + checkoutState.studentQty;
  if (eventCountBadge && state.activeView === "checkout") {
    eventCountBadge.textContent = `${totalTickets} ${totalTickets === 1 ? 'Ticket' : 'Tickets'}`;
  }

  const btnPay = document.getElementById("btnContinuePayment");
  if (btnPay) {
    if (totalTickets === 0) {
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
  
  // Reset cart quantities after payment (Version 1.2.3)
  checkoutState.event = null;
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

  if (ticketModal) {
    ticketModal.style.removeProperty("display");
    ticketModal.classList.add("open");
  }
}

window.closeTicketModal = function() {
  if (ticketModal) ticketModal.classList.remove("open");
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
  if (profileModal) {
    profileModal.style.removeProperty("display");
    profileModal.classList.add("open");
  }
};

window.closeProfileModal = function() {
  if (profileModal) profileModal.classList.remove("open");
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
// Top-Bar Search Bar & Keyboard Shortcuts (Version 1.4: Figma 28:230 & Backdrop Fix)
// ============================================================================
window.openTopSearchBar = function(e) {
  if (e) e.stopPropagation();
  if (!desktopSearchBar) return;
  desktopSearchBar.classList.add("is-open");
  if (desktopSearchInput && document.activeElement !== desktopSearchInput) {
    desktopSearchInput.focus();
  }
};

window.closeTopSearchBar = function(clearValue = false) {
  if (!desktopSearchBar) return;
  if (clearValue) {
    state.searchQuery = "";
    if (desktopSearchInput) desktopSearchInput.value = "";
  }
  desktopSearchBar.classList.remove("is-open");
  if (desktopSearchInput && document.activeElement === desktopSearchInput) {
    desktopSearchInput.blur();
  }
};

function setupKeyboardShortcuts() {
  // Top-Bar Expandable Search Input
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener("focus", () => {
      if (desktopSearchBar) desktopSearchBar.classList.add("is-open");
    });

    desktopSearchInput.addEventListener("blur", () => {
      if (desktopSearchBar && desktopSearchInput.value.trim() === "") {
        desktopSearchBar.classList.remove("is-open");
      }
    });

    desktopSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery.trim() !== "" && state.activeView !== "home") {
        switchView("home");
      } else {
        renderEvents();
      }
    });
  }

  // Collapse top search bar when clicking outside while empty
  document.addEventListener("click", (e) => {
    if (desktopSearchBar && desktopSearchBar.classList.contains("is-open") && !desktopSearchBar.contains(e.target)) {
      if (!desktopSearchInput || desktopSearchInput.value.trim() === "") {
        closeTopSearchBar(false);
      }
    }
  });

  // Key shortcut '/' focuses search, 'Escape' closes modals or search bar
  window.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    const isInputFocused = activeTag === "INPUT" || activeTag === "TEXTAREA";

    if (e.key === "/" && !isInputFocused) {
      e.preventDefault();
      openTopSearchBar();
    }

    if (e.key === "Escape") {
      if (eventModal && eventModal.classList.contains("open")) closeEventModal();
      if (ticketModal && ticketModal.classList.contains("open")) closeTicketModal();
      if (profileModal && profileModal.classList.contains("open")) closeProfileModal();
      if (addPaymentModal && (addPaymentModal.classList.contains("open") || addPaymentModal.style.display === "flex")) {
        closeAddPaymentModal();
      }
      if (desktopSearchBar && desktopSearchBar.classList.contains("is-open")) {
        closeTopSearchBar(true);
        renderEvents();
      }
    }
  });

  // Modal Backdrop Click (call proper close handlers without setting display: none on .modal-overlay)
  [eventModal, ticketModal, profileModal, addPaymentModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        if (modal === eventModal) closeEventModal();
        else if (modal === ticketModal) closeTicketModal();
        else if (modal === profileModal) closeProfileModal();
        else if (modal === addPaymentModal) closeAddPaymentModal();
      }
    });
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
