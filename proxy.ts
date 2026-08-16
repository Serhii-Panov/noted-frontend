import { NextRequest, NextResponse } from "next/server";
import { parseCookie } from "cookie";
import { api } from "./lib/api/api";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Извлекаем куки напрямую из NextRequest
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 2. Если нет accessToken, но есть refreshToken — пытаемся обновить сессию
  if (!accessToken) {
    if (refreshToken) {
      try {
        // Build cookie header from all cookies
        const cookieHeader = request.cookies
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join('; ');

        const response = await api.get('/auth/session', {
          headers: {
            Cookie: cookieHeader,
          },
        });

        if (response?.headers && response.headers["set-cookie"]) {
          const setCookieHeader = response.headers["set-cookie"];
          const cookieArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          const redirectUrl = isPublicRoute
            ? new URL("/profile", request.url)
            : null;
          const nextResponse = redirectUrl
            ? NextResponse.redirect(redirectUrl)
            : NextResponse.next();

          for (const cookieStr of cookieArray) {
            // Parse cookie using cookie library
            const parsed = parseCookie(cookieStr);

            if (parsed) {
              const { name, value, Path, "Max-Age": maxAge } = parsed;
              
              if (name && value) {
                nextResponse.cookies.set(name, value, {
                  path: Path || "/",
                  maxAge: maxAge ? Number(maxAge) : undefined,
                  httpOnly: true,
                  secure: true,
                  sameSite: "lax",
                });
              }
            }
          }

          return nextResponse;
        }
      } catch (error) {
        console.error("Proxy session refresh failed:", error);
      }
    }

    // Если нет токена и страница приватная — редирект на /sign-in
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // 3. Если авторизованный пользователь заходит на /sign-in или /sign-up
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/notes/filter/all", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
