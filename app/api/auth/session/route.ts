import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    if (!cookieHeader) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const apiRes = await api.get("auth/session", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { success: false, error: error.response?.data },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }
}