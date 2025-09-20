declare module 'google-one-tap' {
  export interface OneTapCredentialResponse {
    credential?: string;
    clientId?: string;
    select_by?: string;
  }

  export interface OneTapOptions {
    client_id: string;
    cancel_on_tap_outside?: boolean;
    auto_select?: boolean;
    context?: 'signin' | 'signup' | 'use';
  }

  type OneTapCallback = (response?: OneTapCredentialResponse) => void;

  export default function googleOneTap(
    options: OneTapOptions,
    callback: OneTapCallback
  ): void;
}
