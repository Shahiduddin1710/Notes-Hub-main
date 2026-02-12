import supabase from "../config/supabase.js";

export const getNotes = async (req, res) => {
  try {
    const { university, semester, subject } = req.params;

    if (!university || !semester || !subject) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    const baseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/notes`;
    const folderPath = `${university}/${semester}/${subject}`;

    const { data, error } = await supabase.storage
      .from("notes")
      .list(folderPath, { limit: 100 });

    if (error || !data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Notes not found"
      });
    }

    const notes = data
      .filter(file => !file.name.endsWith("/"))
      .map(file => ({
        name: file.name,
        url: `${baseUrl}/${folderPath}/${file.name}`
      }));

    res.status(200).json({
      success: true,
      count: notes.length,
      notes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};
