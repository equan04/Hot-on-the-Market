import { useState } from "react";
import SwipeCard from "./SwipeCard";

const companies = [
  {
    ticker: "COF",
    companyName: "CAPITAL ONE",
    yearIncorporated: 1994,
    industry: "Financial Services",
    revenue: "7,550,000,000",
    stockPrice: "200.55",
    percentChange: "12.22",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Capital_One_logo.svg/2560px-Capital_One_logo.svg.png",
    caption: "I'd like to invest in our future 💰😉",
  },
  {
    ticker: "AAPL",
    companyName: "APPLE",
    yearIncorporated: 1977,
    industry: "Information Technology",
    revenue: "124,300,000,000",
    stockPrice: "241.4",
    percentChange: "-1.01",
    imageUrl: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
    caption: "You’re the Apple of my eye 🍎😍",
  },
  {
    ticker: "DUOL",
    companyName: "DUOLINGO",
    yearIncorporated: 2011,
    industry: "Education Technology",
    revenue: "192,590,000",
    stockPrice: "312.07",
    percentChange: "-4.24",
    imageUrl: "https://1000logos.net/wp-content/uploads/2020/10/Duolingo-logo.png",
    caption: "Wanna practice some love languages? 🇪🇸😘",
  },
  {
    ticker: "MCD",
    companyName: "MCDONALD'S",
    yearIncorporated: 1940,
    industry: "Fast Food Restaurants",
    revenue: "6,390,000,000",
    stockPrice: "308.33",
    percentChange: "-0.52",
    imageUrl: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    caption: "You make my heart McFlurry 🍨💗",
  },
  {
    ticker: "COST",
    companyName: "COSTCO",
    yearIncorporated: 1983,
    industry: "Discount Stores",
    revenue: "62,150,000,000",
    stockPrice: "241.4",
    percentChange: "-1.01",
    imageUrl: "https://www.pngall.com/wp-content/uploads/13/Costco-Logo-PNG-Images.png",
    caption: "Let’s make every moment bigger… together 🏬🛍️",
  },
  {
    ticker: "TSLA",
    companyName: "TESLA",
    yearIncorporated: 2003,
    industry: "Automotive and Energy",
    revenue: "25,710,000,000",
    stockPrice: "293.04",
    percentChange: "-22.74",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1024px-Tesla_logo.png",
    caption: "You’ve got the drive, now let’s electrify this 🏎️⚡",
  },
  {
    ticker: "NLFX",
    companyName: "NETFLIX",
    yearIncorporated: 1997,
    industry: "Entertainment",
    revenue: "10,240,000,000",
    stockPrice: "980.56",
    percentChange: "10.58",
    imageUrl: "https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png",
    caption: "Let’s Netflix and never leave the couch 🛋️😏",
  },
  {
    ticker: "WBA",
    companyName: "WALGREENS",
    yearIncorporated: 1909,
    industry: "Retail-Drug Stores",
    revenue: "39,460,000,000",
    stockPrice: "10.7",
    percentChange: "16.43",
    imageUrl: "https://logos-world.net/wp-content/uploads/2021/11/Walgreens-Logo.png",
    caption: "I’ve got the prescription for your heart🩺❤️",
  },
  {
    ticker: "RDDT",
    companyName: "REDDIT",
    yearIncorporated: 2005,
    industry: "Business Services",
    revenue: "427,710,000",
    stockPrice: "161.78",
    percentChange: "-2.49",
    imageUrl: "https://redditinc.com/hs-fs/hubfs/Reddit%20Inc/Brand/Reddit_Logo.png",
    caption: "Let’s upvote our love ⬆️💕",
  },
  {
    ticker: "ABNB",
    companyName: "AIRBNB",
    yearIncorporated: 2007,
    industry: "Travel Services",
    revenue: "2,480,000,000",
    stockPrice: "138.87",
    percentChange: "5.62",
    imageUrl: "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg",
    caption: "Want to stay the night? I’ve got the perfect place 🏡🤭",
  },
  {
    ticker: "AMZN",
    companyName: "AMAZON",
    yearIncorporated: 1994,
    industry: "Internet Retail",
    revenue: "187,790,000,000",
    stockPrice: "208.65",
    percentChange: "-3.24",
    imageUrl: "https://images.seeklogo.com/logo-png/40/2/amazon-icon-logo-png_seeklogo-405254.png",
    caption: "Fall in love with your cart all over again 🛒💖",
  }
];

export default function SwipeDeck() {
    const [index, setIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [rejects, setRejects] = useState<string[]>([]);
  
    const handleSwipe = (direction: "left" | "right") => {
      const company = companies[index];
      setSwipeDirection(direction);
  
      if (direction === "right") {
        setFavorites((prev) => [...prev, company.companyName]);
      } else if (direction === "left") {
        setRejects((prev) => [...prev, company.companyName]);
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
              <div className="text-center mt-12 px-8"> {/* Increased top margin and added padding */}
                <p className="text-3xl font-bold mb-6">No more profiles to look at!</p> {/* Increased font size and bottom margin */}
  
                {/* Display favorites and rejects */}
                
            <div className="mt-6 text-lg">
            <div className="mb-8"> {/* Added bottom margin */}
                <h3 className="font-bold text-2xl mb-4">Favorites ❤️🥹</h3> {/* Larger heading and margin */}
                <div className="flex gap-6 flex-wrap justify-center"> {/* Increased gap size */}
                {favorites.map((fav, idx) => {
                    const company = companies.find((company) => company.companyName === fav);
                    return (
                        
                    <div
                        key={idx}
                        className="border-2 rounded-lg shadow-lg p-4 w-36 text-center"
                        style={{ borderColor: '#138020', backgroundColor: '#ffffff' }}
                    >
                        <img
                        src={company?.imageUrl}
                        alt={company?.companyName}
                        className="w-16 h-16 object-contain mx-auto mb-2" // Logo size and alignment
                        />
                    </div>
                    );
                })}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-4">Rejects 💔🥺</h3> {/* Larger heading and margin */}
                <div className="flex gap-6 flex-wrap justify-center"> {/* Increased gap size */}
                {rejects.map((rej, idx) => {
                    const company = companies.find((company) => company.companyName === rej);
                    return (
                    <div
                        key={idx}
                        className="border-2 rounded-lg shadow-lg p-4 w-36 text-center"
                        style={{ borderColor: '#C70039', backgroundColor: '#ffffff' }}
                    >
                        <img
                        src={company?.imageUrl}
                        alt={company?.companyName}
                        className="w-16 h-16 object-contain mx-auto mb-2" // Logo size and alignment
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