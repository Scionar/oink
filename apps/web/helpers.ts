export async function swrPostFetcher(url: string, { arg }: any) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function swrDeleteFetcher(url: string, { arg }: any) {
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const swrGetFetcher = (token?: string) => (url: string, init: any) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
