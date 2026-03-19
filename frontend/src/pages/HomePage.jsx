import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [reels, setReels] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            currentVideo.play().catch(() => {});
          } else {
            currentVideo.pause();
          }
        });
      },
      {
        root: containerRef.current,
        threshold: [0.8],
      },
    );

    const activeVideos = videoRefs.current.filter(Boolean);
    activeVideos.forEach((videoElement) => observer.observe(videoElement));

    return () => {
      activeVideos.forEach((videoElement) => observer.unobserve(videoElement));
      observer.disconnect();
    };
  }, [reels]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        console.log("Fetched food items:", response?.data?.foodItems);
        const foodItems = response?.data?.foodItems ?? [];
        setReels(foodItems);
        videoRefs.current = [];
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {reels.map((reel, index) => (
        <section
          key={reel._id}
          className="relative h-screen w-screen snap-start snap-always overflow-hidden"
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="absolute inset-0 h-full w-full object-cover"
            src={reel.video}
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-6">
            <div className="mx-auto w-full max-w-xl">
              <p className="mb-4 overflow-hidden text-sm font-medium leading-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:text-base">
                {reel.description}
              </p>

              <Link
                to={"/food-partner/" + reel.foodPartner}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-[0_8px_22px_rgba(249,115,22,0.45)] transition active:scale-[0.98] sm:w-auto"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default HomePage;
