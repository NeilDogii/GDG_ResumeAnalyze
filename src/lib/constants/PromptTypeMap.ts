export function generatePromptContent(role: string, promptType: string) {
  let prompt = "Hello";
  switch (promptType) {
    case "recommendKeywords":
      prompt =
        "Hello, this is the text which i have extracted from my cv, can you view it and give me some keyword recommendations based on the cv content and for the job role " +
        role +
        "? Try to keep the response as small as possible including the starting text/intro, and the keywords recommended should not already be present in the cv";
      break;
    case "extractKeywords":

      prompt =
        "Hello, this is the text which i have extracted from my cv, can you view it and extact some keywords which are detected by the ATS system based on the cv content and for the job role " +
        role +
        "? Try to keep the response as small as possible including the starting text/intro, and the keywords recommended should already be present in the cv";
      break;

    case "recommendCorrections":
      prompt =
        "Hello, this is the text which i have extracted from my cv, can you view it and give me some corrections based on the cv content and for the job role " +
        role +
        "? Try to keep the response as small as possible including the starting text/intro.";
      break;

    case "resumeRating":
      prompt =
        "Hello, this is the text which i have extracted from my cv, can you view it and give me some rating based on the cv content and for the job role " +
        role +
        "? Try to keep the response as small as possible including the starting text/intro";
      break;

    case "spotGrammaticalMistakes":
      prompt =
        "Hello, this is the text which i have extracted from my cv, can you view it and give me some grammatical mistakes based on the cv content and for the job role " +
        role +
        "? Try to keep the response as small as possible including the starting text/intro.";
      break;
  }
  return prompt;
}
