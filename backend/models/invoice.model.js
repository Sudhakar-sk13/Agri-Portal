module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      client_id: {
        type: mongoose.ObjectId,
      },
      stock_id: {
        type: mongoose.ObjectId,
      },
      payment_method: {
        type: String,
      },
      invoice_path: {
        type: String,
      },
      is_active: {
        type: Number,
      },
    },
    { timestamps: true }
  );

  const invoice = mongoose.model("invoice", schema);
  return invoice;
};
