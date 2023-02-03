export async function swrPostFetcher(url: string, { arg }: any) {
  console.log(arg, "arg");

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
