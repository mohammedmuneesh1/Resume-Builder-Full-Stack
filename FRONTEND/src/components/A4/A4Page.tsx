const A4Page = ({ children }:{children:React.ReactNode}) => (
  <div
    className="bg-white mb-6 shadow"
    style={{
      width: "794px",
      minHeight: "1123px",
      pageBreakAfter: "always",
    }}
  >
    {children}
  </div>
);

export default A4Page;