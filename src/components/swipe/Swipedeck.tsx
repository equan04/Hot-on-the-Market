"use client";

import { useState } from "react";
import SwipeCard from "./SwipeCard";
import companies from "@/app/data/companies";

export default function SwipeDeck() {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  const [rejects, setRejects] = useState<string[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    const company = companies[index];
    setSwipeDirection(direction);

    if (direction === "right") {
      setFavorites((prev) => [...prev, company.displayName]);
    } else if (direction === "left") {
      setRejects((prev) => [...prev, company.displayName]);
    }

    setIndex((prev) => prev + 1);

    // Reset the swipe direction after a short delay
    setTimeout(() => {
      setSwipeDirection(null);
    }, 400);
  };

  const handleRestart = () => {
    setIndex(0);
    setSwipeDirection(null);
    setFavorites([]);
    setRejects([]);
  };

  return (
    <div className="relative min-h-screen">
      {/* Instructions Section */}
      <div
        className="sticky top-0 left-0 right-0 text-center py-3 shadow-md z-10"
        style={{
          background: "linear-gradient(to right, #f79ce4, #ff4d4d)", // Pink to Red gradient
        }}
      >
        <h2 className="text-2xl font-bold text-white drop-shadow-md">
          ❤️ Like to Swipe Right, ❌ Reject to Swipe Left
        </h2>
        <p className="text-sm text-white opacity-90">
          Explore company profiles, choosing your favorites & rejects!
        </p>
      </div>

      {/* Overlay for Swipe Feedback */}
      <div
        className={`fixed inset-0 bg-opacity-50 transition-all duration-500 ${
          swipeDirection === "right"
            ? "bg-green-400"
            : swipeDirection === "left"
            ? "bg-red-400"
            : ""
        }`}
        style={{
          opacity: swipeDirection ? 1 : 0,
        }}
      />

      {/* Swipeable Card Section */}
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] transition-all duration-500">
        {index < companies.length ? (
          <div
            className={`transition-transform duration-500 ${
              swipeDirection === "right"
                ? "translate-x-[100vw]"
                : swipeDirection === "left"
                ? "translate-x-[-100vw]"
                : ""
            }`}
          >
            <SwipeCard
              key={index}
              company={companies[index]}
              onSwipe={handleSwipe}
            />
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-2xl mx-4">
            <p className="text-3xl font-bold mb-6">
              No more profiles to look at!
            </p>

            <div className="mt-6 text-lg">
              <div className="mb-8">
                <h3 className="font-bold text-2xl mb-4">Favorites ❤️🥹</h3>
                <div className="flex gap-6 flex-wrap justify-center">
                  {favorites.map((fav, idx) => {
                    const company = companies.find(
                      (company) => company.displayName === fav
                    );
                    return (
                      <div
                        key={idx}
                        className="border-2 rounded-lg shadow-lg p-4 w-36 text-center"
                        style={{
                          borderColor: "#138020",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <img
                          src={company?.imageUrl}
                          alt={company?.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-4">Rejects 💔🥺</h3>
                <div className="flex gap-6 flex-wrap justify-center">
                  {rejects.map((rej, idx) => {
                    const company = companies.find(
                      (company) => company.displayName === rej
                    );
                    return (
                      <div
                        key={idx}
                        className="border-2 rounded-lg shadow-lg p-4 w-36 text-center"
                        style={{
                          borderColor: "#C70039",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <img
                          src={company?.imageUrl}
                          alt={company?.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-8 px-10 py-5 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-red-600 text-xl transition duration-300"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
