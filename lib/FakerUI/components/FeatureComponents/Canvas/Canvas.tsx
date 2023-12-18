import { THEME } from "@lib/FakerUI/utils/constants";
import { ComponentType, useEffect, useMemo } from "react";
import ReactFlow, {
    Controls,
    MiniMap,
    NodeProps,
    useNodesState,
} from "reactflow";

interface CanvasProps<T> {
    node: ComponentType<NodeProps>;
    customNodeProps: T;
    isMobile: boolean;
}


const DESKTOP_DEFAULT_VIEWPORT = { x: 100, y: 100, zoom: 1.5 }
const MOBILE_DEFAULT_VIEWPORT = { x: 0, y: 0, zoom: 0.75 }


// TODO: Make this generic, and update styles

export default function Canvas<T>({
    node,
    customNodeProps,
    isMobile
}: Readonly<CanvasProps<T>>) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: "node-1",
            type: "textUpdater",
            position: { x: 0, y: 0 },
            data: customNodeProps,
        },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const nodeTypes = useMemo(() => ({ textUpdater: node }), []);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === "node-1") {
                    node.data = {
                        ...node.data,
                        ...customNodeProps,
                    };
                }

                return node;
            })
        );
    }, [customNodeProps, setNodes]);

    return isMobile ? (
        <div style={{ width: "100svw", height: "100svh" }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                style={{ backgroundColor: "#18191d" }}
                defaultViewport={MOBILE_DEFAULT_VIEWPORT}
                proOptions={{ hideAttribution: true }}
            >
                <Controls />
                <MiniMap
                    style={{ backgroundColor: THEME.canvasMiniMapBackgroundColor }}
                    nodeColor={THEME.canvasNodeColor}
                    maskColor={THEME.canvasMaskColor}
                />
            </ReactFlow>
        </div>
    ) : <div style={{ width: "100svw", height: "100svh" }} key={"flow-mobile"}>
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            style={{ backgroundColor: "#18191d" }}
            defaultViewport={DESKTOP_DEFAULT_VIEWPORT}
            proOptions={{ hideAttribution: true }}
        >
            <Controls />
            <MiniMap
                style={{ backgroundColor: THEME.canvasMiniMapBackgroundColor }}
                nodeColor={THEME.canvasNodeColor}
                maskColor={THEME.canvasMaskColor}
            />
        </ReactFlow>
    </div>
}
