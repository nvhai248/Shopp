export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <h1>Auth Layout</h1>
      {children}
    </main>
  );
}
