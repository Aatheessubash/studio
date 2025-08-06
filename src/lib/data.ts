
import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Carrot,
  CloudRain,
  Flower,
  Leaf,
  Snowflake,
  Sprout,
  Sun,
  Wheat,
} from "lucide-react";
import data from "./data.json";

export const OnionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2C8.69 2 6 4.69 6 8c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6z" />
    <path d="M11 14v5a1 1 0 001 1h0a1 1 0 001-1v-5" />
    <path d="M8.5 8.5c-1 2.5-1.5 5.5.5 7.5" />
    <path d="M15.5 8.5c1 2.5 1.5 5.5-.5 7.5" />
  </svg>
);


export const GarlicIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2C9 2 6 5 6 9c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4-3-7-6-7z" />
    <path d="M12 15c-3 0-6 2-6 4v1h12v-1c0-2-3-4-6-4z" />
    <path d="M10 10c.2-.5.5-1 .9-1.5" />
    <path d="M14 10c-.2-.5-.5-1-.9-1.5" />
  </svg>
);

export const SoybeanIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18.88 12.33C17.7 13.51 16 14 14 14s-3.7-.49-4.88-1.67" />
    <path d="M13 18.33C12.82 17.5 12.42 16.76 12 16c-.42.76-.82 1.5-1 2.33" />
    <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
    <path d="M17 9c-.28-.4-.56-.8-.84-1.2" />
    <path d="M17.84 6.2c-1-1.05-2-1.2-3.84-1.2s-2.84.15-3.84 1.2" />
    <path d="M7 9c.28-.4.56-.8.84-1.2" />
    <path d="M5.12 12.33C6.3 13.51 8 14 10 14s3.7-.49 4.88-1.67" />
  </svg>
);

const DropletsIcon: LucideIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 14.2A2.6 2.6 0 0 0 16 12a2.6 2.6 0 0 0-1-2.2V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.8A2.6 2.6 0 0 0 10 12a2.6 2.6 0 0 0 1 2.2V16a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.8Z"/><path d="M7.2 12.8A2.6 2.6 0 0 0 6 10a2.6 2.6 0 0 0-1-2.2V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1.8A2.6 2.6 0 0 0 2 10a2.6 2.6 0 0 0 1 2.2V14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.2Z"/></svg>
)

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
  OnionIcon,
  GarlicIcon,
  SoybeanIcon,
  DropletsIcon,
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
