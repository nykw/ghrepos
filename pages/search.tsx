import Template from '../components/molecules/template';
import Link from 'next/link';
import { useState } from 'react';

/** 入力したユーザー名が正しい形式かを評価する。 */
const validateUserName = (inputUserName: string): boolean =>
  inputUserName.length > 0 && inputUserName.split('/').length === 1;

export default function Index() {
  const [user, setUser] = useState(''); // 入力されたユーザー名

  /** ユーザー名編集のイベントハンドラー */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser(e.target.value);
  };

  /** Enterキー入力のデフォルトの動作を抑制する */
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // Enterキーが押された場合
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };

  /** submit ボタンを押下のイベントハンドラー */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!validateUserName(user)) {
      e.preventDefault();
      alert('不正なユーザー名です。');
    }
  };

  return (
    <Template pageName="GitHub Search">
      <div className="m-5">
        <form className="text-center">
          <div>
            <label>
              <h2 className="font-bold">ユーザー名</h2>
              <input
                type="text"
                name="user"
                onChange={handleChange}
                onKeyPress={handleEnter}
                value={user}
                className="bg-blue-50 rounded-md pl-2 mt-5"
                placeholder="username"
              />
            </label>
          </div>
          <div className="mt-5">
            <Link href={`/users/${user}`}>
              <button type="button" className="btn btn-blue" onClick={handleClick}>
                Submit
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-10">
          <h2 className="text-center">機能</h2>
          <div className="w-300 text-center mt-5 mx-10">
            GitHubのユーザー名を入力してSubmitボタンを押すと、そのユーザーの説明ページにリンクします。
          </div>
        </div>
      </div>
    </Template>
  );
}
