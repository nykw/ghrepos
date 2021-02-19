import Template from '../components/template';
import Link from 'next/link';
import { useState } from 'react';

/** 入力したユーザー名のバリデーション */
const validateUserName = (inputUserName: string): boolean =>
  inputUserName.length > 0 && inputUserName.split('/').length === 1;

export default function Index() {
  const [user, setUser] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true); // submitボタン押下の可不可

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserName = e.target.value;
    setUser(inputUserName);
    setSubmitDisabled(!validateUserName(inputUserName));
  };

  return (
    <Template pageName="GitHub Search">
      <div className="my-5">
        <form>
          <label>
            ユーザー名:
            <input
              type="text"
              name="user"
              onChange={handleChange}
              value={user}
              className="bg-gray-50"
            />
          </label>
          <Link href={`/users/${user}`}>
            <button
              type="submit"
              className="h-10 w-20 rounded-md bg-blue-600"
              disabled={submitDisabled}
            >
              <span className="font-bold text-white">Submit</span>
            </button>
          </Link>
          {!validateUserName(user) && (
            <p>
              <span className="font-bold text-red-500">不正なユーザー名です。</span>
            </p>
          )}
        </form>
        <div>
          <h2>機能</h2>
          <p>
            GitHubのユーザー名を入力してSubmitボタンを押すと、そのユーザーの説明ページにリンクします。
          </p>
        </div>
      </div>
    </Template>
  );
}
