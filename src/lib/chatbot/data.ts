/*
**************************************************************
* GitHub ID: chatbot-app
* File: data.ts
*
* Description: stores the chatbot’s preset content. 
* It holds the welcome message, the starting prompt, and 
* the button options the user can choose at each step, 
* like issue choices, OS, Y/N responses, and restart.
**************************************************************
*/
import type { Choice, Message, Step } from "./types";

export const welcomeMessage =
  "Hi there, I'm LABot here to help on issues with your machine."

export const issuePrompt =
  "What seems to be the issue today? You can type it or choose one of the options below.";

// Auto-generated text to greet
export const initialMessages: Message[] = [
  { sender: "bot", text: welcomeMessage },
  { sender: "bot", text: issuePrompt }
];

// Common IT issues client might face
export const issueChoices: Choice[] = [
  { label: "Wi-Fi connectivity", value: "wifi", style: "bg-sky-600 text-white" },
  { label: "Device won't boot", value: "power", style: "bg-slate-800 text-white" },
  { label: "Battery drains fast", value: "battery", style: "bg-amber-500 text-slate-950" }
];

// narrow down decision tree for better decision making
export const osChoices: Choice[] = [
  { label: "Mac", value: "mac", style: "bg-zinc-800 text-white" },
  { label: "Windows", value: "windows", style: "bg-blue-700 text-white" }
];

// general Y/N query
export const yesNoChoices: Choice[] = [
  { label: "Yes", value: "yes", style: "bg-emerald-500 text-white" },
  { label: "No", value: "no", style: "bg-rose-500 text-white" }
];

// resets interaction with client
export const restartChoice: Choice[] = [
  { label: "Start over", value: "restart", style: "bg-indigo-600 text-white" }
];

export function getChoicesForStep(step: Step): Choice[] {
  if (step === "issue-select") {
    return issueChoices;
  }

  if (step === "wifi-os" || step === "power-os" || step === "battery-os") {
    return osChoices;
  }

  if (step === "done") {
    return restartChoice;
  }

  return yesNoChoices;
}
