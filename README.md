# eGain Technical Troubleshooting Chatbot

This project is a beginner-friendly chatbot prototype built for the eGain take-home assignment.

I decided to go with the chatbot that focuses on one assignment scenario:
`Guiding a customer through a simple technical troubleshooting process`

It helps users troubleshoot three common issues:
- Wi-Fi not working
- Device won't turn on
- Battery drains fast

## Setup / Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/langeles014/chatbot-app.git
```
### 2. Move into the project folder
``` bash
cd chatbot-app
```

### 3. Install dependencies
``` bash
npm install
```

### 4. Start the development server
``` bash
npm run dev
```
### 5. Open the app
After the server starts, open the local link shown in the terminal, 
``` bash
http://localhost:5173
```
## My Approach
I designed this chatbot as a simple decision-tree troubleshooting flow.

Instead of using a fully open-ended conversation, the chatbot guides the user step by step through a small set of 
technical support options. The user first selects an issue, then selects whether they are using Mac or Windows, 
and then answers short follow-up questions. 

Based on those responses, the chatbot gives a focused troubleshooting recommendation.

I also added basic error handling for unexpected input, including:

- blank messages
- unsupported issue types
- unclear yes/no responses
- manual responses longer than 50 words

  
## Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS

### Main Project Files
src/routes/+page.svelte - **main chatbot interface**

src/lib/chatbot/data.ts - **chatbot messages and preset choices**

src/lib/chatbot/engine.ts - **chatbot decision-tree logic**

src/lib/chatbot/types.ts - **shared chatbot types**

src/lib/chatbot/validation.ts - **input validation helpers**

### Notes
This project was built to keep the user flow simple, clear, and easy to test.



