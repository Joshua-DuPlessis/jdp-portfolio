import "./globals.css";

export const metadata = {
  title: "Joshua Du Plessis — Portfolio",
  description: "Systems • Dev • Data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
