
"use client"

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Crop, Fertilizer } from "@/lib/data"
import { getSuggestedCrops, getFertilizerForCrop, SOIL_TYPES, SEASONS } from "@/lib/data"
import type { WeatherData } from "@/lib/weather"
import { fetchWeatherData, fetchWeatherDataByCoords } from "@/lib/weather"
import { Leaf, MapPin, Search, Bot, LocateFixed, Download } from "lucide-react"
import CropSuggestions from "@/components/agromate/CropSuggestions"
import FertilizerInfo from "@/components/agromate/FertilizerInfo"
import WeatherDisplay from "@/components/agromate/WeatherDisplay"
import { Skeleton } from "@/components/ui/skeleton"
import DownloadReport from "@/components/agromate/DownloadReport"

export default function AgroMatePage() {
  const [soilType, setSoilType] = useState<string>("")
  const [season, setSeason] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const [suggestedCrops, setSuggestedCrops] = useState<Crop[]>([])
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)
  const [fertilizerInfo, setFertilizerInfo] = useState<Fertilizer | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const [isCropsLoading, setIsCropsLoading] = useState(false)
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);


  const { toast } = useToast()

  const handleGetCrops = () => {
    if (!soilType || !season) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select both soil type and season.",
      })
      return
    }
    setIsCropsLoading(true)
    setSelectedCrop(null)
    setFertilizerInfo(null)
    // Simulate API call
    setTimeout(() => {
      const crops = getSuggestedCrops(soilType, season)
      setSuggestedCrops(crops)
      setIsCropsLoading(false)
    }, 1000)
  }

  const handleGetWeather = async () => {
    if (!location) {
      toast({
        variant: "destructive",
        title: "Missing Location",
        description: "Please enter a location.",
      })
      return
    }
    setIsWeatherLoading(true)
    try {
      const data = await fetchWeatherData(location)
      setWeatherData(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch weather data.",
      })
    } finally {
      setIsWeatherLoading(false)
    }
  }

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
      });
      return;
    }

    setIsDetectingLocation(true);
    setIsWeatherLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherDataByCoords(latitude, longitude);
          setWeatherData(data);
          setLocation(data.location);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch weather data for your location.",
          });
        } finally {
          setIsDetectingLocation(false);
          setIsWeatherLoading(false);
        }
      },
      () => {
        toast({
          variant: "destructive",
          title: "Location Access Denied",
          description: "Please allow location access to use this feature.",
        });
        setIsDetectingLocation(false);
        setIsWeatherLoading(false);
      }
    );
  };

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop)
    const fertilizer = getFertilizerForCrop(crop.name)
    setFertilizerInfo(fertilizer)
  }

  return (
    <div className="flex flex-col min-h-dvh bg-secondary/50 dark:bg-black">
      <header className="bg-background dark:bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
              <Bot className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">AgroMate</h1>
                <p className="text-sm text-muted-foreground">Your Smart Farming Assistant</p>
              </div>
            </div>
            <DownloadReport
                selectedCrop={selectedCrop}
                fertilizerInfo={fertilizerInfo}
                weatherData={weatherData}
            />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          
          <div className="flex flex-col gap-8 xl:col-span-1">
            <Card className="animate-in fade-in duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span>Farm Inputs</span>
                </CardTitle>
                <CardDescription>Tell us about your farm to get crop suggestions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOIL_TYPES.map((soil) => (
                        <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger id="season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEASONS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGetCrops} className="w-full" disabled={isCropsLoading}>
                  <Search className="mr-2 h-4 w-4" />
                  Suggest Crops
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in duration-500 delay-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>Location</span>
                </CardTitle>
                <CardDescription>Enter your location for weather updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">City or Pincode</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., Bangalore" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                   <Button onClick={handleGetWeather} className="flex-1" variant="outline" disabled={isWeatherLoading}>
                     <Search className="mr-2 h-4 w-4" />
                     Get Weather
                   </Button>
                   <Button onClick={handleDetectLocation} size="icon" variant="outline" disabled={isDetectingLocation || isWeatherLoading} aria-label="Detect Location">
                      <LocateFixed className="h-4 w-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <CropSuggestions 
                  crops={suggestedCrops} 
                  isLoading={isCropsLoading}
                  onSelectCrop={handleSelectCrop}
                  selectedCrop={selectedCrop}
                />
              </div>
              <div className="row-start-1 xl:col-start-3">
                 {isWeatherLoading ? (
                    <Card className="h-full">
                      <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                      <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </CardContent>
                    </Card>
                  ) : (
                    <WeatherDisplay weatherData={weatherData} />
                  )}
              </div>
              <div className="xl:col-span-2">
                 <FertilizerInfo fertilizer={fertilizerInfo} selectedCrop={selectedCrop} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
