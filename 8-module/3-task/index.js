export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    
    if(product == undefined || product.id == undefined) {
      return;
    }
    
    let cartItem = null;

    for (let item of this.cartItems) {
      if(item.product.id == product.id) {
        item.count = item.count + 1;
        cartItem = item;
        break;
      } 
    }

    if (cartItem == null) {
      cartItem = {product, count : 1};
      this.cartItems.push(cartItem);
    }
   
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {

    let cartItem = this.cartItems.find(item => item.product.id == productId);
    if(amount == 1) {
      cartItem.count = cartItem.count + 1;
    }
    if(amount == -1) {
      cartItem.count = cartItem.count - 1;
    }
    if (cartItem.count == 0) {
      this.cartItems.pop(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if(this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let sumCount = 0;
    for (let cartItem of this.cartItems) {
      sumCount = sumCount + cartItem.count;
    }
    return sumCount;
  }


  getTotalPrice() {
    let sumPrice = 0;
    for (let cartItem of this.cartItems) {
      sumPrice = sumPrice + cartItem.product.price * cartItem.count;
    }
    return sumPrice;
  }

 

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

