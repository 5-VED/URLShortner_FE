export interface CreateUrlPayload {
  url: string;
}

export interface ShortUrlResponse {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  isActive: boolean;
  userId: string | null;
}
