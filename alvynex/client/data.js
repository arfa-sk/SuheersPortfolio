/**
 * Site Data Layer
 *
 * All site content lives here as fallback data. When the backend is
 * reachable, api.js fetches live content instead. The rendering logic
 * in script.js stays untouched either way.
 */

const PORTFOLIO = {
    // ─── Company Info ────────────────────────────────────
    personal: {
        name: "Alvynx",
        shortName: "ALVYNX",
        title: "B2B SaaS Video Editing Agency",
        email: "hello@alvynx.com",
        phone: "+1 000-000-0000",
        location: "Remote / Worldwide",
        instagram: "https://instagram.com/alvynx",
        youtube: "https://youtube.com/@alvynx",
        twitter: "https://twitter.com/alvynx",
        linkedin: "https://linkedin.com/company/alvynx",
    },

    // ─── Hero Section ────────────────────────────────────
    hero: {
        greeting: "B2B SaaS Video Production",
        title: 'We make <em>launch</em> videos for virality &amp; <em>demo</em> videos for conversions.',
        subtitle: "Alvynx helps SaaS companies turn feature launches and product walkthroughs into videos that convert — from script to final cut.",
        videoUrl: "",
    },

    // ─── Stats ───────────────────────────────────────────
    stats: [
        { number: "20+", label: "Clients Served" },
        { number: "150k+", label: "Views Generated" },
        { number: "6", label: "Industries Served" },
    ],

    // ─── Our Work ────────────────────────────────────────
    work: [
        { title: "Product Launch Reel", tag: "Product Launch", tagColor: "pink", description: "A fast-paced launch video built to spread across social the day a feature ships.", videoUrl: "", thumbnail: "" },
        { title: "Feature Walkthrough", tag: "Product Demo", tagColor: "cyan", description: "A clear, guided walkthrough of a core product feature built to convert trial signups.", videoUrl: "", thumbnail: "" },
        { title: "Onboarding Explainer", tag: "Product Demo", tagColor: "cyan", description: "A short explainer used inside the app to raise activation rates for new users.", videoUrl: "", thumbnail: "" },
        { title: "App Launch Teaser", tag: "Product Launch", tagColor: "pink", description: "A teaser video that built hype ahead of a public product launch.", videoUrl: "", thumbnail: "" },
        { title: "Investor Update Video", tag: "Product Demo", tagColor: "cyan", description: "A polished update video summarizing traction and roadmap for stakeholders.", videoUrl: "", thumbnail: "" },
        { title: "Feature Announcement", tag: "Product Launch", tagColor: "pink", description: "A punchy announcement video for a major feature release.", videoUrl: "", thumbnail: "" },
    ],

    // ─── Impact ──────────────────────────────────────────
    impact: [
        { clientName: "Placeholder Client A", metric: "60k+ views", thumbnail: "", videoUrl: "" },
        { clientName: "Placeholder Client B", metric: "400+ signups", thumbnail: "", videoUrl: "" },
        { clientName: "Placeholder Client C", metric: "6k+ views", thumbnail: "", videoUrl: "" },
        { clientName: "Placeholder Client D", metric: "25k+ views", thumbnail: "", videoUrl: "" },
    ],

    // ─── How It Works / Process ──────────────────────────
    process: [
        { title: "Discovery and Strategy", place: "", description: "We start by getting deep into your product. One intake form is all it takes — we learn how it works, who it's for, and what makes it different. From there we define the creative direction and map out exactly what we're building together." },
        { title: "Production", place: "", description: "Our creative team spends days inside your product — digging through reviews, competitor content, and user feedback to find exactly what your buyers care about. Script first, your approval second, storyboard third. Then our editors get to work and hand you a finished launch or demo video." },
        { title: "Influencer Management", place: "(For Organic Launch Campaign clients only)", description: "While production is running, our team is already vetting and locking down the right creators for your launch — people whose audience matches your exact buyer. By the time your video is ready, your distribution network is already in place." },
        { title: "Launch Day", place: "(For Organic Launch Campaign clients only)", description: "We coordinate your video release, your creator network, and your personal network — investors, teammates, early users — into one synchronized launch moment. Everything drops together so the algorithm sees a spike, and that spike is what turns a good video into a viral one." },
    ],

    // ─── Testimonials ────────────────────────────────────
    testimonials: [
        { quote: "Our launch video blew up and we didn't even have to promote it ourselves — 60k+ views in the first week.", name: "Placeholder Name", role: "Founder, Placeholder SaaS", avatar: "" },
        { quote: "Explaining our product used to take a 10-minute call. Now I just send the Alvynx video and replies roll in.", name: "Placeholder Name", role: "Founder, Placeholder App", avatar: "" },
        { quote: "Elite-level storytelling with zero handholding needed on our end. It's amazing how easy they made it look.", name: "Placeholder Name", role: "Head of Growth, Placeholder Inc.", avatar: "" },
        { quote: "Our product is genuinely hard to explain. Alvynx took the chaos and turned it into something people actually watch to the end.", name: "Placeholder Name", role: "Co-founder, Placeholder Labs", avatar: "" },
        { quote: "We've worked with the team a few times now — never missed a deadline, and every video felt like they understood our brand.", name: "Placeholder Name", role: "Marketing Lead, Placeholder Co.", avatar: "" },
        { quote: "Crypto meets AI isn't easy to market, but Alvynx made it click for our audience.", name: "Placeholder Name", role: "Digital Entrepreneur", avatar: "" },
    ],

    // ─── Offers / Pricing ────────────────────────────────
    offers: [
        {
            title: "Product Launch Video",
            description: "Quick introduction to launch your product or feature",
            features: ["30-45 sec launch video", "2 revisions included", "Scripting + storyboarding", "Voiceover included"],
            ctaText: "I need this",
            ctaLink: "#booking",
        },
        {
            title: "Product Demo Video",
            description: "Explain your product clearly and build trust",
            features: ["60-75 sec detailed walkthrough", "2 revisions included", "Scripting + storyboarding", "Native product UI animation", "Voiceover included"],
            ctaText: "I need this",
            ctaLink: "#booking",
        },
        {
            title: "Bulk Creative Videos",
            description: "For companies needing a high volume of videos",
            features: ["1 launch video + 1 demo video", "3 revisions included", "16:9 and 9:16 formats", "Discounted per-video cost"],
            ctaText: "I need this",
            ctaLink: "#booking",
        },
    ],

    // ─── FAQ ─────────────────────────────────────────────
    faq: [
        { question: "What is your Organic Launch Campaign?", answer: "It's a launch video paired with a network of creators and your own personal network, coordinated to release at the same time — so the algorithm sees a spike in activity around your launch." },
        { question: "How is that different from just a launch video?", answer: "A launch video on its own still needs an audience. The Organic Launch Campaign adds the distribution — vetted creators and a synchronized release — so the video actually gets seen." },
        { question: "Do you offer voiceovers in different accents or languages?", answer: "Yes — let us know the accent, language, or tone you're going for and we'll match a voiceover to it." },
        { question: "How long will it take?", answer: "Most launch and demo videos are delivered within 1-2 weeks of final script approval, depending on complexity and revisions." },
        { question: "Do you offer monthly packages?", answer: "Yes, the Bulk Creative Videos package is built for teams that need a steady stream of videos every month at a discounted per-video rate." },
        { question: "How do you learn about my product?", answer: "A short intake form to start, then our team digs into your product, competitors, and user feedback before we ever write a script." },
        { question: "Do you have a physical office or are you fully remote?", answer: "We're fully remote and work with SaaS teams worldwide." },
    ],
};
