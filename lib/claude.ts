export const generateMemeDescription = async (pdfText: string): Promise<string> => {
  const response = await fetch('/api/generate-meme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdfText })
  });
  const data = await response.json();
  return data.description;
};