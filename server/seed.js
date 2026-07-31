require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Personal = require('./models/Personal');
const Hero = require('./models/Hero');
const About = require('./models/About');
const Stat = require('./models/Stat');
const Project = require('./models/Project');
const SkillCategory = require('./models/SkillCategory');
const Journey = require('./models/Journey');
const Testimonial = require('./models/Testimonial');
const SiteSettings = require('./models/SiteSettings');
const CustomSection = require('./models/CustomSection');

const seedData = {
    personal: {
        name: "Muhammad Suheer Khan",
        shortName: "Suheer Khan",
        title: "Flutter Developer",
        email: "khansuheer1@gmail.com",
        phone: "+92-332-2683443",
        location: "Karachi, Pakistan",
        github: "https://github.com/suheerthedev",
        linkedin: "https://www.linkedin.com/in/suheer-khan/",
        resumeUrl: "/api/resume",
    },
    hero: {
        greeting: "Hi, I'm Suheer Khan",
        title: 'I build <em>mobile</em> apps that<br>users <em>love</em> to use.',
        subtitle: "Flutter Developer specializing in clean UI, scalable architecture, and seamless API integrations. Based in Karachi, Pakistan.",
    },
    about: {
        badge: "About Me",
        title: 'Crafting <em>mobile</em> experiences.',
        subtitle: "from concept to deployment",
        paragraphs: [
            "I'm a Flutter developer with hands-on experience in REST API integration, Firebase, Supabase, and multiple state management patterns. I have built feature-rich applications spanning e-commerce, crypto wallets, multi-vendor marketplaces, chat systems, news aggregators, and weather apps.",
            "My focus is on clean UI, smooth functionality, and scalable architecture. I believe great apps are built at the intersection of beautiful design and solid engineering. Always eager to learn, always shipping.",
        ],
    },
    stats: [
        { number: "3+", label: "Production Apps", order: 0 },
        { number: "1+", label: "Years Experience", order: 1 },
        { number: "10+", label: "Technologies", order: 2 },
    ],
    projects: [
        {
            title: "Crypto Hot Wallet",
            tag: "Fintech",
            tagColor: "orange",
            description: "Real-time coin prices and portfolio tracking via Binance WebSocket APIs. TRC20 network data fetching for live token balance updates.",
            tech: ["Flutter", "WebSocket", "Binance API", "StreamBuilder"],
            github: "https://github.com/suheerthedev/forti_coin_app",
            gradient: "linear-gradient(135deg, #FF6F00 0%, #FFA726 50%, #1a1a2e 100%)",
            icon: "layers",
            order: 0,
        },
        {
            title: "E-Commerce App",
            tag: "E-Commerce",
            tagColor: "green",
            description: "Full-featured shopping app with Firebase auth (Email, Google, Facebook), cart, wishlist, order tracking, and payment gateway integration.",
            tech: ["Flutter", "Firebase", "Cloud Firestore", "Payment API"],
            github: "https://github.com/suheerthedev/ecom_app",
            gradient: "linear-gradient(135deg, #00E676 0%, #00BFA5 50%, #1a1a2e 100%)",
            icon: "cart",
            order: 1,
        },
        {
            title: "Multi-Vendor Marketplace",
            tag: "Marketplace",
            tagColor: "purple",
            description: "Multi-vendor marketplace app with Laravel backend integration. Full REST API implementation for vendor management and transactions.",
            tech: ["Flutter", "Laravel", "REST API", "Stacked"],
            github: "https://github.com/suheerthedev/marketplace",
            gradient: "linear-gradient(135deg, #b388ff 0%, #7C4DFF 50%, #1a1a2e 100%)",
            icon: "store",
            order: 2,
        },
    ],
    skillCategories: [
        {
            title: "Mobile Development",
            order: 0,
            items: [
                { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
                { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
                { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
                { name: "iOS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", invert: true },
            ],
        },
        {
            title: "State Management",
            order: 1,
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
            order: 2,
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
            order: 3,
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
            order: 4,
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
    journey: [
        { title: "Flutter Developer", place: "Devop360", description: "Working as a Flutter developer building production mobile applications. Handling end-to-end app development from UI implementation to API integration and deployment.", order: 0 },
        { title: "Bachelor's in CS", place: "Mohammad Ali Jinnah University", description: "Pursuing a Bachelor's degree in Computer Science, building a strong foundation in algorithms, data structures, and software engineering principles.", order: 1 },
        { title: "Flutter Certification", place: "SMIT", description: "Completed intensive Flutter App Development course covering Dart fundamentals, state management, Firebase integration, and real-world project development.", order: 2 },
        { title: "Continuous Learning", place: "Self-Driven", description: "Building projects ranging from crypto wallets to e-commerce platforms. Each project pushes me to learn new technologies and solve harder problems.", order: 3 },
    ],
    testimonials: [
        { quote: "Suheer built our e-commerce app from scratch and delivered ahead of schedule. Clean code, pixel-perfect UI, and zero handholding needed.", name: "Ahmed R.", role: "Startup Founder", avatar: "", order: 0 },
        { quote: "Working with Suheer on our marketplace app was seamless. He integrated our Laravel backend without any issues and the app runs smoothly.", name: "Sara K.", role: "Product Manager", avatar: "", order: 1 },
        { quote: "Suheer's understanding of state management and API integration is impressive. He picked up our codebase fast and shipped features consistently.", name: "Usman T.", role: "Tech Lead, Devop360", avatar: "", order: 2 },
    ],
};

async function seed() {
    await connectDB();
    console.log('Clearing existing data...');

    await Promise.all([
        Admin.deleteMany({}),
        Personal.deleteMany({}),
        Hero.deleteMany({}),
        About.deleteMany({}),
        Stat.deleteMany({}),
        Project.deleteMany({}),
        SkillCategory.deleteMany({}),
        Journey.deleteMany({}),
        Testimonial.deleteMany({}),
        SiteSettings.deleteMany({}),
        CustomSection.deleteMany({}),
    ]);

    console.log('Seeding...');

    // Create admin
    const passwordHash = await Admin.hashPassword(process.env.ADMIN_PASSWORD || 'admin123');
    await Admin.create({ username: process.env.ADMIN_USERNAME || 'admin', passwordHash });

    // Create all data
    await Promise.all([
        Personal.create(seedData.personal),
        Hero.create(seedData.hero),
        About.create(seedData.about),
        Stat.insertMany(seedData.stats),
        Project.insertMany(seedData.projects),
        SkillCategory.insertMany(seedData.skillCategories),
        Journey.insertMany(seedData.journey),
        Testimonial.insertMany(seedData.testimonials),
        SiteSettings.create({}),
    ]);

    console.log('Seed complete!');
    console.log(`Admin user: ${process.env.ADMIN_USERNAME || 'admin'}`);
    console.log(`Admin password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
