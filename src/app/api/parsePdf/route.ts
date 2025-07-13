import PDFParser from 'pdf2json';

export async function POST(req: Request) {
  const file = (await req.formData()).get('file') as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new PDFParser();

  return await new Promise((resolve, reject) => {
    parser.on('pdfParser_dataError', reject);
    parser.on('pdfParser_dataReady', pdfData => {
      const text = pdfData.Pages
        .flatMap((p: any) => p.Texts.map((t: any) => decodeURIComponent(t.R[0].T)))
        .join(' ');
      resolve(new Response(JSON.stringify({ text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    });
    parser.parseBuffer(buffer);
  });
}


