export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return await res.json();
}
