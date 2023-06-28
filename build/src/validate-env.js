"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const dotenv = __importStar(require("dotenv"));
const env_schema_json_1 = __importDefault(require("../env.schema.json"));
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["Development"] = "Development";
    NodeEnv["Production"] = "Production";
})(NodeEnv || (NodeEnv = {}));
function loadEnv() {
    switch (process.env.NODE_ENV) {
        case NodeEnv.Development:
            dotenv.config({ path: ".env" });
            break;
        case NodeEnv.Production:
            dotenv.config({ path: ".env.production" });
            break;
        // default:
        //   console.error("❌ Cannot load dotenv file");
        // break;
    }
}
function isEnvValidate() {
    loadEnv();
    const ajv = new ajv_1.default();
    const validate = ajv.compile(env_schema_json_1.default);
    const valid = validate(process.env);
    if (!valid) {
        return {
            isValidated: false,
            errors: validate.errors,
        };
    }
    return {
        isValidated: true,
    };
}
exports.default = isEnvValidate;
