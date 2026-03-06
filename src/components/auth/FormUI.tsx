interface FormUIProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const FormUI = ({ children, title, subtitle }: FormUIProps) => {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-4 py-10"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold font-roboto bg-clip-text text-transparent tracking-wide"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--accent), var(--accent-light))",
            }}
          >
            MASMAX
          </h1>
        </div>

        {/* Form card */}
        <div
          className="border rounded-2xl p-7 sm:p-9"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-roboto">
              {title}
            </h2>
            <p className="text-white/65 text-sm mt-1.5 font-roboto">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default FormUI;
