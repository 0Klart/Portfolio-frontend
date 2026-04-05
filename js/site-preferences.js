(function initializePortfolioPreferences() {
  const STORAGE_KEYS = {
    theme: 'portfolio-theme',
    locale: 'portfolio-locale',
  };

  const THEMES = {
    midnight: {
      bsTheme: 'dark',
      themeColor: '#181e2c',
    },
    linen: {
      bsTheme: 'light',
      themeColor: '#f3ede2',
    },
  };

  const LOCALES = ['en', 'sv'];

  const translations = {
    en: {},
    sv: {},
  };

  Object.assign(translations.en, {
    meta: {
      title: 'Sebastian Wallden - Full-Stack Developer',
      description:
        'Sebastian Wallden is a full-stack developer and IT consultant based in Orebro, Sweden, with public experience across CGI, Transportstyrelsen, Consid, and Infozone using .NET, SQL, Azure, Blazor, and JavaScript.',
    },
    common: {
      skipToContent: 'Skip to main content',
    },
    settings: {
      groupLabel: 'Display preferences',
      theme: {
        light: 'Light',
        dark: 'Dark',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      language: {
        groupLabel: 'Language selection',
      },
    },
    topbar: {
      complementaryLabel: 'Profile links',
      socialNavLabel: 'Social links',
      status: 'Currently building business systems at CGI. Contact welcome.',
      github: 'GitHub',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    nav: {
      mainLabel: 'Main navigation',
      toggleLabel: 'Toggle navigation',
      about: 'About',
      skills: 'Skills',
      background: 'Background',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      statusUnavailable: 'Not available for work',
      eyebrow: 'Web Developer at CGI',
      bio: 'Full-stack developer and IT consultant based in Orebro, Sweden. Building client-facing and internal business systems with <strong>C# .NET</strong>, <strong>JavaScript</strong>, <strong>SQL</strong>, <strong>Blazor</strong>, and <strong>Azure</strong>.',
      ctaProjects: 'View Projects',
      ctaContact: 'Get In Touch',
    },
    recruiter: {
      label: 'Recruiter Snapshot',
      heading: 'A quick overview for recruiters and hiring managers.',
      intro:
        'Full-stack developer with consulting and public-sector delivery experience across business systems, modernization, and client-facing web platforms.',
      ctaCv: 'Request CV',
      ctaWork: 'View Featured Work',
      note: 'CV is shared privately after contact and a relevant conversation.',
      gridLabel: 'Recruiter quick facts',
      cards: {
        current: {
          label: 'Current Role',
          value: 'Web Developer at CGI',
        },
        location: {
          label: 'Base',
          value: 'Orebro, Sweden',
        },
        delivery: {
          label: 'Work Style',
          value: 'Hybrid delivery and remote collaboration',
        },
        stack: {
          label: 'Core Stack',
          value: 'C# .NET, SQL, JavaScript, Blazor, Azure',
        },
        focus: {
          label: 'Strengths',
          value: 'Business systems, modernization, public-sector delivery',
        },
        certifications: {
          label: 'Certifications',
          value: 'Two Optimizely certifications valid through March 2028',
        },
      },
    },
    about: {
      label: 'About Me',
      heading:
        'I build business-focused web platforms across consulting, public sector delivery, and modern .NET ecosystems.',
      bodyOne:
        'My public profile shows current work as a <strong>Web Developer at CGI</strong>, following consulting and system development roles at <strong>Transportstyrelsen</strong>, <strong>Consid</strong>, and <strong>Infozone Sverige</strong>. The common thread has been delivery-focused web and business systems built with .NET, SQL, JavaScript, Blazor, Azure, and modern engineering practices.',
      bodyTwo:
        'My experience includes decision support systems for taxes and fees, internal intranets, archive modernization, CI/CD delivery, and Optimizely certification. I currently work at CGI and am not looking to change roles right now, but I am always happy to connect about consulting, engineering, and collaboration in Orebro or remotely.',
      info: {
        locationLabel: 'Location',
        locationValue: 'Orebro, Sweden',
        currentLabel: 'Current',
        currentValue: 'Web Developer at CGI',
        statusLabel: 'Status',
        statusValue: 'Currently at CGI, open to contact',
        educationLabel: 'Education',
        educationValue: 'B.Sc. Computer Science, Orebro University',
      },
      servicesTitle: 'Services',
      certificationsTitle: 'Certifications',
      services: {
        consulting: 'IT consulting',
        databases: 'Database development',
        software: 'Custom software',
        cloud: 'Cloud applications',
        web: 'Web development',
        design: 'Web design',
        apps: 'App development',
      },
      certifications: {
        opal: 'Optimizely Certified Opal Tools Developer, valid through March 2028',
        paas: 'Optimizely PaaS CMS Certified Developer 2025, valid through March 2028',
      },
    },
    skills: {
      label: 'Skills &amp; Technologies',
      headingHidden: 'Skills and Technologies',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        cloud: 'Cloud',
        tools: 'Tools',
        services: 'Services',
      },
      items: {
        tdd: 'Test-driven development',
        webDesign: 'Web design',
        responsiveDesign: 'Responsive Design',
        itConsulting: 'IT consulting',
        databaseDevelopment: 'Database development',
        customSoftware: 'Custom software',
        cloudApplications: 'Cloud application development',
        webDevelopment: 'Web development',
        appDevelopment: 'App development',
      },
    },
    experience: {
      label: 'Background',
      heading: 'Roles, consulting assignments, and certifications.',
      sidePanelLabel: 'Selected consulting projects',
      sidePanelTitle: 'Selected Consulting Projects',
      items: {
        cgi: {
          title: 'Web Developer',
          date: 'Oct 2025 - Present',
          bullet1: 'Current public experience entry lists CGI as a hybrid web development role in Stockholm County, Sweden.',
          bullet2: 'Public role description highlights web development for e-commerce, extranets, and intranet clients.',
          bullet3: 'The visible profile positioning aligns with .NET-based solution development and client-facing web delivery.',
        },
        transportstyrelsenEmployee: {
          title: 'System Developer',
          date: 'Jan 2024 - Sep 2025',
          bullet1: 'Hybrid role in Orebro focused on continued system development within the Swedish Transport Agency environment.',
          bullet2: 'Public project details connect this work to decision systems for taxes and fees.',
          bullet3: 'Publicly listed stack and methods include .NET, SQL, Blazor, test-driven development, and Scrum.',
        },
        transportstyrelsenConsultant: {
          title: 'IT Consultant',
          date: 'Sep 2022 - Jan 2024',
          bullet1: 'On-site consultant assignment delivered through Consid in Orebro.',
          bullet2: 'Developed and managed systems in the decision systems area for taxes and fees.',
          bullet3: 'Public skills attached to the assignment include .NET, SQL, Blazor, test-driven development, and Scrum.',
        },
        consid: {
          title: 'IT Consultant',
          date: 'Aug 2022 - Jan 2024',
          bullet1: 'Consultant role in Orebro supporting public-sector delivery on-site.',
          bullet2: 'Public experience overlaps with the Transportstyrelsen assignment shown on the profile.',
          bullet3: 'Positioning centers on full-stack delivery, database-heavy systems, and client-facing consulting work.',
        },
        infozone: {
          title: 'System Developer',
          date: 'Mar 2020 - Aug 2022',
          bullet1: 'Hybrid system development role in Orebro with public client work spanning archive systems and internal intranets.',
          bullet2: 'Public project descriptions mention modernization into newer .NET, CI/CD pipelines, and maintenance across multiple systems.',
          bullet3: 'Associated public client names include Fortifikationsverket, Carnegie Investment Bank, and SJ AB.',
        },
        xxl: {
          title: 'Warehouse Assistant',
          date: 'Feb 2018 - Jan 2020',
          bullet1: 'Part-time warehouse role listed publicly before the consulting and system development track.',
        },
        education: {
          title: 'Bachelor of Science in Computer Science',
          date: 'Aug 2016 - Feb 2020',
          bullet1: 'Program focus shown publicly includes computer science, system development, and web development.',
        },
        certifications: {
          title: 'Licenses &amp; Certifications',
          date: 'Issued Mar 2026',
          bullet1: 'Optimizely Certified Opal Tools Developer, valid through March 2028.',
          bullet2: 'Optimizely PaaS CMS Certified Developer 2025, valid through March 2028.',
        },
      },
      notes: {
        transportstyrelsenMeta: 'Sep 2022 - Jan 2024 via Consid',
        transportstyrelsenText:
          'Developed and managed systems within the decision systems product area for taxes and fees.',
        fortifikationsverketMeta: 'Mar 2020 - Aug 2022 via Infozone Sverige',
        fortifikationsverketText:
          'Managed and further developed an archive system, upgraded multiple systems to more modern .NET, and built CI/CD pipelines.',
        carnegieMeta: 'Feb 2020 - Jan 2022 via Infozone Sverige',
        carnegieText: "Managed one of Carnegie's internal intranets.",
        sjMeta: 'Feb 2020 - Jan 2022 via Infozone Sverige',
        sjText: "Managed one of SJ's internal intranets.",
      },
    },
    projects: {
      label: 'Public Projects',
      heading: 'Live from GitHub',
      intro: 'Public repositories pulled directly from GitHub. Original work is shown first, with forks clearly labeled.',
      loading: 'Loading public repositories...',
      viewAll: 'View all on GitHub',
      repoListLabel: 'GitHub repositories',
      repo: {
        original: 'Original',
        fork: 'Fork',
        viewRepo: 'View repo',
        liveSite: 'Live site',
        defaultDescription: 'Project details are maintained directly on GitHub.',
        mixedStack: 'Mixed stack',
      },
      recentlyUpdated: 'Recently updated',
      updatedOn: 'Updated {date}',
      noRepos: 'No public repositories found right now.',
      noReposSummary: 'No public repositories were returned from GitHub.',
      summaryCount: 'Showing {count} public repositories from GitHub{cachedSuffix}.',
      summaryCachedSuffix: ' (cached)',
      unavailable:
        'Could not load GitHub projects. <a href="https://github.com/0Klart?tab=repositories" target="_blank" rel="noopener noreferrer">View the full profile instead.</a>',
      unavailableSummary: 'GitHub is unavailable right now, but the full profile link is still available.',
    },
    contact: {
      label: 'Get In Touch',
      heading: "Let's<br />connect.",
      intro:
        'I currently work at CGI and am not looking to change roles right now, but you are very welcome to reach out through the form below or connect through LinkedIn and GitHub. This site keeps the direct contact path public without exposing private documents.',
      linkedInProfile: 'LinkedIn profile',
      githubProfile: 'GitHub profile',
      location: 'Orebro, Sweden',
      formLabel: 'Contact form',
      honeypotLabel: 'Website',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'What is this about?',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project, collaboration, or question...',
        submit: 'Send Message',
        sending: 'Sending...',
        errors: {
          name: 'Please enter your name.',
          emailValid: 'Please enter a valid email address.',
          subject: 'Please add a subject (at least 2 characters).',
          message: 'Please write a message (at least 10 characters).',
        },
        status: {
          success: 'Message sent. Thanks for reaching out.',
          corsError:
            'The browser blocked the request before it reached the contact service. This is usually a cross-origin (CORS) configuration issue between this site and the API.',
          networkError:
            'The contact service could not be reached right now. Please try again later or reach out on LinkedIn.',
          rateLimited:
            'Too many messages were sent from this address recently. Please try again later or reach out on LinkedIn.',
          serverError: 'The contact service could not send your message right now. Please try again later or reach out on LinkedIn.',
          requestFailed: 'Request failed ({status}). Please try again later or reach out on LinkedIn.',
          generic: 'Something went wrong. Please try again later or reach out on LinkedIn.',
        },
      },
    },
    footer: {
      builtWith: 'Built with HTML, CSS, JavaScript, ASP.NET Core, Azure, and GitHub Pages',
    },
  });

  Object.assign(translations.sv, {
    meta: {
      title: 'Sebastian Wallden - Fullstackutvecklare',
      description:
        'Sebastian Wallden är en fullstackutvecklare och IT-konsult i Örebro med offentlig erfarenhet från CGI, Transportstyrelsen, Consid och Infozone inom .NET, SQL, Azure, Blazor och JavaScript.',
    },
    common: {
      skipToContent: 'Hoppa till huvudinnehållet',
    },
    settings: {
      groupLabel: 'Visningsinställningar',
      theme: {
        light: 'Ljust',
        dark: 'Mörkt',
        switchToLight: 'Byt till ljust tema',
        switchToDark: 'Byt till mörkt tema',
      },
      language: {
        groupLabel: 'Språkval',
      },
    },
    topbar: {
      complementaryLabel: 'Profilänkar',
      socialNavLabel: 'Sociala länkar',
      status: 'Bygger just nu affärssystem på CGI. Du är välkommen att höra av dig.',
      github: 'GitHub',
      email: 'E-post',
      linkedin: 'LinkedIn',
    },
    nav: {
      mainLabel: 'Huvudnavigering',
      toggleLabel: 'Växla navigering',
      about: 'Om mig',
      skills: 'Kompetens',
      background: 'Bakgrund',
      projects: 'Projekt',
      contact: 'Kontakt',
    },
    hero: {
      statusUnavailable: 'Inte tillgänglig för nya uppdrag',
      eyebrow: 'Webbutvecklare på CGI',
      bio: 'Fullstackutvecklare och IT-konsult i Örebro. Bygger kundnära och interna verksamhetssystem med <strong>C# .NET</strong>, <strong>JavaScript</strong>, <strong>SQL</strong>, <strong>Blazor</strong> och <strong>Azure</strong>.',
      ctaProjects: 'Visa projekt',
      ctaContact: 'Kontakta mig',
    },
    recruiter: {
      label: 'Snabbfakta',
      heading: 'En snabb översikt för rekryterare och hiring managers.',
      intro:
        'Fullstackutvecklare med erfarenhet av konsultleverans och offentlig sektor inom verksamhetssystem, modernisering och kundnära webbplattformar.',
      ctaCv: 'Kontakta för CV',
      ctaWork: 'Se utvalt arbete',
      note: 'CV delas privat efter kontakt och en relevant dialog.',
      gridLabel: 'Snabbfakta för rekryterare',
      cards: {
        current: {
          label: 'Nuvarande roll',
          value: 'Webbutvecklare på CGI',
        },
        location: {
          label: 'Bas',
          value: 'Örebro, Sverige',
        },
        delivery: {
          label: 'Arbetssätt',
          value: 'Hybrid leverans och samarbete på distans',
        },
        stack: {
          label: 'Kärnstack',
          value: 'C# .NET, SQL, JavaScript, Blazor, Azure',
        },
        focus: {
          label: 'Styrkor',
          value: 'Verksamhetssystem, modernisering och offentlig leverans',
        },
        certifications: {
          label: 'Certifieringar',
          value: 'Två Optimizely-certifieringar giltiga till mars 2028',
        },
      },
    },
    about: {
      label: 'Om mig',
      heading: 'Jag bygger verksamhetsnära webbplattformar inom konsultuppdrag, offentlig leverans och moderna .NET-ekosystem.',
      bodyOne:
        'Min offentliga profil visar att jag idag arbetar som <strong>Webbutvecklare på CGI</strong>, efter konsult- och systemutvecklarroller på <strong>Transportstyrelsen</strong>, <strong>Consid</strong> och <strong>Infozone Sverige</strong>. Den röda tråden har varit leveransfokuserade webb- och verksamhetssystem byggda med .NET, SQL, JavaScript, Blazor, Azure och moderna utvecklingsmetoder.',
      bodyTwo:
        'Min erfarenhet omfattar beslutssystem för skatter och avgifter, interna intranät, modernisering av arkivlösningar, CI/CD-leveranser och Optimizely-certifiering. Jag arbetar idag på CGI och letar inte aktivt efter en ny roll, men jag tar gärna kontakt kring konsulting, utveckling och samarbete i Örebro eller på distans.',
      info: {
        locationLabel: 'Plats',
        locationValue: 'Örebro, Sverige',
        currentLabel: 'Nuvarande roll',
        currentValue: 'Webbutvecklare på CGI',
        statusLabel: 'Status',
        statusValue: 'Arbetar på CGI, öppen för kontakt',
        educationLabel: 'Utbildning',
        educationValue: 'Kandidatexamen i datavetenskap, Örebro universitet',
      },
      servicesTitle: 'Tjänster',
      certificationsTitle: 'Certifieringar',
      services: {
        consulting: 'IT-konsulting',
        databases: 'Databasutveckling',
        software: 'Skräddarsydd programvara',
        cloud: 'Molnapplikationer',
        web: 'Webbutveckling',
        design: 'Webbdesign',
        apps: 'Apputveckling',
      },
      certifications: {
        opal: 'Optimizely Certified Opal Tools Developer, giltig till mars 2028',
        paas: 'Optimizely PaaS CMS Certified Developer 2025, giltig till mars 2028',
      },
    },
    skills: {
      label: 'Kompetens &amp; Teknik',
      headingHidden: 'Kompetens och teknik',
      groups: {
        backend: 'Backend',
        frontend: 'Frontend',
        cloud: 'Moln',
        tools: 'Verktyg',
        services: 'Tjänster',
      },
      items: {
        tdd: 'Testdriven utveckling',
        webDesign: 'Webbdesign',
        responsiveDesign: 'Responsiv design',
        itConsulting: 'IT-konsulting',
        databaseDevelopment: 'Databasutveckling',
        customSoftware: 'Skräddarsydd programvara',
        cloudApplications: 'Utveckling av molnapplikationer',
        webDevelopment: 'Webbutveckling',
        appDevelopment: 'Apputveckling',
      },
    },
    experience: {
      label: 'Bakgrund',
      heading: 'Roller, konsultuppdrag och certifieringar.',
      sidePanelLabel: 'Utvalda konsultprojekt',
      sidePanelTitle: 'Utvalda konsultprojekt',
      items: {
        cgi: {
          title: 'Webbutvecklare',
          date: 'Okt 2025 - Nuvarande',
          bullet1: 'Nuvarande offentliga erfarenhet visar CGI som en hybrid roll inom webbutveckling i Stockholms län.',
          bullet2: 'Den publika rollbeskrivningen lyfter webbutveckling för e-handel, extranät och intranät.',
          bullet3: 'Den synliga profileringen ligger nära .NET-baserad lösningsutveckling och kundnära webbleverans.',
        },
        transportstyrelsenEmployee: {
          title: 'Systemutvecklare',
          date: 'Jan 2024 - Sep 2025',
          bullet1: 'Hybrid roll i Örebro med fortsatt systemutveckling inom Transportstyrelsens miljö.',
          bullet2: 'Publika projektdetaljer kopplar arbetet till beslutssystem för skatter och avgifter.',
          bullet3: 'Publikt listad teknik och arbetssätt inkluderar .NET, SQL, Blazor, testdriven utveckling och Scrum.',
        },
        transportstyrelsenConsultant: {
          title: 'IT-konsult',
          date: 'Sep 2022 - Jan 2024',
          bullet1: 'Konsultuppdrag på plats i Örebro levererat genom Consid.',
          bullet2: 'Utvecklade och förvaltade system inom beslutssystemområdet för skatter och avgifter.',
          bullet3: 'Publikt kopplade kompetenser i uppdraget inkluderar .NET, SQL, Blazor, testdriven utveckling och Scrum.',
        },
        consid: {
          title: 'IT-konsult',
          date: 'Aug 2022 - Jan 2024',
          bullet1: 'Konsultroll i Örebro med stöd till offentlig leverans på plats hos kund.',
          bullet2: 'Den publika erfarenheten överlappar uppdraget på Transportstyrelsen som visas i profilen.',
          bullet3: 'Profileringen kretsar kring fullstackleverans, datatung systemutveckling och kundnära konsultarbete.',
        },
        infozone: {
          title: 'Systemutvecklare',
          date: 'Mar 2020 - Aug 2022',
          bullet1: 'Hybrid roll i Örebro med offentliga kunduppdrag inom arkivsystem och interna intranät.',
          bullet2: 'Publika projektbeskrivningar nämner modernisering till nyare .NET, CI/CD-pipelines och förvaltning av flera system.',
          bullet3: 'Publikt nämnda kunder inkluderar Fortifikationsverket, Carnegie Investment Bank och SJ AB.',
        },
        xxl: {
          title: 'Lagerassistent',
          date: 'Feb 2018 - Jan 2020',
          bullet1: 'Deltidsroll på lager som finns listad offentligt före spåret inom konsulting och systemutveckling.',
        },
        education: {
          title: 'Kandidatexamen i datavetenskap',
          date: 'Aug 2016 - Feb 2020',
          bullet1: 'Programmets publika inriktning omfattar datavetenskap, systemutveckling och webbutveckling.',
        },
        certifications: {
          title: 'Licenser &amp; certifieringar',
          date: 'Utfärdad mar 2026',
          bullet1: 'Optimizely Certified Opal Tools Developer, giltig till mars 2028.',
          bullet2: 'Optimizely PaaS CMS Certified Developer 2025, giltig till mars 2028.',
        },
      },
      notes: {
        transportstyrelsenMeta: 'Sep 2022 - Jan 2024 via Consid',
        transportstyrelsenText: 'Utvecklade och förvaltade system inom beslutssystemens produktområde för skatter och avgifter.',
        fortifikationsverketMeta: 'Mar 2020 - Aug 2022 via Infozone Sverige',
        fortifikationsverketText:
          'Förvaltade och vidareutvecklade ett arkivsystem, uppgraderade flera system till modernare .NET och byggde CI/CD-pipelines.',
        carnegieMeta: 'Feb 2020 - Jan 2022 via Infozone Sverige',
        carnegieText: 'Förvaltade ett av Carnegies interna intranät.',
        sjMeta: 'Feb 2020 - Jan 2022 via Infozone Sverige',
        sjText: 'Förvaltade ett av SJ:s interna intranät.',
      },
    },
    projects: {
      label: 'Publika projekt',
      heading: 'Direkt från GitHub',
      intro: 'Publika repositories hämtade direkt från GitHub. Eget arbete visas först och forks är tydligt markerade.',
      loading: 'Laddar publika repositories...',
      viewAll: 'Visa allt på GitHub',
      repoListLabel: 'GitHub-repositories',
      repo: {
        original: 'Original',
        fork: 'Fork',
        viewRepo: 'Visa repo',
        liveSite: 'Live-sida',
        defaultDescription: 'Projektinformation underhålls direkt på GitHub.',
        mixedStack: 'Blandad teknik',
      },
      recentlyUpdated: 'Nyligen uppdaterat',
      updatedOn: 'Uppdaterad {date}',
      noRepos: 'Inga publika repositories kunde visas just nu.',
      noReposSummary: 'GitHub returnerade inga publika repositories.',
      summaryCount: 'Visar {count} publika repositories från GitHub{cachedSuffix}.',
      summaryCachedSuffix: ' (cachelagrat)',
      unavailable:
        'Det gick inte att ladda GitHub-projekten. <a href="https://github.com/0Klart?tab=repositories" target="_blank" rel="noopener noreferrer">Visa hela profilen i stället.</a>',
      unavailableSummary: 'GitHub är inte tillgängligt just nu, men länken till hela profilen finns kvar.',
    },
    contact: {
      label: 'Kontakt',
      heading: 'Låt oss<br />höras.',
      intro:
        'Jag arbetar idag på CGI och letar inte aktivt efter en ny roll, men du är varmt välkommen att höra av dig via formuläret nedan eller via LinkedIn och GitHub. Sidan håller kontaktvägen öppen utan att exponera privata dokument.',
      linkedInProfile: 'LinkedIn-profil',
      githubProfile: 'GitHub-profil',
      location: 'Örebro, Sverige',
      formLabel: 'Kontaktformulär',
      honeypotLabel: 'Webbplats',
      form: {
        nameLabel: 'Namn',
        namePlaceholder: 'Ditt namn',
        emailLabel: 'E-post',
        emailPlaceholder: 'din@epost.se',
        subjectLabel: 'Ämne',
        subjectPlaceholder: 'Vad gäller det?',
        messageLabel: 'Meddelande',
        messagePlaceholder: 'Berätta om ditt projekt, ett samarbete eller din fråga...',
        submit: 'Skicka meddelande',
        sending: 'Skickar...',
        errors: {
          name: 'Fyll i ditt namn.',
          emailValid: 'Fyll i en giltig e-postadress.',
          subject: 'Lägg till ett ämne (minst 2 tecken).',
          message: 'Skriv ett meddelande (minst 10 tecken).',
        },
        status: {
          success: 'Meddelandet skickades. Tack för att du hörde av dig.',
          corsError:
            'Webbläsaren blockerade begäran innan den nådde kontaktjänsten. Det beror oftast på en CORS-konfiguration mellan webbplatsen och API:t.',
          networkError:
            'Kontaktjänsten kunde inte nås just nu. Försök igen senare eller hör av dig via LinkedIn.',
          rateLimited:
            'Det har skickats för många meddelanden från den här adressen nyligen. Försök igen lite senare eller hör av dig via LinkedIn.',
          serverError:
            'Kontaktjänsten kunde inte skicka ditt meddelande just nu. Försök igen senare eller hör av dig via LinkedIn.',
          requestFailed: 'Begäran misslyckades ({status}). Försök igen senare eller hör av dig via LinkedIn.',
          generic: 'Något gick fel. Försök igen senare eller hör av dig via LinkedIn.',
        },
      },
    },
    footer: {
      builtWith: 'Byggd med HTML, CSS, JavaScript, ASP.NET Core, Azure och GitHub Pages',
    },
  });

  const htmlElement = document.documentElement;
  const boundControlAttribute = 'data-preferences-bound';
  let currentTheme = 'midnight';
  let currentLocale = 'en';

  function getStorageValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function setStorageValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage failures.
    }
  }

  function normalizeTheme(value) {
    return Object.prototype.hasOwnProperty.call(THEMES, value) ? value : 'midnight';
  }

  function normalizeLocale(value) {
    return LOCALES.includes(value) ? value : 'en';
  }

  function detectBrowserLocale() {
    const candidates =
      Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    const firstSupported = candidates.find(
      (candidate) => typeof candidate === 'string' && candidate.toLowerCase().startsWith('sv')
    );

    return firstSupported ? 'sv' : 'en';
  }

  function getNestedTranslationValue(locale, key) {
    return key.split('.').reduce((value, part) => {
      if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, part)) {
        return value[part];
      }

      return undefined;
    }, translations[locale]);
  }

  function formatTemplate(template, variables = {}) {
    return template.replace(/\{(\w+)\}/g, (_, token) => {
      return Object.prototype.hasOwnProperty.call(variables, token) ? String(variables[token]) : '';
    });
  }

  function translate(key, variables = {}, locale = currentLocale) {
    const localized = getNestedTranslationValue(locale, key);
    const fallback = getNestedTranslationValue('en', key);
    const template = typeof localized === 'string' ? localized : fallback;

    if (typeof template !== 'string') {
      return key;
    }

    return formatTemplate(template, variables);
  }

  function parseAttributeTranslations(value) {
    return String(value || '')
      .split(';')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const separatorIndex = entry.indexOf(':');
        if (separatorIndex === -1) {
          return null;
        }

        return {
          attribute: entry.slice(0, separatorIndex).trim(),
          key: entry.slice(separatorIndex + 1).trim(),
        };
      })
      .filter(Boolean);
  }

  function updateMetaAndLanguage() {
    htmlElement.lang = currentLocale;
    document.title = translate('meta.title');

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', translate('meta.description'));
    }
  }

  function updateThemeColor() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', THEMES[currentTheme].themeColor);
    }
  }

  function updateThemeState() {
    const theme = THEMES[currentTheme];
    htmlElement.dataset.theme = currentTheme;
    htmlElement.dataset.bsTheme = theme.bsTheme;
    htmlElement.style.colorScheme = theme.bsTheme;
    updateThemeColor();
  }

  function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      element.innerHTML = translate(key);
    });

    root.querySelectorAll('[data-i18n-attr]').forEach((element) => {
      parseAttributeTranslations(element.getAttribute('data-i18n-attr')).forEach(({ attribute, key }) => {
        element.setAttribute(attribute, translate(key));
      });
    });

    updateMetaAndLanguage();
    updateControlState(root);
  }

  function updateControlState(root = document) {
    root.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const isLightTheme = currentTheme === 'linen';
      const nextTheme = isLightTheme ? 'midnight' : 'linen';
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');

      button.dataset.targetTheme = nextTheme;
      button.setAttribute('aria-pressed', String(isLightTheme));
      button.setAttribute(
        'aria-label',
        translate(isLightTheme ? 'settings.theme.switchToDark' : 'settings.theme.switchToLight')
      );

      if (icon) {
        icon.className = isLightTheme ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
        icon.setAttribute('aria-hidden', 'true');
      }

      if (label) {
        label.innerHTML = translate(isLightTheme ? 'settings.theme.dark' : 'settings.theme.light');
      }
    });

    root.querySelectorAll('[data-locale-option]').forEach((button) => {
      const buttonLocale = normalizeLocale(button.getAttribute('data-locale-option'));
      const isActive = buttonLocale === currentLocale;

      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function initializeControls(root = document) {
    root.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      if (button.hasAttribute(boundControlAttribute)) {
        return;
      }

      button.setAttribute(boundControlAttribute, 'true');
      button.addEventListener('click', () => {
        setTheme(button.dataset.targetTheme || 'linen');
      });
    });

    root.querySelectorAll('[data-locale-option]').forEach((button) => {
      if (button.hasAttribute(boundControlAttribute)) {
        return;
      }

      button.setAttribute(boundControlAttribute, 'true');
      button.addEventListener('click', () => {
        setLocale(button.getAttribute('data-locale-option'));
      });
    });
  }

  function dispatchPreferenceEvent(type, detail) {
    window.dispatchEvent(new CustomEvent(type, { detail }));
  }

  function setTheme(theme, { persist = true, notify = true } = {}) {
    currentTheme = normalizeTheme(theme);
    updateThemeState();
    updateControlState(document);

    if (persist) {
      setStorageValue(STORAGE_KEYS.theme, currentTheme);
    }

    if (notify) {
      dispatchPreferenceEvent('portfolio:themechange', { theme: currentTheme });
    }
  }

  function setLocale(locale, { persist = true, notify = true } = {}) {
    currentLocale = normalizeLocale(locale);
    applyTranslations(document);

    if (persist) {
      setStorageValue(STORAGE_KEYS.locale, currentLocale);
    }

    if (notify) {
      dispatchPreferenceEvent('portfolio:localechange', { locale: currentLocale });
    }
  }

  function initialize(root = document) {
    applyTranslations(root);
    initializeControls(root);
    updateControlState(root);
  }

  currentTheme = normalizeTheme(getStorageValue(STORAGE_KEYS.theme) || htmlElement.dataset.theme || 'midnight');
  currentLocale = normalizeLocale(
    getStorageValue(STORAGE_KEYS.locale) || detectBrowserLocale() || htmlElement.lang || 'en'
  );

  updateThemeState();
  updateMetaAndLanguage();

  window.PortfolioPreferences = {
    getTheme() {
      return currentTheme;
    },
    getLocale() {
      return currentLocale;
    },
    setTheme,
    setLocale,
    t: translate,
    applyTranslations,
    initializeControls,
    initialize,
  };

  document.addEventListener('DOMContentLoaded', () => {
    initialize(document);
  });
})();
