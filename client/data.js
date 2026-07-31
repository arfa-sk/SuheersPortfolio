/**
 * Portfolio Data Layer
 *
 * All portfolio content lives here. When the backend is ready,
 * replace the static exports with API fetch calls in api.js.
 * The rendering logic in script.js stays untouched.
 */

const PORTFOLIO = {
    // ─── Personal Info ───────────────────────────────────
    personal: {
        name: "Muhammad Suheer Khan",
        shortName: "Suheer Khan",
        title: "Flutter Developer",
        email: "khansuheer1@gmail.com",
        phone: "+92-332-2683443",
        location: "Karachi, Pakistan",
        github: "https://github.com/suheerthedev",
        linkedin: "https://www.linkedin.com/in/suheer-khan/",
        resumeUrl: "Suheer Khan Resume (1).pdf",
    },

    // ─── Hero Section ────────────────────────────────────
    hero: {
        greeting: "Hi, I'm Suheer Khan",
        title: 'I build <em>mobile</em> apps that<br>users <em>love</em> to use.',
        subtitle: "Flutter Developer specializing in clean UI, scalable architecture, and seamless API integrations. Based in Karachi, Pakistan.",
    },

    // ─── Stats ───────────────────────────────────────────
    stats: [
        { number: "3+", label: "Production Apps" },
        { number: "1+", label: "Years Experience" },
        { number: "10+", label: "Technologies" },
    ],

    // ─── About ───────────────────────────────────────────
    about: {
        badge: "About Me",
        title: 'Crafting <em>mobile</em> experiences.',
        subtitle: "from concept to deployment",
        paragraphs: [
            "I'm a Flutter developer with hands-on experience in REST API integration, Firebase, Supabase, and multiple state management patterns. I have built feature-rich applications spanning e-commerce, crypto wallets, multi-vendor marketplaces, chat systems, news aggregators, and weather apps.",
            "My focus is on clean UI, smooth functionality, and scalable architecture. I believe great apps are built at the intersection of beautiful design and solid engineering. Always eager to learn, always shipping.",
        ],
    },

    // ─── Projects ────────────────────────────────────────
    projects: [
        {
            title: "Multi-Vendor Marketplace",
            tag: "Marketplace",
            tagColor: "purple",
            description: "Multi-vendor marketplace app with Laravel backend integration. Full REST API implementation for vendor management and transactions.",
            tech: ["Flutter", "Laravel", "REST API", "Stacked"],
            github: "https://github.com/suheerthedev/marketplace",
            image: "assets/project1.png",
            icon: "store",
        },
        {
            title: "E-Commerce App",
            tag: "E-Commerce",
            tagColor: "green",
            description: "Full-featured shopping app with Firebase auth (Email, Google, Facebook), cart, wishlist, order tracking, and payment gateway integration.",
            tech: ["Flutter", "Firebase", "Cloud Firestore", "Payment API"],
            github: "https://github.com/suheerthedev/ecom_app",
            image: "assets/project2.png",
            icon: "cart",
        },
        {
            title: "Crypto Hot Wallet",
            tag: "Fintech",
            tagColor: "orange",
            description: "Real-time coin prices and portfolio tracking via Binance WebSocket APIs. TRC20 network data fetching for live token balance updates.",
            tech: ["Flutter", "WebSocket", "Binance API", "StreamBuilder"],
            github: "https://github.com/suheerthedev/forti_coin_app",
            image: "assets/project3.png",
            icon: "layers",
        },
        {
            title: "Meddealer",
            tag: "Healthcare",
            tagColor: "blue",
            description: "Medical equipment dealer application with inventory tracking, vendor communication, and secure document handling.",
            tech: ["Flutter", "Node.js", "MongoDB", "BLoC"],
            github: "https://github.com/suheerthedev",
            image: "assets/project4.png",
            icon: "layers",
        },
    ],

    // ─── Skills ──────────────────────────────────────────
    skillCategories: [
        {
            title: "Mobile Development",
            items: [
                { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
                { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
                { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
                { name: "iOS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", invert: true },
            ],
        },
        {
            title: "State Management",
            items: [
                { name: "BLoC / Cubit", logo: "assets/logos/bloc.svg" },
                { name: "Provider", logo: "assets/logos/provider.svg" },
                { name: "Riverpod", logo: "assets/logos/riverpod.svg" },
                { name: "GetX", logo: "assets/logos/getx.svg" },
                { name: "Stacked", logo: "assets/logos/stacked.svg" },
                { name: "MobX", logo: "assets/logos/mobx.svg" },
            ],
        },
        {
            title: "Backend & BaaS",
            items: [
                { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
                { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
                { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
                { name: "REST APIs", logo: "assets/logos/api.svg" },
                { name: "WebSocket", logo: "assets/logos/websocket.svg" },
            ],
        },
        {
            title: "Web Technologies",
            items: [
                { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
            ],
        },
        {
            title: "Tools & Platforms",
            items: [
                { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invert: true },
                { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
                { name: "Android Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg" },
                { name: "Xcode", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg" },
                { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
                { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
            ],
        },
    ],

    // ─── Journey / Experience ────────────────────────────
    journey: [
        {
            title: "Flutter Developer",
            place: "Devop360",
            description: "Working as a Flutter developer building production mobile applications. Handling end-to-end app development from UI implementation to API integration and deployment.",
        },
        {
            title: "Bachelor's in CS",
            place: "Mohammad Ali Jinnah University",
            description: "Pursuing a Bachelor's degree in Computer Science, building a strong foundation in algorithms, data structures, and software engineering principles.",
        },
        {
            title: "Flutter Certification",
            place: "SMIT",
            description: "Completed intensive Flutter App Development course covering Dart fundamentals, state management, Firebase integration, and real-world project development.",
        },
        {
            title: "Continuous Learning",
            place: "Self-Driven",
            description: "Building projects ranging from crypto wallets to e-commerce platforms. Each project pushes me to learn new technologies and solve harder problems.",
        },
    ],

    // ─── Testimonials ────────────────────────────────────
    testimonials: [
        {
            quote: "Suheer built our e-commerce app from scratch and delivered ahead of schedule. Clean code, pixel-perfect UI, and zero handholding needed.",
            name: "Ahmed R.",
            role: "Startup Founder",
            avatar: "",
        },
        {
            quote: "Working with Suheer on our marketplace app was seamless. He integrated our Laravel backend without any issues and the app runs smoothly.",
            name: "Sara K.",
            role: "Product Manager",
            avatar: "",
        },
        {
            quote: "Suheer's understanding of state management and API integration is impressive. He picked up our codebase fast and shipped features consistently.",
            name: "Usman T.",
            role: "Tech Lead, Devop360",
            avatar: "",
        },
    ],

    // ─── Config ──────────────────────────────────────────
    config: {
        // Set to your Formspree/EmailJS/backend endpoint when ready
        // Leave empty to fall back to mailto
        contactEndpoint: "",
        // API base URL for when backend is connected
        apiBaseUrl: "",
    },
};
