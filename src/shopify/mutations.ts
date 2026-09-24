import { CART_FRAGMENT } from "./fragments";

const USER_ERROR_FRAGMENT = /* GraphQL */ `
  fragment UserErrorFragment on CartUserError {
    field
    message
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...UserErrorFragment
      }
    }
  }
  ${CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...UserErrorFragment
      }
    }
  }
  ${CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...UserErrorFragment
      }
    }
  }
  ${CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const CART_LINES_REMOVE = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        ...UserErrorFragment
      }
    }
  }
  ${CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;
