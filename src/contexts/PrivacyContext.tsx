import React, { createContext, useContext, useState } from 'react';

type PrivacyLevel = 'standard' | 'enhanced' | 'maximum';

interface PrivacySettings {
  defaultTransactionPrivacy: boolean;
  stealthAddressByDefault: boolean;
  autoShieldLargeAmounts: boolean;
  transactionMetadataProtection: boolean;
  obfuscateConnectedApps: boolean;
}

interface PrivacyScores {
  overall: number;
  shieldedBalance: number;
  transactionPrivacy: number;
  addressIsolation: number;
  metadataProtection: number;
}

interface PrivacyContextType {
  privacyLevel: PrivacyLevel;
  setPrivacyLevel: (level: PrivacyLevel) => void;
  privacySettings: PrivacySettings;
  updatePrivacySetting: <K extends keyof PrivacySettings>(
    key: K,
    value: PrivacySettings[K]
  ) => void;
  privacyScores: PrivacyScores;
  calculatePrivacyScore: () => number;
}

const defaultPrivacySettings: PrivacySettings = {
  
  defaultTransactionPrivacy: false,
  stealthAddressByDefault: false,
  autoShieldLargeAmounts: false,
  transactionMetadataProtection: false,
  obfuscateConnectedApps: false,
};

const defaultPrivacyScores: PrivacyScores = {
  overall: 45,
  shieldedBalance: 30,
  transactionPrivacy: 50,
  addressIsolation: 60,
  metadataProtection: 40,
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('standard');
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(defaultPrivacySettings);
  const [privacyScores, setPrivacyScores] = useState<PrivacyScores>(defaultPrivacyScores);

  const updatePrivacySetting = <K extends keyof PrivacySettings>(
    key: K,
    value: PrivacySettings[K]
  ) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value,
    }));
    
    // Recalculate privacy score when settings change
    calculatePrivacyScore();
  };

  const calculatePrivacyScore = (): number => {
    // Count enabled settings
    const enabledSettings = Object.values(privacySettings).filter(Boolean).length;
    
    // Calculate percentage of enabled settings
    const settingsScore = (enabledSettings / Object.keys(privacySettings).length) * 100;
    
    // Combine with other factors (in a real app, this would be more sophisticated)
    const newOverallScore = Math.round((
      privacyScores.shieldedBalance * 0.3 +
      privacyScores.transactionPrivacy * 0.3 +
      privacyScores.addressIsolation * 0.2 +
      privacyScores.metadataProtection * 0.2 +
      settingsScore * 0.2
    ) / 1.2);
    
    setPrivacyScores(prev => ({
      ...prev,
      overall: newOverallScore,
    }));
    
    return newOverallScore;
  };

  return (
    <PrivacyContext.Provider
      value={{
        privacyLevel,
        setPrivacyLevel,
        privacySettings,
        updatePrivacySetting,
        privacyScores,
        calculatePrivacyScore,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = (): PrivacyContextType => {
    }
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};