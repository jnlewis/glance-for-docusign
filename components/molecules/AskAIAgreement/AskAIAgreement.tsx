'use client';

import ConversationPanel from '@/components/organism/ConversationPanel/ConversationPanel';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { APIAgreementDataItem } from '@/services/apiTypes';

interface AskAIAgreementProps {
  agreement: APIAgreementDataItem;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AskAIAgreement({ agreement, open, onOpenChange }: AskAIAgreementProps) {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[800px] sm:max-w-[800px] p-0">
          <ConversationPanel documentType="agreement" agreement={{ agreement }} />
        </SheetContent>
      </Sheet>
    </>
  );
}
