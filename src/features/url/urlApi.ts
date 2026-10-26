import { getErrorMessage, http } from "@/lib/httpClient";
import { CreateUrlPayload, ShortUrlResponse } from "./types";

export const createShortCode = async (
  payload: CreateUrlPayload,
): Promise<ShortUrlResponse> => {
  try {
    const response = await http.post<ShortUrlResponse>("/url", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
