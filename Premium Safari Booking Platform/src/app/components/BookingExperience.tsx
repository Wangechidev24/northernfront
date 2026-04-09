import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface BookingExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nationality: 'resident' | 'non-resident';
  groupSize: number;
  accommodation: 'luxury-lodge' | 'mobile-bush-camp';
  interests: string[];
  destination: string;
  duration: number;
  name: string;
  email: string;
  phone: string;
}

const interests = [
  'The Northern Five Wildlife',
  'Singing Wells of Samburu',
  'Elephant Tracking',
  'Cultural Immersion',
  'Bird Watching',
  'Photography Safari',
  'Night Game Drives',
  'Walking Safaris',
];

const destinations = [
  { id: 'samburu', name: 'Samburu National Reserve', baseFee: 85 },
  { id: 'meru', name: 'Meru National Park', baseFee: 70 },
  { id: 'turkana', name: 'Lake Turkana & Sibiloi', baseFee: 50 },
  { id: 'chalbi', name: 'Chalbi Desert Expedition', baseFee: 0 },
  { id: 'matthews', name: 'Matthews Range', baseFee: 0 },
];

export default function BookingExperience({
  isOpen,
  onClose,
}: BookingExperienceProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nationality: 'non-resident',
    groupSize: 2,
    accommodation: 'luxury-lodge',
    interests: [],
    destination: 'samburu',
    duration: 5,
    name: '',
    email: '',
    phone: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const calculatePrice = () => {
    const dest = destinations.find((d) => d.id === formData.destination);
    if (!dest) return 0;

    const parkFee =
      formData.nationality === 'non-resident'
        ? dest.baseFee
        : dest.baseFee * 0.02; // Resident discount approximation

    const accommodationCost =
      formData.accommodation === 'luxury-lodge' ? 350 : 200;

    const baseCost =
      (parkFee + accommodationCost + 150) * formData.duration * formData.groupSize;

    const amrefCover = 50 * formData.groupSize;
    const tourismLevy = baseCost * 0.02;

    const total = baseCost + amrefCover + tourismLevy;

    return {
      baseCost,
      parkFee: parkFee * formData.duration * formData.groupSize,
      accommodationCost:
        accommodationCost * formData.duration * formData.groupSize,
      amrefCover,
      tourismLevy,
      total,
    };
  };

  const handleSubmit = () => {
    const pricing = calculatePrice();
    console.log('Booking submitted:', { formData, pricing });
    alert(
      'Thank you! Your safari inquiry has been received. We will send you a personalized Safari Preparation Kit within 24 hours.'
    );
    onClose();
    setStep(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-[#1a1511] z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-3xl">Plan Your Safari</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 transition-colors ${
                      i < step ? 'bg-[#d4a574]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl mb-2">
                        Your Travel Details
                      </h3>
                      <p className="text-white/60 text-sm">
                        Help us understand your travel profile
                      </p>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">
                        Nationality
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() =>
                            setFormData({ ...formData, nationality: 'resident' })
                          }
                          className={`p-4 border transition-colors ${
                            formData.nationality === 'resident'
                              ? 'border-[#d4a574] bg-[#d4a574]/10 text-white'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          EAC Resident
                        </button>
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              nationality: 'non-resident',
                            })
                          }
                          className={`p-4 border transition-colors ${
                            formData.nationality === 'non-resident'
                              ? 'border-[#d4a574] bg-[#d4a574]/10 text-white'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          International
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">
                        Group Size: {formData.groupSize} guests
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={formData.groupSize}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groupSize: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-[#d4a574]"
                      />
                      <div className="flex justify-between text-white/40 text-xs mt-2">
                        <span>1</span>
                        <span>12</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">
                        Duration: {formData.duration} days
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="14"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-[#d4a574]"
                      />
                      <div className="flex justify-between text-white/40 text-xs mt-2">
                        <span>3 days</span>
                        <span>14 days</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl mb-2">
                        Choose Your Destination
                      </h3>
                      <p className="text-white/60 text-sm">
                        Select your primary safari destination
                      </p>
                    </div>

                    <div className="space-y-3">
                      {destinations.map((dest) => (
                        <button
                          key={dest.id}
                          onClick={() =>
                            setFormData({ ...formData, destination: dest.id })
                          }
                          className={`w-full p-4 border text-left transition-colors flex items-center justify-between ${
                            formData.destination === dest.id
                              ? 'border-[#d4a574] bg-[#d4a574]/10'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div>
                            <p className="text-white font-medium">{dest.name}</p>
                            {dest.baseFee > 0 && (
                              <p className="text-white/60 text-sm">
                                Park fee: ${dest.baseFee}/person/day
                              </p>
                            )}
                          </div>
                          {formData.destination === dest.id && (
                            <Check className="w-5 h-5 text-[#d4a574]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl mb-2">Accommodation</h3>
                      <p className="text-white/60 text-sm">
                        Choose your preferred lodging style
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            accommodation: 'luxury-lodge',
                          })
                        }
                        className={`p-6 border text-left transition-colors ${
                          formData.accommodation === 'luxury-lodge'
                            ? 'border-[#d4a574] bg-[#d4a574]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <h4 className="text-white font-medium mb-2">
                          Luxury Lodge
                        </h4>
                        <p className="text-white/60 text-sm mb-3">
                          Elegant lodges with full amenities, en-suite
                          bathrooms, and fine dining
                        </p>
                        <p className="text-[#d4a574] text-sm">
                          ~$350/person/night
                        </p>
                      </button>

                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            accommodation: 'mobile-bush-camp',
                          })
                        }
                        className={`p-6 border text-left transition-colors ${
                          formData.accommodation === 'mobile-bush-camp'
                            ? 'border-[#d4a574] bg-[#d4a574]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <h4 className="text-white font-medium mb-2">
                          Mobile Bush Camp
                        </h4>
                        <p className="text-white/60 text-sm mb-3">
                          Authentic canvas tents in remote locations, closer to
                          nature
                        </p>
                        <p className="text-[#d4a574] text-sm">
                          ~$200/person/night
                        </p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl mb-2">Your Interests</h3>
                      <p className="text-white/60 text-sm">
                        Select experiences that interest you (optional)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-4 border text-left transition-colors flex items-center gap-3 ${
                            formData.interests.includes(interest)
                              ? 'border-[#d4a574] bg-[#d4a574]/10 text-white'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 border-2 flex items-center justify-center ${
                              formData.interests.includes(interest)
                                ? 'border-[#d4a574] bg-[#d4a574]'
                                : 'border-white/40'
                            }`}
                          >
                            {formData.interests.includes(interest) && (
                              <Check className="w-3 h-3 text-[#1a1511]" />
                            )}
                          </div>
                          <span className="text-sm">{interest}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-xl mb-2">
                        Contact Information
                      </h3>
                      <p className="text-white/60 text-sm">
                        We'll send you a personalized Safari Preparation Kit
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-4 bg-white/5 border border-white/20 text-white focus:border-[#d4a574] focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full p-4 bg-white/5 border border-white/20 text-white focus:border-[#d4a574] focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full p-4 bg-white/5 border border-white/20 text-white focus:border-[#d4a574] focus:outline-none"
                          placeholder="+254 700 000 000"
                        />
                      </div>
                    </div>

                    {/* Estimated Cost */}
                    <div className="mt-8 p-6 bg-white/5 border border-white/20">
                      <h4 className="text-white font-medium mb-4">
                        Estimated Cost
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-white/60">
                          <span>Base package</span>
                          <span>${calculatePrice().baseCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>AMREF Flying Doctors</span>
                          <span>${calculatePrice().amrefCover.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Tourism Levy (2%)</span>
                          <span>${calculatePrice().tourismLevy.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-white/20 my-3" />
                        <div className="flex justify-between text-white text-lg font-medium">
                          <span>Total</span>
                          <span>${calculatePrice().total.toFixed(2)}</span>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs mt-4">
                        Final pricing will be confirmed based on exact dates and
                        availability
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/10 flex gap-4">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}

              <button
                onClick={step === totalSteps ? handleSubmit : handleNext}
                className="flex-1 bg-[#d4a574] text-[#1a1511] px-6 py-3 font-medium hover:bg-[#c49563] transition-colors flex items-center justify-center gap-2"
              >
                {step === totalSteps ? 'Submit Inquiry' : 'Continue'}
                {step < totalSteps && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
