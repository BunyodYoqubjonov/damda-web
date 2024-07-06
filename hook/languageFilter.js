export default function getTranslationFields(
    languages,
    values,
    field = 'title'
) {
    const list = languages.map((item) => ({
        [item.value]: values[`${field}[${item.value}]`],
    }));
    return Object.assign({}, ...list);
}