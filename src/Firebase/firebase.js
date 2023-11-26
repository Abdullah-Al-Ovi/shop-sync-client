import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAmi9lNpf_kBGrosWxOJmsJlxNyvtCZ3rk",
  authDomain: "shop-sync-ims.firebaseapp.com",
  projectId: "shop-sync-ims",
  storageBucket: "shop-sync-ims.appspot.com",
  messagingSenderId: "686153800254",
  appId: "1:686153800254:web:ca0fd466e6a602da488f6f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);