"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const client_1 = __importDefault(require("./client"));
const schema_1 = __importDefault(require("./schema"));
const validate_env_1 = __importDefault(require("./validate-env"));
function validateEnvs() {
    const { isValidated, errors } = (0, validate_env_1.default)();
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
    const PORT = +process.env.PORT;
    const server = new server_1.ApolloServer({
        schema: schema_1.default,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async ({ req }) => ({ token: req.headers.token, client: client_1.default }),
        listen: { port: PORT },
    });
    return url;
}
async function run() {
    const url = await startServer();
    console.log(`✅ Server is running on ${url} 🚀`);
}
preStartServer();
run();
