import { useState } from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';

interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  videoPlaceholder?: string;
  description: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Chalbi Desert',
    region: 'Marsabit',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    description: 'A vast expanse of white salt flats stretching to infinity',
  },
  {
    id: '2',
    name: 'Samburu National Reserve',
    region: 'Samburu',
    image:
      'https://images.unsplash.com/photo-1535338881181-3646e5ab2ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Home to the Northern Five and the Singing Wells',
  },
  {
    id: '3',
    name: 'Suguta Valley',
    region: 'Turkana',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    description: 'Volcanic moonscape where flamingos dance',
  },
  {
    id: '4',
    name: 'Lake Turkana',
    region: 'Turkana',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    description: 'The Jade Sea—birthplace of humanity',
  },
  {
    id: '5',
    name: 'Nabuyatom Crater',
    region: 'Turkana',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800',
    description: 'Ancient volcanic cauldron with sulfuric springs',
  },
  {
    id: '6',
    name: 'Matthews Range',
    region: 'Samburu',
    image:
      'https://images.unsplash.com/photo-1535680012278-64a3a310cba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Mist-shrouded mountain forest where elephants roam',
  },
];

export default function NorthernWonders() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

        <Masonry columnsCount={3} gutter="24px">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === dest.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
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
                    <h3 className="text-white text-2xl font-medium mb-2">
                      {dest.name}
                    </h3>
                    <motion.p
                      className="text-white/80 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredId === dest.id ? 1 : 0,
                        height: hoveredId === dest.id ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {dest.description}
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
