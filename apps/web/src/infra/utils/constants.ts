import { ProductCategory } from "@/domain"

export const categories = Object.values(ProductCategory)

export const categoryImages = {
    [ProductCategory.FRESH_FRUITS]: 'https://placehold.co/300x200',
    [ProductCategory.CITRUS]: 'https://placehold.co/300x200',
    [ProductCategory.TROPICAL]: 'https://placehold.co/300x200',
}