import { CDN_URL } from 'constants/env'

export default function getImageFromCdnUrl(name) {
  return CDN_URL + name
}
