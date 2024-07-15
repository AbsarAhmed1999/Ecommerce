import User from "@/model/User";
import bcrypt from "bcrypt";

interface UserInput {
  fullName: string;
  email: string;
  password: string;
}

export async function registerUserService(userInput: UserInput) {
  const { fullName, email, password } = userInput;

  // Perform any business logic validation here
  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists by email
  const userExist = await User.findOne({ email: email });
  console.log("Checking Existing User", userExist);

  if (userExist) {
    throw new Error("User already exists with this email");
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  try {
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    const e = error as Error;
    if ((e as any).code === 11000) {
      // Use 'any' to access 'code' property
      if ((e as any).keyPattern && (e as any).keyPattern.email) {
        throw new Error(`User already exists with this email: ${email}`);
      }
    }
    console.error("Error creating user:", e);
    throw new Error("Failed to create new User");
  }
}
