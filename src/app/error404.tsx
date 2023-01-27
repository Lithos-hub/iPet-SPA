const error404 = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-white">
      <img src="/img/404.jpg" alt="error 404 picture" className="h-5/6" />
      <h2>Page not found!</h2>
    </div>
  );
};

export default error404;
