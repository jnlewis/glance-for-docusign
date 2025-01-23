'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { APIAgreementDataItem } from '@/services/apiTypes';

interface AgreementCardProps {
  agreement: APIAgreementDataItem;
  onView: () => void;
}

export function AgreementCard({ agreement, onView }: AgreementCardProps) {
  return (
    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{agreement.file_name}</CardTitle>
        <CardDescription>{agreement.type}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
            {agreement.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" size="sm" onClick={onView}>
            Ask AI <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
