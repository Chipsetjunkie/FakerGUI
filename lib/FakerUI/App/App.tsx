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
import "../global.scss";
import ControlDock from "../components/ControlDock";
import useMobileView from "../hooks/useMobileView";

function FakerGUI() {
  const { triggerPopup } = useToast();
  const isMobile = useMobileView()
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

  function updateCount(count: number) {
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


  const showEditorPanel = isMobile ? isEditorView : true
  const showPreviewPanel = isMobile ? !isEditorView : true

  return (
    <div className={styles.root_editor_container}>
      <ControlDock
        isMobile = {isMobile}
        isEditorView = {isEditorView}
        generateData={validateAndGenerate}
        loadData={loadFromLocal}
        updateCount={updateCount}
        saveSchema={saveSchemaLocally}
        count={generatedData.count}
      />
      {showEditorPanel && <div className={styles.panel_root_container} style={{ paddingLeft: "40px" }}>
        <div className={styles.panel_element_container}>
          <SchemaPane
            isMobile={isMobile}
            generatedData={generatedData}
          />
        </div>
      </div>}
      {showPreviewPanel &&
        <div className={styles.panel_root_container}>
          <div className={styles.panel_element_container} style={{ justifyContent: "flex-end" }}>
            <PreviewPane
              isMobile={isMobile}
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
