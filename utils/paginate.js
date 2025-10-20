export const paginate = async (Model, query = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;
  const q = reqQuery.q || "";
  const query = { ...extraQuery };

  if (q) {
    query.name = { $regex: q, $options: "i" };
  }

  const total = await Model.countDocuments(query);
  const data = await Model.find(query)
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    data,
  };
};
