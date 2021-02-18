import Template from '../components/template';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <Template title="GitHub Search">
      <div>
        GitHubのユーザー名を入力してSubmitボタンを押すと、そのユーザーの説明ページにリンクします。
      </div>
      <form>
        <label>
          ユーザー名:
          <input type="text" name="user" onChange={handleChange} value={user} />
        </label>
        <Link href={`/users/${user}`}>
          <button type="submit">Submit</button>
        </Link>
      </form>
    </Template>
  );
}
