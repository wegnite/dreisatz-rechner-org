'use client';

import { useEffect, useMemo, useRef } from 'react';
import googleOneTap, { type OneTapCredentialResponse } from 'google-one-tap';

import { authClient } from '@/lib/auth-client';

/**
 * Lightweight wrapper that wires Google One Tap to Better Auth social sign in.
 */
export function GoogleOneTap() {
  const { data: session, isPending } = authClient.useSession();
  const hasStarted = useRef(false);

  const clientId = useMemo(() => {
    return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!clientId) {
      return;
    }
    if (isPending || session) {
      return;
    }
    if (hasStarted.current) {
      return;
    }

    const triggerOneTap = () => {
      googleOneTap(
        {
          client_id: clientId,
          auto_select: false,
          cancel_on_tap_outside: false,
          context: 'signin',
        },
        async (response: OneTapCredentialResponse | undefined) => {
          if (!response?.credential) {
            return;
          }
          try {
            await authClient.signIn.social(
              {
                provider: 'google',
                callbackURL: window.location.href,
                idToken: {
                  token: response.credential,
                },
                disableRedirect: true,
              },
              {
                onError: (ctx) => {
                  console.error('Google One Tap sign-in error:', ctx.error);
                },
              }
            );
          } catch (error) {
            console.error('Google One Tap sign-in exception:', error);
          }
        }
      );
    };

    triggerOneTap();
    const intervalId = window.setInterval(triggerOneTap, 3000);

    hasStarted.current = true;

    return () => {
      window.clearInterval(intervalId);
    };
  }, [clientId, isPending, session]);

  return null;
}

export default GoogleOneTap;
