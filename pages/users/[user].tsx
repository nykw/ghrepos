/* eslint-disable camelcase */
import {FC} from "react";
import Template from "../../components/molecules/Template";
import getUserInfo, {User} from "../../lib/github/userInfo";
import getReposInfo, {Repository} from "../../lib/github/reposInfo";
import {GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";
import Image from "next/image";

type Props = User & {
  repositories: Repository[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const {params} = context;
    if (!params) throw new Error("`params` is undefined.");
    const {user} = params;
    if (!user) throw new Error("`user` is undefined.");

    // GitHub からユーザー名 `user` の情報を取得する
    const userInfo = await getUserInfo(user);

    // GitHubからユーザー名 `user` のリポジトリ名を取得する
    const {login} = userInfo;
    const repositories = await getReposInfo(login);

    return {
      props: {
        ...userInfo,
        repositories,
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }
};

const Page: FC<Props> = ({
  login,
  name,
  followers,
  following,
  email,
  location,
  twitter_username,
  avatar_url,
  repositories = [],
}) => {
  return (
    <Template pageName={`${login}'s Profile`}>
      <div className="my-auto text-center">
        <h1 className="mt-5">{login}</h1>

        <div className="mt-5">
          <Link href={`https://github.com/${login}`}>
            <img
              src={avatar_url}
              // eslint-disable-next-line max-len
              className="h-48 w-48 rounded-full mx-auto cursor-pointer shadow-xl"
            />
          </Link>
        </div>

        <div className="mt-7">
          <h2>名前</h2>
          <p className="mt-1">{name ?? "???"}</p>
        </div>

        <div className="mt-5">
          <h2>フォロワー数</h2>
          <p className="mt-1 lining-nums">{followers}</p>
        </div>
        <div className="mt-5">
          <h2>フォロー数</h2>
          <p className="mt-1 lining-nums">{following}</p>
        </div>

        <div className="mt-5">
          <h2>メールアドレス</h2>
          <p className="mt-1">{email ?? "???"}</p>
        </div>

        <div className="mt-5">
          <h2>場所</h2>
          <p className="mt-1">{location ?? "???"}</p>
        </div>

        <div className="mt-5">
          <h2>twitter</h2>
          <p className="mt-1">
            {twitter_username ? (
              <Link href={`https://twitter.com/${twitter_username}`}>
                <a>@{twitter_username}</a>
              </Link>
            ) : (
              "???"
            )}
          </p>
        </div>

        <div className="mt-5 mx-auto">
          <h2>リポジトリ一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 p-5">
            {[...repositories]
                .sort((prev, curr) =>
                  (curr.stargazers_count - prev.stargazers_count >= 0 ? 1 : -1))
                .map((repos) => {
                  const {id, full_name, name, stargazers_count} = repos;

                  return (
                    <Link key={id} href={`https://github.com/${full_name}`}>
                      {/* eslint-disable-next-line max-len */}
                      <div className="bg-white rounded-md m-2 shadow-md cursor-pointer">
                        <p className="font-bold">{name}</p>
                        <div className="tabular-nums mt-1">
                          <Image src="/star.svg" width={17} height={17}></Image>
                          {stargazers_count}
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Page;
