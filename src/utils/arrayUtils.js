export const totalPrice = (costs) => {
    if (costs === undefined) return;
    return costs.reduce((defaultCount, item) => defaultCount + item.price, 0);
}
