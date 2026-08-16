import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const apiRes = await api.post('/auth/register', body);

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookieHeader = apiRes.headers['set-cookie'] || apiRes.headers['Set-Cookie'];
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      
      for (const cookieStr of cookiesArray) {
        // Parse the cookie string to extract name, value, and options
        const cookieParts = cookieStr.split(';');
        const [nameValue, ...options] = cookieParts;
        const [name, value] = nameValue.split('=');
        
        if (name && value) {
          const cookieOptions: Record<string, string | boolean | number> = {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
          };
          
          for (const option of options) {
            const [key, val] = option.trim().split('=');
            const lowerKey = key.toLowerCase();
            if (lowerKey === 'path') cookieOptions.path = val || '/';
            else if (lowerKey === 'max-age') cookieOptions.maxAge = parseInt(val, 10);
            else if (lowerKey === 'expires') cookieOptions.expires = val;
            else if (lowerKey === 'domain') cookieOptions.domain = val;
            else if (lowerKey === 'httponly') cookieOptions.httpOnly = true;
            else if (lowerKey === 'secure') cookieOptions.secure = true;
            else if (lowerKey === 'samesite') cookieOptions.sameSite = val as 'lax' | 'strict' | 'none';
          }
          
          response.cookies.set(name.trim(), value.trim(), cookieOptions);
        }
      }
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
