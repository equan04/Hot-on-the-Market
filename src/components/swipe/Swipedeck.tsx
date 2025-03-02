"use client"
import { useState } from "react";
import SwipeCard from "./SwipeCard";
import companies from "@/data/companies";


export default function SwipeDeck() {
    const [index, setIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [rejects, setRejects] = useState<string[]>([]);
  
    const handleSwipe = (direction: "left" | "right") => {
      const company = companies[index];
      setSwipeDirection(direction);
  
      if (direction === "right") {
        setFavorites((prev) => [...prev, company.name]);
      } else if (direction === "left") {
        setRejects((prev) => [...prev, company.name]);
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
      <div
        className="relative w-full h-screen"
        style={{
          background: `
            url('https://cdn.pixabay.com/photo/2018/01/21/20/37/heart-3097495_640.png') repeat,
            linear-gradient(to bottom, #fbc2eb, #a6c1ee)
          `,
        }}
      >
        {/* Instructions Section */}
        <div
          className="absolute top-0 left-0 right-0 text-center py-3 shadow-md z-10"
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
          className={`absolute top-0 left-0 w-full h-full bg-opacity-50 transition-all duration-500 ${
            swipeDirection === "right" ? "bg-green-400" : swipeDirection === "left" ? "bg-red-400" : ""
          }`}
          style={{
            opacity: swipeDirection ? 1 : 0,
          }}
        />
  
        {/* Swipeable Card Section */}
        <div className="relative w-full h-full flex justify-center items-center transition-all duration-500">
          {index < companies.length ? (
            <div
              className={`transition-transform duration-500 ${
                swipeDirection === "right"
                  ? "translate-x-[100vw]" // Move the card to the right
                  : swipeDirection === "left"
                  ? "translate-x-[-100vw]" // Move the card to the left
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
            <div
              className="w-full h-full flex justify-center items-center text-center text-black"
              style={{
                background: "linear-gradient(to bottom, #fbc2eb, #a6c1ee)", // Gradient background for the "No more profiles" section
                backgroundSize: "cover", // Cover the entire area
              }}
            >
              <div className="text-center mt-12 px-8">
                <p className="text-3xl font-bold mb-6">No more profiles to look at!</p>
  
                {/* Display favorites and rejects */}
                <div className="mt-6 text-lg">
                  <div className="mb-8">
                    <h3 className="font-bold text-2xl mb-4">Favorites ❤️🥹</h3>
                    <div className="flex gap-6 flex-wrap justify-center">
                      {favorites.map((fav, idx) => {
                        const company = companies.find((company) => company.name === fav);
                        const stockUrl = `https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=${company?.ticker}`;
                        return (
                            <a
                            key={idx}
                            href={stockUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 rounded-lg shadow-lg p-4 w-36 sm:w-48 md:w-56 text-center hover:shadow-xl transition duration-300"
                            style={{ borderColor: "#138020", backgroundColor: "#ffffff" }}
                          >
                            <img
                              src={company?.imageUrl}
                              alt={company?.name}
                              className="w-16 h-16 object-contain mx-auto mb-2"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
        
  
                  <div>
                    <h3 className="font-bold text-2xl mb-4">Rejects 💔🥺</h3>
                    <div className="flex gap-6 flex-wrap justify-center">
                      {rejects.map((rej, idx) => {
                        const company = companies.find((company) => company.name === rej);
                        return (
                          <div
                            key={idx}
                            className="border-2 rounded-lg shadow-lg p-4 w-36 sm:w-48 md:w-56 text-center"
                            style={{ borderColor: "#C70039", backgroundColor: "#ffffff" }}
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
  
                {/* Restart Button */}
                <button
                  onClick={handleRestart}
                  className="mt-8 px-10 py-5 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-red-600 text-xl transition duration-300"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  