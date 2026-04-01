// Import External Dependencies
import { Component } from "react";

// Load Images

// Import Components
import Cube from "../Cube/Cube.jsx";
import TextRotator from "../TextRotater/TextRotater.jsx";
import HomeSVG from "./SplashVizSVG.mjs";

export default class SplashViz extends Component {
  render() {
    return (
      <section className="relative h-[clamp(35rem,calc(100vh-80px),45rem)] bg-blue-800 grid grid-rows-[auto_1fr] overflow-hidden p-4 max-lg:h-[clamp(30rem,calc(100vh-80px),35rem)] max-[425px]:min-h-[clamp(40rem,calc(100vh-80px),50rem)] dark:bg-gray-900!">
        <h1 className="flex flex-wrap items-center justify-center text-white text-[33.178px] md:text-[39.813px] text-center font-[200] mt-[80px] md:mt-[90px] row-start-1 row-end-2">
          <TextRotator delay={5000} repeatDelay={5000} maxWidth={175}>
            <span> 애셋을 </span>
            <span> 스크립트를 </span>
            <span> 이미지를 </span>
            <span> 스타일을 </span>
          </TextRotator>
          <span>번들해 보세요</span>
        </h1>
        <div
          className="absolute top-1/2 left-1/2 w-[60vw] min-w-[550px] max-w-[768px] mx-auto -translate-x-1/2 -translate-y-1/2 hidden md:block row-start-2 row-end-3 [&_img]:pt-4 [&_img]:w-full [&_img]:h-full"
          dangerouslySetInnerHTML={{ __html: HomeSVG.body }}
        ></div>
        <Cube
          className="absolute inset-0 m-auto z-[1] row-start-2 row-end-3"
          depth={120}
          repeatDelay={5000}
          continuous
        />
      </section>
    );
  }
}
