import { Entity } from '@core/entity';
import { UniqueEntityID } from '@core/unique-entity-id';
import { OrderStates } from '@validator/order-states.enum';

export interface OrderProps {
  recipientId: UniqueEntityID;
  courierId?: UniqueEntityID | null;
  status: OrderStates;
}

export class Order extends Entity<OrderProps>{
  static create(
    props: OrderProps,
    id?: UniqueEntityID
  ){
    const order = new Order(props, id);

    return order;
  }

  get status() {
    return this.props.status;
  }

  get courierId() {
    return this.props.courierId;
  }

  get recipientId() {
    return this.props.recipientId;
  }
}
