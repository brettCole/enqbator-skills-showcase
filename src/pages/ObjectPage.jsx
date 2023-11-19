import { useEffect } from "react";
import { useParams } from "wouter"

export default function ObjectPage() {
  const { objectID } = useParams();

  useEffect(() => {
    getObject();
  }, []);

  const getObject = async () => {
    try {
      // fetch artwork from passed param objectID
      const objRequest = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      
      if (!objRequest.ok) {
        throw new Error(`Network responded with an error. Cat burglar is at it again!`);
      }

      const resp = await objRequest.json();
      console.log(resp);

    } catch (err) {
      console.err(err);
    }
  }

  return (
    <div><h1>ObjectPage</h1></div>
  )
}