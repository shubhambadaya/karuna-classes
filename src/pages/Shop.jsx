import { ArrowUpRight } from 'lucide-react';
import products, { storeUrl } from '../data/products';
import './Shop.css';

const Shop = () => {
  return (
    <main className="shop-page">
      <header className="shop-heading">
        <p className="eyebrow">The little shop</p>
        <h1>Art to take<br /><em>home with you.</em></h1>
        <p>Illustrated keepsakes and digital art prints by Karuna. Browse the collection below, or visit the Gumroad shop for the complete storefront.</p>
        <a className="shop-store-link" href={storeUrl} target="_blank" rel="noopener noreferrer">Visit the full Gumroad shop <ArrowUpRight size={17} /></a>
      </header>

      <section className="shop-products" aria-label="Artworks available to purchase">
        {products.map((product) => (
          <a className="shop-product-card" href={product.url} target="_blank" rel="noopener noreferrer" key={product.id}>
            <span className="shop-product-category">{product.category}</span>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <span className="shop-product-footer">
              <strong>{product.price}</strong>
              <span>View on Gumroad <ArrowUpRight size={17} /></span>
            </span>
          </a>
        ))}
      </section>

      <p className="shop-note">Selecting a product opens its Gumroad page, where you can securely purchase and download it.</p>
    </main>
  );
};

export default Shop;
