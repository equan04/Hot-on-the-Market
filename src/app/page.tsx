"use client";

import "react-chatbot-kit/build/main.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-500 to-red-500 text-white">
      {/* Main Content - Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 pt-10">
        {/* Hero Section */}
        <header className="text-center max-w-3xl">
          <div className="text-4xl sm:text-6xl font-bold leading-tight flex flex-col">
            <div>Who Needs Love 💖 </div>
            <div>When You Can Make Money? 🤑</div>
          </div>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Swipe. Match. Invest. Discover the hottest companies looking for
            backers like you.
          </p>
        </header>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/date"
            className="bg-white text-pink-500 hover:bg-gray-200 font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="bg-transparent border border-white text-white hover:bg-white hover:text-pink-500 font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mb-4 text-sm text-gray-200">
        Made with ❤️ by Anika Radhakrishnan, Kaavya Mahajan, Sophie Lin, and
        Emmett Quan
      </footer>
    </div>
  );
}
