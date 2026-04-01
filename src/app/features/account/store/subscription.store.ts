import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'PAID' | 'OPEN' | 'VOID';
  date: Date;
  pdfUrl?: string;
}

interface SubscriptionState {
  plans: Plan[];
  currentSubscription: Subscription | null;
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const MOCK_PLANS: Plan[] = [
  {
    id: 'plan_basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: ['Access to core lessons', 'Basic progress tracking', '1 Child profile']
  },
  {
    id: 'plan_premium',
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    features: ['All Basic features', 'Advanced analytics', 'Unlimited child profiles', 'Priority support'],
    isPopular: true
  },
  {
    id: 'plan_annual',
    name: 'Premium Annual',
    price: 199.99,
    interval: 'year',
    features: ['All Premium features', '2 months free', 'Exclusive learning materials']
  }
];

const MOCK_SUBSCRIPTION: Subscription = {
  id: 'sub_123',
  planId: 'plan_premium',
  status: 'ACTIVE',
  currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  cancelAtPeriodEnd: false
};

const MOCK_INVOICES: Invoice[] = [
  { id: 'inv_1', amount: 19.99, status: 'PAID', date: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  { id: 'inv_2', amount: 19.99, status: 'PAID', date: new Date(new Date().setMonth(new Date().getMonth() - 2)) },
];

export const SubscriptionStore = signalStore(
  { providedIn: 'root' },
  withState<SubscriptionState>({
    plans: [],
    currentSubscription: null,
    invoices: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    currentPlan: computed(() => {
      const sub = state.currentSubscription();
      if (!sub) return null;
      return state.plans().find(p => p.id === sub.planId) || null;
    }),
    isActive: computed(() => state.currentSubscription()?.status === 'ACTIVE')
  })),
  withMethods((store) => ({
    loadSubscription() {
      patchState(store, { loading: true, error: null });
      // Simulate API call
      setTimeout(() => {
        patchState(store, {
          plans: MOCK_PLANS,
          currentSubscription: MOCK_SUBSCRIPTION,
          invoices: MOCK_INVOICES,
          loading: false
        });
      }, 600);
    },
    cancelSubscription() {
      patchState(store, { loading: true });
      setTimeout(() => {
        const current = store.currentSubscription();
        if (current) {
          patchState(store, {
            currentSubscription: { ...current, cancelAtPeriodEnd: true },
            loading: false
          });
        }
      }, 500);
    },
    changePlan(planId: string) {
      patchState(store, { loading: true });
      setTimeout(() => {
        const current = store.currentSubscription();
        if (current) {
          patchState(store, {
            currentSubscription: { ...current, planId },
            loading: false
          });
        }
      }, 800);
    }
  }))
);
