module.exports = () => ({
  "strapi-csv-import-export": {
    enabled: true,
    config: {
      authorizedExports: [
        "api::product.product",
        "api::recipe.recipe"
      ],
      authorizedImports: [
        "api::product.product",
        "api::recipe.recipe"
      ]
    }
  }
});