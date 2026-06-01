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

    products.value.forEach(product => {
      getProductValues(product, key).forEach(value => {
        optionCounts[value] ??= 0
      })
    })

    products.value
      .filter(product => productMatchesFilters(product, key))
      .forEach(product => {
        getProductValues(product, key).forEach(value => {
          optionCounts[value]++
        })
      })

    return Object.entries(optionCounts)
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  const filterGroups = computed(() => {
    const definitions = [
      { key: 'categories', label: 'Kategori', show: showCategoryFilter },
      { key: 'types', label: 'Type', show: showTypeFilter },
      { key: 'brands', label: 'Brands', show: showBrandFilter },
      { key: 'countries', label: 'Land', show: showCountryFilter },
    ]

    return definitions
      .filter(definition => definition.show)
      .map(definition => ({
        key: definition.key,
        label: definition.label,
        options: createOptions(definition.key),
      }))
      .filter(group => group.options.length > 0)
  })

  const filteredProducts = computed(() =>
    products.value.filter(product => productMatchesFilters(product))
  )

  const isPriceActive = computed(() =>
    selectedMaxPrice.value !== null &&
    selectedMaxPrice.value < dynamicMaxPrice.value
  )

  const activeFilterCount = computed(() => {
    const selectionCount = Object.values(selectedFilters.value)
      .reduce((total, values) => total + values.length, 0)

    return selectionCount + (isPriceActive.value ? 1 : 0)
  })

  const hasActiveFilters = computed(() => activeFilterCount.value > 0)

  function resetFilters() {
    selectedFilters.value = {
      categories: [],
      types: [],
      brands: [],
      countries: [],
    }
    selectedMaxPrice.value = dynamicMaxPrice.value
  }

  return {
    selectedFilters,
    selectedMaxPrice,
    filterGroups,
    filteredProducts,
    minPrice,
    maxPrice: dynamicMaxPrice,
    hasActiveFilters,
    activeFilterCount,
    resetFilters,
  }
}