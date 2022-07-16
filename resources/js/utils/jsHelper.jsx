import { formatDistance, } from 'date-fns'

export const formatTime = (time) => {
  const dateObject = formatDistance(new Date(time), new Date())
  const response = `${dateObject} ago`
  return response;
}

export const randomBadgeColor = () => {
  const color = ['badge-primary', 'badge-inline']
  const badgeColor = color[~~(Math.random() * color.length)];
  return badgeColor.toString()
}
