"use client";

import React from "react";

interface ContextProps {
  config: {
    role: "STUDENT" | "TEACHER";
  };
  setConfig: (partial: ContextProps["config"]) => void;
}

// react context with provider and hook
const ConfigContext = React.createContext<ContextProps>({
  config: {
    role: "TEACHER"
  },
  setConfig: (partial) => {}
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

const initialState: ContextProps["config"] = {
  role: "TEACHER"
};

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] =
    React.useState<ContextProps["config"]>(initialState);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const { config, setConfig } = React.useContext(ConfigContext);
  return { config, setConfig };
};
