export const lightTheme = {
    // Base colors
    primary: '#FF6B6B',  // Warm red for primary actions
    secondary: '#4ECDC4', // Teal for secondary elements
    accent: '#FFE66D',    // Sunny yellow for accents

    // Text colors
    text: {
        primary: '#2C3E50',    // Dark blue-gray for main text
        secondary: '#7F8C8D',  // Lighter gray for secondary text
        inverse: '#FFFFFF',    // White text for dark backgrounds
    },

    // Background colors
    background: {
        primary: '#FFFFFF',    // White for main background
        secondary: '#F9FAFB',  // Light gray for secondary background
        tertiary: '#F1F5F9',   // Slightly darker gray for cards
    },

    // Border colors
    border: {
        light: '#E2E8F0',
        medium: '#CBD5E1',
        dark: '#94A3B8',
    },

    // Status colors
    status: {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
    },

    // Gradient
    gradient: {
        primary: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
        secondary: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
    },

    // Shadows
    shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
};

export const darkTheme = {
    // Base colors
    primary: '#FF6B6B',  // Keep primary color for consistency
    secondary: '#4ECDC4', // Keep secondary color for consistency
    accent: '#FFE66D',    // Keep accent color for consistency

    // Text colors
    text: {
        primary: '#F1F5F9',    // Light gray for main text
        secondary: '#CBD5E1',  // Lighter gray for secondary text
        inverse: '#1E293B',    // Dark text for light backgrounds
    },

    // Background colors
    background: {
        primary: '#0F172A',    // Dark blue for main background
        secondary: '#1E293B',  // Slightly lighter blue for secondary background
        tertiary: '#334155',   // Even lighter blue for cards
    },

    // Border colors
    border: {
        light: '#334155',
        medium: '#475569',
        dark: '#64748B',
    },

    // Status colors (slightly muted for dark theme)
    status: {
        success: '#059669',
        error: '#DC2626',
        warning: '#D97706',
        info: '#2563EB',
    },

    // Gradient
    gradient: {
        primary: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
        secondary: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
    },

    // Shadows (more pronounced for dark theme)
    shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    },
};
