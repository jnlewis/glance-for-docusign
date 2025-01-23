'use client';

import { useEffect, useState } from 'react';
import CardLoading from '@/components/shared/CardLoading';
import { APIAgreementDataItem } from '@/services/apiTypes';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';
import { fetchAgreements } from '@/services/navigatorService';
import { AgreementCard } from '@/components/molecules/AgreementCard/AgreementCard';
import AskAIAgreement from '@/components/molecules/AskAIAgreement/AskAIAgreement';

export default function Agreements() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreements, setAgreements] = useState<APIAgreementDataItem[]>([]);

  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<APIAgreementDataItem | undefined>();

  // Load Agreements
  useEffect(() => {
    const loadAgreements = async () => {
      setIsLoading(true);
      const agreementData = await fetchAgreements(getClientCookie('dai_accountId'));
      setIsLoading(false);

      setAgreements(agreementData.data);
    };
    loadAgreements();
  }, []);

  const handleAgreementView = (agreement: APIAgreementDataItem) => {
    setSelectedAgreement(agreement);
    setIsConfigurationOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <CardLoading />}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agreements.map((agreement) => (
              <AgreementCard key={agreement.id} agreement={agreement} onView={() => handleAgreementView(agreement)} />
            ))}
          </div>

          <AskAIAgreement
            agreement={selectedAgreement}
            open={isConfigurationOpen}
            onOpenChange={(isOpen) => setIsConfigurationOpen(isOpen)}
          />
        </>
      )}
    </div>
  );
}
