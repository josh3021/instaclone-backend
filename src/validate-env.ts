import Ajv, { ErrorObject } from "ajv";
import * as dotenv from "dotenv";
import schema from "../env.schema.json";

enum NodeEnv {
  Development = "Development",
  Production = "Production",
}

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

interface IIsEnvValidate {
  isValidated: boolean;
  errors?: ErrorObject<string, Record<string, any>, unknown>[] | null;
}

export default function isEnvValidate(): IIsEnvValidate {
  loadEnv();
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
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
