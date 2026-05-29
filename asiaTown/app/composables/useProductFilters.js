export function useProductFilters(products, options = {}) {
  const {
    showCategoryFilter = true,
    showTypeFilter = true,
    showBrandFilter = true,
    showCountryFilter = true,
    minPrice = 0,
  } = options

  const selectedFilters = ref({
    categories: [],
    types: [],
    brands: [],
    countries: [],
  })

  const dynamicMaxPrice = computed(() => {
    const prices = products.value
      .map(product => product.Pris)
      .filter(price => typeof price === 'number')

    return prices.length > 0 ? Math.max(...prices) : 0
  })

  const selectedMaxPrice = ref(null)

  watchEffect(() => {
    if (selectedMaxPrice.value === null && dynamicMaxPrice.value > 0) {
      selectedMaxPrice.value = dynamicMaxPrice.value
    }
  })

  function getProductValues(product, key) {
    if (key === 'categories') {
      return product.kategoriers?.map(category => category.Kategori) ?? []
    }

    if (key === 'types') {
      return product.types?.map(type => type.Type) ?? []
    }

    if (key === 'brands') {
      return product.brand?.Brand ? [product.brand.Brand] : []
    }

    if (key === 'countries') {
      return product.land?.Land ? [product.land.Land] : []
    }

    return []
  }

  function productMatchesFilters(product, ignoredKey = null) {
    const matchesFilters = Object.entries(selectedFilters.value).every(
      ([key, selectedValues]) => {
        if (key === ignoredKey) return true
        if (selectedValues.length === 0) return true

        const productValues = getProductValues(product, key)

        return selectedValues.some(value => productValues.includes(value))
      }
    )

    const productPrice = product.Pris ?? 0

    const matchesPrice =
      selectedMaxPrice.value === null ||
      productPrice <= selectedMaxPrice.value

    return matchesFilters && matchesPrice
  }

  function createOptions(key) {
    const optionCounts = {}

    products.value
      .filter(product => productMatchesFilters(product, key))
      .forEach(product => {
        const values = getProductValues(product, key)

        values.forEach(value => {
          optionCounts[value] = (optionCounts[value] || 0) + 1
        })
      })

    return Object.entries(optionCounts)
      .map(([value, count]) => ({
        label: value,
        value,
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  const filterGroups = computed(() => {
    const groups = []

    if (showCategoryFilter) {
      groups.push({
        key: 'categories',
        label: 'Kategori',
        options: createOptions('categories'),
      })
    }

    if (showTypeFilter) {
      groups.push({
        key: 'types',
        label: 'Type',
        options: createOptions('types'),
      })
    }

    if (showBrandFilter) {
      groups.push({
        key: 'brands',
        label: 'Brands',
        options: createOptions('brands'),
      })
    }

    if (showCountryFilter) {
      groups.push({
        key: 'countries',
        label: 'Land',
        options: createOptions('countries'),
      })
    }

    return groups.filter(group => group.options.length > 0)
  })

  const filteredProducts = computed(() => {
    return products.value.filter(product => productMatchesFilters(product))
  })

  return {
    selectedFilters,
    selectedMaxPrice,
    filterGroups,
    filteredProducts,
    minPrice,
    maxPrice: dynamicMaxPrice,
  }
}