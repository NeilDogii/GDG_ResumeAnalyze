"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


export default function PdfForm() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [prompt, setPrompt] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prompt && prompt != "") {
      axios.post("/api/getAIResponse", { text: prompt }).then((response) => {
        // console.log(response.data);
        // console.log(response.data.response.candidates[0].content.parts[0].text)
        setText(response.data.response.candidates[0].content.parts[0].text)
      })
    }
  }, [prompt])

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select a file first");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/parsePdf", {
      method: "POST",
      body: fd,
    });

    const json = await res.json();
    if (res.ok) {
      alert(`Uploaded: ${json.filename}`);
      console.log(json.text)
      setPrompt(json.text)
    }
    else alert(`Error: ${json.error}`);
  };

  if (!text || text == "") {
    return (
      <form onSubmit={upload}>
        <input ref={inputRef} type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="submit">Upload PDF</button>
        <div onClick={() => {
          inputRef.current?.click();
        }}>e</div>
      </form>
    );
  } else {
    return (
      <main>
        <p>{text}</p>
      </main>
    )
  }
}
//response.candidates[0].content.parts[0].text
