import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Profile } from "@liff/get-profile";
import { axiosInstance } from "../../modules/axiosInstant";
import { customerApi } from "../../config/api_route";

export interface CustomerType {
  id: number;
  lineId: string;
  pictureUrl: string;
  coin: number;
  displayName: string;
}

export interface MachineType {
  id: number;
  name: string;
  size: number;
  price: number;
  duration: number;
  active: boolean;
  history: History[];
}

export interface History {
  id: number;
  startTime: string;
  duration: number;
  customer: CustomerType;
  machine: MachineType;
  customerId: number;
  machineId: number;
  success: true;
}

export interface AddCoinType {
  lineId: string;
  coin: number;
}

export interface customerState {
  customer: CustomerType | undefined;
  machines: MachineType[];
}

export interface UsingMachine {
  coin: number;
  lineId: string;
  machineId: number;
}

const initialState: customerState = {
  customer: undefined,
  machines: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setMachines: (state, action: PayloadAction<MachineType[]>) => {
      state.machines = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signInCustomer.fulfilled, (state, actions) => {
      state.customer = actions.payload;
    });
    builder.addCase(customerAddCoin.fulfilled, (state, actions) => {
      state.customer = actions.payload;
    });
    builder.addCase(customerFindAllMachine.fulfilled, (state, actions) => {
      state.machines = actions.payload;
    });
    builder.addCase(customerUseMachine.fulfilled, (state, actions) => {
      state.customer = actions.payload.customer;
    });
  },
});

export const signInCustomer = createAsyncThunk(
  "customer/signInCustomer",
  async (obj: Profile): Promise<CustomerType> => {
    const { data }: { data: CustomerType } = await axiosInstance.post(
      customerApi.signIn,
      {
        lineId: obj.userId,
        displayName: obj.displayName,
        pictureUrl: obj.pictureUrl,
      }
    );
    return data;
  }
);

export const customerAddCoin = createAsyncThunk(
  "customer/addCoinCustomer",
  async (obj: AddCoinType): Promise<CustomerType> => {
    const { data }: { data: CustomerType } = await axiosInstance.post(
      customerApi.addCoin,
      obj
    );
    return data;
  }
);

export const customerFindAllMachine = createAsyncThunk(
  "customer/findAllMachine",
  async (): Promise<MachineType[]> => {
    const { data }: { data: MachineType[] } = await axiosInstance.get(
      customerApi.findAllMachine
    );
    return data;
  }
);

export const customerUseMachine = createAsyncThunk(
  "customer/customerUseMachine",
  async (obj: UsingMachine) => {
    const { data }: { data: History } = await axiosInstance.post(
      customerApi.useMachine,
      obj
    );
    return data;
  }
);

// eslint-disable-next-line no-empty-pattern
export const { setMachines } = customerSlice.actions;
export const customerSelector = (store: RootState) => store.customer;
export default customerSlice.reducer;
