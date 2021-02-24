import Template from '../components/molecules/template';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';

export default function Index() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | null>(parseCookies().displayName);

  return <Template pageName="GitHub Search"></Template>;
}
