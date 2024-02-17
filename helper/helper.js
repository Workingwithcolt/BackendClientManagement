const delteFileUnderFolder = async (dirpath) => {
    const files = await fs.readdir(dirpath);

    const deleteFilePromises = files.map(file =>
        fs.unlink(path.join(dirpath, file)),
    );

    await Promise.all(deleteFilePromises);
}