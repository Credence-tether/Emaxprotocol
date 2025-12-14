-- First, let's verify and recreate the trigger with better error handling

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    balance, 
    total_invested, 
    total_profit, 
    kyc_status, 
    referral_code, 
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    0.00,
    0.00,
    0.00,
    'pending',
    'REF' || UPPER(SUBSTRING(MD5(NEW.id::text) FROM 1 FOR 8)),
    'user',
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users who don't have one
INSERT INTO user_profiles (id, email, balance, total_invested, total_profit, kyc_status, referral_code, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  0.00,
  0.00,
  0.00,
  'pending',
  'REF' || UPPER(SUBSTRING(MD5(au.id::text) FROM 1 FOR 8)),
  'user',
  NOW(),
  NOW()
FROM auth.users au
LEFT JOIN user_profiles up ON up.id = au.id
WHERE up.id IS NULL;
