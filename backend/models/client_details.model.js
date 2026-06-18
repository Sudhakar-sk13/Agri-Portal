module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      age: {
        type: Number,
      },
      email: {
        type: String
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
      otp: {
        type: Number,
      },
      otp_created_date: {
        type: Date,
      },
      role: {
        type: String,
        default: "Client"
      }
    },
    { timestamps: true }
  );

  const clients_details = mongoose.model("clients_details", schema);
  return clients_details;
};
