export default function TabBar(
  {artDetails: { objectName, creditLine, culture, medium }, 
  changeTab, 
  currentTab
}) {
  
  return (
    <ul
      id="tabBar"
      className="nav nav-pills nav-justified flex-column align-items-center flex-sm-row" 
      role="tablist"
    >
      <li className="nav-item mx-2" role="presentation">
        <button
          id={`${objectName}-tab`}
          className={`nav-link rounded-0 text-black ${currentTab === objectName ? "active" : ''}`} 
          data-bs-toggle="tab"
          data-bs-target={`#${objectName}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`${objectName}-tab-pane`}
          aria-selected={`${currentTab === objectName ? "true" : "false"}`}
          aria-current="page" 
          href='#'
          onClick={changeTab}
        >
          {objectName}
        </button>
      </li>
      <li className="nav-item mx-2" role="presentation">
        <button 
          id={`${creditLine}-tab`}
          className={`nav-link rounded-0 text-black ${currentTab === creditLine ? "active" : ""}`}
          data-bs-toggle="tab"
          data-bs-target={`${creditLine}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`${creditLine}-tab-pane`}
          aria-selected={`${currentTab === creditLine ? "true" : "false"}`}
          aria-current="page" 
          href='#'
          onClick={changeTab}
        >
          {creditLine}
        </button>
      </li>
      <li className="nav-item mx-2" role="presentation">
        <button
          id={`${culture}-tab`}
          className={`nav-link rounded-0 text-black ${currentTab === culture ? "active" : ""}`}
          data-bs-toggle="tab"
          data-bs-target={`${culture}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`${culture}-tab-pane`}
          aria-selected={`${currentTab === culture ? "true" : "false"}`}
          aria-current="page" 
          href='#'
          onClick={changeTab}
        >
          {culture}
        </button>
      </li>
      <li className="nav-item mx-2" role="presentation">
        <button
          id={`${medium}-tab`}
          className={`nav-link rounded-0 text-black ${currentTab === medium ? "active" : ""}`}
          data-bs-toggle="tab"
          data-bs-target={`${medium}-tab-pane`} 
          type="button"
          role="tab"
          aria-controls={`${medium}-tab-pane`}
          aria-selected={`${currentTab === medium ? "true" : "false"}`}
          aria-current="page" 
          href='#'
          onClick={changeTab}
        >
          {medium}
        </button>
      </li>
    </ul>
  )
}