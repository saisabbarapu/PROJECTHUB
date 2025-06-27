// Cloudinary Configuration
// Replace 'your_cloud_name' with your actual cloud name from Cloudinary dashboard

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name', // You need to provide this
  api_key: process.env.CLOUDINARY_API_KEY || '419255423438389',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'DaUhSLkzsk-4Rph6J-_Sol7emZw'
};

// To find your cloud name:
// 1. Go to https://cloudinary.com/console
// 2. Sign in to your account
// 3. Look at the URL or dashboard for your cloud name
// 4. It's usually something like: https://cloudinary.com/console/dashboard/your_cloud_name

export default cloudinaryConfig; 