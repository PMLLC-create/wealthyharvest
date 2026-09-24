export const MONEY_FRAGMENT = /* GraphQL */ `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`;

export const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`;

export const PRODUCT_CARD_FRAGMENT = /* GraphQL */ `
  fragment ProductCardFragment on Product {
    id
    handle
    title
    description
    availableForSale
    featuredImage {
      ...ImageFragment
    }
    priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const PRODUCT_VARIANT_FRAGMENT = /* GraphQL */ `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    selectedOptions {
      name
      value
    }
    image {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    ...ProductCardFragment
    descriptionHtml
    updatedAt
    images(first: 10) {
      nodes {
        ...ImageFragment
      }
    }
    options {
      name
      values
    }
    variants(first: 100) {
      nodes {
        ...ProductVariantFragment
      }
    }
    seo {
      title
      description
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const COLLECTION_CARD_FRAGMENT = /* GraphQL */ `
  fragment CollectionCardFragment on Collection {
    id
    handle
    title
    description
    image {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            ...MoneyFragment
          }
          subtotalAmount {
            ...MoneyFragment
          }
        }
        merchandise {
          ... on ProductVariant {
            ...ProductVariantFragment
            product {
              handle
              title
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;
