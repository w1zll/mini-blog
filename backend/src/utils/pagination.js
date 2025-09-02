const parsePagination = (q) => {
   const page = Math.max(1, Number(q.page) || 1);
   const pageSize = Math.min(100, Math.max(1, Number(q.pageSize) || 10));
   const skip = (page - 1) * pageSize;
   const take = pageSize;
   return { page, pageSize, skip, take };
};

module.exports = { parsePagination };
