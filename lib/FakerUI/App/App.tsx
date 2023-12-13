import { useEffect, useState } from "react";
import rootNodeData from "../dataStore/nodeTree";
import { generateSchema, isValidSchema } from "../utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";
import styles from "./App.module.scss";
import { ToastContextProvider, useToast } from "../context/ToastContext";
import { loader } from "@monaco-editor/react";
import { AppState } from "../types";
import PreviewPane from "../container/PreviewPane";
import SchemaPane from "../container/SchemaPane";


function FakerGUI() {
  const { triggerPopup } = useToast();
  const [generatedData, setGeneratedData] = useState<AppState>({
    count: 5,
    triggerLoad: false,
    data: [],
    rootNode: rootNodeData,
    hasError: false,
  });

  function loadFromLocal() {
    const cache = localStorage.getItem("schema");
    if (cache) {
      const rootNode = JSON.parse(cache);
      setGeneratedData((prev) => ({
        ...prev,
        rootNode,
        triggerLoad: !prev.triggerLoad,
      }));
      triggerPopup("Loaded schema successfully!");
    } else {
      triggerPopup("Nothing to load", "error");
    }
  }

  function validateAndGenerate() {
    const { mainNode, isValid } = isValidSchema(generatedData.rootNode);
    if (isValid) {
      handleGenerate();
    } else {
      setGeneratedData((prev) => ({
        ...prev,
        rootNode: structuredClone(mainNode),
        hasError: true,
      }));
    }
  }

  function handleGenerate() {
    function createFakeData() {
      const res = generateSchema(generatedData.rootNode);
      return res;
    }
    const fakerData = faker.helpers.multiple(createFakeData, {
      count: generatedData.count,
    });
    setGeneratedData((prev) => ({
      ...prev,
      data: fakerData,
      hasError: false,
    }));
  }

  function saveSchemaLocally() {
    localStorage.setItem(
      "schema",
      JSON.stringify(generatedData.rootNode, (k, v) => k !== "parent" && v)
    );
    triggerPopup("Saved to local");
  }

  async function copyContent(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      triggerPopup("Content copied to clipboard");
    } catch (err) {
      triggerPopup("Failed to copy to clipboard", "error");
    }
  }

  function updateCount(count: number) {
    setGeneratedData((prev) => ({
      ...prev,
      count
    }))
  }

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("vs-json", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#202125",
          "scrollbar.shadow": "#202125",
        },
      });
    });
  }, []);

  return (
    <div className={styles.root_editor_container}>
      <SchemaPane
        validateAndGenerate={validateAndGenerate}
        generatedData={generatedData}
        saveSchemaLocally={saveSchemaLocally}
        loadFromLocal={loadFromLocal}
        updateCount={(count) => updateCount(count)}
      />
      <PreviewPane copyContent={copyContent} generatedData={generatedData} />
    </div>
  );
}


export function App() {

  return <ToastContextProvider>
    <FakerGUI />
  </ToastContextProvider>
}