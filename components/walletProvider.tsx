"use client";

import { useEffect, useState, createContext, useContext } from "react";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type WalletContextType = {
  account: string | null;
  connectWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function connectWallet() {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }) as string[];
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Wallet rejected", err);
    }
  }

  if (!mounted) return null;

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
