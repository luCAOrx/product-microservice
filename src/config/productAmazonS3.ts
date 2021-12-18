export const productAmazonS3Config = {
  credentials: {
    accessKeyId: String(process.env.AWS_PRODUCTS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_PRODUCTS_SECRET_ACCESS_KEY)
  },
  region: process.env.AWS_PRODUCTS_DEFAULT_REGION
};