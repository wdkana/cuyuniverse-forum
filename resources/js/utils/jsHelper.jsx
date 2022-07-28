import { formatDistance } from 'date-fns'

export const formatTime = (time) => {
  const dateObject = formatDistance(new Date(time), new Date())
  const response = `${dateObject} ago`
  return response;
}

export const findTags = (text) => {
  let tags = []
  const findHashtag = /(^|\W)(#[a-z\d][\w-]*)/ig
  text.replace(findHashtag, (hashtag) => {
    tags.push(hashtag)
  })
  return tags;
}