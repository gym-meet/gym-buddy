export type ProfileCardData = {
  id: number;
  email: string;
  phone?: string | null;
  instagram: string;
  twitter: string;
  linkedIn: string;
  days: string[];
  types: string[];
  gender: string;
  experience: string;
  friendIds?: number[];
};