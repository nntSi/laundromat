import Modal from "./Modal";
import { useSelector } from "react-redux";
import { generalSelector } from "../store/slices/generalSlice";
import Lottie from "lottie-react";
import Success from "../assets/success.json"

const SuccessModal = () => {
  const { showSuccess } = useSelector(generalSelector);
  return (
    <div>
      <Modal
        isOpen={showSuccess}
        onClickBackdrop={() => console.log("")}
        child={<div>
          <Lottie className="w-96" animationData={Success} />
        </div>}
      />
    </div>
  );
};

export default SuccessModal;
