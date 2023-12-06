import { Entity } from '@core/entity';
import { UniqueEntityID } from '@core/unique-entity-id';

export interface CourierProps {
  name?: string;
  email?: string;
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

  get name() {
    return this.props.name;
  }

  get lat() {
    return this.props.lat;
  }

  get lon() {
    return this.props.lon;
  }
}
