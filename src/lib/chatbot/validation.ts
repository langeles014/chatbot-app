/*
**************************************************************
* GitHub ID: chatbot-app
* File: validation.ts
*
* Description: Holds simple input-checking helpers for blank,
* long, and expected chatbot user responses.
**************************************************************
*/

export function normalizeInput(value: string) {
  return value.trim().toLowerCase();
}

// user input cannot exceed 50 words
export function countWords(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 0;
  }

  return trimmedValue.split(/\s+/).length;
}

// no blank inputs
export function isBlankInput(value: string) {
  return normalizeInput(value).length === 0;
}

// validates if wordcount exceeds 50 words
export function isTooLongInput(value: string, maxWords = 50) {
  return countWords(value) > maxWords;
}

// query triggers similar words
export function matchesAny(input: string, values: string[]) {
  return values.some((value) => input.includes(value));
}

export function isYes(input: string) {
  return matchesAny(input, ["yes", "y"]);
}

export function isNo(input: string) {
  return matchesAny(input, ["no", "n"]);
}

// user is unsure of options
export function isUncertain(input: string) {
  return matchesAny(input, ["i don't know", "dont know", "not sure", "maybe"]);
}
