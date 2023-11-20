export default function DepartmentHeading({ id, department }) {

  return (
    <h2 id={id} className="display-2 mt-6">{department}</h2>
  )
}