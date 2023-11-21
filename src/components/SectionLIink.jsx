export default function SectionLink({ 
  currentTab,
  count,
  currentId,
  myKey,
  removeCharacters,
  toggleId
}) {
  return (
    <a
      className={`my-2 btn text-decoration-none rounded-4 text-black ${currentId === myKey ? "btn-outline-secondary" : ""}`}
      href={`#${removeCharacters(currentTab)}-section-${++count}`}
      role="button"
      data-bs-toggle="button"
      aria-pressed={`${currentId === myKey ? "true" : "false"}`}
      onClick={() => toggleId(myKey)}
    >
      {`Section ${count}`}
    </a>
  )
}