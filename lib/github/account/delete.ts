import firebase from "firebase/app";
import "firebase/auth";

export const deleteAccount = async () => {
  if (firebase.apps.length === 0) return;

  const user = firebase.auth().currentUser;

  try {
    if (!user) return;

    user.delete();
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }

    throw new Error("アカウントを削除できませんでした。");
  }
};
