import { useEffect, useState } from "react";
import { useParams } from "wouter"
import HeadLine from '../components/HeadLine';
import TabBar from '../components/TabBar';
import SectionLink from '../components/SectionLIink';
import SectionDescription from "../components/SectionDescription";

export default function ObjectPage() {
  const [artObject, setArtObject] = useState({});
  const [tabName, setTabName] = useState('');
  const [sectionCount, setSectionCount] = useState(0);
  const [sectionId, setSectionId] = useState('');
  const { objectID } = useParams();

  useEffect(() => {
    getObject();
  }, []);

  useEffect(() => {
    setTabName(artObject.objectName)
  }, [artObject])

  useEffect(() => {
    if (tabName) {
      const sections = document
        .getElementById(`${tabName}-tab-pane`)
        .getElementsByTagName('h2')
        console.log(sections)
      setSectionCount(sections);
    }
  }, [tabName])

  const getObject = async () => {
    try {
      // fetch artwork from passed param objectID
      const objRequest = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      
      if (!objRequest.ok) {
        throw new Error(`Network responded with an error. Cat burglar is at it again!`);
      }

      const resp = await objRequest.json();
      setTabName(resp.objectName);
      setArtObject(resp);
    } catch (err) {
      console.error(err);
    }
  }

  const changeTabName = (e) => {
    if (!e.target.textContent) {
      setTabName('Tab');
    } else {
      setTabName(e.target.textContent);
    }
  }

  const removeUnwantedCharacters = (str) => {
    if (str) {
      return str.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g,'-');
    }
  }

  const toggleSectionId = (myKey) => {
    setSectionId(myKey);
  }


// TODO create carousel for images 
  return (
    <div className='d-flex flex-column overflow-x-hidden'>
      <HeadLine />
      <div className="mt-5">
        <TabBar 
          artDetails={artObject} 
          changeTab={changeTabName} 
          currentTab={tabName}
        />
        <hr className="d-sm-inline" />
        {/* For Mobile Screens */}
        <div className='nav nav-pills nav-justified flex-column align-items-center mt-3 text-center d-block d-md-block d-lg-none'>
          <p>ON THIS PAGE</p>
          {
            Object.keys(sectionCount).map((count) => (
              <SectionLink 
                key={`sectionKey-${count}`}
                myKey={`sectionKey-${count}`}
                currentId={sectionId}
                count={count}
                currentTab={tabName}
                removeCharacters={removeUnwantedCharacters}
                toggleId={toggleSectionId}
              />
            ))
          }
        </div>
      </div>
      <div id="tabBarContent" className="tab-content col d-lg-flex flex-lg-row">
        <SectionDescription 
          artDetails={artObject}
          currentTab={tabName}
          removeCharacters={removeUnwantedCharacters}
        />
        {/* For Large Screens */}
        <div className='nav nav-pills nav-justified flex-column align-items-center mt-6 text-center col-lg-3 d-flex d-md-none d-lg-flex'>
          <p>ON THIS PAGE</p>
          {
            Object.keys(sectionCount).map((count) => (
              <SectionLink 
                key={`sectionKey-${count}`}
                myKey={`sectionKey-${count}`}
                currentId={sectionId}
                count={count}
                currentTab={tabName}
                removeCharacters={removeUnwantedCharacters}
                toggleId={toggleSectionId}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}