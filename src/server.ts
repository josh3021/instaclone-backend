import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import client from "./client";
import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import isEnvValidate from "./validate-env";

function validateEnvs() {
  const { isValidated, errors } = isEnvValidate();
  if (!isValidated) {
    console.error("❌ Invalid Environment variables:");
    console.error(errors);
    process.exit(1);
  }
  console.log("✅ Environment variables are valid");
}

function preStartServer() {
  validateEnvs();
}

async function startServer() {
  const port = +process.env.PORT!;
  const server = new ApolloServer({
    schema,
    nodeEnv: process.env.NODE_ENV,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      loggedInUser: await getUser(client, req.headers.authorization),
      protectResolver,
      client,
    }),
    listen: { port },
  });
  return url;
}

async function run() {
  const url = await startServer();
  console.log(`✅ Server is running on ${url} 🚀`);
}

preStartServer();
run();
