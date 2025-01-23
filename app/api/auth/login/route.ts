import { NextResponse } from 'next/server';

export function GET() {
  const clientId = process.env.DOCUSIGN_CLIENT_ID!;
  const redirectUri = process.env.DOCUSIGN_REDIRECT_URI!;
  const authUrl = process.env.DOCUSIGN_AUTH_URL!;

  const params = new URLSearchParams({
    response_type: 'code',
    scope: 'signature adm_store_unified_repo_read models_read',
    client_id: clientId,
    redirect_uri: redirectUri,
  });

  return NextResponse.redirect(`${authUrl}?${params.toString()}`);
}
