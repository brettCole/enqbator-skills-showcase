import { useEffect, useState } from "react"

export default function HeadLine() {
  const [headlineImage, setHeadlineImage] = useState({});

  useEffect(() => {
    fetchHeadlineImage();
  }, []);
  
  const fetchHeadlineImage = async () => {
    try {
      const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/39407");

      if (!response.ok) {
        throw new Error(`Network responded with an error.`);
      }

      const data = await response.json();
      setHeadlineImage(data);

    } catch (error) {
      console.error('Error: ', error);
    }
  }
// TODO remember to check position absolute for bigger screen sizes
  return (
    <div className="container-fluid px-0">
      <div className="row gx-5 justify-content-center position-relative headline-row">
        <div className="col-6 h-100 w-100 z-3">
          <h1 className="mt-5 ms-2 main-heading-details">Fine Art Gala</h1>
          <p className="lead mx-2 main-heading-details">Come take a look at different pieces. See what catches your eye!</p>
          <button className="mt-3 ms-2">Button</button>
        </div>
        <div className="bg-secondary col-6 h-100 w-100 position-absolute">
          <img src={headlineImage.primaryImage} className="img-fluid h-100 md-rounded mx-auto d-block" alt={headlineImage.title} />
        </div>
      </div>
    </div>
  )
}