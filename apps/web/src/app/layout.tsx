import {Metadata} from "next";
import "./styles.css";
import { Providers } from "./providers";
import './globals.css'

export const metadata: Metadata = {
  title: 'Toohakai',
  description: 'Make learning fun.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
