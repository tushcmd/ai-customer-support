# AI Customer Chat Bot

## Project Overview

This is an AI-powered customer support chatbot using Next.js and the OpenAI API.

## Technologies

- Next.js - React Framework
- Shadcn UI - Components
- Next-auth - Authentication
- Prisma - ORM
- PostgreSQL - Database
- Neon - Database Hosting
- OpenAI - LLM(genAI)
- TailwindCSS - Styling

<!-- ## Screenshots

![Main Page](public/_screenshots/pantry_mainpage.png)

![Add Item Dialog](public/_screenshots/pantry_add_item.png)

![Expiring](public/_screenshots/pantry_expiring.png)

![Edit Item Dialog](public/_screenshots/pantry_edit_item.png) -->

## Features

- Chatbot interface
- Respond to the user intelligently using any Gen-AI model
- Authentication for personalised chat experience
- Feedback implementation to rate chatbot's responses

## Features to Add

- AWS Bedrock responses
- Multi-language support for a diverse culture base
- Implement RAG so the chatbot responds based on a given knowledge base
- Create an LLM orchestration pattern with a router and task specific models

## Getting Started

1.Clone the repository:

```bash
git clone https://github.com/tushcmd/ai-customer-support.git
```

2.Install dependencies:

```bash
cd ai-customer-support
npm install
```

3.Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with all the necessary environment variables.

4.Run prisma commands to setup

```bash
npx prisma generate

# then

npx prisma migrate dev

# then

npx db push
```

5.Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

MIT License
