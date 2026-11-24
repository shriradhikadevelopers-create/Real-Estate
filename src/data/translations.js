/**
 * translations.js
 *
 * Central translation data store for the bilingual (EN / HI) system.
 *
 * Structure:
 *   translations.<lang>.<section>.<key>
 *
 * Phase 3 — navigation + hero
 * Phase 4 — introduction, vision, portfolioImpact, partners
 * Phase 5 — projects
 * Phase 6 — closingCTA, enquiry, footer
 * Phase 7 — philosophy
 * Phase 8 — audit fixes (vision.imageFallback, projects renderMediaItem fallback)
 *
 * All sections complete.
 */

const translations = {
  en: {
    /* ── Common ────────────────────────────────────────────────────── */
    common: {
      language: 'Language',
      english: 'English',
      hindi: 'Hindi',
    },

    /* ── Navigation ─────────────────────────────────────────────────── */
    navigation: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      explore: 'Explore',
      close: 'Close',
    },

    /* ── Hero ───────────────────────────────────────────────────────── */
    hero: {
      headlineLines: ['Building Value.', 'Shaping Tomorrow.'],
      label: 'Real Estate Investment & Development',
      scrollIndicator: 'Scroll',
      transition: {
        line1: 'SPACES WITH PURPOSE.',
        line2: 'VALUE THAT ENDURES.',
      },
    },

    /* ── Introduction ───────────────────────────────────────────────── */
    introduction: {
      eyebrow: 'Introduction',
      headline: 'See Beyond the Site.',

      // Stage toggle labels
      stagePlanning: 'Planning',
      stageDeveloped: 'Developed',

      // Scale labels — planning stage
      planningScaleValue: 'Value',
      planningScalePotential: 'Potential',
      planningScaleOpportunity: 'Opportunity',
      planningNote: 'Indicative analysis — planning stage',

      // Scale labels — developed stage
      developedScaleValue: 'Value Created',
      developedScaleDevelopment: 'Development',
      developedScaleMarket: 'Market Presence',
      developedNote: 'Indicative analysis — developed stage',
    },

    /* ── Vision ─────────────────────────────────────────────────────── */
    vision: {
      eyebrow: 'Vision & Purpose',
      headlineLines: ['Built on Trust.', 'Driven by Vision.'],
      description:
        'Shri Radhika Developers was founded on the principle that real estate should create lasting value — for investors, for communities, and for the future. We are committed to thoughtful development that balances growth with quality.',
      imageFallback: 'Vision Image',
    },

    /* ── Portfolio Impact ───────────────────────────────────────────── */
    portfolioImpact: {
      eyebrow: 'Portfolio Impact',
      // Stat labels (values/numbers are never translated)
      yearsOfExperience: 'Years of Experience',
      developments: 'Developments',
      acresDeveloped: 'Acres Developed',
      locations: 'Locations',
    },

    /* ── Partners ───────────────────────────────────────────────────── */
    partners: {
      eyebrow: 'Leadership & Partners',
      headline: 'Built on vision, dedication, and trust.',
      qualitiesHeading: 'Key Qualities',
      previous: '← Previous',
      next: 'Next →',

      // Partner data keyed by partner id
      p01: {
        name: 'Mr. Ashutosh Gupta',
        shortName: 'Ashutosh Gupta',
        role: 'Director',
        designation: 'Director',
        experience: '25+ Years of Experience in Real Estate & Construction.',
        description:
          'Mr. Ashutosh Gupta is the driving force behind Shri Radhika Developers. As a co-founder and partner, he brings vision, dedication, and hands-on leadership to every project.\n\nWith a strong focus on quality, integrity, and customer satisfaction, he ensures that every space we create is built to inspire and stand the test of time.',
        qualities: [
          {
            title: 'Personalized Involvement',
            description: 'Actively involved in every step to ensure the best outcomes.',
          },
          {
            title: 'Quality & Integrity',
            description: 'Delivering excellence through high standards and honest practices.',
          },
          {
            title: 'Commitment to Relationships',
            description: 'Believes in building long-term relationships based on trust.',
          },
        ],
      },
      p02: {
        name: 'Mr. Nitish Goyal',
        shortName: 'Nitish Goyal',
        role: 'Chairperson',
        designation: 'Chairperson',
        experience: '5+ Years of Experience in Real Estate & Construction.',
        description:
          'Mr. Nitish Goyal plays a key role in driving Shri Radhika Developers towards newer heights. With his dedication, vision, and dynamic approach, he contributes to building spaces that create long-term value for our clients.',
        qualities: [
          {
            title: 'Client-Centric Approach',
            description: 'Focused on delivering the best value for every customer.',
          },
          {
            title: 'Growth & Innovation',
            description: 'Brings fresh ideas and energy to every new development.',
          },
          {
            title: 'Commitment & Integrity',
            description: 'Believes in building trust and lasting relationships.',
          },
        ],
      },
    },

    /* ── Projects ───────────────────────────────────────────────────── */
    projects: {
      // Section UI
      eyebrow: 'Portfolio',
      heading: 'Selected',
      headingAccent: 'Projects.',

      // Status labels
      statusCompleted: 'Completed',
      statusOngoing: 'Ongoing',
      statusUpcoming: 'Upcoming',

      // Media navigator tab labels
      mediaOverview: 'Overview',
      mediaGallery: 'Gallery',
      mediaFilm: 'Video',
      mediaLocation: 'Location',

      // Placeholder / UI strings
      projectMediaLabel: 'Project Media',
      exploreLabel: 'Explore →',
      galleryPrev: 'Prev',
      galleryNext: 'Next',
      filmLabel: 'Project Film',
      filmComingSoon: 'Coming Soon',
      locationLabel: 'Location',
      locationMap: 'Location Map',
      locationOpenMaps: 'Open in Maps',
      locationComingSoon: 'Map integration coming soon.',
      factsLabel: 'Facts',
      featuresLabel: 'Features',
      developedBy: 'Developed by',
      enquireCta: 'Enquire About Project',

      // Video player controls
      videoPlay: 'Play',
      videoPause: 'Pause',
      videoMute: 'Mute',
      videoUnmute: 'Unmute',
      videoVolume: 'Volume',
      videoSpeed: 'Speed',
      videoFullscreen: 'Fullscreen',
      videoExitFullscreen: 'Exit Fullscreen',
      videoPip: 'Picture-in-Picture',
      videoUnavailable: 'Video unavailable',
      videoLoading: 'Loading video...',

      // Per-project translatable content — keyed by project id (p01, p02, p03, p04, p05)
      // Structural fields (id, facts, media, contact, etc.) stay in siteData.js
      p01: {
        name: 'Raghavpuram',
        category: 'Residential Colony',
        location: 'Sugar Mill Bypass, Rankhandi Chowki, Deoband',
        locality: 'Deoband',
        region: 'Saharanpur, Uttar Pradesh',
        status: 'Booking Open',
        description:
          'Layout-approved residential colony by the Deoband regulated area.',
        brand: '',
        developer: '',
        tagline: 'Layout-approved residential colony by the Deoband regulated area.',
        promotionalLine: '',
        bookingMessage: '',
        facts: {
          plotsValue: '67',
          plotsLabel: 'Residential Plots',
          roadsValue: '30 ft',
          roadsLabel: 'Roads',
        },
        features: [
          'Covered gated colony with boundary wall',
          'Wide roads with proper drainage system',
          'Lush green, beautiful surroundings',
          'Just 5 minutes from the railway station',
          'Streetlight poles available',
        ],
      },
      p02: {
        name: 'City Complex',
        category: 'Commercial Complex',
        location: 'Deoband, Saharanpur',
        locality: 'Deoband',
        region: 'Saharanpur, Uttar Pradesh',
        status: 'Ongoing',
        description:
          'A premier commercial complex offering modern business infrastructure, ample parking, and strategic market positioning.',
        brand: 'SRD — Commercial',
        developer: 'Shree Radhika Developers',
        tagline: 'Modern Commercial Infrastructure in the Heart of the Market.',
        promotionalLine:
          'Strategically located commercial spaces designed for high daily footfall and lasting business value.',
        bookingMessage: '',
        facts: {
          plotsValue: '800-1000',
          plotsLabel: 'Daily Footfall',
          roadsValue: 'Wide Roads',
          roadsLabel: 'Planned Access',
        },
        features: [
          'Prime Commercial Location',
          'Wide & Well-Planned Roads',
          'Ample Parking Space',
          'Triple S Security System',
          '800–1000 Daily Footfall',
        ],
      },
      p03: {
        name: 'Vrindavan Vihar',
        category: 'Residential Gated Colony',
        location: 'Near Government Hospital, Deoband',
        locality: 'Deoband',
        region: 'Saharanpur, Uttar Pradesh',
        status: 'Booking Open',
        description:
          'An approved gated residential colony designed for healthy and secure community living with dedicated parks and modern amenities.',
        brand: 'SRD — Residential',
        developer: 'Shree Radhika Developers',
        tagline: 'Thoughtfully Planned Residential Living with Modern Community Amenities.',
        promotionalLine:
          'Fully gated residential community featuring dedicated open gym, landscaped parks, and direct highway proximity.',
        bookingMessage: '',
        facts: {
          plotsValue: 'Approved',
          plotsLabel: 'Layout Plan',
          roadsValue: '2-3 KM',
          roadsLabel: 'Highway Access',
        },
        features: [
          'Approved Layout Plan',
          'Fully Gated Colony',
          'Triple S Security System',
          'Prime Location — Near Government Hospital',
          'Excellent Connectivity — Just 2–3 KM from Saharanpur-Nakur-Kurukshetra Highway',
          'Dedicated Park & Open Gym Facilities',
        ],
      },
      p04: {
        name: 'Suvidha Plaza',
        category: 'Commercial Complex',
        location: 'Deoband, Saharanpur',
        locality: 'Deoband',
        region: 'Saharanpur, Uttar Pradesh',
        status: 'Ongoing',
        description:
          'A strategically planned commercial plaza featuring 57 premium shops, wide circulation corridors, and dedicated customer parking.',
        brand: 'SRD — Commercial',
        developer: 'Shree Radhika Developers',
        tagline: '57 Premium Commercial Shops with Approved Layout and Dedicated Parking.',
        promotionalLine:
          'Prime commercial location engineered for high visibility, wide road access, and flourishing retail enterprise.',
        bookingMessage: '',
        facts: {
          plotsValue: '57',
          plotsLabel: 'Commercial Shops',
          roadsValue: '30 & 25 ft',
          roadsLabel: 'Wide Roads',
        },
        features: [
          'Prime Commercial Location',
          'Approved Layout Plan',
          'Wide 30ft & 25ft Roads',
          'Dedicated Parking Space',
          '57 Premium Commercial Shops',
        ],
      },
      p05: {
        name: 'Signature Tower',
        category: 'Commercial Complex',
        location: 'Hanuman Chowk, Deoband',
        locality: 'Deoband',
        region: 'Saharanpur, Uttar Pradesh',
        status: 'Ongoing',
        description:
          'A prominent commercial landmark at Hanuman Chowk, home to a dedicated mobile and electronics market with exceptional customer footfall.',
        brand: 'SRD — Commercial',
        developer: 'Shree Radhika Developers',
        tagline: 'High-Footfall Commercial Hub at Hanuman Chowk.',
        promotionalLine:
          'A landmark commercial development hosting a dedicated electronics market in Deoband\'s prime retail hub.',
        bookingMessage: '',
        facts: {
          plotsValue: 'Prime',
          plotsLabel: 'Hanuman Chowk',
          roadsValue: 'High',
          roadsLabel: 'Customer Footfall',
        },
        features: [
          'Prime Commercial Location — Hanuman Chowk, Deoband',
          'Dedicated Mobile & Electronics Market',
          'High Customer Footfall',
          'Excellent Market Connectivity',
          'Premium Commercial Shops',
        ],
      },
    },

    /* ── Philosophy ─────────────────────────────────────────────────── */
    philosophy: {
      // Section-level
      eyebrow: 'OUR PHILOSOPHY',
      intro: 'Where Potential Begins.',

      // Per-stage — keyed by the stable stage.id values used in philosophyStages[]
      // All structural data (icons, backgroundSvg, from positions, number) stays in Philosophy.jsx
      location: {
        title: 'Location',
        statement: 'Every development begins with understanding the place.',
        support: 'Recognising the character, potential and long-term opportunity within a location.',
      },
      vision: {
        title: 'Vision',
        statement: 'Seeing potential before it becomes obvious.',
        support: 'Looking beyond what exists today toward what a place can become.',
      },
      development: {
        title: 'Development',
        statement: 'Turning possibility into something real.',
        support: 'Bringing vision into physical form through precision, purpose and execution.',
      },
      value: {
        title: 'Value',
        statement: 'Creating spaces that hold lasting value.',
        support: 'Developments designed with balance, permanence and long-term relevance in mind.',
      },
    },

    /* ── Closing CTA ────────────────────────────────────────────────── */
    closingCTA: {
      // statementLines maps to closingCTA.statement array (3 lines)
      statementLines: ['The Next', 'Opportunity', 'Starts Here.'],
    },

    /* ── Enquiry ─────────────────────────────────────────────────────── */
    enquiry: {
      eyebrow: 'Enquiry',
      headlineLines: ["Let's Start", 'A Conversation.'],

      // Project & Contact
      projectContextLabel: 'Project',
      primaryContactLabel: 'Primary Contact',
      callNow: 'Call Now',
      additionalContactsLabel: 'Additional Contacts',

      // Field labels
      labelName: 'Name *',
      labelPhone: 'Phone *',
      labelEmail: 'Email *',
      labelInterest: 'Interest',
      labelMessage: 'Message',

      // Placeholders
      placeholderName: 'Your name',
      placeholderPhone: 'Your phone number',
      placeholderEmail: 'Your email address',
      placeholderInterestDefault: 'Select an interest',
      placeholderMessage: 'Tell us about your enquiry',

      // Interest option display labels (value= attrs stay as English in siteData)
      interestGeneral: 'General Enquiry',
      interestResidential: 'Residential Project',
      interestCommercial: 'Commercial Project',
      interestInvestment: 'Investment Opportunity',
      interestPartnership: 'Partnership',
      interestOther: 'Other',

      // Submit button
      submitIdle: 'Send Enquiry →',
      submitSending: 'Sending...',

      // Success state
      successHeading: 'Thank you.',
      successBody: 'We have received your enquiry and our team will be in touch with you shortly.',
      successReset: 'Send another message →',

      // Validation errors
      validationNameRequired: 'Name is required',
      validationPhoneRequired: 'Phone is required',
      validationEmailRequired: 'Email is required',
      validationEmailInvalid: 'Please enter a valid email address',

      // Global / submission errors
      errorNotConfigured: 'The enquiry form is not configured yet. Please contact the website administrator.',
      errorGeneric: 'Something went wrong. Please try again later.',
      errorNetwork: 'A network error occurred. Please check your connection and try again.',
    },

    /* ── Footer ─────────────────────────────────────────────────────── */
    footer: {
      // Section column headings
      columnLocation: 'Location',
      columnContact: 'Contact',
      columnSocial: 'Social',

      // Bottom bar — copyright uses siteData footer.copyright which has brand name
      // Translate only the Back to Top button label
      backToTop: 'Back to Top',

      // Fallback text when contact data is empty
      addressFallback: 'Address to be updated',
      emailFallback: 'Email to be updated',
      phoneFallback: 'Phone to be updated',
    },
  },

  /* ════════════════════════════════════════════════════════════════════ */

  hi: {
    /* ── Common ────────────────────────────────────────────────────── */
    common: {
      language: 'भाषा',
      english: 'अंग्रेज़ी',
      hindi: 'हिंदी',
    },

    /* ── Navigation ─────────────────────────────────────────────────── */
    navigation: {
      home: 'होम',
      projects: 'परियोजनाएं',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      explore: 'देखें',
      close: 'बंद करें',
    },

    /* ── Hero ───────────────────────────────────────────────────────── */
    hero: {
      headlineLines: ['मूल्य निर्माण।', 'कल को आकार देना।'],
      label: 'रियल एस्टेट निवेश एवं विकास',
      scrollIndicator: 'स्क्रॉल करें',
      transition: {
        line1: 'उद्देश्यपूर्ण स्थान।',
        line2: 'स्थायी मूल्य।',
      },
    },

    /* ── Introduction ───────────────────────────────────────────────── */
    introduction: {
      eyebrow: 'परिचय',
      headline: 'स्थान से परे देखें।',

      stagePlanning: 'योजना',
      stageDeveloped: 'विकसित',

      planningScaleValue: 'मूल्य',
      planningScalePotential: 'संभावना',
      planningScaleOpportunity: 'अवसर',
      planningNote: 'संकेतक विश्लेषण — योजना चरण',

      developedScaleValue: 'निर्मित मूल्य',
      developedScaleDevelopment: 'विकास',
      developedScaleMarket: 'बाज़ार उपस्थिति',
      developedNote: 'संकेतक विश्लेषण — विकसित चरण',
    },

    /* ── Vision ─────────────────────────────────────────────────────── */
    vision: {
      eyebrow: 'दृष्टि एवं उद्देश्य',
      headlineLines: ['विश्वास पर निर्मित।', 'दृष्टि से प्रेरित।'],
      description:
        'श्री राधिका डेवलपर्स की स्थापना इस सिद्धांत पर हुई कि रियल एस्टेट को स्थायी मूल्य बनाना चाहिए — निवेशकों के लिए, समुदायों के लिए और भविष्य के लिए। हम ऐसे विकास के प्रति प्रतिबद्ध हैं जो विकास और गुणवत्ता के बीच संतुलन बनाए।',
      imageFallback: 'दृष्टि चित्र',
    },

    /* ── Portfolio Impact ───────────────────────────────────────────── */
    portfolioImpact: {
      eyebrow: 'पोर्टफोलियो प्रभाव',
      yearsOfExperience: 'वर्षों का अनुभव',
      developments: 'विकास परियोजनाएं',
      acresDeveloped: 'एकड़ विकसित',
      locations: 'स्थान',
    },

    /* ── Partners ───────────────────────────────────────────────────── */
    partners: {
      eyebrow: 'नेतृत्व एवं भागीदार',
      headline: 'दृष्टि, समर्पण और विश्वास की नींव।',
      qualitiesHeading: 'प्रमुख नेतृत्व गुण',
      previous: '← पिछला',
      next: 'अगला →',

      p01: {
        name: 'श्री आशुतोष गुप्ता',
        shortName: 'आशुतोष गुप्ता',
        role: 'निदेशक',
        designation: 'निदेशक',
        experience: 'रियल एस्टेट एवं निर्माण में 25+ वर्षों का अनुभव।',
        description:
          'श्री आशुतोष गुप्ता श्री राधिका डेवलपर्स के मुख्य प्रेरक स्तंभ हैं। एक सह-संस्थापक और भागीदार के रूप में, वे प्रत्येक परियोजना में दृष्टि, समर्पण और सक्रिय नेतृत्व लाते हैं।\n\nगुणवत्ता, सत्यनिष्ठा और ग्राहक संतुष्टि पर गहन ध्यान देने के साथ, वे सुनिश्चित करते हैं कि हमारे द्वारा निर्मित प्रत्येक स्थान प्रेरणादायी हो और समय की कसौटी पर खरा उतरे।',
        qualities: [
          {
            title: 'सक्रिय व्यक्तिगत सहभागिता',
            description: 'सर्वश्रेष्ठ परिणाम सुनिश्चित करने के लिए हर चरण में सक्रिय रूप से जुड़े रहते हैं।',
          },
          {
            title: 'गुणवत्ता एवं सत्यनिष्ठा',
            description: 'उच्च मानकों और निष्पक्ष कार्यप्रणाली के माध्यम से उत्कृष्टता प्रदान करना।',
          },
          {
            title: 'संबंधों के प्रति प्रतिबद्धता',
            description: 'विश्वास पर आधारित दीर्घकालिक संबंधों के निर्माण में विश्वास रखते हैं।',
          },
        ],
      },
      p02: {
        name: 'श्री नितीश गोयल',
        shortName: 'नितीश गोयल',
        role: 'चेयरपर्सन',
        designation: 'चेयरपर्सन',
        experience: 'रियल एस्टेट एवं निर्माण में 5+ वर्षों का अनुभव।',
        description:
          'श्री नितीश गोयल श्री राधिका डेवलपर्स को नई ऊंचाइयों की ओर ले जाने में महत्वपूर्ण भूमिका निभाते हैं। अपने समर्पण, दूरदृष्टि और गतिशील दृष्टिकोण के साथ, वे ऐसे स्थानों के निर्माण में योगदान देते हैं जो हमारे ग्राहकों के लिए दीर्घकालिक मूल्य का निर्माण करते हैं।',
        qualities: [
          {
            title: 'ग्राहक-केंद्रित दृष्टिकोण',
            description: 'प्रत्येक ग्राहक के लिए सर्वोत्तम मूल्य प्रदान करने पर केंद्रित।',
          },
          {
            title: 'विकास एवं नवाचार',
            description: 'प्रत्येक नए विकास में नए विचार और ऊर्जा का समावेश करते हैं।',
          },
          {
            title: 'प्रतिबद्धता एवं सत्यनिष्ठा',
            description: 'विश्वास और स्थायी संबंधों के निर्माण में विश्वास रखते हैं।',
          },
        ],
      },
    },

    /* ── Projects ───────────────────────────────────────────────────── */
    projects: {
      // Section UI
      eyebrow: 'पोर्टफोलियो',
      heading: 'चयनित',
      headingAccent: 'परियोजनाएं।',

      // Status labels
      statusCompleted: 'पूर्ण',
      statusOngoing: 'जारी',
      statusUpcoming: 'आगामी',

      // Media navigator tab labels
      mediaOverview: 'अवलोकन',
      mediaGallery: 'गैलरी',
      mediaFilm: 'वीडियो',
      mediaLocation: 'स्थान',

      // Placeholder / UI strings
      projectMediaLabel: 'प्रोजेक्ट मीडिया',
      exploreLabel: 'देखें →',
      galleryPrev: 'पिछला',
      galleryNext: 'अगला',
      filmLabel: 'प्रोजेक्ट फ़िल्म',
      filmComingSoon: 'जल्द आएगा',
      locationLabel: 'स्थान',
      locationMap: 'स्थान मानचित्र',
      locationOpenMaps: 'मानचित्र में देखें',
      locationComingSoon: 'मानचित्र एकीकरण शीघ्र उपलब्ध होगा।',
      factsLabel: 'तथ्य',
      featuresLabel: 'विशेषताएं',
      developedBy: 'द्वारा विकसित',
      enquireCta: 'परियोजना के बारे में पूछताछ करें',

      // Video player controls
      videoPlay: 'चलाएं',
      videoPause: 'रोकें',
      videoMute: 'म्यूट करें',
      videoUnmute: 'अनम्यूट करें',
      videoVolume: 'आवाज़',
      videoSpeed: 'गति',
      videoFullscreen: 'फुलस्क्रीन',
      videoExitFullscreen: 'फुलस्क्रीन से बाहर निकलें',
      videoPip: 'पिक्चर-इन-पिक्चर',
      videoUnavailable: 'वीडियो अनुपलब्ध है',
      videoLoading: 'वीडियो लोड हो रहा है...',

      // Per-project translatable content — keyed by project id (p01–p05)
      // Structural fields (id, facts, media, contact, etc.) stay in siteData.js
      p01: {
        name: 'राघवपुरम',
        category: 'आवासीय कॉलोनी',
        location: 'शुगर मिल बाईपास, रणखण्डी पुलिस चौकी के सामने, निकट रूप गार्डन, देवबन्द',
        locality: 'देवबंद',
        region: 'सहारनपुर, उत्तर प्रदेश',
        status: 'बुकिंग खुली है',
        description:
          'देवबन्द विनियमित क्षेत्र द्वारा लेआउट स्वीकृत आवासीय कॉलोनी',
        brand: '',
        developer: '',
        tagline: 'देवबन्द विनियमित क्षेत्र द्वारा लेआउट स्वीकृत आवासीय कॉलोनी',
        promotionalLine: '',
        bookingMessage: '',
        facts: {
          plotsValue: '67',
          plotsLabel: 'आवासीय प्लॉट्स',
          roadsValue: '30 फीट',
          roadsLabel: 'सड़कें',
        },
        features: [
          'बाउण्ड्री वॉल द्वारा कवर्ड गेटेड कॉलोनी',
          'चौड़ी सड़कें एवं नाली द्वारा जल निकासी',
          'हरा-भरा सुंदर वातावरण',
          'रेलवे स्टेशन से मात्र 5 मिनट की दूरी',
          'लाइट पोल की सुविधा उपलब्ध',
        ],
      },
      p02: {
        name: 'सिटी कॉम्प्लेक्स',
        category: 'व्यावसायिक कॉम्प्लेक्स',
        location: 'देवबंद, सहारनपुर',
        locality: 'देवबंद',
        region: 'सहारनपुर, उत्तर प्रदेश',
        status: 'जारी',
        description:
          'आधुनिक व्यापारिक बुनियादी ढांचे, पर्याप्त पार्किंग और रणनीतिक बाजार स्थिति वाला एक प्रमुख व्यावसायिक परिसर।',
        brand: 'एसआरडी — व्यावसायिक',
        developer: 'श्री राधिका डेवलपर्स',
        tagline: 'बाजार के केंद्र में आधुनिक व्यावसायिक बुनियादी ढांचा।',
        promotionalLine:
          'उच्च दैनिक आवागमन और स्थायी व्यावसायिक मूल्य के लिए रणनीतिक रूप से स्थित व्यावसायिक स्थल।',
        bookingMessage: '',
        facts: {
          plotsValue: '800-1000',
          plotsLabel: 'दैनिक फुटफॉल',
          roadsValue: 'चौड़ी सड़कें',
          roadsLabel: 'सुगम मार्ग',
        },
        features: [
          'प्रमुख व्यावसायिक स्थान',
          'चौड़ी एवं सुनियोजित सड़कें',
          'पर्याप्त पार्किंग स्थान',
          'ट्रिपल एस सुरक्षा प्रणाली',
          '800–1000 दैनिक फुटफॉल',
        ],
      },
      p03: {
        name: 'वृंदावन विहार',
        category: 'आवासीय गेटेड कॉलोनी',
        location: 'निकट सरकारी अस्पताल, देवबंद',
        locality: 'देवबंद',
        region: 'सहारनपुर, उत्तर प्रदेश',
        status: 'बुकिंग खुली है',
        description:
          'समर्पित पार्कों और आधुनिक सुविधाओं के साथ सुरक्षित और स्वस्थ सामुदायिक जीवन के लिए डिज़ाइन की गई स्वीकृत गेटेड आवासीय कॉलोनी।',
        brand: 'एसआरडी — आवासीय',
        developer: 'श्री राधिका डेवलपर्स',
        tagline: 'आधुनिक सामुदायिक सुविधाओं के साथ सुनियोजित आवासीय जीवन।',
        promotionalLine:
          'समर्पित ओपन जिम, सुंदर पार्क और सीधे हाईवे कनेक्टिविटी वाली पूर्णतः गेटेड आवासीय कॉलोनी।',
        bookingMessage: '',
        facts: {
          plotsValue: 'स्वीकृत',
          plotsLabel: 'लेआउट प्लान',
          roadsValue: '2-3 किमी',
          roadsLabel: 'हाईवे कनेक्टिविटी',
        },
        features: [
          'स्वीकृत लेआउट प्लान',
          'पूर्णतः गेटेड कॉलोनी',
          'ट्रिपल एस सुरक्षा प्रणाली',
          'प्रमुख स्थान — सरकारी अस्पताल के निकट',
          'उत्कृष्ट कनेक्टिविटी — सहारनपुर-नकूड़-कुरुक्षेत्र हाईवे से मात्र 2–3 किमी',
          'समर्पित पार्क एवं ओपन जिम की सुविधा',
        ],
      },
      p04: {
        name: 'सुविधा प्लाज़ा',
        category: 'व्यावसायिक कॉम्प्लेक्स',
        location: 'देवबंद, सहारनपुर',
        locality: 'देवबंद',
        region: 'सहारनपुर, उत्तर प्रदेश',
        status: 'जारी',
        description:
          '57 प्रीमियम दुकानों, चौड़े रास्तों और समर्पित ग्राहक पार्किंग के साथ रणनीतिक रूप से नियोजित व्यावसायिक प्लाज़ा।',
        brand: 'एसआरडी — व्यावसायिक',
        developer: 'श्री राधिका डेवलपर्स',
        tagline: 'स्वीकृत लेआउट और समर्पित पार्किंग के साथ 57 प्रीमियम व्यावसायिक दुकानें।',
        promotionalLine:
          'उच्च दृश्यता, चौड़ी सड़कों और फलते-फूलते खुदरा व्यापार के लिए तैयार प्रमुख व्यावसायिक स्थान।',
        bookingMessage: '',
        facts: {
          plotsValue: '57',
          plotsLabel: 'व्यावसायिक दुकानें',
          roadsValue: '30 व 25 फीट',
          roadsLabel: 'चौड़ी सड़कें',
        },
        features: [
          'प्रमुख व्यावसायिक स्थान',
          'स्वीकृत लेआउट प्लान',
          'चौड़ी 30 फीट एवं 25 फीट सड़कें',
          'समर्पित पार्किंग स्थान',
          '57 प्रीमियम व्यावसायिक दुकानें',
        ],
      },
      p05: {
        name: 'सिग्नेचर टॉवर',
        category: 'व्यावसायिक कॉम्प्लेक्स',
        location: 'हनुमान चौक, देवबंद',
        locality: 'देवबंद',
        region: 'सहारनपुर, उत्तर प्रदेश',
        status: 'जारी',
        description:
          'हनुमान चौक पर स्थित एक प्रमुख व्यावसायिक केंद्र, जहां अत्यधिक ग्राहक आवागमन और समर्पित मोबाइल व इलेक्ट्रॉनिक्स मार्केट है।',
        brand: 'एसआरडी — व्यावसायिक',
        developer: 'श्री राधिका डेवलपर्स',
        tagline: 'हनुमान चौक पर अत्यधिक आवागमन वाला प्रमुख व्यावसायिक केंद्र।',
        promotionalLine:
          'देवबंद के प्रमुख बाजार केंद्र हनुमान चौक पर समर्पित इलेक्ट्रॉनिक्स मार्केट वाला प्रतिष्ठित व्यावसायिक विकास।',
        bookingMessage: '',
        facts: {
          plotsValue: 'प्रमुख केंद्र',
          plotsLabel: 'हनुमान चौक',
          roadsValue: 'अत्यधिक',
          roadsLabel: 'ग्राहक आवागमन',
        },
        features: [
          'प्रमुख व्यावसायिक स्थान — हनुमान चौक, देवबंद',
          'समर्पित मोबाइल एवं इलेक्ट्रॉनिक्स मार्केट',
          'अत्यधिक ग्राहक आवागमन',
          'उत्कृष्ट बाज़ार कनेक्टिविटी',
          'प्रीमियम व्यावसायिक दुकानें',
        ],
      },
    },

    /* ── Philosophy ─────────────────────────────────────────────────── */
    philosophy: {
      // Section-level
      eyebrow: 'हमारी विचारधारा',
      intro: 'जहाँ संभावना आरंभ होती है।',

      // Per-stage — keyed by the stable stage.id values (location, vision, development, value)
      location: {
        title: 'स्थान',
        statement: 'हर विकास एक स्थान को समझने से शुरू होता है।',
        support: 'किसी स्थान की प्रकृति, संभावना और दीर्घकालिक अवसर को पहचानना।',
      },
      vision: {
        title: 'दृष्टि',
        statement: 'संभावना को स्पष्ट होने से पहले देखना।',
        support: 'आज जो है उससे परे — यह देखना कि कोई स्थान क्या बन सकता है।',
      },
      development: {
        title: 'विकास',
        statement: 'संभावना को वास्तविकता में बदलना।',
        support: 'दृष्टि को सटीकता, उद्देश्य और क्रियान्वयन के माध्यम से भौतिक रूप देना।',
      },
      value: {
        title: 'मूल्य',
        statement: 'ऐसे स्थान बनाना जो स्थायी मूल्य रखें।',
        support: 'संतुलन, स्थायित्व और दीर्घकालिक प्रासंगिकता को ध्यान में रखकर बनाए गए विकास।',
      },
    },

    /* ── Closing CTA ────────────────────────────────────────────────── */
    closingCTA: {
      statementLines: ['अगला', 'अवसर', 'यहाँ से शुरू होता है।'],
    },

    /* ── Enquiry ─────────────────────────────────────────────────────── */
    enquiry: {
      eyebrow: 'पूछताछ',
      headlineLines: ['एक बातचीत', 'शुरू करें।'],

      // Project & Contact
      projectContextLabel: 'परियोजना',
      primaryContactLabel: 'प्राथमिक संपर्क',
      callNow: 'अभी कॉल करें',
      additionalContactsLabel: 'अन्य संपर्क',

      // Field labels
      labelName: 'नाम *',
      labelPhone: 'फ़ोन *',
      labelEmail: 'ईमेल *',
      labelInterest: 'रुचि',
      labelMessage: 'संदेश',

      // Placeholders
      placeholderName: 'आपका नाम',
      placeholderPhone: 'आपका फ़ोन नंबर',
      placeholderEmail: 'आपका ईमेल पता',
      placeholderInterestDefault: 'रुचि चुनें',
      placeholderMessage: 'अपनी पूछताछ के बारे में बताएं',

      // Interest option display labels — value= attrs always remain English (from siteData)
      interestGeneral: 'सामान्य पूछताछ',
      interestResidential: 'आवासीय परियोजना',
      interestCommercial: 'व्यावसायिक परियोजना',
      interestInvestment: 'निवेश अवसर',
      interestPartnership: 'साझेदारी',
      interestOther: 'अन्य',

      // Submit button
      submitIdle: 'पूछताछ भेजें →',
      submitSending: 'भेजा जा रहा है...',

      // Success state
      successHeading: 'धन्यवाद।',
      successBody: 'हमें आपकी पूछताछ प्राप्त हो गई है और हमारी टीम शीघ्र ही आपसे संपर्क करेगी।',
      successReset: 'एक और संदेश भेजें →',

      // Validation errors
      validationNameRequired: 'नाम आवश्यक है',
      validationPhoneRequired: 'फ़ोन आवश्यक है',
      validationEmailRequired: 'ईमेल आवश्यक है',
      validationEmailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें',

      // Global / submission errors
      errorNotConfigured: 'पूछताछ फ़ॉर्म अभी कॉन्फ़िगर नहीं किया गया है। कृपया वेबसाइट व्यवस्थापक से संपर्क करें।',
      errorGeneric: 'कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।',
      errorNetwork: 'नेटवर्क त्रुटि हुई। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें।',
    },

    /* ── Footer ─────────────────────────────────────────────────────── */
    footer: {
      // Section column headings
      columnLocation: 'स्थान',
      columnContact: 'संपर्क',
      columnSocial: 'सोशल',

      // Back to Top button
      backToTop: 'शीर्ष पर जाएं',

      // Fallback text when contact data is empty
      addressFallback: 'पता अपडेट किया जाएगा',
      emailFallback: 'ईमेल अपडेट किया जाएगा',
      phoneFallback: 'फ़ोन अपडेट किया जाएगा',
    },
  },
}

export default translations
