import { FC, useRef } from "react";
import { LandingSectionProps } from "./models";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const LandingSection: FC<LandingSectionProps> = ({
  title,
  subtitle,
  image,
  direction,
}) => {
  const scrollRef = useRef(null);

  return (
    <section className="w-scrreen h-screen relative px-[10vw] py-[10vh] flex items-center">
      {direction === "right" ? (
        <>
          <motion.div
            className="w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h1
              ref={scrollRef}
              className="text-8xl text__primary--gradient font-bold"
            >
              {title}
            </h1>
            <p className="text-xl w-5/6 mt-5 ">{subtitle}</p>
          </motion.div>

          <motion.div
            className="w-1/2 ml-auto"
            initial={{ x: 900 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <img loading="lazy" src={`./svg/${image}.svg`} />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className="w-1/2"
            initial={{ x: -900 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <img loading="lazy" src={`./svg/${image}.svg`} />
          </motion.div>

          <motion.div
            className="w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h1
              ref={scrollRef}
              className="text-8xl text__primary--gradient font-bold text-right"
            >
              {title}
            </h1>
            <p className="text-xl w-5/6 mt-5 text-right ml-auto">{subtitle}</p>
          </motion.div>
        </>
      )}
    </section>
  );
};
