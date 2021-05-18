import { useRef } from "react"

export default function RenderCount(props) {
  const renderCount = useRef(1)

  console.log(`${props.componentName} render count:`, renderCount.current)

  return (
    <span>{props.componentName} renderCount: {(renderCount.current ++)}</span>
  );
}