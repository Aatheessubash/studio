
"use client"

import * as React from 'react';
import type { FC } from 'react';
import type { Crop } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Droplets, Scissors, Tractor } from 'lucide-react';
import { Separator } from '../ui/separator';

interface FarmingCalendarProps {
  selectedCrop: Crop | null;
}

const FarmingCalendar: FC<FarmingCalendarProps> = ({ selectedCrop }) => {
  if (!selectedCrop) {
    return (
       <Card className="animate-in fade-in duration-500 delay-300">
        <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <CalendarDays className="h-5 w-5 text-primary"/>
             <span>Farming Calendar</span>
           </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center h-full min-h-[200px]">
              <p className="text-sm font-medium text-muted-foreground">
                Select a crop to see its farming calendar.
              </p>
            </div>
        </CardContent>
       </Card>
    );
  }

  const calendarItems = [
    { icon: Tractor, label: 'Sow / Transplant', time: selectedCrop.calendar.sow, color: 'text-green-600' },
    { icon: Droplets, label: 'Fertilize', time: selectedCrop.calendar.fertilize, color: 'text-yellow-600' },
    { icon: CalendarDays, label: 'Irrigate', time: selectedCrop.calendar.irrigate, color: 'text-blue-600' },
    { icon: Scissors, label: 'Harvest', time: selectedCrop.calendar.harvest, color: 'text-orange-600' },
  ];

  return (
    <Card className="animate-in fade-in duration-500 delay-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary"/>
            <span>Farming Calendar for {selectedCrop.name}</span>
        </CardTitle>
        <CardDescription>
          A general timeline for key farming activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {calendarItems.map((item, index) => (
            <React.Fragment key={item.label}>
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{item.label}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{item.time}</p>
                    </div>
                </div>
                {index < calendarItems.length - 1 && <Separator />}
            </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default FarmingCalendar;
