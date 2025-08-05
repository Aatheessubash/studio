import type { LucideIcon } from "lucide-react";
import { Wheat, Carrot, Sprout, Apple, Leaf, Sun, Snowflake, CloudRain, Wind, TreePine } from "lucide-react";

export const SOIL_TYPES = ['Sandy', 'Clay', 'Loamy', 'Silty', 'Peaty', 'Chalky'];
export const SEASONS = ['Summer', 'Monsoon', 'Winter', 'Autumn', 'Spring'];

export interface Crop {
  name: string;
  soil: string[];
  season: string[];
  icon: LucideIcon;
  description: string;
}

export const CROPS: Crop[] = [
  {
    name: 'Wheat',
    soil: ['Loamy', 'Clay'],
    season: ['Winter', 'Spring'],
    icon: Wheat,
    description: 'A staple cereal grain grown worldwide.'
  },
  {
    name: 'Tomato',
    soil: ['Sandy', 'Loamy'],
    season: ['Summer', 'Autumn'],
    icon: Apple,
    description: 'A popular fruit, botanically a berry, used in many cuisines.'
  },
  {
    name: 'Potato',
    soil: ['Sandy', 'Silty', 'Peaty'],
    season: ['Spring', 'Summer'],
    icon: Sprout,
    description: 'A starchy tuber, one of the world\'s main food crops.'
  },
  {
    name: 'Carrot',
    soil: ['Sandy', 'Loamy', 'Peaty'],
    season: ['Spring', 'Autumn'],
    icon: Carrot,
    description: 'A root vegetable, usually orange in color.'
  },
  {
    name: 'Lettuce',
    soil: ['Silty', 'Loamy'],
    season: ['Spring', 'Autumn'],
    icon: Leaf,
    description: 'A leaf vegetable, often used in salads and sandwiches.'
  },
  {
    name: 'Corn',
    soil: ['Loamy', 'Silty'],
    season: ['Summer'],
    icon: Sun,
    description: 'A tall annual cereal grass that yields large grains, or kernels, set in rows on a cob.'
  },
  {
    name: 'Rice',
    soil: ['Clay', 'Silty'],
    season: ['Monsoon'],
    icon: CloudRain,
    description: 'The seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice).'
  },
  {
    name: 'Cabbage',
    soil: ['Loamy', 'Clay'],
    season: ['Winter', 'Spring'],
    icon: Snowflake,
    description: 'A leafy green, red (purple), or white (pale green) biennial plant grown as an annual vegetable crop.'
  }
];

export interface Fertilizer {
  name: string;
  usage: string;
  tips: string;
}

export const FERTILIZER_DATA: Record<string, Fertilizer> = {
  'Wheat': {
    name: 'Urea & DAP',
    usage: '120kg/ha Urea, 60kg/ha DAP',
    tips: 'Apply DAP at sowing time. Split Urea application into 3 stages for best results.'
  },
  'Tomato': {
    name: 'NPK 19-19-19 & Calcium Nitrate',
    usage: '5g/liter NPK, 2g/liter Calcium Nitrate',
    tips: 'Start with NPK during vegetative growth. Use Calcium Nitrate during flowering and fruiting to prevent blossom end rot.'
  },
  'Potato': {
    name: 'Potassium Sulfate & Ammonium Nitrate',
    usage: '150kg/ha Potassium Sulfate, 100kg/ha Ammonium Nitrate',
    tips: 'High potassium is crucial for tuber development. Apply in bands near the seed pieces at planting.'
  },
  'Carrot': {
    name: 'Low-Nitrogen NPK (5-15-15)',
    usage: '70kg/ha',
    tips: 'Avoid high nitrogen fertilizers which can cause hairy, forked roots. Focus on Phosphorus and Potassium for root growth.'
  },
  'Lettuce': {
    name: 'Balanced NPK (10-10-10)',
    usage: '50kg/ha',
    tips: 'Lettuce has a shallow root system, so frequent, light applications are better than one heavy dose.'
  },
  'Corn': {
    name: 'High-Nitrogen Starter & Urea',
    usage: '150kg/ha Urea',
    tips: 'Corn is a heavy nitrogen feeder. Apply a starter fertilizer at planting and side-dress with Urea when plants are knee-high.'
  },
  'Rice': {
    name: 'Ammonium Sulfate & Muriate of Potash',
    usage: '100kg/ha Ammonium Sulfate, 50kg/ha Muriate of Potash',
    tips: 'Incorporate potash before flooding. Apply ammonium sulfate in splits for efficient uptake in flooded conditions.'
  },
  'Cabbage': {
    name: 'Boron & NPK 12-12-12',
    usage: '80kg/ha NPK, 1kg/ha Boron',
    tips: 'Boron is essential for head formation and to prevent hollow stems. Ensure even watering.'
  }
};

export function getSuggestedCrops(soil: string, season: string): Crop[] {
  return CROPS.filter(crop => crop.soil.includes(soil) && crop.season.includes(season));
}

export function getFertilizerForCrop(cropName: string): Fertilizer | null {
  return FERTILIZER_DATA[cropName] || null;
}
