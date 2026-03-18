const rawBaseApiUrl = import.meta.env.VITE_BACKEND_URL || 'https://clent-backend-2.onrender.com';
// Normalize: remove trailing slash to avoid double slash in runtime path
const BASE_API_URL = rawBaseApiUrl.replace(/\/+$/, '');

export const initEmailJs = () => {
    // No initialization needed for local backend
};

export const sendApplicationEmail = async (formData: any) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return { success: result.success, response: result };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
};
