import AuthHeader from "./components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f4fefd] min-h-[50rem] flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center pl-40 pr-40">
        <div className="flex flex-col items-center p-10">
          <img src="./logo.jpg" className="w-70 h-80 mb-6" alt="Icon" />
          <h1 className="text-5xl font-bold mb-8">HShopp</h1>
          <h2 className="text-2xl text-center mb-8">
            Top-notch tech essentials <br /> curated meticulously to fulfill all
            your needs
          </h2>
        </div>
        <div className="w-1/3">{children}</div>
      </div>
    </div>
  );
}
