import { useEffect, useState } from "react"
import { Link, useParams } from "wouter";

export default function HeadLine() {
  const [headlineImage, setHeadlineImage] = useState({});
  const {objectID} = useParams();

  useEffect(() => {
    fetchHeadlineImage();
  }, []);
  
  const fetchHeadlineImage = async () => {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${!objectID ? 39407 : objectID}`);

      if (!response.ok) {
        throw new Error(`Network responded with an error.`);
      }

      const data = await response.json();
      console.log(data)
      setHeadlineImage(data);

    } catch (error) {
      console.error('Error: ', error);
    }
  }
// TODO remember to check position absolute for bigger screen sizes
// TODO rework ui for passed props of art object fetch
  return (
    <div className="container-fluid px-0 mt-md-6">
      <div className="row gx-5 justify-content-center position-relative headline-row">
        <div className="col col-md-5 h-100 mw-100 z-3 ps-md-0 pe-md-1">
          <div className="ps-4 ps-sm-5 px-md-6 pt-md-5 w-100 h-100">
            {
              <>
                <h1 className="mt-5 mt-md-4 main-heading-details">
                  {headlineImage ? headlineImage.objectName : 'Fine Art Gala'}
                </h1>
                <p className="lead main-heading-details">
                  {headlineImage ? headlineImage.department : 'Come take a look at different pieces. See what catches your eye!'}
                </p>
              </>
            }
            <Link href='/'>
              <button className="btn btn-secondary mt-3">Button</button>
            </Link>
          </div>
        </div>
        <div className="col col-md-5 h-100 mw-100 position-absolute position-sm-relative ps-md-0 pe-md-0">
          <img src={headlineImage.primaryImage} className="img-fluid h-100 rounded-0 rounded-md-4 mx-auto d-block" alt={headlineImage.objectName} />
        </div>
      </div>
    </div>
  )
} 