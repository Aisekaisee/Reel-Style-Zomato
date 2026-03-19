import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          {
            withCredentials: true,
          },
        );
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      } catch (error) {
        console.error("Error fetching food partner profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const business = {
    name: profile?.name || "Food Partner Name",
    address: profile?.address || "Food Partner Address",
    totalMeals: videos.length || 0,
    customersServed: profile?.customersServed || 0,
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-4 pb-8 pt-5 sm:px-6 sm:pt-8">
        <section className="rounded-3xl border border-orange-300/30 bg-linear-to-br from-orange-600/55 via-orange-700/35 to-black/80 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-500/30 shadow-[0_8px_24px_rgba(251,146,60,0.35)] sm:h-28 sm:w-28">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-orange-300 bg-orange-500/30 shadow-[0_8px_24px_rgba(251,146,60,0.35)] sm:h-28 sm:w-28">
                <img
                  src="https://images.unsplash.com/photo-1769709992557-45387590ae7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2Vuc2hpbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Business logo"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-extrabold leading-tight text-white sm:text-3xl">
                {business.name}
              </h1>
              <p className="mt-2 truncate text-sm text-orange-100/80 sm:text-base">
                {business.address}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            <article className="rounded-2xl border border-orange-300/25 bg-black/35 px-3 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:px-4">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-100/70 sm:text-sm">
                Total Meals
              </p>
              <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {business.totalMeals}
              </p>
            </article>

            <article className="rounded-2xl border border-orange-300/25 bg-black/35 px-3 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:px-4">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-100/70 sm:text-sm">
                Customers Served
              </p>
              <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {business.customersServed}
              </p>
            </article>
          </div>
        </section>

        <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-orange-300/45 to-transparent sm:my-7" />

        <section
          aria-label="Business videos"
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3"
        >
          {videos.map((video, index) => (
            <article
              key={video._id || video.id || video.video || `video-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/15 bg-linear-to-br from-orange-500/10 to-black/85 shadow-[0_10px_26px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-[1.015] hover:border-orange-300/70 hover:shadow-[0_14px_34px_rgba(249,115,22,0.28)] active:scale-[0.985]"
            >
              {video.video ? (
                <video
                  src={video.video}
                  className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-95"
                  preload="metadata"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={`https://picsum.photos/seed/reel-${video._id || video.id || index}/600/600`}
                  alt={video.title || `Video ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-65 transition duration-300 group-hover:opacity-90"
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm sm:text-sm">
                {video.title || `Video ${index + 1}`}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Profile;
