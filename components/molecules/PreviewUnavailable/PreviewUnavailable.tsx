import { EyeOffIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PreviewUnavailable() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <EyeOffIcon className="w-12 h-12 mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-2">Not Available for Preview</h2>
        <p className="text-muted-foreground">
          This section is under development and is not yet made available for preview.
        </p>
      </CardContent>
    </Card>
  );
}
