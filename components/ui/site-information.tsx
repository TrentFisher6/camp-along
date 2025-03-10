import React, {useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import facilityIcons from "@/components/ui/facility-icons";
import F2Html from "@/components/ui/facility-icons";

interface SiteInformationProps {
  campsite: any;
  onClose: () => void;
  visible: boolean;
}

export function SiteInformation({ campsite, onClose, visible }: SiteInformationProps) {
  if (!visible || !campsite) return null;


  useEffect(() => {
    console.log(campsite);
  }, [campsite]);

  return (
    <div className="site-info-container">
      <Card className="shadow-lg w-80 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">
            {campsite.properties?.name || "Campsite Information"}
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-2 pb-4">
          <F2Html fdata={campsite} />
        </CardContent>
      </Card>
      <div className="site-info-pointer"></div>
    </div>
  );
} 