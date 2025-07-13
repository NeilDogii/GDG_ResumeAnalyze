export function GEMINI_API_KEY() {
    try {
        const APIKEY: string = process.env.GEMINI_API_KEY as string;
        if (!APIKEY) {
            throw new Error("Missing GEMINI_API_KEY, please put GEMINI_API_KEY in your \".env\" file ")
        }
        return APIKEY;
    } catch (err) {
        console.error(err);
        throw new Error("Missing GEMINI_API_KEY, please put GEMINI_API_KEY in your \".env\" file ")
    }
}