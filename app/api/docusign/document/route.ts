import { NextResponse } from 'next/server';
import { serverOnlyDownloadDocumentAsText } from '@/services/serverDownloadService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const envelopeId = searchParams.get('envelopeId');
  const documentId = searchParams.get('documentId');

  try {
    const documentText = await serverOnlyDownloadDocumentAsText(accountId, envelopeId, documentId);

    return NextResponse.json({ text: documentText });
  } catch (error) {
    console.error('Error fetching document file:', error);
    return NextResponse.json({ error: 'Failed to fetch document file' }, { status: 500 });
  }
}
