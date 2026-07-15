import { useState, useEffect, useCallback } from 'react';

const API = 'https://fakestoreapi.com';

export function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/products`)
      .then(r => { if (!r.ok) throw new Error('API error'); return r.json(); })
      .then(data => { setAllProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return { allProducts, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API}/products/categories`)
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  return categories;
}

export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback((productId) => {
    setLoading(true);
    fetch(`${API}/products/${productId}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { product, loading, fetchProduct };
}
