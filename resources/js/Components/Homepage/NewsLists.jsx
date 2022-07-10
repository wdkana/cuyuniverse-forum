const noNews = () => {
  return (
    <div>Saat ini belum ada berita tersedia.</div>
  )
}

const isNews = (datas) => {
  return datas.map((data, i) => {
    return (
      <div key={i} className="card w-full sm:w-96 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{data.title} <div className="badge badge-secondary">NEW</div></h2>
          <p className='text-sm'>{data.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-inline">{data.category}</div>
            <div className="badge badge-outline">{data.author}</div>
          </div>
        </div>
      </div>
    )
  }
  )
}

export default function NewsLists({ news }) {
  if (!news || !news.length) return noNews()
  return isNews(news)
}