/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string
  /** Web3Forms access key: public by design, it only lets the form email profile.email. */
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_TURNSTILE_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
