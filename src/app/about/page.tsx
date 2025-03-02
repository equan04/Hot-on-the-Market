// pages/about.tsx
export default function Home() {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-gray-900">
        <h1 className="text-4xl font-bold mb-6 text-center">About Hot on the Market</h1>
  
        <p className="text-lg mb-4">
          Welcome to <strong>Hot on the Market</strong>, where we turned the stock market into a dating app—
          because let’s be real, both involve picking the right one and hoping it doesn’t let you down.
        </p>
  
        <p className="text-lg mb-4">
          Here’s how it works: you swipe on companies based on their revenue and price highlights. 
          If something catches your eye, tap into their profile to check out the deeper stats.
        </p>
  
        <p className="text-lg mb-6 italic">
          Revenue trends? Profit margins? Risk factors? It’s all there, laid out in a way that actually makes sense.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">How to Use Hot on the Market (and Why It Matters)</h2>
  
        <p className="text-lg mb-6">
          Swiping through stocks is fun, but knowing what you’re looking at? That’s how you build a portfolio 
          that loves you back. Here’s what each section of a company’s profile tells you and why it’s important:
        </p>
  
        <h3 className="text-xl font-semibold mb-2">📌 The Meet Cute</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><strong>📈 Revenue:</strong> How much money the company is bringing in.</li>
          <li><strong>🔄 Year-to-Date % Change:</strong> How the stock has performed so far this year.</li>
          <li><strong>🏢 Industry & Age:</strong> What sector they’re in and how long they’ve been around.</li>
        </ul>
  
        <h3 className="text-xl font-semibold mb-2">📊 Getting to Know You</h3>
        <p className="text-lg mb-4">If you’re intrigued, you can check out a more in-depth profile:</p>
  
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><strong>💰 Income Metrics:</strong> Net income, operating income, comprehensive income.</li>
          <li><strong>📊 Balance Sheet:</strong> Assets, liabilities, stockholders' equity.</li>
          <li><strong>💵 Cash Position:</strong> Cash & equivalents, restricted cash.</li>
          <li><strong>📉 Revenue Trends:</strong> Total revenue, revenue from contracts.</li>
        </ul>
  
        <h3 className="text-xl font-semibold mb-2">🚀 The Hard Launch</h3>
        <p className="text-lg mb-6">
          Once you’ve properly vetted the stock, swipe right and it’ll be saved to a list with all of your favorited stocks.
          From here, you can make it official by placing an order through Fidelity!
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">Why It Matters</h2>
        <p className="text-lg mb-6">
          Investing early is key to building wealth, but financial data can be overwhelming. We've made the stock market 
          more approachable, breaking down numbers into clear insights. By turning investing into a playful, dating-like experience, 
          we’re helping you dive into your financial future with confidence.
        </p>
  
        <p className="text-lg font-semibold text-center text-blue-600">
          So, let’s stop swiping left on your money and start swiping right on your future! 💸💘
        </p>
      </div>
    );
  }
  