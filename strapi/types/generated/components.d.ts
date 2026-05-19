import type { Schema, Struct } from '@strapi/strapi';

export interface RecipesIngredients extends Struct.ComponentSchema {
  collectionName: 'components_recipes_ingredients';
  info: {
    displayName: 'Ingredients';
    icon: 'restaurant';
  };
  attributes: {
    Amount: Schema.Attribute.Decimal;
    Ingredient: Schema.Attribute.String;
    unit: Schema.Attribute.Enumeration<
      ['g', 'kg', 'ml', 'l', 'tsk', 'spsk', 'stk', 'knsp']
    >;
  };
}

export interface RecipesSteps extends Struct.ComponentSchema {
  collectionName: 'components_recipes_steps';
  info: {
    displayName: 'Steps';
    icon: 'book';
  };
  attributes: {
    Step: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'recipes.ingredients': RecipesIngredients;
      'recipes.steps': RecipesSteps;
      'shared.media': SharedMedia;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
