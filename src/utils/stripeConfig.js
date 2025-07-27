// Stripe configuration utility
export const validateStripeConfig = () => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error('❌ REACT_APP_STRIPE_PUBLISHABLE_KEY is not set');
    return false;
  }
  
  if (!publishableKey.startsWith('pk_')) {
    console.error('❌ REACT_APP_STRIPE_PUBLISHABLE_KEY should start with "pk_"');
    return false;
  }
  
  console.log('✅ Stripe configuration is valid');
  return true;
};

export const getStripePublishableKey = () => {
  return process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
};

// Test function to check if Stripe can be loaded
export const testStripeLoad = async () => {
  try {
    const { loadStripe } = await import('@stripe/stripe-js');
    const publishableKey = getStripePublishableKey();
    
    if (!publishableKey) {
      throw new Error('No Stripe publishable key found');
    }
    
    const stripe = await loadStripe(publishableKey);
    
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    
    console.log('✅ Stripe loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to load Stripe:', error.message);
    return false;
  }
};
