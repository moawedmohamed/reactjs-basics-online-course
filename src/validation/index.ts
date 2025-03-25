/**
 * Validates a product object to ensure all fields meet the required criteria.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product image.
 * @param {string} product.price - The price of the product as a string.
 *
 * @returns {Object} An object containing error messages for each invalid field.
 */
export const productValidation = (product: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
}) => {
    const errors: {
        title: string;
        description: string;
        imageURL: string;
        price: string;
    } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    }
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL)
    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters";
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description  must be between 10 and 900 characters";
    }
    if (!product.imageURL.trim() || !validUrl) {
        errors.imageURL = "Product image URL is not valid";
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price is required";
    }
    return errors
}