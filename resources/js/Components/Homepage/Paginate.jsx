import { Link } from "@inertiajs/inertia-react"

const Paginate = ({ meta, newsLength }) => {
  const prev = meta.links[0].url
  const next = meta.links[meta.links.length - 1].url

  if (!newsLength) return null;
  return (
    <div className="btn-group">
      {prev && <Link href={prev} className="btn btn-sm btn-outline">«</Link>}
      <Link className="btn btn-sm btn-outline">{meta.current_page}</Link>
      {next && <Link href={next} className="btn btn-sm btn-outline">»</Link>}
    </div >
  )
}

export default Paginate