export const extractSkills = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3001/api/extract-skills', {
      method: 'POST',
      body: formData
    });

    const text = await response.text(); // Read raw response text

    if (!response.ok) {
      console.log("❌ Backend error:", response.status, text);
      throw new Error(`Failed to extract skills: ${response.status}`);
    }


    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
