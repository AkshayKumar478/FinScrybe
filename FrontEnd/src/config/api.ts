
export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000/api";

export type RequestOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  token?: string | null;
};

const clearAuthenticationOnUnauthorized = async (): Promise<void> => {
  const { useAuthStore } = await import("../common/stores/authStore");
  const auth = useAuthStore.getState();

  auth.logoutClient();
  auth.logoutSuperAdmin();
  auth.logoutCompanyAdmin();
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      ...(options.token
        ? {
            Authorization: `Bearer ${options.token}`,
          }
        : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      await clearAuthenticationOnUnauthorized();
    }

    throw new ApiError(
      data?.message ?? "Request failed",
      response.status,
      data?.details
    );
  }

  return data as T;
}
