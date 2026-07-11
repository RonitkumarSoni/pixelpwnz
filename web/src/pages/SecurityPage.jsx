import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SecuritySection from '../sections/SecuritySection';
import { useEffect } from 'react';

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-enter" style={{ minHeight: '100vh', position: 'relative', paddingTop: 100 }}>
        {/* Ambient background */}
        <div className="ambient-orb orb-primary" style={{ opacity: 0.15 }} />
        <div className="bg-grid" />
        
        <SecuritySection />
      </div>
      <Footer />
    </>
  );
}
