import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PersonalPage from './pages/PersonalPage';
import HeroPage from './pages/HeroPage';
import AboutPage from './pages/AboutPage';
import CrudPage from './pages/CrudPage';
import SkillsPage from './pages/SkillsPage';
import ContactsPage from './pages/ContactsPage';
import ResumePage from './pages/ResumePage';
import SiteSettingsPage from './pages/SiteSettingsPage';
import CustomSectionsPage from './pages/CustomSectionsPage';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="personal" element={<PersonalPage />} />
                <Route path="hero" element={<HeroPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="stats" element={<CrudPage section="stats" fields={['number', 'label']} title="Stats" />} />
                <Route path="projects" element={<CrudPage section="projects" fields={['title', 'tag', 'tagColor', 'description', 'github', 'gradient', 'icon']} arrayFields={['tech']} title="Projects" />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="journey" element={<CrudPage section="journey" fields={['title', 'place', 'description']} title="Journey" />} />
                <Route path="testimonials" element={<CrudPage section="testimonials" fields={['quote', 'name', 'role', 'avatar']} title="Testimonials" />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="resume" element={<ResumePage />} />
                <Route path="settings" element={<SiteSettingsPage />} />
                <Route path="custom-sections" element={<CustomSectionsPage />} />
            </Route>
        </Routes>
    );
}
