'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { APIEnvelopeDocumentItem } from '@/services/apiTypes';
import ConversationPanel from '@/components/organism/ConversationPanel/ConversationPanel';

interface AskAIProps {
  envelopeId: string;
  doc: APIEnvelopeDocumentItem;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AskAI({ envelopeId, doc, open, onOpenChange }: AskAIProps) {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[800px] sm:max-w-[800px] p-0">
          <ConversationPanel documentType="document" document={{ envelopeId: envelopeId, doc: doc }} />
        </SheetContent>
      </Sheet>
    </>
  );
}
