export class QueryMachineDto {
  id: string;
  name: string;
  size: string;
  active: boolean;
}

export class UseMachineDto {
  machineId: number;
  lineId: string;
  coin: number;
}
