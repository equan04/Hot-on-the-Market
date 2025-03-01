import { useState } from "react";
import SwipeCard from "./SwipeCard";

const companies = [
  {
    ticker: "COF",
    companyName: "CAPITAL ONE FINANCIAL CORP",
    yearIncorporated: 1994,
    industry: "Financial Services",
    revenue: "7,550,000,000",
    stockPrice: "200.55",
    percentChange: "12.22",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Capital_One_logo.svg/2560px-Capital_One_logo.svg.png",
    caption: "I'd like to invest in our future 😉",
  },
  {
    ticker: "AAPL",
    companyName: "APPLE INC",
    yearIncorporated: 1977,
    industry: "Information Technology",
    revenue: "124,300,000,000",
    stockPrice: "241.4",
    percentChange: "-1.01",
    imageUrl: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
    caption: "You’re the Apple of my eye.",
  },
  {
    ticker: "DUOL",
    companyName: "DUOLINGO, INC.",
    yearIncorporated: 2011,
    industry: "Education Technology",
    revenue: "192,590,000",
    stockPrice: "312.07",
    percentChange: "-4.24",
    imageUrl: "https://1000logos.net/wp-content/uploads/2020/10/Duolingo-logo.png",
    caption: "Wanna practice some love languages?",
  },
  {
    ticker: "MCD",
    companyName: "MCDONALDS CORP",
    yearIncorporated: 1940,
    industry: "Fast Food Restaurants",
    revenue: "6,390,000,000",
    stockPrice: "308.33",
    percentChange: "-0.52",
    imageUrl: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    caption: "You’re the Big Mac to my heart.",
  },
  {
    ticker: "COST",
    companyName: "COSTCO WHOLESALE CORP /NEW",
    yearIncorporated: 1983,
    industry: "Discount Stores",
    revenue: "62,150,000,000",
    stockPrice: "241.4",
    percentChange: "-1.01",
    imageUrl: "https://www.pngall.com/wp-content/uploads/13/Costco-Logo-PNG-Images.png",
    caption: "Let’s make every moment bigger… together.",
  },
  {
    ticker: "TSLA",
    companyName: "TESLA, INC.",
    yearIncorporated: 2003,
    industry: "Automotive and Energy",
    revenue: "25,710,000,000",
    stockPrice: "293.04",
    percentChange: "-22.74",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1024px-Tesla_logo.png",
    caption: "You’ve got the drive, now let’s electrify this.",
  },
  {
    ticker: "NLFX",
    companyName: "NETFLIX INC",
    yearIncorporated: 1997,
    industry: "Entertainment",
    revenue: "10,240,000,000",
    stockPrice: "980.56",
    percentChange: "10.58",
    imageUrl: "https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png",
    caption: "Let’s Netflix and never leave the couch.",
  },
  {
    ticker: "WBA",
    companyName: "WALGREENS BOOTS ALLIANCE, INC.",
    yearIncorporated: 1909,
    industry: "Retail-Drug Stores",
    revenue: "39,460,000,000",
    stockPrice: "10.7",
    percentChange: "16.43",
    imageUrl: "https://logos-world.net/wp-content/uploads/2021/11/Walgreens-Logo.png",
    caption: "I’ve got the prescription for your heart.",
  },
  {
    ticker: "RDDT",
    companyName: "REDDIT, INC.",
    yearIncorporated: 2005,
    industry: "Business Services",
    revenue: "427,710,000",
    stockPrice: "161.78",
    percentChange: "-2.49",
    imageUrl: "https://redditinc.com/hs-fs/hubfs/Reddit%20Inc/Brand/Reddit_Logo.png",
    caption: "Let’s upvote our love.",
  },
  {
    ticker: "ABNB",
    companyName: "AIRBNB, INC.",
    yearIncorporated: 2007,
    industry: "Travel Services",
    revenue: "2,480,000,000",
    stockPrice: "138.87",
    percentChange: "5.62",
    imageUrl: "https://cdn.freebiesupply.com/logos/large/2x/airbnb-2-logo-svg-vector.svg",
    caption: "Want to stay the night? I’ve got the perfect place.",
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
  
      // Reset the background color after a short delay
      setTimeout(() => {
        setSwipeDirection(null);
      }, 300);
    };
  
    const handleRestart = () => {
      setIndex(0);
      setSwipeDirection(null);
      setFavorites([]);
      setRejects([]);
    };
  
    return (
      <div className="relative w-full h-screen bg-gradient-to-b from-pink-300 via-red-300 to-yellow-400">
        {/* Instructions Section */}
        <div className="absolute top-0 left-0 right-0 bg-white text-center py-4 shadow-md z-10">
          <h2 className="text-xl font-bold text-gray-800">Press Like or Hit Reject</h2>
          <p className="text-sm text-gray-600">You can explore company profiles tapping on the cards. Choose your favorites!</p>
        </div>
  
        {/* Swipeable Card Section */}
        <div
          className={`relative w-full h-full flex justify-center items-center ${
            swipeDirection === "right" ? "bg-green-400" : swipeDirection === "left" ? "bg-red-400" : ""
          }`}
        >
          {index < companies.length ? (
            <SwipeCard
              key={index}
              company={companies[index]}
              onSwipe={handleSwipe}
            />
          ) : (
            <div className="text-center mt-10 text-white">
              <p>No more profiles to look at!</p>
              <button
                onClick={handleRestart}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }