export default function SectionLink({ 
  currentTab,
  count,
  removeCharacters
}) {
  return (
    <a 
      className="dropdown-item my-2"
      href={`#${removeCharacters(currentTab)}-section-${++count}`}
    >
      {`Section ${count}`}
    </a>
  )
}