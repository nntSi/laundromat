import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import {
  MachineType,
  customerSelector,
  setMachines,
} from "../store/slices/customerSlice";
import { useSelector } from "react-redux";
import MachineCard from "../components/MachineCard";
import { socket } from "../modules/socket";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { machines } = useSelector(customerSelector);
  useEffect(() => {
    socket.emit("MachineState");
    socket.on("machines", ({ machines }: { machines: MachineType[] }) => {
      dispatch(setMachines(machines));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-center sm:text-left">
          Choose Washing Machine
        </h1>
        <p className="text-zinc-500 text-center sm:text-left">
          A Laundromat, also known as a launderette or coin laundry, is a
          facility where people can wash and dry their clothes using
          self-service machines.
        </p>
      </div>
      <div className="flex items-center"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-6">
        {machines.length > 0 &&
          machines.map((item, index) => (
            <MachineCard key={index} machine_obj={item} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
