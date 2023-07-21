import {
  MachineType,
  customerSelector,
  customerUseMachine,
} from "../store/slices/customerSlice";
import Washing from "../assets/washing.png";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { setShowSuccess } from "../store/slices/generalSlice";
import { useState } from "react";
import Modal from "./Modal";
import { socket } from "../modules/socket";

type Props = {
  machine_obj: MachineType;
};

const MachineCard = ({ machine_obj }: Props) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const usingMachine = () => {
    if (!customer) {
      return;
    }
    void dispatch(
      customerUseMachine({
        coin: machine_obj.price,
        lineId: customer.lineId,
        machineId: machine_obj.id,
      })
    );
    dispatch(setShowSuccess(true));
    setTimeout(() => {
      dispatch(setShowSuccess(false));
      setShowConfirm(false);
      socket.emit("MachineState");
    }, 1500);
  };
  const { customer } = useSelector(customerSelector);
  return (
    <div>
      <div className="ring-1 ring-zinc-200 rounded-xl bg-white duration-200 cursor-pointer hover:scale-105 overflow-hidden">
        <div className="py-3 px-4 border-b bg-zinc-50 flex items-center justify-between">
          <h2 className="font-bold text-sm">
            {machine_obj.name.toUpperCase()}
          </h2>
          {machine_obj.active ? (
            <div className="pt-1 pb-1.5 rounded-full flex items-center space-x-1 px-2.5 text-xs bg-rose-600 text-white font-semibold">
              <p>Washing</p>
              <span className="loading loading-dots loading-xs"></span>
            </div>
          ) : (
            <div className="pt-1 pb-1.5 rounded-full px-2.5 text-xs bg-teal-600 text-white font-semibold">
              Avilable
            </div>
          )}
        </div>
        <div className="px-4 pt-4 flex flex-col items-center">
          <img className="mb-4 h-20" src={Washing} />
          <p className="text-sm mb-1">
            <b>Size :</b>
            {` ${machine_obj.size} kg.`}
          </p>
          <p className="text-sm mb-1">
            <b>Duration :</b>
            {` ${machine_obj.duration} min.`}
            <br />
          </p>
          <p className="text-sm">
            <b>Price :</b>
            {` ${machine_obj.price} coin`}
            <br />
          </p>
        </div>
        <div className="flex p-4">
          <button
            onClick={() => setShowConfirm(true)}
            type="button"
            disabled={machine_obj.active || !customer}
            className={`${
              machine_obj.active ? "text-rose-600 font-medium" : "font-semibold"
            } hover:scale-[1.02] duration-200 ring-1 ring-zinc-200 text-sm w-full py-2.5 bg-zinc-100 rounded-xl`}
          >
            {machine_obj.history.length > 1 && machine_obj.active
              ? `${machine_obj.history[0].customer.displayName} is using`
              : "Use"}
          </button>
        </div>
      </div>
      <Modal
        isOpen={showConfirm}
        onClickBackdrop={() => setShowConfirm(false)}
        child={
          <div className="w-96 bg-white rounded-xl overflow-hidden">
            <div className="p-4 bg-zinc-100 border-b font-semibold text-sm flex justify-between items-center">
              <p>Confirm the transaction</p>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className=""
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className="p-4 text-sm">
              <p>
                <b>Name :</b> {machine_obj.name}
                <br />
                <b>Duration :</b> {machine_obj.duration} min.
                <br />
                <b>Price :</b> {`${machine_obj.price} coin.`}
                <br />
              </p>
              <button
                onClick={usingMachine}
                type="button"
                className="mt-4 py-2.5 w-full bg-green-500 rounded-lg duration-200 hover:bg-green-600 text-white font-semibold"
              >
                Paid {machine_obj.price} coin.
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default MachineCard;
