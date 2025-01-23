/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import axios from 'axios';
import { setCookie } from '@/modules/utils/cookiesUtil';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // Step 1: Exchange the code for an access token
    const tokenResponse = await axios.post(
      process.env.DOCUSIGN_TOKEN_URL!,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.DOCUSIGN_CLIENT_ID!,
        client_secret: process.env.DOCUSIGN_CLIENT_SECRET!,
        redirect_uri: process.env.DOCUSIGN_REDIRECT_URI!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token } = tokenResponse.data;

    // Step 2: Get user information to retrieve accountId
    const userInfoResponse = await axios.get('https://account-d.docusign.com/oauth/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { accounts } = userInfoResponse.data;

    // Take the default account, if none exist then take the first account
    const defaultAccount = accounts.find((account: any) => account.is_default) || accounts[0];
    const accountName = defaultAccount?.account_name;
    const accountId = defaultAccount?.account_id;
    const basePath = defaultAccount?.base_uri;

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID not found' }, { status: 400 });
    }

    setCookie('dai_accessToken', access_token);
    setCookie('dai_accountName', accountName);
    setCookie('dai_accountId', accountId);
    setCookie('dai_basePath', basePath);

    const redirectUrl = new URL('/workspace/welcome', request.url);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error during callback:', error);
    return NextResponse.json({ error: 'Failed to complete login flow' }, { status: 500 });
  }
}
