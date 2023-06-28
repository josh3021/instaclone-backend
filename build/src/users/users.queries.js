"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seeProfile = (_, { username }, { client }) => client.user.findUnique({ where: { username } });
const queries = {
    Query: {
        seeProfile,
    },
};
exports.default = queries;
