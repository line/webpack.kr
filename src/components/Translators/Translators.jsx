import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import SmallIcon from "../../assets/icon-square-small-slack.png";
import "./Translators.css";

function Translators({ translators = [] }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!translators.length) return null;

  return (
    <div ref={ref} className="translators">
      <div className="translators__list">
        {translators.map((translator) => (
          <a
            key={translator}
            className="translator"
            href={`https://github.com/${translator}`}
          >
            <img
              alt={translator}
              src={
                inView
                  ? `https://github.com/${translator}.png?size=90`
                  : SmallIcon
              }
            />
            <span className="translator__name"> {translator}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

Translators.propTypes = {
  translators: PropTypes.array,
};

export default Translators;
