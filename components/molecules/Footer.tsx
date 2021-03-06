import {useRouter} from "next/dist/client/router";
import {useDispatch, useSelector} from "react-redux";
import {cookieSlice, CookieState} from "../../features/cookie";
import {deleteAccount} from "../../lib/github/account/delete";

const Footer = () => {
  const {displayName} = useSelector<CookieState, CookieState>(
      (state) => state
  );

  const dispatch = useDispatch();
  const {register} = cookieSlice.actions;
  const router = useRouter();

  const deleteHandler = async () => {
    try {
      // eslint-disable-next-line no-undef
      const ok = confirm("本当に削除しますか？");

      if (ok) {
        // アカウントの削除
        await deleteAccount();

        // Reduxにアクションを発行する
        dispatch(
            register({
              displayName: undefined,
              avatarUrl: undefined,
              username: undefined,
            })
        );

        // eslint-disable-next-line no-undef
        alert("アカウントを削除しました。");

        // トップページに遷移する
        router.push("/");
      }
    } catch (e) {
      if (e instanceof Error) {
        // eslint-disable-next-line no-undef
        alert(e.message);
      }
    }
  };

  return (
    <footer>
      <div className="text-center my-3">
        <div>
          Created by{" "}
          <a href='https://github.com/nykw'>nykw</a>
          .
        </div>
        {displayName && (
          <button className="btn btn-white mt-2" onClick={deleteHandler}>
            アカウントを削除する
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
