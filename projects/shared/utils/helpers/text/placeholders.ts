const PLACEHOLDER_REGEXP = /{(\w+)}/g;

export function replacePlaceholders(
  rawString: string,
  values: { [key: string]: string },
): string {
  return rawString.replace(
    PLACEHOLDER_REGEXP,
    (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
      values[placeholderWithoutDelimiters] || placeholderWithDelimiters,
  );
}

//
// export function getCheckoutNotificationText(
//   type: CheckoutNotificationTypeEnum,
//   placeholders?: { [key: string]: string },
// ): string {
//   if (placeholders) {
//     return replacePlaceholders(CHECKOUT_NOTIFICATION_TEXT[type], placeholders);
//   }
//   return CHECKOUT_NOTIFICATION_TEXT[type];
// }

// export const CHECKOUT_NOTIFICATION_TEXT: Record<
//   CheckoutNotificationTypeEnum,
//   string
// > = {
//   [CheckoutNotificationTypeEnum.PRODUCT_OUT_OF_STOCK]:
//     '<b>Закончился товар «{materialName}»</b>' +
//     '<br/>' +
//     'Товар перемещён в корзину. Он станет доступен для оформления, когда появится в наличии',


// {materialName}
// (string, { materialName: 'CUSTOM NAME' })
