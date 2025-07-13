import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "@/lib/environment/gemini";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY(),
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
    });

    return NextResponse.json({ response }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



