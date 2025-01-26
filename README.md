# Glance for Docusign: AI Assistant for Documents and Agreements

Project Goal: Provide instant insights on user documents and agreements in Docusign with the latest generative AI models through an intuitive AI chat interface.

## About the Project

**Glance** for Docusign is a **Generative AI Chat Assistant** for your documents and agreements. Designed with an easy to use interface, Glance integrates with Docusign to provide a chatbot assistant that instantly analyzes and simplifies complex content of Envelopes, Documents, and Navigator Agreements, while offering clear insights and actionable answers.

With built-in support for over ten top-tier large language models (LLM), you can use Glance out of the box with no configuration required. We currently support the latest LLM models from Anthropic, Meta, Mistral, Amazon and Cohere.

Glance is built with security and privacy at its core, ensuring users’ private data is never stored or misused, adhering to the highest industry standards for privacy.

## Technical Details

### Architecture Overview

<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/comexiaslabs/assets/main/glance/glance-architecture.jpg" alt="glance-architecture" />
</p>

### Services

- The frontend web application is developed in React using the Next.js framework.

- The backend API is built in Node.js with TypeScript powers the document parsing functionality.

- The application uses Docusign eSignature REST API and the new Navigator API to fetch folders, envelopes, documents and agreements.

## Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses `yarn`, but you may use `npm` or other NPM compatible package managers.

1. Create environment file `.env.local` in the root folder with the following content:

```
NEXT_PUBLIC_API_HOST=http://localhost:3000
NEXT_PUBLIC_AI_API_KEY=
DOCUSIGN_CLIENT_ID=
DOCUSIGN_CLIENT_SECRET=
DOCUSIGN_REDIRECT_URI=http://localhost:3000/api/auth/callback
DOCUSIGN_AUTH_URL=https://account-d.docusign.com/oauth/auth
DOCUSIGN_TOKEN_URL=https://account-d.docusign.com/oauth/token
# NEXT_PUBLIC_DOCUSIGN_NAVIGATOR_API_BASE_URL=https://api-d.docusign.com
NEXT_PUBLIC_DOCUSIGN_NAVIGATOR_API_BASE_URL=/api/docusign/navigator-proxy

```

2. Install dependencies

```bash
yarn install
```

3. Start application

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
