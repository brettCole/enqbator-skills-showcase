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
    setTabName(e.target.textContent);
  }

  const removeUnwantedCharacters = (str) => {
    if (str) {
      return str.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g,'-');
    }
  }


// TODO create carousel for images 
  return (
    <div className='d-flex flex-column overflow-x-hidden'>
      <HeadLine />
      <div>
        <TabBar 
          artDetails={artObject} 
          changeTab={changeTabName} 
          currentTab={tabName}
        />
        <hr className="d-sm-inline" />
        <div className='nav nav-pills nav-justified flex-column align-items-center mt-3 text-center'>
          <p>ON THIS PAGE</p>
          {
            Object.keys(sectionCount).map((count) => (
              <SectionLink 
                key={`sectionKey-${count}`} 
                count={count}
                currentTab={tabName}
                removeCharacters={removeUnwantedCharacters}
              />
            ))
          }
        </div>
      </div>
      <div id="tabBarContent" className="tab-content">
        <SectionDescription 
          artDetails={artObject}
          currentTab={tabName}
          removeCharacters={removeUnwantedCharacters}
        />
      </div>
    </div>
  )
}