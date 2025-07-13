//constants
import PdfForm from "@/components/pdfPage/PdfForm";
import { GEMINI_API_KEY } from "@/lib/environment/gemini";

//libraries
import { GoogleGenAI } from "@google/genai";
import {marked} from "marked";

export default function page(){
  return <PdfForm />
}

// export default async function test() {
//     const response = await main();
//     const parsed = marked.parse(response || "");
//     return parsed;

//     return <div dangerouslySetInnerHTML={{__html: parsed}} />
// }


// const options: PDFExtractOptions = {}; /* see below */



