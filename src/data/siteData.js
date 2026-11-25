/**
 * Shri Radhika Developers — Centralized Site Data
 * 
 * All editable content is maintained here so that future content
 * replacement does not require searching through components.
 * 
 * Placeholder content is realistic but does not invent specific
 * company achievements, statistics, or claims.
 */

// Raghavpuram
import raghavpuramImg1 from '../assets/project1/Gallery/Screenshot 2026-09-10 224349.png'
import raghavpuramImg2 from '../assets/project1/Gallery/Screenshot 2026-09-10 224545.png'
import raghavpuramImg3 from '../assets/project1/Gallery/Screenshot 2026-09-10 224703.png'
import raghavpuramImg4 from '../assets/project1/Gallery/Screenshot 2026-09-10 225028.png'
import raghavpuramImg5 from '../assets/project1/Gallery/Screenshot 2026-09-10 225127.png'

// City Complex
import cityComplexOverview from '../assets/City Complex/Gallery/CITY_COMPLEX_IMG3.webp'
import cityComplexImg1 from '../assets/City Complex/Gallery/CITY_COMPLEX_IMG1.webp'
import cityComplexImg2 from '../assets/City Complex/Gallery/CITY_COMPLEX_IMG2.webp'
import cityComplexImg3 from '../assets/City Complex/Gallery/CITY_COMPLEX_IMG3.webp'

// Vrindavan Vihar
import vrindavanOverview from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG1.webp'
import vrindavanImg1 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG1.webp'
import vrindavanImg2 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG2.webp'
import vrindavanImg3 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG3.webp'
import vrindavanImg4 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG4.webp'
import vrindavanImg5 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG5.webp'
import vrindavanImg6 from '../assets/Vrindavan Vihar/Gallery/VRINDA_IMG6.webp'

// Suvidha Plaza
import suvidhaOverview from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG1.webp'
import suvidhaImg1 from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG1.webp'
import suvidhaImg2 from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG2.webp'
import suvidhaImg3 from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG3.webp'
import suvidhaImg4 from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG4.webp'
import suvidhaImg5 from '../assets/Suvidha Plaza/Gallery/SUVIDHA_IMG5.webp'

// Signature Tower
import signatureOverview from '../assets/Signature Tower/Gallery/SIGNATURE_IMG1.webp'
import signatureImg1 from '../assets/Signature Tower/Gallery/SIGNATURE_IMG1.webp'
import signatureImg2 from '../assets/Signature Tower/Gallery/SIGNATURE_IMG2.webp'
import signatureImg3 from '../assets/Signature Tower/Gallery/SIGNATURE_IMG3.webp'

// Partners
import partner1Img from '../assets/Partner_1.jpeg'
import partner2Img from '../assets/Partner_2.jpeg'

// Video URL Resolver
import { resolveVideoUrl } from '../utils/videoResolver'

// ── Company Information ──
export const company = {
  name: "Shri Radhika Developers",
  tagline: "Building Value. Shaping Tomorrow.",
  experience: "25+ Years",
  operatingSince: "2001",
  location: "Deoband",
  description:
    "A real estate investment and development company based in Deoband with 25+ years of experience operating since 2001, focused on identifying opportunity, creating quality developments, and building long-term value across carefully selected locations.",
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
      overview: null,

      overviewVideo: {
        id: "01",
        label: "Overview Film",
        blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/Raghavpuram%20Video.mp4",
        localSrc: "/src/assets/project1/Videos/Raghavpuram Video.mp4",
        src: resolveVideoUrl({
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/Raghavpuram%20Video.mp4",
          localSrc: "/src/assets/project1/Videos/Raghavpuram Video.mp4",
        }),
        poster: null,
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
          label: "Arrival Avenue",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid1.MP4",
          localSrc: "/src/assets/project1/Videos/raghavpuram_vid1.MP4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid1.MP4",
            localSrc: "/src/assets/project1/Videos/raghavpuram_vid1.MP4",
          }),
          poster: raghavpuramImg1,
        },
        {
          id: "02",
          label: "Avenue Walkthrough",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid2.MP4",
          localSrc: "/src/assets/project1/Videos/raghavpuram_vid2.MP4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid2.MP4",
            localSrc: "/src/assets/project1/Videos/raghavpuram_vid2.MP4",
          }),
          poster: raghavpuramImg2,
        },
        {
          id: "03",
          label: "Colony Aerial Tour",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid3.MP4",
          localSrc: "/src/assets/project1/Videos/raghavpuram_vid3.MP4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/raghavpuram_vid3.MP4",
            localSrc: "/src/assets/project1/Videos/raghavpuram_vid3.MP4",
          }),
          poster: raghavpuramImg4,
        },
      ],

      location: {
        address: "शुगर मिल बाईपास, रणखण्डी पुलिस चौकी के सामने, निकट रूप गार्डन, देवबन्द",
        description: null,
        coordinates: {
          lat: 29.673940,
          lng: 77.662027,
        },
        mapsUrl: "https://maps.google.com/?q=29.673940,77.662027",
      },
    },

    contact: {
      phones: [
        "+91 80779 23248",
        "+91 82189 39440",
        "+91 97593 34767",
      ],
    },
  },
  {
    id: "03",
    number: "02",

    developer: "Shree Radhika Developers",
    brand: "SRD — Residential",

    name: "Vrindavan Vihar",
    category: "Residential Gated Colony",
    location: "Near Government Hospital, Deoband",
    coordinates: {
      lat: 29.9288889,
      lng: 77.2983333,
    },
    mapsUrl: "https://www.google.com/maps?q=29.9288889,77.2983333",
    status: "Booking Open",
    description:
      "An approved gated residential colony designed for healthy and secure community living with dedicated parks and modern amenities.",

    overview: {
      tagline: "Thoughtfully Planned Residential Living with Modern Community Amenities.",
      promotionalLine:
        "Fully gated residential community featuring dedicated open gym, landscaped parks, and direct highway proximity.",
    },

    facts: {
      totalPlots: "Approved Layout",
      plotType: "Residential Gated Colony",
      roadWidth: "2-3 KM to Highway",
    },

    features: [
      "Approved Layout Plan",
      "Fully Gated Colony",
      "Triple S Security System",
      "Prime Location — Near Government Hospital",
      "Excellent Connectivity — Just 2–3 KM from Saharanpur-Nakur-Kurukshetra Highway",
      "Dedicated Park & Open Gym Facilities",
    ],

    media: {
      overview: {
        type: "image",
        src: vrindavanOverview,
        alt: "Vrindavan Vihar residential colony overview",
      },

      overviewVideo: {
        id: "01",
        label: "Overview Film",
        blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/VRIDAVAN%20VIHAR_VID1.mp4",
        localSrc: "/src/assets/Vrindavan Vihar/Videos/VRIDAVAN VIHAR_VID1.mp4",
        src: resolveVideoUrl({
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/VRIDAVAN%20VIHAR_VID1.mp4",
          localSrc: "/src/assets/Vrindavan Vihar/Videos/VRIDAVAN VIHAR_VID1.mp4",
        }),
        poster: vrindavanOverview,
      },

      gallery: [
        {
          type: "image",
          src: vrindavanImg1,
          alt: "Vrindavan Vihar panoramic master layout",
        },
        {
          type: "image",
          src: vrindavanImg2,
          alt: "Vrindavan Vihar wide paved internal avenues",
        },
        {
          type: "image",
          src: vrindavanImg3,
          alt: "Vrindavan Vihar landscaped residential surroundings",
        },
        {
          type: "image",
          src: vrindavanImg4,
          alt: "Vrindavan Vihar plotted sector development",
        },
        {
          type: "image",
          src: vrindavanImg5,
          alt: "Vrindavan Vihar open expanse and infrastructure",
        },
        {
          type: "image",
          src: vrindavanImg6,
          alt: "Vrindavan Vihar gated entrance approach",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Colony Walkthrough",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/VRINDAVAN%20VIHAR_VID2.mp4",
          localSrc: "/src/assets/Vrindavan Vihar/Videos/VRINDAVAN VIHAR_VID2.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/VRINDAVAN%20VIHAR_VID2.mp4",
            localSrc: "/src/assets/Vrindavan Vihar/Videos/VRINDAVAN VIHAR_VID2.mp4",
          }),
          poster: vrindavanImg4,
        },
      ],

      location: {
        address: "निकट सरकारी अस्पताल, देवबंद, सहारनपुर",
        description: null,
        coordinates: {
          lat: 29.9288889,
          lng: 77.2983333,
        },
        mapsUrl: "https://www.google.com/maps?q=29.9288889,77.2983333",
      },
    },

    contact: {
      phones: [
        "+91 80779 23248",
        "+91 82189 39440",
        "+91 97593 34767",
      ],
    },
  },
  {
    id: "04",
    number: "03",

    developer: "Shree Radhika Developers",
    brand: "SRD — Commercial",

    name: "Suvidha Plaza",
    category: "Commercial Complex",
    location: "Deoband, Saharanpur",
    status: "Ongoing",
    description:
      "A strategically planned commercial plaza featuring 57 premium shops, wide circulation corridors, and dedicated customer parking.",

    overview: {
      tagline: "57 Premium Commercial Shops with Approved Layout and Dedicated Parking.",
      promotionalLine:
        "Prime commercial location engineered for high visibility, wide road access, and flourishing retail enterprise.",
    },

    facts: {
      totalPlots: "57",
      plotType: "Commercial Shops",
      roadWidth: "30 ft & 25 ft",
    },

    features: [
      "Prime Commercial Location",
      "Approved Layout Plan",
      "Wide 30ft & 25ft Roads",
      "Dedicated Parking Space",
      "57 Premium Commercial Shops",
    ],

    media: {
      overview: {
        type: "image",
        src: suvidhaOverview,
        alt: "Suvidha Plaza commercial elevation overview",
      },

      overviewVideo: {
        id: "01",
        label: "Overview Film",
        blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID1_h264.mp4",
        // H.264 re-encode — original SUVIDHAVID1.MP4 was HEVC/H.265 (hvc1), unsupported in Chromium
        localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID1_h264.mp4",
        src: resolveVideoUrl({
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID1_h264.mp4",
          localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID1_h264.mp4",
        }),
        poster: suvidhaOverview,
      },

      gallery: [
        {
          type: "image",
          src: suvidhaImg1,
          alt: "Suvidha Plaza main commercial elevation",
        },
        {
          type: "image",
          src: suvidhaImg2,
          alt: "Suvidha Plaza wide architectural perspective",
        },
        {
          type: "image",
          src: suvidhaImg3,
          alt: "Suvidha Plaza retail frontage",
        },
        {
          type: "image",
          src: suvidhaImg4,
          alt: "Suvidha Plaza shopping arcade and access roads",
        },
        {
          type: "image",
          src: suvidhaImg5,
          alt: "Suvidha Plaza parking area and road approach",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Drone Tour",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID2_h264.mp4",
          // H.264 re-encode — original HEVC/H.265 file not supported in Chromium
          localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID2_h264.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID2_h264.mp4",
            localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID2_h264.mp4",
          }),
          poster: suvidhaImg3,
        },
        {
          id: "02",
          label: "Site Inspection",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID3_h264.mp4",
          // H.264 re-encode — original HEVC/H.265 file not supported in Chromium
          localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID3_h264.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID3_h264.mp4",
            localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID3_h264.mp4",
          }),
          poster: suvidhaImg5,
        },
        {
          id: "03",
          label: "Showcase Reel",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID4_h264.mp4",
          // H.264 re-encode — original HEVC/H.265 file not supported in Chromium
          // SUVIDHAVID4_h264.mp4 conversion running in background; will play once complete
          localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID4_h264.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SUVIDHAVID4_h264.mp4",
            localSrc: "/src/assets/Suvidha Plaza/Videos/converted/SUVIDHAVID4_h264.mp4",
          }),
          poster: suvidhaImg2,
        },
      ],

      location: {
        address: "Deoband, Saharanpur, Uttar Pradesh",
        description: null,
        coordinates: {
          lat: 29.703945,
          lng: 77.687599,
        },
        mapsUrl: "https://maps.google.com/?q=29.703945,77.687599",
      },
    },

    contact: {
      phones: [
        "+91 80779 23248",
        "+91 82189 39440",
        "+91 97593 34767",
      ],
    },
  },
  {
    id: "05",
    number: "04",

    developer: "Shree Radhika Developers",
    brand: "SRD — Commercial",

    name: "Signature Tower",
    category: "Commercial Complex",
    location: "Hanuman Chowk, Deoband",
    status: "Ongoing",
    description:
      "A prominent commercial landmark at Hanuman Chowk, home to a dedicated mobile and electronics market with exceptional customer footfall.",

    overview: {
      tagline: "High-Footfall Commercial Hub at Hanuman Chowk.",
      promotionalLine:
        "A landmark commercial development hosting a dedicated electronics market in Deoband's prime retail hub.",
    },

    facts: {
      totalPlots: "Prime Landmark",
      plotType: "Electronics Market",
      roadWidth: "Hanuman Chowk",
    },

    features: [
      "Prime Commercial Location — Hanuman Chowk, Deoband",
      "Dedicated Mobile & Electronics Market",
      "High Customer Footfall",
      "Excellent Market Connectivity",
      "Premium Commercial Shops",
    ],

    media: {
      overview: {
        type: "image",
        src: signatureOverview,
        alt: "Signature Tower commercial high-rise overview",
      },

      overviewVideo: {
        id: "01",
        label: "Overview Film",
        blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SIGNATURE_VID1.mp4",
        localSrc: "/src/assets/Signature Tower/Videos/SIGNATURE_VID1.mp4",
        src: resolveVideoUrl({
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SIGNATURE_VID1.mp4",
          localSrc: "/src/assets/Signature Tower/Videos/SIGNATURE_VID1.mp4",
        }),
        poster: signatureOverview,
      },

      gallery: [
        {
          type: "image",
          src: signatureImg1,
          alt: "Signature Tower facade at Hanuman Chowk",
        },
        {
          type: "image",
          src: signatureImg2,
          alt: "Signature Tower retail floors and street frontage",
        },
        {
          type: "image",
          src: signatureImg3,
          alt: "Signature Tower commercial arcade",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Arcade Tour",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SIGNATURE_VID2.mp4",
          localSrc: "/src/assets/Signature Tower/Videos/SIGNATURE_VID2.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/SIGNATURE_VID2.mp4",
            localSrc: "/src/assets/Signature Tower/Videos/SIGNATURE_VID2.mp4",
          }),
          poster: signatureImg2,
        },
      ],

      location: {
        address: "हनुमान चौक, देवबंद, सहारनपुर, उत्तर प्रदेश",
        description: null,
        coordinates: {
          lat: 29.693697,
          lng: 77.678909,
        },
        mapsUrl: "https://maps.google.com/?q=29.693697,77.678909",
      },
    },

    contact: {
      phones: [
        "+91 80779 23248",
        "+91 82189 39440",
        "+91 97593 34767",
      ],
    },
  },
  {
    id: "02",
    number: "05",

    developer: "Shree Radhika Developers",
    brand: "SRD — Commercial",

    name: "City Complex",
    category: "Commercial Complex",
    location: "Deoband, Saharanpur",
    status: "Ongoing",
    description:
      "A premier commercial complex offering modern business infrastructure, ample parking, and strategic market positioning.",

    overview: {
      tagline: "Modern Commercial Infrastructure in the Heart of the Market.",
      promotionalLine:
        "Strategically located commercial spaces designed for high daily footfall and lasting business value.",
    },

    facts: {
      totalPlots: "800-1000 Daily Footfall",
      plotType: "Commercial Complex",
      roadWidth: "Wide Planned Roads",
    },

    features: [
      "Prime Commercial Location",
      "Wide & Well-Planned Roads",
      "Ample Parking Space",
      "Triple S Security System",
      "800–1000 Daily Footfall",
    ],

    media: {
      overview: {
        type: "image",
        src: cityComplexOverview,
        alt: "City Complex commercial development overview",
      },

      overviewVideo: {
        id: "01",
        label: "Overview Film",
        blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/CITY_COMPLEX_VID1.mp4",
        localSrc: "/src/assets/City Complex/Videos/CITY_COMPLEX_VID1.mp4",
        src: resolveVideoUrl({
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/CITY_COMPLEX_VID1.mp4",
          localSrc: "/src/assets/City Complex/Videos/CITY_COMPLEX_VID1.mp4",
        }),
        poster: cityComplexOverview,
      },

      gallery: [
        {
          type: "image",
          src: cityComplexImg1,
          alt: "City Complex commercial elevation",
        },
        {
          type: "image",
          src: cityComplexImg2,
          alt: "City Complex facade and road approach",
        },
        {
          type: "image",
          src: cityComplexImg3,
          alt: "City Complex architectural view",
        },
      ],

      videos: [
        {
          id: "01",
          label: "Walkthrough Reel",
          blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/CITY_COMPLEX_VID2.mp4",
          localSrc: "/src/assets/City Complex/Videos/CITY_COMPLEX_VID2.mp4",
          src: resolveVideoUrl({
            blobUrl: "https://g24upulnbc6ag6kp.public.blob.vercel-storage.com/CITY_COMPLEX_VID2.mp4",
            localSrc: "/src/assets/City Complex/Videos/CITY_COMPLEX_VID2.mp4",
          }),
          poster: cityComplexImg2,
        },
      ],

      location: {
        address: "Deoband, Saharanpur, Uttar Pradesh",
        description: null,
        coordinates: {
          lat: 29.697498,
          lng: 77.684799,
        },
        mapsUrl: "https://maps.google.com/?q=29.697498,77.684799",
      },
    },

    contact: {
      phones: [
        "+91 80779 23248",
        "+91 82189 39440",
        "+91 97593 34767",
      ],
    },
  },
];

// ── Statistics ──
// numericValue is used for count-up animation; value is the display string
export const statistics = [
  { value: "25+", numericValue: 25, label: "Years of Experience" },
  { value: "50+", numericValue: 50, label: "Developments" },
  { value: "25+", numericValue: 25, label: "Acres of Land Developed" },
  { value: "40+", numericValue: 40, label: "Locations" },
];

// ── Vision / About ──
export const vision = {
  statement: ["Built on Trust.", "Driven by Vision."],
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  description:
    "Shri Radhika Developers was founded on the principle that real estate should create lasting value — for investors, for communities, and for the future. We are committed to thoughtful development that balances growth with quality.",
};

// ── Leadership & Partners ──
export const partners = [
  {
    id: "01",
    number: "01",
    name: "Mr. Ashutosh Gupta",
    role: "Director",
    designation: "Director",
    experience: "25+ Years of Experience in Real Estate & Construction.",
    image: partner1Img,
    alt: "Mr. Ashutosh Gupta — Director, Shri Radhika Developers",
    description:
      "Mr. Ashutosh Gupta is the driving force behind Shri Radhika Developers. As a co-founder and partner, he brings vision, dedication, and hands-on leadership to every project.\n\nWith a strong focus on quality, integrity, and customer satisfaction, he ensures that every space we create is built to inspire and stand the test of time.",
    qualities: [
      {
        title: "Personalized Involvement",
        description: "Actively involved in every step to ensure the best outcomes.",
      },
      {
        title: "Quality & Integrity",
        description: "Delivering excellence through high standards and honest practices.",
      },
      {
        title: "Commitment to Relationships",
        description: "Believes in building long-term relationships based on trust.",
      },
    ],
  },
  {
    id: "02",
    number: "02",
    name: "Mr. Nitish Goyal",
    role: "Chairperson",
    designation: "Chairperson",
    experience: "5+ Years of Experience in Real Estate & Construction.",
    image: partner2Img,
    alt: "Mr. Nitish Goyal — Chairperson, Shri Radhika Developers",
    description:
      "Mr. Nitish Goyal plays a key role in driving Shri Radhika Developers towards newer heights. With his dedication, vision, and dynamic approach, he contributes to building spaces that create long-term value for our clients.",
    qualities: [
      {
        title: "Client-Centric Approach",
        description: "Focused on delivering the best value for every customer.",
      },
      {
        title: "Growth & Innovation",
        description: "Brings fresh ideas and energy to every new development.",
      },
      {
        title: "Commitment & Integrity",
        description: "Believes in building trust and lasting relationships.",
      },
    ],
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
  phone: "+91 80779 23248",
  primaryPhone: "+91 80779 23248",
  additionalPhones: ["+91 82189 39440", "+91 97593 34767"],
  email: "shriradhikadevelopers@gmail.com",
  address: "Balaji Complex, Near Subhash Chowk, Railway Road, Deoband.",
};

// ── Property Types ──
export const propertyTypes = [
  "Residential plots",
  "Flats",
  "Villas",
  "Commercial spaces and shops",
];

// ── Notable Projects ──
export const notableProjects = [
  { id: "01", name: "Raghavpuram", href: "#project-01" },
  { id: "02", name: "City Complex", href: "#project-02" },
  { id: "05", name: "Signature Tower", href: "#project-05" },
  { id: "03", name: "Vrindavan Vihar", href: "#project-03" },
  { id: "04", name: "Suvidha Plaza", href: "#project-04" },
];

// ── Social Links ──
export const socialLinks = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/shreeradhikadevelopers/",
    label: "Instagram",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/1JSNwgcxe3/",
    label: "Facebook",
  },
];

// ── Footer ──
export const footer = {
  copyright: `© ${new Date().getFullYear()} Shri Radhika Developers`,
  backToTop: "Back to Top",
};
