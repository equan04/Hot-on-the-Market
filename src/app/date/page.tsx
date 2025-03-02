import SwipeDeck from "@/components/swipe/Swipedeck";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `
          url('https://cdn.pixabay.com/photo/2018/01/21/20/37/heart-3097495_640.png') repeat,
          linear-gradient(to bottom, #fbc2eb, #a6c1ee)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <SwipeDeck />
    </div>
  );
}
