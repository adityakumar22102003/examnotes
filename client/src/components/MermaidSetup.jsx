import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid';



// const cleanMermaidChart = (diagram) => {
//     if (!diagram) return "";
//     let clean = diagram
//         .replace(/\r?\n/g, "\n")
//         .replace(/\//g, " ")
//         .replace(/\(/g, "")
//         .replace(/\)/g, "")
//         .replace(/:/g, "")
//         .replace(/,/g, "");
    
//     if (!clean.trim().startsWith("graph")) {
//         clean = `graph TD\n${clean}`;
//     }
//     return clean;
// }
// const cleanMermaidChart = (diagram) => {
//     if (!diagram) return "";

//     let clean = diagram
//         .replace(/\r?\n/g, "\n")
//         .trim();

//     if (!clean.startsWith("graph")) {
//         clean = `graph TD\n${clean}`;
//     }

//     return clean;
// };
const fixDiagram = (diagram) => {
    if (!diagram) return "";

    let id = 0;

    return diagram.replace(/\[(.*?)\]/g, (_, label) => {
        id++;
        return `N${id}[${label}]`;
    });
};


const MermaidSetup = ({ diagram }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default"
        })

        if (!diagram || !containerRef.current) return;
        const renderDiagram = async () => {
            try {
                containerRef.current.innerHTML = "";
                const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
                // const safeChart = cleanMermaidChart(diagram);
                const safeChart = fixDiagram(diagram);
                const { svg } = await mermaid.render(uniqueId, safeChart);
                containerRef.current.innerHTML = svg;
            } catch (error) {
                console.error("Mermaid render failed -> ", error);
                containerRef.current.innerHTML = "<p>Diagram failed to render</p>";
            }
        }
        renderDiagram();
    },[diagram])
   
  return (
      <div
      className='bg-white border rounded-lg p-4 overflow-x-auto'
      >
          <div  ref={containerRef}/>
      </div>
  )
}

export default MermaidSetup