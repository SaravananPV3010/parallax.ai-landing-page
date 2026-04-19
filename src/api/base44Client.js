// Minimal placeholder client
export const apiClient = {
  auth: {
    me: async () => {
      throw new Error('Auth is not configured');
    },
    logout: () => {},
    redirectToLogin: () => {}
  }
};
