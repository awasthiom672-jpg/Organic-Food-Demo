import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product, CartItem } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedGheeSection } from './components/FeaturedGheeSection';
import { AllProductsSection } from './components/AllProductsSection';
import { BilonaProcessSection } from './components/BilonaProcessSection';
import { PurityGuaranteeSection } from './components/PurityGuaranteeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { Review, INITIAL_REVIEWS } from './data/reviews';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('kf_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kf_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('zof_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zof_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast(`Thank you ${newReview.name}! Your review has been published.`);
  };

  // Sync theme with HTML root & body
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      localStorage.setItem('kf_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kf_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kf_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast(`${prod?.name || 'Product'} removed from favorites`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`${prod?.name || 'Product'} added to favorites! ❤️`);
        return [...prev, productId];
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`${newItem.productName} added to your cart!`);
  };

  const handleInstantBuy = (item: CartItem) => {
    setCheckoutItems([item]);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity: newQty } : i
      )
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      dir="ltr"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#18151f] text-[#fdfbf7]' : 'bg-[#fdfbf7] text-[#2e2a39]'
      }`}
    >
      {/* 1. Header & Navigation with Compact Favorites Button & Reviews System */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenWriteReview={() => setIsWriteReviewOpen(true)}
        totalReviewsCount={reviews.length}
        averageRating={
          reviews.length > 0
            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
            : '4.9'
        }
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 border ${
            theme === 'dark'
              ? 'bg-[#25202e] text-white border-[#fff0a5]/40'
              : 'bg-[#2e2a39] text-white border-[#fff0a5]/40'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-[#fff0a5]" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs text-[#fff0a5] underline font-bold cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {/* 2. Hero Campaign Showcase */}
      <Hero
        theme={theme}
        onShopClick={() => {
          const el = document.getElementById('desi-ghee-flagship');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onQuickOrder={() => {
          const flagship = PRODUCTS[0];
          const variant = flagship.variants.find((v) => v.id.includes('1kg')) || flagship.variants[0];
          handleInstantBuy({
            productId: flagship.id,
            productName: flagship.name,
            productNameUrdu: flagship.nameUrdu,
            variantId: variant.id,
            weight: variant.weight,
            weightUrdu: variant.weightUrdu,
            price: variant.price,
            image: flagship.image,
            quantity: 1,
          });
        }}
      />

      {/* 3. Flagship Pure Desi Ghee Showcase */}
      <FeaturedGheeSection
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        theme={theme}
      />

      {/* 4. Complete Pure Dairy Catalog */}
      <AllProductsSection
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onViewDetails={(prod) => setSelectedProductForModal(prod)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        theme={theme}
      />

      {/* 5. Traditional Bilona Churning Process */}
      <BilonaProcessSection theme={theme} />

      {/* 6. Lab Tested Purity & Quality Certificate Section */}
      <PurityGuaranteeSection theme={theme} />

      {/* 7. Real Customer Reviews & Ratings System */}
      <TestimonialsSection
        theme={theme}
        reviews={reviews}
        onAddReview={handleAddReview}
        onOpenWriteModal={() => setIsWriteReviewOpen(true)}
      />

      {/* 8. Official Footer */}
      <Footer theme={theme} />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCheckoutItems(cartItems);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 2-Step Advance Payment & Dispatch Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutItems([]);
        }}
        cartItems={checkoutItems.length > 0 ? checkoutItems : cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          setCheckoutItems([]);
          setIsCheckoutOpen(false);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Saved Favorites / Wishlist Modal */}
      <FavoritesModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onViewDetails={(prod) => setSelectedProductForModal(prod)}
        theme={theme}
      />

      {/* Interactive Write Customer Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
        theme={theme}
      />

      {/* Sticky Floating WhatsApp Support Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
