"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const schema_1 = require("@graphql-tools/schema");
const loadedTypes = (0, load_files_1.loadFilesSync)(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = (0, load_files_1.loadFilesSync)(`${__dirname}/**/*.{queries,mutations}.{js,ts}`);
const typeDefs = (0, merge_1.mergeTypeDefs)(loadedTypes);
const resolvers = (0, merge_1.mergeResolvers)(loadedResolvers);
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
exports.default = schema;
