# eGain Technical Troubleshooting Chatbot

This project is a beginner-friendly chatbot prototype built for the eGain take-home assignment.
It focuses on one main scenario:

`Guiding a customer through a simple technical troubleshooting process`

The chatbot helps users with three common issues:
- Wi-Fi not working
- Device won't turn on
- Battery drains fast

It then asks whether the user is on `Mac` or `Windows` and guides them through simple troubleshooting steps.

## Project Goal

The goal of this project is to create a smooth and logical chatbot flow instead of building a large or overly complex system.

This prototype was designed to:
- keep the conversation simple
- guide the user one step at a time
- handle a few unexpected inputs
- provide clear next steps for troubleshooting

## Tools Used

- SvelteKit
- TypeScript
- Tailwind CSS
- npm

## How To Run This Project On Your Own Machine

Follow these steps in order.

### 1. Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/langeles014/chatbot-app.git
```

### 2. Open the project folder

```bash
cd chatbot-app
```

### 3. Install dependencies

```bash
npm install
```

This downloads everything the project needs in order to run.

### 4. Start the development server

```bash
npm run dev
```

After running that command, the terminal should show a local address similar to:

```bash
http://localhost:5173
```

Open that link in your browser.

## How To Test The Chatbot

Once the app is open in your browser, try the following:

### Test Path 1: Wi-Fi issue

1. Select `Wi-Fi not working`
2. Select `Mac` or `Windows`
3. Answer the follow-up questions
4. Confirm that the chatbot gives a troubleshooting step related to Wi-Fi settings

### Test Path 2: Device will not turn on

1. Select `Device won't turn on`
2. Select `Mac` or `Windows`
3. Answer the follow-up questions
4. Confirm that the chatbot gives a power-related troubleshooting step

### Test Path 3: Battery drains fast

1. Select `Battery drains fast`
2. Select `Mac` or `Windows`
3. Answer the follow-up questions
4. Confirm that the chatbot gives a battery-related troubleshooting step

## Error Handling To Try

You can also test a few unexpected inputs:

### 1. Blank input

Open the manual input option and try sending an empty message.

Expected result:
The chatbot should ask the user to enter a valid response.

### 2. Unsupported topic

Type something unrelated such as:

```text
Bluetooth problem
```

Expected result:
The chatbot should redirect the user back to the supported issue options.

### 3. Invalid yes/no answer

When the chatbot asks a yes-or-no question, type:

```text
maybe
```

Expected result:
The chatbot should ask the user for a clearer answer.

### 4. Long manual response

Type a response longer than 50 words.

Expected result:
The chatbot should ask the user to shorten the message.

## Useful Commands

```bash
npm run dev
```

Starts the local development server.

```bash
npm run check
```

Runs the Svelte and TypeScript checks.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

## Project Structure

Main files in this project:

- `src/routes/+page.svelte`  
  Main chatbot interface

- `src/lib/chatbot/data.ts`  
  Stores messages and preset button choices

- `src/lib/chatbot/engine.ts`  
  Controls the conversation flow

- `src/lib/chatbot/types.ts`  
  Defines shared chatbot types

- `src/lib/chatbot/validation.ts`  
  Handles simple input validation

- `assignment-notes.md`  
  Contains assignment notes, decision tree ideas, and slide outline

## Design Summary

This chatbot uses a guided decision-tree approach.

The user:
1. chooses an issue
2. chooses an operating system
3. answers short follow-up questions
4. receives a troubleshooting recommendation

The project assumes an enterprise environment:
- Windows users are treated as Windows 11 Enterprise users
- Mac users are treated as current macOS users

## Submission Notes

This project was built to match the eGain assignment requirements:
- conversation design
- working prototype
- error handling examples
- presentation support through notes and decision-tree planning

## Screenshots

Suggested screenshots to include for submission:
- chatbot home screen
- Wi-Fi troubleshooting flow
- battery troubleshooting flow
- one example of error handling
