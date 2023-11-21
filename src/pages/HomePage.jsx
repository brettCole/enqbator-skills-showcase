import { useEffect, useState } from 'react';
import HeadLine from '../components/HeadLine';
import SortButton from '../components/SortButton';
import DepartmentHeading from '../components/DepartmentHeading';
import ArtworkCard from '../components/ArtworkCard';

// TODO headline 1 button connect to either the met or error 404 page
// TODO sort buttons click to sort cards based on button name
// TODO link card to sub page with that products info on page

export default function HomePage() {
  const [artWorkIds, setArtWorkIds] = useState([]);
  const [artWork, setArtWork] = useState([]);
  const [sortTitles, setSortTitles] = useState([]);
  const [sortTitle, setSortTitle] = useState('');

  useEffect(() => {
    getArtWorkIds();
  }, []);

  useEffect(() => {
    sortCards();
  }, [sortTitle]);

  // fetch artwork IDs
  const getArtWorkIds = async () => {
    try {
      // fetch artwork from departments 6|8|10 that have been updated since 2023-11-15
      const idsRequest = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=2023-11-15&departmentIds=6|7|10");

      if (!idsRequest.ok) {
        throw new Error(`Network responded with an error. Cat burgler is at it again!`);
      }

      const resp = await idsRequest.json();
      const dataValues = Object.values(resp.objectIDs);
      getArtWorkData(dataValues);
      setArtWorkIds(dataValues);
    } catch (err) {
      console.error(err);
    }
  }

  // TODO see if there is a way to speed up request
  // fetch artwork from IDs
  const getArtWorkData = async (ids) => {
  // const getArtWorkData = useCallbackasync (ids) => {
    try {
      // fetch artwork data based on ids from getArtworkIds()
      const unorderedRequest = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);

          if (!response.ok) {
            throw new Error(`Network is freaking out. Check error message.`);
          }

          return await response.json();
        })
      )
      const organizedArtWork = organizeArtworkByDepartment(unorderedRequest);
      setArtWork(organizedArtWork);
    } catch(err) {
      console.error(err);
    }
  };

  // sort returned artwork by department name
  const organizeArtworkByDepartment = (data) => {
    let sortedData = {};

    for (let i = 0; i < data.length; i++) {
      if (!sortedData.hasOwnProperty(data[i].department)) {
        sortedData[data[i].department] = [];
        sortedData[data[i].department].push(data[i]);
      } else {
        sortedData[data[i].department].push(data[i]);
      }
    }

    const finalSort = reSortArtworkCards(sortedData);
    setSortTitles(Object.keys(sortedData))
    return finalSort;
  }

  // sort object to array of objects for better sorting use
  const reSortArtworkCards = (data) => {
    const newObjArr = Object.entries(data).map((entry) => {
      return {[entry[0]]: entry[1]};
    });
    
    return newObjArr;
  }

  // build header and list of cards
  const displayArtCards = () => {
    const artHeadingAndCards = [];
    artWork.map((artInd, ind) => {
      const artValues = Object.values(artInd)[0];
      artHeadingAndCards.push(
        <DepartmentHeading key={`${artInd}-${ind}`} department={Object.keys(artInd)[0]} />,
        <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-6'>
          {Object.values(artValues).map((value, ind) => (
            <ArtworkCard 
              key={`card-${ind}`} 
              details={ value }
            />
          ))}
        </div>
      )
    })
    return artHeadingAndCards;
  }

  const assignSortTitle = (e) => {
    setSortTitle(e.target.textContent);
  }

  const removeSortTitle = () => {
    setSortTitle('');
    originalOrder();
  }

  const sortCards = () => {
    console.log(artWork)
    for (let i = 0; i < artWork.length; i++) {
      if (Object.keys(artWork[i])[0] == sortTitle) {
        let copyArtWork = [...artWork];
        copyArtWork.splice(0, 0, copyArtWork.splice(i, 1)[0])

        setArtWork(copyArtWork);
      }
    }
  }

  const originalOrder = () => {
    let originalCardOrder = [];

    sortTitles.map((el, i) => {
      const department = artWork.find(area => Object.keys(area)[0] === el)
      originalCardOrder.push(department);
    })
    setArtWork(originalCardOrder);
  }
  
  return (
    <div className='d-flex flex-column overflow-x-hidden'>
      <HeadLine />
      <div 
        className="btn-toolbar justify-content-between justify-content-sm-start mt-5 mx-2 mx-md-6 mb-2"
        role="toolbar" 
        aria-label="Sort Cards"
      >
        {
          sortTitles.map((department, i) => (
            <SortButton 
              key={`department-${i}`}
              myKey={`department-${i}`}
              filter={department} 
              status={sortTitle === department ? true : false}
              assignSortTitle={assignSortTitle}
              removeTitle={removeSortTitle}
            />
          ))
        }
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          {artWork.length === 0 && <h1>Loading...</h1>}
          {
            displayArtCards()
          }
        </div>
      </div>
    </div>
  )
}