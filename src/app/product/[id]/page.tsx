import { notFound } from 'next/navigation';
import axios from 'axios';
import ProductDetail1 from '@/components/ProductDetail/ProductDetail1';
import { CartProvider } from '@/components/Cart/CartProvider';

// This function is required for static export
export async function generateStaticParams() {
  try {
    // Fetch all products to generate static params
    const response = await axios.get('http://localhost:500/public/s/68985dc8b866be5ac50c15f9/products');
    const products = response.data || [];
    
    return products.map((product: any) => ({
      id: product._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  
  try {
    // Fetch all products and filter by ID since single product endpoint doesn't exist
    const response = await axios.get('http://localhost:500/public/s/68985dc8b866be5ac50c15f9/products');
    const products = response.data || [];
    
    // Find the product with the matching ID
    const product = products.find((p: any) => p._id === id);
    
    if (!product) {
      notFound();
    }
    
    return (
      <CartProvider>
        <ProductDetail1 product={product} />
      </CartProvider>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}