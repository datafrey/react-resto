import firebase from '../firebase';

export default class RestoService {
  #menuRef = firebase.ref('/menu');
  #ordersRef = firebase.ref('/orders');

  getMenuItems() {
    return this.#menuRef;
  }

  getMenuItem(id) {
    return this.#menuRef.child(id);
  }

  addNewOrder(order) {
    return this.#ordersRef.push(order);
  }
}
