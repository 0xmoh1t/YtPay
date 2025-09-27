import React, { useEffect, useState, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import Helmet from "react-helmet";


export default function BackgroundAnimation({
  THREE,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200.0,
  minWidth = 200.0,
  scale = 1.0,
  scaleMobile = 1.0,
  color = "purple",
  points = 20.0,
  spacing = 12.0,
}) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Wait until THREE is available
      if (!vantaEffect && window.THREE) {
        setVantaEffect(
          NET({
            el: myRef.current,
            THREE: window.THREE,
            mouseControls,
            touchControls,
            gyroControls,
            minHeight,
            minWidth,
            scale,
            scaleMobile,
            color,
            points,
            spacing,
          })
        );

        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div>
      <Helmet>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
      </Helmet>

      {/* myRef creates a ref to dom node */}
      <div ref={myRef} style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}
