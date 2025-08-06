
import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Carrot,
  CloudRain,
  Droplets,
  Flower,
  Leaf,
  Snowflake,
  Sprout,
  Sun,
  Wheat,
} from "lucide-react";
import data from "./data.json";

const icons: Record<string, LucideIcon> = {
  Wheat,
  Apple,
  Sprout,
  Carrot,
  Leaf,
  Sun,
  CloudRain,
  Snowflake,
  Flower,
  Droplets,
};

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

export interface Fertilizer {
  name: string;
  usage: string;
  tips: string;
  naturalAlternatives: string;
}

export const SOIL_TYPES: string[] = data.SOIL_TYPES;
export const SEASONS: string[] = data.SEASONS;

const CROPS_DATA: Crop[] = (data.CROPS as any[]).map((crop) => ({
    ...crop,
    icon: icons[crop.icon] || Leaf, // Fallback to Leaf icon
}));

const FERTILIZER_DATA: Record<string, Fertilizer> = data.FERTILIZER_DATA;

export function getSuggestedCrops(soil: string, season: string): Crop[] {
  return CROPS_DATA.filter(crop => crop.soil.includes(soil) && crop.season.includes(season));
}

export function getFertilizerForCrop(cropName: string): Fertilizer | null {
  return FERTILIZER_DATA[cropName] || null;
}
