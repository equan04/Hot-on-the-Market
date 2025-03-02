import { ReactNode } from "react";

interface SwipeScreenProps {
  children: ReactNode;
  showHearts?: boolean;
}

export default function SwipeScreen({
  children,
  showHearts = false,
}: SwipeScreenProps) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: showHearts
          ? `
              url('https://cdn.pixabay.com/photo/2018/01/21/20/37/heart-3097495_640.png') repeat,
              linear-gradient(to bottom, #fbc2eb, #a6c1ee)
            `
          : "linear-gradient(to bottom, #fbc2eb, #a6c1ee)",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
