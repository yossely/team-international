/**
 * Every model should inherit this class
 * This will copy all the attributes of the object an put it
 * in the class
 *
 * @export
 */
export class BasicModel<T> {
  constructor(objInterface: T) {
    for (const key in objInterface) {
      if (objInterface.hasOwnProperty(key)) {
        const self: any = this;
        self[key] = objInterface[key];
      }
    }
  }
}
