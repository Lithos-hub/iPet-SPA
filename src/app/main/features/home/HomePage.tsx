import PetsIcon from "@mui/icons-material/Pets";

import { GradientIcon } from "@/components/GradientIcon";

export const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <section className="flex justify-center">
          <div className="text__primary--gradient flex gap-2 items-center">
            <h1 className="text-7xl">iPet</h1>
            <div className="text-[50px]">
              <GradientIcon>
                <PetsIcon
                  fontSize="inherit"
                  sx={{ fill: "url(#linearColors)" }}
                />
              </GradientIcon>
            </div>
          </div>
        </section>
        <main className="bg-white shadow-lg rounded-xl p-5">
          <section className="grid grid-cols-3 bg-primary rounded-xl shadow-xl p-5 gap-5">
            <article className="bg-white rounded-xl shadow-xl p-5 relative">
              <img
                src={`/3d-icons/calendar-alt.png`}
                className="h-[80px] absolute -top-[40px] -right-5 z-20"
              />
              <h3>Next appointment</h3>
            </article>
            <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative">
              <img
                src={`/3d-icons/bulb.png`}
                className="h-[80px] absolute -top-[40px] -right-5 z-20"
              />
              <h3>Tip of the day</h3>
              <div className="p-5 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sit
                ducimus nam quibusdam nobis soluta, ut laboriosam quae
                distinctio magni provident natus, in animi optio officiis harum!
                Impedit eos inventore modi illo aliquid ad, rem, repudiandae
                iusto fuga facere velit mollitia quas illum magnam qui facilis,
                rerum odio unde non.
              </div>
            </article>
            <article className="bg-white rounded-xl shadow-xl p-5 col-span-2 relative">
              <img
                src={`/3d-icons/thumbtack.png`}
                className="h-[80px] absolute -top-[40px] -right-5 z-20"
              />
              <h3>Important notes</h3>
            </article>
            <article className="bg-white rounded-xl shadow-xl p-5 col-span-1 relative">
              <img
                src={`/3d-icons/news.png`}
                className="h-[80px] absolute -top-[40px] -right-5 z-20"
              />
              <h3>News</h3>
            </article>
          </section>
        </main>
      </div>
    </>
  );
};
