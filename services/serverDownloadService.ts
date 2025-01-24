import logger from '@/modules/logger/logger';
import apiClient from '@/modules/api/apiClient';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { getCookie } from '@/modules/utils/cookiesUtil';

export const serverOnlyDownloadDocumentAsText = async (
  accountId: string,
  envelopeId: string,
  documentId: string,
): Promise<string> => {
  try {
    logger.logInfo('serverOnlyDownloadDocumentAsText', 'Begin');

    const basePath = decodeURIComponent(getCookie('dai_basePath'));
    const accessToken = getCookie('dai_accessToken');

    const client = await apiClient(basePath, accessToken);
    const response = await client.get<ArrayBuffer>(
      `/restapi/v2.1/accounts/${accountId}/envelopes/${envelopeId}/documents/${documentId}`,
      {
        responseType: 'arraybuffer',
      },
    );

    if (!response || !response.data) {
      throw new Error(`Received invalid response with status: ${response.status}`);
    }

    const contentType = response.headers['content-type'];

    console.log('contentType', contentType);

    let text = '';

    if (contentType === 'application/pdf') {
      // Handle PDF files
      const pdfBuffer = Buffer.from(response.data);
      const pdfData = await pdfParse(pdfBuffer);
      text = pdfData.text;
    } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Handle DOCX files
      const docxBuffer = Buffer.from(response.data);
      const result = await mammoth.extractRawText({ buffer: docxBuffer });
      text = result.value;
    } else {
      throw new Error(`Unsupported file type: ${contentType}`);
    }

    return text;
  } catch (e) {
    logger.logError('serverOnlyDownloadDocumentAsText', 'Failed', e);
    return '';
  }
};
