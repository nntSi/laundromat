import liff from "@line/liff";
import { useEffect } from "react";
import { initialLiff } from "../modules/line";
import { useAppDispatch } from "../store/store";
import {
  customerSelector,
  signInCustomer,
} from "../store/slices/customerSlice";
import { useSelector } from "react-redux";
import AddCoinBtn from "./AddCoinBtn";

const LineLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customer } = useSelector(customerSelector);
  const handleLoginLine = () => {
    liff.login();
  };
  useEffect(() => {
    initialLiff((prf) => {
      void dispatch(signInCustomer(prf));
    });
  }, []);
  if (customer) {
    return (
      <div className="flex items-center space-x-2.5">
        <AddCoinBtn />
        <p className="font-light text-zinc-300 hidden sm:block">|</p>
        <button className="hidden sm:flex items-center space-x-2.5">
          <div className="relative">
            <img
              className="rounded-full h-8 w-8 border-2 border-zinc-200"
              src={customer.pictureUrl}
            />
            <div className="bg-green-500 w-[8px] h-[8px] absolute rounded-full ring-1 ring-white bottom-0.5 -right-0.5"></div>
          </div>
          <p>{customer.displayName}</p>
          <i className="bx bx-chevron-down"></i>
        </button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleLoginLine}>Login with Line</button>
    </div>
  );
};

export default LineLogin;
