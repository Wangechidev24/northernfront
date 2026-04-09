import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface GuideStoryProps {
  onBookNow: () => void;
}

export default function GuideStory({ onBookNow }: GuideStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(scrollYProgress, [0.2, 0.5], [0, 12]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background landscape that blurs */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: blur.get() ? `blur(${blur.get()}px)` : undefined,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1535342604578-a175d3fc4f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Northern Kenya landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Guide's narrative */}
      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
        }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        <div className="bg-[#1a1511]/95 backdrop-blur-sm p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Ali B., Northern Kenya safari guide"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#d4a574] flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-medium mb-2">
                Ali B.
              </h3>
              <p className="text-[#d4a574] text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
                Founder & Master Guide • Northern Front Tours & Adventures
              </p>
              <p className="text-white/70 text-xs sm:text-sm">
                15+ years of authentic Northern Kenya expeditions
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              "I came to Northern Kenya as a visitor fifteen years ago, fascinated by what lay beyond the typical safari circuit. That first expedition was transformative. Since then, I've returned countless times—through drought seasons and abundant years, with photographers and paleontologists, with families and solo adventurers. Each visit deepened my understanding. I didn't inherit this knowledge; I earned it through years of observation, conversation, and genuine respect for these landscapes."
            </p>
            <p>
              "Northern Front Tours & Adventures is my agency, built on this foundation. I founded it because I wanted to offer something different—not the sanitized, box-ticking safaris that flood the market. Here, the reticulated giraffe moves with a grace found nowhere else on Earth. The Grevy's zebra with its distinctive Mickey Mouse ears roams freely. The gerenuk stands on hind legs to browse. The beisa oryx glides across plains. The Somali ostrich moves with electric speed. This is the Northern Five—and my job is to help you truly *see* them, not just spot them."
            </p>
            <p>
              "But what captivates me most is the people. The Samburu, Rendille, and Gabbra have sustained these lands for centuries. I've spent enough time here to understand their perspectives, to be welcomed as someone who respects their world. The Singing Wells aren't just a tourist attraction to me—they're a living tradition I'm honored to share with visitors who approach with genuine interest, not curiosity."
            </p>
            <p className="text-white font-medium">
              "After fifteen years of expeditions across this frontier, I've learned one truth: there is no such thing as a standard safari. Every landscape tells a different story. Every wildlife encounter is unique. Every community has wisdom to share. My role as your guide is to translate these experiences into moments that stay with you long after you leave. This is why I built Northern Front Tours & Adventures—to offer the premium, personalized expertise that comes only from someone who has truly *lived* in the North."
            </p>
          </div>

          <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 border border-[#d4a574]/30 p-4 sm:p-6">
              <div>
                <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wider mb-1">
                  Contact Ali B.
                </p>
                <p className="text-white text-base sm:text-lg md:text-xl font-medium">+254 724 001975</p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">WhatsApp • SMS • Voice</p>
              </div>
              <div className="hidden sm:block text-[#d4a574] text-3xl">●</div>
            </div>
            <button
              onClick={onBookNow}
              className="w-full bg-[#d4a574] text-[#1a1511] px-6 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-medium hover:bg-[#c49563] transition-colors"
            >
              BOOK YOUR NORTHERN EXPEDITION
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
