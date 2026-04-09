import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1702498257321-6b5907efcda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRpY3VsYXRlZCUyMGdpcmFmZmUlMjBrZW55YXxlbnwxfHx8fDE3NzU2NTAxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Reticulated giraffe in Northern Kenya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white uppercase tracking-[0.3em] mb-6 text-sm"
            >
              Welcome to Northern Front
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#d4a574] uppercase tracking-[0.3em] mb-8 text-sm"
            >
              Northern Front Tours & Adventures
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white mb-8 leading-[1.1]"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              The Northern Circuit Awaits
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-white/90 text-lg mb-12 max-w-xl leading-relaxed"
            >
              From Ol Pejeta's rhino sanctuary to the jade waters of Lake Turkana—experience Kenya's wild north with master guide Ali B.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookNow}
              className="group bg-[#d4a574] text-[#1a1511] px-10 py-5 text-lg font-medium flex items-center gap-3 hover:bg-[#c49563] transition-colors"
            >
              Begin Your Expedition
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
