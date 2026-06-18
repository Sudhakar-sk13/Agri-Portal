module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      is_active: {
        type: Number,
        default: 1,
      },
    },
    { timestamps: true }
  );

  const StockType = mongoose.model("stock_type", schema);

  const defaultTypes = [
    { name: "Rice", is_active: 1 },
    { name: "Wheat", is_active: 1 },
    { name: "Sugar", is_active: 1 },
    { name: "Salt", is_active: 1 },
    { name: "Dal", is_active: 1 },
    { name: "Oil", is_active: 1 },
  ];

  StockType.countDocuments().then(count => {
    if (count === 0) {
      StockType.insertMany(defaultTypes)
        .then(() => console.log("✅ Default stock types inserted."))
        .catch(err => console.error("❌ Error inserting default stock types:", err));
    } else {
      console.log("ℹ️ Stock types already exist.");
    }
  });

  return StockType;
};
