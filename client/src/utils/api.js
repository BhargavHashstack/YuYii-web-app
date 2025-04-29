import axios from 'axios';

const API_BASE_URL = '/property-api';

// Helper function to fetch data safely
const fetchDataArray = async (url, errorMessage) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error);
    return [];
  }
};

// Fetch activities
export const fetchActivities = async () => fetchDataArray("activities", "Error fetching activities");
export const fetchAmenities = async () => fetchDataArray("amenities", "Error fetching amenities");
export const fetchStayTypes = async () => fetchDataArray("staytypes", "Error fetching stay types");
export const fetchTripTypes = async () => fetchDataArray("triptypes", "Error fetching trip types");
export const fetchPropertyTypes = async () => fetchDataArray("propertytypes", "Error fetching property types");
export const fetchStates = async () => fetchDataArray("states", "Error fetching states");
export const fetchCities = async () => fetchDataArray("cities", "Error fetching cities");
export const fetchHubs = async () => fetchDataArray("hubs", "Error fetching hubs");
