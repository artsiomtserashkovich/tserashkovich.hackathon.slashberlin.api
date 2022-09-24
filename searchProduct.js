import productArray from "./productArray.js";

// function to search for a product
function searchProduct(amazon_domain, asin) {
    const params = {
        api_key: "EBB9CA733E4F49F38A71ED2E7A4062AD",
        type: "product",
        amazon_domain: amazon_domain,
        asin: asin,
    };

    // make the http GET request to Rainforest API
    axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
            // find the product in the array of productArray using the asin and add the brand and description to the product
            var chosenProduct;
            productArray.forEach((product) => {
                if (product.asin == asin) {
                    chosenProduct = product;
                    chosenProduct.brand = response.data.product.brand;
                    chosenProduct.description =
                        response.data.product.description;
                    console.log(chosenProduct);
                }
            });
            // console.log(response);
        })
        .catch((error) => {
            // catch and print the error
            console.log(error);
        });
}
