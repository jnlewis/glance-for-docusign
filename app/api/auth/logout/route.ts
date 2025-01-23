import { NextResponse } from 'next/server';
import { deleteCookie } from '@/modules/utils/cookiesUtil';

export async function GET(request: Request) {
  try {
    deleteCookie('dai_accountName');
    deleteCookie('dai_accountId');
    deleteCookie('dai_accessToken');

    const redirectUrl = new URL('/', request.url);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error during callback:', error);
    return NextResponse.json({ error: 'Failed to complete logout flow' }, { status: 500 });
  }
}
