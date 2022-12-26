const menu = [
  {
    title: "Home",
    icon: "icon",
  },
];

export const Sidemenu = () => {
  return (
    <>
      <nav className="h-screen w-[300px] fixed top-[56px] left-0 bg-slate-200 shadow-xl text-slate-900">
        <ul>
          {["option 1", "option 2", "option 3", "option 4"].map((item) => {
            return (
              <li className="p-5 hover:bg-slate-600 flex gap-10">
                <i>icono</i>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
