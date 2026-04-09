import { useState } from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { getAllDestinations } from '../../utils/destinations';

export default function NorthernWonders() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const destinations = getAllDestinations();

  return (
    <section className="py-32 px-8 lg:px-16 bg-[#1a1511]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-white text-5xl lg:text-7xl mb-6 leading-tight">
            Northern Wonders
          </h2>
          <p className="text-white/70 text-lg max-w-2xl">
            Landscapes sculpted by ancient forces, where wildlife thrives in
            stark beauty.
          </p>
        </motion.div>

        <Masonry 
          columnsCount={3}
          columnsCountBreakPoints={{
            350: 2,
            750: 2,
            900: 3,
          }}
          gutter="24px"
        >
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-full min-h-80">
                <motion.img
                  src={dest.gridImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === dest.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: hoveredId === dest.id ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-[#d4a574] text-xs uppercase tracking-wider mb-2">
                      {dest.region}
                    </p>
                    <h3 className="text-white text-xl sm:text-2xl font-medium mb-2 line-clamp-2">
                      {dest.name}
                    </h3>
                    <motion.p
                      className="text-white/90 text-xs sm:text-sm line-clamp-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredId === dest.id ? 1 : 0,
                        height: hoveredId === dest.id ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {dest.shortDescription}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
