import logger from '@/modules/logger/logger';
import apiClient from '@/modules/api/apiClient';
import { APIDocumentText, APIEnvelopeDocuments, APIEnvelopes, APIFolders } from './apiTypes';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';

const basePath = decodeURIComponent(getClientCookie('dai_basePath'));
const accessToken = getClientCookie('dai_accessToken');

export const fetchFolders = async (accountId: string): Promise<APIFolders> => {
  try {
    logger.logInfo('fetchFolders', 'Begin');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<APIFolders>(`/restapi/v2.1/accounts/${accountId}/folders`);

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    logger.logError('fetchFolders', 'Failed', e);
    return;
  }
};

export const fetchEnvelopes = async (accountId: string, folderId: string): Promise<APIEnvelopes> => {
  try {
    logger.logInfo('fetchEnvelopes', 'Begin');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<APIEnvelopes>(
      `/restapi/v2.1/accounts/${accountId}/envelopes?folder_ids=${folderId}`,
    );

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    logger.logError('fetchEnvelopes', 'Failed', e);
    return;
  }
};

export const fetchDocuments = async (accountId: string, envelopeId: string): Promise<APIEnvelopeDocuments> => {
  try {
    logger.logInfo('fetchDocuments', 'Begin');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<APIEnvelopeDocuments>(
      `/restapi/v2.1/accounts/${accountId}/envelopes/${envelopeId}/documents`,
    );

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    logger.logError('fetchDocuments', 'Failed', e);
    return;
  }
};

export const downloadDocument = async (
  accountId: string,
  envelopeId: string,
  documentId: string,
): Promise<APIDocumentText> => {
  try {
    logger.logInfo('downloadDocument', 'Begin');

    const response = await fetch(
      `/api/docusign/document?accountId=${accountId}&envelopeId=${envelopeId}&documentId=${documentId}`,
    );

    if (!response.ok) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    const data: APIDocumentText = await response.json();
    return data;
  } catch (e) {
    logger.logError('downloadDocument', 'Failed', e);
    throw new Error('Failed to download the document. Please try again later.');
  }
};
