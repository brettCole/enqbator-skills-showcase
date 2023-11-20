import { Link } from "wouter"

export default function ArtworkCard({ details: { objectID, medium, primaryImageSmall, title} }) {

  return (
    <Link href={`/object/${objectID}`}>
      <div className="col">
        <div className="card mb-4 border rounded-4 artWorkCards">
          <img src={primaryImageSmall} className="rounded-circle img-fluid offset-6 mt-4 me-4" alt={medium} />
          <div className="card-body d-grid align-items-end ms-3">
            <h3 className="card-title">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}