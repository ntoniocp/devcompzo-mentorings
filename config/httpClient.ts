type Config = Omit<RequestInit, "body"> & { body?: any; headers?: any };

export function httpClient<ResponseType>(
  endpoint: string,
  { body, ...config }: Config | undefined = {}
) {
  const baseURL = "http://localhost:3000/api";

  const finalConfig: RequestInit = {
    method: config?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  };

  return fetch(`${baseURL}/${endpoint}`, finalConfig).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }

    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }) as Promise<ResponseType>;
}
