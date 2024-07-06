import { CDN_URL } from 'constants/env'

export default function getAvatar(name) {
  if (name) {
    return CDN_URL + name
  } else {
    return '/images/avatar.png'
  }
}
