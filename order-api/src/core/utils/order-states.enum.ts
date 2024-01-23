export enum OrderStates {
  INCOMING='INCOMING',
  DELIVERED='DELIVERED',
  WAITING='WAITING',
  RETURNED='RETURNED'
}

export function stringToEnum(value: string){
  if (value in OrderStates) {
    return OrderStates[value as keyof typeof OrderStates];
  }
  return null;
}