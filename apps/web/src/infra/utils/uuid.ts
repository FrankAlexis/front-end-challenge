export const generateUUID = (): string => {
    try {
        return self.crypto.randomUUID();
    } catch (e) {
        console.error('crypto.randomUUID not supported, using fallback', e)
        return '00000000-0000-0000-0000-000000000000'; // Fallback UUID
    }
}
