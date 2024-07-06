export default function formikCheck({ values, valueLang, common, locale }) {
  const errors = {}

  if (!values.title[valueLang]) errors.title = common[locale].required

  if (!values.apartment) errors.apartment = common[locale].required

  if (!values.price) errors.price = common[locale].required

  if (!values.price) errors.price = common[locale].required

  if (!values.holiday_price) errors.holiday_price = common[locale].required

  if (!values.bathroom) errors.bathroom = common[locale].required

  if (!values.aria) errors.aria = common[locale].required

  if (!values.children) errors.children = common[locale].required

  if (!values.adult) errors.adult = common[locale].required

  return errors
}
