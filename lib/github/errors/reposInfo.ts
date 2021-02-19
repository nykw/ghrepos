/**
 * GET /users/{username}/repos API に対する処理で発生する例外クラス
 */

/** ユーザー名 login のリポジトリ情報が存在しなかったときに発生する例外 */
export class NoReposDataError implements Error {
  name = `No repository data.`;
  message: string;
  constructor(login: string) {
    this.message = `ユーザー名 ${login} のリポジトリ情報が存在しません。`;
  }
}
