export const api = "http://localhost:3000/api"

export const src = "http://localhost:3000"
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};

