import { useEffect, useRef, useState } from "react";
import StyledMarkdown from "../../../components/StyledMarkdown";
import style from "./MediaSectionComponents.module.scss";
import { IMediaUnit } from '@interfaces/IObjectsData';

const SoundsTabContent = ({ data }: { data: IMediaUnit[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const mediaListRef = useRef<HTMLDivElement | null>(null);

  const [soundVolume, setSoundVolume] = useState(0.25);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = soundVolume;
    }
  }, [activeTab]);

  if (data && data.length > 0) {
    return (
      <div className={style.sectionOfMedia}>
        <h3 className={style.sectionHeader}>Sounds</h3>
        <div className={`${style.sectionContent} ${style.soundsSection}`}>
          <div
            ref={mediaListRef}
            className={`${style.mediaList} ${style.soundsList}`}
          >
            {data.map((sound: IMediaUnit, index: number) => (
              <button
                key={index}
                className={`${style.selectButton} ${style.soundSelectButton} ${activeTab === index ? style.activeButton : style.inactiveButton}`}
                onClick={() => { setActiveTab(index) }}
              >{sound.Title}</button>
            ))}
          </div>

          <hr className={style.separatorVertical} />

          {data[activeTab] && data[activeTab].Url ?
            <div className={style.mediaContent}>
              <div className={style.mediaFile}>
                <audio
                  ref={audioRef}
                  onVolumeChange={(e: React.ChangeEvent<HTMLAudioElement>) => setSoundVolume(e.target.volume)}
                  controls>
                  <source src={data[activeTab].Url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className={style.mediaDescription}>
                {data[activeTab].Description && data[activeTab].Description.length > 0 ?
                  <StyledMarkdown>{data[activeTab].Description}</StyledMarkdown>
                  :
                  <p className={style.noData}>This sound description is unknown...</p>
                }
              </div>
            </div>
            :
            <p className={style.noData}>This sound is missing...</p>
          }
        </div>
      </div>
    );
  } else {
    return <p className={style.noData}>Sounds are unknown...</p>;
  }
};

const ImagesAndVideosTabContent = ({ data, title = "Image" }: { data: IMediaUnit[], title?: string }) => {
  const [activeTab, setActiveTab] = useState(0);

  const showcaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showcaseRef.current) {
      const container = showcaseRef.current;

      container.style.scrollSnapType = "y proximity";
      Array.from(container.children).forEach((child) => {
        const button = child as HTMLElement;
        button.style.scrollSnapAlign = "center";
      });

      const activeButton = container.children[activeTab] as HTMLElement;
      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const buttonCenter = buttonRect.top + buttonRect.height / 2;
        const containerCenter = containerRect.top + containerRect.height / 2;

        const scrollOffset = buttonCenter - containerCenter;

        container.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  if (data && data.length > 0) {
    return (
      <div className={style.sectionOfMedia}>
        <h3 className={style.sectionHeader}>{title[0].toUpperCase() + title.slice(1)}</h3>
        <div className={`${style.sectionContent} ${style.imagesSection}`}>
          <div ref={showcaseRef} className={`${style.mediaList} ${style.imagesAndVideosList}`}>
            {data.map((image: IMediaUnit, index: number) => (
              <button
                key={index}
                className={`${style.selectButton} ${style.imageSelectButton} ${activeTab === index ? style.activeButton : style.inactiveButton}`}
                onClick={() => setActiveTab(index)}
              >
                <img
                  src={image.Url}
                  alt={image.Description ? image.Description : image.Title}
                />
              </button>
            ))}
          </div>

          <hr className={style.separatorVertical} />

          {data[activeTab] && data[activeTab].Url ?
            <div className={style.mediaContent}>
              <h4 className={style.subheader}>{data[activeTab].Title}</h4>
              <div className={style.mediaFile}>
                <img src={data[activeTab].Url} alt={data[activeTab].Description} />
              </div>
              <div className={style.imageDescription}>
                {data[activeTab].Description && data[activeTab].Description.length > 0 ?
                  <StyledMarkdown>{data[activeTab].Description}</StyledMarkdown>
                  :
                  <p className={style.noData}>This media description is missing...</p>
                }
              </div>
            </div>
            :
            <p className={style.noData}>{`This ${title[0].toLowerCase() + title.slice(1)} is missing...`}</p>
          }
        </div>
      </div>
    );
  } else {
    return <p className={style.noData}>{`${title[0].toUpperCase() + title.slice(1)}s are unknown...`}</p>;
  }
};

export {
  SoundsTabContent,
  ImagesAndVideosTabContent,
};