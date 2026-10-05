export const metadata = {
  title: "Preference Data Labeling",
  description: "Pairwise RLHF-style preference labeling interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
