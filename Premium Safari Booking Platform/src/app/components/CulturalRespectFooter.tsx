import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Camera, Users, AlertCircle } from 'lucide-react';

export default function CulturalRespectFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Footer Toggle */}
      <footer className="bg-[#0d0a08] border-t border-white/10 py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h3 className="text-white font-medium mb-2">Cultural Respect & Ethical Standards</h3>
              <p className="text-white/60 text-sm max-w-2xl">
                Northern Front Tours operates with deep respect for local communities, wildlife, and environmental conservation. All expeditions adhere to strict ethical guidelines.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#d4a574] text-[#1a1511] px-8 py-3 font-medium hover:bg-[#c49563] transition-colors whitespace-nowrap"
            >
              Learn Our Values
            </button>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-[#1a1511] z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white text-3xl font-bold">Our Ethical Standards</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Photography Ethics */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Camera className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg font-medium mb-2">Photography Ethics</h3>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>✓ All photography is by permission only. Respect local wishes; never force family portraits.</li>
                        <li>✓ Sacred ceremonies (like the Singing Wells ritual) are experiences to be *felt*, not filmed. Photography is strictly prohibited.</li>
                        <li>✓ Modest dress covering shoulders and knees required for village visits.</li>
                        <li>✓ Wildlife photography follows a strict 25m+ distance from large predators (park regulations).</li>
                        <li>✓ Silence during wildlife viewing enhances the experience for all—no commentary during critical moments.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cultural Immersion */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg font-medium mb-2">Community Engagement: Samburu, Rendille & Gabbra Peoples</h3>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>✓ All cultural visits are *meaningful exchanges*, not performances. We prioritize depth over spectacle.</li>
                        <li>✓ The Samburu, Rendille, and Gabbra have thrived in the North for centuries. Visit with respect and curiosity.</li>
                        <li>✓ The Singing Wells—where Samburu warriors sing to their cattle while drawing water—is a sacred ritual. It is understood and photographed only with explicit permission.</li>
                        <li>✓ Fair compensation: 100% of guide gratuities and community fees go directly to local families.</li>
                        <li>✓ Learn a few words in Samburu, Rendille, or Gabbra—language is a bridge to understanding.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Conservation Commitment */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg font-medium mb-2">Conservation & Northern Five Wildlife</h3>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>✓ The Northern Five—Grevy's Zebra, Reticulated Giraffe, Gerenuk, Beisa Oryx, Somali Ostrich—are endemic and endangered.</li>
                        <li>✓ We maintain strict protected areas around waterholes to prevent wildlife stress.</li>
                        <li>✓ No off-road driving except on established routes. Our 4x4s use fuel-efficient, low-emission engines.</li>
                        <li>✓ All waste is carried out. Zero-impact camping is non-negotiable.</li>
                        <li>✓ A portion of every tour fee supports conservation initiatives (AMREF, Laikipia Conservancy partnerships).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Traveler Responsibilities */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg font-medium mb-2">Your Responsibilities as Trail Ambassador</h3>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>✓ Follow all guide instructions without question. Safety depends on it.</li>
                        <li>✓ Never approach wildlife for photos. The moment is more important than the image.</li>
                        <li>✓ Refrain from feeding wildlife or leaving food scraps. This applies to birds, insects, everything.</li>
                        <li>✓ Respect quiet hours (typically 6 PM – 6 AM) in all communities and lodges.</li>
                        <li>✓ Ask permission before photographing individuals, places, or rituals. No means no.</li>
                        <li>✓ Remember: You are not just tourists; you are ambassadors of respect.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Ali B's Pledge */}
                <div className="bg-gradient-to-r from-[#d4a574]/10 to-transparent border border-[#d4a574]/30 p-6 rounded-lg">
                  <p className="text-white/90 italic leading-relaxed">
                    "I have spent fifteen years in the North because I fell in love with this land and its people. Every decision I make as your guide reflects my responsibility to preserve that love for future generations. The Samburu, Rendille, and Gabbra have welcomed us into their world. The Northern Five—Grevy's Zebra, Reticulated Giraffe, Gerenuk, Beisa Oryx, Somali Ostrich—exist nowhere else on Earth. This is a privilege, not a commodity. Thank you for honoring that."
                  </p>
                  <p className="text-[#d4a574] font-medium mt-4">— Ali B., Master Guide • +254 724 001975</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/10 bg-[#0d0a08] flex gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto px-8 py-3 bg-[#d4a574] text-[#1a1511] font-medium hover:bg-[#c49563] transition-colors"
                >
                  I Understand & Commit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
