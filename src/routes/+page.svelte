<!--
/**************************************************************
* GitHub ID: chatbot-app
* File: +page.svelte
*
* Description: Renders the main chatbot interface and connects the
* guided troubleshooting UI to the chatbot state and logic.
**************************************************************/
-->

<script lang="ts">
  import { getChoicesForStep, initialMessages } from "$lib/chatbot/data";
  import { getNextChatState } from "$lib/chatbot/engine";
  import type { Choice, Message, Platform, Step } from "$lib/chatbot/types";
  import {
    isBlankInput,
    isTooLongInput,
    normalizeInput,
  } from "$lib/chatbot/validation";

  let messages: Message[] = [...initialMessages];

  let userInput = "";
  let currentStep: Step = "issue-select";
  let selectedPlatform: Platform = null;
  // The UI only shows the preset responses for the current step.
  let currentChoices: Choice[] = getChoicesForStep("issue-select");
  // Manual typing is available as a fallback when the preset buttons are not enough.
  let showManualInput = false;
  let chatContainer: HTMLDivElement;

  function sendMessage() {
    const normalizedInput = normalizeInput(userInput);

    if (isBlankInput(userInput)) {
      addBotMessage(
        "I didn't catch that. Please type your issue or choose one of the buttons."
      );
      return;
    }

    if (isTooLongInput(userInput, 50)) {
      addBotMessage(
        "Please keep your message under 50 words so the chatbot can handle one issue at a time."
      );
      return;
    }

    addUserMessage(userInput.trim());
    userInput = "";
    respondToInput(normalizedInput);
  }

  function selectChoice(value: string, label = value) {
    showManualInput = false;
    addUserMessage(label);
    respondToInput(normalizeInput(value));
  }

  function addUserMessage(text: string) {
    messages = [...messages, { sender: "user", text }];
    scrollToBottom();
  }

  function addBotMessage(text: string) {
    messages = [...messages, { sender: "bot", text }];
    scrollToBottom();
  }

  function respondToInput(input: string) {
    const nextState = getNextChatState(currentStep, input, selectedPlatform);

    if (input === "restart") {
      resetChat();
      return;
    }

    currentStep = nextState.currentStep;
    selectedPlatform = nextState.selectedPlatform;
    // Replace the old reply buttons with the next step's preset options.
    currentChoices = getChoicesForStep(currentStep);
    showManualInput = false;

    nextState.messagesToAdd.forEach(addBotMessage);
  }

  function getStepLabel() {
    if (currentStep === "issue-select") return "Common issues";
    if (currentStep === "wifi-os")
      return "Choose your operating system for Wi-Fi help";
    if (currentStep === "power-os")
      return "Choose your operating system for power help";
    if (currentStep === "battery-os")
      return "Choose your operating system for battery help";
    if (currentStep === "done") return "Restart the chatbot";
    return "Choose your answer";
  }

  function useStackedChoices() {
    return currentStep === "issue-select";
  }

  function resetChat() {
    messages = [...initialMessages];
    userInput = "";
    currentStep = "issue-select";
    selectedPlatform = null;
    currentChoices = getChoicesForStep("issue-select");
    showManualInput = false;
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      chatContainer?.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }
</script>

<svelte:head>
  <title>LABot | Chatbot Demo</title>
</svelte:head>

<div
  class="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#f5f5f7_55%,_#ececec)] px-4 py-10 text-[var(--egain-text)]"
>
  <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_420px]">
    <section
      class="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur"
    >
      <p
        class="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--egain-primary)]"
      >
        eGain IT Demo
      </p>
      <h1
        class="mt-4 max-w-2xl text-4xl font-black tracking-tight text-[var(--egain-dark)] sm:text-5xl"
      >
        Simple technical troubleshooting chatbot
      </h1>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <article
          class="rounded-3xl border border-[var(--egain-border)] bg-[var(--egain-surface-soft)] p-5"
        >
          <p
            class="text-md uppercase tracking-[0.25em] text-[var(--egain-primary)]"
          >
            Error handling
          </p>
          <p class="mt-3 text-xl font-semibold text-[var(--egain-dark)]">
            Blank input, uncertain input, and safe message limits
          </p>
        </article>
        <article
          class="rounded-3xl border border-[var(--egain-border)] bg-[#f8eef4] p-5"
        >
          <p
            class="text-sm uppercase tracking-[0.25em] text-[var(--egain-primary)]"
          >
            Conversation paths
          </p>
          <p class="mt-3 text-xl font-semibold text-[var(--egain-dark)]">
            Wi-Fi, power, battery
          </p>
        </article>
      </div>

      <div
        class="mt-8 rounded-[1.75rem] border border-[var(--egain-border)] bg-[#fafafa] p-6"
      >
        <h2 class="text-lg font-bold text-[var(--egain-dark)]">Design notes</h2>
        <ul
          class="mt-4 space-y-3 text-sm leading-7 text-[var(--egain-text-muted)]"
        >
          <li>
            The bot starts with three clear issue categories so the user is
            never stuck wondering what to ask.
          </li>
          <li>
            Each branch uses short follow-up questions to keep the flow simple
            and easy to present.
          </li>
          <li>
            When the user types something unexpected, the bot redirects them
            instead of failing silently.
          </li>
        </ul>
      </div>
    </section>

    <section
      class="flex h-[720px] flex-col overflow-hidden rounded-[2rem] border border-[var(--egain-border)] bg-[var(--egain-surface)] shadow-[0_30px_80px_rgba(15,23,42,0.14)]"
    >
      <div
        class="flex items-center justify-between border-b border-[var(--egain-border)] bg-[var(--egain-dark)] px-6 py-5 text-white"
      >
        <h2 class="text-2xl font-bold">LABot</h2>
        <button
          class="text-sm font-semibold text-[#f3d7ea] underline-offset-4 transition hover:text-white hover:underline"
          onclick={resetChat}
        >
          Start over
        </button>
      </div>

      <div
        bind:this={chatContainer}
        class="flex-1 space-y-4 overflow-y-auto bg-[#f7f7f7] px-4 py-5"
      >
        {#each messages as msg}
          <div
            class={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              class={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                msg.sender === "user"
                  ? "rounded-br-md bg-[var(--egain-primary)] text-white"
                  : "rounded-bl-md border border-[var(--egain-border)] bg-white text-[var(--egain-text-muted)]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        {/each}
      </div>

      <div class="border-t border-[var(--egain-border)] bg-white p-4">
        <div class="mb-4 rounded-2xl bg-[#faf5f8] p-4">
          <p
            class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--egain-text-muted)]"
          >
            {getStepLabel()}
          </p>
          {#if currentStep === "issue-select"}
            <div class="space-y-3">
              {#each currentChoices as choice}
                <button
                  class={`w-full rounded-2xl px-4 py-4 text-left text-sm font-semibold shadow-sm transition hover:scale-[1.02] ${choice.style}`}
                  onclick={() => selectChoice(choice.value, choice.label)}
                >
                  <span class="mt-1 block text-base">{choice.label}</span>
                </button>
              {/each}
            </div>
          {:else}
            <div class="flex flex-wrap gap-2">
              {#each currentChoices as choice}
                <button
                  class={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition hover:scale-[1.02] ${choice.style}`}
                  onclick={() => selectChoice(choice.value, choice.label)}
                >
                  {choice.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        {#if showManualInput}
          <label
            class="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--egain-text-muted)]"
            for="chat-input"
          >
            Type your answer manually
          </label>
          <div class="flex gap-3">
            <input
              id="chat-input"
              class="flex-1 rounded-2xl border border-[var(--egain-border)] px-4 py-3 text-sm outline-none transition focus:border-[var(--egain-primary)]"
              bind:value={userInput}
              placeholder="Example: wifi, Mac, yes, not sure"
              onkeydown={(event) => event.key === "Enter" && sendMessage()}
            />
            <button
              class="rounded-2xl bg-[var(--egain-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--egain-primary-soft)]"
              onclick={sendMessage}
            >
              Send
            </button>
          </div>
        {:else}
          <button
            class="text-sm font-semibold text-[var(--egain-text-muted)] underline-offset-4 transition hover:text-[var(--egain-dark)] hover:underline"
            onclick={() => (showManualInput = true)}
          >
            Type manually instead
          </button>
        {/if}
      </div>
    </section>
  </div>
</div>
