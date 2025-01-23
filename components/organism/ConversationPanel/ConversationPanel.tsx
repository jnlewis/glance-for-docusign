'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Message } from '@/types/message';
import { downloadDocument } from '@/services/documentService';
import { APIAgreementDataItem, APIEnvelopeDocumentItem } from '@/services/apiTypes';
import { File, Settings } from 'lucide-react';
import useAI from '@/hooks/useAI';
import { getAIGenerateRequest } from '@/modules/ai/aiGenerate';
import { ModelIds, MODELS } from '@/modules/ai/aiModels';
import { DEFAULT_MODELID } from '@/config/constants';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';
import { fetchAgreementDetails } from '@/services/navigatorService';

const initialMessages = [
  {
    role: 'assistant',
    content:
      'Hello! I am downloading your document now and will let you know once I am ready to take instructions around it.',
  },
];

interface ConversationPanelProps {
  documentType: 'agreement' | 'document';
  document?: {
    envelopeId: string;
    doc: APIEnvelopeDocumentItem;
  }
  agreement?: {
    agreement: APIAgreementDataItem;
  }
}

export default function ConversationPanel({ documentType, document, agreement }: ConversationPanelProps) {
  const { generateAsText, isLoading: isGenerateLoading } = useAI();

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [downloading, setDownloading] = useState<boolean>(false);
  const [contentText, setContentText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODELID)

  useEffect(() => {
    const loadDoc = async () => {
      setDownloading(true);
      if (documentType === 'agreement' && agreement) {
        const agreementDetails = await fetchAgreementDetails(getClientCookie('dai_accountId'), agreement.agreement.id);
        setContentText(JSON.stringify(agreementDetails));
      }
      if (documentType === 'document' && document) {
        const documentText = await downloadDocument(getClientCookie('dai_accountId'), document.envelopeId, document.doc.documentId);
        setContentText(documentText.text);
      }
      setDownloading(false);

      sendMessage('assistant', "I'm ready to answer questions about the document. How can I assist?");
    };
    loadDoc();
  }, [agreement, document, documentType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage('user', input);
    setInput('');

    const request = getAIGenerateRequest(selectedModel as ModelIds, contentText, input);
    const generated = await generateAsText(request);

    sendMessage('assistant', generated);
  };

  const sendMessage = (role: string, content: string) => {
    const assistantMessage: Message = {
      role,
      content,
    };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Assistant Chat</CardTitle><Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chat Settings</DialogTitle>
              <DialogDescription>Choose your preferred AI model</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select AI Model" />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((model) => (
                    <SelectItem key={model.modelId} value={model.modelId}>
                      {`${model.provider} ${model.modelName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isGenerateLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-gray-200">
                    <span>Typing...</span>
                  </div>
                </div>
              </div>
            )}
            {downloading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-gray-200">
                    <span>Downloading your document...</span>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={isGenerateLoading ? 'AI is typing...' : 'Type your message...'}
              className="flex-grow"
              disabled={isGenerateLoading} // Disable input during loading
            />
            <Button type="submit" disabled={isGenerateLoading || !input.trim()}>
              {isGenerateLoading ? 'Typing...' : 'Send'}
            </Button>
          </form>
          {!downloading && contentText && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <File className="mr-2 h-4 w-4" />
                  View file content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {document && document.doc.name}
                    {agreement && agreement.agreement.file_name}
                  </DialogTitle>
                  <DialogDescription>
                    The following text is extracted from your file and is what the AI sees
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 max-h-[300px] overflow-y-auto">
                  <p className="text-sm text-gray-700">{contentText}</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
