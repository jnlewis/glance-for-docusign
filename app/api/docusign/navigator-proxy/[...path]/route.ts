import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Capture the dynamic path from the URL
    const dynamicPath = params.path ? params.path.join('/') : '';
    const targetUrl = `https://api-d.docusign.com/${dynamicPath}`;

    // Forward the Authorization header from the incoming request
    const headers = new Headers(req.headers);
    const authorizationHeader = headers.get('Authorization');

    // Prepare headers for the proxied request
    const proxyHeaders = new Headers();
    if (authorizationHeader) {
      proxyHeaders.set('Authorization', authorizationHeader);
    }

    // Forward the query string as well
    const queryString = req.nextUrl.search;

    // Make the proxied request
    const response = await fetch(`${targetUrl}${queryString}`, {
      method: 'GET',
      headers: proxyHeaders,
    });

    // Return the proxied response
    const responseBody = await response.json();

    return new NextResponse(JSON.stringify(responseBody), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request.' }, { status: 500 });
  }
}
