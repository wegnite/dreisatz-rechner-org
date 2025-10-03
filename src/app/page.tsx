import { redirect } from 'next/navigation';

// Redirect root path to English locale
export default function RootPage() {
  redirect('/de');
}
