import type { LucideIcon } from "lucide-react";
import { Wheat, Carrot, Sprout, Apple, Leaf, Sun, Snowflake, CloudRain } from "lucide-react";

export const SOIL_TYPES = ['Sandy', 'Clay', 'Loamy', 'Silty', 'Peaty', 'Chalky'];
export const SEASONS = ['Summer', 'Monsoon', 'Winter', 'Autumn', 'Spring'];

export interface Crop {
  name: string;
  soil: string[];
  season: string[];
  icon: LucideIcon;
  description: string;
  calendar: {
    sow: string;
    fertilize: string;
    irrigate: string;
    harvest: string;
  };
}

export const CROPS: Crop[] = [
  {
    name: 'Wheat',
    soil: ['Loamy', 'Clay'],
    season: ['Winter', 'Spring'],
    icon: Wheat,
    description: 'A staple cereal grain grown worldwide.',
    calendar: {
        sow: 'October - December',
        fertilize: 'November & January',
        irrigate: 'Critical stages: Crown Root, Tillering, Flowering',
        harvest: 'March - April',
    }
  },
  {
    name: 'Tomato',
    soil: ['Sandy', 'Loamy'],
    season: ['Summer', 'Autumn'],
    icon: Apple,
    description: 'A popular fruit, botanically a berry, used in many cuisines.',
    calendar: {
        sow: 'March - June',
        fertilize: 'Every 2-3 weeks after transplanting',
        irrigate: 'Consistent watering, 1-2 inches per week',
        harvest: 'July - September',
    }
  },
  {
    name: 'Potato',
    soil: ['Sandy', 'Silty', 'Peaty'],
    season: ['Spring', 'Summer'],
    icon: Sprout,
    description: 'A starchy tuber, one of the world\'s main food crops.',
    calendar: {
        sow: 'March - April',
        fertilize: 'At planting and when plants are 6-8 inches tall',
        irrigate: 'Keep soil evenly moist, especially during tuber formation',
        harvest: 'July - August',
    }
  },
  {
    name: 'Carrot',
    soil: ['Sandy', 'Loamy', 'Peaty'],
    season: ['Spring', 'Autumn'],
    icon: Carrot,
    description: 'A root vegetable, usually orange in color.',
    calendar: {
        sow: 'April - July',
        fertilize: '4-6 weeks after sowing, low nitrogen',
        irrigate: 'Regularly to prevent splitting',
        harvest: 'July - October',
    }
  },
  {
    name: 'Lettuce',
    soil: ['Silty', 'Loamy'],
    season: ['Spring', 'Autumn'],
    icon: Leaf,
    description: 'A leaf vegetable, often used in salads and sandwiches.',
    calendar: {
        sow: 'March - August (successive sowings)',
        fertilize: '3 weeks after transplanting',
        irrigate: 'Shallow, frequent watering',
        harvest: 'May - October',
    }
  },
  {
    name: 'Corn',
    soil: ['Loamy', 'Silty'],
    season: ['Summer'],
    icon: Sun,
    description: 'A tall annual cereal grass that yields large grains, or kernels, set in rows on a cob.',
    calendar: {
        sow: 'May - June',
        fertilize: 'When plants are knee-high and at tasseling',
        irrigate: 'Critical during silking and pollination',
        harvest: 'August - September',
    }
  },
  {
    name: 'Rice',
    soil: ['Clay', 'Silty'],
    season: ['Monsoon'],
    icon: CloudRain,
    description: 'The seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice).',
    calendar: {
        sow: 'June - July (transplanting)',
        fertilize: 'Basal dose, tillering, and panicle initiation stages',
        irrigate: 'Maintain flooded conditions for most of the cycle',
        harvest: 'October - November',
    }
  },
  {
    name: 'Cabbage',
    soil: ['Loamy', 'Clay'],
    season: ['Winter', 'Spring'],
    icon: Snowflake,
    description: 'A leafy green, red (purple), or white (pale green) biennial plant grown as an annual vegetable crop.',
    calendar: {
        sow: 'March - May (spring) or July - August (autumn)',
        fertilize: 'When heads start to form',
        irrigate: 'Consistently to prevent head splitting',
        harvest: 'June - July (spring) or October - November (autumn)',
    }
  }
];

export interface Fertilizer {
  name: string;
  usage: string;
  tips: string;
  naturalAlternatives: string;
}

export const FERTILIZER_DATA: Record<string, Fertilizer> = {
  'Wheat': {
    name: 'Urea & DAP',
    usage: '120kg/ha Urea, 60kg/ha DAP',
    tips: 'Apply DAP at sowing time. Split Urea application into 3 stages for best results.',
    naturalAlternatives: 'Use well-rotted farmyard manure or vermicompost as a basal dressing. For pest control, use a neem oil spray.'
  },
  'Tomato': {
    name: 'NPK 19-19-19 & Calcium Nitrate',
    usage: '5g/liter NPK, 2g/liter Calcium Nitrate',
    tips: 'Start with NPK during vegetative growth. Use Calcium Nitrate during flowering and fruiting to prevent blossom end rot.',
    naturalAlternatives: 'Compost tea and crushed eggshells (for calcium) are great. Plant marigolds nearby to repel nematodes.'
  },
  'Potato': {
    name: 'Potassium Sulfate & Ammonium Nitrate',
    usage: '150kg/ha Potassium Sulfate, 100kg/ha Ammonium Nitrate',
    tips: 'High potassium is crucial for tuber development. Apply in bands near the seed pieces at planting.',
    naturalAlternatives: 'Wood ash can provide potassium. Green manure crops like alfalfa grown before planting can enrich the soil.'
  },
  'Carrot': {
    name: 'Low-Nitrogen NPK (5-15-15)',
    usage: '70kg/ha',
    tips: 'Avoid high nitrogen fertilizers which can cause hairy, forked roots. Focus on Phosphorus and Potassium for root growth.',
    naturalAlternatives: 'Bone meal for phosphorus and compost for overall health. Companion planting with rosemary can deter the carrot rust fly.'
  },
  'Lettuce': {
    name: 'Balanced NPK (10-10-10)',
    usage: '50kg/ha',
    tips: 'Lettuce has a shallow root system, so frequent, light applications are better than one heavy dose.',
    naturalAlternatives: 'Liquid seaweed fertilizer is excellent. A diluted solution of soap and water can manage aphids.'
  },
  'Corn': {
    name: 'High-Nitrogen Starter & Urea',
    usage: '150kg/ha Urea',
    tips: 'Corn is a heavy nitrogen feeder. Apply a starter fertilizer at planting and side-dress with Urea when plants are knee-high.',
    naturalAlternatives: 'Planting legumes like beans alongside corn (as in "Three Sisters" farming) naturally fixes nitrogen in the soil.'
  },
  'Rice': {
    name: 'Ammonium Sulfate & Muriate of Potash',
    usage: '100kg/ha Ammonium Sulfate, 50kg/ha Muriate of Potash',
    tips: 'Incorporate potash before flooding. Apply ammonium sulfate in splits for efficient uptake in flooded conditions.',
    naturalAlternatives: 'Azolla, a floating fern, is a fantastic bio-fertilizer for rice paddies, fixing nitrogen from the atmosphere.'
  },
  'Cabbage': {
    name: 'Boron & NPK 12-12-12',
    usage: '80kg/ha NPK, 1kg/ha Boron',
    tips: 'Boron is essential for head formation and to prevent hollow stems. Ensure even watering.',
    naturalAlternatives: 'Use compost rich in organic matter. A simple garlic spray can help deter common pests like cabbage worms.'
  }
};

export function getSuggestedCrops(soil: string, season: string): Crop[] {
  return CROPS.filter(crop => crop.soil.includes(soil) && crop.season.includes(season));
}

export function getFertilizerForCrop(cropName: string): Fertilizer | null {
  return FERTILIZER_DATA[cropName] || null;
}
