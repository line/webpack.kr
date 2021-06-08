// Import External Dependencies
import { Component } from 'react';

// Load Images
import HomeSVG from './SplashVizSVG';

// Import Components
import Cube from '../Cube/Cube';
import TextRotator from '../TextRotater/TextRotater';

// Load Styling
import './SplashViz.scss';

export default class SplashViz extends Component {
  render() {
    return (
      <section className="splash-viz">
        <h1 className="splash-viz__heading">
          <TextRotator delay={ 5000 } repeatDelay={ 5000 } maxWidth={ 175 }>
            <span> 애셋을 </span>
            <span> 스크립트를 </span>
            <span> 이미지를 </span>
            <span> 스타일을 </span>
          </TextRotator>
          <span>번들해 보세요</span>
        </h1>
        <div
          className="splash-viz__modules"
          dangerouslySetInnerHTML={{ __html: HomeSVG.body }}
        ></div>
        <Cube
          className="splash-viz__cube"
          depth={120}
          repeatDelay={5000}
          continuous
        />
      </section>
    );
  }
}
