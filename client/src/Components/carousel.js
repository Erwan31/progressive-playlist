import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import playlits1 from '../playlits1.PNG'
import playlits2 from '../playlits2.PNG'

const items = [
  {
    children: <section className="instruction1">
                <img src={playlits1} alt="playlists"></img>
                <div >Pick one of your playlists!</div>
              </section>,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    children: <section className="instruction2">
                <div>
                <ul>Then just play around the knobs: 
                    <li>Danceable (from static to booty shaking)</li>
                    <li>Energy (from calm to intensity)</li>
                    <li>Mood (from sad to happy)</li>
                </ul>
                After that simply export your new playlist to your account in one click and enjoy!
                </div>
                <img src={playlits2} alt="playlists"></img>
            </section>,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
];

const Slides = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item, i) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.i}
      >
        {item.children}
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slides;