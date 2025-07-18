/**
 * Services Provider for React Native
 * Provides shared services to the entire app using React Context
 */

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { initializeFirestoreServices } from '@tickt-ltd/services/platform/firestore-platform';
import { ServiceConfig, LogLevel, Environment } from '@tickt-ltd/services/interfaces';
import { reactNativeFirebaseModules } from './firebase-modules.adapter';
import { firebaseConfig } from '../config/firebase.config';

interface ServicesProviderProps {
  children: ReactNode;
  config?: ServiceConfig;
}

const ServicesContext = createContext<any>(null);

export const ServicesProvider: React.FC<ServicesProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  const services = useMemo(() => {
    // Initialize services with React Native Firebase modules
    return initializeFirestoreServices(reactNativeFirebaseModules, {
      logLevel: __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR,
      environment: __DEV__ ? Environment.DEVELOPMENT : Environment.PRODUCTION,
      ...config,
    });
  }, [config]);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): any => {
  const services = useContext(ServicesContext);
  if (!services) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return services;
};

// Individual service hooks for convenience
export const useUserService = () => useServices().userService;
export const useRecipeService = () => useServices().recipeService;
export const useMealPlanService = () => useServices().mealPlanService;
export const useChatSessionService = () => useServices().chatSessionService;