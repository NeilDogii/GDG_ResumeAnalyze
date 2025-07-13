"use client";

import React, { useEffect, useState } from "react";
import Popup from "./base/Popup";
import axios from "axios";
import { Loader2, User2 } from "lucide-react";
import { marked } from "marked";
import { generatePromptContent } from "@/lib/constants/PromptTypeMap";

export default function AIPromptPopup({
  extractedText,
  promptType,
  isOpen,
  setIsOpen,
}: {
  extractedText: string;
  promptType: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if(!isOpen) {
        setSubmitted(false);
        setResponse("")
    }
  }, [isOpen])

  function submitForm(formData: FormData) {
    setSubmitted(true);
    if (extractedText && extractedText) {
        const role = formData.get("role") as string
        const prefix = generatePromptContent(role || "web dev", promptType)
      axios
        .post("/api/getAIResponse", { text: prefix + " " + extractedText})
        .then(async (response) => {
          if (response.data.response.candidates[0].content.parts[0].text) {
            const parsed = await marked.parse(
              response.data.response.candidates[0].content.parts[0].text || ""
            );
            setResponse(parsed);
          }
        });
    }
  }
  return (
    <Popup onChangeShowPopup={setIsOpen} showPopup={isOpen}>
      <h2 className="text-xl font-bold">Generating Prompt</h2>
      <p className="text-sm text-black/50">
        All responses are AI generated, please check/validate necessary data.
      </p>
      {!submitted ? (
        <form
          className="mt-4"
          action={(formData) => {
            submitForm(formData);
          }}
        >
          <label htmlFor="role" className="font-bold">
            Your Job Role
            <p className="text-xs font-normal mb-1 text-black/40">
              Write down your job role tile for which you are making the resume
              for
            </p>
          </label>
          <input
            name="role"
            type="text"
            className="w-full shadow border-1 border-black/10 min-h-10 rounded-lg"
          />
          <section className="flex gap-3 mt-4 justify-end">
            <button
              type="reset"
              className="underline underline-offset-4 text-black/60 cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-black px-3 py-1 text-white cursor-pointer rounded-sm"
            >
              Submit
            </button>
          </section>
        </form>
      ) : (
        <section className="mt-5 font-semibold">
          {response ? (
           <div className = "flex gap-4">
            <User2 className = "bg-blue-500 text-white rounded-full min-w-12 h-12"/>
            <div className = "rounded-xl p-4 shadow-lg"  dangerouslySetInnerHTML={{ __html: response }}></div>
           </div>
          ) : (
            <div className="flex gap-2 text-black/70">
              <Loader2 className="animate-spin" />
              <p>Loading your response</p>
            </div>
          )}
        </section>
      )}
    </Popup>
  );
}
