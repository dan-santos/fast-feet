import { Entity } from 'src/core/entity';
import { UniqueEntityID } from 'src/core/unique-entity-id';

export interface CourierProps {
  name: string;
  email: string;
  lat?: number | null;
  lon?: number | null;
}

export class Courier extends Entity<CourierProps>{
  static create(
    props: CourierProps,
    id?: UniqueEntityID
  ){
    const courier = new Courier(props, id);

    return courier;
  }

  get email() {
    return this.props.email;
  }
}
