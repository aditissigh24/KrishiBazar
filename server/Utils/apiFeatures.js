class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "sort"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Handle MongoDB filter operators
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "sort"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Case-insensitive filtering for category and section
    if (queryCopy.category) {
      queryCopy.category = { $regex: queryCopy.category, $options: "i" }; // Case-insensitive category
    }

    if (queryCopy.section) {
      queryCopy.section = { $regex: queryCopy.section, $options: "i" }; // Case-insensitive section
    }

    // Handle MongoDB filter operators (like gt, gte, lt, lte, etc.)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
