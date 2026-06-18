module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      age: {
        type: Number,
      },
      phone_number: {
        type: String,
      },
      address: {
        type: String,
      },
      gender: {
        type: String,
      },
      is_active: {
        type: Number,
        default: 1,
      },
      description: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const users_details = mongoose.model("users_details", schema);
  return users_details;
};
