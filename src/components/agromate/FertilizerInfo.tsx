"use client"

import type { FC } from 'react';
import type { Crop, Fertilizer } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, TestTube, Lightbulb, Recycle } from 'lucide-react';

interface FertilizerInfoProps {
  fertilizer: Fertilizer | null;
  selectedCrop: Crop | null;
}

const FertilizerInfo: FC<FertilizerInfoProps> = ({ fertilizer, selectedCrop }) => {
  if (!selectedCrop) {
    return (
       <Card className="h-full animate-in fade-in duration-500 delay-200">
        <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <FlaskConical className="h-5 w-5 text-primary"/>
             <span>Fertilizer Recommendation</span>
           </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center h-full min-h-[150px]">
              <p className="text-sm font-medium text-muted-foreground">
                Select a crop to see fertilizer recommendations.
              </p>
            </div>
        </CardContent>
       </Card>
    );
  }

  if (!fertilizer) {
     return (
       <Card className="h-full animate-in fade-in duration-500 delay-200">
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <FlaskConical className="h-5 w-5 text-primary"/>
             <span>Fertilizer Recommendation for {selectedCrop.name}</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center h-full min-h-[150px]">
               <p className="text-sm font-medium text-muted-foreground">
                 No specific fertilizer data available for this crop.
               </p>
             </div>
         </CardContent>
       </Card>
    );
  }

  return (
    <Card className="animate-in fade-in duration-500 delay-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary"/>
            <span>Fertilizer for {selectedCrop.name}</span>
        </CardTitle>
        <CardDescription>
          Recommended fertilizers, tips, and natural alternatives.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4 rounded-lg border bg-secondary/30 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TestTube className="h-5 w-5 text-primary" />
            </div>
            <div>
                <h3 className="font-semibold text-secondary-foreground">Chemical Usage</h3>
                <p className="text-sm text-muted-foreground">{fertilizer.name}</p>
                <p className="text-sm font-medium text-foreground">{fertilizer.usage}</p>
            </div>
        </div>
         <div className="flex items-start gap-4 rounded-lg border bg-secondary/30 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <div>
                <h3 className="font-semibold text-accent-foreground">Application Tips</h3>
                <p className="text-sm text-muted-foreground">{fertilizer.tips}</p>
            </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/20 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
                <Recycle className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">Organic Alternatives</h3>
                <p className="text-sm text-muted-foreground">{fertilizer.naturalAlternatives}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FertilizerInfo;
