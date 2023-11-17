import { useEffect, useState } from 'react';
import HeadLine from '../components/HeadLine';
import SortButton from '../components/SortButton';
import DepartmentHeading from '../components/DepartmentHeading';

export default function HomePage() {
  const [artworkIds, setArtworkIds] = useState({});

  useEffect(() => {
    getArtworkIds();
  }, []);

  const getArtworkIds = async () => {
    try {
      // fetch artwork from departments 6|8|10 that have been updated since 2023-11-15
      const resp = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=2023-11-15&departmentIds=6|8|10");

      if (!resp.ok) {
        throw new Error(`Network responded with an error. Cat burgler is at it again!`);
      }

      const data = await resp.json();
      const dataValues = Object.values(data.objectIDs);
      setArtworkIds(dataValues);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='d-flex flex-column overflow-x-hidden'>
      <HeadLine />
      <div 
        className="btn-toolbar justify-content-between mt-3 mx-1" 
        role="toolbar" 
        aria-label="Sort Cards"
      >
        <SortButton filter={'American'} />
        <SortButton filter={'North African'} />
        <SortButton filter={'Mozambique'} />
      </div>
      <DepartmentHeading department={'North African'} />
    </div>
  )
}