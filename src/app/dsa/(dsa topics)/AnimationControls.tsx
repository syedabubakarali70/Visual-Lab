import { useEffect } from "react";

const AnimationControls = ({tl}: {tl: any}) => {
  let duration = tl.duration();
  useEffect(() => {}, [tl])
  return (
    <div>
        <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Controls</div>
            <div className="flex gap-2">
            <button onClick={() => tl.play()}>Play</button>
            <button onClick={() => tl.pause()}>Pause</button>
            <button onClick={() => tl.reverse()}>Reverse</button>
            <button onClick={() => tl.reverse()}>{duration}</button>
            </div>
        </div>
    </div>
  )
}

export default AnimationControls