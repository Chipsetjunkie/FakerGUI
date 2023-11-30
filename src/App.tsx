import { useState } from "react";
import ObjectEntities from "./components/Entities";
import rootNode from "./dataStore/nodeTree";
import { generateSchema } from "./utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";

export default function App() {
  const [generatedData, setGeneratedData] = useState({
    count: 5,
    data: {},
  });

  function handleGenerate() {
    function createFakeData(){
      const res = generateSchema(rootNode);
      return res
    }
    const fakerData = faker.helpers.multiple(createFakeData, {
      count: generatedData.count,
    });
    setGeneratedData((prev) => ({ ...prev, data: fakerData }));
  }

  return (
    <div>
      <button onClick={handleGenerate}> Generate </button>
      <ObjectEntities node={rootNode} />;
      <pre>{JSON.stringify(generatedData.data, null, 2)}</pre>
    </div>
  );
}
