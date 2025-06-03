import type { ApiError } from "../types/error";

export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const apiError = error as ApiError;
    if (typeof apiError.data?.message === "string") {
      return apiError.data.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
