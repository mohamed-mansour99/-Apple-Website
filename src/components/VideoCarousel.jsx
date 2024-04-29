import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const VideoRef = useRef([]);
  const VideoSpanRef = useRef([]);
  const VideoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        VideoRef.current[videoId].pause();
      } else {
        startPlay && VideoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = VideoSpanRef.current;
    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [startPlay, videoId]);

  useGSAP(()=>{
    gsap.to('#video',{
    scrollTrigger:{
        trigger:"#video",
        toggleActions:'restart none none none',
    },
    onComplete:()=>{
        setVideo((pre)=>({...pre,startPlay:true,isPlaying:true}))
    }
    })
  },[isEnd,videoId])


  //   const handleVideo = (videoId) => {
  //     if (videoId < 3) {
  //       setVideo((prevVideo) => ({
  //        ...prevVideo,
  //         videoId: videoId,
  //         startPlay: true,
  //       }));
  //     } else {
  //       setVideo((prevVideo) => ({
  //        ...prevVideo,
  //         videoId: videoId,
  //         isLastVideo: true,
  //         startPlay: true,
  //       }));
  //     }
  //   };
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false,videoId: 0 }));
        break;
        case "play":
        setVideo((pre) => ({ ...pre,isPlaying:!pre.isPlaying,videoId: 0 }));
        break;
      default:
        return video;
    }
  };


  return (
    <>
      <div className="flex items-center justify-between">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm-pr-20 pr-10">
            <div className="video-carousel_container ">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="Video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (VideoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md-text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {VideoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (VideoSpanRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (VideoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt="controls"
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
