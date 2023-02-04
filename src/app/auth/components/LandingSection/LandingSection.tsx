import { FC } from "react";
import { LandingSectionProps } from "./models";

import { motion } from "framer-motion";

export const LandingSection: FC<LandingSectionProps> = ({
  title,
  subtitle,
  image,
  direction,
}) => {
  return (
    <section className="w-full h-screen relative px-[10vw] py-[10vh] flex items-center">
      {direction === "right" ? (
        <>
          <div className="w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <h1 className="text-8xl text__primary--gradient font-bold">
                {title}
              </h1>
              <p className="text-xl w-5/6 mt-5 ">{subtitle}</p>
            </motion.div>
          </div>
          <div className="w-1/2">
            <motion.div
              initial={{ x: 900 }}
              whileInView={{ x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <img loading="lazy" src={`./svg/${image}.svg`} />
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2">
            <motion.div
              initial={{ x: -900 }}
              whileInView={{ x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <img loading="lazy" src={`./svg/${image}.svg`} />
            </motion.div>
          </div>
          <div className="w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <h1 className="text-8xl text__primary--gradient font-bold text-right">
                {title}
              </h1>
            </motion.div>

            <p className="text-xl w-5/6 mt-5 text-right ml-auto">{subtitle}</p>
          </div>
        </>
      )}
    </section>
  );
};
