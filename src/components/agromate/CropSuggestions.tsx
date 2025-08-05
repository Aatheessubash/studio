"use client"

import type { FC } from 'react';
import type { Crop } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { ThumbsUp } from 'lucide-react';

interface CropSuggestionsProps {
  crops: Crop[];
  isLoading: boolean;
  onSelectCrop: (crop: Crop) => void;
  selectedCrop: Crop | null;
}

const CropSuggestions: FC<CropSuggestionsProps> = ({ crops, isLoading, onSelectCrop, selectedCrop }) => {
  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    ))
  );

  return (
    <Card className="h-full animate-in fade-in duration-500 delay-150">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-primary" />
            <span>Crop Suggestions</span>
        </CardTitle>
        <CardDescription>
          Based on your inputs, here are the most suitable crops.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {renderSkeletons()}
          </div>
        ) : crops.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <Button
                key={crop.name}
                variant="outline"
                className={cn(
                  "h-auto text-left justify-start p-4 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:scale-[1.02] focus:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  selectedCrop?.name === crop.name && "border-primary ring-2 ring-primary"
                )}
                onClick={() => onSelectCrop(crop)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("p-2 rounded-full bg-secondary", selectedCrop?.name === crop.name && "bg-primary/10")}>
                    <crop.icon className={cn("h-6 w-6 text-secondary-foreground", selectedCrop?.name === crop.name && "text-primary")} />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{crop.name}</p>
                    <p className="text-xs text-muted-foreground">{crop.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center h-full min-h-[200px]">
            <p className="text-sm font-medium text-muted-foreground">
              Your crop suggestions will appear here.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Select soil type and season to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropSuggestions;
