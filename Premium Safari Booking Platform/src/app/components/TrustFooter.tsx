import { Shield, Heart, Camera, Users } from 'lucide-react';

export default function TrustFooter() {
  return (
    <footer className="bg-[#0f0d0b] text-white py-20 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-start">
            <Shield className="w-8 h-8 text-[#d4a574] mb-4" />
            <h3 className="text-white font-medium mb-2">Safety First</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              All safaris include AMREF Flying Doctors Maisha Cover for
              emergency medical evacuation
            </p>
          </div>

          <div className="flex flex-col items-start">
            <Heart className="w-8 h-8 text-[#d4a574] mb-4" />
            <h3 className="text-white font-medium mb-2">Licensed & Insured</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Kenya Wildlife Service certified guide with comprehensive
              liability coverage
            </p>
          </div>

          <div className="flex flex-col items-start">
            <Camera className="w-8 h-8 text-[#d4a574] mb-4" />
            <h3 className="text-white font-medium mb-2">Cultural Respect</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Photography requires permission. Modest dress covering shoulders
              and knees in communities
            </p>
          </div>

          <div className="flex flex-col items-start">
            <Users className="w-8 h-8 text-[#d4a574] mb-4" />
            <h3 className="text-white font-medium mb-2">Community Partnership</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              10% of tour revenue directly supports Samburu, Rendille, and
              Gabbra education initiatives
            </p>
          </div>
        </div>

        {/* Cultural Guidelines */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h3 className="text-white text-xl mb-6">Cultural Etiquette</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[#d4a574] text-sm uppercase tracking-wider mb-3">
                Photography
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Always ask permission before photographing people</li>
                <li>• Respect if someone declines or requests compensation</li>
                <li>• Never photograph children without guardian consent</li>
                <li>• Ceremonial events are sacred—permission is mandatory</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#d4a574] text-sm uppercase tracking-wider mb-3">
                Dress & Behavior
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Cover shoulders and knees when visiting communities</li>
                <li>• Remove shoes when entering homes or sacred spaces</li>
                <li>• Avoid public displays of affection in villages</li>
                <li>• Accept hospitality with gratitude and grace</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Park Fees Information */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h3 className="text-white text-xl mb-6">Conservation Fees</h3>
          <p className="text-white/60 text-sm mb-6 max-w-3xl">
            All Kenya Wildlife Service and County Conservation fees are included
            in your quote. These funds directly support wildlife protection,
            anti-poaching efforts, and habitat restoration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-[#d4a574] mb-2">Samburu/Buffalo Springs</p>
              <p className="text-white/60">
                $85/person/day (Non-Resident)
                <br />
                KES 1,600/person/day (Resident)
              </p>
            </div>
            <div>
              <p className="text-[#d4a574] mb-2">Meru National Park</p>
              <p className="text-white/60">
                $70/person/day (Non-Resident)
                <br />
                KES 1,100/person/day (Resident)
              </p>
            </div>
            <div>
              <p className="text-[#d4a574] mb-2">Lake Turkana/Sibiloi</p>
              <p className="text-white/60">
                $50/person/day (Non-Resident)
                <br />
                Included for Residents
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-white text-2xl font-medium mb-2">
              The Northern Frontier
            </h2>
            <p className="text-white/60 text-sm">
              Premium Northern Kenya Safari Experiences
            </p>
          </div>

          <div className="text-white/60 text-sm space-y-1">
            <p>Licensed by Kenya Wildlife Service</p>
            <p>Tourism Regulatory Authority Member</p>
            <p className="text-white/40 mt-4">
              © 2026 The Northern Frontier. All rights reserved.
            </p>
          </div>
        </div>

        {/* Payment & Security Note */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm leading-relaxed">
            <span className="text-white font-medium">Payment & Security:</span>{' '}
            We accept international credit cards (Visa/Mastercard) and M-Pesa
            for domestic clients. All transactions are processed securely. A 30%
            deposit confirms your booking, with the balance due 14 days before
            departure. Full refund available up to 30 days before your safari
            date.
          </p>
        </div>
      </div>
    </footer>
  );
}
