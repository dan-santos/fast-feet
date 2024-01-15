import { Entity } from '@core/entity';
import { UniqueEntityID } from '@core/unique-entity-id';

export interface RecipientProps {
  name?: string;
  email?: string;
  street: string;
  number: string;
  zipCode: string;
}

export class Recipient extends Entity<RecipientProps>{
  static create(
    props: RecipientProps,
    id?: UniqueEntityID
  ){
    const recipient = new Recipient(props, id);

    return recipient;
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get zipCode() {
    return this.props.zipCode;
  }
}
