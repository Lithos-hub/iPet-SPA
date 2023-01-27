export const GradientIcon = ({ children }: any) => {
  return (
    <>
      <svg width={0} height={0}>
        <linearGradient
          id="linearColors"
          x1={1}
          y1={0}
          x2={0}
          y2={0}
          className="rotate-45"
        >
          <stop offset={0} stopColor="#6f69e5" />
          <stop offset={0.5} stopColor="#ea77af" />
        </linearGradient>
      </svg>
      {children}
    </>
  );
};
