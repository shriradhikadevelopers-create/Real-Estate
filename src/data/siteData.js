/**
 * Shri Radhika Developers — Centralized Site Data
 * 
 * All editable content is maintained here so that future content
 * replacement does not require searching through components.
 * 
 * Placeholder content is realistic but does not invent specific
 * company achievements, statistics, or claims.
 */

import raghavpuramOverview from '../assets/project1/overview.jpg'
import raghavpuramVid1 from '../assets/project1/Video/vid1.mp4'
import raghavpuramImg1 from '../assets/project1/Gallery/Screenshot 2026-09-10 224349.png'
import raghavpuramImg2 from '../assets/project1/Gallery/Screenshot 2026-09-10 224545.png'
import raghavpuramImg3 from '../assets/project1/Gallery/Screenshot 2026-09-10 224703.png'
import raghavpuramImg4 from '../assets/project1/Gallery/Screenshot 2026-09-10 225028.png'
import raghavpuramImg5 from '../assets/project1/Gallery/Screenshot 2026-09-10 225127.png'

// ── Company Information ──
export const company = {
  name: "Shri Radhika Developers",
  tagline: "Building Value. Shaping Tomorrow.",
  description:
    "A real estate investment and development company focused on identifying opportunity, creating quality developments, and building long-term value across carefully selected locations.",
  vision:
    "We believe in building more than structures — we build futures. Every project is a commitment to quality, long-term value, and the communities we serve.",
};

// ── Navigation ──
export const navigation = [
  { label: "Home", target: "home" },
  { label: "Projects", target: "projects" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

// ── Hero Section ──
export const hero = {
  headline: ["Building Value.", "Shaping Tomorrow."],
  label: "Real Estate Investment & Development",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  scrollIndicator: "Scroll",
};

// ── Introduction ──
export const introduction = {
  statement: ["We See More", "Than Property."],
  description:
    "At Shri Radhika Developers, we approach every opportunity with a long-term perspective. Our focus is on identifying locations with genuine potential, developing projects with lasting quality, and creating value that endures beyond the initial investment.",
};

// ── Philosophy / Approach ──
export const philosophy = [
  {
    number: "01",
    title: "Location",
    description:
      "Identifying opportunities where long-term growth can begin. Every development starts with understanding the potential of a place.",
  },
  {
    number: "02",
    title: "Vision",
    description:
      "Looking beyond immediate value toward future potential. We invest in what a location can become, not just what it is today.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Creating projects with a focus on quality, relevance, and longevity. Every structure is built to serve its community for decades.",
  },
  {
    number: "04",
    title: "Value",
    description:
      "Building opportunities designed to retain and create lasting value. Our developments are investments in the future.",
  },
];

// ── Projects ──
export const projects = [
  {
    id: "01",
    number: "01",

    developer: null,
    brand: null,

    name: "Raghavpuram",
    category: "Residential Colony",
    location: "Sugar Mill Bypass, Rankhandi Chowki, Deoband",
    status: "Booking Open",
    description:
      "Layout-approved residential colony by the Deoband regulated area.",

    overview: {
      tagline: "Layout-approved residential colony by the Deoband regulated area.",
      promotionalLine: null,
    },

    facts: {
      totalPlots: "67",
      plotType: "Residential Plots",
      roadWidth: "30 ft",
    },

    features: [
      "Covered gated colony with boundary wall",
      "Wide roads with proper drainage system",
      "Lush green, beautiful surroundings",
      "Just 5 minutes from the railway station",
      "Streetlight poles available",
    ],

    media: {
      overview: {
        type: "image",
        src: raghavpuramOverview,
        alt: "Raghavpuram residential colony overview",
      },

      gallery: [
        {
          type: "image",
          src: raghavpuramImg1,
          alt: "Raghavpuram main entrance and arrival avenue",
        },
        {
          type: "image",
          src: raghavpuramImg2,
          alt: "Raghavpuram residential plots and wide paved road",
        },
        {
          type: "image",
          src: raghavpuramImg3,
          alt: "Raghavpuram internal road and landscaped surroundings",
        },
        {
          type: "image",
          src: raghavpuramImg4,
          alt: "Raghavpuram plotted sectors and colony development",
        },
        {
          type: "image",
          src: raghavpuramImg5,
          alt: "Raghavpuram layout overview and infrastructure",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Project Film",
          src: raghavpuramVid1,
          poster: null,
        },
      ],

      location: {
        address: "शुगर मिल बाईपास, रणखण्डी पुलिस चौकी के सामने, निकट रूप गार्डन, देवबन्द",
        description: null,
        coordinates: {
          lat: null,
          lng: null,
        },
        mapsUrl: null,
      },
    },

    contact: {
      phones: [
        "7983948531",
        "9259562820",
        "9997065799",
      ],
    },
  },
  {
    id: "02",
    number: "02",

    developer: "Shree Radhika Developers",
    brand: "SRD — Since 2005",

    name: "Project Name",
    category: "Commercial Development",
    location: "Location",
    status: "Ongoing",
    description:
      "A commercial development positioned to serve growing demand in an emerging location.",

    overview: {
      tagline: null,
      promotionalLine: null,
    },

    facts: {
      totalPlots: null,
      plotType: null,
      roadWidth: null,
    },

    features: [],

    media: {
      overview: {
        type: "image",
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        alt: "Project exterior view",
      },

      gallery: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
          alt: "Project exterior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
          alt: "Project interior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1200",
          alt: "Architectural detail",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Project Film",
          src: null,
          poster: null,
        },
      ],

      location: {
        address: "Location",
        description: null,
        coordinates: {
          lat: null,
          lng: null,
        },
        mapsUrl: null,
      },
    },

    contact: {
      phones: [],
    },
  },
  {
    id: "03",
    number: "03",

    developer: "Shree Radhika Developers",
    brand: "SRD — Since 2005",

    name: "Project Name",
    category: "Mixed-Use Development",
    location: "Location",
    status: "Completed",
    description:
      "An integrated development combining residential and commercial spaces within a thoughtfully planned environment.",

    overview: {
      tagline: null,
      promotionalLine: null,
    },

    facts: {
      totalPlots: null,
      plotType: null,
      roadWidth: null,
    },

    features: [],

    media: {
      overview: {
        type: "image",
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
        alt: "Project exterior view",
      },

      gallery: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
          alt: "Project exterior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
          alt: "Project interior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
          alt: "Architectural detail",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Project Film",
          src: null,
          poster: null,
        },
      ],

      location: {
        address: "Location",
        description: null,
        coordinates: {
          lat: null,
          lng: null,
        },
        mapsUrl: null,
      },
    },

    contact: {
      phones: [],
    },
  },
  {
    id: "04",
    number: "04",

    developer: "Shree Radhika Developers",
    brand: "SRD — Since 2005",

    name: "Project Name",
    category: "Residential Development",
    location: "Location",
    status: "Upcoming",
    description:
      "An upcoming residential project focused on modern living and sustainable community design.",

    overview: {
      tagline: null,
      promotionalLine: null,
    },

    facts: {
      totalPlots: null,
      plotType: null,
      roadWidth: null,
    },

    features: [],

    media: {
      overview: {
        type: "image",
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
        alt: "Project exterior view",
      },

      gallery: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
          alt: "Project exterior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200",
          alt: "Project interior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=1200",
          alt: "Architectural detail",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Project Film",
          src: null,
          poster: null,
        },
      ],

      location: {
        address: "Location",
        description: null,
        coordinates: {
          lat: null,
          lng: null,
        },
        mapsUrl: null,
      },
    },

    contact: {
      phones: [],
    },
  },
];

// ── Statistics ──
// numericValue is used for count-up animation; value is the display string
export const statistics = [
  { value: "10+", numericValue: null, label: "Years of Experience" },
  { value: "15", numericValue: null, label: "Developments" },
  { value: "50+", numericValue: null, label: "Acres Developed" },
  { value: "19", numericValue: null, label: "Locations" },
];

// ── Vision / About ──
export const vision = {
  statement: ["Built on Trust.", "Driven by Vision."],
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  description:
    "Shri Radhika Developers was founded on the principle that real estate should create lasting value — for investors, for communities, and for the future. We are committed to thoughtful development that balances growth with quality.",
};

// ── Strategic Partners ──
export const partners = [
  {
    id: "01",
    number: "01",
    name: "Aarav Mehta",
    role: "Investment Strategist",
    focus: "Capital direction & opportunity mapping",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200",
    description:
      "Aarav works with us on identifying the right opportunities, balancing future upside with disciplined execution, and ensuring every decision aligns with long-term value creation.",
    qualities: ["Portfolio view", "Market fit", "Risk discipline"],
  },
  {
    id: "02",
    number: "02",
    name: "Naina Shah",
    role: "Design & Planning Lead",
    focus: "Concept direction & community relevance",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
    description:
      "Naina leads planning and design conversations that shape how spaces function in real life — ensuring each development is both beautiful and thoughtful for the communities it serves.",
    qualities: ["Place-making", "Planning insight", "Design rigor"],
  },
  {
    id: "03",
    number: "03",
    name: "Rohan Kapoor",
    role: "Development Partner",
    focus: "Execution strategy & delivery",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200",
    description:
      "Rohan brings a practical approach to delivery, aligning design intent with build realities and helping keep the vision grounded in strong execution and measurable outcomes.",
    qualities: ["Execution", "Delivery", "Operational clarity"],
  },
];

// ── Closing CTA ──
export const closingCTA = {
  statement: ["The Next", "Opportunity", "Starts Here."],
};

// ── Enquiry ──
export const enquiry = {
  headline: ["Let's Start", "A Conversation."],
  interests: [
    "General Enquiry",
    "Residential Project",
    "Commercial Project",
    "Investment Opportunity",
    "Partnership",
    "Other",
  ],
};

// ── Contact Information ──
export const contact = {
  phone: "",
  email: "",
  address: "",
};

// ── Social Links ──
export const socialLinks = [
  { platform: "Instagram", url: "#", label: "Instagram" },
  { platform: "LinkedIn", url: "#", label: "LinkedIn" },
];

// ── Footer ──
export const footer = {
  copyright: `© ${new Date().getFullYear()} Shri Radhika Developers`,
  backToTop: "Back to Top",
};
