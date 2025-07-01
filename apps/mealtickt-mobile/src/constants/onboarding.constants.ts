export const ONBOARDING = {
  MAX_STEPS: 7,
  SCREENS: {
    PERSONAL_INFO: 'personalInfo',
    DIET_PREFERENCES: 'dietPreferences',
    ALLERGIES: 'allergies',
    FOOD_PREFERENCES: 'foodPreferences',
    GOALS: 'goals',
  },
  DEFAULT_VALUES: {
    DIET_TYPE: 'OMNIVORE',
    ACTIVITY_LEVEL: 'MODERATE',
    UNIT_SYSTEM: 'METRIC',
  },
  VALIDATION: {
    MAX_FREE_DAYS: 2,
    NUMERIC_FIELDS: ['height', 'weight', 'age'],
  },
}; 