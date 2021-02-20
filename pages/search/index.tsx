import Template from '../../components/template';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/** 入力したユーザー名が正しい形式かを評価する。 */
const validateUserName = (inputUserName: string): boolean =>
  inputUserName.length > 0 && inputUserName.split('/').length === 1;

export default function Index() {
  const [user, setUser] = useState(''); // 入力されたユーザー名
  const [validUserName, setValidUserName] = useState(validateUserName(user)); // 入力されたユーザー名が正しい形式かどうかのフラグ

  /** ユーザー名編集のイベントハンドラー */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser(e.target.value);
  };

  /** submit ボタンを押下のイベントハンドラー */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!validUserName) {
      e.preventDefault();
      alert('不正なユーザー名です。');
    }
  };

  // ユーザー名が変化したときに正しい形式かどうかのフラグを評価する
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
              type="button"
              className="h-10 w-20 rounded-md bg-blue-600"
              onClick={handleClick}
            >
              <span className="font-bold text-white">Submit</span>
            </button>
          </Link>
        </form>
        <div>
          <h2>機能</h2>
          <div className="w-300">
            GitHubのユーザー名を入力してSubmitボタンを押すと、そのユーザーの説明ページにリンクします。
          </div>
        </div>
      </div>
    </Template>
  );
}
