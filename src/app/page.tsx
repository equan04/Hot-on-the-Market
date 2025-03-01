"use client";
import { motion } from "framer-motion";
import Image from "next/image"; 
import LineChart from "./lineCharts";

// // Define dummy data
// const dummyCompanyData = {
//   name: "Company XYZ",
//   assets: [1000, 1200, 1500, 1800, 2100],
//   liabilities: [500, 600, 700, 800, 900],
//   stockholdersEquity: [500, 600, 800, 1000, 1200],
//   revenue: [200, 250, 300, 350, 400],
//   netIncome: [50, 60, 70, 80, 90],
//   opIncome: [150, 170, 190, 210, 230],
//   compIncome: [150, 160, 170, 180, 190],
//   epsBasic: [1.2, 1.3, 1.5, 1.6, 1.7],
//   epsDiluted: [1.1, 1.2, 1.3, 1.4, 1.5],
//   commonStock: [500, 520, 550, 580, 600],
//   year: [2021, 2022, 2023, 2024, 2025],
//   quarter: [1, 2, 3, 4, 1],
//   isQuarterly: true,
// };

// export default function Home() {
//   return <LineChart companyData={dummyCompanyData} />;
// }



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-red-500 text-white p-6">
      {/* Hero Section */}
      <header className="text-center max-w-3xl">
        <div className="text-4xl sm:text-6xl font-bold leading-tight flex flex-col">
          <div>Who Needs Love 💖 </div>
          <div>When You Can Make Money? 🤑</div>
        </div>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Swipe. Match. Invest. Discover the hottest companies looking for backers like you.
        </p>
      </header>

      {/* Call-to-Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="/signup"
          className="bg-white text-pink-500 hover:bg-gray-200 font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all"
        >
          Get Started
        </a>
        <a
          href="/learn-more"
          className="bg-transparent border border-white text-white hover:bg-white hover:text-pink-500 font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all"
        >
          Learn More
        </a>
      </div>

      {/* Image Section with Scroll-triggered Animations */}
      <div className="mt-10 space-y-10">
        {/* Image 1 */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/dating-app-illustration.svg"
            alt="Dating app illustration"
            width={400}
            height={300}
            priority
          />
        </motion.div>
        <div className="text-center text-lg text-gray-200 mt-4">
          <p>Swipe through stock profiles as if you're swiping on a dating app. Get to know each company's bio, recent news, and performance.</p>
        </div>

        {/* Image 2 */}
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src="/dating-app-illustration2.svg"
            alt="Stock profile with details"
            width={400}
            height={300}
            priority
          />
        </motion.div>
        <div className="text-center text-lg text-gray-200 mt-4">
          <p>On hover, see key financial stats like gross profit and shares outstanding. Know exactly what you're investing in!</p>
        </div>

        {/* Image 3 */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <Image
            src="/dating-app-illustration3.svg"
            alt="Visualization of stock data"
            width={400}
            height={300}
            priority
          />
        </motion.div>
        <div className="text-center text-lg text-gray-200 mt-4">
          <p>Visualize stock data in various timeframes to help you track the performance over time and make smarter investment decisions.</p>
        </div>

        {/* Image 4 */}
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <Image
            src="/dating-app-illustration4.svg"
            alt="News about stock performance"
            width={400}
            height={300}
            priority
          />
        </motion.div>
        <div className="text-center text-lg text-gray-200 mt-4">
          <p>Stay up-to-date with the latest news affecting the stock’s performance. Don’t miss out on the latest updates!</p>
        </div>
      </div>

      {/* Call to Action: Ready to Invest? */}
      <div className="mt-10 text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Ready to invest? Start here. 💼📈
        </h2>
        <a
          href="/signup"
          className="mt-4 inline-block bg-white text-pink-500 hover:bg-gray-200 font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all"
        >
          Start Investing Now
        </a>
      </div>

      {/* Footer */}
      <footer className="text-sm text-gray-200 mt-auto">
        Made with ❤️ by Anika Radhakrishnan, Kaavya Mahajan, Sophie Lin, and Emmett Quan
      </footer>
    </div>
  );
}


