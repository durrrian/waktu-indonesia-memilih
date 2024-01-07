export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://waktuindonesiamemilih.id' : 'http://localhost:3000'

export default function parseUrl(endpoint: string) {
  return new URL(endpoint, BASE_URL)
}
