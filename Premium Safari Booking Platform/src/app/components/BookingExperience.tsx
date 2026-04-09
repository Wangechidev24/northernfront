import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { calculatePrice, formatCurrency } from '../../utils/pricingEngine';
import { getDestination, getDestinationIds } from '../../utils/destinations';

interface BookingExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  nationality: 'kenyan-citizen' | 'kenyan-resident' | 'non-resident';
  destination: string;
  duration: number;
  groupSize: number;
  accommodation: 'luxury-lodge' | 'mobile-camping';
  interests: string[];
}

const INTERESTS = [
  'Photography (Northern Five focus)',
  'Cultural Immersion (Gabbra & Rendille traditions)',
  'Extreme Adventure (Ngurunit rock slides)',
  'Paleontology (Sibiloi - Cradle of Mankind)',
  'Bird Watching (450+ species)',
  'Walking Safaris',
  'Night Game Drives',
  'Camel Trekking (Chalbi Desert)',
];

export default function BookingExperience({
  isOpen,
  onClose,
}: BookingExperienceProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    nationality: 'non-resident',
    destination: 'samburu',
    duration: 5,
    groupSize: 2,
    accommodation: 'luxury-lodge',
    interests: [],
  });

  const totalSteps = 6;
  const destinationIds = getDestinationIds();

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

  const calculateQuote = () => {
    try {
      const price = calculatePrice({
        destination: formData.destination,
        nationality: formData.nationality,
        groupSize: formData.groupSize,
        accommodation: formData.accommodation,
        durationDays: formData.duration,
        guidePremium: false,
        currency: formData.nationality === 'non-resident' ? 'USD' : 'KSH',
      });
      return price;
    } catch (error) {
      console.error('Pricing calculation error:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const quote = calculateQuote();
    if (!quote) {
      alert('Error calculating quote. Please try again.');
      return;
    }

    const submissionData = {
      ...formData,
      quote: quote.total,
      currency: quote.currency,
      timestamp: new Date().toISOString(),
    };

    console.log('Booking submitted:', submissionData);

    // Simulate API call
    try {
      alert(
        `Thank you, ${formData.name}! Your safari inquiry has been received.\n\nQuoted Price: ${formatCurrency(quote.total, quote.currency)}\n\nWe will send you a personalized Safari Preparation Kit and payment details within 24 hours.`
      );
      onClose();
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        nationality: 'non-resident',
        destination: 'samburu',
        duration: 5,
        groupSize: 2,
        accommodation: 'luxury-lodge',
        interests: [],
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const quote = calculateQuote();
  const destination = getDestination(formData.destination);

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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-[#1a1511] z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-[#d4a574]/10 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-white text-3xl font-bold">Book Your Expedition</h2>
                  <p className="text-white/60 text-sm mt-1">Step {step} of {totalSteps}</p>
                </div>
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
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      i < step ? 'bg-[#d4a574]' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Identity */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Your Identity</h3>
                      <p className="text-white/60">Help us personalize your expedition</p>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#d4a574]"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#d4a574]"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Phone (WhatsApp compatible)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+254 7XX XXX XXX"
                        className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#d4a574]"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">What is your nationality? *</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: 'kenyan-citizen', label: 'Kenyan Citizen' },
                          { value: 'kenyan-resident', label: 'East African Resident' },
                          { value: 'non-resident', label: 'International (Non-Resident)' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                nationality: opt.value as any,
                              })
                            }
                            className={`p-4 border-2 text-left transition-all ${
                              formData.nationality === opt.value
                                ? 'border-[#d4a574] bg-[#d4a574]/10 text-white'
                                : 'border-white/20 text-white/80 hover:border-white/40'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Destination */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Choose Your Destination</h3>
                      <p className="text-white/60">Select the primary circuit for your expedition</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
                      {destinationIds.map((destId) => {
                        const dest = getDestination(destId);
                        if (!dest) return null;
                        return (
                          <button
                            key={destId}
                            onClick={() =>
                              setFormData({ ...formData, destination: destId })
                            }
                            className={`p-4 border-2 text-left transition-all ${
                              formData.destination === destId
                                ? 'border-[#d4a574] bg-[#d4a574]/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <p className="text-white font-medium">{dest.name}</p>
                            <p className="text-white/60 text-sm mt-1">{dest.shortDescription}</p>
                            <p className="text-[#d4a574] text-xs mt-2 uppercase tracking-wider">
                              {dest.difficulty} • {dest.bestTime}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Group Composition */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Your Group</h3>
                      <p className="text-white/60">Tell us about your travel companions</p>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">
                        Group Size: {formData.groupSize} person{formData.groupSize > 1 ? 's' : ''}
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
                        <span>Solo</span>
                        <span>Group (12+)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-3 block">
                        Trip Duration: {formData.duration} days
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="21"
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
                        <span>3 weeks+</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Accommodation */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Accommodation Style</h3>
                      <p className="text-white/60">How would you like to experience the wilderness?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          value: 'luxury-lodge',
                          label: 'Luxury Lodge Experience',
                          description: 'Sabache Eco-Lodge or similar high-end accommodations with amenities',
                        },
                        {
                          value: 'mobile-camping',
                          label: 'Bespoke Mobile Camping',
                          description: 'Authentic bush camp experience; closer to the wilderness',
                        },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              accommodation: opt.value as any,
                            })
                          }
                          className={`p-5 border-2 text-left transition-all ${
                            formData.accommodation === opt.value
                              ? 'border-[#d4a574] bg-[#d4a574]/10'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <p className="text-white font-medium text-lg">{opt.label}</p>
                          <p className="text-white/60 text-sm mt-1">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Interests */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Your Interests</h3>
                      <p className="text-white/60">Select up to 3 (optional)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-4 border-2 text-left transition-all text-sm ${
                            formData.interests.includes(interest)
                              ? 'border-[#d4a574] bg-[#d4a574]/10 text-[#d4a574]'
                              : 'border-white/20 text-white/80 hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 border rounded ${
                                formData.interests.includes(interest)
                                  ? 'bg-[#d4a574] border-[#d4a574]'
                                  : 'border-white/40'
                              }`}
                            />
                            {interest}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Review & Quote */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-white text-2xl mb-2">Your Expedition Summary</h3>
                      <p className="text-white/60">Please review your selections below</p>
                    </div>

                    {/* Expedition Summary */}
                    <div className="bg-white/5 border border-white/10 p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/60 text-sm">Traveler</p>
                          <p className="text-white font-medium">{formData.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Destination</p>
                          <p className="text-white font-medium">{destination?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Duration</p>
                          <p className="text-white font-medium">{formData.duration} days</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Group Size</p>
                          <p className="text-white font-medium">{formData.groupSize} person{formData.groupSize > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Accommodation</p>
                          <p className="text-white font-medium">
                            {formData.accommodation === 'luxury-lodge' ? 'Luxury Lodge' : 'Mobile Camping'}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Nationality</p>
                          <p className="text-white font-medium">
                            {formData.nationality === 'kenyan-citizen' ? 'Citizen' : formData.nationality === 'kenyan-resident' ? 'Resident' : 'International'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    {quote && (
                      <div className="bg-white/5 border border-white/10 p-6 space-y-3 max-h-[250px] overflow-y-auto">
                        <h4 className="text-white font-medium text-sm uppercase tracking-wider">Price Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          {quote.itemized.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-white/70"
                            >
                              <span>{item.label}</span>
                              <span className="font-mono">
                                {formatCurrency(item.amount, quote.currency)}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-white font-bold">
                            <span>TOTAL ESTIMATE</span>
                            <span className="text-[#d4a574] text-lg">
                              {formatCurrency(quote.total, quote.currency)}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/60 text-xs mt-4">
                          * This is an estimate. Final price may vary based on peak seasons, group size adjustments, and additional activities. A detailed itinerary and final quote will be provided after booking confirmation.
                        </p>
                      </div>
                    )}

                    {/* Terms acknowledgment */}
                    <div className="bg-[#d4a574]/5 border border-[#d4a574]/20 p-4 rounded text-white/80 text-sm space-y-2">
                      <p>✓ I understand that all expeditions include AMREF Maisha Tourist Insurance</p>
                      <p>✓ I acknowledge the Cultural Respect Guidelines for Northern Kenya</p>
                      <p>✓ I have read and accept the Terms & Conditions</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with navigation */}
            <div className="p-8 border-t border-white/10 bg-[#0d0a08] flex gap-4">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 border transition-colors ${
                  step === 1
                    ? 'border-white/10 text-white/30 cursor-not-allowed'
                    : 'border-white/30 text-white hover:border-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="ml-auto flex items-center gap-2 px-8 py-3 bg-[#d4a574] text-[#1a1511] font-medium hover:bg-[#c49563] transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email}
                  className="ml-auto flex items-center gap-2 px-8 py-3 bg-[#d4a574] text-[#1a1511] font-medium hover:bg-[#c49563] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  Submit Inquiry
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
