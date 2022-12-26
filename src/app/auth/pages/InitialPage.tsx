import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";

export const InitialPage = () => {
  return (
    <>
      <section className="h-[500px] w-full text-left text-white relative">
        <div className="z-20 absolute top-1/2 -translate-y-[120px] left-[10vw] w-auto flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <h1 className="text-[120px]">iPet</h1>
            <h5 className="w-1/2 text-justify">
              Keeping a periodic control of your pets is important, since it
              allows you, in addition to an optimal care and health of your
              four-legged friend, a better organization of your schedule.
            </h5>
          </div>
          <div className="flex flex-col gap-5 mr-auto text-left">
            <Link to="join">
              <Button
                title="Get started for free"
                variant="primary"
                size="big"
              />
            </Link>
            <Link to="login" className="text-center">
              <small className="text-center underline">I have an account</small>
            </Link>
          </div>
        </div>
        <img
          src="./img/landing-header.jpg"
          className="w-full object-cover h-[500px] absolute top-0 left-0"
        />
        <div className="bg-primary h-[500px] w-full absolute z-10 opacity-50" />
        <div className="bg-gradient-to-r from-black h-[500px] w-full absolute z-10 opacity-50" />
      </section>
      <section className="h-auto w-full text-left text-slate-900 relative px-[10vw] py-[10vh] bg-white">
        <div className="grid grid-cols-3 gap-20 items-center">
          <h1 className="text-5xl w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            nobis culpa mollitia nihil officia harum voluptate! Soluta voluptate
            magni quisquam.
          </h1>
          <div className="flex flex-col gap-10">
            <h2>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perspiciatis, dicta.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nemo, est iure molestiae ullam vero voluptatum consectetur illo
              voluptas ex?
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <h2>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perspiciatis, dicta.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nemo, est iure molestiae ullam vero voluptatum consectetur illo
              voluptas ex?
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
