class ProductManager
{
    async UpdateProduct(productId, description, price, name)
    {
        return fetch('http://localhost:5029/Product/UpdateProduct', {
            method: "POST",
            body: JSON.stringify({
                price: price,
                productId: productId,
                name: name,
                description: description
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
        .then((response) => {
            return response.json();
        })
        .catch((response) => {
            return response.json();
        })
    }

    async WriteReview(storeId, review)
    {
        return fetch('http://localhost:5029/Product/WriteReview', {
            method: "POST",
            body: JSON.stringify({
                productId: storeId,
                reviewContent: review
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
        .then((response) => {
            return response.json();
        })
    }
}

export {ProductManager}