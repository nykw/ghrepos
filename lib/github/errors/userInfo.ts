/**
 * GET /users/{username} API に対する処理で発生する例外クラス
 */

/** 不正なユーザー名で呼び出されたときに発生する例外 */
export class InvalidUserNameError implements Error {
  name = 'Invalid username';
  message: string;
  constructor(user: string[]) {
    this.message = `${user.join('/')} は不正なユーザー名です。`;
  }
}

/** データベースにユーザー名 username のデータが存在しなかった場合に発生する例外 */
export class NoUserNameError implements Error {
  name = 'No username';
  message: string;
  constructor(user: string) {
    this.message = `ユーザー名 ${user} ユーザー情報は存在しません。`;
  }
}
