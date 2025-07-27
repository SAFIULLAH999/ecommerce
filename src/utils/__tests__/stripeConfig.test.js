import { validateStripeConfig, getStripePublishableKey } from '../stripeConfig';

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('Stripe Configuration', () => {
  describe('getStripePublishableKey', () => {
    it('should return the publishable key from environment', () => {
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY = 'pk_test_123';
      expect(getStripePublishableKey()).toBe('pk_test_123');
    });

    it('should return undefined when key is not set', () => {
      delete process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
      expect(getStripePublishableKey()).toBeUndefined();
    });
  });

  describe('validateStripeConfig', () => {
    beforeEach(() => {
      // Mock console methods
      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
      console.log.mockRestore();
    });

    it('should return true for valid publishable key', () => {
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY = 'pk_test_123456789';
      expect(validateStripeConfig()).toBe(true);
      expect(console.log).toHaveBeenCalledWith('✅ Stripe configuration is valid');
    });

    it('should return false when key is not set', () => {
      delete process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
      expect(validateStripeConfig()).toBe(false);
      expect(console.error).toHaveBeenCalledWith('❌ REACT_APP_STRIPE_PUBLISHABLE_KEY is not set');
    });

    it('should return false for invalid key format', () => {
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY = 'invalid_key';
      expect(validateStripeConfig()).toBe(false);
      expect(console.error).toHaveBeenCalledWith('❌ REACT_APP_STRIPE_PUBLISHABLE_KEY should start with "pk_"');
    });
  });
});
