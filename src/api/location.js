export const getLocation = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();

    // Extract city and state
    const city = data.city || data.locality || "Unknown";
    const state = data.principalSubdivision || "";

    // Format as "City, State" or just "City" if no state
    return state ? `${city}, ${state}` : city;
  } catch (error) {
    console.error("Error getting location name:", error);
    return "Unknown Location";
  }
};
