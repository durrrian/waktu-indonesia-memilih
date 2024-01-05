export default function parseUrl(endpoint: string) {
  const host = process.env.NODE_ENV === 'production' ? 'https://waktuindonesiamemilih.id' : 'http://localhost:3000'

  return new URL(endpoint, host)
}
