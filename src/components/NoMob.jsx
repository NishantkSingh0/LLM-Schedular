import { useEffect, useState } from "react";

export default function ScreenWarning() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-center px-6">
      <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl max-w-md">
        <h1 className="text-2xl font-bold mb-2">⚠️ Unsupported Device</h1>
        <p className="text-lg">
          This Service is not built for mobile or tablet screens.
          <br />
          Please use a <span className="font-semibold">desktop or laptop</span> to proceed.
        </p>
      </div>
    </div>
  );
}
