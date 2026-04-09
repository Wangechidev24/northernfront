/**
 * Destination data store with personalized guide notes and metadata
 */

export interface Destination {
  id: string;
  name: string;
  region: string;
  heroImage: string;
  gridImage: string;
  videoLoop?: string;
  shortDescription: string;
  guideNote: string; // Ali B.'s personalized narrative
  signature: string; // Signature experience
  features: string[];
  bestTime: string;
  difficulty: 'moderate' | 'challenging' | 'extreme';
  pricingKey: string; // Key to lookup in pricing engine
}

export const DESTINATIONS: Record<string, Destination> = {
  'samburu': {
    id: 'samburu',
    name: 'Samburu National Reserve',
    region: 'Ewaso Nyiro River Basin',
    heroImage: 'https://images.unsplash.com/photo-1535338881181-3646e5ab2ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1535338881181-3646e5ab2ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Home of the Northern Five and ancient Singing Wells. Spot Grevy\'s Zebras with distinctive Mickey Mouse ears and rare leopards.',
    guideNote: `In Samburu, the silence is sacred. When I first guided visitors here fifteen years ago, I learned that wildlife cannot be rushed—it must be *heard* into conversation.

The Singing Wells are not a tourist attraction; they are a living ritual. Before dawn, the Samburu warriors and their cattle gather, and they sing—not for the animals, but *with* them. The singing is both practical and spiritual: the cattle know the water is near, and the warriors perform a ceremony that connects them to this land as it has for centuries. This sight cannot be photographed; it must be experienced in person.

I have witnessed the reticulated giraffe move through the acacia trees with a grace that defies the animal's impossible proportions. Watch for its rhythmic neck sway as it balances on those impossibly long legs. The Grevy's zebra—the largest and most endangered zebra species, with its large rounded "Mickey Mouse" ears and narrow imperial stripes that stop at a pure white belly—roams freely here. The gerenuk stands on hind legs to reach acacia leaves. The beisa oryx gallops across open plains with those impossible straight horns. The Somali ostrich, identified as a distinct species only in 2014, moves with electric speed.

All five live here. All five are endangered.

This is where the Samburu, Rendille, and Gabbra peoples have thrived for centuries. With their permission and blessing, I share their world with visitors who seek not just to see, but to understand.`,
    signature: 'Singing Wells dawn ritual with Samburu warriors and cattle; spotting all Northern Five species',
    features: [
      'Grevy\'s Zebra (endangered; large Mickey Mouse ears; narrow stripes; white belly)',
      'Reticulated Giraffe (rhythmic neck sway; liver-colored polygonal spots; unique gait)',
      'Gerenuk (exceptionally long neck; stands on hind legs)',
      'Beisa Oryx (long straight thin horns; high-speed gallop)',
      'Somali Ostrich (blue-gray neck and thighs; bright blue skin in males)',
      'Singing Wells ancient ceremony with Samburu warriors',
      'Rare leopard sightings',
      'Cultural immersion with Samburu, Rendille, and Gabbra communities',
      'Bird watching (450+ species)',
    ],
    bestTime: 'January–March, June–September',
    difficulty: 'moderate',
    pricingKey: 'samburu',
  },

  'buffalo-springs': {
    id: 'buffalo-springs',
    name: 'Buffalo Springs',
    region: 'Samburu Ecosystem',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Quieter landscapes with unique natural mineral springs',
    guideNote: `Buffalo Springs is where you go when you want to think.

While Samburu attracts the larger groups and the camera flashes, the springs remain a place of quiet discovery. The hot mineral water—natural, ancient, untapped for decades—creates a microhabitat that exists nowhere else in Kenya. Flamingos gather at dawn. Elephants come to bathe. The water carries minerals that the local communities have known to be healing for generations.

I take special travelers here. Photographers, naturalists, those who ask deeper questions. There is less "action" here, but more *presence*.`,
    signature: 'Sunrise at the mineral springs with minimal crowds and wild elephants',
    features: [
      'Natural hot springs (geothermal phenomena)',
      'Flamingo congregations',
      'Elephant bathing rituals',
      'Quiet wildlife observation',
      'Rolling red earth landscapes',
    ],
    bestTime: 'Year-round (dry season preferred)',
    difficulty: 'moderate',
    pricingKey: 'buffalo-springs',
  },

  'ol-pejeta': {
    id: 'ol-pejeta',
    name: 'Ol Pejeta Conservancy',
    region: 'Laikipia Plateau',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-8023e76319a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1516426122078-8023e76319a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Chimpanzee sanctuary and rhino conservation hub',
    guideNote: `Ol Pejeta is humanity's second chance.

Here, in the high plateaus of Laikipia, a community of chimpanzees—rescued, rehabilitated, orphaned—live in a sanctuary that challenges everything we think about wildlife conservation. These are not wild chimpanzees; they are *our* responsibility. When you observe them, you are not watching nature; you are witnessing redemption.

The conservancy also stewards one of the largest black rhino populations in Kenya. On foot safaris here, I have tracked rhinos through acacia thickets where the silence is broken only by the crack of a twig—and the hammer of your own heart.

This is conservation work. It is not romantic. It is necessary.`,
    signature: 'Close-quarter chimpanzee observation and rhino tracking on foot',
    features: [
      'Chimpanzee sanctuary (80+ rescued individuals)',
      'Black rhino tracking',
      'Guided walking safaris',
      'Conservation education programs',
      'Laikipia plateau landscapes',
    ],
    bestTime: 'Year-round',
    difficulty: 'challenging',
    pricingKey: 'ol-pejeta',
  },

  'borana': {
    id: 'borana',
    name: 'Borana Conservancy',
    region: 'Laikipia Plateau',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Private high-end wilderness with exclusive wildlife viewing',
    guideNote: `Borana is where luxury meets *authenticity*.

A private conservancy managed by a family that has stewarded this land for generations. Here, there are no crowds—not because they are excluded, but because exclusivity is the price of conservation. When I guide safaris at Borana, every sighting feels like a private audience.

The landscape shifts between acacia forests and open plains. The wildlife is abundant: lions without the fear of tourism, elephants that remember the conservancy as sanctuary, buffalo that graze with the confidence of protected herds.

But what distinguishes Borana is the *silence*—and the stories told in that silence. This is where I take travelers who have already done the safari circuit and hunger for something deeper.`,
    signature: 'Private wildlife viewing with gourmet bush cuisine and intimate lodge experience',
    features: [
      'Private conservancy status (minimal tourism)',
      'Abundant predators and megafauna',
      'Luxury eco-lodge accommodations',
      'Personalized safari experiences',
      'Conservation partnership opportunities',
    ],
    bestTime: 'Year-round',
    difficulty: 'moderate',
    pricingKey: 'borana',
  },

  'chalbi': {
    id: 'chalbi',
    name: 'Chalbi Desert Expedition',
    region: 'Marsabit County',
    heroImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Vast white salt pans and sand dunes across Marsabit County—extreme wilderness for adventurers',
    guideNote: `The Chalbi is not for everyone. Accept this before you arrive.

When most people imagine a desert, they imagine sand. The Chalbi *is* sand—but it is also hardpan, white salt flats so blinding you must wear dark sunglasses to see them, and a silence so profound it becomes almost *physical*. The dunes shift. There are no landmarks except the stars. The daytime temperature exceeds 50°C. The night cold cracks your lips.

For those seeking extreme adventure, the Ngurunit rock slides offer a visceral descent into geological time. These ancient formations present technical challenges that demand respect and preparation.

But here is why I love it: the Chalbi is *honest*. It strips away everything you think you need. It reveals you to yourself.

Camel herds emerge from the heat shimmer like mirages. Nomadic peoples—the Rendille, the Samburu—have navigated this landscape for millennia using knowledge embedded in their genes and stories. The Rendille, who have never needed to drink water themselves (they get it from their camels), have mastered this landscape in ways we're only beginning to understand.

I have walked the Chalbi with scientists, with photographers, with adventure seekers. Everyone leaves transformed.

This is not a safari destination. This is a *pilgrimage*.`,
    signature: 'Multi-day desert camping; night under infinite stars; camel trekking; Ngurunit rock formations',
    features: [
      'Vast salt pans and dune fields (blinding white flats)',
      'Extreme temperature fluctuations (50°C+ day, near-freezing nights)',
      'Nomadic Rendille and Samburu pastoral peoples',
      'Ngurunit rock slides (extreme adventure)',
      'Minimal infrastructure (authentic camping)',
      'Astronomical observation (dark skies; minimal light pollution)',
      'Camel trekking experiences',
      'Geological formations and paleontological sites',
    ],
    bestTime: 'November–February (cooler)',
    difficulty: 'extreme',
    pricingKey: 'chalbi',
  },

  'lake-turkana': {
    id: 'lake-turkana',
    name: 'Lake Turkana & Sibiloi National Park',
    region: 'Turkana County',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'The "Jade Sea" and Sibiloi National Park—the Cradle of Mankind and birthplace of human ancestry',
    guideNote: `Lake Turkana is where time collapses.

They call it the Jade Sea because of the color—a turquoise so improbable that it looks photoshopped, yet it is the most natural thing in this landscape. The lake is ancient. It is a window into the Earth's interior. It is also a graveyard: a place where countless species have come to drink and perished when the lake receded.

But the true pilgrimage is to Sibiloi, on the lake's northern shore. This is the Cradle of Mankind. The fossil evidence of our earliest ancestors—hominids older than Lucy, older than anything we have names for—lies in the volcanic rocks and sediment. I have walked with paleontologists who wept when they held a 3.5-million-year-old cranium fragment in their hands.

The Nabuyatom Crater rises from the landscape like a wound in time. Its red beaches reflect in the alkaline waters. The volcanic geology speaks to earth movements we cannot imagine.

The lake creates its own weather. The horizon is never stable. The light changes every ten minutes. I have spent nights on the shore watching the stars reflect in the water, and I have woken unsure which was water and which was sky.`,
    signature: 'Sibiloi fossil site exploration; Nabuyatom Crater; dawn over the Jade Sea',
    features: [
      'Sibiloi National Park (Cradle of Mankind; paleontology)',
      'Nabuyatom Crater (volcanic geology; red beaches)',
      'Ancient hominid fossil sites',
      'Volcanic rock formations',
      'Crater lake ecosystems',
      'Tilapia fishing communities',
      'Unique alkaline lake adaptation',
      'Paleontological research opportunities',
    ],
    bestTime: 'January–February, August–September',
    difficulty: 'challenging',
    pricingKey: 'lake-turkana',
  },

  'sabache': {
    id: 'sabache',
    name: 'Sabache Safari Eco-Lodge Base',
    region: 'Mount Ololokwe & Mathews Range Circuit',
    heroImage: 'https://images.unsplash.com/photo-1504681869696-d977211a1e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1080',
    gridImage: 'https://images.unsplash.com/photo-1504681869696-d977211a1e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800&h=1000&fit=crop',
    shortDescription: 'Luxury base for Mount Ololokwe expeditions and Mathews Range exploration—home base for Ali B.',
    guideNote: `Mount Ololokwe rises from the plains like something a god forgot.

The Sabache Safari Eco-Lodge sits at its base—a place of surprising comfort in the wilderness. This is where I rest between journeys. From here, we undertake guided climbs, exploring the mountain's volcanic geology and the communities that live on its slopes. This is where luxury meets adventure without compromise.

The view from the plateau encompasses an expanse of northern savanna that seems to stretch to the edge of the world. On clear days, you can see the contours of three countries. The Mathews Range—that mist-shrouded mountain forest to the northwest—is where elephants roam through ancient cedar groves. The Ndoto Mountains catch sunset light in ways that make photographers weep.

At night, the stars create a celestial map so detailed it rivals the ground beneath your feet. The silence is complete. This is where the North reveals itself to those patient enough to listen.

Sabache is my home base. This is where I plan expeditions, where I rest between journeys, where I share meals with travelers who have earned my trust through their intention. Your safari begins here.`,
    signature: 'Mount Ololokwe climb; Mathews Range vistas; sunset over Ndoto Mountains',
    features: [
      'Luxury eco-lodge accommodations',
      'Mount Ololokwe climbing (volcanic geology)',
      'Mathews Range mist-shrouded forests',
      'Ndoto Mountains panoramic views',
      'Integration with traditional Samburu, Rendille, and Gabbra communities',
      'Perfect staging point for northern expeditions',
      'Ali B.\'s personal base camp',
      'Gourmet bush cuisine',
    ],
    bestTime: 'Year-round',
    difficulty: 'moderate',
    pricingKey: 'samburu',
  },
};

/**
 * Get a destination by ID
 */
export function getDestination(id: string): Destination | null {
  return DESTINATIONS[id] || null;
}

/**
 * Get all destinations
 */
export function getAllDestinations(): Destination[] {
  return Object.values(DESTINATIONS);
}

/**
 * Get destination IDs
 */
export function getDestinationIds(): string[] {
  return Object.keys(DESTINATIONS);
}
