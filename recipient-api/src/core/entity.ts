import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id() {
    return this._id;
  }
  
  constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  equals(entity: Entity<unknown>) {
    if (entity === this) return true;
    if (entity.id === this._id) return true;
    return false;
  }
}