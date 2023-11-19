export default function SortButton({ myKey, filter, assignSortTitle, status, removeTitle }) {

  return (
    <button
      key={myKey}
      type="button" 
      className={`btn btn-secondary ${status ? 'active' : ''}`}
      onClick={!status ? assignSortTitle : removeTitle}
    >
      {filter}
    </button>
  )
}