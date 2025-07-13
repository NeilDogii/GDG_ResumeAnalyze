import PdfForm from "@/components/pdfPage/PdfForm";
import { FileText } from "lucide-react";
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
            <div className={`bg-white w-full relative h-full rounded-2xl text-black`}>
                <PdfForm />
            </div>
            </section>
        </main>
    )
}