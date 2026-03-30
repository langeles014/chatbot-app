/*
**************************************************************
* GitHub ID: chatbot-app
* File: types.ts
*
* Description: defines the chatbot’s shared data types.
**************************************************************
*/
export type Sender = "bot" | "user";

export type Step =
  | "issue-select"
  | "wifi-os"
  | "wifi-check"
  | "wifi-router"
  | "power-os"
  | "power-check"
  | "power-outlet"
  | "battery-os"
  | "battery-check"
  | "battery-cable"
  | "done";

export type Message = {
  sender: Sender;
  text: string;
};

export type Platform = "mac" | "windows" | null;

export type Choice = {
  label: string;
  value: string;
  style: string;
};

export type ChatState = {
  currentStep: Step;
  messagesToAdd: string[];
  selectedPlatform: Platform;
};
