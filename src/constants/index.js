export const constant = {
  TOKEN:
    process.env.REACT_APP_STRAPI_TOKEN ||
    `c4c3c2ffbf58d55f433ade11fd609b2e3a51b421f7e6a41c1f9c414fe785d2dbc00238fc6d111ac8b3c9c0aa67b4e444b5c9d4eb34cefb1aa37e23139e1fab61c1bab160865fa807518e0831c74e91753ab8c4e70a15d8a02c1c875fc18cbfa1d3c2899a0e803f608224076a76252edc4cbec425e9cfde2d8e1c0f80639ab1ea`,
  SERVER_BASE_URL: process.env.REACT_APP_SERVER_URL || "http://localhost:1337",
};
