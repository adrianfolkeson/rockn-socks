# Supabase Setup - Strumpmix

## Run this ONCE in Supabase SQL Editor

```sql
-- ============================================
-- PROFILES (may already exist)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  image TEXT,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- ============================================
-- PRODUCT VARIANTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  stock INTEGER DEFAULT 0
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view variants" ON public.product_variants FOR SELECT USING (true);

-- ============================================
-- WISHLISTS (Favorites)
-- ============================================
CREATE TABLE IF NOT EXISTS public.wishlists (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id),
  UNIQUE(session_id, product_id)
);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own wishlist" ON public.wishlists;
CREATE POLICY "Users can manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  zip_code TEXT,
  phone TEXT,
  total INTEGER NOT NULL,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = id);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  size TEXT,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  is_bundle BOOLEAN DEFAULT FALSE
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view order items" ON public.order_items FOR SELECT USING (true);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can view subscribers" ON public.subscribers;
CREATE POLICY "Anyone can view subscribers" ON public.subscribers FOR SELECT USING (true);

-- ============================================
-- SUPPORT TICKETS
-- ============================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'öppna',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own tickets" ON public.support_tickets;
CREATE POLICY "Users manage own tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- RETURNS
-- ============================================
CREATE TABLE IF NOT EXISTS public.returns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'begärd',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own returns" ON public.returns;
CREATE POLICY "Users manage own returns" ON public.returns FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN INSERT INTO public.profiles (id, email) VALUES (NEW.id, NEW.email) ON CONFLICT DO NOTHING; RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED PRODUCTS
-- ============================================
INSERT INTO public.products (name, category, price, original_price, rating, reviews, is_new, is_popular) VALUES
('LEGO Sockor', 'toys', 49, 79, 4.8, 124, FALSE, TRUE),
('Playmobil Sockor', 'toys', 49, 49, 4.6, 89, FALSE, FALSE),
('Bil Sockor', 'toys', 49, 49, 4.7, 156, FALSE, FALSE),
('Dinosaurie Sockor', 'animals', 49, 79, 4.9, 234, TRUE, TRUE),
('Enhörning Sockor', 'animals', 49, 49, 4.8, 189, FALSE, TRUE),
('Hundvalp Sockor', 'animals', 49, 49, 4.7, 145, FALSE, FALSE),
('Katt Sockor', 'animals', 49, 49, 4.6, 98, FALSE, FALSE),
('Harry Potter Sockor', 'cartoons', 59, 99, 4.9, 312, TRUE, TRUE),
('Mickey Mouse Sockor', 'cartoons', 49, 49, 4.7, 167, FALSE, FALSE),
('Spider-Man Sockor', 'cartoons', 49, 79, 4.8, 203, FALSE, TRUE),
('Star Wars Sockor', 'movies', 59, 99, 4.9, 278, TRUE, FALSE),
('Marvel Sockor', 'movies', 49, 79, 4.8, 198, FALSE, FALSE),
('Gaming Sockor', 'gaming', 49, 49, 4.6, 134, FALSE, TRUE),
('Nintendo Sockor', 'gaming', 49, 79, 4.8, 156, TRUE, FALSE),
('Fotboll Sockor', 'sports', 49, 49, 4.7, 89, FALSE, FALSE),
('Basket Sockor', 'sports', 49, 49, 4.5, 67, FALSE, FALSE),
('Regnbåge Sockor', 'nature', 49, 49, 4.8, 145, FALSE, TRUE),
('Skog Sockor', 'nature', 49, 49, 4.6, 112, FALSE, FALSE)
ON CONFLICT DO NOTHING;

-- SEED VARIANTS
INSERT INTO public.product_variants (product_id, size, stock)
SELECT p.id, size, (RANDOM() * 20 + 5)::INTEGER FROM public.products p
CROSS JOIN unnest(ARRAY['34-36', '37-39', '40-42', '43-45']) AS size
ON CONFLICT DO NOTHING;
```

## Done!

After running this SQL, your app will have:
- ✅ Profiles (auto-created on signup)
- ✅ Products with variants
- ✅ Wishlists (favorites)
- ✅ Orders
- ✅ Newsletter subscribers
- ✅ Support tickets
- ✅ Returns
