export { };

declare global {
    interface Window {
        yayHeroes: {
            allHeroes: []
            api_url: string;
            api_nonce: string;
        };
    }
}