
export const formatTime = (time) => {
  const dateObject = new Date(time)
  const postDate = dateObject.toLocaleString()
  const tgl = postDate.slice(0, 2)
  const bln = postDate.slice(3, 5)
  const jam = postDate.slice(12, 14)
  const menit = postDate.slice(15, 17)
  return `${tgl}/${bln}-${jam}:${menit}`;
}

export const randomBadgeColor = () => {
  const color = ['badge-secondary', 'badge-primary', 'badge-warning', 'badge-error', 'badge-info', 'badge-success', 'badge-accent']
  const categoryColor = color[~~(Math.random() * color.length)];
  return categoryColor
}
