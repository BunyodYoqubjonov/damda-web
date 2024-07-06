import { CDN_URL } from 'constants/env'

export default function getImage(name) {
  return CDN_URL + name
}
