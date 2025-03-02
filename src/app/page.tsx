"use client";

import "react-chatbot-kit/build/main.css";
import HeroContent from "@/components/landing/HeroContent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-600 to-yellow-500 text-white">
      <HeroContent />

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-200">
        Made with ❤️ by Anika Radhakrishnan, Kaavya Mahajan, Sophie Lin, and
        Emmett Quan
      </footer>
    </div>
  );
}
