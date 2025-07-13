"use client";
import { useEffect, useRef, useState } from "react";
import { CloudUpload, Loader2, Sparkles } from "lucide-react";
import AIPromptPopup from "../popups/AIPromptPopup";

const AIPromptOptions = [
  {
    label: "Recommend Keywords",
    value: "recommendKeywords",
  },
  {
    label: "Extract Keywords",
    value: "extractKeywords",
  },
  {
    label: "Recommend Corrections",
    value: "recommendCorrections",
  },
  {
    label: "Resume Rating",
    value: "resumeRating",
  },
  {
    label: "Spot Grammatical Mistakes",
    value: "spotGrammaticalMistakes",
  },
];

export default function PdfForm() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [promptType, setPromptType] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async () => {
    if (!file) return alert("Select a file first");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/parsePdf", {
      method: "POST",
      body: fd,
    });

    const json = await res.json();
    if (res.ok) {
      setPrompt(json.text);
    } else alert(`Error: ${json.error}`);
  };

  useEffect(() => {
    if (file) {
      upload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const promptSubmit = (promptTypeArgument: string) => {
    if (!dialogOpen && prompt) {
      setPromptType(promptTypeArgument);
      setDialogOpen(true);
    }
  };
  return (
    <>
      <main>
        <h1 className="text-4xl font-bold">Lets Get Started</h1>
        <p className="text-black/70 text-sm">
          Let&apos;s start by uploading your resume to fetch the content of the
          file
        </p>
        {!prompt || prompt == "" ? (
          <form
            onClick={() => {
              inputRef.current?.click();
            }}
            className="border-1 border-dashed border-black/30 cursor-pointer rounded-xl h-[60vh] w-full mt-5 flex flex-col items-center justify-center"
          >
            {!file ? (
              <>
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <CloudUpload
                  size={60}
                  className="text-black/60"
                  strokeWidth={1}
                />
                <p className="text-black/60">Click to upload a file</p>
                <p className="text-xs max-w-[60%] text-center text-black/50">
                  The resume should be in pdf format and give it an appropiate
                  name for recruiter&apos;s convenience{" "}
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 text-black/60">
                <Loader2 className="animate-spin" />
                <p>Extracting text from {file.name}</p>
              </div>
            )}
          </form>
        ) : (
          <section className="mt-5">
            <h1 className="text-2xl font-bold">Extraction Complete!</h1>
            <div className="text-xs text-black/60 border-black/40 border-dashed p-3 border-1 rounded-xl">
              {prompt}
            </div>
            <div className="relative mt-5 flex gap-2 border-1 border-black/40 border-dashed p-3 rounded-xl pt-6">
              <div className=" text-black/80 absolute -top-3 left-4 bg-white px-1 flex gap-1">
                <Sparkles />
                AI Powered Prompts
              </div>
              {AIPromptOptions &&
                AIPromptOptions.map((option, index) => (
                  <button
                    key={index}
                    className="bg-black text-white py-1.5 px-3 rounded-lg cursor-pointer"
                    onClick={() => {
                      promptSubmit(option.value);
                    }}
                  >
                    {option.label || ""}
                  </button>
                ))}
            </div>
          </section>
        )}
      </main>
      <AIPromptPopup
        extractedText={prompt}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        promptType={promptType}
      />
    </>
  );
}
