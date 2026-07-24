import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const apiRes = await api.post('auth/register', body);

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookieHeader = apiRes.headers['set-cookie'];
    if (setCookieHeader) {
      response.headers.set('set-cookie', Array.isArray(setCookieHeader) ? setCookieHeader.join(', ') : setCookieHeader);
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}