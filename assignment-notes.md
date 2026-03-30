<!--
/**************************************************************
* GitHub ID: chatbot-app
* File: assignment-notes.md
*
* Description: Summarizes the chatbot scenario, decision tree,
* error handling, and presentation points for the assignment.
**************************************************************/
-->

# eGain Chatbot Assignment Notes

## Scenario Choice

This prototype uses scenario 3: guiding a customer through a simple technical troubleshooting process.

## Decision Tree

```text
Start
-> Ask user to choose an issue
   -> Wi-Fi not working
      -> Ask: Mac or Windows?
         Assumption: Windows users are on Windows 11 Enterprise and Mac users are on the latest macOS
         -> Ask: connected to network?
            -> No -> guide user to Wi-Fi settings and connect -> End
            -> Yes -> Ask: restarted router?
               -> No -> restart router -> End
               -> Yes -> forget network and reconnect from settings -> End
   -> Device won't turn on
      -> Ask: Mac or Windows?
         Assumption: Windows users are on Windows 11 Enterprise and Mac users are on the latest macOS
         -> Ask: any lights or sound?
            -> No -> charge for 15 minutes and verify power in system settings after startup -> End
            -> Yes -> Ask: works in another outlet?
               -> Yes -> first outlet or charger is the issue -> End
               -> No -> recommend hardware support -> End
   -> Battery drains fast
      -> Ask: Mac or Windows?
         Assumption: Windows users are on Windows 11 Enterprise and Mac users are on the latest macOS
         -> Ask: brightness high or many apps open?
            -> Yes -> lower brightness, check Task Manager or Activity Monitor, test again
            -> No -> turn on Battery Saver or Low Power Mode, test again
         -> Ask: still draining fast?
            -> No -> likely background apps or brightness -> End
            -> Yes -> recommend battery health check in settings or support -> End
```

## Error-Handling Examples

1. Blank input
   - If the user sends an empty message, the bot says it did not catch the input and asks the user to type or use a button.

2. Uncertain input
   - If the user types "I don't know" or "not sure" during a yes-or-no step, the bot reassures the user and asks them to choose the closest answer.

3. Unsupported topic
   - If the user asks about something outside Wi-Fi, power, or battery, the bot redirects them to the supported issue categories.

4. Long manual input
   - If the user enters more than 50 words, the bot blocks the message and asks for a shorter response so it can focus on one issue at a time.

## Slide Outline

### Slide 1: Problem and Goal

- Build a simple chatbot for technical troubleshooting
- Keep the conversation short, clear, and easy to follow
- Help users reach a next step instead of giving long answers

### Slide 2: Design Choices

- Used three common issue types: Wi-Fi, power, battery
- Asked for Mac or Windows before troubleshooting to narrow the path
- Used decision-tree logic with short follow-up questions and OS-specific guidance
- Added quick-reply buttons to reduce typing and confusion
- Added a 50-word limit for manual input so the chatbot stays focused on one issue at a time

### Slide 3: Technical Implementation

- Built with SvelteKit and Tailwind CSS
- Used a step-based state system to control conversation flow and remember the selected operating system
- Stored chat messages in an array and updated preset reply buttons at each step

### Slide 4: Challenges and Improvements

- Challenge: handling unexpected user input without breaking the flow
- Challenge: keeping the bot focused when users type long manual responses
- Challenge: keeping the chatbot simple enough for a short demo
- With more time: add more issue categories, save chat history, and connect to a real support knowledge base
