<script setup>
const props = defineProps({
  filterGroups: {
    type: Array,
    required: true,
  },

  selectedFilters: {
    type: Object,
    required: true,
  },

  minPrice: {
    type: Number,
    default: 0,
  },

  maxPrice: {
    type: Number,
    default: 300,
  },

  selectedMaxPrice: {
    type: Number,
    default: 300,
  },

  hasActiveFilters: {
    type: Boolean,
    default: false,
  },

  activeFilterCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits([
  'update:selectedFilters',
  'update:selectedMaxPrice',
  'reset',
])

function toggleFilter(groupKey, value) {
  const currentGroup = props.selectedFilters[groupKey] || []

  const updatedGroup = currentGroup.includes(value)
    ? currentGroup.filter(item => item !== value)
    : [...currentGroup, value]

  emit('update:selectedFilters', {
    ...props.selectedFilters,
    [groupKey]: updatedGroup,
  })
}
</script>

<template>
  <aside class="product-filter">
    <div class="filter-title">
      <div class="filter-title-left">
        <Icon name="teenyicons:adjust-horizontal-solid" />
        <h4>Filtre</h4>
      </div>

      <button v-if="hasActiveFilters" class="filter-reset" type="button" @click="emit('reset')">
        Nulstil ({{ activeFilterCount }})
      </button>
    </div>

    <template v-for="group in filterGroups" :key="group.key">
      <section class="filter-section">
        <h5>{{ group.label }}</h5>

        <label v-for="option in group.options" :key="option.value" class="filter-option">
          <div class="checkbox-text">
            <input type="checkbox" :checked="selectedFilters[group.key]?.includes(option.value)"
              @change="toggleFilter(group.key, option.value)">

            <span>{{ option.label }}</span>
          </div>

          <span class="filter-count">
            ({{ option.count }})
          </span>
        </label>
      </section>

      <div class="filter-divider"></div>
    </template>

    <section class="filter-section">
      <h5>Pris</h5>

      <div class="price-top">
        <span>{{ minPrice }} - {{ selectedMaxPrice }} kr.</span>
      </div>

      <input class="price-range" type="range" :min="minPrice" :max="maxPrice" :value="selectedMaxPrice"
        @input="emit('update:selectedMaxPrice', Number($event.target.value))">

      <div class="price-bottom">
        <span>{{ minPrice }} kr.</span>
        <span>{{ maxPrice }} kr.</span>
      </div>
    </section>

    <div class="filter-divider"></div>

  </aside>
</template>

<style scoped>
section {
  padding: 0;
}

.product-filter {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.filter-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-title-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.filter-reset {
  background: none;
  border: none;
  padding: 0;
  font-size: var(--font-small);
  color: red;
  text-decoration: underline;
  cursor: pointer;
}

.filter-title .iconify {
  font-size: 18px;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.filter-section h5 {
  font-size: var(--font-body);
}

.filter-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.checkbox-text {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.checkbox-text input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.filter-count {
  font-size: var(--font-small);
  color: #1a1a1a;
}

.filter-divider {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
}

.price-top {
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-small);
}

.price-range {
  width: 100%;
  accent-color: black;
}

.price-bottom {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-small);
}

@media (max-width: 768px) {
  .product-filter {
    display: none;
  }
}
</style>