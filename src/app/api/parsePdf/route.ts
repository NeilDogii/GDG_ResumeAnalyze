import PDFParser, { Page, Text } from "pdf2json";

export async function POST(req: Request): Promise<Response> {
  const file = (await req.formData()).get("file") as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new PDFParser();

  return await new Promise((resolve, reject) => {
    parser.on("pdfParser_dataError", reject);
    parser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.flatMap((p: Page) =>
        p.Texts.map((t: Text) => decodeURIComponent(t.R[0].T))
      ).join(" ");
      resolve(
        new Response(JSON.stringify({ text }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    });
    parser.parseBuffer(buffer);
  });
}
