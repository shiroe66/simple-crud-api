export const parseURL = (url: string) => {
  return url.endsWith("/") ? url.slice(0, url.length - 1) : url
}
