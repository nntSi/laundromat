/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSelector } from "react-redux";
import {
  customerAddCoin,
  customerSelector,
} from "../store/slices/customerSlice";
import Modal from "./Modal";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Lottie from "lottie-react";
import ATMLottie from "../assets/atm.json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../store/store";
import { setShowSuccess } from "../store/slices/generalSlice";

const schema = yup
  .object({
    coin: yup
      .number()
      .positive("Coin must greater than 0")
      .integer("Coin is required!")
      .required("Coin is required!"),
    lineId: yup.string().optional().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const AddCoinBtn = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { customer } = useSelector(customerSelector);
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { coin: 0 },
    resolver: yupResolver(schema),
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^-?\d*$/;
    if (regex.test(value) || value === "") {
      setValue("coin", parseInt(value));
    }
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    void dispatch(customerAddCoin(data));
    reset();
    setIsOpen(false);
    dispatch(setShowSuccess(true));
    setTimeout(() => {
      dispatch(setShowSuccess(false));
    }, 1500);
  };
  useEffect(() => {
    if (customer) {
      setValue("lineId", customer.lineId);
    }
  }, [customer]);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        type="button"
        className="flex items-center space-x-2"
      >
        <i className="bx bxl-bitcoin text-teal-600"></i>
        <p className="hover:underline">{customer && customer.coin} coin</p>
      </button>
      <Modal
        isOpen={isOpen}
        onClickBackdrop={() => console.log('')}
        child={
          <div className="bg-white w-[200px] sm:w-[400px] rounded-2xl shadow relative">
            <div className="p-6">
              <div>
                <p className="text-xl font-bold mb-2">Add Your Coin</p>
                <p className="text-sm text-zinc-500">
                  This is payment tester you can add coin as much as you want
                </p>
              </div>
              <div className="flex justify-center items-center w-full">
                <Lottie className="w-64" animationData={ATMLottie} />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 grid xl:grid-cols-2 gap-6"
              >
                <div className="col-span-2 relative">
                  <input
                    value={watch("coin") ? watch("coin") : 0}
                    onChange={handleInputChange}
                    className="py-2.5 ring-2 focus:ring-zinc-300 focus:ring-2 duration-200 text-lg font-semibold ring-zinc-200 w-full rounded-lg bg-zinc-50 text-right pl-3 pr-10"
                  />
                  {errors.coin && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">
                      {errors.coin.message}
                    </p>
                  )}
                  <i className="bx bx-bitcoin text-xl text-teal-600 absolute top-2.5 right-3"></i>
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center space-x-2 py-2.5 ring-2 ring-blue-800 font-bold bg-blue-600 hover:bg-blue-700 duration-200 text-white rounded-lg w-full col-span-2"
                >
                  <i className="bx bxs-coin text-amber-400 group-hover:bx-tada"></i>
                  <p>Add Coin</p>
                </button>
              </form>
            </div>
            <button onClick={handleCloseModal} type="button" className="hover:bg-zinc-100 absolute top-6 rounded-full right-4 text-rose-600 text-xl duration-200 w-8 h-8">
              <i className="bx bx-x"></i>
            </button>
          </div>
        }
      />
    </div>
  );
};

export default AddCoinBtn;
