import Template from '../components/template';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/** 入力したユーザー名のバリデーション */
const validateUserName = (inputUserName: string): boolean =>
  inputUserName.length > 0 && inputUserName.split('/').length === 1;

export default function Index() {
  const [user, setUser] = useState('');
  const [validUserName, setValidUserName] = useState(validateUserName(user)); // 入力されたユーザー名が正しい形式かどうかのフラグ

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  useEffect(() => {
    setValidUserName((_) => validateUserName(user));
  }, [user]);

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
              disabled={!validUserName}
            >
              <span className="font-bold text-white">Submit</span>
            </button>
          </Link>
          {!validUserName && (
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
