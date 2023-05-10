const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME;

async function uploadBlob(file, tipo, nombreArchivo) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(`${tipo}/${nombreArchivo}`);
  const blobExists = await blobClient.exists();
  if (blobExists) {
    return blobClient.url;
  }
  nombreArchivo_generado = `${uuidv4()}${path.extname(file.name)}`;
  // Crear el cliente del Blob Storage con la ruta personalizada
  const blockBlobClient = containerClient.getBlockBlobClient(`${tipo}/${nombreArchivo_generado}`);

  
  const data = file.data;
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  return blockBlobClient.url;
}

async function deleteBlob(tipo, nombreArchivo) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(`${tipo}/${nombreArchivo}`);
  await blockBlobClient.delete();
  console.log(`Blob has been deleted.`);
}


module.exports = {uploadBlob,deleteBlob};

