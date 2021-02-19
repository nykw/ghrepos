import Template from '../components/template';
import Link from 'next/link';
import { useState } from 'react';

/** 入力したユーザー名のバリデーション */
const validateUserName = (inputUserName: string): boolean =>
  inputUserName.length > 0 && inputUserName.split('/').length === 1;

export default function Home() {
  const [user, setUser] = useState('');
  const [disabled, setDisabled] = useState(true); // submitボタン押下の可不可

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserName = e.target.value;
    setUser(inputUserName);
    setDisabled(!validateUserName(inputUserName));
  };

  return (
    <Template title="GitHub Search">
      <form>
        <label>
          ユーザー名:
          <input type="text" name="user" onChange={handleChange} value={user} />
        </label>
        <Link href={`/users/${user}`}>
          <button type="submit" disabled={disabled}>
            Submit
          </button>
        </Link>
      </form>
      <div>
        <h2>機能</h2>
        <p>
          GitHubのユーザー名を入力してSubmitボタンを押すと、そのユーザーの説明ページにリンクします。
        </p>
      </div>
    </Template>
  );
}
