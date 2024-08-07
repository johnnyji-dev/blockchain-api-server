export const jsonSecretToArr = (_secretJson) => {
    const result = [];
    _secretJson.map((sc) => {
        return result.push(sc);
    })
    return result;
}