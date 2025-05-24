import slugify from "slugify";

export const buildSlugUnique = async (model, baseSlug, count = 0) => {
  let slug = baseSlug;
  if (count > 0) {
    slug = `${baseSlug}-${count}`;
  }

  const existing = await model.findOne({ slug });
  if (existing) {
    return buildSlugUnique(model, baseSlug, count + 1); // đệ quy tiếp
  }
  return slug;
};

export const slugGenerate = async (model, name) => {
  const baseSlug = slugify(name, { lower: true, strict: true });
  const uniqueSlug = await buildSlugUnique(model, baseSlug);
  return uniqueSlug;
};
