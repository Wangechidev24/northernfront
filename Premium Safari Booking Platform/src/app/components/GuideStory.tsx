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
    <section ref={containerRef} className="relative min-h-screen py-32 px-8 lg:px-16 overflow-hidden">
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
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="bg-[#1a1511]/95 backdrop-blur-sm p-12 lg:p-16">
          <div className="flex items-start gap-8 mb-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Safari guide"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-white text-2xl font-medium mb-2">
                Guided by Kamau Ndirangu
              </h3>
              <p className="text-[#d4a574] text-sm uppercase tracking-wider">
                Licensed Northern Kenya Specialist
              </p>
            </div>
          </div>

          <div className="space-y-6 text-white/90 text-lg leading-relaxed">
            <p>
              "I was born at the foot of Mount Kenya, but it was in the North
              that I found my calling. For fifteen years, I have walked these
              ancient lands—from the singing wells of Samburu to the jade
              waters of Turkana."
            </p>
            <p>
              "This is not the Kenya of postcards. Here, the reticulated
              giraffe moves with a grace found nowhere else on Earth. The
              Grevy's zebra—the largest and most endangered of its kind—roams
              freely. The gerenuk stands on hind legs to reach acacia leaves.
              This is the Northern Five."
            </p>
            <p>
              "But wildlife is only part of the story. The Samburu, Rendille,
              and Gabbra peoples have thrived here for centuries. With their
              permission and blessing, I share their world with visitors who
              seek not just to see, but to understand."
            </p>
            <p className="text-white font-medium">
              Every journey I guide is personal, purposeful, and unhurried. No
              two safaris are the same.
            </p>
          </div>

          <button
            onClick={onBookNow}
            className="mt-12 bg-[#d4a574] text-[#1a1511] px-10 py-5 text-lg font-medium hover:bg-[#c49563] transition-colors w-full lg:w-auto"
          >
            Book Your Safari
          </button>
        </div>
      </motion.div>
    </section>
  );
}
