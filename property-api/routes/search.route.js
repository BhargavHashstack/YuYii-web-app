import express from "express";
import Destination from "../models/destination.model.js"; // Adjust the path as per your project structure
import Stay from "../models/stay.model.js";

const router = express.Router();

// Search stays and destinations
router.get("/", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ success: false, message: "Query is required" });
        }

        // Sanitize and trim the query
        const sanitizedQuery = query.trim();
        const searchRegex = new RegExp(sanitizedQuery, "i");

        // Fetch stays and destinations with category field added
        const stays = await Stay.find({
            $or: [{ title: searchRegex }, { location: searchRegex }],
        }).select("title location images price").lean(); 

        const destinations = await Destination.find({
            $or: [{ title: searchRegex }, { location: searchRegex }],
        }).select("title location image").lean(); 

        // Add category field
        const staysWithCategory = stays.map(stay => ({ ...stay, category: "stay" }));
        const destinationsWithCategory = destinations.map(destination => ({ ...destination, category: "destination" }));

        res.json({ success: true, stays: staysWithCategory, destinations: destinationsWithCategory });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


export default router;
