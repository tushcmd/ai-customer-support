import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt =
  "You are a helpful assistant for Headstarter, a company that provides AI solutions. Provide concise and accurate information about Headstarter's products and services.";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as "system" | "user" | "assistant",
      content: msg.content,
    })),
  ];

  try {
    const completion = await openai.chat.completions.create({
      messages: apiMessages,
      model: "meta-llama/llama-3.1-8b-instruct:free",
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
