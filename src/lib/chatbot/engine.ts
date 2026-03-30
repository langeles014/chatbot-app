/*
**************************************************************
* GitHub ID: chatbot-app
* File: engine.ts
*
* Description: Contains the main chatbot decision-tree logic and
* returns the next step and responses based on user input.
**************************************************************
*/

import { issuePrompt } from "./data";
import type { ChatState, Platform, Step } from "./types";
import { isNo, isUncertain, isYes, matchesAny } from "./validation";

export function getNextChatState(
  currentStep: Step,
  input: string,
  selectedPlatform: Platform
): ChatState {
  // Restart returns the conversation to the first troubleshooting step.
  if (input === "restart") {
    return {
      currentStep: "issue-select",
      messagesToAdd: [issuePrompt],
      selectedPlatform: null
    };
  }

  if (currentStep === "issue-select") {
    return handleIssueSelection(input);
  }

  return handleYesNoStep(currentStep, input, selectedPlatform);
}

function handleIssueSelection(input: string): ChatState {
  // First, identify which troubleshooting path the user needs.
  if (matchesAny(input, ["wifi", "wi-fi", "internet", "network"])) {
    return {
      currentStep: "wifi-os",
      messagesToAdd: ["Are you on Mac or Windows?"],
      selectedPlatform: null
    };
  }

  if (matchesAny(input, ["power", "turn on", "wont turn on", "won't turn on", "startup"])) {
    return {
      currentStep: "power-os",
      messagesToAdd: ["Are you on Mac or Windows?"],
      selectedPlatform: null
    };
  }

  if (matchesAny(input, ["battery", "charging", "drains fast", "dies quickly"])) {
    return {
      currentStep: "battery-os",
      messagesToAdd: ["Are you on Mac or Windows?"],
      selectedPlatform: null
    };
  }

  if (matchesAny(input, ["help", "options", "menu"])) {
    return {
      currentStep: "issue-select",
      messagesToAdd: [
        "No problem. I can help with Wi-Fi, power, or battery issues.",
        issuePrompt
      ],
      selectedPlatform: null
    };
  }

  return {
    currentStep: "issue-select",
    messagesToAdd: [
      "Sorry, I could not understand that. Please choose one of these issues: Wi-Fi not working, device won't turn on, or battery drains fast."
    ],
    selectedPlatform: null
  };
}

function handleYesNoStep(
  currentStep: Step,
  input: string,
  selectedPlatform: Platform
): ChatState {
  // These steps narrow the troubleshooting flow before the yes/no questions begin.
  if (currentStep === "wifi-os") {
    if (matchesAny(input, ["mac", "macos", "apple"])) {
      return {
        currentStep: "wifi-check",
        messagesToAdd: [
          "On your Mac, open Control Center or System Settings > Wi-Fi. Does it show that you're connected to a network?"
        ],
        selectedPlatform: "mac"
      };
    }

    if (matchesAny(input, ["windows", "pc"])) {
      return {
        currentStep: "wifi-check",
        messagesToAdd: [
          "On Windows 11 Enterprise, open Settings > Network & internet > Wi-Fi. Does it show that you're connected to a network?"
        ],
        selectedPlatform: "windows"
      };
    }

    return {
      currentStep,
      messagesToAdd: ["Please choose your operating system: Mac or Windows."],
      selectedPlatform
    };
  }

  if (currentStep === "power-os") {
    if (matchesAny(input, ["mac", "macos", "apple"])) {
      return {
        currentStep: "power-check",
        messagesToAdd: [
          "On your Mac, when you press the power button, do you see any lights, hear the startup sound, or notice keyboard backlighting?"
        ],
        selectedPlatform: "mac"
      };
    }

    if (matchesAny(input, ["windows", "pc"])) {
      return {
        currentStep: "power-check",
        messagesToAdd: [
          "On your Windows 11 Enterprise device, when you press the power button, do you see any lights, fan movement, or display activity?"
        ],
        selectedPlatform: "windows"
      };
    }

    return {
      currentStep,
      messagesToAdd: ["Please choose your operating system: Mac or Windows."],
      selectedPlatform
    };
  }

  if (currentStep === "battery-os") {
    if (matchesAny(input, ["mac", "macos", "apple"])) {
      return {
        currentStep: "battery-check",
        messagesToAdd: [
          "On your Mac, is screen brightness high or are several apps open? You can check in Control Center and Activity Monitor."
        ],
        selectedPlatform: "mac"
      };
    }

    if (matchesAny(input, ["windows", "pc"])) {
      return {
        currentStep: "battery-check",
        messagesToAdd: [
          "On your Windows 11 Enterprise device, is screen brightness high or are several apps open? You can check in Quick Settings and Task Manager."
        ],
        selectedPlatform: "windows"
      };
    }

    return {
      currentStep,
      messagesToAdd: ["Please choose one operating system: Mac or Windows."],
      selectedPlatform
    };
  }

  if (isUncertain(input)) {
    return {
      currentStep,
      messagesToAdd: [
        "That's okay. Choose the answer that seems closest, or press Start over to pick a different issue."
      ],
      selectedPlatform
    };
  }

  const yes = isYes(input);
  const no = isNo(input);

  // For troubleshooting questions, keep the expected answers simple.
  if (!yes && !no) {
    return {
      currentStep,
      messagesToAdd: ["Please answer with yes or no so I can keep troubleshooting."],
      selectedPlatform
    };
  }

  if (currentStep === "wifi-check") {
    if (yes) {
      return {
        currentStep: "wifi-router",
        messagesToAdd: [
          selectedPlatform === "windows"
            ? "Great. On Windows 11 Enterprise, if needed you can also go to Settings > Network & internet > Advanced network settings before we continue. Have you already restarted your router in the last 5 minutes?"
            : "Great. On macOS, if needed you can also review System Settings > Wi-Fi before we continue. Have you already restarted your router in the last 5 minutes?"
        ],
        selectedPlatform
      };
    }

    return {
      currentStep: "done",
      messagesToAdd: [
        selectedPlatform === "windows"
          ? "Please go to Settings > Network & internet > Wi-Fi, connect to the correct network, and then try loading a website again."
          : "Please open System Settings > Wi-Fi, connect to the correct network, and then try loading a website again.",
        "If it still fails after connecting, restart the chat and choose Wi-Fi again."
      ],
      selectedPlatform
    };
  }

  if (currentStep === "wifi-router") {
    if (yes) {
      return {
        currentStep: "done",
        messagesToAdd: [
          selectedPlatform === "windows"
            ? "The next best step is to go to Settings > Network & internet > Wi-Fi > Manage known networks, forget the network, and reconnect with your company Wi-Fi password."
            : "The next best step is to open System Settings > Wi-Fi, forget the network, and reconnect with your company Wi-Fi password."
        ],
        selectedPlatform
      };
    }

    return {
      currentStep: "done",
      messagesToAdd: ["Restart your router, wait about 30 seconds, and test the connection again."],
      selectedPlatform
    };
  }

  if (currentStep === "power-check") {
    if (yes) {
      return {
        currentStep: "power-outlet",
        messagesToAdd: ["Try a different power outlet or docking power source. Does the device respond there?"],
        selectedPlatform
      };
    }

    return {
      currentStep: "done",
      messagesToAdd: [
        selectedPlatform === "windows"
          ? "Connect the device to power for 15 minutes, then hold the power button for 10 seconds. If it starts, open Settings > System > Power & battery to confirm it is charging."
          : "Connect the Mac to power for 15 minutes, then hold the power button for 10 seconds. If it starts, open System Settings > Battery to confirm it is charging."
      ],
      selectedPlatform
    };
  }

  if (currentStep === "power-outlet") {
    if (yes) {
      return {
        currentStep: "done",
        messagesToAdd: [
          "That suggests the first outlet or charger may be the problem. Keep using the working outlet or replace the charger."
        ],
        selectedPlatform
      };
    }

    return {
      currentStep: "done",
      messagesToAdd: [
        "The device may need hardware support because it still does not respond with known power."
      ],
      selectedPlatform
    };
  }

  if (currentStep === "battery-check") {
    if (yes) {
      return {
        currentStep: "battery-cable",
        messagesToAdd: [
          selectedPlatform === "windows"
            ? "Lower brightness in Quick Settings, open Task Manager to close unused apps, and turn on Battery saver in Settings > System > Power & battery. Is the battery still draining unusually fast?"
            : "Lower brightness in Control Center, open Activity Monitor to review heavy apps, and turn on Low Power Mode in System Settings > Battery. Is the battery still draining unusually fast?"
        ],
        selectedPlatform
      };
    }

    return {
      currentStep: "battery-cable",
      messagesToAdd: [
        selectedPlatform === "windows"
          ? "Try Battery saver in Settings > System > Power & battery first. After that, is the battery still draining unusually fast?"
          : "Try Low Power Mode in System Settings > Battery first. After that, is the battery still draining unusually fast?"
      ],
      selectedPlatform
    };
  }

  if (currentStep === "battery-cable") {
    if (yes) {
      return {
        currentStep: "done",
        messagesToAdd: [
          selectedPlatform === "windows"
            ? "The battery may be aging. My next recommendation is to review Settings > System > Power & battery and then open a support ticket if the battery health still looks poor."
            : "The battery may be aging. My next recommendation is to review System Settings > Battery and then book support if the battery health still looks poor."
        ],
        selectedPlatform
      };
    }

    return {
      currentStep: "done",
      messagesToAdd: [
        "Good sign. The issue was likely caused by screen brightness or background apps."
      ],
      selectedPlatform
    };
  }

  return {
    currentStep,
    messagesToAdd: [],
    selectedPlatform
  };
}
