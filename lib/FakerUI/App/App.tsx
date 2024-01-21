import { useEffect, useState } from "react";
import rootNodeData from "@lib/FakerUI/dataStore/nodeTree";
import { generateSchema, isValidSchema } from "../utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";
import styles from "./App.module.scss";
import { ToastContextProvider, useToast } from "../context/ToastContext";
import { loader } from "@monaco-editor/react";
import { AppState } from "@lib/FakerUI/types";
import PreviewPane from "@lib/FakerUI/container/PreviewPane";
import SchemaPane from "@lib/FakerUI/container/SchemaPane";
import "@lib/FakerUI/global.scss";
import ControlDock from "@lib/FakerUI/components/CoreComponents/ControlDock";

import 'reactflow/dist/style.css';
import Canvas from "../components/FeatureComponents/Canvas";
import useMobileView from "../hooks/useMobileView";



function SchemaWrapped(props: { data: AppState }) {
  const generatedData: AppState = props.data
  return generatedData && <div className={styles.panel_root_container} style={{ paddingLeft: "40px" }}>
    <div className={styles.panel_element_container}>
      <SchemaPane
        generatedData={generatedData}
      />
    </div>
  </div>
}



export function FakerGUI() {
  const isMobile = useMobileView()
  const { triggerPopup } = useToast();
  const [isEditorView, setIsEditorView] = useState(true)
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


  function togglePanel() {
    setIsEditorView(prev => !prev)
  }


  function validateAndGenerate() {
    const { mainNode, isValid } = isValidSchema(generatedData.rootNode);
    if (isValid) {
      togglePanel()
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

  function updateCount(rawCount: string) {
    if (isNaN(+rawCount)) return
    if (+rawCount > 99){
      triggerPopup("max datapoint supported is 99", "error");
      return
    }

    const count = +rawCount
    
    setGeneratedData((prev) => ({
      ...prev,
      count,
    }));
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


  const showPreviewPanel = !isEditorView

  return (
    <div className={styles.root_editor_container}>
      <Canvas<AppState> node={SchemaWrapped} customNodeProps={generatedData} isMobile={isMobile}/>
      {!showPreviewPanel ? <ControlDock
        generateData={validateAndGenerate}
        loadData={loadFromLocal}
        updateCount={updateCount}
        saveSchema={saveSchemaLocally}
        count={generatedData.count}
      /> :
        <div className={styles.panel_root_container}>
          <div className={styles.panel_element_container} style={{ justifyContent: "flex-end" }}>
            <PreviewPane
              onClose={() => setIsEditorView(true)}
              copyContent={copyContent}
              generatedData={generatedData}
            />
          </div>
        </div>
      }
    </div>
  );
}




export function App() {
  return (
    <ToastContextProvider>
      <FakerGUI />
    </ToastContextProvider>
  );
}
