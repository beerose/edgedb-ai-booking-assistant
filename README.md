# AI Booking Assistant with EdgeDB and Vercel AI SDK

## Getting Started

### Clone the Repository

You can clone the repository by running the following command:

```bash
git clone https://github.com/beerose/edgedb-ai-booking-assistant.git
```

After cloning the repository, you can navigate to the project directory:

```bash
cd edgedb-ai-booking-assistant
```

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

### Install Dependencies

This project uses [pnpm](https://pnpm.io/) as a package manager, but you can use `npm` or `yarn` if you prefer.

You can install the dependencies by running the following command:

```bash
pnpm install
```

### Seed the Database

To seed the database with some initial data, you can run the following command:

```bash
pnpm seed
```

### Environment Variables

This project uses OpenAI GPT-4 to generate the responses. You can create an account and get the API key from the [OpenAI website](https://openai.com/). After getting the API key, you can create a `.env.local` file in the root of the project and add the following environment variable:

```bash
OPENAI_API_KEY=your-api-key
```

### Generate the Types

To generate the types for the EdgeDB schema, you can run the following command:

```bash
pnpm generate:all
```

It runs `npx @edgedb/generate interfaces` and `npx @edgedb/generate edgeql-js` to generate the types. You can also run these commands separately if you want.

You will find the generated types in the `dbschema` directory.

### Development Server

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the stack used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [EdgeDB Documentation](https://www.edgedb.com/docs/) - learn about EdgeDB features and API.
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
