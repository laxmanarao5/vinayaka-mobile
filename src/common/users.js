import bcrypt from "bcryptjs";

// Save data to AsyncStorage
export const createUser = async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await firestore().collection("users").add({
        name: user.name,
        email: user.email,
        password: hashedPassword, // Save the hashed password
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp()
      });
    console.log('✅ Data saved successfully!');
  } catch (e) {
    console.error('❌ Error saving data', e);
  }
};

// Get data from AsyncStorage
export const getData = async (user) => {
  try {
    const userSnapshot = await firestore()
      .collection("users")
      .where("email", "==", user.email)
      .get();

    if (userSnapshot.empty) {
      console.log("User not found");
      return {message:"User not found", success: false};
    }

    // Get user data
    const userData = userSnapshot.docs[0].data();

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(user.password, userData.password);
    if (!isMatch) {
      console.log("Invalid email or password");
      return { message: "Invalid email or password", success: false};
    }
    // Remove password field from userData before returning
    delete userData.password;
    return { message:"Log In successfull", success: true, user: userData}

  } catch (e) {
    console.error('❌ Error reading data', e);
  }
};

// Remove data from AsyncStorage
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('✅ Data removed successfully!');
  } catch (e) {
    console.error('❌ Error removing data', e);
  }
};