import DepartmentHeading from "./DepartmentHeading"
import { LoremIpsum } from "react-lorem-ipsum"

export default function SectionDescription(
  {artDetails: { department, objectName, creditLine, culture, medium },
  currentTab,
  removeCharacters
}) {

  return (
    <>
      <div
        id={`${objectName}-tab-pane`}
        className={`tab-pane fade ${currentTab === objectName ? "show active" : ""}`}
        role="tabpanel"
        aria-labelledby={`${objectName}-tab`}
        tabIndex="0"
      >
        <DepartmentHeading id={`${removeCharacters(objectName)}-section-1`} department={objectName} />
        <LoremIpsum p={3} />
        <DepartmentHeading id={`${removeCharacters(objectName)}-section-2`} department={department} />
        <LoremIpsum p={2} />
        <DepartmentHeading id={`${removeCharacters(objectName)}-section-3`} department={'Section 3'} />
        <LoremIpsum p={4} />
      </div>
      <div
        id={`${creditLine}-tab-pane`}
        className={`tab-pane fade ${currentTab === creditLine ? "show active" : ""}`}
        role="tabpanel"
        aria-labelledby={`${creditLine}-tab`}
        tabIndex="0"
      >
        <DepartmentHeading id={`${removeCharacters(creditLine)}-section-1`} department={creditLine} />
        <LoremIpsum p={3} />
        <DepartmentHeading id={`${removeCharacters(creditLine)}-section-2`} department={'Section 2'} />
        <LoremIpsum p={2} />
      </div>
      <div
        id={`${culture}-tab-pane`}
        className={`tab-pane fade ${currentTab === culture ? "show active" : ""}`}
        role="tabpanel"
        aria-labelledby={`${culture}-tab`}
        tabIndex="0"
      >
        <DepartmentHeading id={`${removeCharacters(culture)}-section-1`} department={culture} />
        <LoremIpsum p={2} />
        <DepartmentHeading id={`${removeCharacters(culture)}-section-2`} department={'Section 2'} />
        <LoremIpsum p={3} />
      </div>
      <div
        id={`${medium}-tab-pane`}
        className={`tab-pane fade ${currentTab === medium ? "show active" : ""}`}
        role="tabpanel"
        aria-labelledby={`${medium}-tab`}
        tabIndex="0"
      >
        <DepartmentHeading id={`${removeCharacters(medium)}-section-1`} department={medium} />
        <LoremIpsum p={2} />
        <DepartmentHeading id={`${removeCharacters(medium)}-sSection-2`} department={'Section 2'} />
        <LoremIpsum p={2} />
      </div>
    </>
  )
}