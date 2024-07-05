"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import useInterval from "./useInterval";
import {
  PlayIcon,
  PauseIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { set } from "firebase/database";

const AnimationControls = ({
  tl,
  numbers,
  numRefs,
  AnimatingFunction,
  swapsandComparisons,
}: {
  tl: any;
  numbers: any;
  numRefs: any;
  AnimatingFunction: any;
  swapsandComparisons: any;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [properties, setProperties] = useState({
    time: [0],
    isPlaying: false,
    speed: "1",
  });
  const played = useRef(0);
  useEffect(() => {
    if (played.current === 1) {
      AnimatingFunction(tl, numbers, numRefs);
    }
  }, [played.current]);

  useInterval(
    () => {
      setProperties((prev) => {
        if (prev.time[0] <= tl.duration()) {
          if (prev.isPlaying)
            return {
              ...prev,
              time: [prev.time[0] + 0.1 * Number(properties.speed)],
            };
          else return { ...prev };
        } else return { ...prev };
      });
    },
    properties.isPlaying ? 100 : null
  );

  useEffect(() => {
    setProperties({ ...properties, time: [0], isPlaying: false });
    played.current = 0;
  }, [numbers]);

  useEffect(() => {
    tl.timeScale(Number(properties.speed));
    if (properties.isPlaying) {
      tl.play();
      if (played.current === 0) played.current = 1;
    } else {
      tl.pause();
    }
  }, [properties]);

  const onfullScreen = () => {
    const container = document.getElementById("animation");
    if (!document.fullscreenElement) {
      container?.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
      setIsFullScreen(true);
      const oppositeOrientation = (screen.orientation as any).type.startsWith(
        "portrait"
      )
        ? "landscape"
        : "portrait";
      (screen.orientation as any).lock(oppositeOrientation);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
      screen.orientation.unlock();
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        e.preventDefault();
        e.code === "Space" &&
          setProperties({ ...properties, isPlaying: !properties.isPlaying });
      }}
    >
      <div className="flex justify-between items-center flex-col">
        <div className="w-[100%] my-4 flex flex-col">
          <Slider
            defaultValue={[0]}
            max={tl.duration()}
            step={0.1}
            value={properties.time}
            onValueChange={(value) => {
              setProperties({ ...properties, time: value });
              tl.seek(value[0]);
            }}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex justify-between w-[100%]">
            <div>
              <span>{Math.floor(properties.time[0])}</span> / <span>{Math.floor(tl.duration())}</span>
            </div>
          <div className="flex gap-2 grow justify-center">

            <Button
              variant="outline"
              onClick={() =>
                setProperties({
                  ...properties,
                  isPlaying: !properties.isPlaying,
                })
              }
            >
              {properties.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{properties.speed}x</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" containerDiv="animation">
                <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={properties.speed}
                  onValueChange={(value) =>
                    setProperties({ ...properties, speed: value })
                  }
                >
                  <DropdownMenuRadioItem value="0.25">
                    0.25
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="0.5">0.5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="0.75">
                    0.75
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.25">
                    1.25
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.5">1.5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.75">
                    1.75
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button
              id="fullscreenButton"
              onClick={onfullScreen}
              variant={"outline"}
            >
              {isFullScreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
