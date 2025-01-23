import { Config } from '@/config/config';
import { useState } from 'react';

const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateAsText = async (request) => {
    setIsLoading(true);

    try {
      const url = Config.aiApiGenerate;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'comexiaslabs-api-key': Config.aiApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        return 'AI could not respond. Please try a different model or try again later.';
      }

      const responseBody = await response.json();

      if (
        !responseBody ||
        !responseBody.data ||
        !responseBody.data.generated ||
        typeof responseBody.data.generated !== 'string'
      ) {
        return 'AI could not respond. Please try a different model or try again later.';
      }

      const { generated } = responseBody.data;

      return generated;
    } catch (e) {
      console.error(e);
      return 'AI could not respond. Please try a different model or try again later.';
    } finally {
      setIsLoading(false);
    }
  };

  return { generateAsText, isLoading };
};

export default useAI;
