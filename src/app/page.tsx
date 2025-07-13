import { ArrowRight, FileText, Github } from "lucide-react";
import style from "./styles/grainGradiant.module.css"
import Link from "next/link";
export default function page() {
  return (
    <main>
      <nav className="w-full">
        <div className="bg-white m-2 rounded-2xl flex px-2">
          <h1 className="font-semibold text-xl flex  items-center p-5 font-sans">
            <FileText size={28} fill="black" color="white" className="-mt-0.5" /> Resulize
          </h1>
          <section id="quicklinks" className="h-full items-center my-5 pt-1 ml-4 hidden sm:flex gap-5">
            <Link href="" target="_blank" className="">LinkedIn</Link>
            <Link href="" target="_blank" className="">Github</Link>
            <Link href="" target="_blank" className="">Discord</Link>
            <Link href="" target="_blank" className="">Mail</Link>
          </section>
          <button className="ml-auto mr-5 bg-black text-white rounded-lg my-4 text-[14px] cursor-pointer hover:scale-105 transaction-all ease-in duration-100 px-3 font-sans ">Get Started</button>
        </div>
      </nav>
      <section className="h-dvh w-full px-2">
        <div className={`bg-black w-full relative h-full rounded-2xl text-white`}>
          <div className={`${style.grain} absolute top-0 left-0 w-full h-full rounded-2xl opacity-30 sm:opacity-30`} />
          <div className={`absolute top-0 left-0 w-full h-full rounded-2xl flex justify-center py-4 px-10`}>
            <section>
              <div className="text-white mt-28 sm:mt-36 mx-auto max-w-fit px-4 bg-gray-400/25 rounded-lg flex items-center gap-2 py-0.5 border border-white/30 shadow-sm">
                Now using Gemini 2.5 Flash
                <ArrowRight size={18} className="bg-white/25 rounded-md w-6" />
              </div>

              <div className="text-5xl sm:text-7xl mt-6 font-semibold sm:mt-9 h-fit sm:text-center">Optimize Your First <br /> Impression</div>
              <div className="text-sm text-white/50 mt-8 sm:mt-12 sm:max-w-2/3 mx-auto sm:text-center">Our AI-powered resume analyzer reviews your CV just like a recruiter would when scanning for missing keywords, formatting issues, and skill gaps. Get actionable insights to optimize your resume and land more interviews, faster.</div>
              <section className="mx-auto flex gap-2 mt-6 sm:justify-center">
                <Link
                href="/analyze"
                 className="bg-white rounded-lg text-black px-4 py-2 text-sm font-semibold cursor-pointer">
                  Get Started
                </Link>
                <button className="bg-white rounded-lg text-black px-3 py-2 text-sm font-semibold cursor-pointer flex items-center gap-1">
                  <Github size={18} className="-mt-0.5" /> Github Repo
                </button>
              </section>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

