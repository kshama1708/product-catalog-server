const API_URL =
  import.meta.env.VITE_API_URL + "/products";

export async function fetchProducts({
  category = "",
  cursor = "",
} = {}) {
  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  if (cursor) {
    params.append("cursor", cursor);
  }

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}