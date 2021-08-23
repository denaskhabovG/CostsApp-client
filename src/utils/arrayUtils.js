export const totalPrice = (costs) => {
    return costs.reduce((defaultCount, item) => defaultCount + item.price, 0);
}
