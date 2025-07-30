import React, { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';

const DirectDatabaseImage = ({ projectId, fallbackSrc = '/placeholder-image.jpg' }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImageFromDatabase = async () => {
      try {
        // Connect directly to MongoDB Atlas
        const client = new MongoClient(import.meta.env.VITE_MONGODB_URL);
        await client.connect();
        
        const db = client.db('project-showcase');
        const project = await db.collection('projects').findOne(
          { _id: projectId },
          { projection: { imageData: 1, imageMimeType: 1 } }
        );
        
        if (project && project.imageData) {
          // Convert base64 to data URL
          const dataUrl = `data:${project.imageMimeType};base64,${project.imageData}`;
          setImageSrc(dataUrl);
        } else {
          setError(true);
        }
        
        await client.close();
      } catch (err) {
        console.error('Error fetching image from database:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImageFromDatabase();
  }, [projectId]);

  if (loading) {
    return <div>Loading image...</div>;
  }

  if (error || !imageSrc) {
    return <img src={fallbackSrc} alt="Placeholder" />;
  }

  return <img src={imageSrc} alt="Project" />;
};

export default DirectDatabaseImage; 