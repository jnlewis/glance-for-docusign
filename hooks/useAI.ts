import { Config } from '@/config/config';
import { useState, useRef } from 'react';

const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [output, setOutput] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateErrorMessage = 'Could not run AI. Please try a different model or try again later.';

  const generateAsText = async (request) => {
    console.log('generate');
    setIsLoading(true);
    setIsThinking(true);

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
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseBody = await response.json();

      if (
        !responseBody ||
        !responseBody.data ||
        !responseBody.data.generated ||
        typeof responseBody.data.generated !== 'string'
      ) {
        throw new Error('Invalid response format');
      }

      const { generated } = responseBody.data;

      return generated;
    } catch (e) {
      console.error(e);
      return '';
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const generateAsStream = async (request) => {
    console.log('generateAsStream');
    setIsLoading(true);
    setIsThinking(true);
    setOutput('');

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const url = Config.aiApiStreamingHost;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'comexiaslabs-api-key': Config.aiApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal, // Attach the signal to the request
      });

      if (!response || !response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();

      return new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setIsLoading(false);
                break;
              }
              if (isThinking) {
                setIsThinking(false);
              }
              controller.enqueue(value);
              const textChunk = new TextDecoder().decode(value, { stream: true });
              setOutput((prevText) => prevText + textChunk);
            }
          } catch (err) {
            if (signal.aborted) {
              console.log('Streaming aborted');
            } else {
              throw err;
            }
          } finally {
            controller.close();
            reader.releaseLock();
            setIsLoading(false);
          }
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setOutput(generateErrorMessage);
    }
  };

  const stopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the ongoing request
    }
  };

  return { generateAsText, generateAsStream, stopStream, isLoading, isThinking, output };
};

export default useAI;
