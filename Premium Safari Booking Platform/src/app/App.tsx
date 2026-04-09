import { useState } from 'react';
import Hero from './components/Hero';
import SignatureExpeditions from './components/SignatureExpeditions';
import NorthernWonders from './components/NorthernWonders';
import GuideStory from './components/GuideStory';
import BookingExperience from './components/BookingExperience';
import CulturalRespectFooter from './components/CulturalRespectFooter';
import TrustFooter from './components/TrustFooter';

export default function App() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1511]">
      <Hero onBookNow={() => setShowBooking(true)} />
      <NorthernWonders />
      <SignatureExpeditions onBookNow={() => setShowBooking(true)} />
      <GuideStory onBookNow={() => setShowBooking(true)} />
      <CulturalRespectFooter />
      <TrustFooter />
      <BookingExperience
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
}