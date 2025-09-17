/**
 * Google Fonts require outbound network access during build, which may be
 * blocked in certain deployment environments. To keep the build pipeline
 * deterministic, we fall back to system fonts. If you want to restore the
 * original Google Fonts, replace these placeholders with `next/font/google`
 * definitions and ensure outbound requests are permitted.
 */

type FontDefinition = {
  className: string;
  variable: string;
};

const emptyFont = (variable: string): FontDefinition => ({
  className: '',
  variable,
});

export const fontNotoSans = emptyFont('');
export const fontNotoSerif = emptyFont('');
export const fontNotoSansMono = emptyFont('');
export const fontBricolageGrotesque = emptyFont('');
