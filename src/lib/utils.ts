import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export function getErrorMessage(error: any) {
  if (error instanceof ZodError) {
    return fromZodError(error).message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "Unknown error";
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseBoolean(value: any): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (
      lower === "1" ||
      lower === "true" ||
      lower === "t" ||
      lower === "yes" ||
      lower === "y"
    ) {
      return true;
    } else if (
      lower === "0" ||
      lower === "false" ||
      lower === "f" ||
      lower === "no" ||
      lower === "n"
    ) {
      return false;
    }
  }
  if (typeof value === "number") {
    if (value > 0) {
      return true;
    } else if (value === 0) {
      return false;
    }
  }
  throw new Error("App error: cannot parse boolean");
}
