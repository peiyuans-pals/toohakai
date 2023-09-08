import TrpcProvider from "../utils/trpc/provider";
import { ConfigProvider } from "../context/configContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </ConfigProvider>
  );
}
