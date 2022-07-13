
export const formatTime = (time) => {
  const dateObject = new Date(time)
  const postDate = dateObject.toLocaleString()
  const tgl = postDate.slice(0, 2)
  const bln = postDate.slice(3, 5)
  const response = `posted ${tgl}-${bln}`
  return response.toLocaleLowerCase();
}

export const randomBadgeColor = () => {
  const color = ['badge-primary', 'badge-inline']
  const badgeColor = color[~~(Math.random() * color.length)];
  return badgeColor.toString()
}
