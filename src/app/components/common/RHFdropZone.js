'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageDropZone = ({
  value = [],
  onChange,
  placeholderText = 'Drag & drop images here, or click to select',
  maxSize = 5 * 1024 * 1024,
  maxFiles = 5,
}) => {
  const [images, setImages] = useState([]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const onDrop = async (acceptedFiles, fileRejections) => {
    if (fileRejections.length) {
      alert('Some files were rejected due to size or format.');
    }

    const validFiles = acceptedFiles.slice(0, maxFiles - images.length);
    const newImages = [];

    for (let file of validFiles) {
      try {
        const compressed = await compressImage(file);
        const base64 = await convertToBase64(compressed);
        const preview = URL.createObjectURL(compressed);
        newImages.push({ file: compressed, preview, base64 });
      } catch (err) {
        console.error('Compression error:', err);
      }
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onChange(updatedImages.map((img) => img.base64));
  };

  const dropzoneProps = useMemo(() => ({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize,
    maxFiles,
    multiple: true,
    onDrop,
  }), [images.length, maxSize, maxFiles]);

  const { getRootProps, getInputProps } = useDropzone(dropzoneProps);

  const handleRemove = (index) => {
    const newList = [...images];
    const removed = newList.splice(index, 1);
    if (removed[0]?.preview && removed[0]?.file) {
      URL.revokeObjectURL(removed[0].preview);
    }
    setImages(newList);
    onChange(newList.map((img) => img.base64));
  };

  useEffect(() => {
    // Hydrate previews from base64 if externally set
    if (Array.isArray(value) && value.length > 0) {
      const hydrated = value.map((base64) => ({
        preview: base64,
        file: null,
        base64,
      }));
      setImages(hydrated);
    } else {
      setImages([]);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview && img.file) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  return (
    <Box>
      <Box
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-300 ${
          images.length >= maxFiles ? 'border-gray-300 bg-gray-100' : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} disabled={images.length >= maxFiles} />
        {images.length > 0 ? (
          <Grid container spacing={2}>
            {images.map((img, index) => (
              <Grid item xs={6} sm={4} md={3} key={index} className="relative">
                <Box className="relative">
                  <img
                    src={img.preview}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                    className="absolute top-1 right-1 bg-white hover:bg-gray-100"
                    size="small"
                  >
                    <DeleteIcon className="text-red-500" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <img
              src="https://i.pinimg.com/originals/56/74/51/5674515621e872310e356243db78b14f.gif"
              alt="Upload Placeholder"
              className="w-full h-32 object-contain"
            />
            <Typography variant="body1" className="mt-2 text-gray-500">
              {placeholderText}
            </Typography>
          </Box>
        )}
      </Box>
      {images.length >= maxFiles && (
        <Typography variant="caption" className="text-sm text-gray-500 mt-2 block text-center">
          Max {maxFiles} image(s) allowed.
        </Typography>
      )}
    </Box>
  );
};

export default ImageDropZone;
