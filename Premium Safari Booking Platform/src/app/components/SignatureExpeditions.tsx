import { motion } from 'motion/react';
import { getAllDestinations } from '../../utils/destinations';

interface SignatureExpeditionsProps {
  onBookNow: () => void;
}

export default function SignatureExpeditions({ onBookNow }: SignatureExpeditionsProps) {
  const destinations = getAllDestinations();

  return (
    <section className="py-24 px-8 lg:px-16 bg-[#1a1511] border-t border-[#d4a574]/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-white text-5xl lg:text-6xl mb-6 leading-tight">
            Signature Expeditions
          </h2>
          <p className="text-white/70 text-lg max-w-2xl">
            Seven uniquely curated journeys through Northern Kenya's most pristine wilderness. Each expedition is personally guided by Ali B., handcrafted for your exploration.
          </p>
        </motion.div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border border-[#d4a574]/30 bg-[#0f0d0b]/50 backdrop-blur-sm overflow-hidden hover:border-[#d4a574] transition-colors"
            >
              {/* Destination Image */}
              <div className="relative h-64 overflow-hidden bg-[#1a1511]">
                <img
                  src={destination.gridImage}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Expedition Details */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[#d4a574] text-xs uppercase tracking-widest mb-2">Expedition {index + 1}</p>
                  <h3 className="text-white text-2xl font-medium">{destination.name}</h3>
                </div>

                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Region</p>
                  <p className="text-white/90 text-sm">{destination.region}</p>
                </div>

                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Overview</p>
                  <p className="text-white/80 text-sm leading-relaxed">{destination.shortDescription}</p>
                </div>

                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {destination.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#d4a574] text-xs mt-1">▸</span>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#d4a574]/20 pt-4 mt-4">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Guide Notes</p>
                  <q className="text-white/80 text-sm italic">{destination.guideNotes}</q>
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full mt-6 bg-[#d4a574] text-[#1a1511] px-6 py-3 text-sm font-medium hover:bg-[#c49563] transition-colors"
                >
                  Reserve This Expedition
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-[#d4a574]/10 to-transparent border border-[#d4a574]/30 p-12 text-center"
        >
          <h3 className="text-white text-3xl mb-4">Custom Itineraries Available</h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Combine multiple expeditions or design a bespoke journey tailored to your interests and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookNow}
              className="bg-[#d4a574] text-[#1a1511] px-10 py-4 text-lg font-medium hover:bg-[#c49563] transition-colors"
            >
              Plan Your Journey
            </button>
            <a
              href="tel:+254724001975"
              className="border border-[#d4a574] text-[#d4a574] px-10 py-4 text-lg font-medium hover:bg-[#d4a574]/10 transition-colors"
            >
              Call Ali B. Directly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
