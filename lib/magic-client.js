import { Magic } from 'magic-sdk';
const createMagic = () => {
	if (typeof window !== 'undefined') {
		return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
	}
};

export const magic = createMagic();
