// app/api/generate-meme/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pdfText } = await req.json();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Create a humorous meme description for this scientific paper: ${pdfText}`
        }]
      })
    });
    
    const data = await response.json();
    return NextResponse.json({ description: data.content[0].text });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}