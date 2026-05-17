const BASE_URL = import.meta.env.VITE_DIRECTUS_URL

export function getAssetUrl(fileId) {
  if (!fileId) return ''
  return `${BASE_URL}/assets/${fileId}`
}

export async function fetchItems(collection, params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/items/${collection}${query ? `?${query}` : ''}`)
  if (!res.ok) throw new Error(`Directus ${res.status}: ${collection}`)
  const { data } = await res.json()
  return data
}
