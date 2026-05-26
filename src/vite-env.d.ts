// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL_AUTH: string;
    readonly VITE_USE_MOCKS?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
