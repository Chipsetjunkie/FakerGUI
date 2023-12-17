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
}


const defaultViewport = { x: 0, y: 0, zoom: -5 };

// TODO: Make this generic, and update styles

export default function Canvas<T>({
    node,
    customNodeProps,
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

    return (
        <div style={{ width: "100svw", height: "100svh" }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                fitView
                style={{ backgroundColor: "#18191d" }}
                defaultViewport={defaultViewport}
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
    );
}
