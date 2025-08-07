
"use client"

import type { FC } from 'react';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download, Loader2, CalendarDays, Recycle, Leaf } from 'lucide-react';
import type { Crop, Fertilizer } from '@/lib/data';
import type { WeatherData } from '@/lib/weather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DownloadReportProps {
  selectedCrop: Crop | null;
  fertilizerInfo: Fertilizer | null;
  weatherData: WeatherData | null;
}

const ReportSummary: FC<DownloadReportProps> = ({ selectedCrop, fertilizerInfo, weatherData }) => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>SmartAgri Farming Report</CardTitle>
            <CardDescription>Generated on: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {selectedCrop && (
                <section>
                    <h3 className="flex items-center gap-2 font-semibold text-lg mb-2 text-primary">
                        <Leaf className="h-5 w-5" />
                        <span>Crop Recommendation</span>
                    </h3>
                    <p><strong>Crop:</strong> {selectedCrop.name}</p>
                    <p><strong>Description:</strong> {selectedCrop.description}</p>
                </section>
            )}
            {selectedCrop?.calendar && (
                <>
                    <Separator />
                    <section>
                        <h3 className="flex items-center gap-2 font-semibold text-lg mb-2 text-primary">
                            <CalendarDays className="h-5 w-5" />
                            <span>Farming Calendar</span>
                        </h3>
                        <p><strong>Sow / Transplant:</strong> {selectedCrop.calendar.sow}</p>
                        <p><strong>Fertilize:</strong> {selectedCrop.calendar.fertilize}</p>
                        <p><strong>Irrigate:</strong> {selectedCrop.calendar.irrigate}</p>
                        <p><strong>Harvest:</strong> {selectedCrop.calendar.harvest}</p>
                    </section>
                </>
            )}
            {fertilizerInfo && (
                <>
                    <Separator />
                    <section>
                        <h3 className="font-semibold text-lg mb-2 text-primary">Fertilizer Details</h3>
                        <p><strong>Name:</strong> {fertilizerInfo.name}</p>
                        <p><strong>Usage:</strong> {fertilizerInfo.usage}</p>
                        <p><strong>Tips:</strong> {fertilizerInfo.tips}</p>
                    </section>
                    <Separator className="my-4"/>
                    <section>
                        <h3 className="flex items-center gap-2 font-semibold text-lg mb-2 text-green-600">
                            <Recycle className="h-5 w-5" />
                            <span>Organic Alternatives</span>
                        </h3>
                        <p>{fertilizerInfo.naturalAlternatives}</p>
                    </section>
                </>

            )}
            {weatherData && (
              <>
                <Separator />
                <section>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Weather Forecast</h3>
                    <p><strong>Location:</strong> {weatherData.location}</p>
                    <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
                    <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
                    <p><strong>Condition:</strong> {weatherData.condition}</p>
                </section>
              </>
            )}
        </CardContent>
    </Card>
);

const DownloadReport: FC<DownloadReportProps> = ({ selectedCrop, fertilizerInfo, weatherData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!selectedCrop || !weatherData || !reportRef.current) return;

    setIsGenerating(true);

    try {
        const canvas = await html2canvas(reportRef.current, {
             scale: 2, // Higher scale for better quality
             useCORS: true, 
             backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`SmartAgri-Report-${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsGenerating(false);
    }
  };

  const isEnabled = selectedCrop && weatherData;

  return (
    <>
      <Button onClick={handleDownload} disabled={!isEnabled || isGenerating}>
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        <span>{isGenerating ? 'Generating...' : 'Download Report'}</span>
      </Button>
      <div style={{ position: 'fixed', left: '-2000px', top: 0, width: '800px'}}>
        <div ref={reportRef}>
             <ReportSummary 
                selectedCrop={selectedCrop} 
                fertilizerInfo={fertilizerInfo} 
                weatherData={weatherData} 
            />
        </div>
      </div>
    </>
  );
};

export default DownloadReport;
