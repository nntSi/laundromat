import liff from "@line/liff";
import { Profile } from "./../../node_modules/@liff/get-profile/lib/index.d";

export const initialLiff = (callback: (prf: Profile) => void) => {
  liff
    .init({ liffId: "2000161766-74RGLdYQ" })
    .then(async () => {
      const prf = await liff.getProfile();
      callback(prf);
    })
    .catch((err) => {
      console.log(err);
    });
};
