module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      profile_image: {
        type: String,
      },
      name: {
        type: String,
      },
      age: {
        type: Number,
      },
      email: {
        type: String,
      },
      phone_number: {
        type: String,
      },
      address: {
        type: String,
      },
      otp: {
        type: Number,
      },
      otp_created_date: {
        type: Date,
      },
      gender: {
        type: String,
      },
      is_active: {
        type: Number,
        default: 1,
      },
      role: {
        type: String,
        default: "Admin",
      },
    },
    { timestamps: true }
  );

  const Admin = mongoose.model("admin", schema);

  Admin.findOne({ email: "admin@example.com" }).then((admin) => {
    if (!admin) {
      Admin.create({
        profile_image: "",
        name: "Default Admin",
        age: 30,
        email: "admin@example.com",
        phone_number: "9999999999",
        address: "Head Office",
        otp: null,
        otp_created_date: null,
        gender: "Male",
        is_active: 1,
        role: "Admin",
      })
        .then(() => console.log("✅ Default admin created."))
        .catch((err) => console.error("❌ Error creating default admin:", err));
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  });

  return Admin;
};

// return admin;
// };
