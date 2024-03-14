## Getting Started

### EdgeDB Setup

This project uses [EdgeDB](https://edgedb.com/) as a database. You can install it by following the instructions:

- [Install EdgeDB CLI](https://www.edgedb.com/docs/intro/cli)

After installing the CLI, you can initialize the project by running the following command:

```bash
edgedb project init
```

Next, you can apply the schema migrations by running the following command:

```bash
edgedb migration apply
```

To seed the database with some initial data, you can run the following command:

```bash
pnpm seed
```

### Environment Variables

This project uses OpenAI GPT-4 to generate the responses. You can create an account and get the API key from the [OpenAI website](https://openai.com/). After getting the API key, you can create a `.env.local` file in the root of the project and add the following environment variable:

```bash
OPENAI_API_KEY=your-api-key
```

### Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the stack used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [EdgeDB Documentation](https://www.edgedb.com/docs/) - learn about EdgeDB features and API.
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
