module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      user_id: {
        type: mongoose.ObjectId,
      },
      stock_type: {
        type: mongoose.ObjectId,
      },
      estimated_amount: {
        type: String,
      },
      total_kg: {
        type: String,
      },
      stock_type_description: {
        type: String,
      },
      is_sold: {
        type: Number,
      },
      is_active: {
        type: Number,
      },
    },
    { timestamps: true }
  );

  const stock_details = mongoose.model("stock_details", schema);
  return stock_details;
};
