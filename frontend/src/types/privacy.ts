export interface PrivacySettings {
  privacy_tier: 'public' | 'selective' | 'private' | 'ghost' | 'phantom';
  cash: boolean;
  economic_class: boolean;
  moral_class: boolean;
  traits_public: string[];
  superpowers: boolean;
  karma_score: boolean;
  guild: boolean;
  location: boolean;
}

export interface PrivacyTier {
  name: string;
  description: string;
  cost: number;
}
