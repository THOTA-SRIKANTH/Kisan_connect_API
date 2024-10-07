import Products from "../models/Product";

export const getAllByCategory = async (category: string) => {
    try {
        
        const array = await Products.find({ category });

        // If no products are found, return an empty array
        if (!array || array.length === 0) {
            return [];
        }

        return array;
    } catch (error: any) {
        console.error("Error fetching products by category:", error);
        return [];
    }
};

export const getAllByProductName = async (name: string) => {
    try {
        // Use a case-insensitive regex to search for matching product names
        const array = await Products.find({
            productName: { $regex: name, $options: "i" }
        });

        // If no products are found, return an empty array
        if (!array || array.length === 0) {
            return [];
        }

        return array;
    } catch (error: any) {
        console.error("Error fetching products by name:", error);
        return [];
    }
};
