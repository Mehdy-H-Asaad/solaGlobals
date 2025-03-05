import { create } from "zustand";

export enum EAuctionFee {
	COPART = "COPART",
	IAAI = "IAAI",
}

export type TAuctionFeeStore = {
	auctionFee: EAuctionFee;
	setAuctionFee: (auctinFee: EAuctionFee) => void;
};

export const useAuctionFeeStore = create<TAuctionFeeStore>(set => ({
	setAuctionFee: (auctionFee: EAuctionFee) => set(() => ({ auctionFee })),
	auctionFee: EAuctionFee.COPART || null,
}));
