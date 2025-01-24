import logger from '@/modules/logger/logger';
import apiClient from '@/modules/api/apiClient';
import { APIAgreeements, APIAgreementDetails } from './apiTypes';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';
import { Config } from '@/config/config';

const basePath = Config.docusignNavigatorApi;
const accessToken = getClientCookie('dai_accessToken');

export const fetchAgreements = async (accountId: string): Promise<APIAgreeements> => {
  try {
    logger.logInfo('fetchAgreements', 'Begin');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<APIAgreeements>(`/v1/accounts/${accountId}/agreements`);

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    logger.logError('fetchAgreements', 'Failed', e);
    return;
  }
};

export const fetchAgreementDetails = async (accountId: string, agreementId: string): Promise<APIAgreementDetails> => {
  try {
    logger.logInfo('fetchAgreementDetails', 'Begin');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<APIAgreementDetails>(`/v1/accounts/${accountId}/agreements/${agreementId}`);

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    return response.data;
  } catch (e) {
    logger.logError('fetchAgreementDetails', 'Failed', e);
    return;
  }
};
